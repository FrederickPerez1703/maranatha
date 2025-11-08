import { useState, useEffect } from 'react';;

export default function HeaderSection({ openModal ,showBackButton, closeScheduleAppointment}) {
   const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleCloseScheduleAppointment = () => {
     scrollToSection('home');
     showBackButton = false
     closeScheduleAppointment();
}

  return (
    <>
      {showBackButton ? (
        
         <div className="back-button-wrapper">
      <button className="back-button" onClick={handleCloseScheduleAppointment}>
        <span className="button-text">Regresar</span>
      </button>
    </div>
      ) : (
      
      <header className={`header ${scrolled ? 'scrolled' : ''}`}>
        <nav className="container">
          <div className="logo">En Maranatha</div>
          <ul className="nav-links">
            <li><a href="#home" onClick={() => handleCloseScheduleAppointment()}>Home</a></li>
            {/*<li><a href="#about" onClick={() => scrollToSection('about')}>About</a></li>*/}
            <li><a href="#services" onClick={() => scrollToSection('services')}>Servicios</a></li>
            {/*<li><a href="#testimonials" onClick={() => scrollToSection('testimonials')}>Testimonios</a></li>*/}
            {/*<li> <a href="#" onClick={openContactModal}>Contacto</a></li>*/}
            <li><a href="#" className="cta-button" onClick={() => openModal('booking')}>Reservar Ahora</a></li>
          </ul>
        </nav>
      </header>
       )}
    </>
  );
};

