import React, { useEffect } from 'react';
import { useLanguage } from '../../../context/LanguageContext';
import { useServices } from '../../../contexts/ServicesContext';
import servicesData from '../../../data/servicesData';

const ServiceModal = ({ isOpen, serviceType, onClose, openScheduleAppointment }) => {
  const { t, language } = useLanguage();
  const { services } = useServices();
  const [showAllServices, setShowAllServices] = React.useState(false);

  // Obtener los datos del servicio actual basados en el idioma y el tipo
  const currentServicesData = servicesData[language] || servicesData['es'];
  const serviceFromData = currentServicesData[serviceType];

  // Mapeo de tipos a categorías
  const typeToCategory = {
    'nails': 'Uñas',
    'hair': 'Cabello',
    'makeup': 'Maquillaje',
    'facial': 'Tratamientos Faciales',
    'waxing': 'Depilación',
    'other': 'Otros'
  };

  // Obtener servicios reales de la categoría desde el contexto
  const category = typeToCategory[serviceType];
  const realServices = services.filter(s => s.category === category && s.active);

  // Helper para traducir nombres de servicios dinámicos
  const getTranslatedServiceName = (originalName, type) => {
    if (language === 'es') return originalName;

    // Buscar el índice del servicio en los datos estáticos en español
    const esServices = servicesData['es'][type]?.services;
    if (!esServices) return originalName;

    const index = esServices.findIndex(s => s.name === originalName);

    // Si se encuentra, devolver el correspondiente en el idioma actual (inglés)
    if (index !== -1 && servicesData[language][type]?.services[index]) {
      return servicesData[language][type].services[index].name;
    }

    return originalName;
  };

  // Si hay servicios reales, usar esos; si no, usar los datos estáticos
  let service = serviceFromData;

  if (realServices.length > 0) {
    // Si es maquillaje y hay un servicio con sub-servicios, usarlo
    const makeupServiceWithSubs = realServices.find(s => s.subServices && s.subServices.length > 0);

    if (makeupServiceWithSubs && serviceType === 'makeup') {
      service = {
        ...serviceFromData,
        services: makeupServiceWithSubs.subServices.map(subService => ({
          name: getTranslatedServiceName(subService, serviceType),
          price: '' // No mostrar precio para sub-servicios
        }))
      };
    } else {
      // Para otras categorías, mostrar los servicios reales
      service = {
        ...serviceFromData,
        services: realServices.map(s => ({
          name: getTranslatedServiceName(s.name, serviceType),
          price: '' // No mostrar precio aquí
        }))
      };
    }
  }

  useEffect(() => {
    if (isOpen) {
      setShowAllServices(false);
    }
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
                {service.services.slice(0, showAllServices ? service.services.length : 6).map((item, index) => (
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
                    {item.price && <span className="service-price">{item.price}</span>}
                  </li>
                ))}
              </ul>
              {service.services.length > 6 && (
                <button
                  onClick={() => setShowAllServices(!showAllServices)}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#ff6b9d';
                    e.currentTarget.style.color = 'white';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = '#ff6b9d';
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    margin: '15px auto 0',
                    padding: '8px 20px',
                    background: 'transparent',
                    border: '1px solid #ff6b9d',
                    borderRadius: '25px',
                    color: '#ff6b9d',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: '600',
                    transition: 'all 0.3s ease',
                    outline: 'none',
                    width: 'fit-content'
                  }}
                >
                  {showAllServices
                    ? (language === 'en' ? 'Show less' : 'Ver menos')
                    : (language === 'en' ? 'Show more services' : 'Ver más servicios')}
                  <span style={{
                    display: 'inline-block',
                    transform: showAllServices ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.3s ease'
                  }}>
                    ▼
                  </span>
                </button>
              )}
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