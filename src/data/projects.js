
import opuscinemas from '../assets/images/proyects/opus.png';
import ocex from '../assets/images/proyects/ocex.png';
import echoroute from '../assets/images/proyects/echoroute.jpg';

export const projects = [
    {
        id: 3,
        title: "EchoRoute",
        description: "Comprehensive field-service and route management platform. It features a React-based frontend with real-time interactive maps via Leaflet, location-based visit tracking, and a dynamic configuration dashboard. The robust Django backend handles JWT authentication, custom middleware for a secure Demo Mode, and complex spatial data, demonstrating end-to-end architecture skills.",
        tech: ["React", "TypeScript", "Django", "Leaflet"],
        image: echoroute,
        links: {
            live: "https://echoroute-wine.vercel.app/",
            repo: "https://github.com/ErickMontesDK/EchoRoute_FrontEnd"
        },
        gradient: "linear-gradient(135deg, #4b6cb7 0%, #182848 100%)",
        stats: {
            stars: "107",
            forks: "23",
            issues: "4",
            updated: "2 days ago"
        }
    },
    {
        id: 1,
        title: "Opus Cinemas",
        description: `Movie-booking platform that integrates the MovieGlu API with a Supabase backend to deliver real-time showtimes and dynamic trailers. It features an interactive seat selection system and a responsive UI built with Bootstrap and Netlify Functions. This project demonstrates full-stack proficiency in third-party API synchronization and the creation of seamless, end-to-end user experiences.`,
        tech: ["Netlify", "Supabase", "Bootstrap"],
        image: opuscinemas, // Placeholder using existing images
        links: {
            live: "https://opuscinemas.netlify.app/",
            repo: "https://github.com/ErickMontesDK/Opus-Cinemas"
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
        title: "OCEX Encyclopedia",
        description: "Interactive marine conservation platform developed during a 24-hour hackathon. It features a dynamic world map populated with real-time educational data to visualize endangered species. Built with a focus on rapid full-stack delivery, the project demonstrates effective collaboration under pressure and a commitment to creating impactful, engaging user interfaces for ocean advocacy.",
        tech: ["Node.js, "],
        image: ocex, // Placeholder
        links: {
            live: "https://ocex.netlify.app/",
            repo: "https://github.com/alexsarget/OCEX"
        },
        gradient: "linear-gradient(135deg, #0093E9 0%, #80D0C7 100%)",
        stats: {
            stars: "856",
            forks: "120",
            issues: "5",
            updated: "4 years ago"
        }
    },


];
