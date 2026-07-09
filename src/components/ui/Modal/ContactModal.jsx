import React, { useState, useEffect } from 'react';
import { Calendar, Scissors, User, Phone, CheckCircle, X, Clock, Star, Sparkles, ChevronLeft } from 'lucide-react';
import SendService from '../../../services/send/SendService';
import { useLanguage } from '../../../context/LanguageContext';
import { useServices } from '../../../contexts/ServicesContext';
import { useClients } from '../../../contexts/ClientsContext';
import { useAppointments } from '../../../contexts/AppointmentsContext';
import servicesData from '../../../data/servicesData';
import confetti from 'canvas-confetti';

/* ─── Inline styles helpers ─── */
const inputBase = {
    width: '100%',
    padding: '12px 16px',
    border: '1.5px solid #e5e7eb',
    borderRadius: '12px',
    fontSize: '15px',
    outline: 'none',
    transition: 'border-color 0.2s, box-shadow 0.2s',
    background: '#ffffff',
    color: '#111827',
    fontFamily: 'Outfit, sans-serif',
    boxSizing: 'border-box',
};

const selectBase = {
    ...inputBase,
    appearance: 'none',
    WebkitAppearance: 'none',
    cursor: 'pointer',
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23ff4d80' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E")`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 14px center',
    paddingRight: '40px',
};

const labelStyle = {
    display: 'block',
    fontSize: '13px',
    fontWeight: '600',
    color: '#374151',
    marginBottom: '6px',
    fontFamily: 'Outfit, sans-serif',
    letterSpacing: '0.01em',
};

const sectionHeadStyle = {
    fontSize: '14px',
    fontWeight: '700',
    color: '#ff4d80',
    marginBottom: '14px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    textTransform: 'uppercase',
    letterSpacing: '0.06em',
    fontFamily: 'Outfit, sans-serif',
};

