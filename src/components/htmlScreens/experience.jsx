import React from 'react';
import '../../styles/experience.css';
import profilePic from '../../assets/images/insta/insta_profile.jpg'; // Assuming we might need one, or use placeholder

import InstaPost from '../media/insta_post';
import experiences from '../../data/experience';

export default function Experience() {


    return (
        <>
            <div className="experience-container">
                {/* App Header */}
                <div className="insta-header">
                    <span className="username">erickdknight</span>
                    <div className="header-icons">
                        <i className="fa-regular fa-heart"></i>
                        <i className="fa-regular fa-paper-plane"></i>
                    </div>
                </div>

                <div className="insta-content">
                    {/* Profile Section */}
                    <div className="profile-section">
                        <div className="profile-top">
                            <div className="profile-pic">
                                {/* Placeholder if no image */}
                                <div className="placeholder-pic">
                                    {/* <i className="fa-solid fa-user"></i> */}
                                    <img src={profilePic} alt="Profile" />
                                </div>
                            </div>
                            <div className="profile-stats">
                                <div className="stat">
                                    <span className="stat-number">{experiences.length}</span>
                                    <span className="stat-label">Posts</span>
                                </div>
                                <div className="stat">
                                    <span className="stat-number">101</span>
                                    <span className="stat-label">Followers</span>
                                </div>
                                <div className="stat">
                                    <span className="stat-number">141</span>
                                    <span className="stat-label">Following</span>
                                </div>
                            </div>
                        </div>
                        <div className="profile-bio">
                            <div className="bio-name">Erick Montes Bedolla</div>
                            <div className="bio-text">Full Stack Dev 💻 | Mechanical Engineer ⚙️</div>
                            <div className="bio-text">Building things for the web & the real world.</div>
                            <div className="bio-text">📍 Vancouver, BC</div>
                            <a href="https://github.com/ErickMontesDK" target="_blank" rel="noreferrer" className="bio-link">github.com/ErickMontesDK</a>
                        </div>

                        {/* Visual Feed Toggle */}
                        <div className="feed-toggle">
                            <div className="toggle-btn active"><i className="fa-solid fa-table-cells"></i></div>
                            <div className="toggle-btn"><i className="fa-regular fa-id-card"></i></div>
                        </div>

                        {/* Highlights Row */}
                        <div className="highlights">
                            <div className="highlight-item">
                                <a href="/resume.pdf" target="_blank" rel="noreferrer" className="highlight-circle">
                                    <div className="highlight-inner">
                                        <i className="fa-solid fa-certificate"></i>
                                    </div>
                                </a>
                                <span className="highlight-text">Jalasoft</span>
                            </div>
                            <div className="highlight-item">
                                <a href="/resume.pdf" target="_blank" rel="noreferrer" className="highlight-circle">
                                    <div className="highlight-inner">
                                        <i className="fa-solid fa-award"></i>
                                    </div>
                                </a>
                                <span className="highlight-text">Epochteca</span>
                            </div>
                            <div className="highlight-item">
                                <div className="highlight-circle">
                                    <div className="highlight-inner">
                                        <i className="fa-solid fa-graduation-cap"></i>
                                    </div>
                                </div>
                                <span className="highlight-text">Degree</span>
                            </div>
                        </div>
                    </div>

                    {/* Posts Feed */}
                    <div className="posts-feed">
                        {experiences.map((exp) => (
                            <InstaPost exp={exp} />
                        ))}
                    </div>
                </div>

            </div>
            {/* Bottom Nav */}
            <div className="insta-nav">
                <i className="fa-solid fa-house"></i>
                <i className="fa-solid fa-magnifying-glass"></i>
                <i className="fa-regular fa-square-plus"></i>
                <i className="fa-solid fa-clapperboard"></i>
                <img src={profilePic} alt="Profile" style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#dbdbdb', border: '1px solid black' }} />
            </div>
        </>
    );
}