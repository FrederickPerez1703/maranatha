import { AlertCircle, Lock, Info, CheckCircle, XCircle } from 'lucide-react';
import './Alert.css';

const Alert = ({
    type = 'info', // 'info', 'success', 'warning', 'error', 'permission'
    title,
    message,
    icon: CustomIcon
}) => {
    const typeConfig = {
        info: {
            icon: Info,
            label: 'Información'
        },
        success: {
            icon: CheckCircle,
            label: 'Éxito'
        },
        warning: {
            icon: AlertCircle,
            label: 'Advertencia'
        },
        error: {
            icon: XCircle,
            label: 'Error'
        },
        permission: {
            icon: Lock,
            label: 'Acceso Restringido'
        }
    };

    const config = typeConfig[type];
    const Icon = CustomIcon || config.icon;

    return (
        <div className="alert-page">
            <div className="alert-container">
                {/* Decoración de fondo */}
                <div className={`alert-top-bar ${type}`} />

                {/* Icono */}
                <div className={`alert-icon-wrapper ${type}`}>
                    <div className={`alert-icon-border ${type}`} />
                    <Icon size={50} strokeWidth={2} />
                </div>

                {/* Título */}
                {title && (
                    <h3 className="alert-title">{title}</h3>
                )}

                {/* Mensaje */}
                <p className="alert-message">{message}</p>

                {/* Decoración inferior */}
                <div className="alert-footer">
                    <div className={`alert-badge ${type}`}>
                        <Icon size={16} />
                        <span>{config.label}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Alert;
