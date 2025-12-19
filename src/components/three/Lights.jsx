import lightsData from '../../data/lights.json';
import { useState } from 'react';
import { Object3D } from 'three';

const SpotLightItem = ({ targetPosition, ...props }) => {
    const [target] = useState(() => new Object3D())

    return (
        <>
            <primitive object={target} position={targetPosition} />
            <spotLight target={target} {...props} />
        </>
    )
}

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
                                    targetPosition={target} // enviamos la posicion del target
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