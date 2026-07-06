import React, { useState } from 'react';
import { useLanguage } from '../../../context/LanguageContext';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

export default function TestimonialsSection() {
    const { language } = useLanguage();
    const [currentIndex, setCurrentIndex] = useState(0);

    const testimonials = [
        {
            text: {
                es: '"El mejor lugar para consentirte. El equipo es increíble y los resultados superan mis expectativas siempre."',
                en: '"The best place to pamper yourself. The team is amazing and the results always exceed my expectations."'
            },
            author: 'María González',
            role: {
                es: 'Cliente Satisfecha',
                en: 'Satisfied Customer'
            },
            avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200'
        },
        {
            text: {
                es: '"La atención es excepcional, me encanta cómo cuidan cada detalle en mis uñas. ¡Altamente recomendado!"',
                en: '"The service is exceptional, I love how they take care of every detail on my nails. Highly recommended!"'
            },
            author: 'Ana Rodríguez',
            role: {
                es: 'Cliente Regular',
                en: 'Regular Customer'
            },
            avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200'
        },
        {
            text: {
                es: '"El mejor salón en Anguilla. Los tratamientos faciales me han dejado la piel radiante y el servicio es de primera."',
                en: '"The best salon in Anguilla. The facial treatments have left my skin radiant and the service is top notch."'
            },
            author: 'Sarah Jenkins',
            role: {
                es: 'Cliente VIP',
                en: 'VIP Customer'
            },
            avatar: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&q=80&w=200'
        }
    ];

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1));
    };

    const current = testimonials[currentIndex];

    return (
        <section style={{
            background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-light))',
            color: 'white',
            padding: '5rem 0',
            position: 'relative',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center'
        }}>
            {/* Decorative background flowers */}
            <span style={{ position: 'absolute', top: '10%', left: '5%', fontSize: '4rem', opacity: 0.15, pointerEvents: 'none' }}>🌸</span>
            <span style={{ position: 'absolute', bottom: '10%', right: '5%', fontSize: '4rem', opacity: 0.15, pointerEvents: 'none' }}>🌺</span>

            <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    maxWidth: '800px',
                    margin: '0 auto',
                    padding: '0 40px'
                }}>
                    <Quote size={40} style={{ opacity: 0.3, marginBottom: '1.5rem' }} />
                    
                    <p style={{
                        fontSize: '1.6rem',
                        fontWeight: '600',
                        fontStyle: 'italic',
                        lineHeight: '1.5',
                        marginBottom: '2rem',
                        fontFamily: 'Outfit, sans-serif',
                        minHeight: '80px'
                    }}>
                        {current.text[language] || current.text['es']}
                    </p>

                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
                        <img 
                            src={current.avatar} 
                            alt={current.author} 
                            style={{
                                width: '64px',
                                height: '64px',
                                borderRadius: '50%',
                                border: '3px solid white',
                                objectFit: 'cover',
                                boxShadow: '0 8px 20px rgba(0,0,0,0.15)'
                            }}
                        />
                        <div>
                            <h4 style={{ margin: 0, fontSize: '1.15rem', fontWeight: '700', fontFamily: 'Outfit, sans-serif' }}>
                                {current.author}
                            </h4>
                            <span style={{ fontSize: '0.85rem', opacity: 0.8, fontWeight: '500', fontFamily: 'Outfit, sans-serif' }}>
                                {current.role[language] || current.role['es']}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Navigation arrows */}
                <button 
                    onClick={handlePrev}
                    style={{
                        position: 'absolute',
                        left: '20px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        background: 'rgba(255,255,255,0.15)',
                        border: 'none',
                        color: 'white',
                        width: '45px',
                        height: '45px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.3)'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.15)'}
                >
                    <ChevronLeft size={24} />
                </button>
                <button 
                    onClick={handleNext}
                    style={{
                        position: 'absolute',
                        right: '20px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        background: 'rgba(255,255,255,0.15)',
                        border: 'none',
                        color: 'white',
                        width: '45px',
                        height: '45px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.3)'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.15)'}
                >
                    <ChevronRight size={24} />
                </button>
            </div>
        </section>
    );
}
