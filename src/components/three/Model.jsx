import { useLoader, useThree } from '@react-three/fiber';
import { useEffect, useRef, useState } from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import * as THREE from 'three';
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
  camera = null,
  transitions = null,
  isHelperOn = false,
}) {
  const { scene } = useThree();
  const gltf = useLoader(GLTFLoader, src);
  const modelRef = useRef(null);
  const hoverCloneRef = useRef(null);
  const [isHover, setIsHover] = useState(false);

  const handlePointerOver = () => {
    setIsHover(true);
  };

  const handlePointerOut = () => {
    setIsHover(false);
  };

  // HOOK: Custom Logic
  // All the complex animation state machine is hidden inside this hook.
  const { handleClick, isClickable } = useModelAnimations({
    gltf,
    animationStyle,
    onDarkMode,
    switchLight,
    initialStateLight,
    initialStateDark,
    camera,
    transitions
  });

  // Wrapper to remove hover clone when clicking
  const handleClickWithCleanup = (e) => {
    // Remove hover clone immediately when clicking
    setIsHover(false);
    if (hoverCloneRef.current) {
      scene.remove(hoverCloneRef.current);
      hoverCloneRef.current = null;
    }
    // Execute the actual click handler
    handleClick(e);
  };

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

  // EFFECT: Handle hover - create scaled white clone
  useEffect(() => {
    if (!modelRef.current || !isClickable) return;

    if (isHover || isHelperOn) {
      // Clone the model
      const clone = modelRef.current.clone();

      // Copy world position and rotation (not local)
      clone.position.copy(modelRef.current.position);
      clone.rotation.copy(modelRef.current.rotation);
      clone.scale.copy(modelRef.current.scale);

      // Scale each mesh individually from its center, not the group
      clone.traverse((child) => {
        if (child.isMesh) {
          // Scale the mesh geometry itself
          child.scale.multiplyScalar(1.1);

          // Clone and modify material
          child.material = child.material.clone();
          child.material.color.setHex(0xFFFFFF);
          child.material.transparent = true;
          child.material.opacity = 0.8;
        }
      });

      scene.add(clone);
      hoverCloneRef.current = clone;
    } else {
      // Remove the clone when not hovering
      if (hoverCloneRef.current) {
        scene.remove(hoverCloneRef.current);
        hoverCloneRef.current = null;
      }
    }

    // Cleanup
    return () => {
      if (hoverCloneRef.current) {
        scene.remove(hoverCloneRef.current);
        hoverCloneRef.current = null;
      }
    };
  }, [isHover, isClickable, scene, isHelperOn]);

  return (
    <>
      <primitive object={gltf.scene} />

      {/* Custom hitbox - only for clickable models */}
      {isClickable && modelRef.current && (
        <mesh
          ref={(mesh) => {
            if (mesh && modelRef.current) {
              // Calculate bounding box from only main meshes (exclude glass_ and lines_)
              const box = new THREE.Box3();
              modelRef.current.traverse((child) => {
                if (child.isMesh && !child.userData.isLinesObject) {
                  const childBox = new THREE.Box3().setFromObject(child);
                  box.union(childBox);
                }
              });

              const size = new THREE.Vector3();
              const center = new THREE.Vector3();
              box.getSize(size);
              box.getCenter(center);

              // Position and scale the hitbox mesh
              mesh.position.copy(center);
              mesh.scale.set(size.x, size.y, size.z);
            }
          }}
          onClick={handleClickWithCleanup}
          onPointerOver={(e) => {
            e.stopPropagation();
            document.body.style.cursor = 'pointer';
            handlePointerOver();
          }}
          onPointerOut={(e) => {
            e.stopPropagation();
            document.body.style.cursor = 'default';
            handlePointerOut();
          }}
        >
          <boxGeometry args={[1, 1, 1]} />
          <meshBasicMaterial transparent opacity={0} visible={false} />
        </mesh>
      )}
    </>
  );
}