import React, { useEffect } from 'react';
import { useLanguage } from '../../../context/LanguageContext';
import servicesData from '../../../data/servicesData';

const ServiceModal = ({ isOpen, serviceType, onClose, openScheduleAppointment }) => {
  const { t, language } = useLanguage();

  // Obtener los datos del servicio actual basados en el idioma y el tipo
  const currentServicesData = servicesData[language] || servicesData['es'];
  const service = currentServicesData[serviceType];

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Guardar el scroll actual y bloquear
      const scrollY = window.scrollY;
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

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !service) return null;

  return (
    <div className={`service-modal ${isOpen ? 'active' : ''}`} onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <button className="close-modal" onClick={onClose}>&times;</button>
          <span className="modal-icon">{service.icon}</span>
          <h2 className="modal-title">{service.title}</h2>
          <p className="modal-subtitle">{service.subtitle}</p>
        </div>

        <div className="modal-body">
          <div className="service-details">
            <div className="detail-section">
              <h3>{t('serviceModal.servicesAndPrices')}</h3>
              <p style={{ fontSize: '14px', color: '#ff6b9d', marginBottom: '10px', fontStyle: 'italic' }}>
                {t('serviceModal.selectInstruction')}
              </p>
              <ul className="service-list">
                {service.services.map((item, index) => (
                  <li
                    key={index}
                    onClick={() => {
                      openScheduleAppointment(item);
                      onClose();
                    }}
                    style={{ cursor: 'pointer', transition: 'all 0.2s' }}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 107, 157, 0.1)'}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                  >
                    <span>{item.name}</span>
                    <span className="service-price">{item.price}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="detail-section">
              <h3>{t('serviceModal.serviceInfo')}</h3>
              <p><strong>{t('serviceModal.duration')}:</strong> {service.duration}</p>
              <p><strong>{t('serviceModal.process')}:</strong> {service.process}</p>
              <p><strong>{t('serviceModal.includes')}:</strong> {t('serviceModal.includesText')}</p>
              <p><strong>{t('serviceModal.guarantee')}:</strong> {t('serviceModal.guaranteeText')}</p>
            </div>
          </div>

          <div className="benefits-grid">
            {service.benefits.map((benefit, index) => (
              <div key={index} className="benefit-item">
                <span className="benefit-icon">{benefit.icon}</span>
                <h4>{benefit.title}</h4>
                <p>{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="modal-footer">
          <button className="book-service-btn" onClick={() => {
            // Si no elige uno específico, pasamos el primero de la lista por defecto
            if (service.services && service.services.length > 0) {
              openScheduleAppointment(service.services[0]);
            } else {
              openScheduleAppointment(service);
            }
            onClose();
          }}>
            {t('serviceModal.bookService')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceModal;