import { createContext, useContext, useState, useEffect } from 'react';

const EventsContext = createContext();

export const useEvents = () => {
    const context = useContext(EventsContext);
    if (!context) {
        throw new Error('useEvents must be used within a EventsProvider');
    }
    return context;
};

export const EventsProvider = ({ children }) => {
    // Default events (used if local storage is empty)
    const defaultEvents = [
        {
            id: 1,
            title: { es: 'Taller de Automaquillaje', en: 'Self-Makeup Workshop' },
            date: '2026-02-15',
            time: '14:00 - 17:00',
            location: 'Maranatha Salon',
            description: {
                es: 'Aprende las técnicas básicas para un maquillaje diario perfecto.',
                en: 'Learn basic techniques for perfect daily makeup.'
            },
            price: '$50',
            image: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&q=80&w=800'
        },
        {
            id: 2,
            title: { es: 'Día de Spa & Relax', en: 'Spa & Relax Day' },
            date: '2026-02-28',
            time: '09:00 - 18:00',
            location: 'Maranatha Salon',
            description: {
                es: 'Descuentos especiales en todos los tratamientos faciales y masajes.',
                en: 'Special discounts on all facial treatments and massages.'
            },
            price: { es: 'Varía', en: 'Varies' },
            image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&q=80&w=800'
        },
        {
            id: 3,
            title: { es: 'Gran Rifa de Marzo', en: 'Grand March Raffle' },
            date: '2026-03-01',
            time: '18:00',
            location: 'Instagram Live',
            description: {
                es: '¡Participa para ganar un cambio de imagen completo y una canasta de productos premium! Compra tu ticket en el salón.',
                en: 'Participate to win a full makeover and a basket of premium products! Buy your ticket at the salon.'
            },
            price: '$10 / Ticket',
            image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&q=80&w=800'
        }
    ];

    const [events, setEvents] = useState(() => {
        try {
            const savedEvents = localStorage.getItem('salonEvents');
            return savedEvents ? JSON.parse(savedEvents) : defaultEvents;
        } catch (error) {
            console.error('Error loading events:', error);
            return defaultEvents;
        }
    });

    useEffect(() => {
        localStorage.setItem('salonEvents', JSON.stringify(events));
    }, [events]);

    const addEvent = (eventData) => {
        const newEvent = {
            id: Date.now(),
            ...eventData
        };
        setEvents(prev => [...prev, newEvent]);
    };

    const updateEvent = (id, updatedData) => {
        setEvents(prev => prev.map(event =>
            event.id === id ? { ...event, ...updatedData } : event
        ));
    };

    const deleteEvent = (id) => {
        setEvents(prev => prev.filter(event => event.id !== id));
    };

    const value = {
        events,
        addEvent,
        updateEvent,
        deleteEvent
    };

    return (
        <EventsContext.Provider value={value}>
            {children}
        </EventsContext.Provider>
    );
};
