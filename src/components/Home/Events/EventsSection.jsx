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
        <section className="events-section" id="events" style={{ 
            backgroundColor: theme === 'dark' ? '#111827' : '#ffffff',
            padding: '5rem 0',
            transition: 'background 0.3s ease'
        }}>
            <div className="container">
                <div className="events-header">
                    <div style={{
                        width: '50px',
                        height: '50px',
                        borderRadius: '50%',
                        background: 'rgba(255, 77, 128, 0.08)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--color-primary)',
                        marginBottom: '1rem'
                    }}>
                        <Calendar size={24} />
                    </div>
                    <h2 style={{ 
                        color: theme === 'dark' ? '#fff' : 'var(--color-gray-900)',
                        fontSize: '2.5rem',
                        fontWeight: '800',
                        fontFamily: 'Outfit, sans-serif',
                        marginBottom: '0.5rem'
                    }}>
                        {language === 'es' ? 'Próximos Eventos' : 'Upcoming Events'}
                    </h2>
                    <p className="events-subtitle" style={{
                        color: theme === 'dark' ? 'var(--color-gray-400)' : 'var(--color-gray-600)',
                        fontSize: '1.1rem',
                        fontFamily: 'Outfit, sans-serif'
                    }}>
                        {language === 'es' ? 'No te pierdas nuestras actividades especiales' : 'Don\'t miss our special activities'}
                    </p>
                </div>

                <div className="events-grid" style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '2.5rem',
                    marginBottom: '3rem'
                }}>
                    {events.map(event => (
                        <div key={event.id} className="event-card-mock" style={{ 
                            backgroundColor: theme === 'dark' ? '#1f2937' : '#ffffff',
                            borderRadius: '24px',
                            overflow: 'hidden',
                            boxShadow: theme === 'dark' ? '0 10px 30px rgba(0,0,0,0.2)' : '0 10px 30px rgba(255, 77, 128, 0.02)',
                            border: theme === 'dark' ? '1px solid rgba(255, 77, 128, 0.1)' : '1px solid rgba(0,0,0,0.02)',
                            transition: 'all 0.3s ease'
                        }}>
                            <div className="event-image" style={{ height: '220px', position: 'relative', overflow: 'hidden' }}>
                                <img src={event.image} alt={event.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                <div className="event-date-badge" style={{
                                    position: 'absolute',
                                    top: '15px',
                                    right: '15px',
                                    background: theme === 'dark' ? 'rgba(31, 41, 55, 0.9)' : 'rgba(255, 255, 255, 0.9)',
                                    padding: '8px 14px',
                                    borderRadius: '16px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.05)',
                                    backdropFilter: 'blur(8px)',
                                    WebkitBackdropFilter: 'blur(8px)',
                                    border: theme === 'dark' ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid rgba(0,0,0,0.02)'
                                }}>
                                    <span className="day" style={{ fontSize: '1.4rem', fontWeight: '800', color: theme === 'dark' ? '#fff' : '#111827', fontFamily: 'Outfit, sans-serif', lineHeight: '1.1' }}>
                                        {event.date.split('-')[2]}
                                    </span>
                                    <span className="month" style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--color-primary)', textTransform: 'uppercase', fontFamily: 'Outfit, sans-serif' }}>
                                        {getMonthName(event.date)}
                                    </span>
                                </div>
                            </div>
                            <div className="event-content" style={{ padding: '2rem' }}>
                                <h3 style={{ 
                                    color: theme === 'dark' ? '#fff' : 'var(--color-gray-900)',
                                    fontSize: '1.4rem',
                                    fontWeight: '700',
                                    fontFamily: 'Outfit, sans-serif',
                                    marginBottom: '0.75rem'
                                }}>
                                    {event.title}
                                </h3>
                                <p className="event-desc" style={{ 
                                    color: theme === 'dark' ? 'var(--color-gray-400)' : 'var(--color-gray-600)',
                                    fontSize: '0.95rem',
                                    lineHeight: '1.5',
                                    marginBottom: '1.5rem',
                                    minHeight: '3rem'
                                }}>
                                    {event.description}
                                </p>

                                <div className="event-details" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
                                    <div className="detail-item" style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', color: theme === 'dark' ? 'var(--color-gray-300)' : 'var(--color-gray-600)' }}>
                                        <Clock size={16} style={{ color: 'var(--color-primary)' }} />
                                        <span style={{ fontWeight: '500' }}>{event.time}</span>
                                    </div>
                                    <div className="detail-item" style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', color: theme === 'dark' ? 'var(--color-gray-300)' : 'var(--color-gray-600)' }}>
                                        <MapPin size={16} style={{ color: 'var(--color-primary)' }} />
                                        <span style={{ fontWeight: '500' }}>{event.location}</span>
                                    </div>
                                    <div className="detail-item" style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', color: theme === 'dark' ? 'var(--color-gray-300)' : 'var(--color-gray-600)' }}>
                                        <Ticket size={16} style={{ color: 'var(--color-primary)' }} />
                                        <span style={{ fontWeight: '500' }}>{event.price}</span>
                                    </div>
                                </div>

                                <button className="event-cta-btn-mock" style={{
                                    width: '100%',
                                    padding: '12px',
                                    background: 'transparent',
                                    border: '2px solid var(--color-primary)',
                                    color: 'var(--color-primary)',
                                    borderRadius: '50px',
                                    fontWeight: '700',
                                    fontSize: '0.9rem',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease',
                                    fontFamily: 'Outfit, sans-serif'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.background = 'var(--color-primary)';
                                    e.currentTarget.style.color = '#ffffff';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.background = 'transparent';
                                    e.currentTarget.style.color = 'var(--color-primary)';
                                }}
                                >
                                    {language === 'es' ? 'Más Información' : 'More Info'}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Slider pagination dots */}
                <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '2rem' }}>
                    <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'var(--color-primary)', cursor: 'pointer' }}></span>
                    <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: theme === 'dark' ? '#374151' : '#e5e7eb', cursor: 'pointer' }}></span>
                    <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: theme === 'dark' ? '#374151' : '#e5e7eb', cursor: 'pointer' }}></span>
                    <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: theme === 'dark' ? '#374151' : '#e5e7eb', cursor: 'pointer' }}></span>
                </div>
            </div>
        </section>
    );
}
