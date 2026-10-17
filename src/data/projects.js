
import opuscinemas from '../assets/images/proyects/opus.png';
import ocex from '../assets/images/proyects/ocex.png';
import echoroute from '../assets/images/proyects/echoroute.jpg';

export const projects = [
    {
        id: 3,
        title: "EchoRoute",
        description: "A real-world logistics platform already running in production for an active company. EchoRoute brings field teams and operations together through live route tracking on interactive maps and a mission-control dashboard that keeps everything in sync — built from the ground up with React, Django, and a focus on solving real problems at scale.",
        tech: ["React", "Django", "PostgreSQL", "Leaflet", "Render", "Vercel"],
        image: echoroute,
        links: {
            live: "https://echoroute-wine.vercel.app/",
            repo: "https://github.com/ErickMontesDK/EchoRoute_FrontEnd"
        },
        gradient: "linear-gradient(135deg, #4b6cb7 0%, #182848 100%)",
        status: { icon: "fa-solid fa-circle-check", label: "In production" }
    },
    {
        id: 1,
        title: "Opus Cinemas",
        description: "What if booking a movie felt as exciting as watching one? Opus Cinemas pulls live showtimes and trailers straight from a real API, lets you pick your exact seat, and wraps it all in a smooth, responsive experience — the kind of end-to-end product flow that turns a side project into something people actually want to use.",
        tech: ["Netlify", "Supabase", "Bootstrap"],
        image: opuscinemas, // Placeholder using existing images
        links: {
            live: "https://opuscinemas.netlify.app/",
            repo: "https://github.com/ErickMontesDK/Opus-Cinemas"
        },
        gradient: "linear-gradient(135deg, #1a2a6c, #b21f1f, #fdbb2d)",
        status: { icon: "fa-solid fa-globe", label: "Live demo" }
    },
    {
        id: 2,
        title: "OCEX Encyclopedia",
        description: "Built in 24 hours during a hackathon, OCEX turns ocean conservation data into something you can actually explore. Endangered species come to life on an interactive world map, making a dense environmental dataset feel approachable — proof that good design and a tight deadline aren't mutually exclusive.",
        tech: ["Node.js"],
        image: ocex, // Placeholder
        links: {
            live: "https://ocex.netlify.app/",
            repo: "https://github.com/alexsarget/OCEX"
        },
        gradient: "linear-gradient(135deg, #0093E9 0%, #80D0C7 100%)",
        status: { icon: "fa-solid fa-trophy", label: "Hackathon 1st place" }
    },


];
