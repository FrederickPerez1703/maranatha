import { useState } from 'react';
import Header from '../ui/HeaderSection/HeaderSection';
import Services from '../ui/Services/Services';
import Hero from '../ui/Hero/HeroSection';
import Modal from '../ui/Modal/ServiceModal';
import ContactModal from '../ui/Modal/ContactModal';
import Toast from '../ui/Toast/Toast';
import '../../App.css';
import servicesData from '../../data/servicesData';
import Footer from '../ui/Footer/Footer';
import { useLanguage } from '../../context/LanguageContext';


function LandingPage() {

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [overview, setOverview] = useState(true);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [currentService, setCurrentService] = useState(null);
  const [showBackButton, setShowBackButton] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [preSelectedService, setPreSelectedService] = useState(null);

  const { language, t } = useLanguage();
  const currentServicesData = servicesData[language] || servicesData['es'];

  const openServiceModal = (type) => {
    setCurrentService(type);
    setSelectedCategory(type);
    setModalOpen(true);
  };

  const getAllServices = () => {
    return Object.values(currentServicesData).reduce((acc, category) => {
      return [...acc, ...category.services];
    }, []);
  };

  const selectedServices = selectedCategory
    ? currentServicesData[selectedCategory]?.services || []
    : getAllServices();

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
        services={selectedServices}
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