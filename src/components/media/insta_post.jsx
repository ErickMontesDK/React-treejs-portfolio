import React, { useState } from 'react';
import './../../styles/instapost.css';

export default function InstaPost(props) {
    const { exp } = props;
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpand = () => setIsExpanded(!isExpanded);

    const description = exp.description || "";
    const isLongDescription = description.length > 100;

    return (
        <div className="post" key={exp.id}>
            <div className="post-header">
                <div className="post-avatar">
                    <i className="fa-solid fa-briefcase"></i>
                </div>
                <div className="post-info">
                    <span className="post-username">{exp.company}</span>
                    <span className="post-location">{exp.location}</span>
                </div>
                <i className="fa-solid fa-ellipsis"></i>
            </div>

            {exp.image ? (
                <img src={exp.image} alt="Experience" className="post-image" />
            ) : (
                <div className={`post-image ${exp.gradient}`}>
                    <div className='role-title'>{exp.role}</div>
                </div>
            )}


            <div className="post-actions">
                <i className="fa-regular fa-heart"></i>
                <i className="fa-regular fa-comment"></i>
                <i className="fa-regular fa-paper-plane"></i>
                <i className="fa-regular fa-bookmark" style={{ marginLeft: 'auto' }}></i>
            </div>

            <div className="post-likes">{exp.likes} likes</div>

            <div className="post-caption">
                <span className="caption-username">{exp.role}</span>
                {isExpanded ? description : (isLongDescription ? `${description.substring(0, 101)}...` : description)}
                {isLongDescription && (
                    <button onClick={toggleExpand} className="read-more-btn" style={{ marginLeft: '5px' }}>
                        {isExpanded ? 'Leer menos' : 'Leer más'}
                    </button>
                )}
                <span className="post-date">{exp.date}</span>
            </div>
        </div>
    );
}