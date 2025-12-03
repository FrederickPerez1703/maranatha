import { useState } from 'react';
import { Eye, CheckCircle, XCircle, Filter, Plus, Edit, Trash2, Calendar, Clock, User, Phone, DollarSign } from 'lucide-react';

// Componente Gestión de Citas con CRUD completo
const AppointmentsManager = () => {
  const [filter, setFilter] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [editingAppointment, setEditingAppointment] = useState(null);
  const [viewingAppointment, setViewingAppointment] = useState(null);

  const [appointments, setAppointments] = useState([
    {
      id: 1,
      date: '2025-01-31',
      time: '10:00',
      client: 'María González',
      service: 'Manicura Francesa',
      price: '$30',
      status: 'confirmada',
      phone: '+1234567890',
      email: 'maria.gonzalez@email.com',
      notes: 'Cliente prefiere colores neutros'
    },
    {
      id: 2,
      date: '2025-01-31',
      time: '11:30',
      client: 'Ana Rodríguez',
      service: 'Corte de Cabello',
      price: '$30',
      status: 'pendiente',
      phone: '+1234567891',
      email: 'ana.rodriguez@email.com',
      notes: 'Primera visita, consulta sobre tipo de corte'
    },
    {
      id: 3,
      date: '2025-02-01',
      time: '14:00',
      client: 'Sofia López',
      service: 'Facial Hidratante',
      price: '$55',
      status: 'confirmada',
      phone: '+1234567892',
      email: 'sofia.lopez@email.com',
      notes: 'Piel sensible, usar productos hipoalergénicos'
    },
    {
      id: 4,
      date: '2025-02-01',
      time: '16:00',
      client: 'Carmen Silva',
      service: 'Maquillaje de Noche',
      price: '$50',
      status: 'cancelada',
      phone: '+1234567893',
      email: 'carmen.silva@email.com',
      notes: 'Canceló por emergencia familiar'
    }
  ]);

  const [newAppointment, setNewAppointment] = useState({
    date: '',
    time: '',
    client: '',
    phone: '',
    email: '',
    service: '',
    price: '',
    status: 'pendiente',
    notes: ''
  });

  const services = [
    { name: 'Manicura Francesa', price: 30 },
    { name: 'Corte de Cabello', price: 30 },
    { name: 'Facial Hidratante', price: 55 },
    { name: 'Maquillaje de Noche', price: 50 },
    { name: 'Pedicura Spa', price: 40 },
    { name: 'Coloración Completa', price: 80 },
    { name: 'Tratamiento Capilar', price: 45 },
    { name: 'Maquillaje de Día', price: 35 }
  ];

  const filteredAppointments = appointments.filter(apt =>
    filter === 'all' || apt.status === filter
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmada': return { bg: '#10b98115', color: '#10b981' };
      case 'pendiente': return { bg: '#f59e0b15', color: '#f59e0b' };
      case 'cancelada': return { bg: '#ef444415', color: '#ef4444' };
      default: return { bg: '#f0f0f0', color: '#666' };
    }
  };

  const resetNewAppointment = () => {
    setNewAppointment({
      date: '',
      time: '',
      client: '',
      phone: '',
      email: '',
      service: '',
      price: '',
      status: 'pendiente',
      notes: ''
    });
  };

  const handleSaveAppointment = () => {
    if (editingAppointment) {
      // Actualizar cita existente
      setAppointments(appointments.map(apt =>
        apt.id === editingAppointment.id
          ? { ...newAppointment, id: editingAppointment.id }
          : apt
      ));
    } else {
      // Crear nueva cita
      const id = Math.max(...appointments.map(a => a.id)) + 1;
      setAppointments([...appointments, { ...newAppointment, id }]);
    }
    setShowModal(false);
    setEditingAppointment(null);
    resetNewAppointment();
  };

  const handleEdit = (appointment) => {
    setEditingAppointment(appointment);
    setNewAppointment({
      date: appointment.date,
      time: appointment.time,
      client: appointment.client,
      phone: appointment.phone,
      email: appointment.email,
      service: appointment.service,
      price: appointment.price.replace('$', ''),
      status: appointment.status,
      notes: appointment.notes
    });
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta cita?')) {
      setAppointments(appointments.filter(apt => apt.id !== id));
    }
  };

  const handleStatusChange = (id, newStatus) => {
    setAppointments(appointments.map(apt =>
      apt.id === id ? { ...apt, status: newStatus } : apt
    ));
  };

  const handleView = (appointment) => {
    setViewingAppointment(appointment);
    setShowViewModal(true);
  };

  const handleServiceChange = (serviceName) => {
    const selectedService = services.find(s => s.name === serviceName);
    setNewAppointment({
      ...newAppointment,
      service: serviceName,
      price: selectedService ? selectedService.price.toString() : ''
    });
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('es-ES');
  };

  const getAppointmentStats = () => {
    const total = appointments.length;
    const confirmed = appointments.filter(a => a.status === 'confirmada').length;
    const pending = appointments.filter(a => a.status === 'pendiente').length;
    const cancelled = appointments.filter(a => a.status === 'cancelada').length;
    const totalRevenue = appointments
      .filter(a => a.status === 'confirmada')
      .reduce((sum, a) => sum + parseFloat(a.price.replace('$', '')), 0);

    return { total, confirmed, pending, cancelled, totalRevenue };
  };

  const stats = getAppointmentStats();

  return (
    <div style={{ padding: '20px' }}>
      <div className="appointments-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', flexWrap: 'wrap', gap: '15px' }}>
        <h2 style={{
          color: '#ff6b9d',
          fontSize: 'clamp(24px, 4vw, 32px)',
          margin: 0,
          fontWeight: 'bold'
        }}>
          Gestión de Citas
        </h2>
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
            boxShadow: '0 5px 20px rgba(255, 107, 157, 0.3)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
          onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
          onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
        >
          <Plus size={16} />
          Nueva Cita
        </button>
      </div>

      {/* Estadísticas Responsivas */}
      <div className="appointments-stats" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '20px',
        marginBottom: '30px'
      }}>
        <div style={{
          background: 'white',
          padding: '25px',
          borderRadius: '20px',
          boxShadow: '0 8px 25px rgba(0, 0, 0, 0.08)',
          border: '2px solid #ff6b9d30',
          transition: 'all 0.3s ease',
          position: 'relative',
          overflow: 'hidden'
        }}
          onMouseOver={(e) => {
            e.target.closest('div').style.transform = 'translateY(-8px)';
            e.target.closest('div').style.boxShadow = '0 15px 40px #ff6b9d20';
          }}
          onMouseOut={(e) => {
            e.target.closest('div').style.transform = 'translateY(0)';
            e.target.closest('div').style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.08)';
          }}>
          {/* Background decoration */}
          <div style={{
            position: 'absolute',
            top: '-20px',
            right: '-20px',
            width: '80px',
            height: '80px',
            background: '#ff6b9d10',
            borderRadius: '50%',
            opacity: 0.5
          }}></div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            position: 'relative',
            zIndex: 1
          }}>
            <div style={{ flex: 1 }}>
              <div style={{
                fontSize: 'clamp(28px, 5vw, 36px)',
                fontWeight: 'bold',
                color: '#333',
                marginBottom: '8px',
                lineHeight: 1
              }}>
                {stats.total}
              </div>
              <div style={{
                fontSize: 'clamp(14px, 2.5vw, 16px)',
                color: '#666',
                fontWeight: '500'
              }}>
                Total Citas
              </div>
            </div>

            <div style={{
              padding: '15px',
              borderRadius: '50%',
              background: '#ff6b9d10',
              color: '#ff6b9d',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              minWidth: '60px',
              minHeight: '60px'
            }}>
              <Calendar size={28} />
            </div>
          </div>
        </div>

        <div style={{
          background: 'white',
          padding: '25px',
          borderRadius: '20px',
          boxShadow: '0 8px 25px rgba(0, 0, 0, 0.08)',
          border: '2px solid #10b98130',
          transition: 'all 0.3s ease',
          position: 'relative',
          overflow: 'hidden'
        }}
          onMouseOver={(e) => {
            e.target.closest('div').style.transform = 'translateY(-8px)';
            e.target.closest('div').style.boxShadow = '0 15px 40px #10b98120';
          }}
          onMouseOut={(e) => {
            e.target.closest('div').style.transform = 'translateY(0)';
            e.target.closest('div').style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.08)';
          }}>
          {/* Background decoration */}
          <div style={{
            position: 'absolute',
            top: '-20px',
            right: '-20px',
            width: '80px',
            height: '80px',
            background: '#10b98110',
            borderRadius: '50%',
            opacity: 0.5
          }}></div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            position: 'relative',
            zIndex: 1
          }}>
            <div style={{ flex: 1 }}>
              <div style={{
                fontSize: 'clamp(28px, 5vw, 36px)',
                fontWeight: 'bold',
                color: '#333',
                marginBottom: '8px',
                lineHeight: 1
              }}>
                {stats.confirmed}
              </div>
              <div style={{
                fontSize: 'clamp(14px, 2.5vw, 16px)',
                color: '#666',
                fontWeight: '500'
              }}>
                Confirmadas
              </div>
            </div>

            <div style={{
              padding: '15px',
              borderRadius: '50%',
              background: '#10b98110',
              color: '#10b981',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              minWidth: '60px',
              minHeight: '60px'
            }}>
              <CheckCircle size={28} />
            </div>
          </div>
        </div>

        <div style={{
          background: 'white',
          padding: '25px',
          borderRadius: '20px',
          boxShadow: '0 8px 25px rgba(0, 0, 0, 0.08)',
          border: '2px solid #f59e0b30',
          transition: 'all 0.3s ease',
          position: 'relative',
          overflow: 'hidden'
        }}
          onMouseOver={(e) => {
            e.target.closest('div').style.transform = 'translateY(-8px)';
            e.target.closest('div').style.boxShadow = '0 15px 40px #f59e0b20';
          }}
          onMouseOut={(e) => {
            e.target.closest('div').style.transform = 'translateY(0)';
            e.target.closest('div').style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.08)';
          }}>
          {/* Background decoration */}
          <div style={{
            position: 'absolute',
            top: '-20px',
            right: '-20px',
            width: '80px',
            height: '80px',
            background: '#f59e0b10',
            borderRadius: '50%',
            opacity: 0.5
          }}></div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            position: 'relative',
            zIndex: 1
          }}>
            <div style={{ flex: 1 }}>
              <div style={{
                fontSize: 'clamp(28px, 5vw, 36px)',
                fontWeight: 'bold',
                color: '#333',
                marginBottom: '8px',
                lineHeight: 1
              }}>
                {stats.pending}
              </div>
              <div style={{
                fontSize: 'clamp(14px, 2.5vw, 16px)',
                color: '#666',
                fontWeight: '500'
              }}>
                Pendientes
              </div>
            </div>

            <div style={{
              padding: '15px',
              borderRadius: '50%',
              background: '#f59e0b10',
              color: '#f59e0b',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              minWidth: '60px',
              minHeight: '60px'
            }}>
              <Clock size={28} />
            </div>
          </div>
        </div>

        <div style={{
          background: 'white',
          padding: '25px',
          borderRadius: '20px',
          boxShadow: '0 8px 25px rgba(0, 0, 0, 0.08)',
          border: '2px solid #9333ea30',
          transition: 'all 0.3s ease',
          position: 'relative',
          overflow: 'hidden'
        }}
          onMouseOver={(e) => {
            e.target.closest('div').style.transform = 'translateY(-8px)';
            e.target.closest('div').style.boxShadow = '0 15px 40px #9333ea20';
          }}
          onMouseOut={(e) => {
            e.target.closest('div').style.transform = 'translateY(0)';
            e.target.closest('div').style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.08)';
          }}>
          {/* Background decoration */}
          <div style={{
            position: 'absolute',
            top: '-20px',
            right: '-20px',
            width: '80px',
            height: '80px',
            background: '#9333ea10',
            borderRadius: '50%',
            opacity: 0.5
          }}></div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            position: 'relative',
            zIndex: 1
          }}>
            <div style={{ flex: 1 }}>
              <div style={{
                fontSize: 'clamp(28px, 5vw, 36px)',
                fontWeight: 'bold',
                color: '#333',
                marginBottom: '8px',
                lineHeight: 1
              }}>
                ${stats.totalRevenue}
              </div>
              <div style={{
                fontSize: 'clamp(14px, 2.5vw, 16px)',
                color: '#666',
                fontWeight: '500'
              }}>
                Ingresos
              </div>
            </div>

            <div style={{
              padding: '15px',
              borderRadius: '50%',
              background: '#9333ea10',
              color: '#9333ea',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              minWidth: '60px',
              minHeight: '60px'
            }}>
              <DollarSign size={28} />
            </div>
          </div>
        </div>
      </div>

      {/* Filtros */}
      <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '25px' }}>
        <Filter size={20} color="#666" />
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          style={{
            padding: '10px 15px',
            borderRadius: '10px',
            border: '2px solid #f0f0f0',
            background: 'white',
            fontSize: '14px',
            outline: 'none'
          }}
        >
          <option value="all">Todas las citas</option>
          <option value="confirmada">Confirmadas</option>
          <option value="pendiente">Pendientes</option>
          <option value="cancelada">Canceladas</option>
        </select>
      </div>

      {/* Lista de Citas */}
      <div style={{
        background: 'white',
        borderRadius: '20px',
        padding: '25px',
        boxShadow: '0 10px 30px rgba(255, 107, 157, 0.1)'
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {filteredAppointments.map(appointment => {
            const statusStyle = getStatusColor(appointment.status);
            return (
              <div key={appointment.id} className="appointment-row" style={{
                display: 'grid',
                gridTemplateColumns: '1fr 150px 120px 100px 200px',
                alignItems: 'center',
                padding: '20px',
                background: '#f8f9fa',
                borderRadius: '15px',
                border: '1px solid #f0f0f0',
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
                <div>
                  <div style={{ fontWeight: 'bold', color: '#333', marginBottom: '5px' }}>
                    {appointment.client}
                  </div>
                  <div style={{ fontSize: '14px', color: '#666' }}>
                    {appointment.service}
                  </div>
                  <div style={{ fontSize: '12px', color: '#999', marginTop: '2px' }}>
                    📞 {appointment.phone}
                  </div>
                </div>

                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#333' }}>
                    {formatDate(appointment.date)}
                  </div>
                  <div style={{ fontSize: '14px', color: '#666' }}>
                    {appointment.time}
                  </div>
                </div>

                <div style={{ textAlign: 'center', fontWeight: 'bold', color: '#ff6b9d' }}>
                  {appointment.price}
                </div>

                <div style={{ textAlign: 'center' }}>
                  <span style={{
                    padding: '5px 12px',
                    borderRadius: '20px',
                    fontSize: '12px',
                    fontWeight: 'bold',
                    background: statusStyle.bg,
                    color: statusStyle.color
                  }}>
                    {appointment.status}
                  </span>
                </div>

                <div className="appointment-actions" style={{ display: 'flex', gap: '8px', justifyContent: 'center', flexWrap: 'wrap' }}>
                  <button
                    onClick={() => handleView(appointment)}
                    style={{
                      padding: '8px',
                      borderRadius: '8px',
                      border: 'none',
                      background: '#3b82f615',
                      color: '#3b82f6',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                    title="Ver detalles"
                    onMouseOver={(e) => e.target.style.transform = 'scale(1.1)'}
                    onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
                  >
                    <Eye size={16} />
                  </button>

                  <button
                    onClick={() => handleEdit(appointment)}
                    style={{
                      padding: '8px',
                      borderRadius: '8px',
                      border: 'none',
                      background: '#9333ea15',
                      color: '#9333ea',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                    title="Editar cita"
                    onMouseOver={(e) => e.target.style.transform = 'scale(1.1)'}
                    onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
                  >
                    <Edit size={16} />
                  </button>

                  <button
                    onClick={() => handleStatusChange(appointment.id, 'confirmada')}
                    disabled={appointment.status === 'confirmada'}
                    style={{
                      padding: '8px',
                      borderRadius: '8px',
                      border: 'none',
                      background: appointment.status === 'confirmada' ? '#ccc' : '#10b98115',
                      color: appointment.status === 'confirmada' ? '#999' : '#10b981',
                      cursor: appointment.status === 'confirmada' ? 'not-allowed' : 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                    title="Confirmar cita"
                    onMouseOver={(e) => {
                      if (appointment.status !== 'confirmada') {
                        e.target.style.transform = 'scale(1.1)';
                      }
                    }}
                    onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
                  >
                    <CheckCircle size={16} />
                  </button>

                  <button
                    onClick={() => handleStatusChange(appointment.id, 'cancelada')}
                    disabled={appointment.status === 'cancelada'}
                    style={{
                      padding: '8px',
                      borderRadius: '8px',
                      border: 'none',
                      background: appointment.status === 'cancelada' ? '#ccc' : '#ef444415',
                      color: appointment.status === 'cancelada' ? '#999' : '#ef4444',
                      cursor: appointment.status === 'cancelada' ? 'not-allowed' : 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                    title="Cancelar cita"
                    onMouseOver={(e) => {
                      if (appointment.status !== 'cancelada') {
                        e.target.style.transform = 'scale(1.1)';
                      }
                    }}
                    onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
                  >
                    <XCircle size={16} />
                  </button>

                  <button
                    onClick={() => handleDelete(appointment.id)}
                    style={{
                      padding: '8px',
                      borderRadius: '8px',
                      border: 'none',
                      background: '#ef444415',
                      color: '#ef4444',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                    title="Eliminar cita"
                    onMouseOver={(e) => e.target.style.transform = 'scale(1.1)'}
                    onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal para Crear/Editar Cita */}
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
            maxWidth: '600px',
            maxHeight: '90vh',
            overflowY: 'auto'
          }} onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
              <h3 style={{ color: '#ff6b9d', fontSize: '24px', margin: 0 }}>
                {editingAppointment ? 'Editar Cita' : 'Nueva Cita'}
              </h3>
              <button
                onClick={() => {
                  setShowModal(false);
                  setEditingAppointment(null);
                  resetNewAppointment();
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

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', color: '#333', marginBottom: '8px' }}>
                  <Calendar size={16} style={{ display: 'inline', marginRight: '5px' }} />
                  Fecha *
                </label>
                <input
                  type="date"
                  value={newAppointment.date}
                  onChange={(e) => setNewAppointment({ ...newAppointment, date: e.target.value })}
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
                  <Clock size={16} style={{ display: 'inline', marginRight: '5px' }} />
                  Hora *
                </label>
                <input
                  type="time"
                  value={newAppointment.time}
                  onChange={(e) => setNewAppointment({ ...newAppointment, time: e.target.value })}
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
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', color: '#333', marginBottom: '8px' }}>
                <User size={16} style={{ display: 'inline', marginRight: '5px' }} />
                Nombre del Cliente *
              </label>
              <input
                type="text"
                value={newAppointment.client}
                onChange={(e) => setNewAppointment({ ...newAppointment, client: e.target.value })}
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

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', color: '#333', marginBottom: '8px' }}>
                  <Phone size={16} style={{ display: 'inline', marginRight: '5px' }} />
                  Teléfono *
                </label>
                <input
                  type="tel"
                  value={newAppointment.phone}
                  onChange={(e) => setNewAppointment({ ...newAppointment, phone: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '2px solid #f0f0f0',
                    borderRadius: '10px',
                    fontSize: '16px',
                    outline: 'none'
                  }}
                  placeholder="+1234567890"
                  onFocus={(e) => e.target.style.borderColor = '#ff6b9d'}
                  onBlur={(e) => e.target.style.borderColor = '#f0f0f0'}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', color: '#333', marginBottom: '8px' }}>
                  Email
                </label>
                <input
                  type="email"
                  value={newAppointment.email}
                  onChange={(e) => setNewAppointment({ ...newAppointment, email: e.target.value })}
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
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '20px', marginBottom: '20px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', color: '#333', marginBottom: '8px' }}>
                  Servicio *
                </label>
                <select
                  value={newAppointment.service}
                  onChange={(e) => handleServiceChange(e.target.value)}
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
                  <option value="">Seleccionar servicio...</option>
                  {services.map(service => (
                    <option key={service.name} value={service.name}>
                      {service.name} - ${service.price}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', color: '#333', marginBottom: '8px' }}>
                  <DollarSign size={16} style={{ display: 'inline', marginRight: '5px' }} />
                  Precio *
                </label>
                <input
                  type="number"
                  value={newAppointment.price}
                  onChange={(e) => setNewAppointment({ ...newAppointment, price: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '2px solid #f0f0f0',
                    borderRadius: '10px',
                    fontSize: '16px',
                    outline: 'none'
                  }}
                  placeholder="30"
                  onFocus={(e) => e.target.style.borderColor = '#ff6b9d'}
                  onBlur={(e) => e.target.style.borderColor = '#f0f0f0'}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', color: '#333', marginBottom: '8px' }}>
                  Estado
                </label>
                <select
                  value={newAppointment.status}
                  onChange={(e) => setNewAppointment({ ...newAppointment, status: e.target.value })}
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
                  <option value="pendiente">⏳ Pendiente</option>
                  <option value="confirmada">✅ Confirmada</option>
                  <option value="cancelada">❌ Cancelada</option>
                </select>
              </div>
            </div>

            <div style={{ marginBottom: '25px' }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', color: '#333', marginBottom: '8px' }}>
                Notas Adicionales
              </label>
              <textarea
                value={newAppointment.notes}
                onChange={(e) => setNewAppointment({ ...newAppointment, notes: e.target.value })}
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
                placeholder="Notas sobre la cita, preferencias del cliente, etc..."
                onFocus={(e) => e.target.style.borderColor = '#ff6b9d'}
                onBlur={(e) => e.target.style.borderColor = '#f0f0f0'}
              />
            </div>

            <div style={{ display: 'flex', gap: '15px' }}>
              <button
                onClick={() => {
                  setShowModal(false);
                  setEditingAppointment(null);
                  resetNewAppointment();
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
                onClick={handleSaveAppointment}
                disabled={!newAppointment.date || !newAppointment.time || !newAppointment.client || !newAppointment.phone || !newAppointment.service || !newAppointment.price}
                style={{
                  flex: 1,
                  padding: '15px',
                  border: 'none',
                  borderRadius: '10px',
                  background: (!newAppointment.date || !newAppointment.time || !newAppointment.client || !newAppointment.phone || !newAppointment.service || !newAppointment.price)
                    ? '#ccc'
                    : 'linear-gradient(135deg, #ff6b9d, #ff8fab)',
                  color: 'white',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  cursor: (!newAppointment.date || !newAppointment.time || !newAppointment.client || !newAppointment.phone || !newAppointment.service || !newAppointment.price) ? 'not-allowed' : 'pointer'
                }}
              >
                {editingAppointment ? 'Actualizar' : 'Crear'} Cita
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal para Ver Detalles de la Cita */}
      {showViewModal && viewingAppointment && (
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
        }} onClick={() => setShowViewModal(false)}>
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
                Detalles de la Cita
              </h3>
              <button
                onClick={() => setShowViewModal(false)}
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

            <div style={{
              display: 'flex',
              justifyContent: 'center',
              marginBottom: '25px'
            }}>
              <div style={{
                padding: '15px 25px',
                borderRadius: '20px',
                fontSize: '14px',
                fontWeight: 'bold',
                background: getStatusColor(viewingAppointment.status).bg,
                color: getStatusColor(viewingAppointment.status).color,
                textTransform: 'uppercase',
                letterSpacing: '1px'
              }}>
                {viewingAppointment.status}
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '20px'
              }}>
                <div style={{
                  background: '#f8f9fa',
                  padding: '20px',
                  borderRadius: '15px',
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: '24px', marginBottom: '10px' }}>📅</div>
                  <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#333', marginBottom: '5px' }}>
                    {formatDate(viewingAppointment.date)}
                  </div>
                  <div style={{ fontSize: '14px', color: '#666' }}>Fecha</div>
                </div>

                <div style={{
                  background: '#f8f9fa',
                  padding: '20px',
                  borderRadius: '15px',
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: '24px', marginBottom: '10px' }}>⏰</div>
                  <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#333', marginBottom: '5px' }}>
                    {viewingAppointment.time}
                  </div>
                  <div style={{ fontSize: '14px', color: '#666' }}>Hora</div>
                </div>
              </div>

              <div style={{
                background: 'linear-gradient(135deg, #ff6b9d15, #ff8fab15)',
                padding: '20px',
                borderRadius: '15px',
                border: '2px solid #ff6b9d30'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                  <User size={20} color="#ff6b9d" />
                  <span style={{ fontSize: '16px', fontWeight: 'bold', color: '#ff6b9d' }}>Información del Cliente</span>
                </div>
                <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#333', marginBottom: '8px' }}>
                  {viewingAppointment.client}
                </div>
                <div style={{ fontSize: '14px', color: '#666', marginBottom: '5px' }}>
                  📞 {viewingAppointment.phone}
                </div>
                {viewingAppointment.email && (
                  <div style={{ fontSize: '14px', color: '#666' }}>
                    📧 {viewingAppointment.email}
                  </div>
                )}
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: '2fr 1fr',
                gap: '20px'
              }}>
                <div style={{
                  background: '#f8f9fa',
                  padding: '20px',
                  borderRadius: '15px'
                }}>
                  <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#333', marginBottom: '8px' }}>
                    💅 Servicio
                  </div>
                  <div style={{ fontSize: '14px', color: '#666' }}>
                    {viewingAppointment.service}
                  </div>
                </div>

                <div style={{
                  background: 'linear-gradient(135deg, #10b98115, #34d39915)',
                  padding: '20px',
                  borderRadius: '15px',
                  textAlign: 'center',
                  border: '2px solid #10b98130'
                }}>
                  <div style={{ fontSize: '24px', marginBottom: '5px' }}>💰</div>
                  <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#10b981' }}>
                    {viewingAppointment.price}
                  </div>
                </div>
              </div>

              {viewingAppointment.notes && (
                <div style={{
                  background: '#f8f9fa',
                  padding: '20px',
                  borderRadius: '15px'
                }}>
                  <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#333', marginBottom: '10px' }}>
                    📝 Notas
                  </div>
                  <div style={{ fontSize: '14px', color: '#666', lineHeight: 1.5 }}>
                    {viewingAppointment.notes}
                  </div>
                </div>
              )}
            </div>

            <div style={{ display: 'flex', gap: '15px', marginTop: '25px' }}>
              <button
                onClick={() => {
                  setShowViewModal(false);
                  handleEdit(viewingAppointment);
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
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}
                onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
                onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
              >
                <Edit size={16} />
                Editar Cita
              </button>

              {viewingAppointment.status === 'pendiente' && (
                <button
                  onClick={() => {
                    handleStatusChange(viewingAppointment.id, 'confirmada');
                    setShowViewModal(false);
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
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px'
                  }}
                  onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
                  onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
                >
                  <CheckCircle size={16} />
                  Confirmar
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppointmentsManager;