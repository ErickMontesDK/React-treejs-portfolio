import './styles/variables.css';
import './styles/global.css';
import MainScene from './components/three/MainScene.jsx';
import Menu from './components/layout/Menu.jsx';
import { useState } from 'react';
import Titles from './components/layout/Titles.jsx';
import camaras from './data/camaras';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [camera, setCamera] = useState(camaras.main);
  const [isHelperOn, setIsHelperOn] = useState(false);

  return (
    <div className="App">
      <MainScene
        camera={camera}
        setCamera={setCamera}
        isHelperOn={isHelperOn} />
      <Menu
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        camera={camera}
        setCamera={setCamera}
        setIsHelperOn={setIsHelperOn}
      />
      <Titles />
    </div>
  );
}

export default App;
