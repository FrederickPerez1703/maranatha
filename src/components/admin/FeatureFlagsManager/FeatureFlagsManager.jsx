import React from 'react';
import { useFeatureFlags } from '../../../contexts/FeatureFlagsContext';
import { ToggleLeft, ToggleRight, Layers, Map, Calendar, Zap } from 'lucide-react';

export default function FeatureFlagsManager() {
    const { features, toggleFeature } = useFeatureFlags();

    const featureDefinitions = [
        {
            key: 'LOCATION_SECTION',
            label: 'Sección de Ubicación',
            description: 'Muestra el mapa de Google y las reseñas en la página principal.',
            icon: <Map size={24} color="#ff6b9d" />
        },
        {
            key: 'EVENTS_SECTION',
            label: 'Sección de Eventos',
            description: 'Muestra el listado de talleres, ofertas y rifas.',
            icon: <Calendar size={24} color="#a855f7" />
        }
        // Add more features here as defined in config
    ];

    return (
        <div className="admin-section">
            <div style={{ marginBottom: '2rem' }}>
                <h2>Gestión de Funcionalidades</h2>
                <p style={{ color: '#666' }}>Activa o desactiva secciones enteras de la aplicación en tiempo real.</p>
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
                gap: '20px'
            }}>
                {featureDefinitions.map(def => {
                    const isActive = features[def.key];
                    return (
                        <div key={def.key} style={{
                            background: 'white',
                            padding: '20px',
                            borderRadius: '16px',
                            boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            border: isActive ? '1px solid #ff6b9d' : '1px solid transparent',
                            opacity: isActive ? 1 : 0.8
                        }}>
                            <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                                <div style={{
                                    padding: '12px',
                                    background: isActive ? 'rgba(255, 107, 157, 0.1)' : '#f3f4f6',
                                    borderRadius: '12px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    {def.icon || <Layers size={24} />}
                                </div>
                                <div>
                                    <h3 style={{ margin: '0 0 5px 0', fontSize: '1.1rem' }}>{def.label}</h3>
                                    <p style={{ margin: 0, fontSize: '0.85rem', color: '#666', lineHeight: '1.4' }}>{def.description}</p>
                                </div>
                            </div>

                            <button
                                onClick={() => toggleFeature(def.key)}
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    padding: '5px'
                                }}
                            >
                                {isActive ? (
                                    <ToggleRight size={48} color="#ff6b9d" style={{ transition: 'all 0.3s' }} />
                                ) : (
                                    <ToggleLeft size={48} color="#ccc" style={{ transition: 'all 0.3s' }} />
                                )}
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
