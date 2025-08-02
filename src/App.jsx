import { useState } from 'react';
import Header from './components/HeaderSection/HeaderSection';
import Hero from './components/Hero/HeroSection';
import Services from './components/Services/Services';
import Modal from './components/Modal/ServiceModal';
import Contact from './components/Contact';
import './App.css';
import servicesData from './data/servicesData';
import BeautySalonDashboard from './components/admin/BeautySalonDashboard/BeautySalonDashboard';

function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [overview, setOverview] = useState(true);
  const [ScheduleAppointment, setScheduleAppointment] = useState(false);
  const [currentService, setCurrentService] = useState(null);

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
  };

  const openModalScheduleAppointment = (service) => {
    setScheduleAppointment(true);
    setOverview(false);
  }
  const closeScheduleAppointment = () => {
    setScheduleAppointment(false);
    setOverview(true);
  };
  return (

    <>
      <BeautySalonDashboard />
    </>
    /*
    <>
    <Header openModal={openModal} 
      closeScheduleAppointment={closeScheduleAppointment} />
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
      </>  
    )}
      {ScheduleAppointment && (
        <Contact services={selectedServices} />
      )}
    </>  */

    
  );
     
}

export default App;
