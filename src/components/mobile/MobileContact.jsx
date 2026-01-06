import React, { useState } from 'react';

export default function MobileContact() {
    const [copied, setCopied] = useState(false);

    const handleCopyEmail = () => {
        navigator.clipboard.writeText('erickmontesdk@gmail.com');
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleDownloadResume = () => {
        const sound = new Audio(`${process.env.PUBLIC_URL}/sounds/printer.wav`);
        sound.play();
        setTimeout(() => {
            window.open(`${process.env.PUBLIC_URL}/resume.pdf`, '_blank');
        }, 1000);
    };

    return (
        <section className="mobile-section mobile-contact">
            <h2 className="mobile-section-title">Contact</h2>

            <div className="comic-box contact-block">
                <div className="contact-row">
                    <button onClick={handleDownloadResume} className="contact-item resume">
                        <i className="fa-solid fa-file-pdf"></i>
                        <span>Download Resume</span>
                    </button>
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
