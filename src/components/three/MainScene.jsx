import React, { useState } from 'react';
import SceneBase from './Scene';
import { useGLTF } from '@react-three/drei';
import Model from './Model';
import models from '../../data/models';
import createGradientMap from '../../utils/createGradientMap';
import Lights from './Lights';



export default function MainScene() {
  const [switchesState, setSwitchesState] = useState({});

  const handleSwitchChange = (names, value) => {
    setSwitchesState((prevState) => {
      const newState = { ...prevState };
      for (const name of names) {
        newState[name] = value;
      }
      return newState;
    });
  };


  return (
    <div id="three-container" >
      <SceneBase>
        {/* Suelo */}
        <mesh position={[0, -1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[5, 30]} />
          <meshStandardMaterial color="#08550d" />
        </mesh>

        {/* Modelo cargado */}

        {models?.map((model, index) => (
          <Model
            key={index}
            name={model.name}
            src={model.model}
            animationStyle={model.animation ?? null}
            onDarkMode={true}
            switchLight={model.lightTags ? ((value) => handleSwitchChange(model.lightTags, value)) : null}
            initialStateDark={model.initialStateDark ?? false}
            initialStateLight={model.initialStateLight ?? false}
          />
        ))}
        <Lights
          switchStates={switchesState}
        />
      </SceneBase>
    </div>
  );
}

