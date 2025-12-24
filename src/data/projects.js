
import district from '../assets/images/insta/district.jpg';
import jalasoft from '../assets/images/insta/jala.jpg';
import hackathon from '../assets/images/insta/hackathon.jpg';

export const projects = [
    {
        id: 1,
        title: "E-Commerce API",
        description: "A robust backend layout for scaling e-commerce platforms.",
        tech: ["Node.js", "Express", "MongoDB"],
        image: district, // Placeholder using existing images
        links: {
            live: "#",
            repo: "https://github.com/ErickMontesDK"
        },
        gradient: "linear-gradient(135deg, #1a2a6c, #b21f1f, #fdbb2d)",
        stats: {
            stars: "1.2k",
            forks: "342",
            issues: "12",
            updated: "2 days ago"
        }
    },
    {
        id: 2,
        title: "Medical Booking",
        description: "Full-stack appointment system for local clinics.",
        tech: ["Django", "Python", "React"],
        image: jalasoft, // Placeholder
        links: {
            live: "#",
            repo: "https://github.com/ErickMontesDK"
        },
        gradient: "linear-gradient(135deg, #0093E9 0%, #80D0C7 100%)",
        stats: {
            stars: "856",
            forks: "120",
            issues: "5",
            updated: "1 week ago"
        }
    },
    {
        id: 3,
        title: "Ocean Encyclopedia",
        description: "Award-winning educational platform about marine life.",
        tech: ["Vue.js", "Firebase", "Azure"],
        image: hackathon, // Placeholder
        links: {
            live: "#",
            repo: "https://github.com/ErickMontesDK"
        },
        gradient: "linear-gradient(135deg, #00c6ff, #0072ff)",
        stats: {
            stars: "2.5k",
            forks: "890",
            issues: "34",
            updated: "3 days ago"
        }
    }
];
