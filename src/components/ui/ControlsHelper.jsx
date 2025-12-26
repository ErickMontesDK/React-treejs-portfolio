import React from 'react';
import '../../styles/helpers.css';

const ControlsHelper = ({ isHelperOn }) => {
    const [isTouch, setIsTouch] = React.useState(false);

    React.useEffect(() => {
        // Simple check for touch device
        setIsTouch(window.matchMedia("(pointer: coarse)").matches);
    }, []);

    if (!isHelperOn) return null;

    return (
        <div className="controls-helper-container">
            <div className="helper-tag comic-box">
                <i className={`fa-solid ${isTouch ? 'fa-hand-pointer' : 'fa-mouse-left-click'}`}></i>
                <span>{isTouch ? '1 Finger: Rotate' : 'Left Click: Rotate'}</span>
            </div>
            <div className="helper-tag comic-box">
                <i className="fa-solid fa-arrows-up-down"></i>
                <span>{isTouch ? 'Pinch: Zoom' : 'Scroll: Zoom'}</span>
            </div>
            <div className="helper-tag comic-box">
                <i className={`fa-solid ${isTouch ? 'fa-hand-peace' : 'fa-mouse-right-click'}`}></i>
                <span>{isTouch ? '2 Fingers: Pan' : 'Right Click: Pan'}</span>
            </div>
            <div className="helper-tag comic-box interactive">
                <i className="fa-solid fa-lightbulb"></i>
                <span>Illuminated areas are interactive!</span>
            </div>
        </div>
    );
};

export default ControlsHelper;
