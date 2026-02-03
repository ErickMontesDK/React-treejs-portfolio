import './styles/variables.css';
import './styles/global.css'; // Reusing global fonts and vars
import './mobile.css'; // New mobile-specific styles

// Mobile Components
import MobileHero from './components/mobile/MobileHero';
import MobileAbout from './components/mobile/MobileAbout';
import MobileSkills from './components/mobile/MobileSkills';
import MobileExperience from './components/mobile/MobileExperience';
import MobileProjects from './components/mobile/MobileProjects';
import MobileContact from './components/mobile/MobileContact';
import { useState } from 'react';
import avatar from "./assets/models/avatar.glb"

export default function MobileApp() {
    const [darkMode, setDarkMode] = useState(false);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    const avatarData = {
        name: "avatar",
        model: avatar,
    }

    return (
        <div className={`mobile-app ${darkMode ? 'dark-mode' : ''}`}>

            {/* Mobile Header per section or Sticky Top? Sticky Top is better */}
            <header className="mobile-header">
                <div className="mobile-brand">
                    <span className="brand-name">Erick Montes</span>
                    <span className="brand-role">FullStack Dev</span>
                </div>
                <button className="comic-button mobile-theme-toggle" onClick={toggleDarkMode}>
                    <i className={`fa-solid ${darkMode ? 'fa-sun' : 'fa-moon'}`}></i>
                </button>
            </header>

            <main className="mobile-content">
                <div className="mobile-disclaimer-wrapper">
                    <div className="mobile-disclaimer">
                        <i className="fa-solid fa-desktop"></i>
                        <span>Best on Desktop for 3D experience</span>
                    </div>
                </div>

                <MobileHero darkMode={darkMode} modelData={avatarData} farLength={3} />
                <MobileAbout darkMode={darkMode} />
                <MobileSkills darkMode={darkMode} />
                <MobileExperience darkMode={darkMode} />
                <MobileProjects darkMode={darkMode} />
                <MobileContact darkMode={darkMode} />
            </main>

            <footer className="mobile-footer">
                <p>&copy; 2026 Erick Montes Bedolla</p>
                <p>Designed with <i className="fa-solid fa-heart" ></i> & React Three Fiber</p>
            </footer>
        </div>
    );
}
