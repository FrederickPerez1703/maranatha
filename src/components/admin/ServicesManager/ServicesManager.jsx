import React, { useState } from 'react';
import { Calendar, DollarSign, Users, Clock, Settings, LogOut } from 'lucide-react';

// Componente de Gestión de Servicios
const ServicesManager = () => {
  const [showModal, setShowModal] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [services, setServices] = useState([
    {
      id: 1,
      name: 'Manicura Clásica',
      category: 'nails',
      price: 25,
      duration: 45,
      description: 'Manicura tradicional con limado, cutícula y esmaltado',
      status: 'active',
      popularity: 92
    },
    {
      id: 2,
      name: 'Manicura Francesa',
      category: 'nails',
      price: 30,
      duration: 60,
      description: 'Elegante manicura con diseño francés clásico',
      status: 'active',
      popularity: 87
    },
    {
      id: 3,
      name: 'Uñas Acrílicas',
      category: 'nails',
      price: 45,
      duration: 90,
      description: 'Extensión de uñas con acrílico de alta calidad',
      status: 'active',
      popularity: 78
    },
    {
      id: 4,
      name: 'Corte de Cabello',
      category: 'hair',
      price: 30,
      duration: 60,
      description: 'Corte profesional adaptado a tu estilo',
      status: 'active',
      popularity: 95
    },
    {
      id: 5,
      name: 'Coloración Completa',
      category: 'hair',
      price: 80,
      duration: 180,
      description: 'Tinte completo con productos profesionales',
      status: 'active',
      popularity: 73
    },
    {
      id: 6,
      name: 'Limpieza Facial Básica',
      category: 'facial',
      price: 40,
      duration: 60,
      description: 'Limpieza profunda para todo tipo de piel',
      status: 'active',
      popularity: 85
    },
    {
      id: 7,
      name: 'Maquillaje de Novia',
      category: 'makeup',
      price: 100,
      duration: 120,
      description: 'Maquillaje profesional para el día más especial',
      status: 'active',
      popularity: 68
    },
    {
      id: 8,
      name: 'Pedicura Spa',
      category: 'nails',
      price: 40,
      duration: 75,
      description: 'Tratamiento relajante para pies con exfoliación',
      status: 'inactive',
      popularity: 61
    }
  ]);

  const [newService, setNewService] = useState({
    name: '',
    category: 'nails',
    price: '',
    duration: '',
    description: '',
    status: 'active'
  });

  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('name');

  const categories = {
    nails: { name: 'Cuidado de Uñas', icon: '💅', color: '#ff6b9d' },
    hair: { name: 'Peluquería', icon: '💇‍♀️', color: '#9333ea' },
    facial: { name: 'Tratamientos Faciales', icon: '✨', color: '#10b981' },
    makeup: { name: 'Maquillaje', icon: '💄', color: '#f59e0b' }
  };

  const filteredServices = services
    .filter(service => filter === 'all' || service.category === filter)
    .sort((a, b) => {
      switch(sortBy) {
        case 'price': return b.price - a.price;
        case 'popularity': return b.popularity - a.popularity;
        case 'duration': return b.duration - a.duration;
        default: return a.name.localeCompare(b.name);
      }
    });

  const handleSaveService = () => {
    if (editingService) {
      setServices(services.map(service => 
        service.id === editingService.id 
          ? { ...newService, id: editingService.id, popularity: editingService.popularity }
          : service
      ));
    } else {
      const id = Math.max(...services.map(s => s.id)) + 1;
      setServices([...services, { ...newService, id, popularity: Math.floor(Math.random() * 40) + 60 }]);
    }
    setShowModal(false);
    setEditingService(null);
    setNewService({
      name: '',
      category: 'nails',
      price: '',
      duration: '',
      description: '',
      status: 'active'
    });
  };

  const handleEdit = (service) => {
    setEditingService(service);
    setNewService({
      name: service.name,
      category: service.category,
      price: service.price,
      duration: service.duration,
      description: service.description,
      status: service.status
    });
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este servicio?')) {
      setServices(services.filter(service => service.id !== id));
    }
  };

  const toggleStatus = (id) => {
    setServices(services.map(service => 
      service.id === id 
        ? { ...service, status: service.status === 'active' ? 'inactive' : 'active' }
        : service
    ));
  };

  const getServiceStats = () => {
    const total = services.length;
    const active = services.filter(s => s.status === 'active').length;
    const avgPrice = services.reduce((sum, s) => sum + s.price, 0) / total;
    const avgDuration = services.reduce((sum, s) => sum + s.duration, 0) / total;

    return { total, active, avgPrice: avgPrice.toFixed(0), avgDuration: avgDuration.toFixed(0) };
  };

  const stats = getServiceStats();

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h2 style={{ color: '#ff6b9d', fontSize: '28px', margin: 0 }}>Gestión de Servicios</h2>
        <button
          onClick={() => setShowModal(true)}
          style={{
            background: 'linear-gradient(135deg, #ff6b9d, #ff8fab)',
            color: 'white',
            padding: '12px 24px',
            borderRadius: '50px',
            border: 'none',
            fontSize: '14px',
            fontWeight: 'bold',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: '0 5px 20px rgba(255, 107, 157, 0.3)'
          }}
          onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
          onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
        >
          ➕ Añadir Servicio
        </button>
      </div>

      {/* Estadísticas */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
        gap: '20px',
        marginBottom: '30px'
      }}>
        <div style={{
          background: 'white',
          padding: '20px',
          borderRadius: '15px',
          boxShadow: '0 10px 30px rgba(255, 107, 157, 0.1)',
          border: '2px solid transparent',
          transition: 'all 0.3s ease'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
            <div style={{ fontSize: '24px' }}>📊</div>
            <div style={{ fontWeight: 'bold', color: '#333' }}>Total Servicios</div>
          </div>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#ff6b9d' }}>{stats.total}</div>
        </div>

        <div style={{
          background: 'white',
          padding: '20px',
          borderRadius: '15px',
          boxShadow: '0 10px 30px rgba(255, 107, 157, 0.1)',
          border: '2px solid transparent',
          transition: 'all 0.3s ease'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
            <div style={{ fontSize: '24px' }}>✅</div>
            <div style={{ fontWeight: 'bold', color: '#333' }}>Servicios Activos</div>
          </div>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#10b981' }}>{stats.active}</div>
        </div>

        <div style={{
          background: 'white',
          padding: '20px',
          borderRadius: '15px',
          boxShadow: '0 10px 30px rgba(255, 107, 157, 0.1)',
          border: '2px solid transparent',
          transition: 'all 0.3s ease'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
            <div style={{ fontSize: '24px' }}>💰</div>
            <div style={{ fontWeight: 'bold', color: '#333' }}>Precio Promedio</div>
          </div>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#f59e0b' }}>${stats.avgPrice}</div>
        </div>

        <div style={{
          background: 'white',
          padding: '20px',
          borderRadius: '15px',
          boxShadow: '0 10px 30px rgba(255, 107, 157, 0.1)',
          border: '2px solid transparent',
          transition: 'all 0.3s ease'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
            <div style={{ fontSize: '24px' }}>⏱️</div>
            <div style={{ fontWeight: 'bold', color: '#333' }}>Duración Promedio</div>
          </div>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#9333ea' }}>{stats.avgDuration}min</div>
        </div>
      </div>

      {/* Filtros y Ordenamiento */}
      <div style={{ 
        display: 'flex', 
        gap: '15px', 
        marginBottom: '25px',
        alignItems: 'center',
        flexWrap: 'wrap'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '14px', color: '#666', fontWeight: 'bold' }}>Filtrar:</span>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            style={{
              padding: '8px 12px',
              borderRadius: '8px',
              border: '2px solid #f0f0f0',
              background: 'white',
              fontSize: '14px',
              outline: 'none'
            }}
          >
            <option value="all">Todas las categorías</option>
            {Object.entries(categories).map(([key, cat]) => (
              <option key={key} value={key}>{cat.icon} {cat.name}</option>
            ))}
          </select>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '14px', color: '#666', fontWeight: 'bold' }}>Ordenar:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            style={{
              padding: '8px 12px',
              borderRadius: '8px',
              border: '2px solid #f0f0f0',
              background: 'white',
              fontSize: '14px',
              outline: 'none'
            }}
          >
            <option value="name">Nombre (A-Z)</option>
            <option value="price">Precio (Mayor a menor)</option>
            <option value="popularity">Popularidad</option>
            <option value="duration">Duración</option>
          </select>
        </div>
      </div>

      {/* Lista de Servicios */}
      <div style={{
        background: 'white',
        borderRadius: '20px',
        padding: '25px',
        boxShadow: '0 10px 30px rgba(255, 107, 157, 0.1)'
      }}>
        <div style={{ display: 'grid', gap: '15px' }}>
          {filteredServices.map(service => {
            const category = categories[service.category];
            return (
              <div key={service.id} style={{
                display: 'grid',
                gridTemplateColumns: '60px 1fr 100px 80px 100px 150px',
                alignItems: 'center',
                padding: '20px',
                background: service.status === 'active' ? '#f8f9fa' : '#f5f5f5',
                borderRadius: '15px',
                border: `2px solid ${service.status === 'active' ? '#f0f0f0' : '#e0e0e0'}`,
                gap: '20px',
                opacity: service.status === 'active' ? 1 : 0.7,
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => {
                e.target.closest('div').style.transform = 'translateY(-2px)';
                e.target.closest('div').style.boxShadow = '0 8px 25px rgba(255, 107, 157, 0.15)';
              }}
              onMouseOut={(e) => {
                e.target.closest('div').style.transform = 'translateY(0)';
                e.target.closest('div').style.boxShadow = 'none';
              }}>
                
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  background: `${category.color}15`,
                  fontSize: '24px'
                }}>
                  {category.icon}
                </div>

                <div>
                  <div style={{ fontWeight: 'bold', color: '#333', marginBottom: '5px', fontSize: '16px' }}>
                    {service.name}
                  </div>
                  <div style={{ fontSize: '13px', color: '#666', marginBottom: '5px', lineHeight: 1.3 }}>
                    {service.description}
                  </div>
                  <div style={{ fontSize: '12px', color: category.color, fontWeight: 'bold' }}>
                    {category.name}
                  </div>
                </div>

                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontWeight: 'bold', color: '#ff6b9d', fontSize: '18px' }}>
                    ${service.price}
                  </div>
                </div>

                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '14px', color: '#666' }}>{service.duration}min</div>
                </div>

                <div style={{ textAlign: 'center' }}>
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    gap: '8px'
                  }}>
                    <div style={{
                      width: '40px',
                      height: '6px',
                      background: '#f0f0f0',
                      borderRadius: '3px',
                      overflow: 'hidden'
                    }}>
                      <div style={{
                        width: `${service.popularity}%`,
                        height: '100%',
                        background: service.popularity > 80 ? '#10b981' : service.popularity > 60 ? '#f59e0b' : '#ef4444',
                        borderRadius: '3px'
                      }}></div>
                    </div>
                    <span style={{ fontSize: '12px', color: '#666', fontWeight: 'bold' }}>
                      {service.popularity}%
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                  <button
                    onClick={() => handleEdit(service)}
                    style={{
                      padding: '8px 12px',
                      borderRadius: '8px',
                      border: 'none',
                      background: '#9333ea15',
                      color: '#9333ea',
                      cursor: 'pointer',
                      fontSize: '12px',
                      fontWeight: 'bold'
                    }}
                  >
                    ✏️ Editar
                  </button>
                  <button
                    onClick={() => toggleStatus(service.id)}
                    style={{
                      padding: '8px 12px',
                      borderRadius: '8px',
                      border: 'none',
                      background: service.status === 'active' ? '#f59e0b15' : '#10b98115',
                      color: service.status === 'active' ? '#f59e0b' : '#10b981',
                      cursor: 'pointer',
                      fontSize: '12px',
                      fontWeight: 'bold'
                    }}
                  >
                    {service.status === 'active' ? '⏸️ Pausar' : '▶️ Activar'}
                  </button>
                  <button
                    onClick={() => handleDelete(service.id)}
                    style={{
                      padding: '8px',
                      borderRadius: '8px',
                      border: 'none',
                      background: '#ef444415',
                      color: '#ef4444',
                      cursor: 'pointer',
                      fontSize: '12px'
                    }}
                  >
                    🗑️
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal para Añadir/Editar Servicio */}
      {showModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }} onClick={() => setShowModal(false)}>
          <div style={{
            background: 'white',
            borderRadius: '20px',
            padding: '30px',
            width: '90%',
            maxWidth: '500px',
            maxHeight: '90vh',
            overflowY: 'auto'
          }} onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
              <h3 style={{ color: '#ff6b9d', fontSize: '24px', margin: 0 }}>
                {editingService ? 'Editar Servicio' : 'Nuevo Servicio'}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '24px',
                  cursor: 'pointer',
                  color: '#999'
                }}
              >
                ×
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', color: '#333', marginBottom: '8px' }}>
                  Nombre del Servicio *
                </label>
                <input
                  type="text"
                  value={newService.name}
                  onChange={(e) => setNewService({...newService, name: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '2px solid #f0f0f0',
                    borderRadius: '10px',
                    fontSize: '16px',
                    outline: 'none'
                  }}
                  placeholder="Ej: Manicura Clásica"
                  onFocus={(e) => e.target.style.borderColor = '#ff6b9d'}
                  onBlur={(e) => e.target.style.borderColor = '#f0f0f0'}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', color: '#333', marginBottom: '8px' }}>
                  Categoría *
                </label>
                <select
                  value={newService.category}
                  onChange={(e) => setNewService({...newService, category: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '2px solid #f0f0f0',
                    borderRadius: '10px',
                    fontSize: '16px',
                    outline: 'none',
                    background: 'white'
                  }}
                >
                  {Object.entries(categories).map(([key, cat]) => (
                    <option key={key} value={key}>{cat.icon} {cat.name}</option>
                  ))}
                </select>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', color: '#333', marginBottom: '8px' }}>
                    Precio ($) *
                  </label>
                  <input
                    type="number"
                    value={newService.price}
                    onChange={(e) => setNewService({...newService, price: parseInt(e.target.value) || ''})}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      border: '2px solid #f0f0f0',
                      borderRadius: '10px',
                      fontSize: '16px',
                      outline: 'none'
                    }}
                    placeholder="25"
                    onFocus={(e) => e.target.style.borderColor = '#ff6b9d'}
                    onBlur={(e) => e.target.style.borderColor = '#f0f0f0'}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', color: '#333', marginBottom: '8px' }}>
                    Duración (min) *
                  </label>
                  <input
                    type="number"
                    value={newService.duration}
                    onChange={(e) => setNewService({...newService, duration: parseInt(e.target.value) || ''})}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      border: '2px solid #f0f0f0',
                      borderRadius: '10px',
                      fontSize: '16px',
                      outline: 'none'
                    }}
                    placeholder="45"
                    onFocus={(e) => e.target.style.borderColor = '#ff6b9d'}
                    onBlur={(e) => e.target.style.borderColor = '#f0f0f0'}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', color: '#333', marginBottom: '8px' }}>
                  Descripción
                </label>
                <textarea
                  value={newService.description}
                  onChange={(e) => setNewService({...newService, description: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '2px solid #f0f0f0',
                    borderRadius: '10px',
                    fontSize: '16px',
                    outline: 'none',
                    minHeight: '80px',
                    resize: 'vertical'
                  }}
                  placeholder="Descripción detallada del servicio..."
                  onFocus={(e) => e.target.style.borderColor = '#ff6b9d'}
                  onBlur={(e) => e.target.style.borderColor = '#f0f0f0'}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', color: '#333', marginBottom: '8px' }}>
                  Estado
                </label>
                <select
                  value={newService.status}
                  onChange={(e) => setNewService({...newService, status: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '2px solid #f0f0f0',
                    borderRadius: '10px',
                    fontSize: '16px',
                    outline: 'none',
                    background: 'white'
                  }}
                >
                  <option value="active">✅ Activo</option>
                  <option value="inactive">⏸️ Inactivo</option>
                </select>
              </div>

              <div style={{ display: 'flex', gap: '15px', marginTop: '20px' }}>
                <button
                  onClick={() => setShowModal(false)}
                  style={{
                    flex: 1,
                    padding: '15px',
                    border: '2px solid #f0f0f0',
                    borderRadius: '10px',
                    background: 'white',
                    color: '#666',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    cursor: 'pointer'
                  }}
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSaveService}
                  disabled={!newService.name || !newService.price || !newService.duration}
                  style={{
                    flex: 1,
                    padding: '15px',
                    border: 'none',
                    borderRadius: '10px',
                    background: (!newService.name || !newService.price || !newService.duration) 
                      ? '#ccc' 
                      : 'linear-gradient(135deg, #ff6b9d, #ff8fab)',
                    color: 'white',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    cursor: (!newService.name || !newService.price || !newService.duration) ? 'not-allowed' : 'pointer'
                  }}
                >
                  {editingService ? 'Actualizar' : 'Crear'} Servicio
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServicesManager;