import React, { useEffect, useRef, useState } from 'react';
import './Tooltip.css';

/**
 * COMPONENT: Tooltip
 * 
 * Displays a tooltip that follows the mouse cursor when hovering over 3D objects.
 * Shows the section name for interactive models.
 * Automatically adjusts position to stay within viewport bounds.
 */
export default function Tooltip(props) {
    const { position, text, visible } = props;
    const tooltipRef = useRef(null);
    const [adjustedPosition, setAdjustedPosition] = useState({ x: position.x, y: position.y });
    const [flipHorizontal, setFlipHorizontal] = useState(false);

    useEffect(() => {
        if (!visible || !tooltipRef.current) return;

        const tooltip = tooltipRef.current;
        const rect = tooltip.getBoundingClientRect();
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        let newX = position.x;
        let newY = position.y;
        let shouldFlip = false;

        // Check if tooltip goes beyond right edge
        if (position.x + rect.width + 15 > viewportWidth) {
            // Flip to left side of cursor
            shouldFlip = true;
            newX = position.x;
        }

        // Check if tooltip goes beyond bottom edge
        if (position.y + rect.height / 2 > viewportHeight) {
            newY = viewportHeight - rect.height / 2 - 10;
        }

        // Check if tooltip goes beyond top edge
        if (position.y - rect.height / 2 < 0) {
            newY = rect.height / 2 + 10;
        }

        setAdjustedPosition({ x: newX, y: newY });
        setFlipHorizontal(shouldFlip);
    }, [position, visible]);

    if (!visible || !text) return null;

    return (
        <div
            ref={tooltipRef}
            className={`tooltip ${flipHorizontal ? 'tooltip-flipped' : ''}`}
            style={{
                left: `${adjustedPosition.x}px`,
                top: `${adjustedPosition.y}px`,
                zIndex: 10000,
            }}
        >
            <p className="tooltip-text">{text}</p>
        </div>
    );
}