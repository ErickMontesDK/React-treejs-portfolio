import React, { useState } from 'react';
import { Object3D } from 'three';
import { SpotLight } from '@react-three/drei';
import lightsData from '../../data/lights.json';

const SpotLightItem = ({ targetPosition, volumetric = false, ...props }) => {
    const [target] = useState(() => new Object3D())

    return (
        <>
            <primitive object={target} position={targetPosition} />
            <SpotLight
                target={target}
                {...(volumetric ? {
                    opacity: 0.3,
                    attenuation: 5,
                    anglePower: 5,
                    radiusTop: 0.1,
                    radiusBottom: 0.5,
                } : {})}
                {...props}
            />
        </>
    )
}

export default function Lights({ switchStates, darkMode }) {
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
                        availableModes = [],
                        triggerId = null,
                        target = [0, 0, 0],
                        distance = 0,
                        decay = 2,
                        color = '#ffffff',
                        volumetric = false,
                        attenuation = 5,
                        anglePower = 5,
                        radiusTop = 0.1,
                        radiusBottom = 0.5,
                        opacity = 0.3
                    } = light;

                    let currentIntensity = intensity
                    let currentOpacity = opacity

                    if (lightTag !== null) {
                        currentIntensity = switchStates[lightTag] ? intensity : 0
                    }



                    if (!(availableModes.includes('dark') && availableModes.includes('light')) && ((availableModes.includes('dark') && darkMode === false) || (availableModes.includes('light') && darkMode === true))) {
                        currentIntensity = 0
                        currentOpacity = 0
                    }

                    currentOpacity = currentIntensity === 0 ? 0 : currentOpacity

                    switch (type) {
                        case 'spotlight':
                            // console.log(target)
                            return (
                                <SpotLightItem
                                    key={index}
                                    position={position}
                                    angle={angle}
                                    castShadow={castShadow}
                                    shadow-mapSize={shadowMapSize}
                                    intensity={currentIntensity}
                                    name={triggerId}
                                    targetPosition={target}
                                    color={color}
                                    volumetric={volumetric}
                                    distance={distance}
                                    decay={decay}
                                    attenuation={attenuation}
                                    anglePower={anglePower}
                                    radiusTop={radiusTop}
                                    radiusBottom={radiusBottom}
                                    opacity={currentOpacity}
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
                        default:
                            return null;
                    }
                })
            }
        </>
    )
}