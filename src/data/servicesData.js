const servicesData = {
  es: {
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
  },
  en: {
    nails: {
      icon: "💅",
      title: "Nail Care",
      subtitle: "Transform your hands and feet with professional techniques",
      services: [
        { name: "Classic Manicure", price: "$25" },
        { name: "French Manicure", price: "$30" },
        { name: "Acrylic Nails", price: "$45" },
        { name: "Gel Polish", price: "$35" },
        { name: "Custom Nail Art", price: "$50" },
        { name: "Spa Pedicure", price: "$40" },
        { name: "Pedicure + Manicure", price: "$60" }
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
        { name: "Haircut", price: "$30" },
        { name: "Wash + Style", price: "$20" },
        { name: "Full Color", price: "$80" },
        { name: "Highlights", price: "$120" },
        { name: "Keratin Treatment", price: "$150" },
        { name: "Special Styling", price: "$50" },
        { name: "Extensions", price: "$200" }
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
        { name: "Basic Facial Cleaning", price: "$40" },
        { name: "Deep Cleaning", price: "$60" },
        { name: "Hydrating Facial", price: "$55" },
        { name: "Anti-aging Treatment", price: "$80" },
        { name: "Chemical Peel", price: "$100" },
        { name: "Gold Mask", price: "$120" },
        { name: "Microdermabrasion", price: "$90" }
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
        { name: "Day Makeup", price: "$35" },
        { name: "Night Makeup", price: "$50" },
        { name: "Bridal Makeup", price: "$100" },
        { name: "Sweet 16 Makeup", price: "$80" },
        { name: "Graduation Makeup", price: "$60" },
        { name: "Makeup Trial", price: "$40" },
        { name: "Self-makeup Class", price: "$70" }
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
