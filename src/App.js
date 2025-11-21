import logo from './logo.svg';
import './styles/variables.css';
import './styles/global.css';
import Three from './three.jsx';
import Footer from './components/footer.jsx';
import Menu from './components/menu.jsx';
import { useState } from 'react';
import Titles from './components/titles.jsx';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className="App">
        <Three />
        <Menu />
        <Titles />
        {/* <Footer /> */}
    </div>
  );
}

export default App;
