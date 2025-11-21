import React, {useState} from 'react';
import SceneBase from './components/three/Scene';
import { useGLTF } from '@react-three/drei';
import room from './assets/models/room.glb';
import coke from './assets/models/coke.glb';
import Model from './components/three/Model';
import models from './data/models';
import createGradientMap from './utils/createGradientMap';
import Lights from './components/three/Lights';



export default function Three() {
  const [switchesState, setSwitchesState] = useState({});

  const handleSwitchChange = (names, value) => {
    console.log("webos", names, value);
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
          key = {index}
          name={model.name}
          src={model.model} 
          animationStyle={model.animation ?? null}
          onDarkMode={true}  
          switchLight={model.lightTags ? ((value) => handleSwitchChange(model.lightTags, value)) : null}
          initialStateDark = {model.initialStateDark ?? false}
          initialStateLight = {model.initialStateLight ?? false}
          />
        ))}
        <Lights 
          switchStates={switchesState}
        />
      </SceneBase>
    </div>
  );
}

