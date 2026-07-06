import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../../context/LanguageContext';
import { useTheme } from '../../../context/ThemeContext';
import { useReviews } from '../../../contexts/ReviewsContext'; // Import context
import { Star, Heart, MapPin, Navigation } from 'lucide-react';
import './LocationSection.css';

export default function LocationSection() {
    const { t, language } = useLanguage();
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
        <section className="location-section" id="location" style={{ backgroundColor: theme === 'dark' ? '#1f2937' : '#f9fafb' }}>
            <div className="container">
                <div className="location-header">
                    <MapPin className="location-icon-header" size={32} />
                    <h2 style={{ color: theme === 'dark' ? '#fff' : '#333' }}>
                        {language === 'es' ? 'Nuestra Ubicación' : 'Our Location'}
                    </h2>
                    <p className="location-subtitle">
                        Long Bay, Anguilla
                    </p>
                </div>

                <div className="location-content">
                    {/* Map Card */}
                    <div className="map-card shadow-card" style={{ backgroundColor: theme === 'dark' ? '#374151' : '#fff' }}>
                        <div className="map-container">
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
                        <div className="map-actions">
                            <a
                                href="https://www.google.com/maps/search/?api=1&query=Long+Bay+Anguilla"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="directions-btn"
                            >
                                <Navigation size={18} />
                                {language === 'es' ? 'Cómo llegar' : 'Get Directions'}
                            </a>
                        </div>
                    </div>

                    {/* Reviews Card */}
                    <div className="reviews-card shadow-card" style={{ backgroundColor: theme === 'dark' ? '#374151' : '#fff' }}>
                        <div className="reviews-header">
                            <h3 style={{ color: theme === 'dark' ? '#fff' : '#333' }}>
                                {language === 'es' ? 'Reseñas de Clientes' : 'Customer Reviews'}
                            </h3>
                            <button
                                className="add-review-btn"
                                onClick={() => setShowReviewForm(!showReviewForm)}
                            >
                                {showReviewForm ? (language === 'es' ? 'Cancelar' : 'Cancel') : (language === 'es' ? 'Escribir Reseña' : 'Write Review')}
                            </button>
                        </div>

                        {showReviewForm && (
                            <form onSubmit={handleSubmitReview} className="review-form">
                                <input
                                    type="text"
                                    placeholder={language === 'es' ? 'Tu Nombre' : 'Your Name'}
                                    value={newReview.name}
                                    onChange={e => setNewReview({ ...newReview, name: e.target.value })}
                                    required
                                    style={{ backgroundColor: theme === 'dark' ? '#4b5563' : '#f3f4f6', color: theme === 'dark' ? '#fff' : '#333' }}
                                />
                                <div className="rating-input">
                                    {[1, 2, 3, 4, 5].map(star => (
                                        <Star
                                            key={star}
                                            size={24}
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
                                    style={{ backgroundColor: theme === 'dark' ? '#4b5563' : '#f3f4f6', color: theme === 'dark' ? '#fff' : '#333' }}
                                />
                                <button type="submit" className="submit-review-btn">
                                    {language === 'es' ? 'Publicar' : 'Post Review'}
                                </button>
                            </form>
                        )}

                        <div className="reviews-list">
                            {reviews.length === 0 ? (
                                <p className="no-reviews">{language === 'es' ? 'Sé el primero en opinar.' : 'Be the first to review.'}</p>
                            ) : (
                                reviews.map(review => (
                                    <div key={review.id} className="review-item" style={{ borderBottomColor: theme === 'dark' ? '#4b5563' : '#eee' }}>
                                        <div className="review-top">
                                            <span className="review-author" style={{ color: theme === 'dark' ? '#e5e7eb' : '#333' }}>{review.name}</span>
                                            <div className="review-stars">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star key={i} size={14} fill={i < review.rating ? "#ffd700" : "none"} color={i < review.rating ? "#ffd700" : "#ddd"} />
                                                ))}
                                            </div>
                                        </div>
                                        <p className="review-text" style={{ color: theme === 'dark' ? '#9ca3af' : '#666' }}>{review.comment}</p>
                                        <div className="review-footer">
                                            <span className="review-date">{review.date}</span>
                                            <button
                                                className={`like-btn ${likedReviews.includes(review.id) ? 'liked' : ''}`}
                                                onClick={() => handleLike(review.id)}
                                            >
                                                <Heart size={16} fill={likedReviews.includes(review.id) ? "#ff6b9d" : "none"} />
                                                <span>{review.likes}</span>
                                            </button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
