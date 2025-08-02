import  { useState } from 'react';
import { Eye, CheckCircle, XCircle, Filter } from 'lucide-react';

// Componente Gestión de Citas
const AppointmentsManager = () => {
  const [filter, setFilter] = useState('all');
  const [appointments] = useState([
    { id: 1, date: '2025-01-31', time: '10:00', client: 'María González', service: 'Manicura Francesa', price: '$30', status: 'confirmada', phone: '+1234567890' },
    { id: 2, date: '2025-01-31', time: '11:30', client: 'Ana Rodríguez', service: 'Corte de Cabello', price: '$30', status: 'pendiente', phone: '+1234567891' },
    { id: 3, date: '2025-02-01', time: '14:00', client: 'Sofia López', service: 'Facial Hidratante', price: '$55', status: 'confirmada', phone: '+1234567892' },
    { id: 4, date: '2025-02-01', time: '16:00', client: 'Carmen Silva', service: 'Maquillaje de Noche', price: '$50', status: 'cancelada', phone: '+1234567893' }
  ]);

  const filteredAppointments = appointments.filter(apt => 
    filter === 'all' || apt.status === filter
  );

  const getStatusColor = (status) => {
    switch(status) {
      case 'confirmada': return { bg: '#10b98115', color: '#10b981' };
      case 'pendiente': return { bg: '#f59e0b15', color: '#f59e0b' };
      case 'cancelada': return { bg: '#ef444415', color: '#ef4444' };
      default: return { bg: '#f0f0f0', color: '#666' };
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h2 style={{ color: '#ff6b9d', fontSize: '28px', margin: 0 }}>Gestión de Citas</h2>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
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
      </div>

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
              <div key={appointment.id} style={{
                display: 'grid',
                gridTemplateColumns: '1fr 150px 120px 100px 120px',
                alignItems: 'center',
                padding: '20px',
                background: '#f8f9fa',
                borderRadius: '15px',
                border: '1px solid #f0f0f0',
                gap: '20px'
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
                    {new Date(appointment.date).toLocaleDateString('es-ES')}
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

                <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                  <button style={{
                    padding: '8px',
                    borderRadius: '8px',
                    border: 'none',
                    background: '#10b98115',
                    color: '#10b981',
                    cursor: 'pointer'
                  }}>
                    <CheckCircle size={16} />
                  </button>
                  <button style={{
                    padding: '8px',
                    borderRadius: '8px',
                    border: 'none',
                    background: '#ef444415',
                    color: '#ef4444',
                    cursor: 'pointer'
                  }}>
                    <XCircle size={16} />
                  </button>
                  <button style={{
                    padding: '8px',
                    borderRadius: '8px',
                    border: 'none',
                    background: '#9333ea15',
                    color: '#9333ea',
                    cursor: 'pointer'
                  }}>
                    <Eye size={16} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AppointmentsManager;