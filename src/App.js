import './styles/variables.css';
import './styles/global.css';
import MainScene from './components/three/MainScene.jsx';
import Menu from './components/layout/Menu.jsx';
import { useState } from 'react';
import Titles from './components/layout/Titles.jsx';
import camaras from './data/camaras';
import { MusicProvider } from './context/MusicContext';
import InfoCards from './components/ui/InfoCards';
import Skills from './components/htmlScreens/skills';
import About from './components/htmlScreens/about';
import IpodPlayer from './components/ui/IpodPlayer';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [camera, setCamera] = useState(camaras.main);
  const [isHelperOn, setIsHelperOn] = useState(false);

  return (
    <MusicProvider>
      <div className="App">
        <MainScene
          camera={camera}
          setCamera={setCamera}
          isHelperOn={isHelperOn}
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
        <Menu
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          camera={camera}
          setCamera={setCamera}
          setIsHelperOn={setIsHelperOn}
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
