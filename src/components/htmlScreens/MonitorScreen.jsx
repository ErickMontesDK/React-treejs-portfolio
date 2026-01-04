import React from 'react';
import '../../styles/monitorScreen.css';

export default function MonitorProjectScreen({ project, onNext, onPrev }) {
    if (!project) return null;

    return (
        <div className="monitor-project-container github-macro">

            {/* Macro Header */}
            <div className="macro-header">
                <div className="repo-identity">
                    <i className="fa-brands fa-github fa-2x"></i>
                    <span className="owner">ErickMontesDK / </span>
                    <span className="name">{project.title}</span>
                    <span className="badge">Public</span>
                </div>
                <div className="macro-stats">
                    <span className="stat-item"><i className="fa-regular fa-star"></i> {project.stats.stars}</span>
                    <span className="stat-item"><i className="fa-solid fa-code-fork"></i> {project.stats.forks}</span>
                </div>
            </div>

            {/* Main Content Card */}
            <div className="macro-content">
                <div className="description-box">
                    <h1 className="macro-title">Readme.md</h1>
                    <p className="macro-desc">{project.description}</p>

                    <div className="macro-tech">
                        {project.tech.map((tech, i) => (
                            <span key={i} className="tech-chip">{tech}</span>
                        ))}
                    </div>
                </div>

                {/* Big Actions */}
                <div className="macro-actions">
                    <a href={project.links.repo} target="_blank" rel="noreferrer" className="action-card">
                        <div className="gh-macro-btn code">
                            <i className="fa-solid fa-code"></i>
                            <span>View Source</span>
                        </div>
                    </a>
                    <a href={project.links.live} target="_blank" rel="noreferrer" className="action-card">
                        <div className="gh-macro-btn live">
                            <i className="fa-solid fa-globe"></i>
                            <span>Visit Site</span>
                        </div>
                    </a>
                </div>
            </div>

            {/* Navigation Footer */}
            <div className="macro-nav">
                <button onClick={onPrev} className="nav-arrow left">
                    <i className="fa-solid fa-chevron-left"></i>
                </button>
                <div className="nav-info">
                    Project {project.title}
                </div>
                <button onClick={onNext} className="nav-arrow right">
                    <i className="fa-solid fa-chevron-right"></i>
                </button>
            </div>

        </div>
    );
}
