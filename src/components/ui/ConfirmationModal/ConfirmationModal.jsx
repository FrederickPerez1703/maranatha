import { AlertTriangle, X, LogOut, Trash2, CheckCircle } from 'lucide-react';

const ConfirmationModal = ({
    isOpen,
    onClose,
    onConfirm,
    title,
    message,
    type = 'warning', // 'warning', 'danger', 'logout', 'success'
    confirmText = 'Confirmar',
    cancelText = 'Cancelar',
    showCancel = true
}) => {
    if (!isOpen) return null;

    const typeConfig = {
        warning: {
            icon: AlertTriangle,
            iconColor: '#f59e0b',
            iconBg: 'linear-gradient(135deg, #fef3c7, #fde68a)',
            confirmBg: 'linear-gradient(135deg, #f59e0b, #fbbf24)',
            confirmShadow: 'rgba(245, 158, 11, 0.4)'
        },
        danger: {
            icon: Trash2,
            iconColor: '#ef4444',
            iconBg: 'linear-gradient(135deg, #fee2e2, #fecaca)',
            confirmBg: 'linear-gradient(135deg, #ef4444, #f87171)',
            confirmShadow: 'rgba(239, 68, 68, 0.4)'
        },
        logout: {
            icon: LogOut,
            iconColor: '#ff6b9d',
            iconBg: 'linear-gradient(135deg, #fce7f3, #fbcfe8)',
            confirmBg: 'linear-gradient(135deg, #ff6b9d, #ff8fab)',
            confirmShadow: 'rgba(255, 107, 157, 0.4)'
        },
        success: {
            icon: CheckCircle,
            iconColor: '#10b981',
            iconBg: 'linear-gradient(135deg, #d1fae5, #a7f3d0)',
            confirmBg: 'linear-gradient(135deg, #10b981, #34d399)',
            confirmShadow: 'rgba(16, 185, 129, 0.4)'
        }
    };

    const config = typeConfig[type];
    const Icon = config.icon;

    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'rgba(0, 0, 0, 0.5)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 2000,
                animation: 'fadeIn 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                padding: '20px'
            }}
            onClick={onClose}
        >
            <style>{`
                @keyframes fadeIn {
                    from { 
                        opacity: 0;
                    }
                    to { 
                        opacity: 1;
                    }
                }
                
                @keyframes slideUp {
                    from { 
                        opacity: 0;
                        transform: translateY(30px) scale(0.9);
                    }
                    to { 
                        opacity: 1;
                        transform: translateY(0) scale(1);
                    }
                }

                @keyframes iconPulse {
                    0%, 100% {
                        transform: scale(1);
                    }
                    50% {
                        transform: scale(1.05);
                    }
                }

                .modal-icon {
                    animation: iconPulse 2s ease-in-out infinite;
                }

                /* Responsive */
                @media (max-width: 480px) {
                    .confirmation-modal-content {
                        width: 95% !important;
                        max-width: 95% !important;
                    }
                }
            `}</style>

            <div
                className="confirmation-modal-content"
                style={{
                    background: 'white',
                    borderRadius: '28px',
                    width: '90%',
                    maxWidth: '440px',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(0, 0, 0, 0.05)',
                    animation: 'slideUp 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
                    overflow: 'hidden',
                    position: 'relative'
                }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Botón de cerrar */}
                <button
                    onClick={onClose}
                    style={{
                        position: 'absolute',
                        top: '20px',
                        right: '20px',
                        background: 'rgba(0, 0, 0, 0.05)',
                        border: 'none',
                        borderRadius: '12px',
                        width: '36px',
                        height: '36px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        color: '#6b7280',
                        zIndex: 10
                    }}
                    onMouseOver={(e) => {
                        e.currentTarget.style.background = 'rgba(0, 0, 0, 0.1)';
                        e.currentTarget.style.transform = 'rotate(90deg)';
                    }}
                    onMouseOut={(e) => {
                        e.currentTarget.style.background = 'rgba(0, 0, 0, 0.05)';
                        e.currentTarget.style.transform = 'rotate(0deg)';
                    }}
                >
                    <X size={18} strokeWidth={2.5} />
                </button>

                {/* Contenido */}
                <div style={{
                    padding: '50px 40px 40px',
                    textAlign: 'center'
                }}>
                    {/* Icono */}
                    <div
                        className="modal-icon"
                        style={{
                            width: '90px',
                            height: '90px',
                            margin: '0 auto 25px',
                            borderRadius: '50%',
                            background: config.iconBg,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: `0 10px 40px ${config.confirmShadow}`,
                            position: 'relative'
                        }}
                    >
                        <div style={{
                            position: 'absolute',
                            inset: 0,
                            borderRadius: '50%',
                            background: 'white',
                            opacity: 0.3
                        }} />
                        <Icon size={45} color={config.iconColor} strokeWidth={2} />
                    </div>

                    {/* Título */}
                    <h3 style={{
                        fontSize: '26px',
                        fontWeight: '700',
                        color: '#1f2937',
                        margin: '0 0 12px 0',
                        letterSpacing: '-0.5px',
                        lineHeight: '1.2'
                    }}>
                        {title}
                    </h3>

                    {/* Mensaje */}
                    <p style={{
                        fontSize: '16px',
                        color: '#6b7280',
                        lineHeight: '1.6',
                        margin: '0 0 35px 0',
                        fontWeight: '400'
                    }}>
                        {message}
                    </p>

                    {/* Botones */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: showCancel ? '1fr 1fr' : '1fr',
                        gap: '12px'
                    }}>
                        {showCancel && (
                            <button
                                onClick={onClose}
                                style={{
                                    padding: '16px 24px',
                                    borderRadius: '16px',
                                    border: '2px solid #e5e7eb',
                                    background: 'white',
                                    color: '#6b7280',
                                    fontSize: '15px',
                                    fontWeight: '600',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s ease',
                                    outline: 'none'
                                }}
                                onMouseOver={(e) => {
                                    e.currentTarget.style.background = '#f9fafb';
                                    e.currentTarget.style.borderColor = '#d1d5db';
                                    e.currentTarget.style.transform = 'translateY(-1px)';
                                }}
                                onMouseOut={(e) => {
                                    e.currentTarget.style.background = 'white';
                                    e.currentTarget.style.borderColor = '#e5e7eb';
                                    e.currentTarget.style.transform = 'translateY(0)';
                                }}
                            >
                                {cancelText}
                            </button>
                        )}

                        <button
                            onClick={() => {
                                if (onConfirm) onConfirm();
                                onClose();
                            }}
                            style={{
                                padding: '16px 24px',
                                borderRadius: '16px',
                                border: 'none',
                                background: config.confirmBg,
                                color: 'white',
                                fontSize: '15px',
                                fontWeight: '600',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease',
                                boxShadow: `0 4px 14px ${config.confirmShadow}`,
                                outline: 'none'
                            }}
                            onMouseOver={(e) => {
                                e.currentTarget.style.transform = 'translateY(-2px)';
                                e.currentTarget.style.boxShadow = `0 8px 24px ${config.confirmShadow}`;
                            }}
                            onMouseOut={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = `0 4px 14px ${config.confirmShadow}`;
                            }}
                        >
                            {confirmText}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;