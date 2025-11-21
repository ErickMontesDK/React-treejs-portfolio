import {baseToonMaterial, currentGradientMap} from './createGradientMap';
import generateCreaseLines from './creases';
import * as THREE from 'three';

const chargingModelMaterials = (model, position, scale, rotation) => {
    const [x, y, z] = position || [0, 0, 0];
    const [rx, ry, rz] = rotation || [0, 0, 0];
    const [sx, sy, sz] = scale || [1, 1, 1];

    model.position.set(x, y, z);
    model.rotation.set(rx, ry, rz);
    model.scale.set(sx, sy, sz);
    
    model.traverse((child)=>{
        if(!child.isMesh || child.morphTargetInfluences || child.isSkinnedMesh) return;
        
        if(!child.geometry.attributes.normal){
            child.geometry.computeVertexNormals();
        }
        const meshName = child.name.toLowerCase();
        const baseColor = child.material?.color?.getHex?.() || 0xffffff;
        let creaseLines = null;
        
        switch (true) {
            case meshName.startsWith('glass_'):
                child.material = new THREE.MeshPhysicalMaterial({
                    color: baseColor,
                    transparent: true,
                    opacity: 0.40,
                    roughness: 0.1,
                    metalness: 0,
                    transmission: 0.9,
                    ior: 1.5,
                    thickness: 0.1,
                });
                child.castShadow = false;
                child.receiveShadow = false;
                child.userData.isGlassObject = true;
                child.renderOrder = 1;

                creaseLines = generateCreaseLines(child);
                if(creaseLines) child.add(creaseLines);
                return;
                
            case meshName.startsWith('lines_'):
                child.material = new THREE.MeshBasicMaterial({
                    color: child.material.color || 0xffffff,
                    transparent: true,
                    opacity: 0.65,
                });
                child.castShadow = false;
                child.receiveShadow = false;
                child.userData.isLinesObject = true;
                child.renderOrder = 1;
                return;
            default:
                const toonMaterial = baseToonMaterial.clone();
                toonMaterial.color.setHex(baseColor);
                toonMaterial.gradientMap = currentGradientMap;
                child.material = toonMaterial;
                child.castShadow = true;
                child.receiveShadow = true;

                creaseLines = generateCreaseLines(child);
                if(creaseLines) child.add(creaseLines);
                break;
        }
    })

    return model

}

export default chargingModelMaterials