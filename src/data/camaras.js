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
        position: [-1.1, 1.5, 0],
        target: [-1.2, 1.5, 0],
        zoom: 12,
        // Límites de rotación (Azimuth = horizontal, Polar = vertical)
        minAzimuthAngle: Math.PI / 2.2,
        maxAzimuthAngle: Math.PI / 1.9,
        minPolarAngle: Math.PI / 2.4,
        maxPolarAngle: Math.PI / 2,
        // Límites de zoom y distancia
        minZoom: 8,
        maxZoom: 15,
        minDistance: 0.01,
        maxDistance: .1
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
        position: [-1.5, 1.9, 0.3],
        target: [-1.9, 2.1, 0.3],
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
    blog: {
        target: [-1.60, .9, -1.1],
        position: [0, 3, 0],
        zoom: 20,
        // Límites de rotación (Azimuth = horizontal, Polar = vertical)
        // Initial Azimuth: 0.9685 rad (55.5°) - Calculated from position/target
        // ±15° range = ±0.2618 rad
        minAzimuthAngle: 0.707,  // 40.5° (15° left from initial)
        maxAzimuthAngle: 1.230,  // 70.5° (15° right from initial)
        // minPolarAngle: 0.831,     // 47.6° (20° hacia arriba)
        // maxPolarAngle: 1.529,     // 87.6° (20° hacia abajo)
        // // Límites de zoom y distancia
        minZoom: 15,
        maxZoom: 20,
        minDistance: 0.001,
        maxDistance: 10,
    },
    contact: {
        position: [1.0, 2.7, -1.0],
        target: [1.20, 2.5, -1.45],
        zoom: 10,
        // Límites de rotación (Azimuth = horizontal, Polar = vertical)
        // Calculado desde posición inicial: Azimuth -23.4°, Polar 67.6° con rango ±20°
        // Limit Right (Negative) -> Limit Left (0 or Positive)
        // Correct logic: min < max.
        minAzimuthAngle: -0.8, // Allow rotation to the right (approx 45 deg)
        maxAzimuthAngle: 0,    // Stop at the center/left abajo)
        minPolarAngle: 0.831,     // 47.6° (20° hacia arriba)
        maxPolarAngle: 1.529,     // 87.6° (20° hacia abajo)
        // Límites de zoom y distancia
        minZoom: 10,
        maxZoom: 15,
        minDistance: 0.001,
        maxDistance: 10,
    },
    experience: {
        position: [-1.57, 1.2, .42],
        target: [-1.57, 1, .42],
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
    music: {
        position: [1.7, 1.6, 2],
        target: [1.7, .9, 2],
        // position: [.7, .9, 0],
        // target: [1.20, .9, .89],
        zoom: 10,
        // Límites de rotación (Azimuth = horizontal, Polar = vertical)
        // Calculado desde posición inicial: Azimuth -23.4°, Polar 67.6° con rango ±20°
        // Limit Right (Negative) -> Limit Left (0 or Positive)
        // Correct logic: min < max.
        minAzimuthAngle: -0.8, // Allow rotation to the right (approx 45 deg)
        maxAzimuthAngle: 0,    // Stop at the center/left abajo)
        // minPolarAngle: 0.831,     // 47.6° (20° hacia arriba)
        // maxPolarAngle: 1.529,     // 87.6° (20° hacia abajo)
        // Límites de zoom y distancia
        minZoom: 10,
        maxZoom: 15,
        minDistance: 0.001,
        maxDistance: 10,
    },
};

export default camaras;
