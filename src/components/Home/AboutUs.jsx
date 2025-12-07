import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Heart, Award, Users, Clock, MapPin, Phone, Mail, Instagram, Facebook } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import confetti from 'canvas-confetti';

export default function AboutUs() {
    const [scrolled, setScrolled] = useState(false);
    const navigate = useNavigate();
    const { t } = useLanguage();

    // Referencias para las animaciones de scroll
    const statsRef = useRef(null);
    const storyRef = useRef(null);
    const valuesRef = useRef(null);
    const teamRef = useRef(null);
    const contactRef = useRef(null);

    const [visibleSections, setVisibleSections] = useState({
        stats: false,
        story: false,
        values: false,
        team: false,
        contact: false
    });

    // Efecto de confetti al cargar
    useEffect(() => {
        window.scrollTo(0, 0);

        // Disparar confetti después de un pequeño delay
        const confettiTimer = setTimeout(() => {
            const duration = 3000;
            const animationEnd = Date.now() + duration;
            const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 2000 };

            function randomInRange(min, max) {
                return Math.random() * (max - min) + min;
            }

            const interval = setInterval(function () {
                const timeLeft = animationEnd - Date.now();

                if (timeLeft <= 0) {
                    return clearInterval(interval);
                }

                const particleCount = 50 * (timeLeft / duration);

                // Confetti desde la izquierda
                confetti({
                    ...defaults,
                    particleCount,
                    origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
                    colors: ['#ff6b9d', '#ff8fab', '#ffa4c0', '#c084fc', '#e879f9']
                });

                // Confetti desde la derecha
                confetti({
                    ...defaults,
                    particleCount,
                    origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
                    colors: ['#ff6b9d', '#ff8fab', '#ffa4c0', '#c084fc', '#e879f9']
                });
            }, 250);
        }, 500);

        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            clearTimeout(confettiTimer);
        };
    }, []);

    // Intersection Observer para animaciones de scroll
    useEffect(() => {
        const observerOptions = {
            threshold: 0.2,
            rootMargin: '0px 0px -100px 0px'
        };

        const observerCallback = (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const sectionName = entry.target.dataset.section;
                    setVisibleSections(prev => ({ ...prev, [sectionName]: true }));
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);

        const refs = [
            { ref: statsRef, name: 'stats' },
            { ref: storyRef, name: 'story' },
            { ref: valuesRef, name: 'values' },
            { ref: teamRef, name: 'team' },
            { ref: contactRef, name: 'contact' }
        ];

        refs.forEach(({ ref }) => {
            if (ref.current) {
                observer.observe(ref.current);
            }
        });

        return () => {
            refs.forEach(({ ref }) => {
                if (ref.current) {
                    observer.unobserve(ref.current);
                }
            });
        };
    }, []);

    const stats = [
        { icon: Users, number: '5000+', label: 'Clientes Satisfechos' },
        { icon: Award, number: '15+', label: 'Años de Experiencia' },
        { icon: Sparkles, number: '50+', label: 'Servicios Premium' },
        { icon: Heart, number: '100%', label: 'Dedicación' }
    ];

    const values = [
        {
            icon: Heart,
            title: 'Pasión por la Belleza',
            description: 'Cada servicio es una obra de arte, diseñada para resaltar tu belleza natural y hacerte sentir especial.'
        },
        {
            icon: Award,
            title: 'Excelencia Profesional',
            description: 'Nuestro equipo está certificado y en constante actualización con las últimas tendencias y técnicas.'
        },
        {
            icon: Sparkles,
            title: 'Productos Premium',
            description: 'Utilizamos solo productos de la más alta calidad para garantizar resultados excepcionales y duraderos.'
        },
        {
            icon: Users,
            title: 'Atención Personalizada',
            description: 'Cada cliente es único. Adaptamos nuestros servicios a tus necesidades y preferencias individuales.'
        }
    ];

    const team = [
        {
            name: 'María González',
            role: 'Directora & Estilista Senior',
            specialty: 'Especialista en colorimetría y tratamientos capilares',
            image: '👩‍🦰'
        },
        {
            name: 'Ana Rodríguez',
            role: 'Manicurista Profesional',
            specialty: 'Experta en nail art y diseños personalizados',
            image: '👩‍🦱'
        },
        {
            name: 'Carmen Silva',
            role: 'Esteticista',
            specialty: 'Tratamientos faciales y cuidado de la piel',
            image: '👩'
        }
    ];

    return (
        <div style={{ minHeight: '100vh', background: 'linear-gradient(to bottom, #fff5f8, #ffffff)' }}>
            {/* Header */}
            <header style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                background: scrolled ? 'rgba(255, 255, 255, 0.98)' : 'transparent',
                backdropFilter: scrolled ? 'blur(10px)' : 'none',
                transition: 'all 0.3s ease',
                zIndex: 1000,
                padding: '20px 0'
            }}>
                <div style={{
                    maxWidth: '1200px',
                    margin: '0 auto',
                    padding: '0 20px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <h1 style={{
                        fontSize: '24px',
                        fontWeight: 'bold',
                        background: 'linear-gradient(135deg, #ff6b9d, #ff8fab)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        margin: 0
                    }}>
                        🌸 En Maranatha
                    </h1>
                    <button
                        onClick={() => navigate('/')}
                        style={{
                            background: 'linear-gradient(135deg, #ff6b9d, #ff8fab)',
                            color: 'white',
                            border: 'none',
                            padding: '12px 30px',
                            borderRadius: '25px',
                            fontSize: '14px',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            boxShadow: '0 4px 15px rgba(255, 107, 157, 0.3)',
                            transition: 'all 0.3s ease'
                        }}
                        onMouseOver={(e) => {
                            e.currentTarget.style.transform = 'translateY(-2px)';
                            e.currentTarget.style.boxShadow = '0 6px 20px rgba(255, 107, 157, 0.4)';
                        }}
                        onMouseOut={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = '0 4px 15px rgba(255, 107, 157, 0.3)';
                        }}
                    >
                        Volver al Inicio
                    </button>
                </div>
            </header>

            {/* Hero Section */}
            <section style={{
                paddingTop: '120px',
                paddingBottom: '80px',
                textAlign: 'center',
                position: 'relative',
                overflow: 'hidden'
            }}>
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'radial-gradient(circle at 50% 50%, rgba(255, 107, 157, 0.1), transparent)',
                    pointerEvents: 'none'
                }} />

                <div style={{
                    maxWidth: '800px',
                    margin: '0 auto',
                    padding: '0 20px',
                    position: 'relative',
                    animation: 'fadeInUp 0.8s ease-out'
                }}>
                    <div style={{
                        display: 'inline-block',
                        background: 'linear-gradient(135deg, #ff6b9d20, #ff8fab20)',
                        padding: '8px 20px',
                        borderRadius: '20px',
                        marginBottom: '20px',
                        border: '2px solid #ff6b9d30'
                    }}>
                        <span style={{ color: '#ff6b9d', fontWeight: 'bold', fontSize: '14px' }}>✨ Sobre Nosotros</span>
                    </div>

                    <h1 style={{
                        fontSize: 'clamp(32px, 6vw, 56px)',
                        fontWeight: 'bold',
                        marginBottom: '24px',
                        background: 'linear-gradient(135deg, #ff6b9d, #c084fc)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        lineHeight: '1.2'
                    }}>
                        Tu Belleza, Nuestra Pasión
                    </h1>

                    <p style={{
                        fontSize: '18px',
                        color: '#6b7280',
                        lineHeight: '1.8',
                        marginBottom: '40px'
                    }}>
                        En Maranatha es más que un salón de belleza. Somos un espacio donde la elegancia se encuentra con la innovación,
                        donde cada visita es una experiencia transformadora diseñada especialmente para ti.
                    </p>
                </div>
            </section>

            {/* Stats Section */}
            <section
                ref={statsRef}
                data-section="stats"
                style={{
                    padding: '60px 20px',
                    background: 'white',
                    boxShadow: '0 -10px 40px rgba(0,0,0,0.05)',
                    opacity: visibleSections.stats ? 1 : 0,
                    transform: visibleSections.stats ? 'translateY(0)' : 'translateY(50px)',
                    transition: 'all 0.8s ease-out'
                }}
            >
                <div style={{
                    maxWidth: '1200px',
                    margin: '0 auto',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                    gap: '30px'
                }}>
                    {stats.map((stat, index) => (
                        <div key={index} style={{
                            textAlign: 'center',
                            padding: '30px',
                            borderRadius: '20px',
                            background: 'linear-gradient(135deg, #fff5f8, #ffffff)',
                            border: '2px solid #ff6b9d20',
                            transition: 'all 0.3s ease',
                            opacity: visibleSections.stats ? 1 : 0,
                            transform: visibleSections.stats ? 'translateY(0)' : 'translateY(30px)',
                            transitionDelay: `${index * 0.1}s`
                        }}
                            onMouseOver={(e) => {
                                e.currentTarget.style.transform = 'translateY(-5px)';
                                e.currentTarget.style.boxShadow = '0 10px 30px rgba(255, 107, 157, 0.2)';
                            }}
                            onMouseOut={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = 'none';
                            }}>
                            <div style={{
                                width: '60px',
                                height: '60px',
                                margin: '0 auto 20px',
                                borderRadius: '50%',
                                background: 'linear-gradient(135deg, #ff6b9d, #ff8fab)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                boxShadow: '0 8px 20px rgba(255, 107, 157, 0.3)'
                            }}>
                                <stat.icon size={28} color="white" />
                            </div>
                            <h3 style={{
                                fontSize: '36px',
                                fontWeight: 'bold',
                                color: '#ff6b9d',
                                marginBottom: '8px'
                            }}>
                                {stat.number}
                            </h3>
                            <p style={{ color: '#6b7280', fontSize: '14px', fontWeight: '500' }}>
                                {stat.label}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Our Story */}
            <section
                ref={storyRef}
                data-section="story"
                style={{
                    padding: '80px 20px',
                    opacity: visibleSections.story ? 1 : 0,
                    transform: visibleSections.story ? 'translateY(0)' : 'translateY(50px)',
                    transition: 'all 0.8s ease-out'
                }}
            >
                <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
                    <h2 style={{
                        fontSize: 'clamp(28px, 5vw, 42px)',
                        fontWeight: 'bold',
                        textAlign: 'center',
                        marginBottom: '50px',
                        background: 'linear-gradient(135deg, #ff6b9d, #c084fc)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                    }}>
                        Nuestra Historia
                    </h2>

                    <div style={{
                        background: 'white',
                        padding: '50px',
                        borderRadius: '30px',
                        boxShadow: '0 20px 60px rgba(0,0,0,0.08)',
                        border: '2px solid #ff6b9d10'
                    }}>
                        <p style={{
                            fontSize: '18px',
                            lineHeight: '1.8',
                            color: '#374151',
                            marginBottom: '20px'
                        }}>
                            Fundado en 2010, <strong style={{ color: '#ff6b9d' }}>En Maranatha</strong> nació del sueño de crear un espacio
                            donde cada persona pudiera descubrir y realzar su belleza única. Lo que comenzó como un pequeño salón familiar
                            se ha convertido en uno de los destinos de belleza más reconocidos de Santo Domingo Este.
                        </p>
                        <p style={{
                            fontSize: '18px',
                            lineHeight: '1.8',
                            color: '#374151',
                            marginBottom: '20px'
                        }}>
                            A lo largo de los años, hemos tenido el privilegio de ser parte de momentos especiales en la vida de miles de
                            clientes: bodas, graduaciones, eventos importantes y, sobre todo, esos días en los que simplemente quieres
                            sentirte increíble.
                        </p>
                        <p style={{
                            fontSize: '18px',
                            lineHeight: '1.8',
                            color: '#374151'
                        }}>
                            Nuestro compromiso sigue siendo el mismo: ofrecer servicios de la más alta calidad en un ambiente acogedor,
                            donde te sientas como en casa mientras te transformas en la mejor versión de ti mismo.
                        </p>
                    </div>
                </div>
            </section>

            {/* Values */}
            <section
                ref={valuesRef}
                data-section="values"
                style={{
                    padding: '80px 20px',
                    background: 'linear-gradient(135deg, #fff5f8, #ffffff)',
                    opacity: visibleSections.values ? 1 : 0,
                    transform: visibleSections.values ? 'translateY(0)' : 'translateY(50px)',
                    transition: 'all 0.8s ease-out'
                }}
            >
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <h2 style={{
                        fontSize: 'clamp(28px, 5vw, 42px)',
                        fontWeight: 'bold',
                        textAlign: 'center',
                        marginBottom: '60px',
                        background: 'linear-gradient(135deg, #ff6b9d, #c084fc)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                    }}>
                        Nuestros Valores
                    </h2>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                        gap: '30px'
                    }}>
                        {values.map((value, index) => (
                            <div key={index} style={{
                                background: 'white',
                                padding: '40px 30px',
                                borderRadius: '25px',
                                boxShadow: '0 10px 40px rgba(0,0,0,0.06)',
                                border: '2px solid #ff6b9d10',
                                transition: 'all 0.3s ease',
                                opacity: visibleSections.values ? 1 : 0,
                                transform: visibleSections.values ? 'translateY(0)' : 'translateY(30px)',
                                transitionDelay: `${index * 0.15}s`
                            }}
                                onMouseOver={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-8px)';
                                    e.currentTarget.style.boxShadow = '0 20px 50px rgba(255, 107, 157, 0.15)';
                                    e.currentTarget.style.borderColor = '#ff6b9d40';
                                }}
                                onMouseOut={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = '0 10px 40px rgba(0,0,0,0.06)';
                                    e.currentTarget.style.borderColor = '#ff6b9d10';
                                }}>
                                <div style={{
                                    width: '70px',
                                    height: '70px',
                                    marginBottom: '25px',
                                    borderRadius: '20px',
                                    background: 'linear-gradient(135deg, #ff6b9d, #ff8fab)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    boxShadow: '0 10px 25px rgba(255, 107, 157, 0.3)'
                                }}>
                                    <value.icon size={32} color="white" strokeWidth={2} />
                                </div>
                                <h3 style={{
                                    fontSize: '22px',
                                    fontWeight: 'bold',
                                    color: '#1f2937',
                                    marginBottom: '15px'
                                }}>
                                    {value.title}
                                </h3>
                                <p style={{
                                    fontSize: '15px',
                                    lineHeight: '1.7',
                                    color: '#6b7280'
                                }}>
                                    {value.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section
                ref={teamRef}
                data-section="team"
                style={{
                    padding: '80px 20px',
                    opacity: visibleSections.team ? 1 : 0,
                    transform: visibleSections.team ? 'translateY(0)' : 'translateY(50px)',
                    transition: 'all 0.8s ease-out'
                }}
            >
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <h2 style={{
                        fontSize: 'clamp(28px, 5vw, 42px)',
                        fontWeight: 'bold',
                        textAlign: 'center',
                        marginBottom: '20px',
                        background: 'linear-gradient(135deg, #ff6b9d, #c084fc)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                    }}>
                        Nuestro Equipo
                    </h2>
                    <p style={{
                        textAlign: 'center',
                        color: '#6b7280',
                        fontSize: '18px',
                        marginBottom: '60px',
                        maxWidth: '600px',
                        margin: '0 auto 60px'
                    }}>
                        Profesionales apasionados dedicados a hacer realidad tu visión de belleza
                    </p>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                        gap: '40px'
                    }}>
                        {team.map((member, index) => (
                            <div key={index} style={{
                                background: 'white',
                                borderRadius: '25px',
                                overflow: 'hidden',
                                boxShadow: '0 15px 50px rgba(0,0,0,0.08)',
                                transition: 'all 0.3s ease',
                                border: '2px solid #ff6b9d10',
                                opacity: visibleSections.team ? 1 : 0,
                                transform: visibleSections.team ? 'translateY(0)' : 'translateY(30px)',
                                transitionDelay: `${index * 0.15}s`
                            }}
                                onMouseOver={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-10px)';
                                    e.currentTarget.style.boxShadow = '0 25px 60px rgba(255, 107, 157, 0.2)';
                                }}
                                onMouseOut={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = '0 15px 50px rgba(0,0,0,0.08)';
                                }}>
                                <div style={{
                                    height: '200px',
                                    background: 'linear-gradient(135deg, #ff6b9d20, #c084fc20)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '80px'
                                }}>
                                    {member.image}
                                </div>
                                <div style={{ padding: '30px' }}>
                                    <h3 style={{
                                        fontSize: '22px',
                                        fontWeight: 'bold',
                                        color: '#1f2937',
                                        marginBottom: '8px'
                                    }}>
                                        {member.name}
                                    </h3>
                                    <p style={{
                                        color: '#ff6b9d',
                                        fontWeight: '600',
                                        fontSize: '14px',
                                        marginBottom: '15px'
                                    }}>
                                        {member.role}
                                    </p>
                                    <p style={{
                                        color: '#6b7280',
                                        fontSize: '14px',
                                        lineHeight: '1.6'
                                    }}>
                                        {member.specialty}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Info */}
            <section
                ref={contactRef}
                data-section="contact"
                style={{
                    padding: '80px 20px',
                    background: 'linear-gradient(135deg, #ff6b9d, #c084fc)',
                    color: 'white',
                    opacity: visibleSections.contact ? 1 : 0,
                    transform: visibleSections.contact ? 'translateY(0)' : 'translateY(50px)',
                    transition: 'all 0.8s ease-out'
                }}
            >
                <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
                    <h2 style={{
                        fontSize: 'clamp(28px, 5vw, 42px)',
                        fontWeight: 'bold',
                        marginBottom: '20px'
                    }}>
                        Visítanos
                    </h2>
                    <p style={{
                        fontSize: '18px',
                        marginBottom: '50px',
                        opacity: 0.95
                    }}>
                        Estamos aquí para hacer realidad tus sueños de belleza
                    </p>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                        gap: '30px',
                        marginTop: '40px'
                    }}>
                        <div style={{
                            background: 'rgba(255, 255, 255, 0.15)',
                            backdropFilter: 'blur(10px)',
                            padding: '30px',
                            borderRadius: '20px',
                            border: '2px solid rgba(255, 255, 255, 0.2)'
                        }}>
                            <MapPin size={32} style={{ marginBottom: '15px' }} />
                            <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '10px' }}>Ubicación</h3>
                            <p style={{ opacity: 0.9, fontSize: '15px' }}>Santo Domingo Este, RD</p>
                        </div>

                        <div style={{
                            background: 'rgba(255, 255, 255, 0.15)',
                            backdropFilter: 'blur(10px)',
                            padding: '30px',
                            borderRadius: '20px',
                            border: '2px solid rgba(255, 255, 255, 0.2)'
                        }}>
                            <Phone size={32} style={{ marginBottom: '15px' }} />
                            <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '10px' }}>Teléfono</h3>
                            <p style={{ opacity: 0.9, fontSize: '15px' }}>(809) 264-5832</p>
                        </div>

                        <div style={{
                            background: 'rgba(255, 255, 255, 0.15)',
                            backdropFilter: 'blur(10px)',
                            padding: '30px',
                            borderRadius: '20px',
                            border: '2px solid rgba(255, 255, 255, 0.2)'
                        }}>
                            <Clock size={32} style={{ marginBottom: '15px' }} />
                            <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '10px' }}>Horario</h3>
                            <p style={{ opacity: 0.9, fontSize: '15px' }}>Lun - Sáb: 9:00 AM - 7:00 PM</p>
                        </div>
                    </div>

                    <div style={{
                        marginTop: '50px',
                        paddingTop: '40px',
                        borderTop: '2px solid rgba(255, 255, 255, 0.2)'
                    }}>
                        <p style={{ fontSize: '16px', marginBottom: '20px', opacity: 0.9 }}>Síguenos en redes sociales</p>
                        <div style={{
                            display: 'flex',
                            gap: '20px',
                            justifyContent: 'center'
                        }}>
                            <a href="#" style={{
                                width: '50px',
                                height: '50px',
                                borderRadius: '50%',
                                background: 'rgba(255, 255, 255, 0.2)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                transition: 'all 0.3s ease',
                                border: '2px solid rgba(255, 255, 255, 0.3)'
                            }}
                                onMouseOver={(e) => {
                                    e.currentTarget.style.background = 'white';
                                    e.currentTarget.style.transform = 'translateY(-5px)';
                                }}
                                onMouseOut={(e) => {
                                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
                                    e.currentTarget.style.transform = 'translateY(0)';
                                }}>
                                <Instagram size={24} />
                            </a>
                            <a href="#" style={{
                                width: '50px',
                                height: '50px',
                                borderRadius: '50%',
                                background: 'rgba(255, 255, 255, 0.2)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                transition: 'all 0.3s ease',
                                border: '2px solid rgba(255, 255, 255, 0.3)'
                            }}
                                onMouseOver={(e) => {
                                    e.currentTarget.style.background = 'white';
                                    e.currentTarget.style.transform = 'translateY(-5px)';
                                }}
                                onMouseOut={(e) => {
                                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
                                    e.currentTarget.style.transform = 'translateY(0)';
                                }}>
                                <Facebook size={24} />
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer style={{
                background: '#1f2937',
                color: 'white',
                padding: '30px 20px',
                textAlign: 'center'
            }}>
                <p style={{ margin: 0, opacity: 0.8 }}>
                    © 2024 En Maranatha. Todos los derechos reservados.
                </p>
            </footer>

            {/* Keyframes CSS */}
            <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-100px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(100px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes slideInFromBottom {
          from {
            opacity: 0;
            transform: translateY(100px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        /* Efecto de libro/película para las secciones */
        section[data-section] {
          will-change: transform, opacity;
        }

        /* Animación de entrada más dramática */
        section[data-section="story"] > div {
          animation: ${visibleSections.story ? 'fadeInLeft 1.2s ease-out' : 'none'};
        }

        section[data-section="values"] > div {
          animation: ${visibleSections.values ? 'scaleIn 1s ease-out' : 'none'};
        }

        section[data-section="team"] > div {
          animation: ${visibleSections.team ? 'fadeInRight 1.2s ease-out' : 'none'};
        }

        section[data-section="contact"] > div {
          animation: ${visibleSections.contact ? 'slideInFromBottom 1s ease-out' : 'none'};
        }

        /* Efecto de parallax suave */
        @media (prefers-reduced-motion: no-preference) {
          section[data-section] {
            transform-style: preserve-3d;
          }
        }
      `}</style>
        </div>
    );
}
