import React, { useState } from 'react';
import MobileModelViewer from './MobileModelViewer';
import contact from './../../assets/models/contact.glb';

export default function MobileContact({ darkMode }) {
    const [copied, setCopied] = useState(false);

    const trooperData = {
        name: "trooper",
        model: contact,
    }

    const handleCopyEmail = () => {
        navigator.clipboard.writeText('erickmontesdk@gmail.com');
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };



    return (
        <section className="mobile-section mobile-contact">
            <h2 className="mobile-section-title">Contact</h2>

            <MobileModelViewer
                darkMode={darkMode}
                modelData={trooperData}
                farLength={3.5}
                lightIntensity={0.8}

            />

            <div className="comic-box contact-block">
                <div className="contact-row">
                    <a href={`${process.env.PUBLIC_URL}/resume.pdf`} target="_blank" rel="noreferrer" className="contact-item resume">
                        <i className="fa-solid fa-file-pdf"></i>
                        <span>Download Resume</span>
                    </a>
                </div>

                <div className="contact-grid">
                    <a href="https://github.com/ErickMontesDK" target="_blank" rel="noreferrer" className="contact-item github">
                        <i className="fa-brands fa-github"></i>
                        <span>GitHub</span>
                    </a>

                    <a href="https://linkedin.com/in/erickmontesbed" target="_blank" rel="noreferrer" className="contact-item linkedin">
                        <i className="fa-brands fa-linkedin"></i>
                        <span>LinkedIn</span>
                    </a>

                    <button onClick={handleCopyEmail} className="contact-item email">
                        <i className="fa-regular fa-envelope"></i>
                        <span>{copied ? "Copied!" : "Email"}</span>
                    </button>
                </div>
            </div>
        </section>
    );
}
