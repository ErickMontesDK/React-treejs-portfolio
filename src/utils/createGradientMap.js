import * as THREE from 'three';

const globalShadowSteps = 3;
const globalSmoothness = 0;

function createGradientMap(steps, smoothness) {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 1;
    const context = canvas.getContext('2d');

    const colors = [
    '#1a0000', // Sombra más oscura
    '#330000', // Sombra oscura
    '#770000', // Sombra media
    '#aa0000', // Transición
    '#ffffff'  // Luz
    ];

    const bandWidth = 256 / steps;
    for (let i = 0; i < steps; i++) {
    const colorIndex = Math.floor(i / steps) * (colors.length - 1);
    const nextColorIndex = Math.min(colorIndex + 1, colors.length - 1);
    const t = ((i / steps) * (colors.length - 1)) - colorIndex; 

    const color1 = new THREE.Color(colors[colorIndex]);
    const color2 = new THREE.Color(colors[nextColorIndex]);
    const blendedColor = color1.lerp(color2, t);

    context.fillStyle = '#' + blendedColor.getHexString();

    const x = i * bandWidth;
    const smoothZone = Math.min(smoothness, bandWidth / 2);

    // Rellenar la banda principal
    context.fillRect(x, 0, bandWidth - smoothZone, 1);
    for (let i = 0; i < steps - 1 && smoothness > 0; i++) {
    const nextColorIndex2 = Math.floor(((i + 1) / steps) * (colors.length - 1));
    const nextColorIndex3 = Math.min(nextColorIndex2 + 1, colors.length - 1);
    const t2 = (((i + 1) / steps) * (colors.length - 1)) - nextColorIndex2;
    
    const nextColor1 = new THREE.Color(colors[nextColorIndex2]);
    const nextColor2 = new THREE.Color(colors[nextColorIndex3]);
    const nextBlendedColor = nextColor1.lerp(nextColor2, t2);
    
    const gradient = context.createLinearGradient(x + bandWidth - smoothZone, 0, x + bandWidth, 0);
    gradient.addColorStop(0, '#' + blendedColor.getHexString());
    gradient.addColorStop(1, '#' + nextBlendedColor.getHexString());
    context.fillStyle = gradient;
    context.fillRect(x + bandWidth - smoothZone, 0, smoothZone, 1);
    }
    }
    const gradientMap = new THREE.CanvasTexture(canvas);
    gradientMap.minFilter = THREE.NearestFilter;
    gradientMap.magFilter = THREE.NearestFilter;

    return gradientMap;
    
}

const currentGradientMap = createGradientMap(globalShadowSteps, globalSmoothness);
    
const baseToonMaterial = new THREE.MeshToonMaterial({
    gradientMap: currentGradientMap
});

const creaseLineMaterial = new THREE.LineBasicMaterial({
    color: 0x000000,
    linewidth: 30
});

export { currentGradientMap, baseToonMaterial, creaseLineMaterial };