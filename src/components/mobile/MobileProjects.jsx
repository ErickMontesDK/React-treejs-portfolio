import React, { useState } from 'react';
import { Carousel } from 'react-bootstrap';
import { projects } from '../../data/projects';

const ProjectCard = ({ project }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpand = () => setIsExpanded(!isExpanded);

    return (
        <div className="comic-box project-card-mobile" style={{ margin: '0 15px', height: '100%', display: 'flex', flexDirection: 'column' }}>
            <div className="project-image-box">
                <img src={project.image} alt={project.title} className="mobile-project-img" />
            </div>
            <div className="project-info" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ textTransform: 'uppercase', marginBottom: '5px' }}>{project.title}</h3>
                <p style={{ fontSize: '0.8rem', opacity: 0.9, margin: 0 }}>
                    {isExpanded ? project.description : `${project.description.substring(0, 100)}...`}
                </p>
                <button onClick={toggleExpand} className="read-more-btn">
                    {isExpanded ? 'See less' : 'Read more'}
                </button>
                <div className="project-tech" style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', margin: '10px 0' }}>
                    {project.tech.map((t, i) => <span key={i} className="skill-tag" style={{ fontSize: '0.6rem', padding: '2px 8px' }}>{t}</span>)}
                </div>
                <div className="project-links" style={{ display: 'flex', gap: '10px', marginTop: 'auto' }}>
                    <a href={project.links.repo} target="_blank" rel="noreferrer" className="comic-button secondary" style={{ flex: 1, textAlign: 'center' }}>
                        <i className="fa-brands fa-github"></i> REPO
                    </a>
                    <a href={project.links.live} target="_blank" rel="noreferrer" className="comic-button tertiary" style={{ flex: 1, textAlign: 'center' }}>
                        <i className="fa-solid fa-globe"></i> LIVE
                    </a>
                </div>
            </div>
        </div>
    );
};

export default function MobileProjects({ darkMode }) {
    return (
        <section className="mobile-section mobile-projects">
            <h2 className="mobile-section-title">Projects</h2>

            <Carousel interval={null} indicators={false} className={`mobile-carousel project-carousel ${darkMode ? 'dark-mode-carousel' : ''}`}>
                {projects.map((project, index) => (
                    <Carousel.Item key={index}>
                        <ProjectCard project={project} />
                    </Carousel.Item>
                ))}
            </Carousel>
        </section>
    );
}
