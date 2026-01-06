import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import Model from '../three/Model';
import models from '../../data/models';
import Loader from '../ui/Loader';
import avatar from "./../../assets/models/avatar.glb"

export default function MobileHero({ darkMode }) {
    const avatarData = {
        name: "avatar",
        model: avatar,
    }
    const heroModel = avatarData || models[0];

    return (
        <section className="mobile-section mobile-hero">
            <div className="hero-text">
                <h1>Hi, I'm <span className="highlight">Erick</span></h1>
                <p className="hero-subtitle">Interactive 3D Portfolio</p>
                <div className="hero-badges">
                    <span className="badge">FullStack</span>
                    <span className="badge">Creative</span>
                    <span className="badge">Developer</span>
                </div>
            </div>

            <div className="hero-3d-container">
                <Canvas
                    shadows
                    dpr={[1, 2]}
                    camera={{ position: [0, 0, 3], fov: 50 }}
                    gl={{ preserveDrawingBuffer: true }}
                >
                    <Suspense fallback={null}>
                        {/* Iluminación manual en lugar de Stage */}
                        <ambientLight intensity={0.5} />
                        <directionalLight
                            position={[5, 5, 5]}
                            intensity={1}
                            castShadow
                        />
                        <spotLight
                            position={[-5, 5, 5]}
                            intensity={0.5}
                            angle={0.3}
                        />

                        {/* Environment para reflections */}
                        <Environment preset="city" />

                        <Model
                            name={heroModel.name}
                            src={heroModel.model}
                            animationStyle="onLoop"
                            onDarkMode={darkMode}
                            position={[0, -1, 0]}  // Ajusta según tu modelo
                            scale={[1, 1, 1]}      // Ajusta la escala aquí
                        />

                        <OrbitControls
                            makeDefault
                            enableZoom={false}
                            enablePan={false}
                            autoRotate
                            autoRotateSpeed={4}
                            target={[0, 0, 0]}
                            minPolarAngle={Math.PI / 3

                            }
                            maxPolarAngle={Math.PI / 3}
                        />
                    </Suspense>
                </Canvas>
            </div>

            <p className="hero-instruction">
                <i className="fa-solid fa-arrow-down"></i> Scroll to Explore
            </p>
        </section>
    );
}