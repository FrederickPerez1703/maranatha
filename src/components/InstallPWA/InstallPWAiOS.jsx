import { useState, useEffect } from 'react';
import './InstallPWAiOS.css';

const InstallPWAiOS = () => {
    const [showBanner, setShowBanner] = useState(false);
    const [isIOS, setIsIOS] = useState(false);
    const [isInstalled, setIsInstalled] = useState(false);

    useEffect(() => {
        // Detectar si es iOS
        const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
        setIsIOS(iOS);

        // Detectar si ya está instalada (modo standalone)
        const standalone = window.navigator.standalone === true;
        setIsInstalled(standalone);

        // Verificar si el banner fue cerrado
        const dismissed = localStorage.getItem('pwa-ios-dismissed');

        // Mostrar banner solo si:
        // 1. Es iOS
        // 2. No está instalada
        // 3. No fue cerrado anteriormente
        if (iOS && !standalone && !dismissed) {
            // Esperar 3 segundos antes de mostrar
            setTimeout(() => {
                setShowBanner(true);
            }, 3000);
        }
    }, []);

    const handleDismiss = () => {
        setShowBanner(false);
        localStorage.setItem('pwa-ios-dismissed', 'true');
    };

    if (!isIOS || isInstalled || !showBanner) {
        return null;
    }

    return (
        <div className="install-pwa-ios-banner">
            <div className="install-pwa-ios-content">
                <button onClick={handleDismiss} className="install-pwa-ios-close">
                    ✕
                </button>

                <div className="install-pwa-ios-icon">📱</div>

                <h3>Instalar Maranatha</h3>
                <p>Instala nuestra app en tu iPhone para acceso rápido</p>

                <div className="install-pwa-ios-steps">
                    <div className="install-step">
                        <span className="step-number">1</span>
                        <p>Toca el botón <strong>Compartir</strong> <span className="share-icon">□↑</span></p>
                    </div>
                    <div className="install-step">
                        <span className="step-number">2</span>
                        <p>Selecciona <strong>"Agregar a pantalla de inicio"</strong></p>
                    </div>
                    <div className="install-step">
                        <span className="step-number">3</span>
                        <p>Toca <strong>"Agregar"</strong></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InstallPWAiOS;
