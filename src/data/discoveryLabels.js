// Discovery Labels Configuration
// Each entry defines the text and 3D positions for a discovery label
// position: Where the annotation box + arrow appear (usually above the model)
// circlePosition: Where the highlight circle appears (at the model's center)

const discoveryLabels = [
    {
        id: "skills",
        text: "Skills",
        position: [-1.87, 2.6, 0.32],
        circlePosition: [-1.87, 2.5, 0.32],
        circleSize: 50
    },
    {
        id: "about",
        text: "About",
        position: [-1.45, 1.15, 1.35],
        circlePosition: [-1.45, 1, 1.35],
        circleSize: 50
    },
    {
        id: "experience",
        text: "Experience",
        position: [-1.56, 1.0, 0.42],
        circlePosition: [-1.56, .9, 0.42],
        circleSize: 50
    },
    {
        id: "contact",
        text: "Contact",
        position: [1.4, 2.5, -2.2],
        circlePosition: [1.4, 2.3, -2.2],
        circleSize: 90
    },
    {
        id: "resume",
        text: "Resume",
        position: [-0.2, 1.2, -2.1],
        circlePosition: [-0.2, 1.0, -2.1],
        circleSize: 90
    },
    {
        id: "projects",
        text: "Projects",
        position: [-1.95, 1.4, -0.15],
        circlePosition: [-1.95, 1.1, -0.15],
        circleSize: 90
    },
    // {
    //     id: "blog",
    //     text: "Blog",
    //     position: [-1.57, 1.2, -1.15],
    //     circlePosition: [-1.57, 0.9, -1.15],
    //     circleSize: 60
    // },
    {
        id: "music",
        text: "Music",
        position: [1.7, 1.0, 2.03],
        circlePosition: [1.7, 0.8, 2.03],
        circleSize: 80
    }
];

export default discoveryLabels;
