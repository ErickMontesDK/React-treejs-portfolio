export const camaras = {
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
    // Puedes agregar más cámaras aquí, por ejemplo:
    // about: { ... },
    // projects: { ... }
};