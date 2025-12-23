import React from 'react';
import { useProgress } from '@react-three/drei';
import '../../styles/loader.css';

// Import Assets
import comicMonster from '../../assets/loader/comic_monster.png';
import batLogoWhite from '../../assets/loader/bat_logo_white.png';

export default function Loader({ onEnter }) {
    const { progress } = useProgress();
    const isReady = progress === 100;

    return (
        <div className="loader-screen">
            {/* Background Narrative/Textured Surface */}
            <div className="loader-bg-surface"></div>

            <div className="comic-stack-container">
                {/* Decorative Underlays (The Stack) */}
                <div className="stack-underlay layer-1"></div>
                <div className="stack-underlay layer-2"></div>

                {/* Main Active Comic Cover */}
                <div className="loader-cover dev-code-layout main-top-cover">
                    {/* Side Titles (Vertical) */}
                    <div className="vertical-side-title left">
                        <span>T</span><span>H</span><span>E</span>
                        <br />
                        <span>D</span><span>E</span><span>V</span>
                    </div>

                    <div className="vertical-side-title right">
                        <span>C</span><span>O</span><span>D</span><span>E</span>
                    </div>

                    {/* Main Illustration */}
                    <div className="main-art-wrapper">
                        <img src={comicMonster} alt="The Developer" className="main-comic-img" />
                        <div className="atmospheric-glow"></div>
                    </div>

                    {/* Central Credits */}
                    <div className="credits-section">
                        <span className="credits-label">CODED BY:</span>
                        <span className="credits-name">ERICK MONTES</span>
                        <img src={batLogoWhite} alt="Editorial Logo" className="editorial-logo-small" />
                    </div>

                    {/* Physical Texture Overlays */}
                    <div className="grain-overlay"></div>
                    <div className="paper-overlay"></div>

                    {/* Progress & Entry Sticker */}
                    <div className="sticker-container">
                        {!isReady ? (
                            <div className="loading-data-simple">
                                <div className="progress-bar-minimal">
                                    <div className="progress-fill-neon" style={{ width: `${progress}%` }}></div>
                                </div>
                                <span className="loading-tag">UPLOADING DATA... {Math.round(progress)}%</span>
                            </div>
                        ) : (
                            <div className="barcode-sticker">
                                <div className="sticker-left">
                                    <div className="barcode-generated">
                                        {[...Array(20)].map((_, i) => (
                                            <div key={i} className={`barcode-line w-${(i % 4) + 1} s-${(i % 2)}`}></div>
                                        ))}
                                    </div>
                                    <span className="barcode-numbers">0 7666 0964 6</span>
                                </div>
                                <div className="sticker-right">
                                    <div className="percentage-box">
                                        <span className="percent-val">100%</span>
                                        <span className="percent-meta">714593-0485</span>
                                    </div>
                                    <button className="enter-btn-comic" onClick={onEnter}>
                                        ENTER
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Corner Badge */}
                    <div className="editorial-badge">
                        <img src={batLogoWhite} alt="Logo" className="badge-logo-img" />
                        <span className="badge-text">DIGITAL CREATIONS</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
