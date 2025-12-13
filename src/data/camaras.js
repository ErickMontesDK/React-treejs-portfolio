const camaras = {
    main: {
        position: [3, 4, 3],
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
        position: [-1.9, 1.6, 0],
        target: [-1, 1.6, 0],
        zoom: 8,
        // Límites de rotación (Azimuth = horizontal, Polar = vertical)
        minAzimuthAngle: Math.PI / 2.2,
        maxAzimuthAngle: Math.PI / 1.9,
        minPolarAngle: Math.PI / 2.4,
        maxPolarAngle: Math.PI / 2,
        // Límites de zoom y distancia
        minZoom: 5,
        maxZoom: 15,
        minDistance: 0.1,
        maxDistance: 0.1
    },
    about: {
        position: [-.7, 0.7, 1.7],
        target: [-1.5, 0.7, 1.35],
        zoom: 10,
        // Límites de rotación (Azimuth = horizontal, Polar = vertical)
        // Calculado desde posición inicial: Azimuth 66.3°, Polar 89.8° con rango ±20°
        minAzimuthAngle: 0.808,   // 46.3° (20° a la izquierda)
        maxAzimuthAngle: 1.506,   // 86.3° (20° a la derecha)
        minPolarAngle: 1.218,     // 69.8° (20° hacia arriba)
        maxPolarAngle: 1.916,     // 109.8° (20° hacia abajo)
        // Límites de zoom y distancia
        minZoom: 5,
        maxZoom: 15,
        minDistance: 0.001,
        maxDistance: 10,
    },
    skills: {
        position: [-1.5, 2.6, 0.3],
        target: [-1.9, 2.4, 0.3],
        zoom: 10,
        // Límites de rotación (Azimuth = horizontal, Polar = vertical)
        // Calculado desde posición inicial: Azimuth 89.0°, Polar 63.2° con rango ±15°
        minAzimuthAngle: 1.291,   // 74.0° (15° a la izquierda)
        maxAzimuthAngle: 1.815,   // 104.0° (15° a la derecha)
        minPolarAngle: 0.841,     // 48.2° (15° hacia arriba)
        maxPolarAngle: 1.365,     // 78.2° (15° hacia abajo)
        // Límites de zoom y distancia
        minZoom: 10,
        maxZoom: 15,
        minDistance: 0.001,
        maxDistance: 10,
    },
    contact: {
        position: [-1.40, 1.2, -1.0],
        target: [-1.20, 1, -1.45],
        zoom: 10,
        // Límites de rotación (Azimuth = horizontal, Polar = vertical)
        // Calculado desde posición inicial: Azimuth -23.4°, Polar 67.6° con rango ±20°
        minAzimuthAngle: -0.757,  // -43.4° (20° a la izquierda)
        maxAzimuthAngle: -0.059,  // -3.4° (20° a la derecha)
        minPolarAngle: 0.831,     // 47.6° (20° hacia arriba)
        maxPolarAngle: 1.529,     // 87.6° (20° hacia abajo)
        // Límites de zoom y distancia
        minZoom: 5,
        maxZoom: 15,
        minDistance: 0.001,
        maxDistance: 10,
    },
    experience: {
        position: [-1.55, 1.2, .45],
        target: [-1.55, 1, .45],
        zoom: 40,
        // Límites de rotación (Azimuth = horizontal, Polar = vertical)
        // Calculado desde posición inicial: Azimuth 149.6°, Polar 2.8° con rango ±5°
        minAzimuthAngle: 2.523,   // 144.6° (5° a la izquierda)
        maxAzimuthAngle: 2.698,   // 154.6° (5° a la derecha)
        minPolarAngle: 0.0,       // 0° (límite superior, no puede ser negativo)
        maxPolarAngle: 0.136,     // 7.8° (5° hacia abajo)
        // Límites de zoom y distancia
        minZoom: 24,
        maxZoom: 40,
        minDistance: 0.001,
        maxDistance: 10,
    },
};

export default camaras;
