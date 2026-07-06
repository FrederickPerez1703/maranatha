import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../../context/LanguageContext';
import LanguageSwitcher from '../LanguageSwitcher/LanguageSwitcher';
import ThemeSwitcher from '../ThemeSwitcher/ThemeSwitcher';
import { Calendar } from 'lucide-react';

export default function HeaderSection({ openModal, showBackButton, closeScheduleAppointment, openScheduleAppointment }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
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

  const handleReservarClick = (e) => {
    e.preventDefault();
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
            <div className="logo-container">
              <span className="logo-flower" style={{ cursor: 'pointer' }} onClick={() => handleCloseScheduleAppointment()}>🌸</span>
              <div className="logo" style={{ cursor: 'pointer' }} onClick={() => handleCloseScheduleAppointment()}>
                En Maranatha
                <span className="logo-sub">Belleza & Bienestar</span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <ul className="nav-links" style={{ display: 'flex', alignItems: 'center', margin: 0 }}>
                <li><a href="#home" onClick={(e) => { e.preventDefault(); handleCloseScheduleAppointment(); }}>{t('header.home')}</a></li>
                <li><a href="#services" onClick={(e) => { e.preventDefault(); scrollToSection('services'); }}>{t('header.services')}</a></li>
                <li><Link to="/about">Sobre Nosotros</Link></li>
                <li>
                  <a href="#" className="cta-button" onClick={handleReservarClick}>
                    <Calendar size={15} />
                    {t('header.bookNow')}
                  </a>
                </li>
              </ul>
              <div className="desktop-lang-switcher">
                <LanguageSwitcher />
                <ThemeSwitcher />
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="mobile-menu-button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <span style={{ color: 'var(--color-primary)' }}>✕</span> : '☰'}
            </button>
          </nav>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="mobile-menu">
              <a href="#home" onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}>{t('header.home')}</a>
              <a href="#services" onClick={(e) => { e.preventDefault(); scrollToSection('services'); }}>{t('header.services')}</a>
              <Link to="/about" onClick={() => setMobileMenuOpen(false)}>Sobre Nosotros</Link>
              <div style={{ padding: '10px 20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <LanguageSwitcher mobile={true} />
                <ThemeSwitcher mobile={true} />
              </div>
              <a href="#" className="mobile-cta-button" onClick={handleReservarClick}>
                <Calendar size={16} style={{ marginRight: '6px', display: 'inline' }} />
                {t('header.bookNow')}
              </a>
            </div>
          )}
        </header>
      )}
      <style>{`
        /* Botón de menú móvil */
        .mobile-menu-button {
          display: none;
          background: transparent;
          border: 1px solid var(--color-primary);
          font-size: 24px;
          color: var(--color-primary);
          cursor: pointer;
          padding: 6px 12px;
          z-index: 1001;
          border-radius: 20px;
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
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
          z-index: 1000;
          flex-direction: column;
          padding: 20px 0;
          border-bottom: 1px solid rgba(255, 77, 128, 0.08);
        }

        body.dark .mobile-menu {
          background: #1a1a1a;
          border-bottom: 1px solid rgba(255, 77, 128, 0.15);
        }

        .mobile-menu a {
          padding: 12px 30px;
          color: var(--color-gray-700);
          text-decoration: none;
          font-weight: 600;
          font-size: 0.95rem;
          transition: all 0.2s ease;
          font-family: 'Outfit', sans-serif;
        }

        body.dark .mobile-menu a {
          color: var(--color-gray-300);
        }

        .mobile-menu a:hover {
          background: var(--color-gray-50);
          color: var(--color-primary);
        }

        body.dark .mobile-menu a:hover {
          background: var(--color-gray-100);
        }

        .mobile-cta-button {
          background: var(--gradient-primary) !important;
          color: white !important;
          margin: 10px 20px;
          padding: 12px 24px !important;
          border-radius: 50px;
          text-align: center;
          font-weight: 700;
          font-size: 0.95rem;
          box-shadow: 0 4px 15px rgba(255, 77, 128, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Outfit', sans-serif;
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
