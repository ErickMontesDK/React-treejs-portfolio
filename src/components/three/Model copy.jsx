import { useGLTF } from '@react-three/drei';
import { useLoader, useThree, useFrame } from '@react-three/fiber';
import React, { useEffect, useRef, useState } from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import * as THREE from 'three';
import { currentGradientMap, baseToonMaterial, creaseLineMaterial } from '../../utils/createGradientMap';
import generateCreaseLines from '../../utils/creases.js';

export default function ModelOrigin({ 
  src, 
  animations = [],
  onDarkMode = false,
  position = [0, 0, 0], 
  rotation = [0, 0, 0], 
  scale = [1, 1, 1],
  switchLight = null,
  lightInitialState = false,
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isToggleOn, setIsToggleOn] = useState(false);
  const [lightState, setLightState] = useState(lightInitialState); // 🔹 Estado independiente para la luz
  
  const fadeOutDuration = 5;
  const fadeInDuration = 0.5;

  const hasOnLoop = animations.includes('onLoop');
  const hasOnDark = animations.includes('onDark');
  const hasOnClick = animations.includes('onClick');
  const hasOnToggle = animations.includes('onToggle');

  const mixerRef = useRef(null);
  const {scene} = useThree();
  const gltf = useLoader(GLTFLoader, src);
  const actionsRef = useRef([]);
  const modelRef = useRef(null);
  const fadeTimeoutRef = useRef(null);
  
  const handleClick = (event) => {
    console.log('🔵 Click detectado!');
    console.log('actionsRef.current.length:', actionsRef.current.length);
    console.log('hasOnToggle:', hasOnToggle);
    console.log('hasOnClick:', hasOnClick);
    console.log('isToggleOn:', isToggleOn);
    console.log('lightState actual:', lightState);

    // 🔹 Si tiene switchLight, alternar el estado de la luz
    if (switchLight) {
      const newLightState = !lightState;
      setLightState(newLightState);
      switchLight(newLightState);
      console.log('💡 Nuevo estado de luz:', newLightState);
    }
    
    // 🔹 Si NO hay animaciones, solo maneja la luz y sal
    if (actionsRef.current.length === 0) {
      console.log('⚠️ No hay animaciones disponibles (solo luz)');
      return;
    }

    event.stopPropagation();

    // 🔹 Manejo de animaciones (si existen)
    if (hasOnToggle) {
      console.log('🟢 Modo TOGGLE detectado');
      if (isToggleOn) {
        console.log('⏸️ Apagando animación...');
        actionsRef.current.forEach(action => {
          action.fadeOut(fadeOutDuration);
        });
        
        setIsToggleOn(false);
        setIsPlaying(false);
        
        if (fadeTimeoutRef.current) {
          clearTimeout(fadeTimeoutRef.current);
        }
        
        fadeTimeoutRef.current = setTimeout(() => {
          actionsRef.current.forEach(action => {
            action.stop();
            action.reset();
          });
          console.log('✅ Apagado y limpieza completada');
        }, fadeOutDuration * 1000);
        
      } else {
        console.log('▶️ Encendiendo animación...');
        if (fadeTimeoutRef.current) {
          clearTimeout(fadeTimeoutRef.current);
        }
        
        actionsRef.current.forEach((action, index) => {
          console.log(`  Action ${index}:`, action);
          action.stop();
          action.reset();
          action.play();
          console.log(`  ✓ Action ${index} iniciada, weight: ${action.getEffectiveWeight()}, isRunning:`, action.isRunning());
        });
        
        setIsToggleOn(true);
        setIsPlaying(true);
        console.log('✅ Encendido completado');
      }
    } else if (hasOnClick) {
      console.log('🟡 Modo CLICK detectado');
      if (!isPlaying) {
        actionsRef.current.forEach(action => {
          action.reset();
          action.play();
        });
        setIsPlaying(true);
      }
    }
  }

  useEffect(() => {
    let model = gltf.scene;
    model.position.set(...position);
    model.rotation.set(...rotation);
    model.scale.set(...scale);
    model.userData.enableCreaseLines = true;
    modelRef.current = model;

    if (gltf.animations && gltf.animations.length > 0) {
      const mixer = new THREE.AnimationMixer(model);
      mixerRef.current = mixer;

      gltf.animations.forEach((clip) => {
        const action = mixer.clipAction(clip);

        if (hasOnLoop || hasOnToggle) {
          action.loop = THREE.LoopRepeat;
          action.clampWhenFinished = false;

          if (hasOnLoop) {
            action.play();
            setIsPlaying(true);
          }
        } else {
          action.loop = THREE.LoopOnce;
          action.clampWhenFinished = true;

          mixer.addEventListener("finished", (e) => {
            if (e.action === action) {
              setIsPlaying(false);

              if (hasOnDark && onDarkMode) {
                action.reset();
                action.play();
                setIsPlaying(true);
              }
            }
          });
        }
        actionsRef.current.push(action);
      });
    }

    model.traverse((child) => {
      if (!child.isMesh) return;
      if (child.morphTargetInfluences || child.isSkinnedMesh) return;

      if (!child.geometry.attributes.normal) {
        child.geometry.computeVertexNormals();
      }

      if (child.name.toLowerCase().startsWith('glass_')) {
        child.material = new THREE.MeshPhysicalMaterial({
          color: child.material?.color?.getHex?.() || 0xffffff,
          transparent: true,
          opacity: 0.40,
          roughness: 0.1,
          metalness: 0,
          transmission: 0.9,
          ior: 1.5,
          thickness: 0.1,
        });
        child.castShadow = false;
        child.receiveShadow = false;
        child.userData.isGlassObject = true;
        child.renderOrder = 1;
        return;
      }

      if (child.name.toLowerCase().startsWith('lines_')) {
        child.material = new THREE.MeshBasicMaterial({
          color: child.material.color || 0xffffff,
          transparent: true,
          opacity: 0.65,
        });
        child.castShadow = false;
        child.receiveShadow = false;
        child.userData.isLinesObject = true;
        child.renderOrder = 1;
        return;
      }

      const toonColor = baseToonMaterial.clone();
      const baseColor = child.material?.color?.getHex?.() || 0xffffff;
      toonColor.color.setHex(baseColor);
      toonColor.gradientMap = currentGradientMap;
      child.material = toonColor;
      child.castShadow = true;
      child.receiveShadow = true;

      const creaseLines = generateCreaseLines(child);
      if (creaseLines) child.add(creaseLines);
    });
    scene.add(model);
  
    return () => {
      if (fadeTimeoutRef.current) {
        clearTimeout(fadeTimeoutRef.current);
      }
      if (mixerRef.current) {
        mixerRef.current.stopAllAction();
        mixerRef.current = null;
      }
      actionsRef.current = [];
      scene.remove(model);
    }
  }, [src]);
  
  useFrame((_, delta) => {
    if (mixerRef.current) mixerRef.current.update(delta);
  });

  useEffect(() => {
    if (!hasOnDark || hasOnToggle || actionsRef.current.length === 0) return;

    if (onDarkMode) {
      if (!isPlaying) {
        actionsRef.current.forEach(action => {
          action.reset();
          action.play();
        });
        setIsPlaying(true);
      }
    }
  }, [onDarkMode, hasOnDark, hasOnToggle, isPlaying]);

  useEffect(() => {
    if (!hasOnToggle || !hasOnDark) return;

    if (onDarkMode && !isToggleOn && !isPlaying) {
      if (fadeTimeoutRef.current) {
        clearTimeout(fadeTimeoutRef.current);
      }
      
      actionsRef.current.forEach(action => {
        action.reset();
        action.weight = 0;
        action.play();
        action.fadeIn(fadeInDuration);
      });
      
      setIsToggleOn(true);
      setIsPlaying(true);
    }
  }, [onDarkMode, hasOnToggle, hasOnDark, isToggleOn, isPlaying]);

  const isClickable = hasOnClick || hasOnToggle || switchLight; // 🔹 Añadido switchLight

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
  );
}