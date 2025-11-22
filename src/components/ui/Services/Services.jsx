import React from 'react';
import { useLanguage } from '../../../context/LanguageContext';

export default function Services({ openServiceModal }) {
  const { t, language } = useLanguage();

  const services = [
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
          {services.map((s, i) => (
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
