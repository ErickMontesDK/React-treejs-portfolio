import React from 'react';
import './Tooltip.css';

/**
 * COMPONENT: Tooltip
 * 
 * Displays a tooltip that follows the mouse cursor when hovering over 3D objects.
 * Shows the section name for interactive models.
 */
export default function Tooltip({ visible, text, position }) {
    if (!visible || !text) return null;

    return (
        <div
            className="tooltip"
            style={{
                left: `${position.x}px`,
                top: `${position.y}px`,
            }}
        >
            <p className="tooltip-text">{text}</p>
        </div>
    );
}
