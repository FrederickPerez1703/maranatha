import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../../context/LanguageContext';
import LanguageSwitcher from '../LanguageSwitcher/LanguageSwitcher';
import ThemeSwitcher from '../ThemeSwitcher/ThemeSwitcher';

export default function HeaderSection({ openModal, showBackButton, closeScheduleAppointment, openScheduleAppointment }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  const handleCloseScheduleAppointment = () => {
    scrollToSection('home');
    closeScheduleAppointment();
  };

  const handleReservarClick = () => {
    if (openScheduleAppointment) {
      openScheduleAppointment();
    } else {
      alert(t('header.contactAlert'));
    }
    setMobileMenuOpen(false);
  };

  return (
    <>
      {showBackButton ? (
        <div className="back-button-wrapper">
          <button className="back-button" onClick={handleCloseScheduleAppointment}>
            <span className="button-text">{t('header.back')}</span>
          </button>
        </div>
      ) : (
        <header className={`header ${scrolled ? 'scrolled' : ''}`}>
          <nav className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div className="logo">En Maranatha</div>

            {/* Desktop Navigation */}
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <ul className="nav-links" style={{ display: 'flex', alignItems: 'center', margin: 0 }}>
                <li><a href="#home" onClick={() => handleCloseScheduleAppointment()}>{t('header.home')}</a></li>
                <li><a href="#services" onClick={() => scrollToSection('services')}>{t('header.services')}</a></li>
                <li><Link to="/about">Sobre Nosotros</Link></li>
                <li><a href="#" className="cta-button" onClick={handleReservarClick}>{t('header.bookNow')}</a></li>
              </ul>
              <div className="desktop-lang-switcher">
                <LanguageSwitcher /><ThemeSwitcher />

              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="mobile-menu-button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <span style={{ color: '#333' }}>✕</span> : '☰'}
            </button>
          </nav>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="mobile-menu">
              <a href="#home" onClick={() => scrollToSection('home')}>{t('header.home')}</a>
              <a href="#services" onClick={() => scrollToSection('services')}>{t('header.services')}</a>
              <Link to="/about" style={{ padding: '15px 30px', color: '#333', textDecoration: 'none', fontWeight: '500', transition: 'background 0.3s ease' }} onClick={() => setMobileMenuOpen(false)}>Sobre Nosotros</Link>
              <div style={{ padding: '10px 20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <LanguageSwitcher mobile={true} />
                <ThemeSwitcher mobile={true} />
              </div>
              <a href="#" className="mobile-cta-button" onClick={handleReservarClick}>{t('header.bookNow')}</a>
            </div>
          )}
        </header>
      )}
      <style>{`
        /* Botón de menú móvil */
        .mobile-menu-button {
          display: none;
          background: rgba(255, 255, 255, 0.9);
          border: 2px solid #ff6b9d;
          font-size: 32px;
          color: #ff6b9d;
          cursor: pointer;
          padding: 8px 12px;
          z-index: 1001;
          border-radius: 8px;
          line-height: 1;
          font-weight: bold;
        }

        /* Menú móvil desplegable */
        .mobile-menu {
          display: none;
          position: fixed;
          top: 70px;
          left: 0;
          right: 0;
          background: white;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
          z-index: 1000;
          flex-direction: column;
          padding: 20px 0;
        }

        .mobile-menu a {
          padding: 15px 30px;
          color: #333;
          text-decoration: none;
          font-weight: 500;
          transition: background 0.3s ease;
        }

        .mobile-menu a:hover {
          background: #f9f9f9;
        }

        .mobile-cta-button {
          background: linear-gradient(135deg, #ff6b9d, #ff8fab) !important;
          color: white !important;
          margin: 10px 20px;
          padding: 12px 24px !important;
          border-radius: 25px;
          text-align: center;
          font-weight: bold;
        }

        @media (max-width: 768px) {
          /* Ocultar navegación de escritorio */
          .nav-links {
            display: none !important;
          }

          /* Mostrar botón de menú móvil */
          .mobile-menu-button {
            display: block !important;
          }

          /* Mostrar menú móvil cuando está abierto */
          .mobile-menu {
            display: flex !important;
          }

          /* Ocultar language switcher de escritorio */
          .desktop-lang-switcher {
            display: none;
          }
        }

        @media (min-width: 769px) {
          /* Ocultar elementos móviles en escritorio */
          .mobile-menu-button {
            display: none !important;
          }

          .mobile-menu {
            display: none !important;
          }

          /* Mostrar botones en línea horizontal en desktop */
          .desktop-lang-switcher {
            display: flex;
            flex-direction: row;
            align-items: center;
            gap: 10px;
            margin-left: 20px;
          }
        }
      `}</style>
    </>
  );
}
