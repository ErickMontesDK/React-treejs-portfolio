import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, OrthographicCamera } from '@react-three/drei';
import * as THREE from 'three';

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
  const panLimit = 3;
  const isTransitioning = useRef(false);

  // Store previous target values to detect real changes
  const prevTargets = useRef({
    position: [...targetPosition],
    lookAt: [...targetLookAt],
    zoom: targetZoom
  });

  // 🔹 Limit movement (pan) & Smooth Transitions
  useFrame(() => {
    if (controls.current) {
      // Check if target values have actually changed (not just prop references)
      const posChanged = !targetPosition.every((v, i) => v === prevTargets.current.position[i]);
      const lookAtChanged = !targetLookAt.every((v, i) => v === prevTargets.current.lookAt[i]);
      const zoomChanged = targetZoom !== prevTargets.current.zoom;

      if (posChanged || lookAtChanged || zoomChanged) {
        isTransitioning.current = true;
        prevTargets.current = {
          position: [...targetPosition],
          lookAt: [...targetLookAt],
          zoom: targetZoom
        };
      }

      // Only animate if we are in a transition state
      if (isTransitioning.current) {
        const targetPosVec = new THREE.Vector3(...targetPosition);
        const targetLookAtVec = new THREE.Vector3(...targetLookAt);

        // 1. Smooth Camera Position Transition
        camera.position.lerp(targetPosVec, 0.05);

        // 2. Smooth Target (LookAt) Transition
        controls.current.target.lerp(targetLookAtVec, 0.05);

        // 3. Smooth Zoom Transition
        if (Math.abs(camera.zoom - targetZoom) > 0.01) {
          camera.zoom = THREE.MathUtils.lerp(camera.zoom, targetZoom, 0.05);
          camera.updateProjectionMatrix();
        }

        // Check if we reached the target (approximately) to stop transitioning
        const distPos = camera.position.distanceTo(targetPosVec);
        const distTarget = controls.current.target.distanceTo(targetLookAtVec);
        const distZoom = Math.abs(camera.zoom - targetZoom);

        if (distPos < 0.01 && distTarget < 0.01 && distZoom < 0.01) {
          isTransitioning.current = false;
        }
      }

      controls.current.update();

      // 4. Clamp Pan Limits (Always active)
      const target = controls.current.target;
      target.x = THREE.MathUtils.clamp(target.x, -panLimit, panLimit);
      target.y = THREE.MathUtils.clamp(target.y, -panLimit, panLimit);
      target.z = THREE.MathUtils.clamp(target.z, -panLimit, panLimit);
    }
  });

  // 🔹 Initial position reset (only on mount)
  useEffect(() => {
    if (controls.current) {
      controls.current.target.set(...targetLookAt);
      controls.current.object.position.set(...targetPosition);
      controls.current.update();
    }
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
export default function Scene({ children, cameraConfig }) {
  const frustumSize = 11;

  // Default config if none provided (fallback)
  const defaultConfig = {
    position: [3, 3, 3],
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
      gl={{ antialias: true }}
      onCreated={({ gl }) => {
        gl.setClearColor("#030f1f");
      }}
    >
      <OrthographicCamera
        makeDefault
        left={-frustumSize}
        right={frustumSize}
        top={frustumSize / 2}
        bottom={-frustumSize / 2}
        near={0.1}
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
    </Canvas>
  );
}