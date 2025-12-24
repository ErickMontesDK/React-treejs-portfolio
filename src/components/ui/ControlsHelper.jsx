import React from 'react';
import '../../styles/helpers.css';

const ControlsHelper = ({ isHelperOn }) => {
    if (!isHelperOn) return null;

    return (
        <div className="controls-helper-container">
            <div className="helper-tag comic-box">
                <i className="fa-solid fa-mouse-left-click"></i>
                <span>Left Click: Rotate</span>
            </div>
            <div className="helper-tag comic-box">
                <i className="fa-solid fa-arrows-up-down"></i>
                <span>Scroll: Zoom</span>
            </div>
            <div className="helper-tag comic-box">
                <i className="fa-solid fa-mouse-right-click"></i>
                <span>Right Click: Pan</span>
            </div>
            <div className="helper-tag comic-box interactive">
                <i className="fa-solid fa-lightbulb"></i>
                <span>Illuminated areas are interactive!</span>
            </div>
        </div>
    );
};

export default ControlsHelper;
