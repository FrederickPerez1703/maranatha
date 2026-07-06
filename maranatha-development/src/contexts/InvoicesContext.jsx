import { createContext, useContext, useState, useEffect } from 'react';
import { useNotifications } from './NotificationsContext';

const InvoicesContext = createContext();

export const useInvoices = () => {
    const context = useContext(InvoicesContext);
    if (!context) {
        throw new Error('useInvoices must be used within InvoicesProvider');
    }
    return context;
};

export const InvoicesProvider = ({ children }) => {
    const { pendingDeletions } = useNotifications();

    // Estado de facturas activas
    const [invoices, setInvoices] = useState(() => {
        const saved = localStorage.getItem('maranatha-invoices');
        return saved ? JSON.parse(saved) : [];
    });

    // Estado de historial de eliminadas
    const [deletedInvoices, setDeletedInvoices] = useState(() => {
        const saved = localStorage.getItem('maranatha-deleted-invoices');
        return saved ? JSON.parse(saved) : [];
    });

    // Fecha del último reinicio del total
    const [lastResetDate, setLastResetDate] = useState(() => {
        const saved = localStorage.getItem('maranatha-last-reset');
        return saved || new Date().toISOString();
    });

    // Persistencia
    useEffect(() => {
        localStorage.setItem('maranatha-invoices', JSON.stringify(invoices));
    }, [invoices]);

    useEffect(() => {
        localStorage.setItem('maranatha-deleted-invoices', JSON.stringify(deletedInvoices));
    }, [deletedInvoices]);

    useEffect(() => {
        localStorage.setItem('maranatha-last-reset', lastResetDate);
    }, [lastResetDate]);

    // Reiniciar total manualmente o automáticamente
    const resetTotal = (requestedBy = 'admin') => {
        const paidInvoices = invoices.filter(inv => inv.status === 'paid');
        if (paidInvoices.length > 0) {
            const newlyDeleted = paidInvoices.map(inv => ({
                ...inv,
                deletedAt: new Date().toISOString(),
                deleteComment: 'Reinicio del total generado (facturas pagadas archivadas)',
                deletedBy: requestedBy,
                approvedBy: 'Sistema/Admin',
                isResetArchive: true
            }));

            // Actualizar el historial primero
            setDeletedInvoices(prevDeleted => {
                const filteredNew = newlyDeleted.filter(newInv =>
                    !prevDeleted.some(prev => prev.id === newInv.id && prev.deletedAt === newInv.deletedAt)
                );
                const updatedHistory = [...filteredNew, ...prevDeleted];
                // Persistencia inmediata para garantizar que no se pierdan
                localStorage.setItem('maranatha-deleted-invoices', JSON.stringify(updatedHistory));
                return updatedHistory;
            });

            // Luego filtrar de facturas activas
            setInvoices(prevInvoices => {
                const updatedActive = prevInvoices.filter(inv => inv.status !== 'paid');
                localStorage.setItem('maranatha-invoices', JSON.stringify(updatedActive));
                return updatedActive;
            });
        }
        const newResetDate = new Date().toISOString();
        setLastResetDate(newResetDate);
        localStorage.setItem('maranatha-last-reset', newResetDate);
    };

    // Reinicio automático todos los domingos al iniciar la app
    useEffect(() => {
        const now = new Date();
        
        // Obtener el inicio del domingo de la semana actual en hora local
        const currentDay = now.getDay();
        const diffToSunday = now.getDate() - currentDay;
        const currentSunday = new Date(now);
        currentSunday.setDate(diffToSunday);
        currentSunday.setHours(0, 0, 0, 0);

        const lastReset = new Date(lastResetDate);

        // Si el último reinicio ocurrió antes del inicio de este domingo, se ejecuta el reinicio
        if (lastReset < currentSunday) {
            resetTotal('Sistema (Automático - Domingo)');
        }
    }, []);

    // Lógica para procesar eliminaciones aprobadas
    useEffect(() => {
        const approvedDeletions = pendingDeletions.filter(n =>
            n.type === 'invoice' && n.status === 'approved'
        );

        if (approvedDeletions.length === 0) return;

        approvedDeletions.forEach(notification => {
            // Verificar si la factura aún existe en activas (para evitar doble procesamiento)
            const invoiceExists = invoices.some(inv => inv.id === notification.itemId);

            if (invoiceExists) {
                const invoiceToDelete = invoices.find(inv => inv.id === notification.itemId);

                // Agregar al historial
                const deletedInvoice = {
                    ...invoiceToDelete,
                    deletedAt: new Date().toISOString(),
                    deleteComment: notification.reason,
                    deletedBy: notification.requestedBy,
                    approvedBy: 'admin' // Idealmente vendría de la notificación
                };

                setDeletedInvoices(prev => {
                    // Evitar duplicados por Strict Mode o doble procesamiento
                    if (prev.some(inv => inv.id === deletedInvoice.id && inv.deletedAt === deletedInvoice.deletedAt)) {
                        return prev;
                    }
                    return [deletedInvoice, ...prev];
                });

                // Eliminar de activas
                setInvoices(prev => prev.filter(inv => inv.id !== notification.itemId));
            }
        });
    }, [pendingDeletions, invoices]);

    // Funciones auxiliares
    const addInvoice = (invoice) => {
        setInvoices(prev => [{ ...invoice, createdAt: new Date().toISOString() }, ...prev]);
    };

    const updateInvoice = (updatedInvoice) => {
        setInvoices(prev => prev.map(inv =>
            inv.id === updatedInvoice.id ? updatedInvoice : inv
        ));
    };

    const toggleInvoiceStatus = (invoiceId) => {
        setInvoices(prev => prev.map(inv => {
            if (inv.id === invoiceId) {
                const newStatus = inv.status === 'paid' ? 'pending' : 'paid';
                return { ...inv, status: newStatus };
            }
            return inv;
        }));
    };

    // Facturas pagadas desde el último reinicio (para el total generado)
    const weeklyPaidInvoices = invoices.filter(inv => inv.status === 'paid');

    const value = {
        invoices,
        deletedInvoices,
        addInvoice,
        updateInvoice,
        toggleInvoiceStatus,
        resetTotal,
        weeklyPaidInvoices,
        lastResetDate,
        setInvoices // Por si se necesita acceso directo
    };

    return (
        <InvoicesContext.Provider value={value}>
            {children}
        </InvoicesContext.Provider>
    );
};
