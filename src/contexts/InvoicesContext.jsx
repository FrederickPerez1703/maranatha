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

    // Persistencia
    useEffect(() => {
        localStorage.setItem('maranatha-invoices', JSON.stringify(invoices));
    }, [invoices]);

    useEffect(() => {
        localStorage.setItem('maranatha-deleted-invoices', JSON.stringify(deletedInvoices));
    }, [deletedInvoices]);

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

                setDeletedInvoices(prev => [deletedInvoice, ...prev]);

                // Eliminar de activas
                setInvoices(prev => prev.filter(inv => inv.id !== notification.itemId));
            }
        });
    }, [pendingDeletions, invoices]);

    // Funciones auxiliares
    const addInvoice = (invoice) => {
        setInvoices(prev => [invoice, ...prev]);
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

    const value = {
        invoices,
        deletedInvoices,
        addInvoice,
        updateInvoice,
        toggleInvoiceStatus,
        setInvoices // Por si se necesita acceso directo
    };

    return (
        <InvoicesContext.Provider value={value}>
            {children}
        </InvoicesContext.Provider>
    );
};
