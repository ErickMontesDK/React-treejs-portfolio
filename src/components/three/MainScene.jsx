import { useEffect, useState } from 'react';
import SceneBase from './Scene';
import Model from './Model';
import models from '../../data/models';
import Lights from './Lights';
import camaras from '../../data/camaras';
import Tooltip from '../ui/Tooltip';
import HtmlModelScreen from './htmlModelScreen';
import Experience from './../htmlScreens/experience';


export default function MainScene(props) {
  const [switchesState, setSwitchesState] = useState({});
  const { camera, setCamera, isHelperOn, children } = props;
  const [disableFeatures, setDisableFeatures] = useState(false);

  useEffect(() => {
    if (camera !== camaras.main) {
      setDisableFeatures(true);
    } else {
      setDisableFeatures(false);
    }
  }, [camera]);

  // Tooltip state
  const [tooltip, setTooltip] = useState({
    visible: false,
    text: '',
    position: { x: 0, y: 0 }
  });


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

  // Handle mouse move to update tooltip position
  const handleMouseMove = (e) => {
    setTooltip(prev => ({
      ...prev,
      position: { x: e.clientX, y: e.clientY }
    }));
  };

  // Show tooltip
  const showTooltip = (text) => {
    setTooltip(prev => ({
      ...prev,
      visible: true,
      text: text
    }));
  };

  // Hide tooltip
  const hideTooltip = () => {
    setTooltip(prev => ({
      ...prev,
      visible: false
    }));
  };

  return (
    <div id="three-container" onMouseMove={handleMouseMove}>
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
            tooltipText={model.description ?? null}
            onShowTooltip={showTooltip}
            onHideTooltip={hideTooltip}
            disableFeatures={disableFeatures}
          >
            {model.name === "phone" && camera === camaras.experience &&
              <HtmlModelScreen
                rotation={[-Math.PI / 2, 0, Math.PI / 1.225]}
                position={[-1.571, .9, .425]}
                className="phone-screen">
                <Experience />
              </HtmlModelScreen>
            }
            {model.name === "laptop" && camera === camaras.projects &&
              <HtmlModelScreen
                rotation={[0, Math.PI / 2, 0]}
                position={[-1.98, 1.165, -.15]}
                className="laptop-screen">
                <Experience />
              </HtmlModelScreen>
            }
            {model.name === "screen" && camera === camaras.projects &&
              <group rotation={[0, Math.PI / 2, 0]}>
                <HtmlModelScreen
                  rotation={[Math.PI / 30, 0, 0]}
                  position={[.15, 1.682, -1.97]}
                  className="hdmi-screen">
                  <Experience />
                </HtmlModelScreen>
              </group>
            }
          </Model>
        ))}
        <Lights
          switchStates={switchesState}
        />
      </SceneBase>

      {children}

      {/* Tooltip overlay */}
      {
        !disableFeatures && (
          <Tooltip
            visible={tooltip.visible}
            text={tooltip.text}
            position={tooltip.position}
          />
        )
      }
    </div >
  );
}

