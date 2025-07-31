import React from 'react';


export default function Hero() {
  return (
    <section className="hero" id="home">
      <div className="floating-elements">
        <div className="floating-item">💄</div>
        <div className="floating-item">✨</div>
        <div className="floating-item">💅</div>
      </div>

      <div className="container">
        <div className="hero-content">
          <div className="hero-text">
            <h1>En Maranatha</h1>
            <p>
              Nos encargamos de darte el mejor servicio para que usted solo se relaje y disfrute. Transformamos tu belleza natural con técnicas profesionales y productos de alta calidad.
            </p>
            <a href="#services" className="hero-button">Descubre Nuestros Servicios</a>
          </div>

          <div className="hero-visual">
            <div className="beauty-items">
              {[
                { icon: '💅', title: 'Manicura & Pedicura', desc: 'Cuidado profesional para tus uñas' },
                { icon: '💇‍♀️', title: 'Peluquería', desc: 'Cortes y peinados modernos' },
                { icon: '✨', title: 'Tratamientos', desc: 'Faciales y cuidado de la piel' },
                { icon: '💄', title: 'Maquillaje', desc: 'Para ocasiones especiales' },
                { icon: '🌸', title: 'Relajación', desc: 'Masajes y terapias' },
                { icon: '💎', title: 'Premium', desc: 'Servicios VIP exclusivos' }
              ].map((item, idx) => (
                <div className="beauty-item" key={idx}>
                  <span className="icon">{item.icon}</span>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
