import camaras from "../../data/camaras";

import { useMusic } from "../../context/MusicContext";
import MusicHint from "../ui/MusicHint";
import NavMenu from "./NavMenu";
import { useState } from "react";



export default function Menu(props) {
    const { darkMode, setDarkMode, camera, setCamera, setIsHelperOn, isStarted } = props;
    const { isPlaying, togglePlay } = useMusic();
    const [isNavOpen, setIsNavOpen] = useState(false);

    const handleDarkMode = () => {
        setDarkMode(!darkMode);
    }

    const handleMusicToggle = () => {
        togglePlay();
    }


    return (
        <>
            <div id="menu">
                {camera !== camaras.main ? (
                    <button className="comic-button primary" onClick={() => setCamera(camaras.main)}><i className="fa-solid fa-house"></i></button>
                ) :
                    (
                        <button
                            className="comic-button secondary"
                            onMouseDown={() => setIsHelperOn(true)}
                            onMouseUp={() => setIsHelperOn(false)}
                            onTouchStart={() => setIsHelperOn(true)}
                            onTouchEnd={() => setIsHelperOn(false)}
                        >
                            <i className="fa-solid fa-question"></i>
                        </button>
                    )
                }


                <button className="comic-button" onClick={handleDarkMode}><i className={`fa-solid ${darkMode ? 'fa-sun' : 'fa-moon'}`}></i></button>
                <button className="comic-button tertiary" onClick={handleMusicToggle}>
                    <i className={`fa-solid ${isPlaying ? 'fa-pause' : 'fa-play'}`}></i>
                </button>
                <button className="comic-button" onClick={() => setIsNavOpen(!isNavOpen)}>
                    {isNavOpen ? <i className="fa-solid fa-xmark"></i> : <i className="fa-solid fa-bars"></i>}
                </button>

                <NavMenu isOpen={isNavOpen} closeMenu={() => setIsNavOpen(false)} setCamera={setCamera} currentCamera={camera} />
            </div>
            <MusicHint isStarted={isStarted} />
        </>
    )
}
