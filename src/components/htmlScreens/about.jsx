import React from 'react';
import './../../styles/about.css';

export default function About() {
    return (
        <div className="about-container">
            <div className="nutrition-label">
                <div className="nutrition-header">
                    <h1 className="nutrition-title">NUTRITION FACTS</h1>
                    <p className="serving-size">Serving Size: 1 Developer (Erick Montes)</p>
                    <p className="serving-size">Origin: Morelia, México → Vancouver, BC</p>
                </div>

                <div className="ingredients-section">
                    <span className="ingredients-title">INGREDIENTS / WHO I AM:</span>
                    <br />
                    A calm, responsible developer who prefers solving problems independently but knows collaboration makes better solutions. Started as a Mechanical Engineer passionate about electronics and circuits as a hobby, then discovered the satisfaction of building through code instead of maintenance work.
                    <br />
                    <strong>Contains:</strong> Quiet focus, Creative problem-solving, Hands-on learning approach, Team reliability.
                    <br />
                </div>

                <div className="nutrition-facts">
                    <div className="fact-row thick-border">
                        <span className="fact-label">Core Personality Traits</span>
                    </div>

                    <div className="fact-row">
                        <span className="fact-label">Responsibility & Punctuality</span>
                        <span className="fact-value">100%</span>
                    </div>

                    <div className="fact-row">
                        <span className="fact-label">Seriousness</span>
                        <span className="fact-value">High</span>
                    </div>
                    <div className="fact-row">
                        <span className="fact-indent">Work Ethic</span>
                        <span className="fact-value">Committed</span>
                    </div>

                    <div className="fact-row">
                        <span className="fact-label">Communication Style</span>
                        <span className="fact-value">Reserved*</span>
                    </div>
                    <div className="fact-row">
                        <span className="fact-indent">Team Inclusion</span>
                        <span className="fact-value">Active</span>
                    </div>
                    <div className="fact-row">
                        <span className="fact-indent">Conflict Tendency</span>
                        <span className="fact-value">0%</span>
                    </div>

                    <div className="fact-row thick-border">
                        <span className="fact-label">Work Approach</span>
                    </div>

                    <div className="fact-row">
                        <span className="fact-label">Problem-Solving Style</span>
                        <span className="fact-value">Independent</span>
                    </div>
                    <div className="fact-row">
                        <span className="fact-indent">Research Time</span>
                        <span className="fact-value">~90min</span>
                    </div>
                    <div className="fact-row">
                        <span className="fact-indent">Knows When to Ask Help</span>
                        <span className="fact-value">Yes</span>
                    </div>

                    <div className="fact-row">
                        <span className="fact-label">Creativity</span>
                        <span className="fact-value">High</span>
                    </div>
                    <div className="fact-row">
                        <span className="fact-indent">Enjoys Building Solutions</span>
                        <span className="fact-value">100%</span>
                    </div>
                    <div className="fact-row">
                        <span className="fact-indent">Hands-On Learner</span>
                        <span className="fact-value">100%</span>
                    </div>

                    <div className="fact-row">
                        <span className="fact-label">Temperament</span>
                        <span className="fact-value">Calm</span>
                    </div>
                    <div className="fact-row">
                        <span className="fact-indent">Team Fulfillment</span>
                        <span className="fact-value">Reliable</span>
                    </div>
                </div>

                <p className="daily-value-note">
                    * Reserved in communication but actively inclusive in team settings.
                    <br />** Prefers to understand problems deeply before asking for help, but knows when to reach out.
                </p>
            </div>

            <div className="warning-seals">
                <div className="seal">
                    <span>BUILDER<br />AT<br />HEART</span>
                </div>
                <div className="seal">
                    <span>LOW TALK<br />HIGH<br />OUTPUT</span>
                </div>
            </div>

            <div className="warning-box">
                QUIET FOCUS. RELIABLE DELIVERY. CREATIVE SOLUTIONS.
            </div>
        </div>
    );
}