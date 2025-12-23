const servicesData = {
  es: {
    nails: {
      icon: "💅",
      title: "Cuidado de Uñas",
      subtitle: "Transformamos tus manos y pies con técnicas profesionales",
      services: [
        { name: "Manicura" },
        { name: "Manicura Clásica" },
        { name: "Manicura Francesa" },
        { name: "Uñas Acrílicas" },
        { name: "Gel Polish" },
        { name: "Nail Art Personalizado" },
        { name: "Pedicura" },
        { name: "Pedicura Spa" },
        { name: "Pedicura + Manicura" }
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
        { name: "Corte de Cabello" },
        { name: "Lavado + Peinado" },
        { name: "Coloración Completa" },
        { name: "Mechas/Highlights" },
        { name: "Tratamiento Keratina" },
        { name: "Peinado Especial" },
        { name: "Extensiones" },
        { name: "Trenzas" }
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
        { name: "Limpieza Facial Básica" },
        { name: "Limpieza Profunda" },
        { name: "Facial Hidratante" },
        { name: "Tratamiento Anti-edad" },
        { name: "Peeling Químico" },
        { name: "Mascarilla de Oro" },
        { name: "Microdermoabrasión" }
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
        { name: "Maquillaje de Día" },
        { name: "Maquillaje de Noche" },
        { name: "Maquillaje de Novia" },
        { name: "Maquillaje XV Años" },
        { name: "Maquillaje Graduación" },
        { name: "Prueba de Maquillaje" },
        { name: "Clase de Automaquillaje" }
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
  },
  en: {
    nails: {
      icon: "💅",
      title: "Nail Care",
      subtitle: "Transform your hands and feet with professional techniques",
      services: [
        { name: "Manicure" },
        { name: "Classic Manicure" },
        { name: "French Manicure" },
        { name: "Acrylic Nails" },
        { name: "Gel Polish" },
        { name: "Custom Nail Art" },
        { name: "Pedicure" },
        { name: "Spa Pedicure" },
        { name: "Pedicure + Manicure" }
      ],
      benefits: [
        { icon: "✨", title: "Duration", desc: "Up to 3 weeks" },
        { icon: "🎨", title: "Designs", desc: "Customized" },
        { icon: "💎", title: "Products", desc: "High Quality" },
        { icon: "🧴", title: "Care", desc: "Hydration included" }
      ],
      duration: "45 - 90 minutes",
      process: "Cleaning, preparation, application and professional finish"
    },
    hair: {
      icon: "💇‍♀️",
      title: "Full Hair Salon",
      subtitle: "Modern cuts and premium hair treatments",
      services: [
        { name: "Haircut" },
        { name: "Wash + Style" },
        { name: "Full Color" },
        { name: "Highlights" },
        { name: "Keratin Treatment" },
        { name: "Special Styling" },
        { name: "Extensions" },
        { name: "Braids" }
      ],
      benefits: [
        { icon: "✂️", title: "Techniques", desc: "Modern" },
        { icon: "🌟", title: "Products", desc: "Professional" },
        { icon: "💫", title: "Style", desc: "Personalized" },
        { icon: "🎯", title: "Advice", desc: "Specialized" }
      ],
      duration: "60 - 180 minutes",
      process: "Consultation, preparation, technique application and finish"
    },
    facial: {
      icon: "✨",
      title: "Facial Treatments",
      subtitle: "Professional care for radiant and healthy skin",
      services: [
        { name: "Basic Facial Cleaning" },
        { name: "Deep Cleaning" },
        { name: "Hydrating Facial" },
        { name: "Anti-aging Treatment" },
        { name: "Chemical Peel" },
        { name: "Gold Mask" },
        { name: "Microdermabrasion" }
      ],
      benefits: [
        { icon: "🌸", title: "Renewal", desc: "Cellular" },
        { icon: "💧", title: "Hydration", desc: "Deep" },
        { icon: "⚡", title: "Results", desc: "Immediate" },
        { icon: "🔬", title: "Technology", desc: "Advanced" }
      ],
      duration: "60 - 90 minutes",
      process: "Skin analysis, cleaning, specific treatment and hydration"
    },
    makeup: {
      icon: "💄",
      title: "Professional Makeup",
      subtitle: "Highlight your natural beauty for special occasions",
      services: [
        { name: "Day Makeup" },
        { name: "Night Makeup" },
        { name: "Bridal Makeup" },
        { name: "Sweet 16 Makeup" },
        { name: "Graduation Makeup" },
        { name: "Makeup Trial" },
        { name: "Self-makeup Class" }
      ],
      benefits: [
        { icon: "🎨", title: "Techniques", desc: "Professional" },
        { icon: "✨", title: "Products", desc: "Premium" },
        { icon: "📸", title: "Duration", desc: "All day" },
        { icon: "💝", title: "Style", desc: "Custom" }
      ],
      duration: "45 - 120 minutes",
      process: "Style consultation, skin preparation and professional application"
    }
  }
};

export default servicesData;
