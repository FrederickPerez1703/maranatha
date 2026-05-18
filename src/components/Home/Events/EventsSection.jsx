import React, { useState } from 'react';
import { useLanguage } from '../../../context/LanguageContext';
import { useTheme } from '../../../context/ThemeContext';
import { useEvents } from '../../../contexts/EventsContext';
import { Calendar, Clock, MapPin, Ticket } from 'lucide-react';
import './EventsSection.css';

export default function EventsSection() {
    const { language } = useLanguage();
    const { theme } = useTheme();
    const { events: contextEvents } = useEvents();

    const events = contextEvents.map(event => ({
        ...event,
        title: event.title[language] || event.title['es'],
        description: event.description[language] || event.description['es'],
        price: typeof event.price === 'object' ? (event.price[language] || event.price['es']) : event.price
    }));

    if (events.length === 0) return null;

    // Helper to get month name safely
    const getMonthName = (dateString) => {
        try {
            // Append T00:00:00 to ensure local time interpretation or avoid timezone shifts affecting the day/month
            const date = new Date(dateString + 'T12:00:00');
            return date.toLocaleString(language === 'es' ? 'es-ES' : 'en-US', { month: 'short' }).toUpperCase().replace('.', '');
        } catch (e) {
            return '...';
        }
    };

    return (
        <section className="events-section" id="events" style={{ backgroundColor: theme === 'dark' ? '#111827' : '#fff' }}>
            <div className="container">
                <div className="events-header">
                    <Calendar className="events-icon-header" size={32} />
                    <h2 style={{ color: theme === 'dark' ? '#fff' : '#333' }}>
                        {language === 'es' ? 'Próximos Eventos' : 'Upcoming Events'}
                    </h2>
                    <p className="events-subtitle">
                        {language === 'es' ? 'No te pierdas nuestras actividades especiales' : 'Don\'t miss our special activities'}
                    </p>
                </div>

                <div className="events-grid">
                    {events.map(event => (
                        <div key={event.id} className="event-card" style={{ backgroundColor: theme === 'dark' ? '#1f2937' : '#f9fafb' }}>
                            <div className="event-image">
                                <img src={event.image} alt={event.title} />
                                <div className="event-date-badge">
                                    <span className="day">{event.date.split('-')[2]}</span>
                                    <span className="month">{getMonthName(event.date)}</span>
                                </div>
                            </div>
                            <div className="event-content">
                                <h3 style={{ color: theme === 'dark' ? '#fff' : '#333' }}>{event.title}</h3>
                                <p className="event-desc" style={{ color: theme === 'dark' ? '#9ca3af' : '#666' }}>
                                    {event.description}
                                </p>

                                <div className="event-details">
                                    <div className="detail-item" style={{ color: theme === 'dark' ? '#d1d5db' : '#555' }}>
                                        <Clock size={16} className="detail-icon" />
                                        <span>{event.time}</span>
                                    </div>
                                    <div className="detail-item" style={{ color: theme === 'dark' ? '#d1d5db' : '#555' }}>
                                        <MapPin size={16} className="detail-icon" />
                                        <span>{event.location}</span>
                                    </div>
                                    <div className="detail-item" style={{ color: theme === 'dark' ? '#d1d5db' : '#555' }}>
                                        <Ticket size={16} className="detail-icon" />
                                        <span>{event.price}</span>
                                    </div>
                                </div>

                                <button className="event-cta-btn">
                                    {language === 'es' ? 'Más Información' : 'More Info'}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
