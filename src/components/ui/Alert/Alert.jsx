import { AlertCircle, Lock, Info, CheckCircle, XCircle } from 'lucide-react';

const Alert = ({
    type = 'info', // 'info', 'success', 'warning', 'error', 'permission'
    title,
    message,
    icon: CustomIcon
}) => {
    const typeConfig = {
        info: {
            icon: Info,
            gradient: 'linear-gradient(135deg, #3b82f6, #60a5fa)',
            bgGradient: 'linear-gradient(135deg, #dbeafe, #bfdbfe)',
            iconColor: '#3b82f6',
            borderColor: '#93c5fd'
        },
        success: {
            icon: CheckCircle,
            gradient: 'linear-gradient(135deg, #10b981, #34d399)',
            bgGradient: 'linear-gradient(135deg, #d1fae5, #a7f3d0)',
            iconColor: '#10b981',
            borderColor: '#6ee7b7'
        },
        warning: {
            icon: AlertCircle,
            gradient: 'linear-gradient(135deg, #f59e0b, #fbbf24)',
            bgGradient: 'linear-gradient(135deg, #fef3c7, #fde68a)',
            iconColor: '#f59e0b',
            borderColor: '#fcd34d'
        },
        error: {
            icon: XCircle,
            gradient: 'linear-gradient(135deg, #ef4444, #f87171)',
            bgGradient: 'linear-gradient(135deg, #fee2e2, #fecaca)',
            iconColor: '#ef4444',
            borderColor: '#fca5a5'
        },
        permission: {
            icon: Lock,
            gradient: 'linear-gradient(135deg, #8b5cf6, #a78bfa)',
            bgGradient: 'linear-gradient(135deg, #ede9fe, #ddd6fe)',
            iconColor: '#8b5cf6',
            borderColor: '#c4b5fd'
        }
    };

    const config = typeConfig[type];
    const Icon = CustomIcon || config.icon;

    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '40px 20px',
            minHeight: '300px'
        }}>
            <style>{`
                @keyframes slideInBounce {
                    0% {
                        opacity: 0;
                        transform: translateY(-20px) scale(0.95);
                    }
                    50% {
                        transform: translateY(5px) scale(1.02);
                    }
                    100% {
                        opacity: 1;
                        transform: translateY(0) scale(1);
                    }
                }

                @keyframes iconFloat {
                    0%, 100% {
                        transform: translateY(0px);
                    }
                    50% {
                        transform: translateY(-8px);
                    }
                }

                .alert-icon {
                    animation: iconFloat 3s ease-in-out infinite;
                }

                @media (max-width: 768px) {
                    .alert-container {
                        max-width: 95% !important;
                        padding: 35px 25px !important;
                    }
                }
            `}</style>

            <div
                className="alert-container"
                style={{
                    background: 'white',
                    borderRadius: '24px',
                    padding: '45px 40px',
                    maxWidth: '500px',
                    width: '100%',
                    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.12), 0 0 0 1px rgba(0, 0, 0, 0.05)',
                    animation: 'slideInBounce 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
                    textAlign: 'center',
                    position: 'relative',
                    overflow: 'hidden'
                }}
            >
                {/* Decoración de fondo */}
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '6px',
                    background: config.gradient
                }} />

                {/* Icono */}
                <div
                    className="alert-icon"
                    style={{
                        width: '100px',
                        height: '100px',
                        margin: '0 auto 25px',
                        borderRadius: '50%',
                        background: config.bgGradient,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: `0 10px 40px ${config.iconColor}30`,
                        position: 'relative'
                    }}
                >
                    <div style={{
                        position: 'absolute',
                        inset: 0,
                        borderRadius: '50%',
                        border: `3px solid ${config.borderColor}`,
                        opacity: 0.3
                    }} />
                    <Icon size={50} color={config.iconColor} strokeWidth={2} />
                </div>

                {/* Título */}
                {title && (
                    <h3 style={{
                        fontSize: '24px',
                        fontWeight: '700',
                        color: '#1f2937',
                        margin: '0 0 12px 0',
                        letterSpacing: '-0.5px',
                        lineHeight: '1.2'
                    }}>
                        {title}
                    </h3>
                )}

                {/* Mensaje */}
                <p style={{
                    fontSize: '16px',
                    color: '#6b7280',
                    lineHeight: '1.6',
                    margin: 0,
                    fontWeight: '400'
                }}>
                    {message}
                </p>

                {/* Decoración inferior */}
                <div style={{
                    marginTop: '30px',
                    paddingTop: '25px',
                    borderTop: '1px solid #f3f4f6'
                }}>
                    <div style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '8px 16px',
                        borderRadius: '12px',
                        background: config.bgGradient,
                        fontSize: '13px',
                        fontWeight: '600',
                        color: config.iconColor
                    }}>
                        <Icon size={16} />
                        <span>
                            {type === 'permission' ? 'Acceso Restringido' :
                                type === 'error' ? 'Error' :
                                    type === 'warning' ? 'Advertencia' :
                                        type === 'success' ? 'Éxito' : 'Información'}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Alert;
