const camaras = {
    main: {
        position: [3, 3, 3],
        target: [0, 1, 0],
        zoom: 1.7,
        // Límites de rotación (Azimuth = horizontal, Polar = vertical)
        minAzimuthAngle: 0,
        maxAzimuthAngle: Math.PI / 2,
        minPolarAngle: 0,
        maxPolarAngle: Math.PI / 2.1,
        // Límites de zoom y distancia
        minZoom: 1.7,
        maxZoom: 5,
        minDistance: 3,
        maxDistance: 10,
    },
    projects: {
        position: [-2.9, 1.2, 0],
        target: [-3, 1.2, 0],
        zoom: 10,
        // Límites de rotación (Azimuth = horizontal, Polar = vertical)
        minAzimuthAngle: Math.PI / 2.1,
        maxAzimuthAngle: Math.PI / 2,
        minPolarAngle: Math.PI / 2.4,
        maxPolarAngle: Math.PI / 2.3,
        // Límites de zoom y distancia
        minZoom: 5,
        maxZoom: 15,
        minDistance: 10,
        maxDistance: 10,
    },
    about: {
        position: [0, 0, 0],
        target: [0, 0, 0],
        zoom: 1,
        // Límites de rotación (Azimuth = horizontal, Polar = vertical)
        minAzimuthAngle: 0,
        maxAzimuthAngle: Math.PI / 2,
        minPolarAngle: 0,
        maxPolarAngle: Math.PI / 2.1,
        // Límites de zoom y distancia
        minZoom: 1,
        maxZoom: 1,
        minDistance: 1,
        maxDistance: 1,
    },
};

export default camaras;
