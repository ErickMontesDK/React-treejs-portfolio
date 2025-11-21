import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, OrthographicCamera } from '@react-three/drei';
import * as THREE from 'three';

/**
 * DESIGN PATTERN: Separation of Concerns
 * Instead of putting all logic inside the main Scene component, we split it into smaller,
 * focused components like CameraController. This makes the code easier to test, reuse, and debug.
 */
function CameraController() {
  const controls = useRef();
  const panLimit = 3;

  // 🔹 Limit movement (pan)
  // HOOK: useFrame
  // This hook runs on every frame (60 times per second). It's the "game loop" of R3F.
  // We use it here to constantly check and clamp the camera target position.
  useFrame(() => {
    if (controls.current) {
      const target = controls.current.target;

      // Clamp the target position to keep the camera within bounds
      target.x = THREE.MathUtils.clamp(target.x, -panLimit, panLimit);
      target.y = THREE.MathUtils.clamp(target.y, -panLimit, panLimit);
      target.z = THREE.MathUtils.clamp(target.z, -panLimit, panLimit);
    }
  });

  // 🔹 Initial position reset
  useEffect(() => {
    if (controls.current) {
      controls.current.target.set(0, 1, 0);
      controls.current.object.position.set(3, 4, 3);
      controls.current.update();
    }
  }, []);

  return (
    <OrbitControls
      ref={controls}
      enablePan
      enableRotate={true}
      minZoom={1.7}
      maxZoom={5}
      minAzimuthAngle={0}
      maxAzimuthAngle={Math.PI / 2}
      minPolarAngle={0}
      maxPolarAngle={Math.PI / 2.1}
      minDistance={3}
      maxDistance={10}
      target={[0, 1, 0]}
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
export default function Scene({ children }) {
  const frustumSize = 11;

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
        position={[3, 3, 3]}
        zoom={1.7}
      />

      {/* Updates the camera frustum on resize */}
      <CameraUpdater />

      {/* Encapsulated controls logic */}
      <CameraController />

      {children}
    </Canvas>
  );
}