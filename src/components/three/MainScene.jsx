import { useEffect, useState } from 'react';
import SceneBase from './Scene';
import Model from './Model';
import models from '../../data/models';
import Lights from './Lights';
import camaras from '../../data/camaras';


export default function MainScene(props) {
  const [switchesState, setSwitchesState] = useState({});
  const { camera, setCamera, isHelperOn } = props;


  const handleSwitchChange = (names, value) => {
    setSwitchesState((prevState) => {
      const newState = { ...prevState };
      for (const name of names) {
        newState[name] = value;
      }
      return newState;
    });
  };

  const handleTransition = (cameraName) => {
    console.log(cameraName, "hadouken");
    setCamera(camaras[cameraName]);
  };

  return (
    <div id="three-container" >
      <SceneBase cameraConfig={camera}>
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
            camera={model.transitions ? model.transitions.camera : null}
            transitions={model.transitions ? handleTransition : null}
            isHelperOn={isHelperOn}
          />
        ))}
        <Lights
          switchStates={switchesState}
        />
      </SceneBase>
    </div>
  );
}

