/* ... (This tool call expects file content, but I'm updating the component. I will use write_to_file for the component directly) */
/* Wait, I should use write_to_file for the component code logic. */
import '../../styles/about.css';

export default function About() {
    return (
        <div className="about-container">
            <div className="nutrition-label">
                <div className="nutrition-header">
                    <h1 className="nutrition-title">NUTRITION FACTS</h1>
                    <p className="serving-size">Serving Size: 1 Full Stack Developer (Erick Montes)</p>
                    <p className="serving-size">Servings Per Container: 1 Unique Profile</p>
                </div>

                <div className="nutrition-facts">
                    <div className="fact-row thick-border">
                        <span className="fact-label">Amount Per Serving</span>
                    </div>

                    <div className="fact-row">
                        <span className="fact-label">Energy / Passion</span>
                        <span className="fact-value">High Voltage</span>
                    </div>

                    <div className="fact-row thick-border">
                        <span className="fact-label">% Daily Value*</span>
                    </div>

                    <div className="fact-row">
                        <span className="fact-label">Problem Solving</span>
                        <span className="fact-value">100%</span>
                    </div>

                    <div className="fact-row">
                        <span className="fact-label">Engineering Logic</span>
                        <span className="fact-value">100%</span>
                    </div>
                    <div className="fact-row">
                        <span className="fact-indent">System Optimization</span>
                        <span className="fact-value">High</span>
                    </div>
                    <div className="fact-row">
                        <span className="fact-indent">Creative Solutions</span>
                        <span className="fact-value">High</span>
                    </div>

                    <div className="fact-row">
                        <span className="fact-label">Adaptability</span>
                        <span className="fact-value">100%</span>
                    </div>
                    <div className="fact-row">
                        <span className="fact-indent">Rapid Learning</span>
                        <span className="fact-value">Fast</span>
                    </div>

                    <div className="fact-row">
                        <span className="fact-label">Teamwork</span>
                        <span className="fact-value">100%</span>
                    </div>

                    <div className="fact-row">
                        <span className="fact-label">Bugs Created</span>
                        <span className="fact-value">0g**</span>
                    </div>
                </div>

                <p className="daily-value-note">
                    * Percent Daily Values are based on a diet of continuous learning and agile methodologies.
                    <br />** We hope so.
                </p>

                <div className="ingredients-section">
                    <span className="ingredients-title">INGREDIENTS / PROFILE:</span>
                    <br />
                    Mechanical Engineer and Full Stack Web Developer passionate about technology.
                    <br />
                    <strong>Contains:</strong> Logic, Creative Problem-Solving, English (Professional), Spanish (Native).
                </div>
            </div>

            <div className="warning-seals">
                <div className="seal">
                    <span>EXCESS OF<br />CREATIVITY</span>
                </div>
                <div className="seal">
                    <span>HIGH IN<br />CODE</span>
                </div>
            </div>

            <div className="warning-box">
                CONTAINS PASSION.<br />NOT SUITABLE FOR BORING PROJECTS.
            </div>
        </div>
    );
}