import { AlertTriangle, X, LogOut, Trash2, CheckCircle } from 'lucide-react';
import './ConfirmationModal.css';

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
            iconColor: 'var(--color-warning)',
            iconClass: 'icon-warning',
            btnClass: 'btn-warning'
        },
        danger: {
            icon: Trash2,
            iconColor: 'var(--color-danger)',
            iconClass: 'icon-danger',
            btnClass: 'btn-danger'
        },
        logout: {
            icon: LogOut,
            iconColor: 'var(--color-primary)',
            iconClass: 'icon-logout',
            btnClass: 'btn-primary'
        },
        success: {
            icon: CheckCircle,
            iconColor: 'var(--color-success)',
            iconClass: 'icon-success',
            btnClass: 'btn-success'
        }
    };

    const config = typeConfig[type];
    const Icon = config.icon;

    return (
        <div className="confirmation-modal-overlay" onClick={onClose}>
            <div
                className="confirmation-modal-content"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Botón de cerrar */}
                <button className="confirmation-modal-close" onClick={onClose}>
                    <X size={18} strokeWidth={2.5} />
                </button>

                {/* Contenido */}
                <div className="confirmation-modal-body">
                    {/* Icono */}
                    <div className={`confirmation-modal-icon ${config.iconClass}`}>
                        <Icon size={45} color={config.iconColor} strokeWidth={2} />
                    </div>

                    {/* Título */}
                    <h3 className="confirmation-modal-title">{title}</h3>

                    {/* Mensaje */}
                    <p className="confirmation-modal-message">{message}</p>

                    {/* Botones */}
                    <div className={`confirmation-modal-actions ${showCancel ? 'has-cancel' : ''}`}>
                        {showCancel && (
                            <button
                                className="btn btn-lg btn-outline-gray"
                                onClick={onClose}
                            >
                                {cancelText}
                            </button>
                        )}

                        <button
                            className={`btn btn-lg ${config.btnClass}`}
                            onClick={() => {
                                if (onConfirm) onConfirm();
                                onClose();
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