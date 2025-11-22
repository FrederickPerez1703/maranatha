import { useLanguage } from '../../../context/LanguageContext';

export default function Hero() {
  const { t, language } = useLanguage();

  const beautyItems = [
    { icon: '💅', title: language === 'es' ? 'Manicura & Pedicura' : 'Manicure & Pedicure', desc: language === 'es' ? 'Cuidado profesional para tus uñas' : 'Professional nail care' },
    { icon: '💇‍♀️', title: language === 'es' ? 'Peluquería' : 'Hair Styling', desc: language === 'es' ? 'Cortes y peinados modernos' : 'Modern cuts and styles' },
    { icon: '✨', title: language === 'es' ? 'Tratamientos' : 'Treatments', desc: language === 'es' ? 'Faciales y cuidado de la piel' : 'Facials and skin care' },
    { icon: '💄', title: language === 'es' ? 'Maquillaje' : 'Makeup', desc: language === 'es' ? 'Para ocasiones especiales' : 'For special occasions' },
    { icon: '🌸', title: language === 'es' ? 'Relajación' : 'Relaxation', desc: language === 'es' ? 'Masajes y terapias' : 'Massages and therapies' },
    { icon: '💎', title: language === 'es' ? 'Premium' : 'Premium', desc: language === 'es' ? 'Servicios VIP exclusivos' : 'Exclusive VIP services' }
  ];

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
            <h1>{t('hero.title')}</h1>
            <p>
              {t('hero.subtitle')}
            </p>
            <a href="#services" className="hero-button">{t('hero.cta')}</a>
          </div>

          <div className="hero-visual">
            <div className="beauty-items">
              {beautyItems.map((item, idx) => (
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
