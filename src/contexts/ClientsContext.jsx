import { createContext, useContext, useState, useEffect } from 'react';

const ClientsContext = createContext();

export const useClients = () => {
    const context = useContext(ClientsContext);
    if (!context) {
        throw new Error('useClients must be used within a ClientsProvider');
    }
    return context;
};

export const ClientsProvider = ({ children }) => {
    const [clients, setClients] = useState(() => {
        try {
            const savedClients = localStorage.getItem('salonClients');
            return savedClients ? JSON.parse(savedClients) : [];
        } catch (error) {
            console.error('Error loading clients:', error);
            return [];
        }
    });

    // Guardar en localStorage cuando cambian los clientes
    useEffect(() => {
        try {
            localStorage.setItem('salonClients', JSON.stringify(clients));
        } catch (error) {
            console.error('Error saving clients:', error);
        }
    }, [clients]);

    // Sincronizar entre pestañas
    useEffect(() => {
        const handleStorageChange = (e) => {
            if (e.key === 'salonClients') {
                try {
                    const newClients = JSON.parse(e.newValue);
                    setClients(newClients || []);
                } catch (error) {
                    console.error('Error syncing clients:', error);
                }
            }
        };

        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    // Buscar cliente por teléfono
    const getClientByPhone = (phone) => {
        // Normalizar teléfono para búsqueda (eliminar espacios, guiones, etc si es necesario)
        // Por ahora búsqueda exacta o parcial simple
        return clients.find(c => c.phone === phone);
    };

    // Agregar nuevo cliente
    const addClient = (clientData) => {
        const isVip = (clientData.points || 0) > 5;

        const newClient = {
            id: `client-${Date.now()}`,
            ...clientData,
            points: clientData.points || 0,
            isVip: isVip,
            history: clientData.history || [], // Historial de puntos/citas
            createdAt: new Date().toISOString(),
            lastVisit: new Date().toISOString()
        };

        setClients(prev => [...prev, newClient]);
        return newClient;
    };

    // Actualizar cliente
    const updateClient = (clientId, updatedData) => {
        setClients(prev => prev.map(client => {
            if (client.id === clientId) {
                // Recalcular VIP si cambian los puntos
                const newPoints = updatedData.points !== undefined ? updatedData.points : client.points;
                const isVip = newPoints > 5;

                return {
                    ...client,
                    ...updatedData,
                    points: newPoints,
                    isVip: isVip,
                    updatedAt: new Date().toISOString()
                };
            }
            return client;
        }));
    };

    // Eliminar cliente
    const deleteClient = (clientId) => {
        setClients(prev => prev.filter(c => c.id !== clientId));
    };

    // Agregar puntos a un cliente
    const addPoints = (clientId, amount, reason = 'Cita') => {
        setClients(prev => prev.map(client => {
            if (client.id === clientId) {
                const newPoints = (client.points || 0) + amount;
                const isNowVip = newPoints > 5;

                // Agregar entrada al historial
                const newHistoryEntry = {
                    date: new Date().toISOString(),
                    action: reason,
                    pointsAdded: amount,
                    totalPoints: newPoints
                };

                return {
                    ...client,
                    points: newPoints,
                    isVip: isNowVip,
                    lastVisit: new Date().toISOString(),
                    history: [...(client.history || []), newHistoryEntry]
                };
            }
            return client;
        }));
    };

    const value = {
        clients,
        addClient,
        updateClient,
        deleteClient,
        addPoints,
        getClientByPhone
    };

    return (
        <ClientsContext.Provider value={value}>
            {children}
        </ClientsContext.Provider>
    );
};
