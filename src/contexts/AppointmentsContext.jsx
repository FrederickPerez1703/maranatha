import { createContext, useContext, useState, useEffect } from 'react';

const AppointmentsContext = createContext();

export const useAppointments = () => {
    const context = useContext(AppointmentsContext);
    if (!context) {
        throw new Error('useAppointments must be used within a AppointmentsProvider');
    }
    return context;
};

export const AppointmentsProvider = ({ children }) => {
    const [appointments, setAppointments] = useState(() => {
        try {
            const saved = localStorage.getItem('salonAppointments');
            return saved ? JSON.parse(saved) : [];
        } catch (error) {
            console.error('Error loading appointments:', error);
            return [];
        }
    });

    // Persistencia
    useEffect(() => {
        try {
            localStorage.setItem('salonAppointments', JSON.stringify(appointments));
        } catch (error) {
            console.error('Error saving appointments:', error);
        }
    }, [appointments]);

    // Sincronización entre pestañas
    useEffect(() => {
        const handleStorageChange = (e) => {
            if (e.key === 'salonAppointments') {
                try {
                    const newAppointments = JSON.parse(e.newValue);
                    setAppointments(newAppointments || []);
                } catch (error) {
                    console.error('Error syncing appointments:', error);
                }
            }
        };

        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    const addAppointment = (appointmentData) => {
        const newAppointment = {
            id: `apt-${Date.now()}`,
            ...appointmentData,
            status: appointmentData.status || 'pendiente',
            createdAt: new Date().toISOString()
        };
        setAppointments(prev => [...prev, newAppointment]);
        return newAppointment;
    };

    const updateAppointment = (id, updatedData) => {
        setAppointments(prev => prev.map(apt =>
            apt.id === id ? { ...apt, ...updatedData } : apt
        ));
    };

    const deleteAppointment = (id) => {
        setAppointments(prev => prev.filter(apt => apt.id !== id));
    };

    const getAppointmentsByDate = (date) => {
        return appointments.filter(apt => apt.date === date);
    };

    const value = {
        appointments,
        addAppointment,
        updateAppointment,
        deleteAppointment,
        getAppointmentsByDate
    };

    return (
        <AppointmentsContext.Provider value={value}>
            {children}
        </AppointmentsContext.Provider>
    );
};
