import React, { useState, useMemo } from 'react';
import { useServices } from '../../../contexts/ServicesContext';

const ServicesManager = () => {
  const {
    services: contextServices,
    categories: contextCategories,
    addService,
    updateService,
    deleteService,
    toggleServiceStatus,
    addCategory,
    deleteCategory
  } = useServices();

  const [activeTab, setActiveTab] = useState('services'); // 'services' or 'categories'
  const [showModal, setShowModal] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [editingService, setEditingService] = useState(null);

  // Estado para formulario de servicio
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    duration: '',
    description: ''
  });

  // Estado para formulario de categoría
  const [categoryFormData, setCategoryFormData] = useState({
    name: '',
    icon: '✨',
    color: '#ec4899'
  });

  // Estado para controlar categorías expandidas
  const [expandedCategories, setExpandedCategories] = useState(() => {
    const initial = {};
    if (contextCategories) {
      contextCategories.forEach(cat => initial[cat.name] = true);
    }
    return initial;
  });

  const toggleCategory = (categoryName) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryName]: !prev[categoryName]
    }));
  };

  const servicesByCategory = useMemo(() => {
    const grouped = {};
    if (contextCategories) {
      contextCategories.forEach(cat => {
        grouped[cat.name] = contextServices.filter(s => s.category === cat.name);
      });
    }
    return grouped;
  }, [contextServices, contextCategories]);

  const handleEdit = (service) => {
    setEditingService(service);
    setFormData({
      name: service.name,
      category: service.category,
      duration: service.duration,
      description: service.description || ''
    });
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este servicio?')) {
      deleteService(id);
    }
  };

  const handleDeleteCategory = (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta categoría? Se ocultarán los servicios asociados.')) {
      deleteCategory(id);
    }
  };

  const handleSaveService = () => {
    if (!formData.name || !formData.category) {
      alert('Por favor, completa todos los campos obligatorios');
      return;
    }

    const serviceData = {
      name: formData.name,
      category: formData.category,
      duration: parseInt(formData.duration) || 60,
      description: formData.description
    };

    if (editingService) {
      updateService(editingService.id, serviceData);
    } else {
      addService(serviceData);
    }

    setShowModal(false);
    setEditingService(null);
    setFormData({ name: '', category: '', duration: '', description: '' });
  };

  const handleSaveCategory = () => {
    if (!categoryFormData.name) {
      alert('El nombre de la categoría es obligatorio');
      return;
    }
    addCategory(categoryFormData);
    setShowCategoryModal(false);
    setCategoryFormData({ name: '', icon: '✨', color: '#ec4899' });
  };

  const stats = {
    total: contextServices.length,
    active: contextServices.filter(s => s.active).length,
    categories: contextCategories.length
  };

  const availableIcons = ['💅', '💇', '💄', '✨', '🌟', '💎', '🌸', '💆', '🧖', '✂️', '🧴', '👁️'];
  const availableColors = ['#ff6b9d', '#a855f7', '#ec4899', '#8b5cf6', '#f59e0b', '#10b981', '#3b82f6', '#ef4444'];

  return (
    <div style={{ padding: '20px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <div>
          <h2 style={{ color: '#ff6b9d', fontSize: '28px', margin: '0 0 10px 0' }}>Gestión de Servicios</h2>
          <p style={{ color: '#666', margin: 0 }}>Administra los servicios y categorías de tu salón</p>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '30px', borderBottom: '2px solid #f0f0f0', paddingBottom: '1px' }}>
        <button
          onClick={() => setActiveTab('services')}
          style={{
            padding: '12px 24px',
            background: activeTab === 'services' ? '#ff6b9d' : 'transparent',
            color: activeTab === 'services' ? 'white' : '#666',
            border: 'none',
            borderRadius: '10px 10px 0 0',
            cursor: 'pointer',
            fontWeight: 'bold',
            fontSize: '16px',
            transition: 'all 0.3s'
          }}
        >
          💅 Servicios
        </button>
        <button
          onClick={() => setActiveTab('categories')}
          style={{
            padding: '12px 24px',
            background: activeTab === 'categories' ? '#ff6b9d' : 'transparent',
            color: activeTab === 'categories' ? 'white' : '#666',
            border: 'none',
            borderRadius: '10px 10px 0 0',
            cursor: 'pointer',
            fontWeight: 'bold',
            fontSize: '16px',
            transition: 'all 0.3s'
          }}
        >
          📑 Categorías
        </button>
      </div>

      {/* Content based on Active Tab */}
      {activeTab === 'services' ? (
        <>
          {/* Stats & Add Button */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
            <button
              onClick={() => {
                setEditingService(null);
                setFormData({ name: '', category: '', duration: '', description: '' });
                setShowModal(true);
              }}
              style={{
                background: 'linear-gradient(135deg, #ff6b9d, #ff8fab)',
                color: 'white',
                border: 'none',
                padding: '12px 24px',
                borderRadius: '10px',
                cursor: 'pointer',
                fontWeight: 'bold',
                fontSize: '14px',
                boxShadow: '0 4px 15px rgba(255, 107, 157, 0.3)'
              }}
            >
              + Agregar Servicio
            </button>
          </div>

          {/* New Stats Cards Design */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '20px',
            marginBottom: '30px'
          }}>
            {/* Total Servicios */}
            <div style={{
              background: 'white',
              padding: '25px',
              borderRadius: '20px',
              textAlign: 'center',
              boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
              transition: 'transform 0.3s ease',
              cursor: 'default'
            }}
              onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <div style={{ fontSize: '28px', marginBottom: '10px' }}>💅</div>
              <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#ff6b9d', marginBottom: '5px' }}>{stats.total}</div>
              <div style={{ fontSize: '14px', color: '#888', fontWeight: '500' }}>Total Servicios</div>
            </div>

            {/* Activos */}
            <div style={{
              background: 'white',
              padding: '25px',
              borderRadius: '20px',
              textAlign: 'center',
              boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
              transition: 'transform 0.3s ease',
              cursor: 'default'
            }}
              onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <div style={{ fontSize: '28px', marginBottom: '10px' }}>✨</div>
              <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#10b981', marginBottom: '5px' }}>{stats.active}</div>
              <div style={{ fontSize: '14px', color: '#888', fontWeight: '500' }}>Servicios Activos</div>
            </div>

            {/* Categorías */}
            <div style={{
              background: 'white',
              padding: '25px',
              borderRadius: '20px',
              textAlign: 'center',
              boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
              transition: 'transform 0.3s ease',
              cursor: 'default'
            }}
              onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <div style={{ fontSize: '28px', marginBottom: '10px' }}>📑</div>
              <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#a855f7', marginBottom: '5px' }}>{stats.categories}</div>
              <div style={{ fontSize: '14px', color: '#888', fontWeight: '500' }}>Categorías</div>
            </div>
          </div>

          {/* Services List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
            {contextServices.length === 0 ? (
              <div style={{ background: 'white', borderRadius: '20px', padding: '60px', textAlign: 'center', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
                <div style={{ fontSize: '48px', marginBottom: '15px' }}>💅</div>
                <h3 style={{ color: '#666', marginBottom: '10px' }}>No hay servicios registrados</h3>
                <p style={{ color: '#999', fontSize: '14px' }}>Comienza agregando tu primer servicio</p>
              </div>
            ) : (
              contextCategories.map((category) => {
                const services = servicesByCategory[category.name] || [];
                if (services.length === 0) return null;
                const isExpanded = expandedCategories[category.name];

                return (
                  <div key={category.id}>
                    <div
                      onClick={() => toggleCategory(category.name)}
                      style={{
                        display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '15px', paddingBottom: '10px',
                        borderBottom: `3px solid ${category.color}`, cursor: 'pointer', userSelect: 'none',
                        transition: 'background 0.2s', padding: '10px', borderRadius: '10px 10px 0 0'
                      }}
                      onMouseOver={(e) => e.currentTarget.style.background = 'rgba(0,0,0,0.02)'}
                      onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
                    >
                      <span style={{ fontSize: '32px' }}>{category.icon}</span>
                      <h3 style={{ margin: 0, fontSize: '24px', color: category.color, fontWeight: 'bold', flex: 1 }}>{category.name}</h3>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                        <span style={{ background: category.color, color: 'white', padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold' }}>
                          {services.length} {services.length === 1 ? 'servicio' : 'servicios'}
                        </span>
                        <span style={{ fontSize: '20px', color: '#999', transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease' }}>▼</span>
                      </div>
                    </div>

                    {isExpanded && (
                      <div style={{ display: 'grid', gap: '15px', animation: 'fadeIn 0.3s ease-in-out' }}>
                        <style>{`@keyframes fadeIn { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }`}</style>
                        {services.map((service) => (
                          <div key={service.id} style={{
                            display: 'grid', gridTemplateColumns: '60px 3fr 1fr 1fr 180px', alignItems: 'center', padding: '20px',
                            background: '#f8f9fa', borderRadius: '15px', border: '2px solid #f0f0f0', gap: '20px', transition: 'all 0.3s ease'
                          }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '50px', height: '50px', borderRadius: '50%', background: category.color, color: 'white', fontSize: '24px' }}>{category.icon}</div>
                            <div>
                              <div style={{ fontWeight: 'bold', color: '#333', marginBottom: '5px', fontSize: '16px' }}>{service.name}</div>
                              {service.description && <div style={{ fontSize: '13px', color: '#666', marginBottom: '3px' }}>📝 {service.description}</div>}
                              <div style={{ fontSize: '12px', color: '#999' }}>⏱️ {service.duration} minutos</div>
                            </div>
                            <div style={{ textAlign: 'center' }}>
                              <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#9333ea', marginBottom: '5px' }}>{service.duration}</div>
                              <div style={{ fontSize: '12px', color: '#666' }}>minutos</div>
                            </div>
                            <div style={{ textAlign: 'center' }}>
                              <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#333', marginBottom: '5px' }}>{category.name}</div>
                              <div style={{ fontSize: '12px', color: '#666', marginBottom: '5px' }}>Categoría</div>
                              <div onClick={() => toggleServiceStatus(service.id)} style={{ padding: '3px 8px', borderRadius: '10px', fontSize: '11px', fontWeight: 'bold', background: service.active ? '#d1fae5' : '#fee2e2', color: service.active ? '#065f46' : '#991b1b', cursor: 'pointer', display: 'inline-block' }}>{service.active ? 'Activo' : 'Inactivo'}</div>
                            </div>
                            <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', flexWrap: 'wrap' }}>
                              <button onClick={() => handleEdit(service)} style={{ background: 'linear-gradient(135deg, #3b82f6, #60a5fa)', color: 'white', border: 'none', padding: '8px 12px', borderRadius: '8px', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '5px' }}>✏️ Editar</button>
                              <button onClick={() => handleDelete(service.id)} style={{ background: '#fee2e2', color: '#dc2626', border: 'none', padding: '8px 12px', borderRadius: '8px', cursor: 'pointer', fontSize: '16px' }}>🗑️</button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </>
      ) : (
        <>
          {/* Categories Tab Content */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
            <button
              onClick={() => setShowCategoryModal(true)}
              style={{
                background: 'linear-gradient(135deg, #ff6b9d, #ff8fab)',
                color: 'white',
                border: 'none',
                padding: '12px 24px',
                borderRadius: '10px',
                cursor: 'pointer',
                fontWeight: 'bold',
                fontSize: '14px',
                boxShadow: '0 4px 15px rgba(255, 107, 157, 0.3)'
              }}
            >
              + Nueva Categoría
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
            {contextCategories.map((category) => (
              <div key={category.id} style={{
                background: 'white', borderRadius: '15px', padding: '20px',
                border: '1px solid #eee', boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <div style={{
                    width: '50px', height: '50px', borderRadius: '12px',
                    background: category.color, color: 'white',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '24px'
                  }}>
                    {category.icon}
                  </div>
                  <div>
                    <div style={{ fontWeight: 'bold', fontSize: '16px', color: '#333' }}>{category.name}</div>
                    <div style={{ fontSize: '12px', color: '#666' }}>
                      {servicesByCategory[category.name]?.length || 0} servicios
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => handleDeleteCategory(category.id)}
                  style={{
                    background: '#fee2e2', color: '#dc2626', border: 'none',
                    width: '32px', height: '32px', borderRadius: '8px',
                    cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center'
                  }}
                >
                  🗑️
                </button>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Service Modal */}
      {showModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }}>
          <div style={{ background: 'white', borderRadius: '20px', padding: '30px', maxWidth: '500px', width: '100%', maxHeight: '90vh', overflowY: 'auto' }}>
            <h3 style={{ color: '#ff6b9d', marginBottom: '25px', fontSize: '24px' }}>{editingService ? 'Editar Servicio' : 'Nuevo Servicio'}</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#333' }}>Nombre del Servicio *</label>
                <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="Ej: Manicura Francesa" style={{ width: '100%', padding: '12px', border: '2px solid #e5e7eb', borderRadius: '10px', fontSize: '14px', boxSizing: 'border-box', outline: 'none' }} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#333' }}>Categoría *</label>
                <select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} style={{ width: '100%', padding: '12px', border: '2px solid #e5e7eb', borderRadius: '10px', fontSize: '14px', boxSizing: 'border-box', outline: 'none', background: 'white' }}>
                  <option value="">Selecciona una categoría</option>
                  {contextCategories.map(cat => <option key={cat.id} value={cat.name}>{cat.name}</option>)}
                </select>
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#333' }}>Duración (min)</label>
                <input type="number" min="0" value={formData.duration} onChange={(e) => setFormData({ ...formData, duration: e.target.value })} placeholder="60" style={{ width: '100%', padding: '12px', border: '2px solid #e5e7eb', borderRadius: '10px', fontSize: '14px', boxSizing: 'border-box', outline: 'none' }} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#333' }}>Descripción</label>
                <textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} placeholder="Describe el servicio..." rows="3" style={{ width: '100%', padding: '12px', border: '2px solid #e5e7eb', borderRadius: '10px', fontSize: '14px', boxSizing: 'border-box', outline: 'none', fontFamily: 'inherit', resize: 'vertical' }} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: '10px' }}>
                <button onClick={() => { setShowModal(false); setEditingService(null); setFormData({ name: '', category: '', duration: '', description: '' }); }} style={{ padding: '12px', border: '2px solid #e5e7eb', background: 'white', color: '#666', borderRadius: '10px', cursor: 'pointer', fontWeight: '600', fontSize: '14px' }}>Cancelar</button>
                <button onClick={handleSaveService} style={{ padding: '12px', border: 'none', background: 'linear-gradient(135deg, #ff6b9d, #ff8fab)', color: 'white', borderRadius: '10px', cursor: 'pointer', fontWeight: '600', fontSize: '14px', boxShadow: '0 4px 15px rgba(255, 107, 157, 0.3)' }}>{editingService ? 'Guardar Cambios' : 'Crear Servicio'}</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Category Modal */}
      {showCategoryModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }}>
          <div style={{ background: 'white', borderRadius: '20px', padding: '30px', maxWidth: '400px', width: '100%', maxHeight: '90vh', overflowY: 'auto' }}>
            <h3 style={{ color: '#ff6b9d', marginBottom: '25px', fontSize: '24px' }}>Nueva Categoría</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#333' }}>Nombre *</label>
                <input type="text" value={categoryFormData.name} onChange={(e) => setCategoryFormData({ ...categoryFormData, name: e.target.value })} placeholder="Ej: Masajes" style={{ width: '100%', padding: '12px', border: '2px solid #e5e7eb', borderRadius: '10px', fontSize: '14px', boxSizing: 'border-box', outline: 'none' }} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#333' }}>Icono</label>
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  {availableIcons.map(icon => (
                    <button
                      key={icon}
                      onClick={() => setCategoryFormData({ ...categoryFormData, icon })}
                      style={{
                        fontSize: '24px', padding: '8px', border: categoryFormData.icon === icon ? '2px solid #ff6b9d' : '1px solid #eee',
                        borderRadius: '8px', background: categoryFormData.icon === icon ? '#fff0f5' : 'white', cursor: 'pointer'
                      }}
                    >
                      {icon}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#333' }}>Color</label>
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  {availableColors.map(color => (
                    <button
                      key={color}
                      onClick={() => setCategoryFormData({ ...categoryFormData, color })}
                      style={{
                        width: '30px', height: '30px', borderRadius: '50%', background: color,
                        border: categoryFormData.color === color ? '3px solid #333' : 'none', cursor: 'pointer'
                      }}
                    />
                  ))}
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: '10px' }}>
                <button onClick={() => setShowCategoryModal(false)} style={{ padding: '12px', border: '2px solid #e5e7eb', background: 'white', color: '#666', borderRadius: '10px', cursor: 'pointer', fontWeight: '600', fontSize: '14px' }}>Cancelar</button>
                <button onClick={handleSaveCategory} style={{ padding: '12px', border: 'none', background: 'linear-gradient(135deg, #ff6b9d, #ff8fab)', color: 'white', borderRadius: '10px', cursor: 'pointer', fontWeight: '600', fontSize: '14px', boxShadow: '0 4px 15px rgba(255, 107, 157, 0.3)' }}>Crear Categoría</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServicesManager;