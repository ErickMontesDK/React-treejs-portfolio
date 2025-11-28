export default function Menu(props) {

    const { darkMode, setDarkMode } = props;
    const handleDarkMode = () => {
        setDarkMode(!darkMode);
    }
    return (
        <div id="menu">
            <button className="comic-button secondary"><i className="fa-solid fa-question"></i></button>
            <button className="comic-button" onClick={handleDarkMode}><i className={`fa-solid ${darkMode ? 'fa-sun' : 'fa-moon'}`}></i></button>
            <button className="comic-button tertiary"><i className="fa-solid fa-music"></i></button>
        </div>
    )
}
