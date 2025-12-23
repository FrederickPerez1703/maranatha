import { useState } from 'react';
import Header from '../ui/HeaderSection/HeaderSection';
import Services from '../ui/Services/Services';
import Hero from '../ui/Hero/HeroSection';
import Modal from '../ui/Modal/ServiceModal';
import ContactModal from '../ui/Modal/ContactModal';
import Toast from '../ui/Toast/Toast';
import '../../App.css';
import Footer from '../ui/Footer/Footer';
import { useLanguage } from '../../context/LanguageContext';
import { useServices } from '../../contexts/ServicesContext';


function LandingPage() {

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(''); // Stores the 'type' (e.g. 'nails')
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [currentService, setCurrentService] = useState(null);
  const [showBackButton, setShowBackButton] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [preSelectedService, setPreSelectedService] = useState(null);

  const { t } = useLanguage();
  // We don't need to fetch services here just to pass them to ContactModal,
  // because ContactModal uses the Context directly.

  const openServiceModal = (type) => {
    setCurrentService(type);
    setSelectedCategory(type);
    setModalOpen(true);
  };

  const openModal = (type) => {
    if (type === 'booking') {
      setPreSelectedService(null);
      setContactModalOpen(true);
    }
  };

  const closeServiceModal = () => {
    setModalOpen(false);
    setCurrentService(null);
  };

  const openContactModal = (specificService = null) => {
    setPreSelectedService(specificService);
    setContactModalOpen(true);
    setModalOpen(false);
  };

  const closeContactModal = () => {
    setContactModalOpen(false);
    setPreSelectedService(null);
  };

  const handleBookingSuccess = () => {
    setShowToast(true);
  };

  return (
    <>
      <Header
        openModal={openModal}
        closeScheduleAppointment={closeContactModal}
        showBackButton={showBackButton}
        openScheduleAppointment={openContactModal}
      />
      <Hero />
      <Services openServiceModal={openServiceModal} />
      <Modal
        isOpen={modalOpen}
        serviceType={currentService}
        onClose={closeServiceModal}
        openScheduleAppointment={openContactModal}
      />
      <ContactModal
        isOpen={contactModalOpen}
        onClose={closeContactModal}
        onSuccess={handleBookingSuccess}
        preSelectedService={preSelectedService}
      />
      <Toast
        title={t('contactModal.successTitle')}
        message={t('contactModal.successMessage')}
        isVisible={showToast}
        onClose={() => setShowToast(false)}
        type="success"
      />
      <Footer />
    </>
  );
}

export default LandingPage;