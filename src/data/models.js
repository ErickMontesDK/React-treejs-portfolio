import room from '../assets/models/room.glb';
import coke from '../assets/models/coke.glb';
import amp from '../assets/models/amp.glb';
import batman from '../assets/models/batman.glb';
import batmobile from '../assets/models/batmobile.glb';
import beatles from '../assets/models/beatles.glb';
import bed from '../assets/models/bed.glb';
import bike_helmet from '../assets/models/bike_helmet.glb';
import books from '../assets/models/books.glb';
import cds from '../assets/models/cds.glb';
import chair from '../assets/models/chair.glb';
import desk from '../assets/models/desk.glb';
import guitar from '../assets/models/guitar.glb';
import funko from '../assets/models/funko.glb';
import headphones from '../assets/models/headphones.glb';
import ipod from '../assets/models/ipod.glb';
import laptop from '../assets/models/laptop.glb';
import lava from '../assets/models/lava.glb';
import manga from '../assets/models/manga.glb';
import mask_ghost from '../assets/models/mask_ghost.glb';
import mouse from '../assets/models/mouse.glb';
import notebook from '../assets/models/notebook.glb';
import pencil from '../assets/models/pencil.glb';
import phone from '../assets/models/phone.glb';
import pinkfloyd from '../assets/models/pinkfloyd.glb';
import popcorn from '../assets/models/popcorn.glb';
import poster from '../assets/models/poster.glb';
import printer from '../assets/models/printer.glb';
import puff from '../assets/models/puff.glb';
import repisas from '../assets/models/repisas.glb';
import roof_lamp from '../assets/models/roof_lamp.glb';
import rubik from '../assets/models/rubik.glb';
import screen from '../assets/models/screen.glb';
import sirius from '../assets/models/sirius.glb';
import stormtrooper from '../assets/models/stormtrooper.glb';
import toy_fett from '../assets/models/toy_fett.glb';
import toy_vader from '../assets/models/toy_vader.glb';
import toy_storm from '../assets/models/toy_storm.glb';
import window from '../assets/models/window.glb';
import printer3d_main from '../assets/models/printer3d_main.glb';

const models = [
    {
        "name": "room",
        "model": room,
    },
    {
        "name": "coke",
        "model": coke,
        "description": "About me",
        "transitions": {
            "name": "about",
            "camera": "about",
        }
    },
    {
        "name": "amp",
        "model": amp,
    },
    {
        "name": "batman",
        "model": batman,
    },
    {
        "name": "batmobile",
        "model": batmobile,
    },
    {
        "name": "beatles",
        "model": beatles,
    },
    {
        "name": "bed",
        "model": bed,
    },
    {
        "name": "bike_helmet",
        "model": bike_helmet,
    },
    {
        "name": "books",
        "model": books,
    },
    {
        "name": "cds",
        "model": cds,
    },
    {
        "name": "chair",
        "model": chair,
        "animation": "onClick"
    },
    {
        "name": "desk",
        "model": desk,
    },
    {
        "name": "guitar",
        "model": guitar,
    },
    {
        "name": "funko",
        "model": funko,
    },
    {
        "name": "headphones",
        "model": headphones,
    },
    {
        "name": "ipod",
        "model": ipod,
    },
    {
        "name": "laptop",
        "model": laptop,
        "description": "Projects",
        "transitions": {
            "name": "projects",
            "camera": "projects",
        }

    },
    {
        "name": "lava",
        "model": lava,
        "animation": "onToggle",
        "lightTags": ["lava"],
        "initialStateLight": false,
        "initialStateDark": true
    },
    {
        "name": "manga",
        "model": manga,
    },
    {
        "name": "mask_ghost",
        "model": mask_ghost,
    },
    {
        "name": "mouse",
        "model": mouse,
    },
    {
        "name": "notebook",
        "model": notebook,
        "description": "Contact",
        "transitions": {
            "name": "contact",
            "camera": "contact",
        }
    },
    {
        "name": "pencil",
        "model": pencil,
    },
    {
        "name": "phone",
        "model": phone,
        "description": "Experience",
        "transitions": {
            "name": "experience",
            "camera": "experience",
        }
    },
    {
        "name": "pinkfloyd",
        "model": pinkfloyd,
    },
    {
        "name": "popcorn",
        "model": popcorn,
    },
    {
        "name": "poster",
        "model": poster,
    },
    {
        "name": "printer",
        "model": printer,
        "description": "Download resume",
        "animation": "onClick"
    },
    {
        "name": "puff",
        "model": puff,
    },
    {
        "name": "repisas",
        "model": repisas,
    },
    {
        "name": "roof_lamp",
        "model": roof_lamp,
        "animation": "onToggle",
        "lightTags": ["roof"],
        "initialStateDark": true,
        "initialStateLight": false
    },
    {
        "name": "rubik",
        "model": rubik,
        "description": "Skills",
        "transitions": {
            "name": "skills",
            "camera": "skills",
        }
    },
    {
        "name": "screen",
        "model": screen,
    },
    {
        "name": "sirius",
        "model": sirius,
        "description": "Sr. Developer Sirius Montes P.P.",
    },
    {
        "name": "stormtrooper",
        "model": stormtrooper,

    },
    {
        "name": "toy_fett",
        "model": toy_fett,
        "description": "Contact",
        "transitions": {
            "name": "contact",
            "camera": "contact",
        }
    },
    {
        "name": "toy_vader",
        "model": toy_vader,
        "description": "Contact",
        "transitions": {
            "name": "contact",
            "camera": "contact",
        }
    },
    {
        "name": "toy_storm",
        "model": toy_storm,
        "description": "Contact",
        "transitions": {
            "name": "contact",
            "camera": "contact",
        }
    },
    {
        "name": "window",
        "model": window,
    },
    {
        "name": "3dprint_main",
        "model": printer3d_main,
        "animation": "onLoop"
    }
]

export default models
