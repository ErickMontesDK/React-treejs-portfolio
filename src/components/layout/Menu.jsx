import camaras from "../../data/camaras";
import { useState } from "react";
import { useMusic } from "../../context/MusicContext";



export default function Menu(props) {
    const { darkMode, setDarkMode, camera, setCamera, setIsHelperOn } = props;
    const { togglePlay, isPlaying } = useMusic();

    const handleDarkMode = () => {
        setDarkMode(!darkMode);
    }

    const handleAudio = () => {
        togglePlay();
    }


    return (
        <div id="menu">
            {camera !== camaras.main ? (
                <button className="comic-button primary" onClick={() => setCamera(camaras.main)}><i className="fa-solid fa-house"></i></button>
            ) :
                (
                    <button
                        className="comic-button secondary"
                        onMouseDown={() => setIsHelperOn(true)}
                        onMouseUp={() => setIsHelperOn(false)}
                    >
                        <i className="fa-solid fa-question"></i>
                    </button>
                )
            }

            <button className="comic-button" onClick={handleDarkMode}><i className={`fa-solid ${darkMode ? 'fa-sun' : 'fa-moon'}`}></i></button>
            <button className="comic-button tertiary" onClick={handleAudio}>
                <i className={`fa-solid ${isPlaying ? 'fa-music' : 'fa-volume-xmark'}`}></i>
            </button>
        </div>
    )
}
