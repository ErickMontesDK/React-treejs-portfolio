import React from 'react';
import '../../styles/experience.css';
import profilePic from '../../assets/images/insta/insta_profile.jpg'; // Assuming we might need one, or use placeholder
import bootcamp from '../../assets/images/insta/bootcamp.png';
import cctb from '../../assets/images/insta/cctb.png';
import epochteca from '../../assets/images/insta/epoch.jpg';
import graduation from '../../assets/images/insta/graduacion.jpg';
import jalasoft from '../../assets/images/insta/jala.jpg';
import journals from '../../assets/images/insta/journals.jpg';
import tacamba from '../../assets/images/insta/tacamba.jpg';
import vetelia from '../../assets/images/insta/vetelia.jpg';
import tecnology from '../../assets/images/insta/tecnology.jpg';
import district from '../../assets/images/insta/district.jpg';
import hackathon from '../../assets/images/insta/hackathon.jpg';





export default function Experience() {
    const experiences = [
        {
            id: 1,
            company: "District Factory Outlet",
            location: "Vancouver, B.C.",
            role: "Retail Associate",
            date: "April 2025 - Present",
            description: (
                <p>
                    Living the Vancouver life while helping customers find what they need <i className="fa-solid fa-bag-shopping"></i> Every day is about connecting with people, making recommendations, and keeping the store running smooth. English practice on point! <i className="fa-solid fa-dumbbell"></i>
                </p>
            ),
            gradient: "gradient-1",
            likes: "450",
            image: district
        },
        {
            id: 7,
            company: "CCTB",
            location: "Vancouver, B.C. Canada",
            role: "Full Stack Web Dev Diploma",
            date: "Jan 2025 - Present",
            description: (
                <p>
                    Back to school mode <i className="fa-solid fa-graduation-cap"></i> Deep diving into the full-stack world with HTML5, Python, React, Node.js, AWS and everything in between. 160-hour capstone coming up where I'll be building real enterprise solutions. Let's get it! <i className="fa-solid fa-laptop-code"></i><i className="fa-solid fa-rocket"></i>
                </p>
            ),
            gradient: "gradient-3",
            likes: "2,025",
            image: cctb
        },
        {
            id: 2,
            company: "Epochteca",
            location: "Morelia, Mich. Mexico",
            role: "Web Dev Intern",
            date: "Sep 2023 - Dec 2024",
            description: (
                <p>
                    Where the magic happened <i className="fa-solid fa-wand-magic-sparkles"></i> Built e-commerce billing systems connecting MercadoLibre & Shopify APIs, created a full medical appointment platform for clinics, and designed UI prototypes in Figma. Django became my best friend during this time <i className="fa-brands fa-python"></i>
                </p>
            ),
            gradient: "gradient-2",
            likes: "1,203",
            image: epochteca
        },

        {
            id: 8,
            company: "Jala University",
            location: "Cochabamba, Bolivia (Remote)",
            role: "Full Stack Certification",
            date: "Jan 2023 – Mar 2023",
            description: (
                <p>
                    Remote from Bolivia <i className="fa-solid fa-earth-americas"></i> Intense bootcamp vibes! TypeScript, Node.js, Angular, Docker, Figma - absorbed it all. Team projects with ScrumBan methodology, daily standups, the whole agile experience. This is where I leveled up <i className="fa-solid fa-arrow-trend-up"></i>
                </p>
            ),
            gradient: "gradient-4",
            likes: "956",
            image: jalasoft
        },
        {
            id: 11,
            company: "Hack the Ocean",
            location: "Innovacción Virtual / Microsoft",
            role: "Winning Project",
            date: "May 2022",
            description: (
                <p>
                    Still proud of this one <i className="fa-solid fa-trophy"></i><i className="fa-solid fa-water"></i> Built 'OCEX Encyclopedia' - an educational platform about marine life. Competed against 100+ projects and made it to the top! Microsoft + ocean conservation = dream combo <i className="fa-solid fa-heart"></i>
                </p>
            ),
            gradient: "gradient-3",
            likes: "5,000",
            image: hackathon
        },
        {
            id: 9,
            company: "Innovacción Virtual",
            location: "Mexico City, Mexico",
            role: "Full Stack BootCamp",
            date: "Jan – May 2022",
            description: (
                <p>
                    This is where it all started <i className="fa-solid fa-fire"></i> 5 months of HTML, CSS, JavaScript, Vue.js, Node.js... Git became my daily routine. Agile methodology, team projects, all the fundamentals. The beginning of my dev journey! <i className="fa-solid fa-seedling"></i>
                </p>
            ),
            gradient: "gradient-1",
            likes: "843",
            image: bootcamp
        },
        {
            id: 4,
            company: "Comercial Tacamba",
            location: "Morelia, Mich. Mexico",
            role: "Inventory Assistant",
            date: "Jan - Nov 2021",
            description: (
                <p>
                    Office life chapter <i className="fa-solid fa-chart-simple"></i> Managed inventory across two branches, verified deliveries, processed invoices, coordinated with suppliers. Detail-oriented work that taught me organization skills I still use in debugging code today! <i className="fa-solid fa-magnifying-glass"></i>
                </p>
            ),
            gradient: "gradient-4",
            likes: "892",
            image: tacamba
        },
        {
            id: 5,
            company: "Vetelia",
            location: "Queretaro, Qro. Mexico",
            role: "Engineering Design Intern",
            date: "Jan – Jul 2019",
            description: (
                <p>
                    Engineer mode activated <i className="fa-solid fa-motorcycle"></i><i className="fa-solid fa-bolt"></i> Designed electric motorcycles, built complete electrical systems for go-karts, created rain sensors and automated lighting for e-bikes. Autodesk Inventor was my playground. Hardware meets creativity! <i className="fa-solid fa-wrench"></i>
                </p>
            ),
            gradient: "gradient-1",
            likes: "756",
            image: vetelia
        },
        {
            id: 13,
            company: "Tecnológico de Morelia",
            location: "Morelia, Mich. Mexico",
            role: <span>Graduation Day <i className="fa-solid fa-graduation-cap"></i></span>,
            date: "2020",
            description: (
                <p>
                    It's official! <i className="fa-solid fa-party-horn"></i> Mechanical Engineer right here. Years of sleepless nights, projects, exams and coffee finally paid off. Shoutout to everyone who believed in me. This is just the beginning! <i className="fa-solid fa-rocket"></i><i className="fa-solid fa-dumbbell"></i>
                </p>
            ),
            gradient: "gradient-1",
            likes: "3,250",
            image: graduation
        },
        {
            id: 12,
            company: "Academia Journals",
            location: "Celaya, Gto. Mexico",
            role: "Speaker & Co-Author",
            date: "Nov 2017",
            description: (
                <p>
                    Published research moment <i className="fa-solid fa-book"></i> Co-designed and built a CNC prototyping machine for non-ferrous materials. Presented at academic conferences and got published in Academia Journals 2017. Engineering nerd stuff! <i className="fa-solid fa-glasses"></i><i className="fa-solid fa-gear"></i>
                </p>
            ),
            gradient: "gradient-4",
            likes: "320",
            image: journals
        },
        {
            id: 10,
            company: "Tecnológico de Morelia",
            location: "Morelia, Mich. Mexico",
            role: "Mechanical Engineering",
            date: "2015 - 2020",
            description: (
                <p>
                    Where it all began <i className="fa-solid fa-graduation-cap"></i> Mechanical Engineering degree with focus on Design & Manufacturing. SolidWorks, programming, electronics, prototyping - learned to build things from scratch. Foundation = solid <i className="fa-solid fa-check"></i>
                </p>
            ),
            gradient: "gradient-2",
            likes: "1,500",
            image: tecnology
        }
    ];

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
                            <div className="bio-text">Full Stack Dev <i className="fa-solid fa-laptop-code"></i> | Mechanical Engineer <i className="fa-solid fa-gear"></i></div>
                            <div className="bio-text">Building things for the web & the real world.</div>
                            <div className="bio-text"><i className="fa-solid fa-location-dot"></i> Vancouver, BC</div>
                            <a href="https://github.com/ErickMontesDK" target="_blank" rel="noreferrer" className="bio-link">github.com/ErickMontesDK</a>
                        </div>

                        {/* Visual Feed Toggle */}
                        <div className="feed-toggle">
                            <div className="toggle-btn active"><i className="fa-solid fa-table-cells"></i></div>
                            <div className="toggle-btn"><i className="fa-regular fa-id-card"></i></div>
                        </div>
                    </div>

                    {/* Posts Feed */}
                    <div className="posts-feed">
                        {experiences.map((exp) => (
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
                                    <span className="caption-username">{exp.company}</span>
                                    {exp.description}
                                    <span className="post-date">{exp.date}</span>
                                </div>
                            </div>
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