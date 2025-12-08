import lightsData from '../../data/lights.json';
import { useState } from 'react';

export default function Lights({ switchStates }) {
    const lights = lightsData.lights

    return (
        <>

            {
                lights.map((light, index) => {
                    const {
                        lightTag = null,
                        type,
                        intensity = 0,
                        position = [0, 0, 0],
                        angle = 0,
                        castShadow = false,
                        shadowMapSize = [1024, 1024],
                        triggerId = null,
                        target = [0, 0, 0],
                        distance = 0,
                        decay = 2,
                        color = '#ffffff'
                    } = light;

                    let currentIntensity = intensity

                    if (lightTag !== null) {
                        currentIntensity = switchStates[lightTag] ? intensity : 0
                    }

                    switch (type) {
                        case 'spotlight':
                            return (
                                <spotLight
                                    key={index}
                                    position={position}
                                    angle={angle}
                                    castShadow={castShadow}
                                    shadow-mapSize={shadowMapSize}
                                    intensity={currentIntensity}
                                    name={triggerId}
                                    target-position={target}
                                    color={color}
                                    debug={true}
                                />
                            )
                        case 'point':
                            return (
                                <pointLight
                                    key={index}
                                    position={position}
                                    color={color || '#ffffff'}
                                    intensity={currentIntensity}
                                    distance={distance || 0}
                                    decay={decay || 2}
                                    castShadow={castShadow}
                                    name={triggerId}
                                />
                            )
                        case 'ambient':
                            return (
                                <ambientLight
                                    key={index}
                                    intensity={currentIntensity}
                                    name={triggerId}
                                    color={color}
                                />
                            )
                    }
                })
            }
        </>
    )
}