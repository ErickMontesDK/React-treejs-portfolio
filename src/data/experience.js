import bootcamp from '../assets/images/insta/bootcamp.png';
import cctb from '../assets/images/insta/cctb.png';
import epochteca from '../assets/images/insta/epoch.jpg';
import graduation from '../assets/images/insta/graduacion.jpg';
import jalasoft from '../assets/images/insta/jala.jpg';
import journals from '../assets/images/insta/journals.jpg';
import tacamba from '../assets/images/insta/tacamba.jpg';
import vetelia from '../assets/images/insta/vetelia.jpg';
import tecnology from '../assets/images/insta/tecnology.jpg';
import district from '../assets/images/insta/district.jpg';
import hackathon from '../assets/images/insta/hackathon.jpg';

const experiences = [
    {
        id: 1,
        company: "District Factory Outlet",
        location: "Vancouver, B.C.",
        role: "Retail Associate",
        date: "April 2025 - Present",
        description: (
            <p>
                Living the Vancouver life while helping customers find what they need 🛍️ Every day is about connecting with people, making recommendations, and keeping the store running smooth. English practice on point! 💪
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
                Back to school mode 🎓 Deep diving into the full-stack world with HTML5, Python, React, Node.js, AWS and everything in between. 160-hour capstone coming up where I'll be building real enterprise solutions. Let's get it! 💻🚀
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
                Where the magic happened ✨ Built e-commerce billing systems connecting MercadoLibre & Shopify APIs, created a full medical appointment platform for clinics, and designed UI prototypes in Figma. Django became my best friend during this time 🐍
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
                Remote from Bolivia 🇧🇴 Intense bootcamp vibes! TypeScript, Node.js, Angular, Docker, Figma - absorbed it all. Team projects with ScrumBan methodology, daily standups, the whole agile experience. This is where I leveled up 📈
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
                Still proud of this one 🏆🌊 Built 'OCEX Encyclopedia' - an educational platform about marine life. Competed against 100+ projects and made it to the top! Microsoft + ocean conservation = dream combo 💙
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
                This is where it all started 🔥 5 months of HTML, CSS, JavaScript, Vue.js, Node.js... Git became my daily routine. Agile methodology, team projects, all the fundamentals. The beginning of my dev journey! 🌱
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
                Office life chapter 📊 Managed inventory across two branches, verified deliveries, processed invoices, coordinated with suppliers. Detail-oriented work that taught me organization skills I still use in debugging code today! 🔍
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
                Engineer mode activated 🏍️⚡ Designed electric motorcycles, built complete electrical systems for go-karts, created rain sensors and automated lighting for e-bikes. Autodesk Inventor was my playground. Hardware meets creativity! 🔧
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
        role: "Graduation Day 🎓",
        date: "2020",
        description: (
            <p>
                It's official! 🎉 Mechanical Engineer right here. Years of sleepless nights, projects, exams and coffee finally paid off. Shoutout to everyone who believed in me. This is just the beginning! 🚀💪
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
                Published research moment 📚 Co-designed and built a CNC prototyping machine for non-ferrous materials. Presented at academic conferences and got published in Academia Journals 2017. Engineering nerd stuff! 🤓⚙️
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
                Where it all began 🎓 Mechanical Engineering degree with focus on Design & Manufacturing. SolidWorks, programming, electronics, prototyping - learned to build things from scratch. Foundation = solid ✅
            </p>
        ),
        gradient: "gradient-2",
        likes: "1,500",
        image: tecnology
    }
];

export default experiences;
