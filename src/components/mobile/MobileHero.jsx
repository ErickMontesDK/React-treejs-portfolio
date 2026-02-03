import React from 'react';
import MobileModelViewer from './MobileModelViewer';
import models from '../../data/models';

export default function MobileHero({ darkMode, modelData, farLength }) {

    const heroModel = modelData || models[0];

    return (
        <section className="mobile-section mobile-hero">
            <div className="hero-text">
                <h1>Hello there! I'm <span className="highlight">Erick</span></h1>
                <p className="hero-subtitle">FullStack Developer & Mechanical Engineer</p>
                <div className="hero-badges">
                    <span className="badge">Creative</span>
                    <span className="badge">Innovative</span>
                    <span className="badge">Tech-Focused</span>
                </div>
            </div>
            <div className="hero-scroll-indicator">
                <p className="hero-instruction">
                    <i className="fa-solid fa-arrow-down"></i> Scroll to Explore
                </p>
            </div>

            <MobileModelViewer
                darkMode={darkMode}
                modelData={heroModel}
                farLength={farLength || 5}
            />

        </section>
    );
}
