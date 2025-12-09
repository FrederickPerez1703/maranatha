import { Calendar, Users, Clock, Settings } from 'lucide-react';
import { useAppointments } from '../../../contexts/AppointmentsContext';
import { useClients } from '../../../contexts/ClientsContext';
import { useServices } from '../../../contexts/ServicesContext';

// Componente Dashboard Overview
const DashboardOverview = () => {
  const { appointments } = useAppointments();
  const { clients } = useClients();
  const { services } = useServices();

  // Obtener fecha de hoy en formato YYYY-MM-DD para comparar
  const today = new Date();
  const todayStr = today.toISOString().split('T')[0];

  // Filtrar citas de hoy
  const todayAppointments = appointments.filter(apt => apt.date === todayStr);

  // Ordenar citas por hora
  todayAppointments.sort((a, b) => a.time.localeCompare(b.time));

  const stats = [
    { label: 'Citas Hoy', value: todayAppointments.length, icon: <Calendar />, color: '#ff6b9d' },
    { label: 'Clientes Totales', value: clients.length, icon: <Users />, color: '#9333ea' },
    // Eliminado Ingresos Mes
    { label: 'Servicios Activos', value: services.length, icon: <Settings />, color: '#f59e0b' }
  ];

  // Función para formatear hora a AM/PM
  const formatTime = (timeStr) => {
    if (!timeStr) return '';
    const [hours, minutes] = timeStr.split(':');
    const hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`;
  };

  return (
    <>
      <style>{`
        @media (max-width: 768px) {
          .dashboard-title {
            font-size: 22px !important;
            margin-bottom: 20px !important;
          }
          .stats-grid {
            grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)) !important;
            gap: 12px !important;
          }
          .stat-card {
            padding: 18px !important;
          }
          .stat-value {
            font-size: 20px !important;
          }
          .stat-label {
            font-size: 12px !important;
          }
          .appointments-container {
            padding: 20px !important;
          }
          .appointment-card {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 12px !important;
            padding: 15px !important;
          }
          .appointment-info {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 8px !important;
            width: 100% !important;
          }
          .appointment-details {
            font-size: 13px !important;
          }
        }
        
        @media (max-width: 480px) {
          .stats-grid {
            grid-template-columns: 1fr !important; /* Una columna en móviles muy pequeños para que se vea bien */
          }
          .stat-icon {
            padding: 10px !important;
          }
        }
      `}</style>

      <div style={{ padding: '20px' }}>
        <h2 className="dashboard-title" style={{ color: '#ff6b9d', fontSize: '28px', marginBottom: '30px', fontWeight: 'bold' }}>Dashboard</h2>

        <div className="stats-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '20px',
          marginBottom: '40px'
        }}>
          {stats.map((stat, index) => (
            <div key={index} className="stat-card" style={{
              background: 'white',
              padding: '25px',
              borderRadius: '20px',
              boxShadow: '0 10px 30px rgba(255, 107, 157, 0.1)',
              border: '2px solid transparent',
              transition: 'all 0.3s ease'
            }}
              onMouseOver={(e) => {
                e.target.closest('div').style.transform = 'translateY(-5px)';
                e.target.closest('div').style.borderColor = stat.color;
              }}
              onMouseOut={(e) => {
                e.target.closest('div').style.transform = 'translateY(0)';
                e.target.closest('div').style.borderColor = 'transparent';
              }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px', flexWrap: 'wrap' }}>
                <div className="stat-icon" style={{
                  padding: '12px',
                  borderRadius: '15px',
                  background: `${stat.color}15`,
                  color: stat.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {stat.icon}
                </div>
                <div style={{ flex: 1, minWidth: '80px' }}>
                  <div className="stat-value" style={{ fontSize: '24px', fontWeight: 'bold', color: '#333' }}>
                    {stat.value}
                  </div>
                  <div className="stat-label" style={{ fontSize: '14px', color: '#666' }}>
                    {stat.label}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Próximas citas */}
        <div className="appointments-container" style={{
          background: 'white',
          borderRadius: '20px',
          padding: '25px',
          boxShadow: '0 10px 30px rgba(255, 107, 157, 0.1)'
        }}>
          <h3 style={{ color: '#ff6b9d', marginBottom: '20px', fontSize: '20px', fontWeight: 'bold' }}>Próximas Citas de Hoy</h3>

          {todayAppointments.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '20px', color: '#666' }}>
              No hay citas programadas para hoy.
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {todayAppointments.map((appointment, index) => (
                <div key={index} className="appointment-card" style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '15px',
                  background: '#f8f9fa',
                  borderRadius: '15px',
                  border: '1px solid #f0f0f0',
                  transition: 'all 0.3s ease'
                }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(255, 107, 157, 0.15)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.boxShadow = 'none';
                  }}>
                  <div className="appointment-info" style={{ display: 'flex', alignItems: 'center', gap: '15px', flex: 1 }}>
                    <div style={{
                      padding: '10px',
                      background: appointment.status === 'confirmada' ? '#10b98115' : '#f59e0b15',
                      borderRadius: '10px',
                      color: appointment.status === 'confirmada' ? '#10b981' : '#f59e0b',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <Clock size={16} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 'bold', color: '#333', marginBottom: '4px' }}>{formatTime(appointment.time)}</div>
                      <div className="appointment-details" style={{ fontSize: '14px', color: '#666', lineHeight: 1.4 }}>
                        {appointment.client} • {appointment.service}
                      </div>
                    </div>
                  </div>
                  <div style={{
                    padding: '5px 12px',
                    borderRadius: '20px',
                    fontSize: '12px',
                    fontWeight: 'bold',
                    background: appointment.status === 'confirmada' ? '#10b98115' : '#f59e0b15',
                    color: appointment.status === 'confirmada' ? '#10b981' : '#f59e0b',
                    whiteSpace: 'nowrap'
                  }}>
                    {appointment.status}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default DashboardOverview;