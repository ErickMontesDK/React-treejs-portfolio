import React, { useState, useEffect } from 'react';
import '../../styles/musicHint.css';

export default function MusicHint({ isStarted }) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Only show hint after loader is dismissed
        if (!isStarted) return;

        // Show the hint
        setIsVisible(true);

        // Hide after 5 seconds
        const timer = setTimeout(() => {
            setIsVisible(false);
        }, 5000);

        return () => clearTimeout(timer);
    }, [isStarted]);

    if (!isVisible) return null;

    return (
        <div className="music-hint">
            <div className="hint-bubble">
                <i className="fa-solid fa-play hint-icon"></i>
                <span className="hint-text">Play music</span>
            </div>
            <div className="hint-arrow"></div>
        </div>
    );
}
