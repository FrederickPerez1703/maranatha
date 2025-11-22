import { useState, useEffect } from 'react';
import { useLanguage } from '../../../context/LanguageContext';
import LanguageSwitcher from '../LanguageSwitcher/LanguageSwitcher';

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
                <li><a href="#" className="cta-button" onClick={handleReservarClick}>{t('header.bookNow')}</a></li>
              </ul>
              <div className="desktop-lang-switcher">
                <LanguageSwitcher />
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="mobile-menu-button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? '✕' : '☰'}
            </button>
          </nav>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="mobile-menu">
              <a href="#home" onClick={() => scrollToSection('home')}>{t('header.home')}</a>
              <a href="#services" onClick={() => scrollToSection('services')}>{t('header.services')}</a>
              <div style={{ padding: '10px 20px' }}>
                <LanguageSwitcher />
              </div>
              <a href="#" className="mobile-cta-button" onClick={handleReservarClick}>{t('header.bookNow')}</a>
            </div>
          )}
        </header>
      )}
      <style>{`
        @media (max-width: 768px) {
          .desktop-lang-switcher {
            display: none;
          }
        }
      `}</style>
    </>
  );
}
