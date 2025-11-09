import React from 'react';

export default function Services({ openServiceModal }) {
  const services = [
    { icon: '💅', title: 'Cuidado de Uñas', desc: 'Manicura, pedicura, uñas acrílicas, etc.', type: 'nails' },
    { icon: '💇‍♀️', title: 'Peluquería Completa', desc: 'Corte, color, mechas y más', type: 'hair' },
    { icon: '✨', title: 'Tratamientos Faciales', desc: 'Limpiezas, hidratación, anti-edad', type: 'facial' },
    { icon: '💄', title: 'Maquillaje Profesional', desc: 'Bodas, quinceañeras y eventos', type: 'makeup' }
  ];

  return (
    <section className="services" id="services">
      <div className="container">
        <h2>Nuestros Servicios</h2>
        <div className="services-grid">
          {services.map((s, i) => (
            <div className="service-card" key={i} onClick={() => openServiceModal(s.type)}>
              <span className="service-icon">{s.icon}</span>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