export default function ContactModal({ isOpen, onClose, onSuccess, preSelectedService }) {
    const { t, language } = useLanguage();
    const { getActiveServices } = useServices();
    const { addClient, getClientByPhone, addPoints } = useClients();
    const { addAppointment } = useAppointments();
    const activeServices = getActiveServices();

    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        service: { name: '', price: '' },
        date: '',
        time: '',
    });

    const categoryToType = {
        'Uñas': 'nails',
        'Cabello': 'hair',
        'Maquillaje': 'makeup',
        'Tratamientos Faciales': 'facial',
        'Depilación': 'waxing',
        'Otros': 'other',
    };

    const getTranslatedServiceName = (originalName) => {
        if (language === 'es') return originalName;
        const serviceObj = activeServices.find(s => s.name === originalName);
        if (!serviceObj) return originalName;
        const type = categoryToType[serviceObj.category];
        if (!type) return originalName;
        const esServices = servicesData['es'][type]?.services;
        if (!esServices) return originalName;
        const index = esServices.findIndex(s => s.name === originalName);
        if (index !== -1 && servicesData[language][type]?.services[index]) {
            return servicesData[language][type].services[index].name;
        }
        return originalName;
    };

    useEffect(() => {
        if (preSelectedService) {
            setFormData(prev => ({ ...prev, service: preSelectedService }));
        }
    }, [preSelectedService, isOpen]);

    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isClosed, setIsClosed] = useState(false);
    const [availableTimes, setAvailableTimes] = useState([]);

    const sendService = new SendService();

    const getLocalDateFromInput = (dateStr) => {
        const [year, month, day] = dateStr.split('-').map(Number);
        return new Date(year, month - 1, day);
    };

    const checkIfClosed = (selectedDate) => {
        if (!selectedDate) return false;
        const now = new Date();
        const selected = getLocalDateFromInput(selectedDate);
        const isToday = selected.toDateString() === now.toDateString();
        if (isToday) {
            const cur = now.getHours() * 60 + now.getMinutes();
            return cur >= 18 * 60 + 30;
        }
        return false;
    };

    const generateTimeOptions = (selectedDate) => {
        const options = [];
        const now = new Date();
        const selected = selectedDate ? getLocalDateFromInput(selectedDate) : null;
        const isToday = selected && selected.toDateString() === now.toDateString();
        const curMin = now.getHours() * 60 + now.getMinutes();

        for (let hour = 9; hour < 19; hour++) {
            for (let min = 0; min < 60; min += 30) {
                if (isToday && hour * 60 + min <= curMin + 30) continue;
                const hour12 = hour % 12 === 0 ? 12 : hour % 12;
                const period = hour < 12 ? 'AM' : 'PM';
                const value = `${hour.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}`;
                const label = `${hour12}:${min.toString().padStart(2, '0')} ${period}`;
                options.push(<option key={value} value={value}>{label}</option>);
            }
        }
        return options;
    };

    useEffect(() => {
        if (formData.date) {
            const closed = checkIfClosed(formData.date);
            setIsClosed(closed);
            if (!closed) {
                const times = generateTimeOptions(formData.date);
                setAvailableTimes(times);
                if (times.length === 0) setFormData(prev => ({ ...prev, time: '' }));
            } else {
                setAvailableTimes([]);
                setFormData(prev => ({ ...prev, time: '' }));
            }
        }
    }, [formData.date]);

    const fireConfetti = () => {
        const duration = 4000;
        const end = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 10000 };
        const rand = (min, max) => Math.random() * (max - min) + min;
        const interval = setInterval(() => {
            const left = end - Date.now();
            if (left <= 0) return clearInterval(interval);
            const pc = 50 * (left / duration);
            confetti({ ...defaults, particleCount: pc, origin: { x: rand(0.1, 0.3), y: Math.random() - 0.2 }, colors: ['#ff4d80', '#ff7ea3', '#ffc0cb', '#ff1493', '#ff69b4'] });
            confetti({ ...defaults, particleCount: pc, origin: { x: rand(0.7, 0.9), y: Math.random() - 0.2 }, colors: ['#ff4d80', '#ff7ea3', '#ffc0cb', '#ff1493', '#ff69b4'] });
        }, 250);
    };

    const handleClose = () => {
        if (isSubmitted) {
            fireConfetti();
            if (onSuccess) onSuccess();
        }
        onClose();
        setIsSubmitted(false);
        setFormData({ name: '', phone: '', service: { name: '', price: '' }, date: '', time: '' });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        sendService.sendMessage(formData);

        setTimeout(() => {
            const existing = getClientByPhone(formData.phone);
            if (existing) {
                addPoints(existing.id, 1.5, 'Cita Web');
            } else {
                addClient({
                    name: formData.name,
                    phone: formData.phone,
                    points: 1.5,
                    history: [{ date: new Date().toISOString(), action: 'Primera Cita Web', pointsAdded: 1.5, totalPoints: 1.5 }],
                });
            }
            addAppointment({
                date: formData.date,
                time: formData.time,
                client: formData.name,
                phone: formData.phone,
                service: formData.service.name,
                price: formData.service.price,
                status: 'pendiente',
                notes: 'Cita agendada desde la web',
            });
            setIsLoading(false);
            setIsSubmitted(true);
        }, 1000);
    };

    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    /* Scroll lock */
    useEffect(() => {
        if (isOpen) {
            const scrollY = window.scrollY;
            document.body.style.overflow = 'hidden';
            document.body.style.position = 'fixed';
            document.body.style.top = `-${scrollY}px`;
            document.body.style.width = '100%';
        } else {
            const scrollY = document.body.style.top;
            document.body.style.overflow = '';
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.width = '';
            window.scrollTo(0, parseInt(scrollY || '0') * -1);
        }
        return () => {
            document.body.style.overflow = '';
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.width = '';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    const isFormValid = formData.name && formData.phone && formData.service.name && formData.date && formData.time;

    /* ─── SUCCESS SCREEN ─── */
    if (isSubmitted) {
        return (
            <div style={{
                position: 'fixed', inset: 0,
                backgroundColor: 'rgba(0,0,0,0.65)',
                backdropFilter: 'blur(10px)',
                zIndex: 9999,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                padding: '20px',
                animation: 'cmFadeIn 0.3s ease-out',
            }}>
                <div onClick={e => e.stopPropagation()} style={{
                    background: '#ffffff',
                    borderRadius: '24px',
                    maxWidth: '480px',
                    width: '100%',
                    padding: '48px 40px',
                    textAlign: 'center',
                    position: 'relative',
                    boxShadow: '0 30px 60px rgba(255,77,128,0.25)',
                    animation: 'cmSlideUp 0.4s ease-out',
                }}>
                    {/* Close */}
                    <button onClick={handleClose} style={{
                        position: 'absolute', top: '16px', right: '16px',
                        background: 'rgba(255,77,128,0.08)', border: 'none',
                        borderRadius: '50%', width: '36px', height: '36px',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        cursor: 'pointer', color: '#ff4d80', transition: 'all 0.2s',
                    }}
                        onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,77,128,0.18)'; e.currentTarget.style.transform = 'rotate(90deg)'; }}
                        onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,77,128,0.08)'; e.currentTarget.style.transform = 'rotate(0deg)'; }}
                    >
                        <X size={18} />
                    </button>

                    {/* Success icon */}
                    <div style={{
                        width: '90px', height: '90px', borderRadius: '50%',
                        background: 'linear-gradient(135deg, #d1fae5, #a7f3d0)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        margin: '0 auto 24px auto',
                        boxShadow: '0 8px 25px rgba(16,185,129,0.25)',
                    }}>
                        <CheckCircle size={48} color="#10b981" strokeWidth={2} />
                    </div>

                    <h2 style={{ fontSize: '26px', fontWeight: '800', color: '#111827', marginBottom: '8px', fontFamily: 'Outfit, sans-serif' }}>
                        {language === 'es' ? '¡Cita Agendada! 🎉' : 'Appointment Booked! 🎉'}
                    </h2>
                    <p style={{ color: '#6b7280', fontSize: '15px', marginBottom: '24px', fontFamily: 'Outfit, sans-serif' }}>
                        {language === 'es' ? 'Hemos recibido tu solicitud. Te contactaremos para confirmar.' : 'We received your request. We will contact you to confirm.'}
                    </p>

                    {/* Summary card */}
                    <div style={{
                        background: 'linear-gradient(135deg, #f0fdf4, #dcfce7)',
                        border: '1.5px solid #bbf7d0',
                        borderRadius: '16px',
                        padding: '20px',
                        marginBottom: '28px',
                        textAlign: 'left',
                    }}>
                        {[
                            { icon: <User size={15} />, label: language === 'es' ? 'Cliente' : 'Client', value: formData.name },
                            { icon: <Scissors size={15} />, label: language === 'es' ? 'Servicio' : 'Service', value: `${formData.service.name}${formData.service.price ? ` · ${formData.service.price}` : ''}` },
                            {
                                icon: <Calendar size={15} />, label: language === 'es' ? 'Fecha' : 'Date',
                                value: formData.date ? getLocalDateFromInput(formData.date).toLocaleDateString(language === 'es' ? 'es-ES' : 'en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' }) : ''
                            },
                            {
                                icon: <Clock size={15} />, label: language === 'es' ? 'Hora' : 'Time',
                                value: formData.time ? new Date(`1970-01-01T${formData.time}`).toLocaleTimeString(language === 'es' ? 'es-ES' : 'en-US', { hour: 'numeric', minute: '2-digit', hour12: true }) : ''
                            },
                        ].map((row, i) => (
                            <div key={i} style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: i < 3 ? '10px' : 0 }}>
                                <span style={{ color: '#10b981', flexShrink: 0 }}>{row.icon}</span>
                                <span style={{ fontSize: '13px', color: '#15803d', fontFamily: 'Outfit, sans-serif' }}>
                                    <strong>{row.label}:</strong> {row.value}
                                </span>
                            </div>
                        ))}
                    </div>

                    <button onClick={handleClose} style={{
                        width: '100%', padding: '14px',
                        background: 'linear-gradient(135deg, #ff4d80, #ff7ea3)',
                        color: 'white', border: 'none', borderRadius: '50px',
                        fontWeight: '700', fontSize: '16px', cursor: 'pointer',
                        fontFamily: 'Outfit, sans-serif',
                        boxShadow: '0 4px 15px rgba(255,77,128,0.3)',
                        transition: 'all 0.3s ease',
                    }}
                        onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 25px rgba(255,77,128,0.4)'; }}
                        onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 15px rgba(255,77,128,0.3)'; }}
                    >
                        {language === 'es' ? 'Cerrar' : 'Close'}
                    </button>

                    <style>{`
                        @keyframes cmFadeIn { from{opacity:0} to{opacity:1} }
                        @keyframes cmSlideUp { from{opacity:0;transform:translateY(30px)} to{opacity:1;transform:translateY(0)} }
                    `}</style>
                </div>
            </div>
        );
    }

    /* ─── MAIN FORM MODAL ─── */
    return (
        <div style={{
            position: 'fixed', inset: 0,
            backgroundColor: 'rgba(0,0,0,0.65)',
            backdropFilter: 'blur(10px)',
            zIndex: 9999,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '20px',
            animation: 'cmFadeIn 0.3s ease-out',
        }}>
            <div onClick={e => e.stopPropagation()} style={{
                background: '#ffffff',
                borderRadius: '24px',
                maxWidth: '900px',
                width: '100%',
                maxHeight: '92vh',
                overflow: 'hidden',
                position: 'relative',
                boxShadow: '0 30px 70px rgba(255,77,128,0.2)',
                animation: 'cmSlideUp 0.4s ease-out',
                display: 'flex',
                flexDirection: 'row',
            }}>

                {/* ── LEFT PANEL: Form ── */}
                <div style={{
                    flex: '1 1 auto',
                    overflowY: 'auto',
                    padding: '40px 36px',
                    minWidth: 0,
                }}>

                    {/* Header */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '28px' }}>
                        <div style={{
                            width: '46px', height: '46px', borderRadius: '14px',
                            background: 'linear-gradient(135deg, #ff4d80, #ff7ea3)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            boxShadow: '0 4px 12px rgba(255,77,128,0.35)',
                            flexShrink: 0,
                        }}>
                            <Calendar size={22} color="white" />
                        </div>
                        <div>
                            <h1 style={{ fontSize: '22px', fontWeight: '800', color: '#111827', margin: 0, fontFamily: 'Outfit, sans-serif' }}>
                                {t('contactModal.title')}
                            </h1>
                            <p style={{ fontSize: '13px', color: '#9ca3af', margin: 0, fontFamily: 'Outfit, sans-serif' }}>
                                {t('contactModal.subtitle')}
                            </p>
                        </div>
                    </div>

                    {/* Close button */}
                    <button onClick={handleClose} style={{
                        position: 'absolute', top: '18px', right: '18px',
                        background: 'rgba(255,77,128,0.08)', border: 'none', borderRadius: '50%',
                        width: '36px', height: '36px',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        cursor: 'pointer', color: '#ff4d80', transition: 'all 0.2s', zIndex: 10,
                    }}
                        onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,77,128,0.18)'; e.currentTarget.style.transform = 'rotate(90deg)'; }}
                        onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,77,128,0.08)'; e.currentTarget.style.transform = 'rotate(0deg)'; }}
                    >
                        <X size={18} />
                    </button>

                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

                        {/* ── Section: Client Info ── */}
                        <div>
                            <div style={sectionHeadStyle}>
                                <div style={{ width: '22px', height: '22px', background: 'rgba(255,77,128,0.1)', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <User size={13} color="#ff4d80" />
                                </div>
                                {t('contactModal.clientInfo')}
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                                <div>
                                    <label style={labelStyle}>{t('contactModal.name')} *</label>
                                    <input
                                        type="text" required value={formData.name}
                                        onChange={e => {
                                            const v = e.target.value;
                                            if (/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/.test(v) && (v.match(/ /g) || []).length <= 5) {
                                                handleInputChange('name', v);
                                                if (v.length > 0) e.target.style.borderColor = '#10b981';
                                            }
                                        }}
                                        placeholder={t('contactModal.name')}
                                        style={inputBase}
                                        onFocus={e => { e.target.style.borderColor = '#ff4d80'; e.target.style.boxShadow = '0 0 0 3px rgba(255,77,128,0.1)'; }}
                                        onBlur={e => { if (!formData.name) { e.target.style.borderColor = '#e5e7eb'; e.target.style.boxShadow = 'none'; } }}
                                    />
                                </div>
                                <div>
                                    <label style={labelStyle}>{t('contactModal.phone')} *</label>
                                    <input
                                        type="tel" required value={formData.phone}
                                        onChange={e => { if (/^[0-9\s()+-]*$/.test(e.target.value)) handleInputChange('phone', e.target.value); }}
                                        placeholder="+1 (555) 123-4567"
                                        style={inputBase}
                                        onFocus={e => { e.target.style.borderColor = '#ff4d80'; e.target.style.boxShadow = '0 0 0 3px rgba(255,77,128,0.1)'; }}
                                        onBlur={e => {
                                            const d = e.target.value.replace(/\D/g, '');
                                            if (d.length >= 10) { e.target.style.borderColor = '#10b981'; e.target.style.boxShadow = 'none'; }
                                            else if (d.length > 0) { e.target.style.borderColor = '#ef4444'; e.target.style.boxShadow = 'none'; }
                                            else { e.target.style.borderColor = '#e5e7eb'; e.target.style.boxShadow = 'none'; }
                                        }}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* ── Divider ── */}
                        <div style={{ borderTop: '1px solid #f3f4f6' }} />

                        {/* ── Section: Service ── */}
                        <div>
                            <div style={sectionHeadStyle}>
                                <div style={{ width: '22px', height: '22px', background: 'rgba(255,77,128,0.1)', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Scissors size={13} color="#ff4d80" />
                                </div>
                                {t('contactModal.service')}
                            </div>
                            <label style={labelStyle}>{t('contactModal.selectService')} *</label>
                            <select
                                value={formData.service.name}
                                onChange={e => {
                                    const name = e.target.value;
                                    const svc = activeServices.find(s => getTranslatedServiceName(s.name) === name);
                                    handleInputChange('service', svc || { name, price: '' });
                                }}
                                style={selectBase}
                                onFocus={e => { e.target.style.borderColor = '#ff4d80'; e.target.style.boxShadow = '0 0 0 3px rgba(255,77,128,0.1)'; }}
                                onBlur={e => { e.target.style.borderColor = '#e5e7eb'; e.target.style.boxShadow = 'none'; }}
                            >
                                <option value="">{t('contactModal.selectService')}</option>
                                {activeServices.map(s => (
                                    <option key={s.id || s.name} value={getTranslatedServiceName(s.name)}>
                                        {getTranslatedServiceName(s.name)}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* ── Divider ── */}
                        <div style={{ borderTop: '1px solid #f3f4f6' }} />

                        {/* ── Section: Date & Time ── */}
                        <div>
                            <div style={sectionHeadStyle}>
                                <div style={{ width: '22px', height: '22px', background: 'rgba(255,77,128,0.1)', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Calendar size={13} color="#ff4d80" />
                                </div>
                                {t('contactModal.date')} & {t('contactModal.time')}
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                                <div>
                                    <label style={labelStyle}>{t('contactModal.date')} *</label>
                                    <input
                                        type="date" required value={formData.date}
                                        onChange={e => handleInputChange('date', e.target.value)}
                                        min={new Date().toISOString().split('T')[0]}
                                        style={{ ...inputBase, cursor: 'pointer' }}
                                        onFocus={e => { e.target.style.borderColor = '#ff4d80'; e.target.style.boxShadow = '0 0 0 3px rgba(255,77,128,0.1)'; }}
                                        onBlur={e => { e.target.style.borderColor = '#e5e7eb'; e.target.style.boxShadow = 'none'; }}
                                    />
                                </div>
                                <div>
                                    <label style={labelStyle}>{t('contactModal.time')} *</label>
                                    {isClosed ? (
                                        <div style={{ padding: '12px 14px', border: '1.5px solid #fbbf24', borderRadius: '12px', background: '#fef3c7', textAlign: 'center' }}>
                                            <p style={{ margin: '0 0 4px', fontSize: '13px', fontWeight: '700', color: '#92400e', fontFamily: 'Outfit, sans-serif' }}>🕐 {language === 'es' ? 'Estamos Cerrados' : 'We are Closed'}</p>
                                            <p style={{ margin: 0, fontSize: '11px', color: '#78350f', fontFamily: 'Outfit, sans-serif' }}>{language === 'es' ? 'Agenda para mañana' : 'Schedule for tomorrow'}</p>
                                        </div>
                                    ) : availableTimes.length === 0 && formData.date ? (
                                        <div style={{ padding: '12px 14px', border: '1.5px solid #fbbf24', borderRadius: '12px', background: '#fef3c7', textAlign: 'center' }}>
                                            <p style={{ margin: '0 0 4px', fontSize: '13px', fontWeight: '700', color: '#92400e', fontFamily: 'Outfit, sans-serif' }}>⏰ {language === 'es' ? 'Sin horarios hoy' : 'No times today'}</p>
                                            <p style={{ margin: 0, fontSize: '11px', color: '#78350f', fontFamily: 'Outfit, sans-serif' }}>{language === 'es' ? 'Selecciona otro día' : 'Select another day'}</p>
                                        </div>
                                    ) : (
                                        <select
                                            value={formData.time}
                                            onChange={e => handleInputChange('time', e.target.value)}
                                            required disabled={!formData.date || isClosed}
                                            style={{
                                                ...selectBase,
                                                background: (!formData.date || isClosed) ? '#f9fafb' : '#ffffff',
                                                opacity: (!formData.date || isClosed) ? 0.6 : 1,
                                                cursor: (!formData.date || isClosed) ? 'not-allowed' : 'pointer',
                                            }}
                                            onFocus={e => { e.target.style.borderColor = '#ff4d80'; e.target.style.boxShadow = '0 0 0 3px rgba(255,77,128,0.1)'; }}
                                            onBlur={e => { e.target.style.borderColor = '#e5e7eb'; e.target.style.boxShadow = 'none'; }}
                                        >
                                            <option value="">{t('contactModal.selectTime')}</option>
                                            {availableTimes}
                                        </select>
                                    )}
                                </div>
                            </div>
                            {!isClosed && (
                                <p style={{ fontSize: '12px', color: '#9ca3af', marginTop: '8px', fontFamily: 'Outfit, sans-serif', display: 'flex', alignItems: 'center', gap: '5px' }}>
                                    <Clock size={12} /> {t('contactModal.businessHours')}: 9:00 AM – 6:30 PM
                                </p>
                            )}
                        </div>

                        {/* ── Submit ── */}
                        <div>
                            <button
                                type="submit"
                                disabled={!isFormValid || isLoading}
                                style={{
                                    width: '100%', padding: '15px 24px',
                                    background: isFormValid ? 'linear-gradient(135deg, #ff4d80, #ff7ea3)' : '#e5e7eb',
                                    color: isFormValid ? 'white' : '#9ca3af',
                                    border: 'none', borderRadius: '50px',
                                    fontWeight: '700', fontSize: '16px',
                                    cursor: isFormValid && !isLoading ? 'pointer' : 'not-allowed',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                                    transition: 'all 0.3s',
                                    boxShadow: isFormValid ? '0 4px 18px rgba(255,77,128,0.35)' : 'none',
                                    fontFamily: 'Outfit, sans-serif',
                                }}
                                onMouseEnter={e => { if (isFormValid && !isLoading) { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 28px rgba(255,77,128,0.45)'; } }}
                                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = isFormValid ? '0 4px 18px rgba(255,77,128,0.35)' : 'none'; }}
                            >
                                {isLoading ? (
                                    <>
                                        <div style={{ width: '18px', height: '18px', border: '2.5px solid rgba(255,255,255,0.3)', borderTop: '2.5px solid white', borderRadius: '50%', animation: 'cmSpin 1s linear infinite' }} />
                                        {t('contactModal.sending')}
                                    </>
                                ) : (
                                    <>
                                        <Calendar size={18} />
                                        {t('contactModal.bookBtn')}
                                    </>
                                )}
                            </button>
                            <p style={{ textAlign: 'center', fontSize: '12px', color: '#9ca3af', marginTop: '10px', fontFamily: 'Outfit, sans-serif' }}>
                                * {t('contactModal.requiredFields')}
                            </p>
                        </div>
                    </form>
                </div>

                {/* ── RIGHT PANEL: Decorative (hidden on mobile) ── */}
                <div style={{
                    width: '310px',
                    flexShrink: 0,
                    background: 'linear-gradient(160deg, #fff0f5 0%, #ffe8f0 50%, #ffd6e7 100%)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '40px 28px',
                    textAlign: 'center',
                    borderLeft: '1px solid #fce7f3',
                    position: 'relative',
                    overflow: 'hidden',
                }} className="cm-deco-panel">
                    {/* Decorative blobs */}
                    <div style={{ position: 'absolute', top: '-30px', right: '-30px', width: '120px', height: '120px', borderRadius: '50%', background: 'rgba(255,77,128,0.08)' }} />
                    <div style={{ position: 'absolute', bottom: '-20px', left: '-20px', width: '90px', height: '90px', borderRadius: '50%', background: 'rgba(255,77,128,0.06)' }} />

                    {/* Image placeholder */}
                    <div style={{
                        width: '160px', height: '160px', borderRadius: '50%',
                        overflow: 'hidden',
                        marginBottom: '24px',
                        border: '4px solid white',
                        boxShadow: '0 8px 30px rgba(255,77,128,0.2)',
                        position: 'relative',
                        zIndex: 1,
                    }}>
                        <img
                            src="https://images.unsplash.com/photo-1519014816548-bf5fe059798b?auto=format&fit=crop&q=80&w=400"
                            alt="Nail beauty"
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                    </div>

                    <h3 style={{ fontSize: '20px', fontWeight: '800', color: '#111827', margin: '0 0 8px', fontFamily: 'Outfit, sans-serif', lineHeight: '1.3', position: 'relative', zIndex: 1 }}>
                        {language === 'es' ? 'Tu bienestar es nuestra ' : 'Your wellbeing is our '}
                        <span style={{ color: '#ff4d80' }}>{language === 'es' ? 'prioridad' : 'priority'}</span>
                    </h3>
                    <p style={{ fontSize: '13px', color: '#9ca3af', marginBottom: '28px', fontFamily: 'Outfit, sans-serif', lineHeight: '1.5', position: 'relative', zIndex: 1 }}>
                        {language === 'es' ? 'Déjanos consentirte y disfruta de la mejor experiencia.' : 'Let us pamper you and enjoy the best experience.'}
                    </p>

                    {/* Benefits */}
                    {[
                        { icon: <Star size={14} />, text: language === 'es' ? 'Profesionales Expertos' : 'Expert Professionals' },
                        { icon: <Sparkles size={14} />, text: language === 'es' ? 'Productos de Calidad' : 'Quality Products' },
                        { icon: <CheckCircle size={14} />, text: language === 'es' ? 'Atención Personalizada' : 'Personalized Care' },
                    ].map((b, i) => (
                        <div key={i} style={{
                            display: 'flex', alignItems: 'center', gap: '10px',
                            width: '100%', marginBottom: i < 2 ? '12px' : 0,
                            background: 'rgba(255,255,255,0.7)',
                            padding: '10px 14px', borderRadius: '12px',
                            boxShadow: '0 2px 8px rgba(255,77,128,0.08)',
                            position: 'relative', zIndex: 1,
                        }}>
                            <div style={{ color: '#ff4d80', flexShrink: 0 }}>{b.icon}</div>
                            <span style={{ fontSize: '13px', fontWeight: '600', color: '#374151', fontFamily: 'Outfit, sans-serif' }}>{b.text}</span>
                        </div>
                    ))}
                </div>

                <style>{`
                    @keyframes cmFadeIn { from{opacity:0} to{opacity:1} }
                    @keyframes cmSlideUp { from{opacity:0;transform:translateY(30px)} to{opacity:1;transform:translateY(0)} }
                    @keyframes cmSpin { 0%{transform:rotate(0deg)} 100%{transform:rotate(360deg)} }
                    @media (max-width: 680px) {
                        .cm-deco-panel { display: none !important; }
                    }
                `}</style>
            </div>
        </div>
    );
}
