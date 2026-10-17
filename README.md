# Erick Montes · 3D Portfolio

An interactive portfolio built as a 3D room you can explore in the browser. Click objects on the desk to open each section: the laptop shows projects, the soda can opens "About", the phone shows experience as a social feed, and the iPod plays music.

**Live:** [erickmontesdk.cv](http://erickmontesdk.cv/)

## Features

- Fully modeled 3D room (Blender models exported as `.glb`) rendered with React Three Fiber
- Camera transitions per section, with orbit limits tuned for each view
- Light and dark modes with volumetric spotlights and toggleable lamps
- Interactive objects with sounds and animations
- A separate lightweight layout for phones, so mobile visitors get a fast, readable version of the same content
- Downloadable resume

## Stack

React 19 · React Three Fiber · Drei · Three.js · React Bootstrap · Blender

## Structure

```
src/
├── components/
│   ├── three/        # scene, models, lights, HTML screens inside the 3D world
│   ├── htmlScreens/  # project monitor, experience feed, contact, etc.
│   └── mobile/       # mobile-only layout
├── data/             # projects, experience, cameras, lights, models config
├── context/          # music player state
└── assets/           # .glb models, images, audio, resume
```

Content lives in `src/data/`, so adding a project or a job is a data change, not a component change.

## Running locally

```bash
npm install
npm start
```

Then open http://localhost:3000.
