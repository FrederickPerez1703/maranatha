import React, { useEffect } from 'react';
import { CheckCircle, X } from 'lucide-react';

export default function Toast({ message, title, isVisible, onClose, type = 'success' }) {
    useEffect(() => {
        if (isVisible) {
            const timer = setTimeout(() => {
                onClose();
            }, 5000); // Auto-cerrar después de 5 segundos

            return () => clearTimeout(timer);
        }
    }, [isVisible, onClose]);

    if (!isVisible) return null;

    const colors = {
        success: {
            bg: 'linear-gradient(135deg, #10b981, #059669)',
            border: '#10b981',
            icon: '#10b981'
        },
        error: {
            bg: 'linear-gradient(135deg, #ef4444, #dc2626)',
            border: '#ef4444',
            icon: '#ef4444'
        },
        info: {
            bg: 'linear-gradient(135deg, #3b82f6, #2563eb)',
            border: '#3b82f6',
            icon: '#3b82f6'
        }
    };

    const currentColor = colors[type] || colors.success;

    return (
        <div style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            zIndex: 99999,
            animation: 'slideInRight 0.4s ease-out, fadeIn 0.4s ease-out',
            maxWidth: '400px'
        }}>
            <div style={{
                background: 'white',
                borderRadius: '16px',
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                padding: '20px',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '16px',
                border: `2px solid ${currentColor.border}`,
                position: 'relative',
                overflow: 'hidden'
            }}>
                {/* Barra de progreso */}
                <div style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    height: '4px',
                    background: currentColor.bg,
                    animation: 'progress 5s linear',
                    borderRadius: '0 0 0 16px'
                }} />

                {/* Icono */}
                <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '12px',
                    background: currentColor.bg,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    boxShadow: `0 4px 12px ${currentColor.border}40`
                }}>
                    <CheckCircle size={28} color="white" />
                </div>

                {/* Contenido */}
                <div style={{ flex: 1, paddingTop: '4px' }}>
                    <h4 style={{
                        margin: 0,
                        fontSize: '16px',
                        fontWeight: '700',
                        color: '#1f2937',
                        marginBottom: '4px'
                    }}>
                        {title || '¡Cita Enviada con Éxito!'}
                    </h4>
                    <p style={{
                        margin: 0,
                        fontSize: '14px',
                        color: '#6b7280',
                        lineHeight: '1.5'
                    }}>
                        {message}
                    </p>
                </div>

                {/* Botón cerrar */}
                <button
                    onClick={onClose}
                    style={{
                        background: 'rgba(0, 0, 0, 0.05)',
                        border: 'none',
                        borderRadius: '8px',
                        width: '32px',
                        height: '32px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        flexShrink: 0
                    }}
                    onMouseOver={(e) => {
                        e.target.style.background = 'rgba(0, 0, 0, 0.1)';
                    }}
                    onMouseOut={(e) => {
                        e.target.style.background = 'rgba(0, 0, 0, 0.05)';
                    }}
                >
                    <X size={18} color="#6b7280" />
                </button>
            </div>

            <style>{`
        @keyframes slideInRight {
          from {
            transform: translateX(400px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes progress {
          from {
            width: 100%;
          }
          to {
            width: 0%;
          }
        }
      `}</style>
        </div>
    );
}
