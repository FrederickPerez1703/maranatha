import React, { useState } from 'react';
import { User, Calendar, DollarSign, Users, Clock, Settings, LogOut, Eye, CheckCircle, XCircle, Filter } from 'lucide-react';

// Componente de Gestión de Clientes
const ClientsManager = () => {
  const [showModal, setShowModal] = useState(false);
  const [editingClient, setEditingClient] = useState(null);
  const [viewingClient, setViewingClient] = useState(null);
  const [clients, setClients] = useState([
    {
      id: 1,
      name: 'María González',
      email: 'maria.gonzalez@email.com',
      phone: '+1 (555) 123-4567',
      dateJoined: '2024-01-15',
      lastVisit: '2025-01-28',
      totalVisits: 12,
      totalSpent: 420,
      favoriteService: 'Manicura Francesa',
      status: 'active',
      birthday: '1990-05-15',
      notes: 'Prefiere citas por la mañana. Alérgica al látex.',
      preferredStaff: 'Ana',
      loyaltyPoints: 84
    },
    {
      id: 2,
      name: 'Ana Rodríguez',
      email: 'ana.rodriguez@email.com',
      phone: '+1 (555) 234-5678',
      dateJoined: '2024-03-20',
      lastVisit: '2025-01-30',
      totalVisits: 8,
      totalSpent: 320,
      favoriteService: 'Corte de Cabello',
      status: 'active',
      birthday: '1985-11-22',
      notes: 'Cliente VIP. Siempre puntual.',
      preferredStaff: 'Carmen',
      loyaltyPoints: 64
    },
    {
      id: 3,
      name: 'Sofia López',
      email: 'sofia.lopez@email.com',
      phone: '+1 (555) 345-6789',
      dateJoined: '2023-08-10',
      lastVisit: '2025-01-25',
      totalVisits: 25,
      totalSpent: 1250,
      favoriteService: 'Facial Hidratante',
      status: 'vip',
      birthday: '1992-07-08',
      notes: 'Cliente desde hace tiempo. Le gusta probar servicios nuevos.',
      preferredStaff: 'María',
      loyaltyPoints: 250
    },
    {
      id: 4,
      name: 'Carmen Silva',
      email: 'carmen.silva@email.com',
      phone: '+1 (555) 456-7890',
      dateJoined: '2024-06-12',
      lastVisit: '2024-12-20',
      totalVisits: 3,
      totalSpent: 150,
      favoriteService: 'Maquillaje de Noche',
      status: 'inactive',
      birthday: '1988-03-30',
      notes: 'No ha visitado en un mes. Enviar recordatorio.',
      preferredStaff: 'Ana',
      loyaltyPoints: 15
    },
    {
      id: 5,
      name: 'Isabella Martinez',
      email: 'isabella.martinez@email.com',
      phone: '+1 (555) 567-8901',
      dateJoined: '2025-01-20',
      lastVisit: '2025-01-29',
      totalVisits: 2,
      totalSpent: 85,
      favoriteService: 'Pedicura Spa',
      status: 'new',
      birthday: '1995-12-10',
      notes: 'Cliente nueva. Muy satisfecha con el servicio.',
      preferredStaff: 'Carmen',
      loyaltyPoints: 17
    },
    {
      id: 6,
      name: 'Valentina Torres',
      email: 'valentina.torres@email.com',
      phone: '+1 (555) 678-9012',
      dateJoined: '2023-11-05',
      lastVisit: '2025-01-31',
      totalVisits: 18,
      totalSpent: 890,
      favoriteService: 'Coloración Completa',
      status: 'vip',
      birthday: '1987-09-25',
      notes: 'Siempre trae amigas nuevas. Excelente referidora.',
      preferredStaff: 'María',
      loyaltyPoints: 178
    }
  ]);

  const [newClient, setNewClient] = useState({
    name: '',
    email: '',
    phone: '',
    birthday: '',
    notes: '',
    preferredStaff: '',
    status: 'new'
  });

  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [searchTerm, setSearchTerm] = useState('');

  const statusConfig = {
    new: { label: 'Nuevo', color: '#10b981', bg: '#10b98115' },
    active: { label: 'Activo', color: '#3b82f6', bg: '#3b82f615' },
    vip: { label: 'VIP', color: '#f59e0b', bg: '#f59e0b15' },
    inactive: { label: 'Inactivo', color: '#ef4444', bg: '#ef444415' }
  };

  const staffMembers = ['Ana', 'Carmen', 'María', 'Sofia'];

  const filteredClients = clients
    .filter(client => {
      const matchesFilter = filter === 'all' || client.status === filter;
      const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           client.phone.includes(searchTerm);
      return matchesFilter && matchesSearch;
    })
    .sort((a, b) => {
      switch(sortBy) {
        case 'totalSpent': return b.totalSpent - a.totalSpent;
        case 'totalVisits': return b.totalVisits - a.totalVisits;
        case 'lastVisit': return new Date(b.lastVisit) - new Date(a.lastVisit);
        case 'dateJoined': return new Date(b.dateJoined) - new Date(a.dateJoined);
        default: return a.name.localeCompare(b.name);
      }
    });

  const handleSaveClient = () => {
    if (editingClient) {
      setClients(clients.map(client => 
        client.id === editingClient.id 
          ? { 
              ...newClient, 
              id: editingClient.id,
              dateJoined: editingClient.dateJoined,
              totalVisits: editingClient.totalVisits,
              totalSpent: editingClient.totalSpent,
              lastVisit: editingClient.lastVisit,
              loyaltyPoints: editingClient.loyaltyPoints
            }
          : client
      ));
    } else {
      const id = Math.max(...clients.map(c => c.id)) + 1;
      const today = new Date().toISOString().split('T')[0];
      setClients([...clients, { 
        ...newClient, 
        id, 
        dateJoined: today,
        lastVisit: today,
        totalVisits: 0,
        totalSpent: 0,
        loyaltyPoints: 0,
        favoriteService: 'N/A'
      }]);
    }
    setShowModal(false);
    setEditingClient(null);
    resetNewClient();
  };

  const resetNewClient = () => {
    setNewClient({
      name: '',
      email: '',
      phone: '',
      birthday: '',
      notes: '',
      preferredStaff: '',
      status: 'new'
    });
  };

  const handleEdit = (client) => {
    setEditingClient(client);
    setNewClient({
      name: client.name,
      email: client.email,
      phone: client.phone,
      birthday: client.birthday,
      notes: client.notes,
      preferredStaff: client.preferredStaff,
      status: client.status
    });
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este cliente?')) {
      setClients(clients.filter(client => client.id !== id));
    }
  };

  const getClientStats = () => {
    const total = clients.length;
    const active = clients.filter(c => c.status === 'active').length;
    const vip = clients.filter(c => c.status === 'vip').length;
    const newClients = clients.filter(c => c.status === 'new').length;
    const totalRevenue = clients.reduce((sum, c) => sum + c.totalSpent, 0);
    const avgSpent = totalRevenue / total;

    return { total, active, vip, newClients, totalRevenue, avgSpent: avgSpent.toFixed(0) };
  };

  const stats = getClientStats();

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('es-ES');
  };

  const getClientSegment = (client) => {
    if (client.totalSpent > 800) return 'VIP';
    if (client.totalVisits > 10) return 'Leal';
    if (client.totalVisits < 3) return 'Nuevo';
    return 'Regular';
  };

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h2 style={{ color: '#ff6b9d', fontSize: '28px', margin: 0 }}>Gestión de Clientes</h2>
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
          👤 Añadir Cliente
        </button>
      </div>

      {/* Estadísticas */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', 
        gap: '20px',
        marginBottom: '30px'
      }}>
        <div style={{
          background: 'white',
          padding: '20px',
          borderRadius: '15px',
          boxShadow: '0 10px 30px rgba(255, 107, 157, 0.1)',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '24px', marginBottom: '8px' }}>👥</div>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#ff6b9d', marginBottom: '5px' }}>
            {stats.total}
          </div>
          <div style={{ fontSize: '14px', color: '#666' }}>Total Clientes</div>
        </div>

        <div style={{
          background: 'white',
          padding: '20px',
          borderRadius: '15px',
          boxShadow: '0 10px 30px rgba(255, 107, 157, 0.1)',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '24px', marginBottom: '8px' }}>✨</div>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#f59e0b', marginBottom: '5px' }}>
            {stats.vip}
          </div>
          <div style={{ fontSize: '14px', color: '#666' }}>Clientes VIP</div>
        </div>

        <div style={{
          background: 'white',
          padding: '20px',
          borderRadius: '15px',
          boxShadow: '0 10px 30px rgba(255, 107, 157, 0.1)',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '24px', marginBottom: '8px' }}>🆕</div>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#10b981', marginBottom: '5px' }}>
            {stats.newClients}
          </div>
          <div style={{ fontSize: '14px', color: '#666' }}>Nuevos Este Mes</div>
        </div>

        <div style={{
          background: 'white',
          padding: '20px',
          borderRadius: '15px',
          boxShadow: '0 10px 30px rgba(255, 107, 157, 0.1)',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '24px', marginBottom: '8px' }}>💰</div>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#9333ea', marginBottom: '5px' }}>
            ${stats.totalRevenue}
          </div>
          <div style={{ fontSize: '14px', color: '#666' }}>Ingresos Totales</div>
        </div>

        <div style={{
          background: 'white',
          padding: '20px',
          borderRadius: '15px',
          boxShadow: '0 10px 30px rgba(255, 107, 157, 0.1)',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '24px', marginBottom: '8px' }}>📊</div>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#3b82f6', marginBottom: '5px' }}>
            ${stats.avgSpent}
          </div>
          <div style={{ fontSize: '14px', color: '#666' }}>Gasto Promedio</div>
        </div>
      </div>

      {/* Filtros y Búsqueda */}
      <div style={{ 
        display: 'flex', 
        gap: '15px', 
        marginBottom: '25px',
        alignItems: 'center',
        flexWrap: 'wrap'
      }}>
        <div style={{ flex: 1, minWidth: '200px' }}>
          <input
            type="text"
            placeholder="Buscar por nombre, email o teléfono..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '12px 16px',
              borderRadius: '10px',
              border: '2px solid #f0f0f0',
              fontSize: '14px',
              outline: 'none'
            }}
            onFocus={(e) => e.target.style.borderColor = '#ff6b9d'}
            onBlur={(e) => e.target.style.borderColor = '#f0f0f0'}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '14px', color: '#666', fontWeight: 'bold' }}>Estado:</span>
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
            <option value="all">Todos</option>
            <option value="new">Nuevos</option>
            <option value="active">Activos</option>
            <option value="vip">VIP</option>
            <option value="inactive">Inactivos</option>
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
            <option value="totalSpent">Gasto Total</option>
            <option value="totalVisits">Visitas Totales</option>
            <option value="lastVisit">Última Visita</option>
            <option value="dateJoined">Fecha de Registro</option>
          </select>
        </div>
      </div>

      {/* Lista de Clientes */}
      <div style={{
        background: 'white',
        borderRadius: '20px',
        padding: '25px',
        boxShadow: '0 10px 30px rgba(255, 107, 157, 0.1)'
      }}>
        <div style={{ display: 'grid', gap: '15px' }}>
          {filteredClients.map(client => {
            const status = statusConfig[client.status];
            const segment = getClientSegment(client);
            
            return (
              <div key={client.id} style={{
                display: 'grid',
                gridTemplateColumns: '60px 2fr 1fr 1fr 1fr 180px',
                alignItems: 'center',
                padding: '20px',
                background: '#f8f9fa',
                borderRadius: '15px',
                border: '2px solid #f0f0f0',
                gap: '20px',
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
                  background: 'linear-gradient(135deg, #ff6b9d, #ff8fab)',
                  color: 'white',
                  fontSize: '18px',
                  fontWeight: 'bold'
                }}>
                  {client.name.charAt(0)}
                </div>

                <div>
                  <div style={{ fontWeight: 'bold', color: '#333', marginBottom: '5px', fontSize: '16px' }}>
                    {client.name}
                  </div>
                  <div style={{ fontSize: '13px', color: '#666', marginBottom: '3px' }}>
                    📧 {client.email}
                  </div>
                  <div style={{ fontSize: '13px', color: '#666', marginBottom: '3px' }}>
                    📞 {client.phone}
                  </div>
                  <div style={{ fontSize: '12px', color: '#999' }}>
                    🎂 {formatDate(client.birthday)}
                  </div>
                </div>

                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#9333ea', marginBottom: '5px' }}>
                    {client.totalVisits}
                  </div>
                  <div style={{ fontSize: '12px', color: '#666' }}>visitas</div>
                  <div style={{ 
                    fontSize: '11px', 
                    marginTop: '5px',
                    padding: '2px 8px',
                    borderRadius: '10px',
                    background: segment === 'VIP' ? '#f59e0b15' : segment === 'Leal' ? '#10b98115' : '#3b82f615',
                    color: segment === 'VIP' ? '#f59e0b' : segment === 'Leal' ? '#10b981' : '#3b82f6'
                  }}>
                    {segment}
                  </div>
                </div>

                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#10b981', marginBottom: '5px' }}>
                    ${client.totalSpent}
                  </div>
                  <div style={{ fontSize: '12px', color: '#666' }}>gastado</div>
                  <div style={{ fontSize: '11px', color: '#f59e0b', marginTop: '5px' }}>
                    ⭐ {client.loyaltyPoints} pts
                  </div>
                </div>

                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#333', marginBottom: '5px' }}>
                    {formatDate(client.lastVisit)}
                  </div>
                  <div style={{ fontSize: '12px', color: '#666', marginBottom: '5px' }}>
                    Última visita
                  </div>
                  <div style={{
                    padding: '3px 8px',
                    borderRadius: '10px',
                    fontSize: '11px',
                    fontWeight: 'bold',
                    background: status.bg,
                    color: status.color
                  }}>
                    {status.label}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', flexWrap: 'wrap' }}>
                  <button
                    onClick={() => setViewingClient(client)}
                    style={{
                      padding: '8px 12px',
                      borderRadius: '8px',
                      border: 'none',
                      background: '#3b82f615',
                      color: '#3b82f6',
                      cursor: 'pointer',
                      fontSize: '12px',
                      fontWeight: 'bold'
                    }}
                  >
                    👁️ Ver
                  </button>
                  <button
                    onClick={() => handleEdit(client)}
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
                    onClick={() => handleDelete(client.id)}
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

      {/* Modal para Añadir/Editar Cliente */}
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
                {editingClient ? 'Editar Cliente' : 'Nuevo Cliente'}
              </h3>
              <button
                onClick={() => {
                  setShowModal(false);
                  setEditingClient(null);
                  resetNewClient();
                }}
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
                  Nombre Completo *
                </label>
                <input
                  type="text"
                  value={newClient.name}
                  onChange={(e) => setNewClient({...newClient, name: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '2px solid #f0f0f0',
                    borderRadius: '10px',
                    fontSize: '16px',
                    outline: 'none'
                  }}
                  placeholder="Ej: María González"
                  onFocus={(e) => e.target.style.borderColor = '#ff6b9d'}
                  onBlur={(e) => e.target.style.borderColor = '#f0f0f0'}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', color: '#333', marginBottom: '8px' }}>
                    Email *
                  </label>
                  <input
                    type="email"
                    value={newClient.email}
                    onChange={(e) => setNewClient({...newClient, email: e.target.value})}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      border: '2px solid #f0f0f0',
                      borderRadius: '10px',
                      fontSize: '16px',
                      outline: 'none'
                    }}
                    placeholder="email@ejemplo.com"
                    onFocus={(e) => e.target.style.borderColor = '#ff6b9d'}
                    onBlur={(e) => e.target.style.borderColor = '#f0f0f0'}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', color: '#333', marginBottom: '8px' }}>
                    Teléfono *
                  </label>
                  <input
                    type="tel"
                    value={newClient.phone}
                    onChange={(e) => setNewClient({...newClient, phone: e.target.value})}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      border: '2px solid #f0f0f0',
                      borderRadius: '10px',
                      fontSize: '16px',
                      outline: 'none'
                    }}
                    placeholder="+1 (555) 123-4567"
                    onFocus={(e) => e.target.style.borderColor = '#ff6b9d'}
                    onBlur={(e) => e.target.style.borderColor = '#f0f0f0'}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', color: '#333', marginBottom: '8px' }}>
                    Fecha de Nacimiento
                  </label>
                  <input
                    type="date"
                    value={newClient.birthday}
                    onChange={(e) => setNewClient({...newClient, birthday: e.target.value})}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      border: '2px solid #f0f0f0',
                      borderRadius: '10px',
                      fontSize: '16px',
                      outline: 'none'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#ff6b9d'}
                    onBlur={(e) => e.target.style.borderColor = '#f0f0f0'}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', color: '#333', marginBottom: '8px' }}>
                    Personal Preferido
                  </label>
                  <select
                    value={newClient.preferredStaff}
                    onChange={(e) => setNewClient({...newClient, preferredStaff: e.target.value})}
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
                    <option value="">Seleccionar...</option>
                    {staffMembers.map(staff => (
                      <option key={staff} value={staff}>{staff}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', color: '#333', marginBottom: '8px' }}>
                  Estado
                </label>
                <select
                  value={newClient.status}
                  onChange={(e) => setNewClient({...newClient, status: e.target.value})}
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
                  <option value="new">🆕 Nuevo</option>
                  <option value="active">✅ Activo</option>
                  <option value="vip">⭐ VIP</option>
                  <option value="inactive">⏸️ Inactivo</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', color: '#333', marginBottom: '8px' }}>
                  Notas
                </label>
                <textarea
                  value={newClient.notes}
                  onChange={(e) => setNewClient({...newClient, notes: e.target.value})}
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
                  placeholder="Notas adicionales sobre el cliente..."
                  onFocus={(e) => e.target.style.borderColor = '#ff6b9d'}
                  onBlur={(e) => e.target.style.borderColor = '#f0f0f0'}
                />
              </div>

              <div style={{ display: 'flex', gap: '15px', marginTop: '20px' }}>
                <button
                  onClick={() => {
                    setShowModal(false);
                    setEditingClient(null);
                    resetNewClient();
                  }}
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
                  onClick={handleSaveClient}
                  disabled={!newClient.name || !newClient.email || !newClient.phone}
                  style={{
                    flex: 1,
                    padding: '15px',
                    border: 'none',
                    borderRadius: '10px',
                    background: (!newClient.name || !newClient.email || !newClient.phone) 
                      ? '#ccc' 
                      : 'linear-gradient(135deg, #ff6b9d, #ff8fab)',
                    color: 'white',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    cursor: (!newClient.name || !newClient.email || !newClient.phone) ? 'not-allowed' : 'pointer'
                  }}
                >
                  {editingClient ? 'Actualizar' : 'Crear'} Cliente
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal para Ver Detalles del Cliente */}
      {viewingClient && (
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
        }} onClick={() => setViewingClient(null)}>
          <div style={{
            background: 'white',
            borderRadius: '20px',
            padding: '30px',
            width: '90%',
            maxWidth: '600px',
            maxHeight: '90vh',
            overflowY: 'auto'
          }} onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <div style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #ff6b9d, #ff8fab)',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '24px',
                  fontWeight: 'bold'
                }}>
                  {viewingClient.name.charAt(0)}
                </div>
                <div>
                  <h3 style={{ color: '#ff6b9d', fontSize: '24px', margin: 0, marginBottom: '5px' }}>
                    {viewingClient.name}
                  </h3>
                  <div style={{
                    padding: '5px 12px',
                    borderRadius: '15px',
                    fontSize: '12px',
                    fontWeight: 'bold',
                    background: statusConfig[viewingClient.status].bg,
                    color: statusConfig[viewingClient.status].color,
                    display: 'inline-block'
                  }}>
                    {statusConfig[viewingClient.status].label}
                  </div>
                </div>
              </div>
              <button
                onClick={() => setViewingClient(null)}
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

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', marginBottom: '30px' }}>
              {/* Información Personal */}
              <div style={{
                background: '#f8f9fa',
                padding: '20px',
                borderRadius: '15px',
                border: '2px solid #f0f0f0'
              }}>
                <h4 style={{ color: '#333', marginBottom: '15px', fontSize: '16px' }}>📋 Información Personal</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div>
                    <span style={{ fontSize: '12px', color: '#666', fontWeight: 'bold' }}>Email:</span>
                    <div style={{ fontSize: '14px', color: '#333' }}>{viewingClient.email}</div>
                  </div>
                  <div>
                    <span style={{ fontSize: '12px', color: '#666', fontWeight: 'bold' }}>Teléfono:</span>
                    <div style={{ fontSize: '14px', color: '#333' }}>{viewingClient.phone}</div>
                  </div>
                  <div>
                    <span style={{ fontSize: '12px', color: '#666', fontWeight: 'bold' }}>Cumpleaños:</span>
                    <div style={{ fontSize: '14px', color: '#333' }}>{formatDate(viewingClient.birthday)}</div>
                  </div>
                  <div>
                    <span style={{ fontSize: '12px', color: '#666', fontWeight: 'bold' }}>Cliente desde:</span>
                    <div style={{ fontSize: '14px', color: '#333' }}>{formatDate(viewingClient.dateJoined)}</div>
                  </div>
                  <div>
                    <span style={{ fontSize: '12px', color: '#666', fontWeight: 'bold' }}>Personal preferido:</span>
                    <div style={{ fontSize: '14px', color: '#333' }}>{viewingClient.preferredStaff || 'No especificado'}</div>
                  </div>
                </div>
              </div>

              {/* Estadísticas */}
              <div style={{
                background: '#f8f9fa',
                padding: '20px',
                borderRadius: '15px',
                border: '2px solid #f0f0f0'
              }}>
                <h4 style={{ color: '#333', marginBottom: '15px', fontSize: '16px' }}>📊 Estadísticas</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '10px',
                    background: 'white',
                    borderRadius: '8px'
                  }}>
                    <span style={{ fontSize: '14px', color: '#666' }}>Total Visitas:</span>
                    <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#9333ea' }}>{viewingClient.totalVisits}</span>
                  </div>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '10px',
                    background: 'white',
                    borderRadius: '8px'
                  }}>
                    <span style={{ fontSize: '14px', color: '#666' }}>Total Gastado:</span>
                    <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#10b981' }}>${viewingClient.totalSpent}</span>
                  </div>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '10px',
                    background: 'white',
                    borderRadius: '8px'
                  }}>
                    <span style={{ fontSize: '14px', color: '#666' }}>Puntos Lealtad:</span>
                    <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#f59e0b' }}>⭐ {viewingClient.loyaltyPoints}</span>
                  </div>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '10px',
                    background: 'white',
                    borderRadius: '8px'
                  }}>
                    <span style={{ fontSize: '14px', color: '#666' }}>Promedio por Visita:</span>
                    <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#3b82f6' }}>
                      ${viewingClient.totalVisits > 0 ? (viewingClient.totalSpent / viewingClient.totalVisits).toFixed(0) : 0}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Servicio Favorito y Última Visita */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '25px' }}>
              <div style={{
                background: 'linear-gradient(135deg, #ff6b9d15, #ff8fab15)',
                padding: '20px',
                borderRadius: '15px',
                border: '2px solid #ff6b9d30',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '24px', marginBottom: '10px' }}>💅</div>
                <div style={{ fontSize: '14px', color: '#666', marginBottom: '5px' }}>Servicio Favorito</div>
                <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#ff6b9d' }}>
                  {viewingClient.favoriteService}
                </div>
              </div>

              <div style={{
                background: 'linear-gradient(135deg, #9333ea15, #a855f715)',
                padding: '20px',
                borderRadius: '15px',
                border: '2px solid #9333ea30',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '24px', marginBottom: '10px' }}>📅</div>
                <div style={{ fontSize: '14px', color: '#666', marginBottom: '5px' }}>Última Visita</div>
                <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#9333ea' }}>
                  {formatDate(viewingClient.lastVisit)}
                </div>
              </div>
            </div>

            {/* Notas */}
            {viewingClient.notes && (
              <div style={{
                background: '#f8f9fa',
                padding: '20px',
                borderRadius: '15px',
                border: '2px solid #f0f0f0',
                marginBottom: '25px'
              }}>
                <h4 style={{ color: '#333', marginBottom: '10px', fontSize: '16px' }}>📝 Notas</h4>
                <p style={{ fontSize: '14px', color: '#666', lineHeight: 1.5, margin: 0 }}>
                  {viewingClient.notes}
                </p>
              </div>
            )}

            {/* Botones de Acción */}
            <div style={{ display: 'flex', gap: '15px' }}>
              <button
                onClick={() => {
                  setViewingClient(null);
                  handleEdit(viewingClient);
                }}
                style={{
                  flex: 1,
                  padding: '15px',
                  border: 'none',
                  borderRadius: '10px',
                  background: 'linear-gradient(135deg, #9333ea, #a855f7)',
                  color: 'white',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
                onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
              >
                ✏️ Editar Cliente
              </button>
              <button
                onClick={() => {
                  alert('Funcionalidad de nueva cita próximamente');
                }}
                style={{
                  flex: 1,
                  padding: '15px',
                  border: 'none',
                  borderRadius: '10px',
                  background: 'linear-gradient(135deg, #10b981, #34d399)',
                  color: 'white',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
                onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
              >
                📅 Nueva Cita
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientsManager;