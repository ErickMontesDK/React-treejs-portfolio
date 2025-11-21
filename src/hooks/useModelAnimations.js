import { useEffect, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * HOOK: useModelAnimations
 * Encapsulates all the logic related to animation playback, transitions, and user interaction.
 * 
 * DESIGN PATTERN: Custom Hook
 * By extracting this logic, we keep the visual component (Model.jsx) clean and focused on rendering.
 * This makes the logic reusable and easier to test isolated from the UI.
 */
export function useModelAnimations({
    gltf,
    animationStyle,
    onDarkMode,
    switchLight,
    initialStateLight,
    initialStateDark,
}) {
    // State for animation playback
    const [isPlaying, setIsPlaying] = useState(false);
    const [animationsReady, setAnimationsReady] = useState(false);

    // Refs for mutable state that doesn't trigger re-renders
    const mixerRef = useRef(null);
    const actionsRef = useRef([]);
    const fadeTimeoutRef = useRef(null);
    const userOverrideRef = useRef(false); // Tracks if user manually intervened

    // REF PATTERN: Keep track of the latest callback without triggering effects
    // This prevents the infinite loop caused by unstable switchLight callbacks
    const switchLightRef = useRef(switchLight);
    useEffect(() => {
        switchLightRef.current = switchLight;
    }, [switchLight]);

    // Configuration constants
    const fadeOutDuration = 5;

    // Derived state based on style
    const hasOnLoop = animationStyle === "onLoop";
    const hasOnDark = animationStyle === "onDark";
    const hasOnClick = animationStyle === "onClick";
    const hasOnToggle = animationStyle === "onToggle";
    const hasOnHover = animationStyle === "onHover";

    const isClickable = switchLight || ["onClick", "onHover", "onToggle"].includes(animationStyle);

    // 1. SETUP: Initialize Mixer and Actions
    useEffect(() => {
        if (!gltf || !gltf.scene) return;

        const model = gltf.scene;

        // Create AnimationMixer
        if (gltf.animations && gltf.animations.length > 0) {
            const mixer = new THREE.AnimationMixer(model);
            mixerRef.current = mixer;
            actionsRef.current = [];

            // Find the longest animation duration to use as the "master" for finishing
            const maxDuration = Math.max(...gltf.animations.map(clip => clip.duration));
            let masterActionFound = false;
            gltf.animations.forEach((clip) => {
                const action = mixer.clipAction(clip);

                // Configure loop behavior based on style
                if (hasOnLoop || hasOnToggle || hasOnDark) {
                    action.loop = THREE.LoopRepeat;
                    action.clampWhenFinished = false;
                } else {
                    action.loop = THREE.LoopOnce;
                    action.clampWhenFinished = true;

                    // Event Listener: Only attach to the longest animation (the "master")
                    // AND only if it's NOT an interactive "hold" animation like onClick
                    // This prevents shorter animations from stopping the sequence, and keeps onClick animations clamped at the end
                    if (!masterActionFound && clip.duration === maxDuration && !hasOnClick) {
                        mixer.addEventListener("finished", (e) => {
                            if (e.action === action) {
                                setIsPlaying(false);
                            }
                        });
                        masterActionFound = true; // Ensure we only have one master trigger
                    }
                }

                actionsRef.current.push(action);
            });

            setAnimationsReady(true);
        }

        setAnimationsReady(true);


        // Determine Initial State
        let initialState = false;
        if (hasOnLoop) {
            initialState = true;
        } else if (hasOnDark) {
            initialState = onDarkMode;
        } else if (hasOnToggle || switchLight) {
            initialState = onDarkMode ? initialStateDark : initialStateLight;
        }

        setIsPlaying(initialState);
        userOverrideRef.current = false; // Reset override on load

        // CLEANUP: Stop animations and clear refs when component unmounts or src changes
        return () => {
            if (fadeTimeoutRef.current) clearTimeout(fadeTimeoutRef.current);
            if (mixerRef.current) {
                mixerRef.current.stopAllAction();
                mixerRef.current = null;
            }
            actionsRef.current = [];
            setAnimationsReady(false);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [gltf, hasOnLoop, hasOnDark, hasOnToggle, initialStateDark, initialStateLight]); // Removed switchLight and onDarkMode to prevent resets

    // 2. LOGIC: Handle Play/Stop/Fade based on isPlaying state
    useEffect(() => {
        // Notify parent if needed using the ref (Fix for infinite loop)
        if (switchLightRef.current) {
            switchLightRef.current(isPlaying);
        }

        if (actionsRef.current.length === 0 || !animationsReady) return;

        if (isPlaying) {
            // PLAY
            if (fadeTimeoutRef.current) {
                clearTimeout(fadeTimeoutRef.current);
                fadeTimeoutRef.current = null;
            }

            actionsRef.current.forEach((action) => {
                action.stopFading();
                action.reset();
                action.play();
            });
        } else {
            // STOP (with fade out if applicable)
            if (hasOnToggle || hasOnClick || hasOnHover) {
                actionsRef.current.forEach((action) => {
                    action.fadeOut(fadeOutDuration);
                });

                if (fadeTimeoutRef.current) clearTimeout(fadeTimeoutRef.current);

                fadeTimeoutRef.current = setTimeout(() => {
                    actionsRef.current.forEach((action) => {
                        action.stop();
                        action.reset();
                    });
                    fadeTimeoutRef.current = null;
                }, fadeOutDuration * 1000);
            } else {
                // Immediate stop for others
                actionsRef.current.forEach((action) => action.stop());
            }
        }
    }, [isPlaying, animationsReady, hasOnToggle, hasOnClick, hasOnHover]); // switchLight removed from dependencies

    // 3. REACTIVE: Handle Dark Mode changes
    useEffect(() => {
        if (!hasOnDark && !hasOnToggle && !switchLight) return;

        // If strictly onDark, always follow mode
        if (hasOnDark) {
            setIsPlaying(onDarkMode);
            userOverrideRef.current = false;
            return;
        }

        // If interactive, respect user override
        if (hasOnToggle || switchLight) {
            if (userOverrideRef.current) {
                // User has manually toggled, so we ignore the global mode change to avoid frustration
                return;
            }

            const newState = onDarkMode ? initialStateDark : initialStateLight;
            setIsPlaying(newState);
        }
    }, [onDarkMode, hasOnDark, hasOnToggle, switchLight, initialStateLight, initialStateDark]);

    // 4. LOOP: Update Mixer every frame
    useFrame((_, delta) => {
        if (mixerRef.current) {
            mixerRef.current.update(delta);
        }
    });

    // INTERACTION Handler
    const handleClick = (event) => {
        event.stopPropagation();
        userOverrideRef.current = true; // User took control

        if (hasOnClick) {
            // For 'onClick' animations (triggers), we want to replay the animation on every click
            // instead of toggling it off.
            if (isPlaying) {
                // If already playing (or finished/clamped), force a replay
                if (actionsRef.current) {
                    actionsRef.current.forEach((action) => {
                        action.stop();
                        action.reset();
                        action.play();
                    });
                }
            } else {
                // If not playing, start it
                setIsPlaying(true);
            }
        } else {
            // For toggles (lights, etc.), switch state
            setIsPlaying((prev) => !prev);
        }
    };

    return {
        handleClick,
        isClickable,
        isPlaying
    };
}
