
import '../../styles/skills.css';

export default function Skills() {
    return (
        <div className="skills-screen">
            <h2>Skills</h2>
            <div className="rubik-screen">
                <i className="fa-solid fa-arrow-left"></i>
                <i className="fa-solid fa-arrow-right"></i>
                <i className="fa-solid fa-arrow-up"></i>
                <i className="fa-solid fa-arrow-down"></i>
                <div className="skills" id="frontend">
                    <span>HTML</span>
                    <span>CSS</span>
                    <span>JS</span>
                    <span>React</span>
                    <span>Node</span>
                    <span>Express</span>
                    <span>MySQL</span>
                    <span>PostgreSQL</span>
                    <span>Git</span>
                </div>

            </div>
        </div>
    );
}