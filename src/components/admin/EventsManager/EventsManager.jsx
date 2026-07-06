import { useState, useRef } from 'react';
import { useEvents } from '../../../contexts/EventsContext';
import { Plus, X, Edit, Trash, Upload } from 'lucide-react';
import ConfirmationModal from '../../ui/ConfirmationModal/ConfirmationModal';
import './EventsManager.css';

export default function EventsManager() {
    const { events, addEvent, updateEvent, deleteEvent } = useEvents();

    const [isEditing, setIsEditing] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [eventToDelete, setEventToDelete] = useState(null);
    const fileInputRef = useRef(null);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 5000000) {
                alert('La imagen es demasiado grande. El máximo es 5MB.');
                return;
            }

            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData({ ...formData, image: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    const triggerFileInput = () => {
        fileInputRef.current.click();
    };

    const [currentEvent, setCurrentEvent] = useState(null);
    const [formData, setFormData] = useState({
        title_es: '',
        title_en: '',
        date: '',
        time: '',
        location: '',
        description_es: '',
        description_en: '',
        price_es: '',
        price_en: '',
        image: ''
    });

    const handleEdit = (event) => {
        setIsEditing(true);
        setCurrentEvent(event);
        setFormData({
            title_es: event.title.es,
            title_en: event.title.en,
            date: event.date,
            time: event.time,
            location: event.location,
            description_es: event.description.es,
            description_en: event.description.en,
            price_es: event.price.es || event.price,
            price_en: event.price.en || event.price,
            image: event.image
        });
    };

    const handleAddNew = () => {
        setIsEditing(true);
        setCurrentEvent(null);
        setFormData({
            title_es: '',
            title_en: '',
            date: '',
            time: '',
            location: '',
            description_es: '',
            description_en: '',
            price_es: '',
            price_en: '',
            image: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&q=80&w=800'
        });
    };

    const handleDelete = (event) => {
        setEventToDelete(event);
        setShowDeleteModal(true);
    };

    const confirmDelete = () => {
        if (eventToDelete) {
            deleteEvent(eventToDelete.id);
            setEventToDelete(null);
        }
        setShowDeleteModal(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const eventData = {
            title: { es: formData.title_es, en: formData.title_en },
            date: formData.date,
            time: formData.time,
            location: formData.location,
            description: { es: formData.description_es, en: formData.description_en },
            price: { es: formData.price_es, en: formData.price_en },
            image: formData.image
        };

        if (currentEvent) {
            updateEvent(currentEvent.id, eventData);
        } else {
            addEvent(eventData);
        }
        setIsEditing(false);
    };

    if (isEditing) {
        return (
            <div className="events-manager admin-section">
                <div className="events-form-container">
                    <div className="events-form-header">
                        <div>
                            <h2>{currentEvent ? 'Editar Evento' : 'Nuevo Evento'}</h2>
                            <p>Completa la información para actualizar el evento.</p>
                        </div>
                        <button
                            className="btn btn-icon btn-outline-gray"
                            onClick={() => setIsEditing(false)}
                        >
                            <X size={20} />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="events-form">
                        {/* Títulos */}
                        <div className="form-row form-row-2">
                            <div className="form-group">
                                <label className="form-label">Título (Español)</label>
                                <input
                                    className="form-input"
                                    required
                                    value={formData.title_es}
                                    onChange={e => setFormData({ ...formData, title_es: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Title (English)</label>
                                <input
                                    className="form-input"
                                    required
                                    value={formData.title_en}
                                    onChange={e => setFormData({ ...formData, title_en: e.target.value })}
                                />
                            </div>
                        </div>

                        {/* Detalles */}
                        <div className="form-row form-row-3">
                            <div className="form-group">
                                <label className="form-label">Fecha</label>
                                <input
                                    type="date"
                                    className="form-input"
                                    required
                                    value={formData.date}
                                    onChange={e => setFormData({ ...formData, date: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Hora</label>
                                <input
                                    className="form-input"
                                    required
                                    value={formData.time}
                                    onChange={e => setFormData({ ...formData, time: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Ubicación</label>
                                <input
                                    className="form-input"
                                    required
                                    value={formData.location}
                                    onChange={e => setFormData({ ...formData, location: e.target.value })}
                                />
                            </div>
                        </div>

                        {/* Precios */}
                        <div className="form-row form-row-2">
                            <div className="form-group">
                                <label className="form-label">Precio (Español)</label>
                                <input
                                    className="form-input"
                                    required
                                    value={formData.price_es}
                                    onChange={e => setFormData({ ...formData, price_es: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Price (English)</label>
                                <input
                                    className="form-input"
                                    required
                                    value={formData.price_en}
                                    onChange={e => setFormData({ ...formData, price_en: e.target.value })}
                                />
                            </div>
                        </div>

                        {/* Descripciones */}
                        <div className="form-group">
                            <label className="form-label">Descripción (Español)</label>
                            <textarea
                                className="form-textarea"
                                rows={3}
                                required
                                value={formData.description_es}
                                onChange={e => setFormData({ ...formData, description_es: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Description (English)</label>
                            <textarea
                                className="form-textarea"
                                rows={3}
                                required
                                value={formData.description_en}
                                onChange={e => setFormData({ ...formData, description_en: e.target.value })}
                            />
                        </div>

                        {/* Imagen Upload */}
                        <div className="form-group">
                            <label className="form-label">Imagen del Evento</label>
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleImageUpload}
                                className="d-none"
                                accept="image/*"
                            />
                            <div className="image-upload-zone" onClick={triggerFileInput}>
                                {formData.image ? (
                                    <div className="image-preview">
                                        <img src={formData.image} alt="Preview" />
                                        <p className="image-preview-text">Clic para cambiar imagen</p>
                                    </div>
                                ) : (
                                    <>
                                        <div className="image-upload-icon">
                                            <Upload size={24} color="var(--color-primary)" />
                                        </div>
                                        <p className="image-upload-text">Subir imagen del dispositivo</p>
                                        <p className="image-upload-hint">JPG, PNG o WEBP (Max 5MB)</p>
                                    </>
                                )}
                            </div>
                        </div>

                        <div className="events-form-footer">
                            <button
                                type="button"
                                className="btn btn-outline-gray"
                                onClick={() => setIsEditing(false)}
                            >
                                Cancelar
                            </button>
                            <button type="submit" className="btn btn-primary">
                                {currentEvent ? 'Guardar Cambios' : 'Crear Evento'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="events-manager admin-section">
            <div className="events-header">
                <h2>Gestión de Eventos</h2>
                <button className="btn btn-primary" onClick={handleAddNew}>
                    <Plus size={20} /> Nuevo Evento
                </button>
            </div>

            <div className="events-grid">
                {events.map(event => (
                    <div key={event.id} className="event-card">
                        <div className="event-card-image">
                            <img src={event.image} alt={event.title.es} />
                            <span className="event-card-date">{event.date}</span>
                        </div>
                        <h3 className="event-card-title">{event.title.es}</h3>
                        <p className="event-card-description">{event.description.es}</p>

                        <div className="event-card-actions">
                            <button
                                className="btn btn-sm btn-outline-gray"
                                onClick={() => handleEdit(event)}
                            >
                                <Edit size={16} /> Editar
                            </button>
                            <button
                                className="btn btn-sm btn-soft-danger"
                                onClick={() => handleDelete(event)}
                            >
                                <Trash size={16} /> Eliminar
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal de confirmación de eliminación */}
            <ConfirmationModal
                isOpen={showDeleteModal}
                onClose={() => {
                    setShowDeleteModal(false);
                    setEventToDelete(null);
                }}
                onConfirm={confirmDelete}
                title="¿Eliminar evento?"
                message={eventToDelete ? `¿Estás seguro de eliminar el evento "${eventToDelete.title.es}"? Esta acción no se puede deshacer.` : ''}
                type="danger"
                confirmText="Eliminar"
                cancelText="Cancelar"
            />
        </div>
    );
}
