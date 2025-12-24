import { useState } from 'react';
import './../../styles/contact.css';

export default function Contact() {
    const [hoveredItem, setHoveredItem] = useState(null);

    const [showCopyMessage, setShowCopyMessage] = useState(false);

    const handleBoxClick = (url) => {
        window.open(url, '_blank');
    };

    const handleEmailClick = () => {
        navigator.clipboard.writeText('erickmontesdk@gmail.com');
        setShowCopyMessage(true);
        setTimeout(() => setShowCopyMessage(false), 2000);
    };

    return (
        <div className="container">
            {/* GITHUB -> VADER */}
            <a
                href="https://github.com/ErickMontesDK"
                id="github"
                className="comic-box"
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => setHoveredItem('vader')}
                onMouseLeave={() => setHoveredItem(null)}
            >
                <i className="fa-brands fa-github"></i>
                <p>GitHub</p>
            </a>

            <div
                className={`toy-box ${hoveredItem === 'vader' ? 'visible' : ''}`}
                id="box-vader"
                onMouseEnter={() => setHoveredItem('vader')}
                onMouseLeave={() => setHoveredItem(null)}
                onClick={() => handleBoxClick('https://github.com/ErickMontesDK')}
                style={{ pointerEvents: 'auto', cursor: 'pointer' }}
            >
                <div className="toy-header">CODE WARS</div>
                <div className="toywindow"></div>
                <div className="toy-name">DARK CODER</div>
                <div className="toy-flair">THE ERICK SERIES</div>
            </div>

            {/* LINKEDIN -> FETT */}
            <a
                href="https://linkedin.com/in/erickmontesbed"
                id="linkedin"
                className="comic-box"
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => setHoveredItem('fett')}
                onMouseLeave={() => setHoveredItem(null)}
            >
                <i className="fa-brands fa-linkedin"></i>
                <p>LinkedIn</p>
            </a>

            <div
                className={`toy-box ${hoveredItem === 'fett' ? 'visible' : ''}`}
                id="box-fett"
                onMouseEnter={() => setHoveredItem('fett')}
                onMouseLeave={() => setHoveredItem(null)}
                onClick={() => handleBoxClick('https://linkedin.com/in/erickmontesbed')}
                style={{ pointerEvents: 'auto', cursor: 'pointer' }}
            >
                <div className="toy-header">CODE WARS</div>
                <div className="toywindow"></div>
                <div className="toy-name">JOB HUNTER</div>
                <div className="toy-flair">THE ERICK SERIES</div>
            </div>

            {/* EMAIL -> STORMTROOPER */}
            <div
                id="email"
                className="comic-box"
                onMouseEnter={() => setHoveredItem('storm')}
                onMouseLeave={() => setHoveredItem(null)}
                onClick={handleEmailClick}
                style={{ cursor: 'pointer' }}
            >
                <i className="fa-regular fa-envelope"></i>
                <p>Copy Email</p>
            </div>

            <div
                className={`toy-box ${hoveredItem === 'storm' ? 'visible' : ''}`}
                id="box-storm"
                onMouseEnter={() => setHoveredItem('storm')}
                onMouseLeave={() => setHoveredItem(null)}
                onClick={handleEmailClick}
                style={{ pointerEvents: 'auto', cursor: 'pointer' }}
            >
                <div className="toy-header">CODE WARS</div>
                <div className="toywindow"></div>
                <div className="toy-name">STACK TROOPER</div>
                <div className="toy-flair">THE ERICK SERIES</div>
            </div>

            {/* Stormtrooper Speech Bubble Notification - Moved outside to guarantee visibility */}
            {showCopyMessage && (
                <div className="storm-speech-bubble">
                    TRANSMISSION COPIED!
                </div>
            )}
        </div>
    );
}