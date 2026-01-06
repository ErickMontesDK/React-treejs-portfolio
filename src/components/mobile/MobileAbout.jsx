import React from 'react';
import About from '../htmlScreens/about';

export default function MobileAbout() {
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
                        <div className="mobile-about-scrollbox">
                            <About />
                        </div>
                    </div>

                    <div className="can-bottom-base"></div>
                </div>
            </div>
        </section>
    );
}
