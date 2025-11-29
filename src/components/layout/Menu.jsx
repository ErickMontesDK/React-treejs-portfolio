import camaras from "../../data/camaras";

export default function Menu(props) {

    const { darkMode, setDarkMode, camera, setCamera, setIsHelperOn } = props;
    const handleDarkMode = () => {
        setDarkMode(!darkMode);
    }
    return (
        <div id="menu">
            {camera !== camaras.main ? (
                <button className="comic-button primary" onClick={() => setCamera(camaras.main)}><i className="fa-solid fa-house"></i></button>
            ) : null}
            <button
                className="comic-button secondary"
                onMouseDown={() => setIsHelperOn(true)}
                onMouseUp={() => setIsHelperOn(false)}
            >
                <i className="fa-solid fa-question"></i>
            </button>
            <button className="comic-button" onClick={handleDarkMode}><i className={`fa-solid ${darkMode ? 'fa-sun' : 'fa-moon'}`}></i></button>
            <button className="comic-button tertiary"><i className="fa-solid fa-music"></i></button>
        </div>
    )
}
