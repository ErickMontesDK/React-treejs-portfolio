import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/variables.css';
import './styles/global.css';
import MainScene from './components/three/MainScene.jsx';
import Menu from './components/layout/Menu.jsx';
import { useEffect, useState } from 'react';
import Titles from './components/layout/Titles.jsx';
import camaras from './data/camaras';
import { MusicProvider } from './context/MusicContext';
import InfoCards from './components/ui/InfoCards';
import Skills from './components/htmlScreens/skills';
import About from './components/htmlScreens/about';
import IpodPlayer from './components/ui/IpodPlayer';
import Loader from './components/ui/Loader';
import ControlsHelper from './components/ui/ControlsHelper';
// import MobileWarning from './components/ui/MobileWarning'; // Superseded by MobileApp
import MobileApp from './MobileApp';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [camera, setCamera] = useState(camaras.main);
  const [isHelperOn, setIsHelperOn] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detect mobile device
    const checkMobile = () => {
      const userAgent = typeof navigator === 'undefined' ? '' : navigator.userAgent;
      const mobile = Boolean(
        userAgent.match(
          /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
        )
      );
      setIsMobile(mobile);
    };
    checkMobile();
  }, []);

  useEffect(() => {
    setIsHelperOn(false);
  }, [camera]);

  // Render Mobile Version
  if (isMobile) {
    return (
      <div className="mobile-root-wrapper" style={{ width: '100vw', height: '100vh', overflow: 'hidden' }}>
        {!isStarted && <Loader onEnter={() => setIsStarted(true)} />}
        <MobileApp />
      </div>
    );
  }

  // Render Desktop Version
  return (
    <MusicProvider>
      <div className={`App ${darkMode ? 'dark-mode' : ''}`}>
        {/* <MobileWarning /> Replaced by MobileApp logic */}
        {!isStarted && <Loader onEnter={() => setIsStarted(true)} />}

        <MainScene
          camera={camera}
          setCamera={setCamera}
          isHelperOn={isHelperOn}
          darkMode={darkMode}
        >


          {(camera === camaras.skills) &&
            <InfoCards
              className={"right"}
            >
              <Skills />
            </InfoCards>}

          {(camera === camaras.about) &&
            <InfoCards
              className={"right"}
            >
              <About />
            </InfoCards>
          }

          {(camera === camaras.music) &&
            <InfoCards
              className={"right"}
            >
              <IpodPlayer />
            </InfoCards>
          }

        </MainScene>

        <ControlsHelper isHelperOn={isHelperOn} />

        <Menu
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          camera={camera}
          setCamera={setCamera}
          isHelperOn={isHelperOn}
          setIsHelperOn={setIsHelperOn}
          isStarted={isStarted}
        />
        {
          camera === camaras.skills ? (
            <Titles key="skills" header="Skills" sub="" />
          ) : camera === camaras.about ? (
            <Titles key="about" header="About" sub="" />
          ) : camera === camaras.experience ? (
            <Titles key="experience" header="Experience" sub="" />
          ) : camera === camaras.contact ? (
            <Titles key="contact" header="Contact" sub="" />
          ) : camera === camaras.projects ? (
            <Titles key="projects" header="Projects" sub="" />
          ) : camera === camaras.blog ? (
            <Titles key="blog" header="Blog" sub="" />
          ) : camera === camaras.music ? (
            <Titles key="music" header="Music Player" sub="" />
          ) : (
            <Titles key="home" header="Erick Montes Bedolla" sub="FullStack Developer" />
          )
        }
      </div>
    </MusicProvider>
  );
}

export default App;
