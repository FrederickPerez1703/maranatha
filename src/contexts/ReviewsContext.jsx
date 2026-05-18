import { createContext, useContext, useState, useEffect } from 'react';

const ReviewsContext = createContext();

export const useReviews = () => {
    const context = useContext(ReviewsContext);
    if (!context) {
        throw new Error('useReviews must be used within a ReviewsProvider');
    }
    return context;
};

export const ReviewsProvider = ({ children }) => {
    // Default reviews
    const defaultReviews = [
        { id: 1, name: 'María G.', rating: 5, comment: 'Excelente servicio, muy profesional', likes: 12, date: '2025-01-15' },
        { id: 2, name: 'Sarah J.', rating: 5, comment: 'Best salon in Anguilla!', likes: 8, date: '2025-01-20' }
    ];

    const [reviews, setReviews] = useState(() => {
        try {
            const savedReviews = localStorage.getItem('userReviews');
            return savedReviews ? JSON.parse(savedReviews) : defaultReviews;
        } catch (error) {
            console.error('Error loading reviews:', error);
            return defaultReviews;
        }
    });

    useEffect(() => {
        localStorage.setItem('userReviews', JSON.stringify(reviews));
    }, [reviews]);

    const addReview = (reviewData) => {
        const newReview = {
            id: Date.now(),
            name: reviewData.name,
            rating: reviewData.rating,
            comment: reviewData.comment,
            likes: 0,
            date: new Date().toISOString().split('T')[0]
        };
        setReviews(prev => [newReview, ...prev]);
    };

    const deleteReview = (id) => {
        setReviews(prev => prev.filter(review => review.id !== id));
    };

    const toggleLike = (reviewId, likedReviews, setLikedReviews) => {
        if (likedReviews.includes(reviewId)) {
            // Unlike logic
            setReviews(prev => prev.map(r =>
                r.id === reviewId ? { ...r, likes: Math.max(0, r.likes - 1) } : r
            ));
            setLikedReviews(prev => prev.filter(id => id !== reviewId));
        } else {
            // Like logic
            setReviews(prev => prev.map(r =>
                r.id === reviewId ? { ...r, likes: r.likes + 1 } : r
            ));
            setLikedReviews(prev => [...prev, reviewId]);
        }
    };

    const value = {
        reviews,
        addReview,
        deleteReview,
        toggleLike
    };

    return (
        <ReviewsContext.Provider value={value}>
            {children}
        </ReviewsContext.Provider>
    );
};
