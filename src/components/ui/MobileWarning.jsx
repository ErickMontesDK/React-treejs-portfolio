import React, { useState, useEffect } from 'react';
import '../../styles/variables.css';

export default function MobileWarning() {
    const [showWarning, setShowWarning] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        // Simple/Naive mobile detection
        const userAgent = typeof navigator === 'undefined' ? '' : navigator.userAgent;
        const mobile = Boolean(
            userAgent.match(
                /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
            )
        );
        setIsMobile(mobile);

        // Show warning if mobile and not previously dismissed
        const dismissed = localStorage.getItem('mobile_warning_dismissed');
        if (mobile && !dismissed) {
            setShowWarning(true);
        }
    }, []);

    const handleContinue = () => {
        setShowWarning(false);
        // localStorage.setItem('mobile_warning_dismissed', 'true'); // Uncomment if we want to persist
    };

    if (!showWarning) return null;

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0,0,0,0.9)',
            zIndex: 9999,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'white',
            padding: '20px',
            textAlign: 'center',
            fontFamily: "'Bangers', cursive"
        }}>
            <h1 style={{
                color: '#FFE600',
                fontSize: '2.5rem',
                marginBottom: '20px',
                textTransform: 'uppercase',
                letterSpacing: '2px'
            }}>
                Wait a second!
            </h1>

            <div style={{
                maxWidth: '400px',
                marginBottom: '40px',
                fontFamily: "'Patrick Hand', cursive",
                fontSize: '1.2rem',
                lineHeight: '1.5'
            }}>
                <p>This 3D experience is designed for High-Performance Desktop computers.</p>
                <p style={{ marginTop: '15px', color: '#ff6b6b' }}>
                    <strong>iPhone/Mobile Users:</strong> You might experience crashes or lag due to high memory usage.
                </p>
            </div>

            <button
                onClick={handleContinue}
                style={{
                    padding: '12px 30px',
                    fontSize: '1.2rem',
                    backgroundColor: '#FFE600',
                    border: '3px solid black',
                    boxShadow: '4px 4px 0px white',
                    fontFamily: "'Bangers', cursive",
                    cursor: 'pointer',
                    color: 'black',
                    textTransform: 'uppercase',
                    transform: 'rotate(-2deg)'
                }}
            >
                I Understand, Continue
            </button>
        </div>
    );
}
