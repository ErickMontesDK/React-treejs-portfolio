import React from 'react';
import camaras from '../../data/camaras';
import '../../styles/navMenu.css';

const sections = [
    { name: 'Home', icon: 'fa-house', camera: 'main' },
    { name: 'About', icon: 'fa-user', camera: 'about' },
    { name: 'Skills', icon: 'fa-gears', camera: 'skills' },
    { name: 'Experience', icon: 'fa-briefcase', camera: 'experience' },
    { name: 'Projects', icon: 'fa-code', camera: 'projects' },
    // { name: 'Blog', icon: 'fa-book', camera: 'blog' },
    { name: 'Music', icon: 'fa-music', camera: 'music' },
    { name: 'Contact', icon: 'fa-envelope', camera: 'contact' },
    { name: 'Resume', icon: 'fa-file-pdf', action: () => window.open(`${process.env.PUBLIC_URL}/resume.pdf`, '_blank') },
];

export default function NavMenu({ isOpen, closeMenu, setCamera, currentCamera }) {
    if (!isOpen) return null;

    const handleNav = (section) => {
        if (section.action) {
            section.action();
        } else if (section.camera) {
            setCamera(camaras.main);
            setTimeout(() => {
                setCamera(camaras[section.camera]);
            }, 10);
        }
        closeMenu();
    };

    return (
        <div className="nav-dropdown-wrapper">
            {/* Click-away overlay */}
            <div className="nav-click-outside" onClick={closeMenu}></div>

            <div className="nav-menu-list comic-box">
                {sections.map((section, index) => {
                    const isActive = section.camera && camaras[section.camera] === currentCamera;

                    return (
                        <button
                            key={index}
                            className={`nav-item-row ${isActive ? 'active' : ''}`}
                            onClick={() => handleNav(section)}
                            disabled={isActive}
                        >
                            <i className={`fa-solid ${section.icon} nav-row-icon`}></i>
                            <span className="nav-row-name">{section.name}</span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
