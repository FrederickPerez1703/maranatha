import React, { useState, useEffect } from 'react';
import { Calendar, Scissors, User, Mail, Phone, CheckCircle } from 'lucide-react';
import SendService from '../../../services/send/SendService';
import { useLanguage } from '../../../context/LanguageContext';
import confetti from 'canvas-confetti';

export default function ContactModal({ isOpen, onClose, services, onSuccess, preSelectedService }) {
    const { t, language } = useLanguage();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        service: { name: "", price: "" },
        date: '',
        time: ''
    });

    useEffect(() => {
        if (preSelectedService) {
            setFormData(prev => ({
                ...prev,
                service: preSelectedService
            }));
        }
    }, [preSelectedService, isOpen]);

    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const sendService = new SendService();

    const getLocalDateFromInput = (dateStr) => {
        const [year, month, day] = dateStr.split('-').map(Number);
        return new Date(year, month - 1, day);
    };

    const generateTimeOptions = () => {
        const options = [];
        for (let hour = 9; hour < 19; hour++) {
            for (let min = 0; min < 60; min += 30) {
                const hour12 = hour % 12 === 0 ? 12 : hour % 12;
                const period = hour < 12 ? 'AM' : 'PM';
                const formattedHour = hour.toString().padStart(2, '0');
                const formattedMin = min.toString().padStart(2, '0');
                const value = `${formattedHour}:${formattedMin}`;
                const label = `${hour12}:${formattedMin} ${period}`;
                options.push(<option key={value} value={value}>{label}</option>);
            }
        }
        return options;
    };

    // Función para disparar confeti (4 segundos)
    const fireConfetti = () => {
        const duration = 4000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 10000 };

        function randomInRange(min, max) {
            return Math.random() * (max - min) + min;
        }

        const interval = setInterval(function () {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);

            confetti({
                ...defaults,
                particleCount,
                origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
                colors: ['#ff6b9d', '#ff8fab', '#ffc0cb', '#ff1493', '#ff69b4']
            });
            confetti({
                ...defaults,
                particleCount,
                origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
                colors: ['#ff6b9d', '#ff8fab', '#ffc0cb', '#ff1493', '#ff69b4']
            });
        }, 250);
    };

    // Función para cerrar el modal
    const handleClose = () => {
        if (isSubmitted) {
            // Disparar confeti
            fireConfetti();
            // Notificar al padre para mostrar el toast
            if (onSuccess) onSuccess();
        }

        // Cerrar el modal y resetear
        onClose();
        setIsSubmitted(false);
        setFormData({
            name: '',
            email: '',
            phone: '',
            service: { name: "", price: "" },
            date: '',
            time: ''
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);

        console.log('Datos de la cita:', formData);
        sendService.sendMessage(formData);

        setTimeout(() => {
            setIsLoading(false);
            setIsSubmitted(true);
            // YA NO cerramos el modal automáticamente
            // YA NO mostramos la notificación aquí
            // El usuario debe cerrar manualmente con el botón X
        }, 1000);
    };

    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    // Bloquear scroll del body cuando el modal está abierto
    useEffect(() => {
        if (isOpen) {
            // Guardar el scroll actual
            const scrollY = window.scrollY;
            // Bloquear scroll
            document.body.style.overflow = 'hidden';
            document.body.style.position = 'fixed';
            document.body.style.top = `-${scrollY}px`;
            document.body.style.width = '100%';
        } else {
            // Restaurar scroll
            const scrollY = document.body.style.top;
            document.body.style.overflow = '';
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.width = '';
            window.scrollTo(0, parseInt(scrollY || '0') * -1);
        }

        // Cleanup al desmontar
        return () => {
            document.body.style.overflow = '';
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.width = '';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            backdropFilter: 'blur(8px)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            animation: 'fadeIn 0.3s ease-out'
        }}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                style={{
                    backgroundColor: 'white',
                    borderRadius: '20px',
                    maxWidth: '650px',
                    width: '100%',
                    maxHeight: '90vh',
                    overflow: 'auto',
                    position: 'relative',
                    boxShadow: '0 25px 50px -12px rgba(255, 107, 157, 0.4)',
                    animation: 'slideUp 0.4s ease-out'
                }}>

                {/* Close Button */}
                <button
                    onClick={handleClose}
                    style={{
                        position: 'absolute',
                        top: '20px',
                        right: '20px',
                        background: 'rgba(255, 107, 157, 0.1)',
                        border: 'none',
                        borderRadius: '50%',
                        width: '40px',
                        height: '40px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        color: '#ff6b9d',
                        fontSize: '24px',
                        fontWeight: '300',
                        zIndex: 10
                    }}
                    onMouseOver={(e) => {
                        e.target.style.background = 'rgba(255, 107, 157, 0.2)';
                        e.target.style.transform = 'rotate(90deg)';
                    }}
                    onMouseOut={(e) => {
                        e.target.style.background = 'rgba(255, 107, 157, 0.1)';
                        e.target.style.transform = 'rotate(0deg)';
                    }}
                >
                    ×
                </button>

                {isSubmitted ? (
                    <div style={{ padding: '60px 40px', textAlign: 'center' }}>
                        <CheckCircle style={{ margin: '0 auto 20px auto', height: '80px', width: '80px', color: '#10b981' }} />
                        <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: '#1f2937', marginBottom: '12px' }}>
                            {t('contactModal.successTitle')}
                        </h2>
                        <p style={{ color: '#6b7280', marginBottom: '20px', fontSize: '16px' }}>
                            {language === 'es' ? 'Hemos recibido tu solicitud de cita para' : 'We have received your appointment request for'} <strong style={{ color: '#ff6b9d' }}>{formData.service.name}</strong> ({formData.service.price})
                        </p>
                        <div style={{
                            backgroundColor: '#f0fdf4',
                            border: '1px solid #bbf7d0',
                            borderRadius: '12px',
                            padding: '20px',
                            marginBottom: '20px'
                        }}>
                            <p style={{ fontSize: '15px', color: '#15803d', marginBottom: '8px' }}>
                                <strong>📅 {t('contactModal.date')}:</strong> {getLocalDateFromInput(formData.date).toLocaleDateString(language === 'es' ? 'es-ES' : 'en-US', {
                                    weekday: 'long',
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })} {language === 'es' ? 'a las' : 'at'} {' '}
                                {new Date(`1970-01-01T${formData.time}`).toLocaleTimeString(language === 'es' ? 'es-ES' : 'en-US', {
                                    hour: 'numeric',
                                    minute: '2-digit',
                                    hour12: true,
                                })}
                            </p>
                            <p style={{ fontSize: '15px', color: '#15803d' }}>
                                <strong>👤 {language === 'es' ? 'Cliente' : 'Client'}:</strong> {formData.name}
                            </p>
                        </div>
                        <p style={{ fontSize: '14px', color: '#6b7280' }}>
                            {t('contactModal.successMessage')}
                        </p>
                    </div>
                ) : (
                    <div style={{ padding: '40px' }}>
                        {/* Header */}
                        <div style={{ marginBottom: '32px', textAlign: 'center' }}>
                            <Scissors style={{ margin: '0 auto 16px auto', height: '48px', width: '48px', color: '#ff6b9d' }} />
                            <h1 style={{ fontSize: '30px', fontWeight: 'bold', color: '#1f2937', marginBottom: '8px' }}>
                                {t('contactModal.title')}
                            </h1>
                            <p style={{ color: '#6b7280' }}>{t('contactModal.subtitle')}</p>
                        </div>

                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                            {/* Información del cliente */}
                            <div>
                                <h2 style={{
                                    fontSize: '18px',
                                    fontWeight: '600',
                                    color: '#1f2937',
                                    marginBottom: '16px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px'
                                }}>
                                    <User style={{ height: '20px', width: '20px', color: '#ff6b9d' }} />
                                    {t('contactModal.clientInfo')}
                                </h2>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                    <div>
                                        <label style={{
                                            display: 'block',
                                            fontSize: '14px',
                                            fontWeight: '500',
                                            color: '#374151',
                                            marginBottom: '8px'
                                        }}>
                                            {t('contactModal.name')} *
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.name}
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                const soloLetrasYEspacios = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/.test(value);
                                                const espacios = (value.match(/ /g) || []).length;

                                                if (soloLetrasYEspacios && espacios <= 5) {
                                                    handleInputChange('name', value);
                                                    if (value.length > 0) {
                                                        e.target.style.borderColor = '#10b981';
                                                    }
                                                }
                                            }}
                                            style={{
                                                width: '100%',
                                                padding: '12px 16px',
                                                border: '1px solid #d1d5db',
                                                borderRadius: '8px',
                                                fontSize: '16px',
                                                outline: 'none',
                                                transition: 'border-color 0.2s'
                                            }}
                                            placeholder={t('contactModal.name')}
                                            onFocus={(e) => e.target.style.borderColor = '#ff6b9d'}
                                            onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                                        />
                                    </div>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                                        <div>
                                            <label style={{
                                                display: 'block',
                                                fontSize: '14px',
                                                fontWeight: '500',
                                                color: '#374151',
                                                marginBottom: '8px'
                                            }}>
                                                {t('contactModal.email')} *
                                            </label>
                                            <input
                                                type="email"
                                                required
                                                value={formData.email}
                                                onChange={(e) => handleInputChange('email', e.target.value)}
                                                onBlur={(e) => {
                                                    const value = e.target.value;
                                                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

                                                    if (!emailRegex.test(value)) {
                                                        e.target.style.borderColor = '#ef4444';
                                                    } else {
                                                        e.target.style.borderColor = '#10b981';
                                                    }
                                                }}
                                                style={{
                                                    width: '100%',
                                                    padding: '12px 16px',
                                                    border: '1px solid #d1d5db',
                                                    borderRadius: '8px',
                                                    fontSize: '16px',
                                                    outline: 'none'
                                                }}
                                                placeholder="email@example.com"
                                                onFocus={(e) => e.target.style.borderColor = '#ff6b9d'}
                                            />
                                        </div>
                                        <div>
                                            <label style={{
                                                display: 'block',
                                                fontSize: '14px',
                                                fontWeight: '500',
                                                color: '#374151',
                                                marginBottom: '8px'
                                            }}>
                                                {t('contactModal.phone')} *
                                            </label>
                                            <input
                                                type="tel"
                                                required
                                                value={formData.phone}
                                                onChange={(e) => {
                                                    const value = e.target.value;
                                                    const phoneRegex = /^[0-9\s()+-]*$/;
                                                    if (phoneRegex.test(value)) {
                                                        handleInputChange('phone', value);
                                                    }
                                                }}
                                                onBlur={(e) => {
                                                    const value = e.target.value;
                                                    const digitsOnly = value.replace(/\D/g, '');
                                                    if (digitsOnly.length >= 10) {
                                                        e.target.style.borderColor = '#10b981';
                                                    } else if (digitsOnly.length > 0) {
                                                        e.target.style.borderColor = '#ef4444';
                                                    } else {
                                                        e.target.style.borderColor = '#d1d5db';
                                                    }
                                                }}
                                                style={{
                                                    width: '100%',
                                                    padding: '12px 16px',
                                                    border: '1px solid #d1d5db',
                                                    borderRadius: '8px',
                                                    fontSize: '16px',
                                                    outline: 'none'
                                                }}
                                                placeholder="+1 (555) 123-4567"
                                                onFocus={(e) => e.target.style.borderColor = '#ff6b9d'}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Servicio */}
                            <div>
                                <h2 style={{
                                    fontSize: '18px',
                                    fontWeight: '600',
                                    color: '#1f2937',
                                    marginBottom: '16px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px'
                                }}>
                                    <Scissors style={{ height: '20px', width: '20px', color: '#ff6b9d' }} />
                                    {t('contactModal.service')}
                                </h2>
                                <div>
                                    <label style={{
                                        display: 'block',
                                        fontSize: '14px',
                                        fontWeight: '500',
                                        color: '#374151',
                                        marginBottom: '8px'
                                    }}>
                                        {t('contactModal.selectService')} *
                                    </label>
                                    <select
                                        value={formData.service.name}
                                        onChange={(e) => {
                                            const selected = services.find(s => s.name === e.target.value);
                                            handleInputChange('service', selected)
                                        }}
                                        style={{
                                            width: '100%',
                                            padding: '12px 10px',
                                            border: '1px solid #d1d5db',
                                            borderRadius: '8px',
                                            fontSize: '16px',
                                            backgroundColor: 'white',
                                            outline: 'none'
                                        }}
                                        onFocus={(e) => e.target.style.borderColor = '#ff6b9d'}
                                        onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                                    >
                                        {services.map(service => (
                                            <option key={service.name} value={service.name}>
                                                {service.name}: {service.price}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* Fecha y Hora */}
                            <div>
                                <h2 style={{
                                    fontSize: '18px',
                                    fontWeight: '600',
                                    color: '#1f2937',
                                    marginBottom: '16px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px'
                                }}>
                                    <Calendar style={{ height: '20px', width: '20px', color: '#ff6b9d' }} />
                                    {t('contactModal.date')} & {t('contactModal.time')}
                                </h2>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                                    <div>
                                        <label style={{
                                            display: 'block',
                                            fontSize: '14px',
                                            fontWeight: '500',
                                            color: '#374151',
                                            marginBottom: '8px'
                                        }}>
                                            {t('contactModal.date')} *
                                        </label>
                                        <input
                                            type="date"
                                            required
                                            value={formData.date}
                                            onChange={(e) => handleInputChange('date', e.target.value)}
                                            min={new Date().toISOString().split('T')[0]}
                                            style={{
                                                width: '100%',
                                                padding: '12px 10px',
                                                border: '1px solid #d1d5db',
                                                borderRadius: '8px',
                                                fontSize: '16px',
                                                backgroundColor: 'white',
                                                outline: 'none'
                                            }}
                                            onFocus={(e) => e.target.style.borderColor = '#ff6b9d'}
                                            onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                                        />
                                    </div>
                                    <div>
                                        <label style={{
                                            display: 'block',
                                            fontSize: '14px',
                                            fontWeight: '500',
                                            color: '#374151',
                                            marginBottom: '8px'
                                        }}>
                                            {t('contactModal.time')} *
                                        </label>
                                        <select
                                            value={formData.time}
                                            onChange={(e) => handleInputChange('time', e.target.value)}
                                            required
                                            style={{
                                                width: '100%',
                                                padding: '12px 10px',
                                                border: '1px solid #d1d5db',
                                                borderRadius: '8px',
                                                fontSize: '16px',
                                                backgroundColor: 'white',
                                                outline: 'none'
                                            }}
                                            onFocus={(e) => e.target.style.borderColor = '#ff6b9d'}
                                            onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                                        >
                                            <option value="">{t('contactModal.selectTime')}</option>
                                            {generateTimeOptions()}
                                        </select>
                                    </div>
                                </div>
                                <p style={{ fontSize: '12px', color: '#6b7280', marginTop: '8px' }}>
                                    ⏰ {t('contactModal.businessHours')}: 9:00 AM - 6:30 PM
                                </p>
                            </div>

                            {/* Botón de envío */}
                            <div style={{ paddingTop: '16px' }}>
                                <button
                                    type="submit"
                                    disabled={!formData.name || !formData.email || !formData.phone || !formData.service.name || !formData.date || !formData.time || isLoading}
                                    style={{
                                        width: '100%',
                                        padding: '16px 24px',
                                        background: 'linear-gradient(135deg, #ff6b9d, #ff8fab)',
                                        color: 'white',
                                        fontWeight: '600',
                                        borderRadius: '50px',
                                        border: 'none',
                                        cursor: (!formData.name || !formData.email || !formData.phone || !formData.service.name || !formData.date || !formData.time || isLoading) ? 'not-allowed' : 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '8px',
                                        fontSize: '16px',
                                        transition: 'all 0.3s',
                                        opacity: (!formData.name || !formData.email || !formData.phone || !formData.service.name || !formData.date || !formData.time || isLoading) ? 0.5 : 1,
                                        boxShadow: '0 4px 15px rgba(255, 107, 157, 0.3)'
                                    }}
                                    onMouseOver={(e) => {
                                        if (!e.target.disabled) {
                                            e.target.style.transform = 'translateY(-2px)';
                                            e.target.style.boxShadow = '0 8px 25px rgba(255, 107, 157, 0.4)';
                                        }
                                    }}
                                    onMouseOut={(e) => {
                                        if (!e.target.disabled) {
                                            e.target.style.transform = 'translateY(0)';
                                            e.target.style.boxShadow = '0 4px 15px rgba(255, 107, 157, 0.3)';
                                        }
                                    }}
                                >
                                    {isLoading ? (
                                        <>
                                            <div style={{
                                                width: '20px',
                                                height: '20px',
                                                border: '3px solid rgba(255,255,255,0.3)',
                                                borderTop: '3px solid white',
                                                borderRadius: '50%',
                                                animation: 'spin 1s linear infinite'
                                            }} />
                                            {t('contactModal.sending')}
                                        </>
                                    ) : (
                                        <>
                                            <Calendar style={{ height: '20px', width: '20px' }} />
                                            {t('contactModal.bookBtn')}
                                        </>
                                    )}
                                </button>
                            </div>

                            <div style={{ textAlign: 'center' }}>
                                <p style={{ fontSize: '12px', color: '#6b7280' }}>
                                    * {t('contactModal.requiredFields')}
                                </p>
                            </div>
                        </form>
                    </div>
                )}

                <style>{`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes slideUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
            </div>
        </div>
    );
}
