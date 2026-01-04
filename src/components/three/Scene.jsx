import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, OrthographicCamera } from '@react-three/drei';
import * as THREE from 'three';
import { MusicContext } from '../../context/MusicContext';

/**
 * DESIGN PATTERN: Separation of Concerns
 * Instead of putting all logic inside the main Scene component, we split it into smaller,
 * focused components like CameraController. This makes the code easier to test, reuse, and debug.
 */
function CameraController({
  targetPosition = [3, 4, 3],
  targetLookAt = [0, 1, 0],
  targetZoom = 1.7,
  minAzimuthAngle,
  maxAzimuthAngle,
  minPolarAngle,
  maxPolarAngle,
  minDistance,
  maxDistance,
  minZoom,
  maxZoom
}) {
  const controls = useRef();
  const { camera } = useThree();
  const panLimit = 5; // Increased to allow music camera at [1.4, 1.1, 2.3]
  const isTransitioning = useRef(false);

  // Store target values for the transition
  const transitionTargets = useRef({
    position: new THREE.Vector3(...targetPosition),
    lookAt: new THREE.Vector3(...targetLookAt),
    zoom: targetZoom
  });

  // Detect when props change and start transition
  useEffect(() => {
    // Check if any target prop actually changed
    const posChanged = !targetPosition.every((v, i) => v === transitionTargets.current.position.toArray()[i]);
    const lookAtChanged = !targetLookAt.every((v, i) => v === transitionTargets.current.lookAt.toArray()[i]);
    const zoomChanged = targetZoom !== transitionTargets.current.zoom;

    if (posChanged || lookAtChanged || zoomChanged) {
      // Update transition targets
      transitionTargets.current = {
        position: new THREE.Vector3(...targetPosition),
        lookAt: new THREE.Vector3(...targetLookAt),
        zoom: targetZoom
      };
      // Start transition
      isTransitioning.current = true;
    }
    // Use JSON.stringify to prevent constant re-execution
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(targetPosition), JSON.stringify(targetLookAt), targetZoom]);

  // 🔹 Limit movement (pan) & Smooth Transitions
  useFrame(() => {
    if (controls.current) {
      // Only animate if we are in a transition state
      if (isTransitioning.current) {
        // 1. Smooth Camera Position Transition (increased from 0.05 to 0.08 for faster convergence)
        camera.position.lerp(transitionTargets.current.position, 0.08);

        // 2. Smooth Target (LookAt) Transition
        controls.current.target.lerp(transitionTargets.current.lookAt, 0.08);

        // 3. Smooth Zoom Transition
        if (Math.abs(camera.zoom - transitionTargets.current.zoom) > 0.01) {
          camera.zoom = THREE.MathUtils.lerp(camera.zoom, transitionTargets.current.zoom, 0.08);
          camera.updateProjectionMatrix();
        }

        // Check if we reached the target (approximately) to stop transitioning
        const distPos = camera.position.distanceTo(transitionTargets.current.position);
        const distTarget = controls.current.target.distanceTo(transitionTargets.current.lookAt);
        const distZoom = Math.abs(camera.zoom - transitionTargets.current.zoom);

        // Increased threshold from 0.01 to 0.05 to avoid lerp precision issues
        if (distPos < 0.05 && distTarget < 0.05 && distZoom < 0.05) {
          isTransitioning.current = false;
        }
      } else {
        // 4. Clamp Pan Limits (Only when NOT transitioning - for manual user control)
        const target = controls.current.target;
        target.x = THREE.MathUtils.clamp(target.x, -panLimit, panLimit);
        target.y = THREE.MathUtils.clamp(target.y, -panLimit, panLimit);
        target.z = THREE.MathUtils.clamp(target.z, -panLimit, panLimit);
      }

      controls.current.update();

      // 🔍 DEBUG: Log angles when user is manually moving camera (throttled)
      if (!isTransitioning.current && Math.random() < 0.02) { // Only log 2% of frames to avoid spam
        controls.current.getAzimuthalAngle();
        controls.current.getPolarAngle();
      }
    }
  });

  // 🔹 Initial position reset (only on mount)
  useEffect(() => {
    // Small delay to ensure controls are fully initialized
    const timer = setTimeout(() => {
      if (controls.current) {
        controls.current.target.set(...targetLookAt);
        controls.current.object.position.set(...targetPosition);
        camera.zoom = targetZoom;
        camera.updateProjectionMatrix();
        controls.current.update();
      }
    }, 0);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <OrbitControls
      ref={controls}
      enablePan
      enableRotate={true}
      minZoom={minZoom}
      maxZoom={maxZoom}
      minAzimuthAngle={minAzimuthAngle}
      maxAzimuthAngle={maxAzimuthAngle}
      minPolarAngle={minPolarAngle}
      maxPolarAngle={maxPolarAngle}
      minDistance={minDistance}
      maxDistance={maxDistance}
    />
  );
}

/**
 * COMPONENT: CameraUpdater
 * Handles the responsive logic for the OrthographicCamera.
 * 
 * THEORY: Orthographic Projection
 * Unlike Perspective cameras, Orthographic cameras don't have "depth" perspective.
 * Objects stay the same size regardless of distance.
 * We need to manually update the 'frustum' (the visible box) when the screen resizes
 * to prevent the image from stretching.
 */
function CameraUpdater() {
  // HOOK: useThree
  // Gives us access to the internal R3F state, including the camera and the renderer size.
  const { camera, size } = useThree();
  const frustumSize = 11;

  useEffect(() => {
    // Ensure we are working with the correct camera type
    if (camera.isOrthographicCamera) {
      const aspect = size.width / size.height;

      // Update the camera frustum planes based on the new aspect ratio
      camera.left = -(frustumSize * aspect) / 2;
      camera.right = (frustumSize * aspect) / 2;
      camera.top = frustumSize / 2;
      camera.bottom = -frustumSize / 2;

      camera.updateProjectionMatrix();
    }
  }, [size, camera]); // Re-run when size or camera changes

  return null; // This component doesn't render anything visual
}

/**
 * COMPONENT: Scene
 * The main entry point for our 3D world.
 * 
 * DESIGN PATTERN: Composition
 * This component "composes" the scene by bringing together the Canvas, Camera,
 * Controls, and Logic (CameraUpdater). It acts as a container/orchestrator.
 */
export default function Scene({ children, cameraConfig, musicValue, darkMode }) {
  const frustumSize = 11;
  console.log("SCENE: musicValue is", musicValue ? "DEFINED" : "UNDEFINED");

  // Default config if none provided (fallback)
  const defaultConfig = {
    position: [3, 4, 3],
    target: [0, 1, 0],
    zoom: 1.7,
    minAzimuthAngle: 0,
    maxAzimuthAngle: Math.PI / 2,
    minPolarAngle: 0,
    maxPolarAngle: Math.PI / 2.1,
    minDistance: 3,
    maxDistance: 10,
    minZoom: 1.7,
    maxZoom: 5
  };

  const config = cameraConfig || defaultConfig;

  // Store the INITIAL camera config so OrthographicCamera doesn't jump when config changes
  // Only CameraController should handle transitions
  const initialConfigRef = useRef(config);

  return (
    <Canvas
      shadows
      dpr={[1, 1.5]}
      gl={{ antialias: true }}
    >
      <color attach="background" args={[darkMode ? "#030f1f" : "#0c88ba"]} />
      <MusicContext.Provider value={musicValue}>
        <OrthographicCamera
          makeDefault
          left={-frustumSize}
          right={frustumSize}
          top={frustumSize / 2}
          bottom={-frustumSize / 2}
          near={0.01}
          far={20}
          position={initialConfigRef.current.position} // Use initial position only
          zoom={initialConfigRef.current.zoom}         // Use initial zoom only
        />

        {/* Updates the camera frustum on resize */}
        <CameraUpdater />

        {/* Encapsulated controls logic with smooth transitions */}
        <CameraController
          targetPosition={config.position}
          targetLookAt={config.target}
          targetZoom={config.zoom}
          minAzimuthAngle={config.minAzimuthAngle}
          maxAzimuthAngle={config.maxAzimuthAngle}
          minPolarAngle={config.minPolarAngle}
          maxPolarAngle={config.maxPolarAngle}
          minDistance={config.minDistance}
          maxDistance={config.maxDistance}
          minZoom={config.minZoom}
          maxZoom={config.maxZoom}
        />

        {children}
      </MusicContext.Provider>
    </Canvas>
  );
}