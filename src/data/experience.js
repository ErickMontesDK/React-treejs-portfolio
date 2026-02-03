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
import canada from '../assets/images/insta/luggages.jpeg';

const experiences = [
    {
        id: 1,
        company: "District Factory Outlet",
        location: "Vancouver, B.C.",
        role: "Retail Associate",
        date: "April 2025",
        description: (
            <p>
                Starting my first job in Vancouver next week! 🛍️ Retail associate position while I'm studying at CCTB. Not exactly coding yet, but it's income, English practice, and getting to know the city. Plus, meeting new people every day. We all gotta start somewhere, right? 💪
            </p>
        ),
        gradient: "gradient-1",
        likes: "41",
        image: district
    },
    {
        id: 7,
        company: "CCTB",
        location: "Vancouver, B.C. Canada",
        role: "Full Stack Web Dev Diploma",
        date: "Jan 2025",
        description: (
            <p>
                First day at CCTB! 🎓 Full-stack web development diploma starts now. HTML5, Python, React, Node.js, AWS... This is exactly why I came to Canada. Time to level up for real 💻🚀
            </p>
        ),
        gradient: "gradient-3",
        likes: "45",
        image: cctb
    },
    {
        id: 14,
        company: "Welcome to Canada",
        location: "Vancouver, B.C.",
        role: "New Chapter",
        date: "Dec 31, 2024",
        description: (
            <p>
                Just landed in Vancouver ✈️🇨🇦 New Year's Eve in a new country, solo, freezing cold, nervous as hell. One suitcase, my bike, a student visa, and a plan to finally focus on what I want to build. No remorse, no regrets!. Here's to 2025 🌲
            </p>
        ),
        gradient: "gradient-3",
        likes: "204",
        image: canada
    },
    {
        id: 2,
        company: "Epochteca",
        location: "Morelia, Mich. Mexico",
        role: "Web Dev Intern",
        date: "Dec 2024",
        description: (
            <p>
                Wrapping up at Epochteca after over a year 💻 Built e-commerce billing systems connecting MercadoLibre & Shopify APIs, created a medical appointment platform for clinics, and designed UI workflows in Figma. Django became my go-to. Working remotely taught me so much - now taking everything I learned to the next stage 🐍✨
            </p>
        ),
        gradient: "gradient-2",
        likes: "35",
        image: epochteca,
        certificateLink: "/epochteca.pdf" // Placeholder, assuming user will replace or use resume for now
    },
    {
        id: 8,
        company: "Jala University",
        location: "Cochabamba, Bolivia (Remote)",
        role: "Full Stack Certification",
        date: "Mar 2023",
        description: (
            <p>
                Just finished the Jalasoft bootcamp! Three intense months of TypeScript, Node.js, Angular, Docker, and Figma. Working remotely with teams across Latin America, all in English, using ScrumBan methodology. Learned so much about collaborating across borders. Ready to put all this into practice 📈
            </p>
        ),
        gradient: "gradient-4",
        likes: "54",
        image: jalasoft,
        certificateLink: "/jalasoft.pdf" // Placeholder
    },
    {
        id: 11,
        company: "Hack the Ocean",
        location: "Innovacción Virtual / Microsoft",
        role: "1st Place 🏆",
        date: "May 2022",
        description: (
            <p>
                WE WON!! 🌊🏆 24 hours straight, no sleep, building 'OCEX Encyclopedia' with the team. An educational platform about marine life that beat 100+ other projects. Still can't believe it. First place at Hack the Ocean hackathon! Microsoft + ocean conservation + our crazy idea = this moment. Exhausted but so hyped right now 💙
            </p>
        ),
        gradient: "gradient-3",
        likes: "101",
        image: hackathon
    },
    {
        id: 9,
        company: "Innovacción Virtual",
        location: "Mexico City, Mexico",
        role: "Full Stack Bootcamp",
        date: "May 2022",
        description: (
            <p>
                Bootcamp done! 🔥 5 months of HTML, CSS, JavaScript, Vue.js, Node.js, Git... honestly? I actually enjoyed this. Like, really enjoyed it. The logic, the problem-solving, seeing things work after hours of debugging. Started looking for remote work opportunities, ended up finding something I genuinely like doing. Not sure where this goes next but I'm here for it 💡
            </p>
        ),
        gradient: "gradient-1",
        likes: "25",
        image: bootcamp
    },
    {
        id: 4,
        company: "Comercial Tacamba",
        location: "Morelia, Mich. Mexico",
        role: "Inventory & Admin Assistant",
        date: "Nov 2021",
        description: (
            <p>
                Closing this chapter 📊 Almost a year managing inventory, invoices, coordinating between branches and suppliers. Learned a lot about organization and dealing with logistics, but honestly? Office administration isn't it for me. Time to figure out what's next 🔍
            </p>
        ),
        gradient: "gradient-4",
        likes: "34",
        image: tacamba
    },
    {
        id: 13,
        company: "Tecnológico de Morelia",
        location: "Morelia, Mich. Mexico",
        role: "Mechanical Engineering",
        date: "2020",
        description: (
            <p>
                Finally graduated! 🎓⚙️ Mechanical Engineer right here. 5 years of CAD, manufacturing, prototyping, circuits, and way too many sleepless nights. Not gonna lie, I have no idea what's next with the world the way it is right now, but we made it. Gracias to everyone who pushed me through 💪
            </p>
        ),
        gradient: "gradient-1",
        likes: "55",
        image: graduation
    },
    {
        id: 5,
        company: "Vetelia",
        location: "Queretaro, Qro. Mexico",
        role: "Engineering Design Intern",
        date: "Jul 2019",
        description: (
            <p>
                Internship complete! 🏍️⚡ 6 months designing components for electric motorcycles, building electrical systems for go-karts, creating rain sensors and automated lighting for e-bikes. Autodesk Inventor every single day. Seeing designs come to life in actual vehicles is pretty damn cool. Engineering is fun when you're building real stuff 🔧
            </p>
        ),
        gradient: "gradient-1",
        likes: "42",
        image: vetelia
    },
    {
        id: 12,
        company: "Academia Journals",
        location: "Celaya, Gto. Mexico",
        role: "Speaker & Co-Author",
        date: "Nov 2017",
        description: (
            <p>
                Presented our research today! 📚 International Congress at Academia Journals. Our team's CNC prototyping machine for non-ferrous materials - designed, built, and now published. Pretty surreal presenting in front of researchers and academics. Engineering student life hitting different right now 🤓⚙️
            </p>
        ),
        gradient: "gradient-4",
        likes: "30",
        image: journals
    },
    {
        id: 10,
        company: "Tecnológico de Morelia",
        location: "Morelia, Mich. Mexico",
        role: "Mechanical Engineering Student",
        date: "Aug 2013",
        description: (
            <p>
                Starting Mechanical Engineering at Tec de Morelia 🎓 Design & Manufacturing specialization. Five years ahead learning SolidWorks, manufacturing processes, materials, all of it. Let's see where this goes. Ready to build some stuff ⚙️
            </p>
        ),
        gradient: "gradient-2",
        likes: "15",
        image: tecnology
    }
];

export default experiences;
