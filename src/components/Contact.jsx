import React, { useState } from 'react';
import { Calendar, Clock, Scissors, User, Mail, Phone, CheckCircle } from 'lucide-react';
import SendService from '../services/send/SendService'; // Ajusta la ruta según tu estructura


export default function Contact( { services } ) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: { name: "", price: "" },
    date: '',
    time: ''
  });

  const sendService = new SendService();

  const getLocalDateFromInput = (dateStr) => {
  const [year, month, day] = dateStr.split('-').map(Number);
  return new Date(year, month - 1, day); // Date(year, monthIndex, day)
};


  const generateTimeOptions = () => {
  const options = [];
  for (let hour = 9; hour <= 18; hour++) {
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


  const [isSubmitted, setIsSubmitted] = useState(false);

 

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Aquí normalmente enviarías los datos a tu servidor
    console.log('Datos de la cita:', formData);

    
    
    // Simular envío exitoso
    setIsSubmitted(true);
    
    sendService.sendMessage(formData);
    // Resetear formulario después de 3 segundos
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: { name: "", price: "" },
        date: '',
        time: ''
      });
    }, 10000);
    
  };

  const handleInputChange = (field, value) => {
     setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (isSubmitted) {
    return (
      <div style={{ maxWidth: '610px', margin: '0 auto', padding: '24px', backgroundColor: 'white', minHeight: '110vh' }}>
        <div style={{ textAlign: 'center', paddingTop: '49px', paddingBottom: '49px' }}>
          <CheckCircle style={{ margin: '0 auto 16px auto', height: '64px', width: '69px', color: '#10b981' }} />
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1f2937', marginBottom: '8px' }}>¡Cita Agendada!</h2>
          <p style={{ color: '#6b7280', marginBottom: '16px' }}>
            Hemos recibido tu solicitud de cita para <strong>{formData.service.name}</strong> ({formData.service.price})
          </p>
          <div style={{ backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '8px', padding: '16px', marginBottom: '24px' }}>
            <p style={{ fontSize: '14px', color: '#15803d' }}>
              <strong>Fecha:</strong> {getLocalDateFromInput(formData.date).toLocaleDateString('es-ES', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })} a las {' '}
              {new Date(`1970-01-01T${formData.time}`).toLocaleTimeString('es-ES', {
                hour: 'numeric',
                minute: '2-digit',
                hour12: true,
              })}
            </p>
            <p style={{ fontSize: '14px', color: '#15803d', marginTop: '4px' }}>
              <strong>Cliente:</strong> {formData.name}
            </p>
          </div>
          <p style={{ fontSize: '14px', color: '#6b7280' }}>
            Te contactaremos pronto para confirmar tu cita
          </p>
        </div>
      </div>
    );
  }

  return (
     <div style={{ maxWidth: '600px', margin: '0 auto', padding: '24px', backgroundColor: 'white', minHeight: '100vh' }}>
      <div style={{ marginBottom: '32px', textAlign: 'center' }}>
        <Scissors style={{ margin: '0 auto 16px auto', height: '48px', width: '48px', color: '#9333ea' }} />
        <h1 style={{ fontSize: '30px', fontWeight: 'bold', color: '#1f2937', marginBottom: '8px' }}>Agendar Cita</h1>
        <p style={{ color: '#6b7280' }}>Reserva tu cita en nuestro salón de belleza</p>
      </div>

      <div style={{ backgroundColor: 'white', borderRadius: '8px', border: '1px solid #e5e7eb', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', padding: '24px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Información del cliente */}
          <div>
            <h2 style={{ fontSize: '18px', fontWeight: '600', color: '#1f2937', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <User style={{ height: '20px', width: '20px' }} />
              Información del Cliente
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
                  Nombre completo *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => {
                         const value = e.target.value;

                        // Validar: solo letras (con acentos y ñ) y espacios
                        const soloLetrasYEspacios = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/.test(value);

                        // Contar espacios
                        const espacios = (value.match(/ /g) || []).length;

                        if (soloLetrasYEspacios && espacios <= 2) {
                          handleInputChange('name', value);
                          e.target.style.borderColor = '#0bf732ff'
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
                  placeholder="Tu nombre completo"
                  onFocus={(e) => e.target.style.borderColor = '#9333ea'}
                  onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    onBlur={(e) => {
                        e.target.style.borderColor = '#d1d5db';

                        const value = e.target.value;
                        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

                        if (!emailRegex.test(value)) {
                          e.target.style.borderColor = '#ef4444';

                        }else {
                          e.target.style.borderColor = '#09f143ff';
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
                    placeholder="tu@email.com"
                    onFocus={(e) => e.target.style.borderColor = '#9333ea'}
                  
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
                    Teléfono *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    style={{ 
                      width: '100%', 
                      padding: '12px 16px', 
                      border: '1px solid #d1d5db', 
                      borderRadius: '8px', 
                      fontSize: '16px',
                      outline: 'none'
                    }}
                    placeholder="+1 (555) 123-4567"
                    onFocus={(e) => e.target.style.borderColor = '#9333ea'}
                    onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Servicio */}
          <div>
            <h2 style={{ fontSize: '18px', fontWeight: '600', color: '#1f2937', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Scissors style={{ height: '20px', width: '20px' }} />
              Servicio
            </h2>
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
                Selecciona el servicio *
              </label>
              <select
                value={formData.service.name}
                onChange={(e) => {const selected = services.find(s => s.name === e.target.value);
                  handleInputChange('service', selected)}}
                style={{ 
                  width: '100%', 
                  padding: '12px 10px', 
                  border: '1px solid #d1d5db', 
                  borderRadius: '8px', 
                  fontSize: '16px',
                  backgroundColor: 'white',
                  outline: 'none'
                }}
                onFocus={(e) => e.target.style.borderColor = '#9333ea'}
                onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
              >
                {services.map(service => (
                  <option key={service.name} value={service.name}>{service.name}
                    : {service.price}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Fecha y Hora */}
          <div>
            <h2 style={{ fontSize: '18px', fontWeight: '600', color: '#1f2937', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Calendar style={{ height: '20px', width: '20px' }} />
              Fecha y Hora
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
                  Fecha preferida *
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
                    outline: 'none',
                    appearance: 'none',
                    WebkitAppearance: 'none',
                    backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'16\' height=\'16\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%239333ea\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\' class=\'feather feather-chevron-down\'%3E%3Cpolyline points=\'6 9 12 15 18 9\'/%3E%3C/svg%3E")',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 12px center',
                    paddingRight: '40px'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#9333ea'}
                  onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
                  Hora preferida *
                </label>
                <div style={{ display: 'flex', gap: '11px' }}>
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
                        outline: 'none',
                        appearance: 'none',
                        WebkitAppearance: 'none',
                        backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'16\' height=\'16\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%239333ea\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\' class=\'feather feather-chevron-down\'%3E%3Cpolyline points=\'6 9 12 15 18 9\'/%3E%3C/svg%3E")',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'right 12px center',
                        paddingRight: '40px'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#9333ea'}
                    onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                  >
                    <option   value="">Hora</option>
                    {generateTimeOptions()}
                  </select>
                </div>
              </div>
            </div>
            <p style={{ fontSize: '12px', color: '#6b7280', marginTop: '8px' }}>
              Horario de atención: 9:00 AM - 6:30 PM
            </p>
          </div>

          {/* Botón de envío */}
          <div style={{ paddingTop: '16px' }}>
            <button
              onClick={handleSubmit}
              disabled={!formData.name || !formData.email || !formData.phone || !formData.date || !formData.time}
              style={{ 
                width: '100%', 
                padding: '16px 24px', 
                backgroundColor: (!formData.name || !formData.email || !formData.phone || !formData.date || !formData.time) ? '#d1d5db' : '#9333ea',
                color: 'white', 
                fontWeight: '600', 
                borderRadius: '8px', 
                border: 'none',
                cursor: (!formData.name || !formData.email || !formData.phone || !formData.date || !formData.time) ? 'not-allowed' : 'pointer',
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                gap: '8px',
                fontSize: '16px',
                transition: 'background-color 0.2s'
              }}
              onMouseOver={(e) => {
                if (!e.target.disabled) {
                  e.target.style.backgroundColor = '#7c3aed';
                }
              }}
              onMouseOut={(e) => {
                if (!e.target.disabled) {
                  e.target.style.backgroundColor = '#9333ea';
                }
              }}
            >
              <Calendar style={{ height: '20px', width: '20px' }} />
              Agendar Mi Cita
            </button>
          </div>

          <div style={{ textAlign: 'center' }}>
            <p style={{ fontSize: '12px', color: '#6b7280' }}>
              * Campos obligatorios. Te contactaremos para confirmar tu cita.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}