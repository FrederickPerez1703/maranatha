import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, Instagram, Facebook, Twitter } from 'lucide-react';
import { useLanguage } from '../../../context/LanguageContext';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { t, language } = useLanguage();

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const quickLinks = [
    { name: t('header.home'), id: 'home', isRoute: false },
    { name: t('header.services'), id: 'services', isRoute: false },
    { name: 'Sobre Nosotros', id: 'about', isRoute: true },
    { name: t('footer.contact'), id: 'contact', isRoute: false }
  ];

  const services = [
    language === 'es' ? 'Manicura & Pedicura' : 'Manicure & Pedicure',
    language === 'es' ? 'Peluquería' : 'Hair Styling',
    language === 'es' ? 'Tratamientos Faciales' : 'Facial Treatments',
    language === 'es' ? 'Maquillaje Profesional' : 'Professional Makeup'
  ];

  const socialMedia = [
    { name: 'Instagram', icon: Instagram, url: '#', color: '#E4405F' },
    { name: 'Facebook', icon: Facebook, url: '#', color: '#1877F2' },
    { name: 'Twitter', icon: Twitter, url: '#', color: '#1DA1F2' }
  ];

  return (
    <footer style={{
      background: '#111827',
      color: 'white',
      paddingTop: '5rem',
      paddingBottom: '2rem',
      borderTop: '1px solid rgba(255, 77, 128, 0.15)',
      fontFamily: 'Outfit, sans-serif'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
        {/* Main Footer Content */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '3rem', marginBottom: '4rem' }}>
          {/* About Section */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1.5rem', gap: '0.75rem' }}>
              <span style={{ fontSize: '2rem' }}>🌸</span>
              <div>
                <h3 style={{
                  fontSize: '1.4rem',
                  fontWeight: '800',
                  margin: 0,
                  color: 'white',
                  fontFamily: 'Outfit, sans-serif'
                }}>
                  En Maranatha
                </h3>
                <span style={{ fontSize: '0.75rem', color: 'var(--color-primary)', fontWeight: '600', letterSpacing: '1px' }}>
                  BELLEZA & BIENESTAR
                </span>
              </div>
            </div>
            <p style={{ color: 'var(--color-gray-400)', fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '2rem' }}>
              {t('footer.aboutText')}
            </p>
            <div style={{ display: 'flex', gap: '12px' }}>
              {socialMedia.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '50%',
                    background: 'rgba(255, 77, 128, 0.1)',
                    color: 'var(--color-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.3s ease',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.background = 'var(--color-primary)';
                    e.currentTarget.style.color = '#ffffff';
                    e.currentTarget.style.transform = 'translateY(-3px)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 77, 128, 0.1)';
                    e.currentTarget.style.color = 'var(--color-primary)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '1.5rem', color: '#ffffff', fontFamily: 'Outfit, sans-serif' }}>
              {t('footer.links')}
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {quickLinks.map((link) => (
                <li key={link.id} style={{ marginBottom: '0.75rem' }}>
                  {link.isRoute ? (
                    <Link
                      to={`/${link.id}`}
                      style={{ color: 'var(--color-gray-400)', textDecoration: 'none', transition: 'all 0.3s ease', display: 'inline-block', fontSize: '0.9rem' }}
                      onMouseOver={(e) => { e.currentTarget.style.color = 'var(--color-primary)'; e.currentTarget.style.transform = 'translateX(5px)'; }}
                      onMouseOut={(e) => { e.currentTarget.style.color = 'var(--color-gray-400)'; e.currentTarget.style.transform = 'translateX(0)'; }}
                    >
                      {link.name}
                    </Link>
                  ) : (
                    <a
                      href={`#${link.id}`}
                      onClick={(e) => { e.preventDefault(); scrollToSection(link.id); }}
                      style={{ color: 'var(--color-gray-400)', textDecoration: 'none', transition: 'all 0.3s ease', display: 'inline-block', fontSize: '0.9rem' }}
                      onMouseOver={(e) => { e.currentTarget.style.color = 'var(--color-primary)'; e.currentTarget.style.transform = 'translateX(5px)'; }}
                      onMouseOut={(e) => { e.currentTarget.style.color = 'var(--color-gray-400)'; e.currentTarget.style.transform = 'translateX(0)'; }}
                    >
                      {link.name}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '1.5rem', color: '#ffffff', fontFamily: 'Outfit, sans-serif' }}>
              {t('services.title')}
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {services.map((service, idx) => (
                <li key={idx} style={{ marginBottom: '0.75rem', color: 'var(--color-gray-400)', display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.9rem' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--color-primary)' }}></span>
                  {service}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '1.5rem', color: '#ffffff', fontFamily: 'Outfit, sans-serif' }}>
              {t('footer.contact')}
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.9rem' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                <MapPin size={18} style={{ color: 'var(--color-primary)', marginTop: '2px', flexShrink: 0 }} />
                <span style={{ color: 'var(--color-gray-400)', lineHeight: '1.5' }}>Long bay, Anguilla.</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Phone size={18} style={{ color: 'var(--color-primary)', flexShrink: 0 }} />
                <a href="tel:+12645820476" style={{ color: 'var(--color-gray-400)', textDecoration: 'none', transition: 'color 0.3s ease' }}
                  onMouseOver={(e) => e.currentTarget.style.color = 'var(--color-primary)'}
                  onMouseOut={(e) => e.currentTarget.style.color = 'var(--color-gray-400)'}>
                  +1 (264) 582-0476
                </a>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                <Clock size={18} style={{ color: 'var(--color-primary)', marginTop: '2px', flexShrink: 0 }} />
                <div style={{ color: 'var(--color-gray-400)', lineHeight: '1.5' }}>
                  <div>{language === 'es' ? 'Lun - Sáb' : 'Mon - Sat'}: 9:00 AM - 6:30 PM</div>
                  <div style={{ fontSize: '0.85rem', opacity: 0.8 }}>{language === 'es' ? 'Domingo: Cerrado' : 'Sunday: Closed'}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div style={{ 
          background: 'linear-gradient(135deg, rgba(255, 77, 128, 0.08) 0%, rgba(255, 77, 128, 0.02) 100%)', 
          borderRadius: '24px', 
          padding: '2.5rem', 
          marginBottom: '4rem', 
          border: '1px solid rgba(255, 77, 128, 0.15)',
          textAlign: 'center'
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
            <h4 style={{ fontSize: '1.4rem', fontWeight: '800', margin: 0, color: '#ffffff', fontFamily: 'Outfit, sans-serif', display: 'flex', alignItems: 'center', gap: '8px' }}>
              ✉️ {t('footer.newsletterTitle')}
            </h4>
            <p style={{ color: 'var(--color-gray-400)', margin: 0, maxWidth: '540px', fontSize: '0.95rem', lineHeight: '1.6' }}>
              {t('footer.newsletterDesc')}
            </p>
            <div style={{ display: 'flex', gap: '0.5rem', width: '100%', maxWidth: '500px', flexWrap: 'wrap', justifyContent: 'center', marginTop: '0.5rem' }}>
              <input type="email" placeholder={t('footer.newsletterPlaceholder')} style={{ 
                flex: 1, 
                minWidth: '250px', 
                padding: '12px 24px', 
                borderRadius: '50px', 
                border: '1px solid rgba(255, 77, 128, 0.2)', 
                background: 'rgba(255, 255, 255, 0.03)', 
                color: 'white', 
                fontSize: '0.95rem', 
                outline: 'none', 
                transition: 'all 0.3s ease',
                fontFamily: 'Outfit, sans-serif'
              }}
                onFocus={(e) => e.currentTarget.style.borderColor = 'var(--color-primary)'}
                onBlur={(e) => e.currentTarget.style.borderColor = 'rgba(255, 77, 128, 0.2)'}
              />
              <button style={{ 
                padding: '12px 32px', 
                borderRadius: '50px', 
                border: 'none', 
                background: 'var(--gradient-primary)', 
                color: 'white', 
                fontWeight: '700', 
                fontSize: '0.95rem', 
                cursor: 'pointer', 
                transition: 'all 0.3s ease', 
                boxShadow: '0 4px 15px rgba(255, 77, 128, 0.25)',
                fontFamily: 'Outfit, sans-serif'
              }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(255, 77, 128, 0.35)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 15px rgba(255, 77, 128, 0.25)'; }}
              >
                {t('footer.subscribeBtn')}
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <p style={{ margin: 0, color: 'var(--color-gray-500)', fontSize: '0.85rem' }}>
            © {currentYear} En Maranatha. {t('footer.rights')}
          </p>
          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
            <a href="#" style={{ color: 'var(--color-gray-500)', textDecoration: 'none', fontSize: '0.85rem', transition: 'color 0.3s ease' }}
              onMouseOver={(e) => e.currentTarget.style.color = 'var(--color-primary)'}
              onMouseOut={(e) => e.currentTarget.style.color = 'var(--color-gray-500)'}>
              {t('footer.privacy')}
            </a>
            <a href="#" style={{ color: 'var(--color-gray-500)', textDecoration: 'none', fontSize: '0.85rem', transition: 'color 0.3s ease' }}
              onMouseOver={(e) => e.currentTarget.style.color = 'var(--color-primary)'}
              onMouseOut={(e) => e.currentTarget.style.color = 'var(--color-gray-500)'}>
              {t('footer.terms')}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
