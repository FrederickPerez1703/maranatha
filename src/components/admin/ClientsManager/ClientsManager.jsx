import { useState, useEffect } from 'react';
import { Trash2 } from 'lucide-react';
import { useClients } from '../../../contexts/ClientsContext';

// Componente de Gestión de Clientes
const ClientsManager = () => {
  const { clients, addClient, updateClient, deleteClient } = useClients();

  const [showModal, setShowModal] = useState(false);
  const [editingClient, setEditingClient] = useState(null);
  const [viewingClient, setViewingClient] = useState(null);

  // Efecto para manejar la clase modal-open en el body
  useEffect(() => {
    if (showModal || viewingClient) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }

    return () => {
      document.body.classList.remove('modal-open');
    };
  }, [showModal, viewingClient]);

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

  // Función auxiliar para determinar el estado visual basado en datos del cliente
  const getClientStatus = (client) => {
    if (client.isVip) return 'vip';
    return client.status || 'active';
  };

  const filteredClients = clients
    .filter(client => {
      const status = getClientStatus(client);
      const matchesFilter = filter === 'all' || status === filter;
      const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (client.email && client.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
        client.phone.includes(searchTerm);
      return matchesFilter && matchesSearch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'totalSpent': return (b.totalSpent || 0) - (a.totalSpent || 0);
        case 'totalVisits': return (b.history?.length || 0) - (a.history?.length || 0);
        case 'lastVisit': return new Date(b.lastVisit || 0) - new Date(a.lastVisit || 0);
        case 'dateJoined': return new Date(b.createdAt) - new Date(a.createdAt);
        default: return a.name.localeCompare(b.name);
      }
    });

  const handleSaveClient = () => {
    if (!newClient.name || !newClient.phone) {
      alert("Nombre y teléfono son obligatorios");
      return;
    }

    if (editingClient) {
      updateClient(editingClient.id, newClient);
    } else {
      addClient({
        ...newClient,
        totalSpent: 0, // Inicializar
        points: 0
      });
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
      email: client.email || '',
      phone: client.phone,
      birthday: client.birthday || '',
      notes: client.notes || '',
      preferredStaff: client.preferredStaff || '',
      status: client.status || 'active'
    });
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este cliente?')) {
      deleteClient(id);
    }
  };

  const getClientStats = () => {
    const total = clients.length;
    const active = clients.filter(c => !c.isVip && c.status !== 'inactive').length; // Aproximación
    const vip = clients.filter(c => c.isVip).length;
    const newClients = clients.filter(c => {
      const date = new Date(c.createdAt);
      const now = new Date();
      return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
    }).length;

    return { total, active, vip, newClients };
  };

  const stats = getClientStats();

  const formatDate = (dateStr) => {
    if (!dateStr) return 'N/A';
    return new Date(dateStr).toLocaleDateString('es-ES');
  };

  const getClientSegment = (client) => {
    if (client.isVip) return 'VIP';
    const visits = client.history?.length || 0;
    if (visits > 10) return 'Leal';
    if (visits < 3) return 'Nuevo';
    return 'Regular';
  };

  return (
    <div style={{ padding: '20px' }}>
      <div className="clients-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h2 style={{ color: '#ff6b9d', fontSize: '28px', margin: 0 }}>Gestión de Clientes</h2>
        <button
          onClick={() => {
            setEditingClient(null);
            resetNewClient();
            setShowModal(true);
          }}
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
      <div className="clients-stats" style={{
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
      </div>

      {/* Filtros y Búsqueda */}
      <div className="filter-section" style={{
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
        {clients.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
            <div style={{ fontSize: '48px', marginBottom: '10px' }}>👥</div>
            <p>No hay clientes registrados aún.</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gap: '15px' }}>
            {filteredClients.map(client => {
              const statusKey = getClientStatus(client);
              const status = statusConfig[statusKey] || statusConfig.active;
              const segment = getClientSegment(client);

              return (
                <div key={client.id} className="client-row" style={{
                  display: 'grid',
                  gridTemplateColumns: '60px 2fr 1fr 100px 1fr 180px',
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
                      📧 {client.email || 'N/A'}
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
                      {client.history?.length || 0}
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
                    <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#f59e0b', marginBottom: '5px' }}>
                      ⭐ {client.points || 0}
                    </div>
                    <div style={{ fontSize: '12px', color: '#666' }}>puntos</div>
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

                  <div className="client-actions" style={{ display: 'flex', gap: '8px', justifyContent: 'center', flexWrap: 'wrap' }}>
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
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
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
          <div className="modal-content" style={{
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
                  onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
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
                    Email
                  </label>
                  <input
                    type="email"
                    value={newClient.email}
                    onChange={(e) => setNewClient({ ...newClient, email: e.target.value })}
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
                    onChange={(e) => setNewClient({ ...newClient, phone: e.target.value })}
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
                    onChange={(e) => setNewClient({ ...newClient, birthday: e.target.value })}
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
                    onChange={(e) => setNewClient({ ...newClient, preferredStaff: e.target.value })}
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
                  onChange={(e) => setNewClient({ ...newClient, status: e.target.value })}
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
                  <option value="inactive">⏸️ Inactivo</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', color: '#333', marginBottom: '8px' }}>
                  Notas
                </label>
                <textarea
                  value={newClient.notes}
                  onChange={(e) => setNewClient({ ...newClient, notes: e.target.value })}
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

              <div style={{ display: 'flex', gap: '15px', marginTop: '10px' }}>
                <button
                  onClick={() => {
                    setShowModal(false);
                    setEditingClient(null);
                    resetNewClient();
                  }}
                  style={{
                    flex: 1,
                    padding: '14px',
                    borderRadius: '12px',
                    border: '2px solid #f0f0f0',
                    background: 'white',
                    color: '#666',
                    fontWeight: 'bold',
                    cursor: 'pointer'
                  }}
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSaveClient}
                  style={{
                    flex: 1,
                    padding: '14px',
                    borderRadius: '12px',
                    border: 'none',
                    background: 'linear-gradient(135deg, #ff6b9d, #ff8fab)',
                    color: 'white',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    boxShadow: '0 4px 15px rgba(255, 107, 157, 0.3)'
                  }}
                >
                  {editingClient ? 'Guardar Cambios' : 'Crear Cliente'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientsManager;