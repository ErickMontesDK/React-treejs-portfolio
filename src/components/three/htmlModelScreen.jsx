import { Html } from '@react-three/drei';
import { useContext } from 'react';
import { MusicContext } from '../../context/MusicContext';
import './htmlModelScreen.css';

/**
 * COMPONENT: HtmlModelScreen
 * 
 * Este componente renderiza contenido HTML dentro de modelos 3D
 * Útil para mostrar pantallas interactivas en laptops, phones, tablets, etc.
 * 
 * @param {Array} position - Posición [x, y, z] donde se renderizará el HTML en el espacio 3D
 * @param {Array} rotation - Rotación [x, y, z] en radianes para alinear con la pantalla del modelo
 * @param {Number} distanceFactor - Factor de escala del HTML (menor = más pequeño)
 * @param {Number} scale - Escala CSS del contenido (1 = normal, 0.5 = mitad, 2 = doble)
 * @param {Boolean} transform - Si true, el HTML se transforma con el modelo 3D
 * @param {String} className - Clase CSS adicional para el contenedor
 * @param {ReactNode} children - Contenido HTML a renderizar
 * @param {Boolean} occlude - Si true, el HTML se oculta cuando está detrás de otros objetos
 * @param {Array} center - Centro del HTML [x, y] donde [0.5, 0.5] es el centro
 */
export default function HtmlModelScreen({
    position = [0, 0, 0],
    rotation = [0, 0, 0],
    distanceFactor = 0.5,
    scale = .33,
    transform = true,
    className = '',
    children,
    occlude = false,
    center = [0.5, 0.5],
    disableFeatures = false,
    darkMode = false,
    ...props
}) {
    // Handler para prevenir que el scroll afecte OrbitControls
    const handleWheel = (e) => {
        e.stopPropagation(); // Previene que llegue a OrbitControls
    };

    const musicValue = useContext(MusicContext);

    return (
        <Html
            position={position}
            rotation={rotation}
            transform={transform}
            distanceFactor={distanceFactor}
            occlude={occlude}
            center={center}
            className={`html-model-screen ${className}`}
            pointerEvents={disableFeatures ? 'auto' : 'none'}
            {...props}
        >
            <div
                className={`screen-content ${darkMode ? 'dark-mode' : ''}`}
                style={{
                    transform: `scale(${scale})`,
                    transformOrigin: 'center center'
                }}
                onWheel={handleWheel}
            >
                <MusicContext.Provider value={musicValue}>
                    {children}
                </MusicContext.Provider>
            </div>
        </Html>
    );
}