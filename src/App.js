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

  return (
    <div className="App">
      <MainScene camera={camera} setCamera={setCamera} />
      <Menu
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        camera={camera}
        setCamera={setCamera}
      />
      <Titles />
    </div>
  );
}

export default App;
