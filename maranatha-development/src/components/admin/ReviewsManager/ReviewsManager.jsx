import { useState } from 'react';
import { useReviews } from '../../../contexts/ReviewsContext';
import { Trash } from 'lucide-react';
import ConfirmationModal from '../../ui/ConfirmationModal/ConfirmationModal';
import './ReviewsManager.css';

export default function ReviewsManager() {
    const { reviews, deleteReview } = useReviews();
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [reviewToDelete, setReviewToDelete] = useState(null);

    const handleDelete = (review) => {
        setReviewToDelete(review);
        setShowDeleteModal(true);
    };

    const confirmDelete = () => {
        if (reviewToDelete) {
            deleteReview(reviewToDelete.id);
            setReviewToDelete(null);
        }
        setShowDeleteModal(false);
    };

    return (
        <div className="reviews-manager admin-section">
            <div className="reviews-header">
                <h2>Gestión de Reseñas</h2>
                <p>Aquí puedes moderar las opiniones de los clientes.</p>
            </div>

            <div className="reviews-table-container">
                <table className="reviews-table">
                    <thead>
                        <tr>
                            <th>Fecha</th>
                            <th>Cliente</th>
                            <th>Calificación</th>
                            <th>Comentario</th>
                            <th className="actions-cell">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reviews.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="reviews-empty">
                                    No hay reseñas registradas.
                                </td>
                            </tr>
                        ) : (
                            reviews.map(review => (
                                <tr key={review.id}>
                                    <td>{review.date}</td>
                                    <td className="client-name">{review.name}</td>
                                    <td>
                                        <div className="rating-stars">
                                            {[...Array(5)].map((_, i) => (
                                                <span
                                                    key={i}
                                                    className={i >= review.rating ? 'inactive' : ''}
                                                >
                                                    ★
                                                </span>
                                            ))}
                                        </div>
                                    </td>
                                    <td className="comment-cell">{review.comment}</td>
                                    <td className="actions-cell">
                                        <button
                                            className="btn btn-icon btn-soft-danger"
                                            onClick={() => handleDelete(review)}
                                            title="Eliminar Reseña"
                                        >
                                            <Trash size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Modal de confirmación de eliminación */}
            <ConfirmationModal
                isOpen={showDeleteModal}
                onClose={() => {
                    setShowDeleteModal(false);
                    setReviewToDelete(null);
                }}
                onConfirm={confirmDelete}
                title="¿Eliminar reseña?"
                message={reviewToDelete ? `¿Estás seguro de eliminar la reseña de "${reviewToDelete.name}"? Esta acción no se puede deshacer.` : ''}
                type="danger"
                confirmText="Eliminar"
                cancelText="Cancelar"
            />
        </div>
    );
}
