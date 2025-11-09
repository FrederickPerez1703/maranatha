import React, { useEffect } from 'react';

const ServiceModal  = ({ isOpen, serviceType, onClose , openScheduleAppointment}) => {
  const servicesData = {
    nails: {
      icon: "💅",
      title: "Cuidado de Uñas",
      subtitle: "Transformamos tus manos y pies con técnicas profesionales",
      services: [
        { name: "Manicura Clásica", price: "$25" },
        { name: "Manicura Francesa", price: "$30" },
        { name: "Uñas Acrílicas", price: "$45" },
        { name: "Gel Polish", price: "$35" },
        { name: "Nail Art Personalizado", price: "$50" },
        { name: "Pedicura Spa", price: "$40" },
        { name: "Pedicura + Manicura", price: "$60" }
      ],
      benefits: [
        { icon: "✨", title: "Duración", desc: "Hasta 3 semanas" },
        { icon: "🎨", title: "Diseños", desc: "Personalizados" },
        { icon: "💎", title: "Productos", desc: "Alta calidad" },
        { icon: "🧴", title: "Cuidado", desc: "Hidratación incluida" }
      ],
      duration: "45 - 90 minutos",
      process: "Limpieza, preparación, aplicación y acabado profesional"
    },
    hair: {
      icon: "💇‍♀️",
      title: "Peluquería Completa",
      subtitle: "Cortes modernos y tratamientos capilares de primera calidad",
      services: [
        { name: "Corte de Cabello", price: "$30" },
        { name: "Lavado + Peinado", price: "$20" },
        { name: "Coloración Completa", price: "$80" },
        { name: "Mechas/Highlights", price: "$120" },
        { name: "Tratamiento Keratina", price: "$150" },
        { name: "Peinado Especial", price: "$50" },
        { name: "Extensiones", price: "$200" }
      ],
      benefits: [
        { icon: "✂️", title: "Técnicas", desc: "Modernas" },
        { icon: "🌟", title: "Productos", desc: "Profesionales" },
        { icon: "💫", title: "Estilo", desc: "Personalizado" },
        { icon: "🎯", title: "Asesoría", desc: "Especializada" }
      ],
      duration: "60 - 180 minutos",
      process: "Consulta, preparación, aplicación de técnicas y acabado"
    },
    facial: {
      icon: "✨",
      title: "Tratamientos Faciales",
      subtitle: "Cuidado profesional para una piel radiante y saludable",
      services: [
        { name: "Limpieza Facial Básica", price: "$40" },
        { name: "Limpieza Profunda", price: "$60" },
        { name: "Facial Hidratante", price: "$55" },
        { name: "Tratamiento Anti-edad", price: "$80" },
        { name: "Peeling Químico", price: "$100" },
        { name: "Mascarilla de Oro", price: "$120" },
        { name: "Microdermoabrasión", price: "$90" }
      ],
      benefits: [
        { icon: "🌸", title: "Renovación", desc: "Celular" },
        { icon: "💧", title: "Hidratación", desc: "Profunda" },
        { icon: "⚡", title: "Resultados", desc: "Inmediatos" },
        { icon: "🔬", title: "Tecnología", desc: "Avanzada" }
      ],
      duration: "60 - 90 minutos",
      process: "Análisis de piel, limpieza, tratamiento específico y hidratación"
    },
    makeup: {
      icon: "💄",
      title: "Maquillaje Profesional",
      subtitle: "Resalta tu belleza natural para ocasiones especiales",
      services: [
        { name: "Maquillaje de Día", price: "$35" },
        { name: "Maquillaje de Noche", price: "$50" },
        { name: "Maquillaje de Novia", price: "$100" },
        { name: "Maquillaje XV Años", price: "$80" },
        { name: "Maquillaje Graduación", price: "$60" },
        { name: "Prueba de Maquillaje", price: "$40" },
        { name: "Clase de Automaquillaje", price: "$70" }
      ],
      benefits: [
        { icon: "🎨", title: "Técnicas", desc: "Profesionales" },
        { icon: "✨", title: "Productos", desc: "Premium" },
        { icon: "📸", title: "Duración", desc: "Todo el día" },
        { icon: "💝", title: "Estilo", desc: "A medida" }
      ],
      duration: "45 - 120 minutos",
      process: "Consulta de estilo, preparación de piel y aplicación profesional"
    }
  };

  const service = servicesData[serviceType];

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !service) return null;

  const handleBookService = () => {
    openScheduleAppointment(service);
    onClose();
  };

  return (
    <div className={`service-modal ${isOpen ? 'active' : ''}`} onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <button className="close-modal" onClick={onClose}>&times;</button>
          <span className="modal-icon">{service.icon}</span>
          <h2 className="modal-title">{service.title}</h2>
          <p className="modal-subtitle">{service.subtitle}</p>
        </div>
        
        <div className="modal-body">
          <div className="service-details">
            <div className="detail-section">
              <h3>Servicios y Precios</h3>
              <ul className="service-list">
                {service.services.map((item, index) => (
                  <li key={index}>
                    <span>{item.name}</span>
                    <span className="service-price">{item.price}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="detail-section">
              <h3>Información del Servicio</h3>
              <p><strong>Duración:</strong> {service.duration}</p>
              <p><strong>Proceso:</strong> {service.process}</p>
              <p><strong>Incluye:</strong> Consulta personalizada y productos profesionales</p>
              <p><strong>Garantía:</strong> Satisfacción 100% garantizada</p>
            </div>
          </div>
          
          <div className="benefits-grid">
            {service.benefits.map((benefit, index) => (
              <div key={index} className="benefit-item">
                <span className="benefit-icon">{benefit.icon}</span>
                <h4>{benefit.title}</h4>
                <p>{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
        
        <div className="modal-footer">
          <button className="book-service-btn" onClick={handleBookService}>
            Reservar Este Servicio
          </button>
        </div>
      </div>
    </div>
  );
};
export default ServiceModal;