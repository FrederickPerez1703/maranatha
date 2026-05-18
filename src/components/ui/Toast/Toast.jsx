import { useEffect } from 'react';
import { CheckCircle, XCircle, Info, X } from 'lucide-react';
import './Toast.css';

export default function Toast({ message, title, isVisible, onClose, type = 'success' }) {
    useEffect(() => {
        if (isVisible) {
            const timer = setTimeout(() => {
                onClose();
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [isVisible, onClose]);

    if (!isVisible) return null;

    const icons = {
        success: CheckCircle,
        error: XCircle,
        info: Info
    };

    const Icon = icons[type] || icons.success;

    return (
        <div className="toast-wrapper">
            <div className={`toast-container ${type}`}>
                {/* Progress bar */}
                <div className={`toast-progress ${type}`} />

                {/* Icon */}
                <div className={`toast-icon ${type}`}>
                    <Icon size={28} />
                </div>

                {/* Content */}
                <div className="toast-content">
                    <h4 className="toast-title">
                        {title || '¡Éxito!'}
                    </h4>
                    <p className="toast-message">
                        {message}
                    </p>
                </div>

                {/* Close button */}
                <button className="toast-close" onClick={onClose}>
                    <X size={18} />
                </button>
            </div>
        </div>
    );
}
