import * as THREE from 'three';
import { creaseLineMaterial } from './createGradientMap';

const generateCreaseLines=(mesh)=>{
    const thresholdDegrees = 85;
    const showAll = false;

    const geometry =  mesh.geometry;
    if (!geometry || !geometry.isBufferGeometry) {
    console.warn('Geometry not compatible with crease lines.', mesh.name);
    return;
    }

    let workingGeometry = geometry;
    if (geometry.index !== null){
    workingGeometry = geometry.toNonIndexed();
    workingGeometry.deleteAttribute('normal');
    workingGeometry.computeVertexNormals();
    }
    const position = workingGeometry.attributes.position;

    if(!position) return;

    const positions = position.array;
    const vertexCount = positions.length / 3;

    const edgeToFaces = new Map();

    function getFaceNormal(v1Idx, v2Idx, v3Idx) {
    const p1 = new THREE.Vector3().fromArray(positions, v1Idx * 3);
    const p2 = new THREE.Vector3().fromArray(positions, v2Idx * 3);
    const p3 = new THREE.Vector3().fromArray(positions, v3Idx * 3);
    const edge1 = p2.clone().sub(p1);
    const edge2 = p3.clone().sub(p1);
    return edge1.cross(edge2).normalize();
    }

    for (let i = 0; i < vertexCount; i += 3) {
    const v1 = i, v2 = i + 1, v3 = i + 2;
    const faceNormal = getFaceNormal(v1, v2, v3);

    function getVertexKey(vIdx) {
        const x = positions[vIdx * 3].toFixed(3);
        const y = positions[vIdx * 3 + 1].toFixed(3);
        const z = positions[vIdx * 3 + 2].toFixed(3);
        return `${x},${y},${z}`;
    }

    const k1 = getVertexKey(v1), k2 = getVertexKey(v2), k3 = getVertexKey(v3);
    
    [[k1, k2, faceNormal, v1, v2], 
    [k2, k3, faceNormal, v2, v3], 
    [k3, k1, faceNormal, v3, v1]].forEach(([key1, key2, fNormal, vIdx1, vIdx2]) => {
        const edgeKey = key1 < key2 ? `${key1}|${key2}` : `${key2}|${key1}`;
        if (!edgeToFaces.has(edgeKey)) {
        edgeToFaces.set(edgeKey, { normals: [], vertices: [vIdx1, vIdx2] });
        }
        edgeToFaces.get(edgeKey).normals.push(fNormal.clone());
    });
    }
    
    const creasePositions = [];
    const thresholdRad = THREE.MathUtils.degToRad(thresholdDegrees);

    edgeToFaces.forEach((data, edgeKey) => {
    const normalsList = data.normals;
    const [v1, v2] = data.vertices;
    
    const isInternal = normalsList.length === 2;
    const isBoundary = normalsList.length === 1;

    let qualifies = false;
    let angleRad = 0;

    if (isInternal) {
        const n1 = normalsList[0];
        const n2 = normalsList[1];
        const dot = Math.max(-1, Math.min(1, n1.dot(n2)));
        angleRad = Math.acos(dot);
        qualifies = showAll || (angleRad >= thresholdRad);
    } else if (isBoundary) {
        angleRad = Math.PI; 
        qualifies = showAll || (angleRad >= thresholdRad);
    }
    
    if (qualifies) {
        const p1Idx = v1 * 3, p2Idx = v2 * 3;
        creasePositions.push(
        positions[p1Idx], positions[p1Idx + 1], positions[p1Idx + 2],
        positions[p2Idx], positions[p2Idx + 1], positions[p2Idx + 2]
        );
    }
    });

    if (creasePositions.length === 0) return null;

    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(creasePositions, 3));
    
    const lineMaterial = creaseLineMaterial.clone();

    const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
    return lines;

}

export default generateCreaseLines;