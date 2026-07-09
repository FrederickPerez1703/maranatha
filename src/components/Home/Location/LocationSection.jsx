import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../../context/LanguageContext';
import { useTheme } from '../../../context/ThemeContext';
import { useReviews } from '../../../contexts/ReviewsContext'; // Import context
import { Star, Heart, MapPin, Navigation, Car, Clock, Phone, Edit2 } from 'lucide-react';
import './LocationSection.css';

export default function LocationSection() {
    const { language } = useLanguage();
    const { theme } = useTheme();
    const { reviews, addReview, toggleLike } = useReviews(); // Use context methods

    const [newReview, setNewReview] = useState({ name: '', comment: '', rating: 5 });
    const [showReviewForm, setShowReviewForm] = useState(false);

    // Only keep likedReviews local to the user/device to track what THEY liked
    const [likedReviews, setLikedReviews] = useState(() => {
        const saved = localStorage.getItem('likedReviews');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem('likedReviews', JSON.stringify(likedReviews));
    }, [likedReviews]);

    const handleLike = (reviewId) => {
        toggleLike(reviewId, likedReviews, setLikedReviews);
    };

    const handleSubmitReview = (e) => {
        e.preventDefault();
        if (!newReview.name || !newReview.comment) return;

        addReview(newReview);
        setNewReview({ name: '', comment: '', rating: 5 });
        setShowReviewForm(false);
    };

    // Google Maps Embed URL for "Long Bay, Anguilla"
    const mapUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3786.666324888804!2d-63.111868525049914!3d18.18844438596644!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8c0e7abaa8b4b1c7%3A0xe5f5f7f3f3f3f3f3!2sLong%20Bay%20Village%2C%20Anguilla!5e0!3m2!1sen!2s!4v1706070000000!5m2!1sen!2s";

    return (
        <section className="location-section" id="location" style={{ 
            backgroundColor: theme === 'dark' ? '#111827' : '#fff7f9',
            padding: '5rem 0',
            transition: 'background 0.3s ease'
        }}>
            <div className="container">
                <div className="location-content" style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                    gap: '2.5rem',
                    alignItems: 'stretch'
                }}>
                    {/* Left Card: Location Info */}
                    <div className="location-info-card-mock shadow-card" style={{ 
                        backgroundColor: theme === 'dark' ? '#1f2937' : '#ffffff',
                        borderRadius: '24px',
                        padding: '2.5rem',
                        border: theme === 'dark' ? '1px solid rgba(255, 77, 128, 0.1)' : '1px solid rgba(0,0,0,0.02)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1.5rem',
                        transition: 'all 0.3s ease'
                    }}>
                        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                            <div style={{
                                width: '45px',
                                height: '45px',
                                borderRadius: '50%',
                                background: 'rgba(255, 77, 128, 0.08)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyCenter: 'center',
                                color: 'var(--color-primary)',
                                flexShrink: 0,
                                justifyContent: 'center'
                            }}>
                                <MapPin size={22} />
                            </div>
                            <div>
                                <h3 style={{ 
                                    fontSize: '1.5rem', 
                                    fontWeight: '800', 
                                    margin: 0,
                                    fontFamily: 'Outfit, sans-serif',
                                    color: theme === 'dark' ? '#ffffff' : 'var(--color-gray-900)'
                                }}>
                                    {language === 'es' ? 'Nuestra Ubicación' : 'Our Location'}
                                </h3>
                                <span style={{ 
                                    fontSize: '0.9rem', 
                                    color: theme === 'dark' ? 'var(--color-gray-400)' : 'var(--color-gray-500)',
                                    fontWeight: '500',
                                    fontFamily: 'Outfit, sans-serif'
                                }}>
                                    Long Bay, Anguilla
                                </span>
                            </div>
                        </div>

                        <div className="map-container" style={{ 
                            width: '100%', 
                            height: '240px', 
                            borderRadius: '16px', 
                            overflow: 'hidden',
                            border: theme === 'dark' ? '1px solid rgba(255,255,255,0.05)' : '1px solid #f3f4f6'
                        }}>
                            <iframe
                                src={mapUrl}
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Google Maps Location"
                            ></iframe>
                        </div>

                        {/* Location Details Info Row */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', flexGrow: 1 }}>
                            <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                                <Car size={18} style={{ color: 'var(--color-primary)', marginTop: '2px', flexShrink: 0 }} />
                                <div>
                                    <h4 style={{ margin: 0, fontSize: '0.95rem', fontWeight: '700', color: theme === 'dark' ? '#fff' : 'var(--color-gray-800)', fontFamily: 'Outfit, sans-serif' }}>
                                        {language === 'es' ? 'Fácil Acceso' : 'Easy Access'}
                                    </h4>
                                    <p style={{ margin: 0, fontSize: '0.85rem', color: theme === 'dark' ? 'var(--color-gray-400)' : 'var(--color-gray-500)', lineHeight: '1.4' }}>
                                        {language === 'es' ? 'Estacionamiento disponible' : 'Free parking available'}
                                    </p>
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                                <Clock size={18} style={{ color: 'var(--color-primary)', marginTop: '2px', flexShrink: 0 }} />
                                <div>
                                    <h4 style={{ margin: 0, fontSize: '0.95rem', fontWeight: '700', color: theme === 'dark' ? '#fff' : 'var(--color-gray-800)', fontFamily: 'Outfit, sans-serif' }}>
                                        {language === 'es' ? 'Horario' : 'Hours'}
                                    </h4>
                                    <p style={{ margin: 0, fontSize: '0.85rem', color: theme === 'dark' ? 'var(--color-gray-400)' : 'var(--color-gray-500)', lineHeight: '1.4' }}>
                                        {language === 'es' ? 'Lun - Sáb: 9:00 AM - 6:30 PM / Domingo: Cerrado' : 'Mon - Sat: 9:00 AM - 6:30 PM / Sunday: Closed'}
                                    </p>
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                                <Phone size={18} style={{ color: 'var(--color-primary)', marginTop: '2px', flexShrink: 0 }} />
                                <div>
                                    <h4 style={{ margin: 0, fontSize: '0.95rem', fontWeight: '700', color: theme === 'dark' ? '#fff' : 'var(--color-gray-800)', fontFamily: 'Outfit, sans-serif' }}>
                                        {language === 'es' ? 'Contáctanos' : 'Contact'}
                                    </h4>
                                    <p style={{ margin: 0, fontSize: '0.85rem', color: theme === 'dark' ? 'var(--color-gray-400)' : 'var(--color-gray-500)', lineHeight: '1.4' }}>
                                        +1 (264) 582-0476 / Long Bay, Anguilla
                                    </p>
                                </div>
                            </div>
                        </div>

                        <a
                            href="https://www.google.com/maps/search/?api=1&query=Long+Bay+Anguilla"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="directions-btn-mock"
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyCenter: 'center',
                                justifyContent: 'center',
                                gap: '8px',
                                backgroundColor: 'var(--color-primary)',
                                color: 'white',
                                padding: '12px 24px',
                                borderRadius: '50px',
                                textDecoration: 'none',
                                fontWeight: '700',
                                fontSize: '0.95rem',
                                transition: 'all 0.3s ease',
                                boxShadow: '0 4px 15px rgba(255, 77, 128, 0.2)',
                                fontFamily: 'Outfit, sans-serif'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = 'var(--color-primary-dark)';
                                e.currentTarget.style.transform = 'translateY(-1px)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = 'var(--color-primary)';
                                e.currentTarget.style.transform = 'translateY(0)';
                            }}
                        >
                            <Navigation size={16} />
                            {language === 'es' ? 'Cómo llegar' : 'Get Directions'}
                        </a>
                    </div>

                    {/* Right Card: Customer Reviews */}
                    <div className="reviews-card-mock shadow-card" style={{ 
                        backgroundColor: theme === 'dark' ? '#1f2937' : '#ffffff',
                        borderRadius: '24px',
                        padding: '2.5rem',
                        border: theme === 'dark' ? '1px solid rgba(255, 77, 128, 0.1)' : '1px solid rgba(0,0,0,0.02)',
                        display: 'flex',
                        flexDirection: 'column',
                        transition: 'all 0.3s ease'
                    }}>
                        <div style={{ 
                            display: 'flex', 
                            justifyContent: 'space-between', 
                            alignItems: 'center', 
                            marginBottom: '1.5rem',
                            flexWrap: 'wrap',
                            gap: '10px'
                        }}>
                            <h3 style={{ 
                                fontSize: '1.5rem', 
                                fontWeight: '800', 
                                margin: 0,
                                fontFamily: 'Outfit, sans-serif',
                                color: theme === 'dark' ? '#ffffff' : 'var(--color-gray-900)'
                            }}>
                                {language === 'es' ? 'Reseñas de Clientes' : 'Customer Reviews'}
                            </h3>
                            <button
                                className="add-review-btn-mock"
                                onClick={() => setShowReviewForm(!showReviewForm)}
                                style={{
                                    background: 'transparent',
                                    border: '1px solid var(--color-primary)',
                                    color: 'var(--color-primary)',
                                    padding: '8px 16px',
                                    borderRadius: '50px',
                                    fontSize: '0.85rem',
                                    fontWeight: '700',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease',
                                    fontFamily: 'Outfit, sans-serif',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '6px'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor = 'var(--color-primary)';
                                    e.currentTarget.style.color = '#ffffff';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = 'transparent';
                                    e.currentTarget.style.color = 'var(--color-primary)';
                                }}
                            >
                                <Edit2 size={12} />
                                {showReviewForm ? (language === 'es' ? 'Cancelar' : 'Cancel') : (language === 'es' ? 'Escribir Reseña' : 'Write Review')}
                            </button>
                        </div>

                        {showReviewForm && (
                            <form onSubmit={handleSubmitReview} className="review-form" style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '12px',
                                background: theme === 'dark' ? 'rgba(255,77,128,0.05)' : '#fff3f6',
                                padding: '20px',
                                borderRadius: '16px',
                                marginBottom: '1.5rem',
                                border: '1px dashed rgba(255, 77, 128, 0.2)'
                            }}>
                                <input
                                    type="text"
                                    placeholder={language === 'es' ? 'Tu Nombre' : 'Your Name'}
                                    value={newReview.name}
                                    onChange={e => setNewReview({ ...newReview, name: e.target.value })}
                                    required
                                    style={{ 
                                        backgroundColor: theme === 'dark' ? '#374151' : '#ffffff', 
                                        color: theme === 'dark' ? '#fff' : '#333',
                                        border: '1px solid rgba(0,0,0,0.08)',
                                        padding: '10px 14px',
                                        borderRadius: '10px',
                                        outline: 'none',
                                        fontFamily: 'Outfit, sans-serif'
                                    }}
                                />
                                <div className="rating-input" style={{ display: 'flex', gap: '5px' }}>
                                    {[1, 2, 3, 4, 5].map(star => (
                                        <Star
                                            key={star}
                                            size={20}
                                            fill={star <= newReview.rating ? "#ffd700" : "none"}
                                            color={star <= newReview.rating ? "#ffd700" : "#ccc"}
                                            style={{ cursor: 'pointer' }}
                                            onClick={() => setNewReview({ ...newReview, rating: star })}
                                        />
                                    ))}
                                </div>
                                <textarea
                                    placeholder={language === 'es' ? 'Tu Opinión...' : 'Your feedback...'}
                                    value={newReview.comment}
                                    onChange={e => setNewReview({ ...newReview, comment: e.target.value })}
                                    required
                                    style={{ 
                                        backgroundColor: theme === 'dark' ? '#374151' : '#ffffff', 
                                        color: theme === 'dark' ? '#fff' : '#333',
                                        border: '1px solid rgba(0,0,0,0.08)',
                                        padding: '10px 14px',
                                        borderRadius: '10px',
                                        minHeight: '80px',
                                        outline: 'none',
                                        fontFamily: 'Outfit, sans-serif',
                                        resize: 'vertical'
                                    }}
                                />
                                <button type="submit" className="submit-review-btn" style={{
                                    backgroundColor: 'var(--color-primary)',
                                    color: 'white',
                                    border: 'none',
                                    padding: '10px',
                                    borderRadius: '50px',
                                    cursor: 'pointer',
                                    fontWeight: '700',
                                    fontSize: '0.9rem',
                                    boxShadow: '0 4px 10px rgba(255, 77, 128, 0.2)',
                                    fontFamily: 'Outfit, sans-serif'
                                }}>
                                    {language === 'es' ? 'Publicar' : 'Post Review'}
                                </button>
                            </form>
                        )}

                        <div className="reviews-list" style={{ 
                            overflowY: 'auto', 
                            flexGrow: 1, 
                            paddingRight: '5px',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '1.25rem',
                            maxHeight: '340px'
                        }}>
                            {reviews.length === 0 ? (
                                <p className="no-reviews" style={{ textAlign: 'center', color: '#999', padding: '2rem 0' }}>
                                    {language === 'es' ? 'Sé el primero en opinar.' : 'Be the first to review.'}
                                </p>
                            ) : (
                                reviews.map(review => (
                                    <div key={review.id} className="review-item" style={{ 
                                        borderBottom: theme === 'dark' ? '1px solid rgba(255,255,255,0.08)' : '1px solid #f3f4f6',
                                        paddingBottom: '1.25rem'
                                    }}>
                                        <div className="review-top" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                                            <span className="review-author" style={{ 
                                                color: theme === 'dark' ? '#e5e7eb' : 'var(--color-gray-900)',
                                                fontWeight: '700',
                                                fontFamily: 'Outfit, sans-serif',
                                                fontSize: '0.95rem'
                                            }}>{review.name}</span>
                                            <div className="review-stars" style={{ display: 'flex', gap: '2px' }}>
                                                {[...Array(5)].map((_, i) => (
                                                    <Star key={i} size={13} fill={i < review.rating ? "#ffd700" : "none"} color={i < review.rating ? "#ffd700" : "#ddd"} />
                                                ))}
                                            </div>
                                        </div>
                                        <p className="review-text" style={{ 
                                            color: theme === 'dark' ? 'var(--color-gray-400)' : 'var(--color-gray-600)',
                                            fontSize: '0.9rem',
                                            lineHeight: '1.5',
                                            margin: '0 0 10px 0'
                                        }}>{review.comment}</p>
                                        <div className="review-footer" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <span className="review-date" style={{ fontSize: '0.75rem', color: theme === 'dark' ? 'var(--color-gray-500)' : '#999' }}>{review.date}</span>
                                            <button
                                                className={`like-btn ${likedReviews.includes(review.id) ? 'liked' : ''}`}
                                                onClick={() => handleLike(review.id)}
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '6px',
                                                    background: 'none',
                                                    border: 'none',
                                                    cursor: 'pointer',
                                                    color: likedReviews.includes(review.id) ? 'var(--color-primary)' : '#888',
                                                    fontSize: '0.8rem',
                                                    padding: '4px 10px',
                                                    borderRadius: '12px',
                                                    backgroundColor: likedReviews.includes(review.id) ? 'rgba(255,77,128,0.06)' : 'transparent',
                                                    transition: 'all 0.2s'
                                                }}
                                            >
                                                <Heart size={14} fill={likedReviews.includes(review.id) ? "var(--color-primary)" : "none"} color={likedReviews.includes(review.id) ? "var(--color-primary)" : "#888"} />
                                                <span style={{ fontWeight: '600' }}>{review.likes}</span>
                                            </button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                        
                        {/* Footer link matching mockup: "Ver más reseñas ->" */}
                        <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
                            <a href="#reviews" style={{
                                color: 'var(--color-primary)',
                                textDecoration: 'none',
                                fontWeight: '700',
                                fontSize: '0.95rem',
                                fontFamily: 'Outfit, sans-serif',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '6px',
                                transition: 'transform 0.2s ease'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateX(3px)'}
                            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateX(0)'}
                            >
                                {language === 'es' ? 'Ver más reseñas' : 'View more reviews'}
                                <span>→</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
