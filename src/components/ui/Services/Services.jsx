import React from 'react';
import { useLanguage } from '../../../context/LanguageContext';
import { useServices } from '../../../contexts/ServicesContext';
import { useTheme } from '../../../context/ThemeContext';
import servicesData from '../../../data/servicesData';

export default function Services({ openServiceModal }) {
  const { t, language } = useLanguage();
  const { getServicesByCategory } = useServices();
  const { theme } = useTheme();

  // Obtener servicios activos agrupados por categoría
  const servicesByCategory = getServicesByCategory();

  // Mapeo de categorías a tipos para el modal
  const categoryToType = {
    'Uñas': 'nails',
    'Cabello': 'hair',
    'Maquillaje': 'makeup',
    'Tratamientos Faciales': 'facial',
    'Depilación': 'waxing',
    'Otros': 'other'
  };

  // Mapeo de categorías a iconos
  const categoryIcons = {
    'Uñas': '💅',
    'Cabello': '💇‍♀️',
    'Maquillaje': '💄',
    'Tratamientos Faciales': '✨',
    'Depilación': '🌟',
    'Otros': '💎'
  };

  // Helper para traducir nombres de servicios
  const getTranslatedServiceName = (originalName, categoryName) => {
    if (language === 'es') return originalName;

    const type = categoryToType[categoryName];
    if (!type) return originalName;

    // Buscar en los datos estáticos en español
    const esServices = servicesData['es'][type]?.services;
    if (!esServices) return originalName;

    const index = esServices.findIndex(s => s.name === originalName);

    // Devolver equivalente en idioma actual
    if (index !== -1 && servicesData[language][type]?.services[index]) {
      return servicesData[language][type].services[index].name;
    }

    return originalName;
  };

  // Crear array de CATEGORÍAS para mostrar (no servicios individuales)
  const displayServices = [];

  // Prioridad de categorías a mostrar
  const priorityCategories = ['Uñas', 'Cabello', 'Tratamientos Faciales', 'Maquillaje'];

  priorityCategories.forEach(category => {
    if (servicesByCategory[category] && servicesByCategory[category].some(s => s.active)) {
      const activeServicesInCategory = servicesByCategory[category].filter(s => s.active);

      // Traducir los nombres de los servicios
      const serviceNames = activeServicesInCategory
        .map(s => getTranslatedServiceName(s.name, category))
        .join(', ');

      const type = categoryToType[category];
      // Obtener el título traducido si está disponible
      const translatedTitle = type && servicesData[language][type]
        ? servicesData[language][type].title
        : category;

      displayServices.push({
        icon: categoryIcons[category],
        title: translatedTitle,
        desc: serviceNames.length > 60 ? serviceNames.substring(0, 60) + '...' : serviceNames,
        type: type
      });
    }
  });

  // Si no hay suficientes servicios, usar los por defecto
  if (displayServices.length === 0) {
    const defaultServices = [
      { icon: '💅', title: t('services.nails'), desc: language === 'es' ? 'Manicura, pedicura, uñas acrílicas, etc.' : 'Manicure, pedicure, acrylic nails, etc.', type: 'nails' },
      { icon: '💇‍♀️', title: t('services.hair'), desc: language === 'es' ? 'Corte, color, mechas y más' : 'Cut, color, highlights and more', type: 'hair' },
      { icon: '✨', title: t('services.facial'), desc: language === 'es' ? 'Limpiezas, hidratación, anti-edad' : 'Cleansing, hydration, anti-aging', type: 'facial' },
      { icon: '💄', title: t('services.makeup'), desc: language === 'es' ? 'Bodas, quinceañeras y eventos' : 'Weddings, sweet 16s and events', type: 'makeup' }
    ];

    return (
      <section className="services" id="services">
        <div className="container">
          <h2>{t('services.title')}</h2>
          <div className="services-grid">
            {defaultServices.map((s, i) => (
              <div className="service-card" key={i} onClick={() => openServiceModal(s.type)}>
                <span className="service-icon">{s.icon}</span>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Mostrar CATEGORÍAS (no servicios individuales)
  return (
    <section className="services" id="services" style={{ padding: '4rem 0' }}>
      <div className="container">
        <h2 style={{ textAlign: 'center', marginBottom: '3rem', fontSize: '2.5rem', fontWeight: 'bold', color: theme === 'dark' ? '#ffffff' : '#333' }}>
          {t('services.title')}
        </h2>
        <div className="services-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
          {displayServices.map((s, i) => {
            // Convertir la descripción de texto plano a un array de tags para visualización moderna
            const serviceTags = s.desc.split(', ').slice(0, 4);
            const hasMore = s.desc.split(', ').length > 4;

            return (
              <div
                className="service-card"
                key={i}
                onClick={() => openServiceModal(s.type)}
                style={{
                  background: 'white',
                  borderRadius: '20px',
                  padding: '2rem',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  border: '1px solid rgba(255, 107, 157, 0.1)',
                  position: 'relative',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1.5rem'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-10px)';
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(255, 107, 157, 0.15)';
                  e.currentTarget.querySelector('.arrow-icon').style.transform = 'translateX(5px)';
                  e.currentTarget.querySelector('.icon-bg').style.transform = 'scale(1.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.05)';
                  e.currentTarget.querySelector('.arrow-icon').style.transform = 'translateX(0)';
                  e.currentTarget.querySelector('.icon-bg').style.transform = 'scale(1)';
                }}
              >
                {/* Decorative background blob */}
                <div style={{
                  position: 'absolute',
                  top: '-50px',
                  right: '-50px',
                  width: '100px',
                  height: '100px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, rgba(255, 107, 157, 0.2) 0%, rgba(255, 255, 255, 0) 70%)',
                  zIndex: 0
                }} />

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', zIndex: 1 }}>
                  <div className="icon-bg" style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '16px',
                    background: 'rgba(255, 107, 157, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '30px',
                    transition: 'transform 0.3s ease'
                  }}>
                    {s.icon}
                  </div>
                  <div className="arrow-icon" style={{
                    color: '#ff6b9d',
                    fontSize: '20px',
                    transition: 'transform 0.3s ease'
                  }}>
                    ➜
                  </div>
                </div>

                <div style={{ zIndex: 1 }}>
                  <h3 style={{
                    fontSize: '1.5rem',
                    marginBottom: '1rem',
                    color: '#333',
                    fontWeight: '700',
                    lineHeight: '1.2',
                    minHeight: '3.6rem', // Force 2 lines of height for alignment
                    display: 'flex',
                    alignItems: 'flex-end' // Align text to bottom of the reserved space (optional, or center)
                  }}>
                    {s.title}
                  </h3>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {serviceTags.map((tag, tagIndex) => (
                      <span key={tagIndex} style={{
                        background: '#f8f9fa',
                        color: '#666',
                        padding: '6px 12px',
                        borderRadius: '20px',
                        fontSize: '0.85rem',
                        border: '1px solid #eee'
                      }}>
                        {tag.replace('...', '')}
                      </span>
                    ))}
                    {hasMore && (
                      <span style={{
                        background: 'rgba(255, 107, 157, 0.1)',
                        color: '#ff6b9d',
                        padding: '6px 12px',
                        borderRadius: '20px',
                        fontSize: '0.85rem',
                        fontWeight: '600'
                      }}>
                        + {language === 'es' ? 'más' : 'more'}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
