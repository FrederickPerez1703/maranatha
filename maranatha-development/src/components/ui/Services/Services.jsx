import React from 'react';
import { useLanguage } from '../../../context/LanguageContext';
import { useTheme } from '../../../context/ThemeContext';

export default function Services({ openServiceModal }) {
  const { t } = useLanguage();
  const { theme } = useTheme();

  const serviceCards = [
    { type: 'nails', icon: '💅', title: t('services.nailsTitle'), desc: t('services.nailsDesc') },
    { type: 'hair', icon: '💇‍♀️', title: t('services.hairTitle'), desc: t('services.hairDesc') },
    { type: 'facial', icon: '✨', title: t('services.facialTitle'), desc: t('services.facialDesc') },
    { type: 'makeup', icon: '💄', title: t('services.makeupTitle'), desc: t('services.makeupDesc') },
    { type: 'facial', icon: '🌸', title: t('services.relaxTitle'), desc: t('services.relaxDesc') },
    { type: 'hair', icon: '💎', title: t('services.premiumTitle'), desc: t('services.premiumDesc') }
  ];

  return (
    <section className="services-section-mock" id="services" style={{ 
      padding: '5rem 0',
      background: theme === 'dark' ? '#111827' : 'linear-gradient(180deg, #ffffff 0%, #fff7f9 100%)',
      transition: 'background 0.3s ease'
    }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <span style={{ 
            color: 'var(--color-primary)', 
            fontSize: '0.85rem', 
            fontWeight: '800', 
            letterSpacing: '2px',
            textTransform: 'uppercase',
            fontFamily: 'Outfit, sans-serif',
            display: 'block',
            marginBottom: '0.5rem'
          }}>
            {t('services.subhead')}
          </span>
          <h2 style={{ 
            fontSize: '2.5rem', 
            fontWeight: '800', 
            color: theme === 'dark' ? '#ffffff' : 'var(--color-gray-900)',
            fontFamily: 'Outfit, sans-serif',
            marginBottom: '1rem'
          }}>
            {t('services.title')}
          </h2>
          <p style={{ 
            fontSize: '1.1rem', 
            color: theme === 'dark' ? 'var(--color-gray-400)' : 'var(--color-gray-600)',
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: '1.6'
          }}>
            {t('services.subtitle')}
          </p>
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
          gap: '2rem' 
        }}>
          {serviceCards.map((s, i) => (
            <div
              className="service-card-mock"
              key={i}
              onClick={() => openServiceModal(s.type)}
              style={{
                background: theme === 'dark' ? '#1f2937' : '#ffffff',
                borderRadius: '24px',
                padding: '2.5rem 2rem',
                boxShadow: theme === 'dark' ? '0 10px 30px rgba(0,0,0,0.2)' : '0 10px 30px rgba(255, 77, 128, 0.02)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                border: theme === 'dark' ? '1px solid rgba(255, 77, 128, 0.1)' : '1px solid rgba(0,0,0,0.02)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                position: 'relative'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.boxShadow = theme === 'dark' 
                  ? '0 15px 40px rgba(255, 77, 128, 0.15)' 
                  : '0 15px 40px rgba(255, 77, 128, 0.08)';
                e.currentTarget.querySelector('.service-dash').style.width = '60px';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = theme === 'dark' 
                  ? '0 10px 30px rgba(0,0,0,0.2)' 
                  : '0 10px 30px rgba(255, 77, 128, 0.02)';
                e.currentTarget.querySelector('.service-dash').style.width = '30px';
              }}
            >
              <div style={{
                width: '70px',
                height: '70px',
                borderRadius: '50%',
                background: 'rgba(255, 77, 128, 0.08)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '2rem',
                marginBottom: '1.5rem',
                color: 'var(--color-primary)'
              }}>
                {s.icon}
              </div>
              <h3 style={{
                fontSize: '1.35rem',
                fontWeight: '700',
                fontFamily: 'Outfit, sans-serif',
                color: theme === 'dark' ? '#ffffff' : 'var(--color-gray-900)',
                marginBottom: '0.75rem'
              }}>
                {s.title}
              </h3>
              <p style={{
                fontSize: '0.95rem',
                color: theme === 'dark' ? 'var(--color-gray-400)' : 'var(--color-gray-500)',
                lineHeight: '1.5',
                flexGrow: 1
              }}>
                {s.desc}
              </p>
              
              {/* Decorative dash at the bottom of the card */}
              <div 
                className="service-dash"
                style={{
                  width: '30px',
                  height: '4px',
                  borderRadius: '2px',
                  background: 'var(--color-primary)',
                  marginTop: '1.5rem',
                  transition: 'width 0.3s ease'
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
