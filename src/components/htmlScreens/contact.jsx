import { useState } from 'react';
import './../../styles/contact.css';

export default function Contact() {
    const [hoveredItem, setHoveredItem] = useState(null);
    const [highlightedItem, setHighlightedItem] = useState(null);
    const [showCopyMessage, setShowCopyMessage] = useState(false);

    const triggerAction = (type, actionData) => {
        // Clear any existing timeout to avoid overlap
        if (window.contactTimeout) clearTimeout(window.contactTimeout);

        // Set highlight state
        if (highlightedItem) return;
        setHighlightedItem(type);

        // Execute action with 2s delay for external links
        if (type === 'storm') {
            navigator.clipboard.writeText('erickmontesdk@gmail.com');
            setShowCopyMessage(true);
            setTimeout(() => setShowCopyMessage(false), 2000);
        } else if (actionData) {
            // Delay opening to let the animation play
            setTimeout(() => {
                window.open(actionData, '_blank');
            }, 2000);
        }

        // Keep highlighted for 4 seconds (2s delay + 2s appreciation)
        window.contactTimeout = setTimeout(() => {
            setHighlightedItem(null);
        }, 4000);
    };

    const getItemStatus = (type) => {
        if (highlightedItem === type) return 'highlighted';
        if (hoveredItem === type) return 'hovered';
        return '';
    };

    return (
        <div className="container">
            {/* GITHUB -> VADER */}
            <div
                id="github"
                className={`comic-box ${getItemStatus('vader')}`}
                onMouseEnter={() => setHoveredItem('vader')}
                onMouseLeave={() => setHoveredItem(null)}
                onClick={() => triggerAction('vader', 'https://github.com/ErickMontesDK')}
                style={{ cursor: 'pointer' }}
            >
                <i className="fa-brands fa-github"></i>
                <p>GitHub</p>
            </div>

            <div
                className={`toy-box ${getItemStatus('vader')}`}
                id="box-vader"
                onMouseEnter={() => setHoveredItem('vader')}
                onMouseLeave={() => setHoveredItem(null)}
                onClick={() => triggerAction('vader', 'https://github.com/ErickMontesDK')}
                style={{ pointerEvents: 'auto', cursor: 'pointer' }}
            >
                <div className="toy-header">CODE WARS</div>
                <div className="toywindow"></div>
                <div className="toy-name">DARK CODER</div>
                <div className="toy-flair">THE ERICK SERIES</div>
            </div>

            {/* LINKEDIN -> FETT */}
            <div
                id="linkedin"
                className={`comic-box ${getItemStatus('fett')}`}
                onMouseEnter={() => setHoveredItem('fett')}
                onMouseLeave={() => setHoveredItem(null)}
                onClick={() => triggerAction('fett', 'https://linkedin.com/in/erickmontesbed')}
                style={{ cursor: 'pointer' }}
            >
                <i className="fa-brands fa-linkedin"></i>
                <p>LinkedIn</p>
            </div>

            <div
                className={`toy-box ${getItemStatus('fett')}`}
                id="box-fett"
                onMouseEnter={() => setHoveredItem('fett')}
                onMouseLeave={() => setHoveredItem(null)}
                onClick={() => triggerAction('fett', 'https://linkedin.com/in/erickmontesbed')}
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
                className={`comic-box ${getItemStatus('storm')}`}
                onMouseEnter={() => setHoveredItem('storm')}
                onMouseLeave={() => setHoveredItem(null)}
                onClick={() => triggerAction('storm')}
                style={{ cursor: 'pointer' }}
            >
                <i className="fa-regular fa-envelope"></i>
                <p>Copy Email</p>
            </div>

            <div
                className={`toy-box ${getItemStatus('storm')}`}
                id="box-storm"
                onMouseEnter={() => setHoveredItem('storm')}
                onMouseLeave={() => setHoveredItem(null)}
                onClick={() => triggerAction('storm')}
                style={{ pointerEvents: 'auto', cursor: 'pointer' }}
            >
                <div className="toy-header">CODE WARS</div>
                <div className="toywindow"></div>
                <div className="toy-name">STACK TROOPER</div>
                <div className="toy-flair">THE ERICK SERIES</div>
            </div>

            {/* Stormtrooper Speech Bubble Notification */}
            {showCopyMessage && (
                <div className="storm-speech-bubble">
                    TRANSMISSION COPIED!
                </div>
            )}
        </div>
    );
}
