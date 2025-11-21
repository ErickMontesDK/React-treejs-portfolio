import { useLoader, useThree } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import chargingModelMaterials from '../../utils/chargingModel.js';
import { useModelAnimations } from '../../hooks/useModelAnimations';

/**
 * COMPONENT: Model
 * 
 * DESIGN PATTERN: Presentational Component
 * This component is now much simpler. It focuses on:
 * 1. Loading the asset (Data)
 * 2. Positioning/Styling (Visuals)
 * 3. Delegating logic to the `useModelAnimations` hook (Behavior)
 */
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
}) {
  const { scene } = useThree();
  const gltf = useLoader(GLTFLoader, src);
  const modelRef = useRef(null);

  // HOOK: Custom Logic
  // All the complex animation state machine is hidden inside this hook.
  const { handleClick, isClickable } = useModelAnimations({
    gltf,
    animationStyle,
    onDarkMode,
    switchLight,
    initialStateLight,
    initialStateDark
  });

  // EFFECT: Material & Scene Setup
  // This handles the static setup of the model (materials, adding to scene)
  useEffect(() => {
    let model = gltf.scene;

    // Apply custom materials/styles
    model = chargingModelMaterials(model, position, scale, rotation);

    scene.add(model);
    modelRef.current = model;

    // Cleanup: Remove from scene when unmounted
    return () => {
      scene.remove(model);
    };
  }, [src, position, scale, rotation, scene, gltf]);

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
};