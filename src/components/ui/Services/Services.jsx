import React from 'react';
import { useLanguage } from '../../../context/LanguageContext';
import { useServices } from '../../../contexts/ServicesContext';

export default function Services({ openServiceModal }) {
  const { t, language } = useLanguage();
  const { getServicesByCategory } = useServices();

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

  // Crear array de CATEGORÍAS para mostrar (no servicios individuales)
  const displayServices = [];

  // Prioridad de categorías a mostrar
  const priorityCategories = ['Uñas', 'Cabello', 'Tratamientos Faciales', 'Maquillaje'];

  priorityCategories.forEach(category => {
    if (servicesByCategory[category] && servicesByCategory[category].some(s => s.active)) {
      const activeServicesInCategory = servicesByCategory[category].filter(s => s.active);
      const serviceNames = activeServicesInCategory.map(s => s.name).join(', ');

      displayServices.push({
        icon: categoryIcons[category],
        title: category,
        desc: serviceNames.length > 60 ? serviceNames.substring(0, 60) + '...' : serviceNames,
        type: categoryToType[category]
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
    <section className="services" id="services">
      <div className="container">
        <h2>{t('services.title')}</h2>
        <div className="services-grid">
          {displayServices.map((s, i) => (
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
