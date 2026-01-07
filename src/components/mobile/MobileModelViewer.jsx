import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import Model from '../three/Model';

export default function MobileModelViewer({
    darkMode,
    modelData,
    farLength = 5,
    height = "350px",
    autoRotate = true,
    position = [0, -1, 0],
    scale = [1, 1, 1],
    lightIntensity = 0.5,
}) {
    if (!modelData) return null;

    return (
        <div className="hero-3d-container" style={{ height }}>
            <Canvas
                shadows
                dpr={[1, 2]}
                camera={{ position: [0, 0, farLength], fov: 50 }}
                gl={{ preserveDrawingBuffer: true }}
            >
                <Suspense fallback={null}>
                    <ambientLight intensity={lightIntensity} />
                    <directionalLight
                        position={[5, 5, 5]}
                        intensity={1}
                        castShadow
                    />
                    <spotLight
                        position={[-5, 5, 5]}
                        intensity={lightIntensity}
                        angle={0.3}
                    />

                    <Environment preset="city" />

                    <Model
                        name={modelData.name}
                        src={modelData.model}
                        animationStyle="onLoop"
                        onDarkMode={darkMode}
                        position={position}
                        scale={scale}
                    />

                    <OrbitControls
                        makeDefault
                        enableZoom={false}
                        enablePan={false}
                        autoRotate={autoRotate}
                        autoRotateSpeed={4}
                        target={[0, 0, 0]}
                        minPolarAngle={Math.PI / 3}
                        maxPolarAngle={Math.PI / 3}
                    />
                </Suspense>
            </Canvas>
        </div>
    );
}
