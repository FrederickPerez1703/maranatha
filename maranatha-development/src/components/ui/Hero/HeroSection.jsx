import { useLanguage } from '../../../context/LanguageContext';

export default function Hero() {
  const { t } = useLanguage();

  // Split title to highlight the last two words ("Belleza Natural" / "Natural Beauty")
  const titleText = t('hero.title');
  const words = titleText.split(' ');
  const mainTitle = words.slice(0, -2).join(' ');
  const highlightedTitle = words.slice(-2).join(' ');

  const heroFeatures = [
    { icon: '🌸', text: t('hero.feature1') },
    { icon: '🍃', text: t('hero.feature2') },
    { icon: '💖', text: t('hero.feature3') }
  ];

  return (
    <section className="hero" id="home">
      {/* Decorative background gradients */}
      <div className="hero-bg-blobs">
        <div className="hero-blob blob-1"></div>
        <div className="hero-blob blob-2"></div>
      </div>

      <div className="container">
        <div className="hero-content">
          <div className="hero-text">
            <h1>
              {mainTitle} <br />
              <span className="text-highlight">{highlightedTitle}</span>
            </h1>
            <p className="hero-subtitle-p">
              {t('hero.subtitle')}
            </p>
            <a href="#services" className="hero-cta-button-main">
              {t('hero.cta')}
              <span className="arrow">→</span>
            </a>

            {/* Feature badges underneath */}
            <div className="hero-features-list">
              {heroFeatures.map((feat, idx) => (
                <div className="hero-feature-item" key={idx}>
                  <span className="feature-icon-wrapper">{feat.icon}</span>
                  <span className="feature-text">{feat.text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-image-wrapper">
              <div className="hero-image-circle">
                <img 
                  src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=800" 
                  alt="Maranatha Beauty" 
                  className="hero-img"
                />
              </div>
              {/* Overlay floral elements representing mockup 3D overlap */}
              <span className="flower-overlay flower-1">🌸</span>
              <span className="flower-overlay flower-2">🌸</span>
              <span className="flower-overlay flower-3">🌺</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
