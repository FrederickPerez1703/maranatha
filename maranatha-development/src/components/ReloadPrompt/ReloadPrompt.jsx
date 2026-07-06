import React from 'react';
import { useRegisterSW } from 'virtual:pwa-register/react';
import './ReloadPrompt.css';

function ReloadPrompt() {
    const {
        offlineReady: [offlineReady, setOfflineReady],
        needRefresh: [needRefresh, setNeedRefresh],
        updateServiceWorker,
    } = useRegisterSW({
        onRegistered(r) {
            console.log('SW Registered: ' + r);
        },
        onRegisterError(error) {
            console.log('SW registration error', error);
        },
    });

    const close = () => {
        setOfflineReady(false);
        setNeedRefresh(false);
    };

    return (
        <div className="ReloadPrompt-container">
            {(offlineReady || needRefresh) && (
                <div className="ReloadPrompt-toast">
                    <div className="ReloadPrompt-message">
                        {offlineReady ? (
                            <span>¡La app está lista para trabajar sin conexión!</span>
                        ) : (
                            <span>
                                Hay una nueva actualización disponible. <br />
                                Haz clic para ver los cambios.
                            </span>
                        )}
                    </div>
                    {needRefresh && (
                        <button
                            className="ReloadPrompt-toast-button"
                            onClick={() => updateServiceWorker(true)}
                        >
                            Actualizar Ahora
                        </button>
                    )}
                    <button className="ReloadPrompt-toast-close" onClick={close}>
                        Cerrar
                    </button>
                </div>
            )}
        </div>
    );
}

export default ReloadPrompt;
