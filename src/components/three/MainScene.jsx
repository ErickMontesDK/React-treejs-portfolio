import { useEffect, useState, useContext } from 'react';
import { MusicContext } from '../../context/MusicContext';
import SceneBase from './Scene';
import Model from './Model';
import models from '../../data/models';
import Lights from './Lights';
import camaras from '../../data/camaras';
import Tooltip from '../ui/Tooltip';
import HtmlModelScreen from './htmlModelScreen';
import Experience from './../htmlScreens/experience';
import { projects } from '../../data/projects';
import LaptopProjectScreen from '../htmlScreens/LaptopScreen';
import MonitorProjectScreen from '../htmlScreens/MonitorScreen';
import Contact from '../htmlScreens/contact';
import Blog from '../htmlScreens/blog';
import IpodScreen from '../htmlScreens/ipodScreen';
import DiscoveryLabel from '../ui/DiscoveryLabel';
import discoveryLabels from '../../data/discoveryLabels';


export default function MainScene(props) {
  const [switchesState, setSwitchesState] = useState({});
  const { camera, setCamera, isHelperOn, children, darkMode } = props;
  const [disableFeatures, setDisableFeatures] = useState(false);

  // Projects State
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);

  const handleNextProject = () => {
    setCurrentProjectIndex((prev) => (prev + 1) % projects.length);
  };

  const handlePrevProject = () => {
    setCurrentProjectIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };


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

  const musicValue = useContext(MusicContext);

  return (
    <div id="three-container" onMouseMove={handleMouseMove}>
      <SceneBase cameraConfig={camera} musicValue={musicValue} darkMode={darkMode}>
        {/* Suelo */}
        <mesh position={[0, -1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[5, 30]} />
          <meshStandardMaterial color="#08550d" />
        </mesh>


        {/* Modelo cargado */}

        {models && models.map((model, index) => {
          return (
            <Model
              key={index}
              name={model.name}
              src={model.model}
              animationStyle={model.animation ?? null}
              onDarkMode={darkMode}
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
              url={model.url ?? null}
              isActive={model.transitions ? camera === camaras[model.transitions.camera] : true}
              onClick={model.onClick ? model.onClick : null}
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
                  <LaptopProjectScreen
                    project={projects[currentProjectIndex]}
                  />
                </HtmlModelScreen>
              }
              {model.name === "screen" && camera === camaras.projects &&
                <group rotation={[0, Math.PI / 2, 0]}>
                  <HtmlModelScreen
                    rotation={[Math.PI / 30, 0, 0]}
                    position={[.15, 1.682, -1.97]}
                    className="hdmi-screen">
                    <MonitorProjectScreen
                      project={projects[currentProjectIndex]}
                      onNext={handleNextProject}
                      onPrev={handlePrevProject}
                    />
                  </HtmlModelScreen>
                </group>
              }
              {model.name === "toys" && camera === camaras.contact &&
                <group rotation={[0, Math.PI / 2, 0]}>
                  {/* Main Contact Screen anchor */}
                  <HtmlModelScreen
                    rotation={[0, Math.PI / -1.8, 0]}
                    position={[2.2, 2.25, 1.4]}
                    className="contact-screen">
                    {/* Only pass activeToy if it's one of the contact toys */}
                    <Contact />
                  </HtmlModelScreen>
                </group>
              }
              {model.name === "notebook" && camera === camaras.blog &&
                <HtmlModelScreen
                  rotation={[-Math.PI / 2, 0, Math.PI / 4.4]}
                  position={[-1.57, .895, -1.155]}
                  className="blog-screen">
                  <Blog />
                </HtmlModelScreen>
              }
              {model.name === "ipod" && camera === camaras.music &&
                <HtmlModelScreen
                  rotation={[-Math.PI / 2.2, Math.PI / 33, Math.PI / 1.16]}
                  position={[1.522, 0.615, 2.0355]}
                  className="ipod-screen">
                  <IpodScreen />
                </HtmlModelScreen>
              }

            </Model>
          );
        })}
        <Lights
          switchStates={switchesState}
          darkMode={darkMode}
        />

        {/* PERSISTENT DISCOVERY LABELS (HELP MODE) */}
        {discoveryLabels.map((label) => (
          <DiscoveryLabel
            key={label.id}
            text={label.text}
            position={label.position}
            circlePosition={label.circlePosition}
            circleSize={label.circleSize}
            isVisible={isHelperOn && camera === camaras.main}
          />
        ))}
      </SceneBase>

      {/* Tooltip Always On for Debug */}
      {
        !disableFeatures && !isHelperOn && <Tooltip
          position={tooltip.position}
          text={tooltip.text}
          visible={tooltip.visible}
        />
      }



      {children}

    </div >
  );
}

