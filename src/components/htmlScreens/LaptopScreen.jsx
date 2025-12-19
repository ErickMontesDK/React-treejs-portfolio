import React from 'react';
import '../../styles/laptopScreen.css';

export default function LaptopProjectScreen({ project }) {
    if (!project) return null;

    return (
        <div className="laptop-project-container">
            {/* Simple address bar style for image viewer */}
            <div className="image-viewer-bar">
                <div className="bar-url">
                    <i className="fa-solid fa-image"></i>
                    <span>{project.title} - Preview</span>
                </div>
                <div className="window-controls">
                    <span className="control minimize"><i className="fa-solid fa-minus"></i></span>
                    <span className="control maximize"><i className="fa-regular fa-square"></i></span>
                    <span className="control close"><i className="fa-solid fa-xmark"></i></span>
                </div>
            </div>

            <div className="laptop-content-image">
                <div className="full-image" style={{
                    backgroundImage: `url(${project.image})`
                }}>
                </div>
            </div>
        </div>
    );
}
