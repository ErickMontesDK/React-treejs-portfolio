import { useLoader, useThree, useFrame } from '@react-three/fiber';
import { useEffect, useRef, useState } from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import * as THREE from 'three';
import { currentGradientMap, baseToonMaterial } from '../../utils/createGradientMap';
import generateCreaseLines from '../../utils/creases.js';
import chargingModelMaterials from '../../utils/chargingModel.js';


export default function Model({
    src,
    position = null,
    rotation = null,
    scale = null,
    onDarkMode = false,
    switchLight = null,
    initialStateLight = false,
    initialStateDark = false,
    animationStyle = null,
}){
    const [isPlaying, setIsPlaying] = useState(false);
    const [animationsReady, setAnimationsReady] = useState(false);
    const userOverrideRef = useRef(false); // ✅ Nuevo: track si el usuario hizo click manual
    
    const fadeOutDuration = 5;
    const fadeInDuration = 0.5;
    
    const hasOnLoop = animationStyle === "onLoop";
    const hasOnDark = animationStyle === "onDark";
    const hasOnClick = animationStyle === "onClick";
    const hasOnToggle = animationStyle === "onToggle";
    const hasOnHover = animationStyle === "onHover";
    
    const isClickable = switchLight || ["onClick", "onHover", "onToggle"].includes(animationStyle);

    const mixerRef = useRef(null);
    const {scene} = useThree();
    const gltf = useLoader(GLTFLoader, src);
    const actionsRef = useRef([]);
    const modelRef = useRef(null);
    const fadeTimeoutRef = useRef(null);

    // 🔧 useEffect 1: SOLO CONFIGURACIÓN
    useEffect(() => {
      let model = gltf.scene;
      model = chargingModelMaterials(model, position, scale, rotation);
      scene.add(model);
      modelRef.current = model;

      // Configurar AnimationMixer y Actions
      if (gltf.animations && gltf.animations.length > 0){
        const mixer = new THREE.AnimationMixer(model);
        mixerRef.current = mixer;

        gltf.animations.forEach((clip, index)=>{
            const action = mixer.clipAction(clip);

            if (hasOnLoop || hasOnToggle || hasOnDark) {
                action.loop = THREE.LoopRepeat;
                action.clampWhenFinished = false;
            } else {
                action.loop = THREE.LoopOnce;
                action.clampWhenFinished = true;

                mixer.addEventListener("finished", (e)=>{
                  if (e.action === action){
                    setIsPlaying(false);
                  }
                });
            }

            actionsRef.current.push(action);
        });
        
        setAnimationsReady(true);
      }
      
      // ✅ Establecer estado inicial según el modo actual
      let initialState = false;
      
      if (hasOnLoop) {
        initialState = true;
      } else if (hasOnDark) {
        initialState = onDarkMode;
      } else if (hasOnToggle || switchLight) {
        initialState = onDarkMode ? initialStateDark : initialStateLight;
      }
      
      setIsPlaying(initialState);
      userOverrideRef.current = false; // ✅ Reset: no hay override al cargar
    
      return () => {
        if (fadeTimeoutRef.current) {
          clearTimeout(fadeTimeoutRef.current);
        }
        if (mixerRef.current) {
          mixerRef.current.stopAllAction();
          mixerRef.current = null;
        }
        actionsRef.current = [];
        setAnimationsReady(false);
        scene.remove(model);
      }
    }, [src]);

    // 🎬 useEffect 2: EJECUTAR animaciones cuando isPlaying cambia
    useEffect(() => {
      if (switchLight) {
        switchLight(isPlaying);
      }
      
      if (actionsRef.current.length === 0) {
        return;
      }
      
      if (!animationsReady) {
        return;
      }

      if (isPlaying) {
        if (fadeTimeoutRef.current) {
          clearTimeout(fadeTimeoutRef.current);
          fadeTimeoutRef.current = null;
        }
        
        actionsRef.current.forEach((action, index) => {
          action.stopFading();
          action.reset();
          action.play();
        });
      } else {
        if (hasOnToggle || hasOnClick || hasOnHover) {
          actionsRef.current.forEach((action, index) => {
            action.fadeOut(fadeOutDuration);
          });

          if (fadeTimeoutRef.current){
            clearTimeout(fadeTimeoutRef.current);
          }
          
          fadeTimeoutRef.current = setTimeout(() => {
            actionsRef.current.forEach(action => {
              action.stop();
              action.reset();
            });
            fadeTimeoutRef.current = null;
          }, fadeOutDuration * 1000);
        } else {
          actionsRef.current.forEach((action, index) => {
            action.stop();
          });
        }
      }
    }, [isPlaying, animationsReady]);

    // 🌙 useEffect 3: Reaccionar a cambios de modo oscuro
    useEffect(() => {
      if (!hasOnDark && !hasOnToggle && !switchLight) return;
      
      // ✅ Si es onDark, siempre seguir el modo (sin override)
      if (hasOnDark) {
        setIsPlaying(onDarkMode);
        userOverrideRef.current = false;
        return;
      }
      
      // ✅ Si es onToggle/switchLight Y el usuario hizo click manual, no cambiar
      if (hasOnToggle || switchLight) {
        if (userOverrideRef.current) {
          console.log('⚠️ Usuario tiene control manual, no aplicar estado automático');
          return; // ✅ Salir sin cambiar nada
        }
        
        const newState = onDarkMode ? initialStateDark : initialStateLight;
        setIsPlaying(newState);
      }
    }, [onDarkMode, hasOnDark, hasOnToggle, switchLight, initialStateLight, initialStateDark]);

    // 🔵 Handler de click
    const handleClick = (event) => {
      event.stopPropagation();
      
      userOverrideRef.current = true; // ✅ Marcar que el usuario tomó control
      
      setIsPlaying(prev => !prev);
    }
    
    // ⏱️ Actualizar mixer cada frame
    useFrame((_, delta) => {
      if (mixerRef.current) mixerRef.current.update(delta);
    });

    return (
        <primitive 
            object={gltf.scene} 
            onClick={isClickable ? handleClick : undefined}
            onPointerOver={(e) => {
                if (isClickable) {
                    e.stopPropagation();
                    document.body.style.cursor = 'pointer';
                }
            }}
            onPointerOut={(e) => {
                if (isClickable) {
                    e.stopPropagation();
                    document.body.style.cursor = 'default';
                }
            }}
        />
    )
};