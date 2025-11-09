import { useState } from 'react';
import Header from '../ui/HeaderSection/HeaderSection';
import Services from '../ui/Services/Services';
import Hero from '../ui/Hero/HeroSection';
import Modal from '../ui/Modal/ServiceModal';
import Contact from '../Contact';
import '../../App.css';
import servicesData from '../../data/servicesData';
import Footer from '../ui/Footer/Footer';


function LandingPage() {

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [overview, setOverview] = useState(true);
  const [ScheduleAppointment, setScheduleAppointment] = useState(false);
  const [currentService, setCurrentService] = useState(null);
  const [showBackButton, setShowBackButton] = useState(false);

  const openServiceModal = (type) => {
  setCurrentService(type); // <-- esto es lo importante
  setSelectedCategory(type);
  setModalOpen(true);
};

 const selectedServices = servicesData[selectedCategory]?.services || [];

  const openModal = (type) => {
    if (type === 'booking') {
      alert('¡Contacta con nosotros para reservar tu cita!');
    }
  };

   const closeServiceModal = () => {
    setModalOpen(false);
    setCurrentService(null);
    setShowBackButton(true);
  };

  const openModalScheduleAppointment = (service) => {
    setScheduleAppointment(true);
    setOverview(false);
  }
  const closeScheduleAppointment = () => {
    setScheduleAppointment(false);
    setOverview(true);
    setShowBackButton(false);
  };

  return (
    <>
        <Header openModal={openModal} 
        closeScheduleAppointment={closeScheduleAppointment}
        showBackButton = {showBackButton} />
        {overview && (
            <>
            <Hero />
            <Services openServiceModal={openServiceModal} />
            <Modal 
                isOpen={modalOpen} 
                serviceType={currentService}
                onClose={closeServiceModal}
                openScheduleAppointment={openModalScheduleAppointment}
            />
            <Footer />
            </>  
        )}
        {ScheduleAppointment && (
            <Contact services={selectedServices} />
        )}
    </>
  );
}

export default LandingPage;