import { useState } from 'react';
import '../../styles/skills.css';
import jqueryIcon from '../../assets/icons/jquery.svg';
import typescriptIcon from '../../assets/icons/typescript.svg';

export default function Skills() {
    const [currentScreen, setCurrentScreen] = useState('frontend');
    const [prevScreen, setPrevScreen] = useState(null);

    // Initial State: Looking at Front (Z), Up is Top (Y)
    const [orientation, setOrientation] = useState({
        faceVector: { x: 0, y: 0, z: 1 }, // Front
        upVector: { x: 0, y: 1, z: 0 }    // Top
    });

    // 1. Define Vectors for each face (Standard 3D Coordinate System)
    const FACES = {
        frontend: { x: 0, y: 0, z: 1 },  // FRONT (Green)
        backend: { x: 1, y: 0, z: 0 },  // RIGHT (Red)
        languages: { x: 0, y: 1, z: 0 },  // TOP (White)
        databases: { x: 0, y: -1, z: 0 }, // BOTTOM (Yellow)
        design: { x: -1, y: 0, z: 0 }, // LEFT (Orange)
        devops: { x: 0, y: 0, z: -1 }  // BACK (Blue)
    };

    // Helper: Find face name by vector
    const getFaceName = (vec) => {
        return Object.keys(FACES).find(key =>
            FACES[key].x === vec.x &&
            FACES[key].y === vec.y &&
            FACES[key].z === vec.z
        );
    };

    // Helper: Vector Multiplication (Cross Product)
    const crossProduct = (a, b) => {
        return {
            x: a.y * b.z - a.z * b.y,
            y: a.z * b.x - a.x * b.z,
            z: a.x * b.y - a.y * b.x
        };
    };

    // Helper: Negate Vector (Opposite)
    const negate = (v) => ({ x: -v.x, y: -v.y, z: -v.z });

    // 2. Navigation Logic based on Space State
    const navigate = (direction) => {
        setOrientation(current => {
            const { faceVector, upVector } = current;
            let newFace, newUp;

            if (direction === 'up') {
                // Rotate UP: Face becomes Top (old Up), Up becomes Back (old -Face)
                newFace = upVector;
                newUp = negate(faceVector);
            } else if (direction === 'down') {
                // Rotate DOWN: Face becomes Bottom (old -Up), Up becomes Front (old Face)
                newFace = negate(upVector);
                newUp = faceVector;
            } else if (direction === 'right') {
                // Rotate RIGHT: Face becomes Right (Up x Face), Up stays Up
                newFace = crossProduct(upVector, faceVector);
                newUp = upVector;
            } else if (direction === 'left') {
                // Rotate LEFT: Face becomes Left (Face x Up), Up stays Up
                newFace = crossProduct(faceVector, upVector);
                newUp = upVector;
            }

            // Update Screen based on new Face Vector
            const nextScreenName = getFaceName(newFace);

            if (nextScreenName) {
                setPrevScreen(currentScreen);
                setCurrentScreen(nextScreenName);
                return { faceVector: newFace, upVector: newUp };
            }
            return current;
        });
    };

    const handleArrowLeft = () => navigate('left');
    const handleArrowRight = () => navigate('right');
    const handleArrowUp = () => navigate('up');
    const handleArrowDown = () => navigate('down');



    return (
        <div className="skills-screen">
            <h2 key={currentScreen}>{currentScreen}</h2>
            <div className="rubik-screen">
                <i className="fa-solid fa-arrow-left" onClick={handleArrowLeft}></i>
                <i className="fa-solid fa-arrow-right" onClick={handleArrowRight}></i>
                <i className="fa-solid fa-arrow-up" onClick={handleArrowUp}></i>
                <i className="fa-solid fa-arrow-down" onClick={handleArrowDown}></i>

                {currentScreen === "frontend" && (
                    <div className="skills" id="frontend">
                        <span data-tooltip="HTML5"><i className="fa-brands fa-html5"></i></span>
                        <span data-tooltip="CSS3"><i className="fa-brands fa-css3-alt"></i></span>
                        <span data-tooltip="JavaScript"><i className="fa-brands fa-js"></i></span>
                        <span data-tooltip="TypeScript"><img src={typescriptIcon} alt="TypeScript" style={{ width: '0.9em', height: '0.9em' }} /></span>
                        <span data-tooltip="React"><i className="fa-brands fa-react"></i></span>
                        <span data-tooltip="Vue.js"><i className="fa-brands fa-vuejs"></i></span>
                        <span data-tooltip="Angular"><i className="fa-brands fa-angular"></i></span>
                        <span data-tooltip="Bootstrap"><i className="fa-brands fa-bootstrap"></i></span>
                        <span data-tooltip="jQuery"><img src={jqueryIcon} alt="jQuery" style={{ width: '0.9em', height: '0.9em' }} /></span>
                    </div>
                )}

                {currentScreen === "backend" && (
                    <div className="skills" id="backend">
                        <span data-tooltip="Python"><i className="fa-brands fa-python"></i></span>
                        <span data-tooltip="Django"><i className="fa-solid fa-leaf"></i></span>
                        <span data-tooltip="Node.js"><i className="fa-brands fa-node-js"></i></span>
                        <span data-tooltip="Express.js"><i className="fa-solid fa-route"></i></span>
                        <span data-tooltip="REST APIs"><i className="fa-solid fa-plug"></i></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                )}

                {currentScreen === "databases" && (
                    <div className="skills" id="databases">
                        <span data-tooltip="SQL"><i className="fa-solid fa-database"></i></span>
                        <span data-tooltip="MongoDB"><i className="fa-solid fa-leaf"></i></span>
                        <span data-tooltip="Supabase"><i className="fa-solid fa-square-plus"></i></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                )}

                {currentScreen === "devops" && (
                    <div className="skills" id="devops">
                        <span data-tooltip="Docker"><i className="fa-brands fa-docker"></i></span>
                        <span data-tooltip="AWS"><i className="fa-brands fa-aws"></i></span>
                        <span data-tooltip="Git"><i className="fa-brands fa-git-alt"></i></span>
                        <span data-tooltip="GitHub"><i className="fa-brands fa-github"></i></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                )}

                {currentScreen === "design" && (
                    <div className="skills" id="design">
                        <span data-tooltip="Figma"><i className="fa-brands fa-figma"></i></span>
                        <span data-tooltip="3D Modeling"><i className="fa-solid fa-cube"></i></span>
                        <span data-tooltip="UI/UX"><i className="fa-solid fa-pencil"></i></span>
                        <span data-tooltip="Blender"><i className="fa-solid fa-cubes"></i></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                )}

                {currentScreen === "languages" && (
                    <div className="skills" id="languages">
                        <span data-tooltip="English"><i className="fa-solid fa-language"></i></span>
                        <span data-tooltip="Spanish"><i className="fa-solid fa-globe"></i></span>
                        <span data-tooltip="Communication"><i className="fa-solid fa-comments"></i></span>
                        <span data-tooltip="Teamwork"><i className="fa-solid fa-people-group"></i></span>
                        <span data-tooltip="Fast Learning"><i className="fa-solid fa-bolt"></i></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                )}

            </div>
        </div>
    );
}