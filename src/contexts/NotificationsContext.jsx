import { createContext, useContext, useState } from 'react';

const NotificationsContext = createContext();

export const useNotifications = () => {
    const context = useContext(NotificationsContext);
    if (!context) {
        throw new Error('useNotifications must be used within NotificationsProvider');
    }
    return context;
};

export const NotificationsProvider = ({ children }) => {
    const [pendingDeletions, setPendingDeletions] = useState([]);

    // Crear una nueva solicitud de eliminación
    const requestDeletion = (type, itemId, itemName, requestedBy, reason) => {
        const newNotification = {
            id: Date.now(),
            type,
            itemId,
            itemName,
            requestedBy,
            requestedAt: new Date().toISOString(),
            reason,
            status: 'pending'
        };

        setPendingDeletions(prev => [...prev, newNotification]);
        return newNotification.id;
    };

    // Aprobar una eliminación
    const approveDeletion = (notificationId) => {
        setPendingDeletions(prev =>
            prev.map(n =>
                n.id === notificationId ? { ...n, status: 'approved' } : n
            )
        );

        // Retornar la notificación aprobada
        const notification = pendingDeletions.find(n => n.id === notificationId);

        // Eliminar la notificación después de 2 segundos
        setTimeout(() => {
            setPendingDeletions(prev => prev.filter(n => n.id !== notificationId));
        }, 2000);

        return notification;
    };

    // Rechazar una eliminación
    const rejectDeletion = (notificationId) => {
        setPendingDeletions(prev =>
            prev.map(n =>
                n.id === notificationId ? { ...n, status: 'rejected' } : n
            )
        );

        // Eliminar la notificación después de 2 segundos
        setTimeout(() => {
            setPendingDeletions(prev => prev.filter(n => n.id !== notificationId));
        }, 2000);
    };

    // Verificar si una eliminación está aprobada
    const isDeletionApproved = (notificationId) => {
        const notification = pendingDeletions.find(n => n.id === notificationId);
        return notification?.status === 'approved';
    };

    // Verificar si hay una solicitud pendiente para un item
    const hasPendingDeletion = (itemId) => {
        return pendingDeletions.some(n => n.itemId === itemId && n.status === 'pending');
    };

    // Obtener el conteo de notificaciones pendientes
    const getPendingCount = () => {
        return pendingDeletions.filter(n => n.status === 'pending').length;
    };

    const value = {
        pendingDeletions,
        requestDeletion,
        approveDeletion,
        rejectDeletion,
        isDeletionApproved,
        hasPendingDeletion,
        getPendingCount
    };

    return (
        <NotificationsContext.Provider value={value}>
            {children}
        </NotificationsContext.Provider>
    );
};
