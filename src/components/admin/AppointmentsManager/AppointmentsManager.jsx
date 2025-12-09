import { useState } from 'react';
import { Eye, CheckCircle, XCircle, Filter, Plus, Edit, Trash2, Calendar, Clock, DollarSign } from 'lucide-react';
import { useAppointments } from '../../../contexts/AppointmentsContext';
import { useServices } from '../../../contexts/ServicesContext';
import { useNotifications } from '../../../contexts/NotificationsContext';

// Componente Gestión de Citas con CRUD completo y Contexto
const AppointmentsManager = () => {
  const { appointments, addAppointment, updateAppointment, deleteAppointment } = useAppointments();
  const { services: availableServices } = useServices();
  const { addNotification } = useNotifications();

  const [filter, setFilter] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [editingAppointment, setEditingAppointment] = useState(null);
  const [viewingAppointment, setViewingAppointment] = useState(null);

  const [newAppointment, setNewAppointment] = useState({
    date: '',
    time: '',
    client: '',
    phone: '',
    email: '',
    service: '',
    price: '', // Se mantiene en estado interno por compatibilidad pero no se muestra
    status: 'pendiente',
    notes: ''
  });

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
    if (!newAppointment.client || !newAppointment.date || !newAppointment.time) {
      alert("Por favor completa los campos obligatorios");
      return;
    }

    if (editingAppointment) {
      updateAppointment(editingAppointment.id, newAppointment);
    } else {
      addAppointment(newAppointment);
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
      email: appointment.email || '',
      service: appointment.service,
      price: appointment.price ? appointment.price.toString().replace('$', '') : '',
      status: appointment.status,
      notes: appointment.notes || ''
    });
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta cita?')) {
      deleteAppointment(id);
    }
  };

  const handleStatusChange = (id, newStatus) => {
    updateAppointment(id, { status: newStatus });

    // Si se confirma la cita, crear notificación para facturación
    if (newStatus === 'confirmada') {
      const appointment = appointments.find(a => a.id === id);
      if (appointment) {
        addNotification({
          type: 'invoice_pending',
          title: 'Factura Pendiente',
          message: `Generar factura para ${appointment.client}`,
          data: appointment
        });
      }
    }
  };

  const handleView = (appointment) => {
    setViewingAppointment(appointment);
    setShowViewModal(true);
  };

  const handleServiceChange = (serviceName) => {
    const selectedService = availableServices.find(s => s.name === serviceName);
    setNewAppointment({
      ...newAppointment,
      service: serviceName,
      price: selectedService && selectedService.price ? selectedService.price.toString() : newAppointment.price
    });
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return 'N/A';
    const date = new Date(dateStr);
    const userTimezoneOffset = date.getTimezoneOffset() * 60000;
    const adjustedDate = new Date(date.getTime() + userTimezoneOffset);
    return adjustedDate.toLocaleDateString('es-ES');
  };

  const getAppointmentStats = () => {
    const total = appointments.length;
    const confirmed = appointments.filter(a => a.status === 'confirmada').length;
    const pending = appointments.filter(a => a.status === 'pendiente').length;
    const cancelled = appointments.filter(a => a.status === 'cancelada').length;

    return { total, confirmed, pending, cancelled };
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
          onClick={() => {
            setEditingAppointment(null);
            resetNewAppointment();
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
        {/* Total Citas */}
        <div style={{ background: 'white', padding: '25px', borderRadius: '20px', boxShadow: '0 8px 25px rgba(0,0,0,0.05)', border: '2px solid #ff6b9d30', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '-20px', right: '-20px', width: '80px', height: '80px', background: '#ff6b9d10', borderRadius: '50%', opacity: 0.5 }}></div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative', zIndex: 1 }}>
            <div>
              <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#333', marginBottom: '5px' }}>{stats.total}</div>
              <div style={{ color: '#666', fontWeight: '500' }}>Total Citas</div>
            </div>
            <div style={{ padding: '15px', borderRadius: '50%', background: '#ff6b9d10', color: '#ff6b9d' }}><Calendar size={28} /></div>
          </div>
        </div>

        {/* Confirmadas */}
        <div style={{ background: 'white', padding: '25px', borderRadius: '20px', boxShadow: '0 8px 25px rgba(0,0,0,0.05)', border: '2px solid #10b98130', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '-20px', right: '-20px', width: '80px', height: '80px', background: '#10b98110', borderRadius: '50%', opacity: 0.5 }}></div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative', zIndex: 1 }}>
            <div>
              <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#333', marginBottom: '5px' }}>{stats.confirmed}</div>
              <div style={{ color: '#666', fontWeight: '500' }}>Confirmadas</div>
            </div>
            <div style={{ padding: '15px', borderRadius: '50%', background: '#10b98110', color: '#10b981' }}><CheckCircle size={28} /></div>
          </div>
        </div>

        {/* Pendientes */}
        <div style={{ background: 'white', padding: '25px', borderRadius: '20px', boxShadow: '0 8px 25px rgba(0,0,0,0.05)', border: '2px solid #f59e0b30', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '-20px', right: '-20px', width: '80px', height: '80px', background: '#f59e0b10', borderRadius: '50%', opacity: 0.5 }}></div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative', zIndex: 1 }}>
            <div>
              <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#333', marginBottom: '5px' }}>{stats.pending}</div>
              <div style={{ color: '#666', fontWeight: '500' }}>Pendientes</div>
            </div>
            <div style={{ padding: '15px', borderRadius: '50%', background: '#f59e0b10', color: '#f59e0b' }}><Clock size={28} /></div>
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
        {appointments.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
            <div style={{ fontSize: '48px', marginBottom: '10px' }}>📅</div>
            <p>No hay citas registradas.</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {filteredAppointments.map(appointment => {
              const statusStyle = getStatusColor(appointment.status);
              return (
                <div key={appointment.id} className="appointment-row" style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 140px 120px 240px',
                  alignItems: 'center',
                  padding: '20px',
                  background: '#f8f9fa',
                  borderRadius: '15px',
                  border: '1px solid #f0f0f0',
                  gap: '30px',
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

                  <div className="appointment-actions" style={{ display: 'flex', gap: '5px', justifyContent: 'flex-end', flexWrap: 'nowrap' }}>
                    <button onClick={() => handleView(appointment)} title="Ver detalles" style={{ padding: '6px', borderRadius: '6px', border: 'none', background: '#3b82f615', color: '#3b82f6', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Eye size={18} /></button>
                    <button onClick={() => handleEdit(appointment)} title="Editar" style={{ padding: '6px', borderRadius: '6px', border: 'none', background: '#9333ea15', color: '#9333ea', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Edit size={18} /></button>
                    <button onClick={() => handleStatusChange(appointment.id, 'confirmada')} disabled={appointment.status === 'confirmada'} title="Confirmar" style={{ padding: '6px', borderRadius: '6px', border: 'none', background: appointment.status === 'confirmada' ? '#ccc' : '#10b98115', color: appointment.status === 'confirmada' ? '#999' : '#10b981', cursor: appointment.status === 'confirmada' ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><CheckCircle size={18} /></button>
                    <button onClick={() => handleStatusChange(appointment.id, 'cancelada')} disabled={appointment.status === 'cancelada'} title="Cancelar" style={{ padding: '6px', borderRadius: '6px', border: 'none', background: appointment.status === 'cancelada' ? '#ccc' : '#ef444415', color: appointment.status === 'cancelada' ? '#999' : '#ef4444', cursor: appointment.status === 'cancelada' ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><XCircle size={18} /></button>
                    <button onClick={() => handleDelete(appointment.id)} title="Eliminar" style={{ padding: '6px', borderRadius: '6px', border: 'none', background: '#ef444415', color: '#ef4444', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Trash2 size={18} /></button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Modal para Crear/Editar Cita */}
      {showModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
          background: 'rgba(0, 0, 0, 0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
        }} onClick={() => setShowModal(false)}>
          <div style={{
            background: 'white', borderRadius: '20px', padding: '30px', width: '90%', maxWidth: '600px', maxHeight: '90vh', overflowY: 'auto'
          }} onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
              <h3 style={{ color: '#ff6b9d', fontSize: '24px', margin: 0 }}>{editingAppointment ? 'Editar Cita' : 'Nueva Cita'}</h3>
              <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer', color: '#999' }}>×</button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', color: '#333', marginBottom: '8px' }}>Fecha *</label>
                <input type="date" value={newAppointment.date} onChange={(e) => setNewAppointment({ ...newAppointment, date: e.target.value })} style={{ width: '100%', padding: '12px 16px', border: '2px solid #f0f0f0', borderRadius: '10px', fontSize: '16px', outline: 'none' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', color: '#333', marginBottom: '8px' }}>Hora *</label>
                <input type="time" value={newAppointment.time} onChange={(e) => setNewAppointment({ ...newAppointment, time: e.target.value })} style={{ width: '100%', padding: '12px 16px', border: '2px solid #f0f0f0', borderRadius: '10px', fontSize: '16px', outline: 'none' }} />
              </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', color: '#333', marginBottom: '8px' }}>Cliente *</label>
              <input type="text" value={newAppointment.client} onChange={(e) => setNewAppointment({ ...newAppointment, client: e.target.value })} placeholder="Nombre del cliente" style={{ width: '100%', padding: '12px 16px', border: '2px solid #f0f0f0', borderRadius: '10px', fontSize: '16px', outline: 'none' }} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', color: '#333', marginBottom: '8px' }}>Teléfono</label>
                <input type="tel" value={newAppointment.phone} onChange={(e) => setNewAppointment({ ...newAppointment, phone: e.target.value })} placeholder="+1234567890" style={{ width: '100%', padding: '12px 16px', border: '2px solid #f0f0f0', borderRadius: '10px', fontSize: '16px', outline: 'none' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', color: '#333', marginBottom: '8px' }}>Email</label>
                <input type="email" value={newAppointment.email} onChange={(e) => setNewAppointment({ ...newAppointment, email: e.target.value })} placeholder="cliente@email.com" style={{ width: '100%', padding: '12px 16px', border: '2px solid #f0f0f0', borderRadius: '10px', fontSize: '16px', outline: 'none' }} />
              </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', color: '#333', marginBottom: '8px' }}>Servicio</label>
              <select value={newAppointment.service} onChange={(e) => handleServiceChange(e.target.value)} style={{ width: '100%', padding: '12px 16px', border: '2px solid #f0f0f0', borderRadius: '10px', fontSize: '16px', outline: 'none', background: 'white' }}>
                <option value="">Seleccionar servicio...</option>
                {availableServices.map(s => (
                  <option key={s.id} value={s.name}>{s.name}</option>
                ))}
              </select>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', color: '#333', marginBottom: '8px' }}>Notas</label>
              <textarea value={newAppointment.notes} onChange={(e) => setNewAppointment({ ...newAppointment, notes: e.target.value })} placeholder="Notas adicionales..." style={{ width: '100%', padding: '12px 16px', border: '2px solid #f0f0f0', borderRadius: '10px', fontSize: '16px', outline: 'none', minHeight: '80px', resize: 'vertical' }} />
            </div>

            <div style={{ display: 'flex', gap: '15px' }}>
              <button onClick={() => setShowModal(false)} style={{ flex: 1, padding: '14px', borderRadius: '12px', border: '2px solid #f0f0f0', background: 'white', color: '#666', fontWeight: 'bold', cursor: 'pointer' }}>Cancelar</button>
              <button onClick={handleSaveAppointment} style={{ flex: 1, padding: '14px', borderRadius: '12px', border: 'none', background: 'linear-gradient(135deg, #ff6b9d, #ff8fab)', color: 'white', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 4px 15px rgba(255, 107, 157, 0.3)' }}>{editingAppointment ? 'Guardar Cambios' : 'Crear Cita'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppointmentsManager;