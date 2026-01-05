import { Html } from '@react-three/drei';
import '../../styles/DiscoveryLabels.css';

/**
 * COMPONENT: DiscoveryLabel
 * 
 * DESIGN PATTERN: Helper/UI Component
 * Renders a persistent discovery label with:
 * 1. Comic Annotation box + Arrow (positioned above)
 * 2. Encircling highlight circle (positioned at model center)
 */
export default function DiscoveryLabel({ text, position = [0, 2, 0], circlePosition = [0, 0, 0], circleSize = 60, isVisible = false, darkMode = false }) {
    if (!isVisible) return null;

    return (
        <>
            {/* Annotation + Arrow (positioned above the model) */}
            <Html
                position={position}
                center
                style={{ pointerEvents: 'none' }}
            >
                <div className={`discovery-label-wrapper ${darkMode ? 'dark-mode' : ''}`}>
                    <div className="discovery-annotation">
                        {text}
                    </div>
                    <div className="discovery-arrow">
                        <svg viewBox="0 0 40 60">
                            <path d="M20,0 L20,40 M10,30 L20,40 L30,30" />
                        </svg>
                    </div>
                </div>
            </Html>

            {/* Circle (positioned at exact model location) */}
            <Html
                position={circlePosition}
                center
                style={{ pointerEvents: 'none' }}
            >
                <div className={`discovery-circle ${darkMode ? 'dark-mode' : ''}`} style={{ width: `${circleSize}px`, height: `${circleSize}px` }}>
                    <svg viewBox="0 0 100 100">
                        <path d="M50,10 A40,40 0 1,1 49.9,10" />
                    </svg>
                </div>
            </Html>
        </>
    );
}
