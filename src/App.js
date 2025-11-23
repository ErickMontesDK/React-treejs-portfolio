import './styles/variables.css';
import './styles/global.css';
import MainScene from './components/three/MainScene.jsx';
import Menu from './components/layout/Menu.jsx';
import { useState } from 'react';
import Titles from './components/layout/Titles.jsx';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className="App">
      <MainScene />
      <Menu />
      <Titles />
    </div>
  );
}

export default App;
