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
      background: 'linear-gradient(180deg, #2d2d2d 0%, #1a1a1a 100%)',
      color: 'white',
      paddingTop: '4rem',
      paddingBottom: '2rem'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
        {/* Main Footer Content */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '3rem', marginBottom: '3rem' }}>
          {/* About Section */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1.5rem', gap: '0.5rem' }}>
              <span style={{ fontSize: '2rem' }}>🌸</span>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: 'bold',
                margin: 0,
                background: 'linear-gradient(135deg, #ff6b9d, #ffa4c0)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                En Maranatha
              </h3>
            </div>
            <p style={{ color: '#b0b0b0', lineHeight: '1.6', marginBottom: '1.5rem' }}>
              {t('footer.aboutText')}
            </p>
            <div style={{ display: 'flex', gap: '1rem' }}>
              {socialMedia.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: 'rgba(255, 255, 255, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.3s ease',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.background = social.color;
                    e.currentTarget.style.transform = 'translateY(-3px)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '1.5rem', color: '#ff6b9d' }}>
              {t('footer.links')}
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {quickLinks.map((link) => (
                <li key={link.id} style={{ marginBottom: '0.75rem' }}>
                  {link.isRoute ? (
                    <Link
                      to={`/${link.id}`}
                      style={{ color: '#b0b0b0', textDecoration: 'none', transition: 'all 0.3s ease', display: 'inline-block' }}
                      onMouseOver={(e) => { e.currentTarget.style.color = '#ff6b9d'; e.currentTarget.style.transform = 'translateX(5px)'; }}
                      onMouseOut={(e) => { e.currentTarget.style.color = '#b0b0b0'; e.currentTarget.style.transform = 'translateX(0)'; }}
                    >
                      {link.name}
                    </Link>
                  ) : (
                    <a
                      href={`#${link.id}`}
                      onClick={(e) => { e.preventDefault(); scrollToSection(link.id); }}
                      style={{ color: '#b0b0b0', textDecoration: 'none', transition: 'all 0.3s ease', display: 'inline-block' }}
                      onMouseOver={(e) => { e.currentTarget.style.color = '#ff6b9d'; e.currentTarget.style.transform = 'translateX(5px)'; }}
                      onMouseOut={(e) => { e.currentTarget.style.color = '#b0b0b0'; e.currentTarget.style.transform = 'translateX(0)'; }}
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
            <h4 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '1.5rem', color: '#ff6b9d' }}>
              {t('services.title')}
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {services.map((service, idx) => (
                <li key={idx} style={{ marginBottom: '0.75rem', color: '#b0b0b0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#ff6b9d' }}></span>
                  {service}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '1.5rem', color: '#ff6b9d' }}>
              {t('footer.contact')}
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                <MapPin size={20} style={{ color: '#ff6b9d', marginTop: '2px', flexShrink: 0 }} />
                <span style={{ color: '#b0b0b0', lineHeight: '1.5' }}>Long bay, Anguilla.</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Phone size={20} style={{ color: '#ff6b9d', flexShrink: 0 }} />
                <a href="tel:+12645820476" style={{ color: '#b0b0b0', textDecoration: 'none', transition: 'color 0.3s ease' }}
                  onMouseOver={(e) => e.currentTarget.style.color = '#ff6b9d'}
                  onMouseOut={(e) => e.currentTarget.style.color = '#b0b0b0'}>
                  +1 (264) 582-0476
                </a>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                <Clock size={20} style={{ color: '#ff6b9d', marginTop: '2px', flexShrink: 0 }} />
                <div style={{ color: '#b0b0b0', lineHeight: '1.5' }}>
                  <div>{language === 'es' ? 'Lun - Sáb' : 'Mon - Sat'}: 9:00 AM - 6:30 PM</div>
                  <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>{language === 'es' ? 'Domingo: Cerrado' : 'Sunday: Closed'}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div style={{ background: 'linear-gradient(135deg, rgba(255, 107, 157, 0.1), rgba(255, 139, 171, 0.1))', borderRadius: '20px', padding: '2rem', marginBottom: '3rem', border: '1px solid rgba(255, 107, 157, 0.2)' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '1rem' }}>
            <h4 style={{ fontSize: '1.3rem', fontWeight: 'bold', margin: 0, color: '#ff6b9d' }}>
              ✨ {t('footer.newsletterTitle')}
            </h4>
            <p style={{ color: '#b0b0b0', margin: 0, maxWidth: '500px' }}>
              {t('footer.newsletterDesc')}
            </p>
            <div style={{ display: 'flex', gap: '0.5rem', width: '100%', maxWidth: '500px', flexWrap: 'wrap', justifyContent: 'center' }}>
              <input type="email" placeholder={t('footer.newsletterPlaceholder')} style={{ flex: 1, minWidth: '250px', padding: '12px 20px', borderRadius: '50px', border: '2px solid rgba(255, 107, 157, 0.3)', background: 'rgba(255, 255, 255, 0.05)', color: 'white', fontSize: '1rem', outline: 'none', transition: 'all 0.3s ease' }}
                onFocus={(e) => e.currentTarget.style.borderColor = '#ff6b9d'}
                onBlur={(e) => e.currentTarget.style.borderColor = 'rgba(255, 107, 157, 0.3)'}
              />
              <button style={{ padding: '12px 30px', borderRadius: '50px', border: 'none', background: 'linear-gradient(135deg, #ff6b9d, #ff8fab)', color: 'white', fontWeight: 'bold', fontSize: '1rem', cursor: 'pointer', transition: 'all 0.3s ease', boxShadow: '0 4px 15px rgba(255, 107, 157, 0.3)' }}
                onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(255, 107, 157, 0.4)'; }}
                onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 15px rgba(255, 107, 157, 0.3)'; }}
              >
                {t('footer.subscribeBtn')}
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)', paddingTop: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <p style={{ margin: 0, color: '#888', fontSize: '0.9rem' }}>
            © {currentYear} En Maranatha. {t('footer.rights')}
          </p>
          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
            <a href="#" style={{ color: '#888', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.3s ease' }}
              onMouseOver={(e) => e.currentTarget.style.color = '#ff6b9d'}
              onMouseOut={(e) => e.currentTarget.style.color = '#888'}>
              {t('footer.privacy')}
            </a>
            <a href="#" style={{ color: '#888', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.3s ease' }}
              onMouseOver={(e) => e.currentTarget.style.color = '#ff6b9d'}
              onMouseOut={(e) => e.currentTarget.style.color = '#888'}>
              {t('footer.terms')}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
