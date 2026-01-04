/**
 * EJEMPLO DE USO: HtmlModelScreen
 * 
 * Este archivo muestra cómo usar el componente HtmlModelScreen
 * como children del componente Model para insertar contenido HTML
 * en las pantallas de tus modelos 3D
 */

import Model from './Model';
import HtmlModelScreen from './htmlModelScreen';

// EJEMPLO 1: Uso básico con contenido por defecto
function EjemploBasico() {
    return (
        <Model
            src="/models/laptop.glb"
            position={[0, 0, 0]}
        >
            {/* HtmlModelScreen como children de Model */}
            <HtmlModelScreen
                position={[0, 1.5, 0.1]}  // Ajusta según tu modelo
                rotation={[0, 0, 0]}       // Ajusta según la orientación
                distanceFactor={0.5}       // Ajusta el tamaño
            />
        </Model>
    );
}

// EJEMPLO 2: Laptop con contenido personalizado
function LaptopConPortfolio() {
    return (
        <Model
            src="/models/laptop.glb"
            position={[0, 0, 0]}
        >
            <HtmlModelScreen
                position={[0, 1.5, 0.1]}
                rotation={[-0.2, 0, 0]}
                distanceFactor={0.4}
                className="laptop-screen"
            >
                <div style={{
                    background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)',
                    padding: '30px',
                    borderRadius: '10px',
                    color: 'white'
                }}>
                    <h1>Mi Portfolio</h1>
                    <ul>
                        <li>React Developer</li>
                        <li>Three.js Specialist</li>
                        <li>UI/UX Designer</li>
                    </ul>
                    <button style={{
                        background: 'white',
                        color: '#1e3a8a',
                        padding: '10px 20px',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        fontWeight: 'bold'
                    }}>
                        Ver Proyectos
                    </button>
                </div>
            </HtmlModelScreen>
        </Model>
    );
}

// EJEMPLO 3: Phone con contenido personalizado
function PhoneConApp() {
    return (
        <Model
            src="/models/phone.glb"
            position={[2, 0, 0]}
        >
            <HtmlModelScreen
                position={[2, 1, 0.05]}
                rotation={[0, 0, 0]}
                distanceFactor={0.2}
                className="phone-screen"
            >
                <div style={{
                    background: '#000',
                    padding: '20px',
                    borderRadius: '15px',
                    color: 'white',
                    textAlign: 'center'
                }}>
                    <div style={{ fontSize: '40px', marginBottom: '10px' }}><i className="fa-solid fa-mobile-screen-button"></i></div>
                    <h3>Mi App</h3>
                    <p style={{ fontSize: '12px', opacity: 0.8 }}>
                        Toca para explorar
                    </p>
                </div>
            </HtmlModelScreen>
        </Model>
    );
}

// EJEMPLO 4: Múltiples pantallas
function VariosDispositivos() {
    return (
        <>
            {/* Laptop */}
            <Model src="/models/laptop.glb" position={[-2, 0, 0]}>
                <HtmlModelScreen
                    position={[-2, 1.5, 0.1]}
                    rotation={[-0.2, 0, 0]}
                    distanceFactor={0.4}
                    className="laptop-screen"
                >
                    <div className="portfolio-content">
                        <h2>Laptop Screen</h2>
                        <p>Contenido para laptop</p>
                    </div>
                </HtmlModelScreen>
            </Model>

            {/* Phone */}
            <Model src="/models/phone.glb" position={[0, 0, 0]}>
                <HtmlModelScreen
                    position={[0, 1, 0.05]}
                    rotation={[0, 0, 0]}
                    distanceFactor={0.2}
                    className="phone-screen"
                >
                    <div className="app-content">
                        <h3>Phone Screen</h3>
                        <p>Contenido para phone</p>
                    </div>
                </HtmlModelScreen>
            </Model>

            {/* Tablet */}
            <Model src="/models/tablet.glb" position={[2, 0, 0]}>
                <HtmlModelScreen
                    position={[2, 1.2, 0.08]}
                    rotation={[-0.1, 0, 0]}
                    distanceFactor={0.3}
                    className="tablet-screen"
                >
                    <div className="tablet-content">
                        <h2>Tablet Screen</h2>
                        <p>Contenido para tablet</p>
                    </div>
                </HtmlModelScreen>
            </Model>
        </>
    );
}

// EJEMPLO 5: Con oclusión (se oculta detrás de objetos)
function ConOclusion() {
    return (
        <Model src="/models/laptop.glb" position={[0, 0, 0]}>
            <HtmlModelScreen
                position={[0, 1.5, 0.1]}
                rotation={[-0.2, 0, 0]}
                distanceFactor={0.4}
                occlude={true}  // Se oculta cuando está detrás de otros objetos
            >
                <div>Contenido con oclusión</div>
            </HtmlModelScreen>
        </Model>
    );
}

/**
 * PARÁMETROS IMPORTANTES:
 * 
 * position: [x, y, z]
 *   - Coordenadas 3D donde se posicionará el HTML
 *   - Debes ajustar según la ubicación de la pantalla en tu modelo
 * 
 * rotation: [x, y, z]
 *   - Rotación en radianes
 *   - Necesario para alinear el HTML con la pantalla del modelo
 * 
 * distanceFactor: number
 *   - Controla el tamaño del HTML
 *   - Valores más pequeños = HTML más pequeño
 *   - Típicamente entre 0.1 y 1.0
 * 
 * transform: boolean
 *   - true: El HTML rota y escala con el modelo 3D
 *   - false: El HTML siempre mira a la cámara (billboard)
 * 
 * occlude: boolean
 *   - true: El HTML se oculta cuando está detrás de objetos
 *   - false: Siempre visible
 * 
 * className: string
 *   - Clases CSS adicionales para estilos personalizados
 *   - Usa 'laptop-screen', 'phone-screen', 'tablet-screen' predefinidas
 * 
 * NUEVO PATRÓN DE COMPOSICIÓN:
 * 
 * Ahora HtmlModelScreen se usa como children de Model:
 * 
 * <Model src="/models/laptop.glb">
 *   <HtmlModelScreen position={[0, 1, 0]}>
 *     <div>Tu contenido aquí</div>
 *   </HtmlModelScreen>
 * </Model>
 * 
 * Esto hace el código más limpio y semántico, ya que el contenido HTML
 * está directamente asociado con su modelo 3D.
 */

export {
    EjemploBasico,
    LaptopConPortfolio,
    PhoneConApp,
    VariosDispositivos,
    ConOclusion
};
