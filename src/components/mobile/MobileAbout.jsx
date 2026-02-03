import React, { useState, useRef, useEffect } from 'react';
import About from '../htmlScreens/about';

export default function MobileAbout() {
    const [showHint, setShowHint] = useState(true);
    const scrollboxRef = useRef(null);

    const handleScroll = () => {
        if (scrollboxRef.current) {
            const { scrollTop } = scrollboxRef.current;
            if (scrollTop > 20) {
                setShowHint(false);
            }
        }
    };

    useEffect(() => {
        const scrollbox = scrollboxRef.current;
        if (scrollbox) {
            scrollbox.addEventListener('scroll', handleScroll);
            return () => scrollbox.removeEventListener('scroll', handleScroll);
        }
    }, []);


    return (
        <section className="mobile-section mobile-about-wrapper">
            <h2 className="mobile-section-title">About Me</h2>

            <div className="mobile-can-viewport">
                <div className="coca-can-cylinder sketchy">
                    <div className="sketch-hatching-overlay"></div>
                    <div className="construction-lines"></div>

                    <div className="can-top-lid">
                        <div className="can-tab"></div>
                    </div>

                    <div className="sketch-annotation left">Rough Draft #1</div>
                    <div className="sketch-annotation right">"Refreshing!"</div>

                    <div className="can-label-area">
                        <div
                            className="mobile-about-scrollbox"
                            ref={scrollboxRef}
                        >
                            <About />
                        </div>
                        {showHint && (
                            <div className="scroll-hint-overlay">
                                <div className="scroll-hint-content">
                                    <span>Scroll to read more</span>
                                    <i className="fa-sharp fa-solid fa-chevron-down bounce-icon"></i>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="can-bottom-base"></div>
                </div>
            </div>
        </section>
    );
}
