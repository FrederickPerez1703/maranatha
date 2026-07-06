import { useState, useEffect } from 'react';
import './InstallPWA.css';

const InstallPWA = () => {
    const [deferredPrompt, setDeferredPrompt] = useState(null);
    const [showInstallBanner, setShowInstallBanner] = useState(false);
    const [isInstalled, setIsInstalled] = useState(false);

    // Verificar si la app ya está instalada
    useEffect(() => {
        // Detectar si la app está corriendo en modo standalone (instalada)
        const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
        const isIOSStandalone = window.navigator.standalone === true;

        setIsInstalled(isStandalone || isIOSStandalone);
    }, []);

    useEffect(() => {
        const handler = (e) => {
            // Prevenir que el mini-infobar aparezca en móvil
            e.preventDefault();
            // Guardar el evento para poder dispararlo después
            setDeferredPrompt(e);

            // Verificar si el banner fue cerrado recientemente
            const dismissedData = localStorage.getItem('pwa-install-dismissed');
            if (dismissedData) {
                const { timestamp } = JSON.parse(dismissedData);
                const daysSinceDismissed = (Date.now() - timestamp) / (1000 * 60 * 60 * 24);

                // Mostrar el banner de nuevo después de 7 días
                if (daysSinceDismissed < 7) {
                    return;
                }
            }

            // Mostrar nuestro banner de instalación si la app no está instalada
            if (!isInstalled) {
                setShowInstallBanner(true);
            }
        };

        window.addEventListener('beforeinstallprompt', handler);

        return () => window.removeEventListener('beforeinstallprompt', handler);
    }, [isInstalled]);

    const handleInstallClick = async () => {
        if (!deferredPrompt) {
            return;
        }

        // Mostrar el prompt de instalación
        deferredPrompt.prompt();

        // Esperar a que el usuario responda al prompt
        const { outcome } = await deferredPrompt.userChoice;

        if (outcome === 'accepted') {
            console.log('Usuario aceptó la instalación');
            // Limpiar el localStorage cuando se instala
            localStorage.removeItem('pwa-install-dismissed');
            setIsInstalled(true);
        } else {
            console.log('Usuario rechazó la instalación');
        }

        // Limpiar el prompt
        setDeferredPrompt(null);
        setShowInstallBanner(false);
    };

    const handleDismiss = () => {
        setShowInstallBanner(false);
        // Guardar timestamp de cuando se cerró el banner
        const dismissData = {
            timestamp: Date.now(),
            dismissed: true
        };
        localStorage.setItem('pwa-install-dismissed', JSON.stringify(dismissData));
    };

    // No mostrar el banner si la app ya está instalada
    if (isInstalled || !showInstallBanner) {
        return null;
    }

    return (
        <div className="install-pwa-banner">
            <div className="install-pwa-content">
                <div className="install-pwa-icon">📱</div>
                <div className="install-pwa-text">
                    <h3>Instalar Maranatha</h3>
                    <p>Instala nuestra app para un acceso rápido y experiencia mejorada</p>
                </div>
                <div className="install-pwa-actions">
                    <button onClick={handleInstallClick} className="install-pwa-button">
                        Instalar
                    </button>
                    <button onClick={handleDismiss} className="install-pwa-dismiss">
                        ✕
                    </button>
                </div>
            </div>
        </div>
    );
};

export default InstallPWA;
