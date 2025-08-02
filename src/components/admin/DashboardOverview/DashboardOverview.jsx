import { Calendar, DollarSign, Users, Clock, Settings} from 'lucide-react';

// Componente Dashboard Overview
const DashboardOverview = () => {
  const stats = [
    { label: 'Citas Hoy', value: '12', icon: <Calendar />, color: '#ff6b9d' },
    { label: 'Clientes Totales', value: '156', icon: <Users />, color: '#9333ea' },
    { label: 'Ingresos Mes', value: '$3,245', icon: <DollarSign />, color: '#10b981' },
    { label: 'Servicios Activos', value: '28', icon: <Settings />, color: '#f59e0b' }
  ];

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ color: '#ff6b9d', fontSize: '28px', marginBottom: '30px' }}>Dashboard</h2>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
        gap: '20px',
        marginBottom: '40px'
      }}>
        {stats.map((stat, index) => (
          <div key={index} style={{
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
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <div style={{ 
                padding: '12px', 
                borderRadius: '15px', 
                background: `${stat.color}15`,
                color: stat.color
              }}>
                {stat.icon}
              </div>
              <div>
                <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#333' }}>
                  {stat.value}
                </div>
                <div style={{ fontSize: '14px', color: '#666' }}>
                  {stat.label}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Próximas citas */}
      <div style={{
        background: 'white',
        borderRadius: '20px',
        padding: '25px',
        boxShadow: '0 10px 30px rgba(255, 107, 157, 0.1)'
      }}>
        <h3 style={{ color: '#ff6b9d', marginBottom: '20px' }}>Próximas Citas de Hoy</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {[
            { time: '10:00 AM', client: 'María González', service: 'Manicura Francesa', status: 'confirmada' },
            { time: '11:30 AM', client: 'Ana Rodríguez', service: 'Corte de Cabello', status: 'pendiente' },
            { time: '2:00 PM', client: 'Sofia López', service: 'Facial Hidratante', status: 'confirmada' }
          ].map((appointment, index) => (
            <div key={index} style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '15px',
              background: '#f8f9fa',
              borderRadius: '15px',
              border: '1px solid #f0f0f0'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <div style={{
                  padding: '10px',
                  background: appointment.status === 'confirmada' ? '#10b98115' : '#f59e0b15',
                  borderRadius: '10px',
                  color: appointment.status === 'confirmada' ? '#10b981' : '#f59e0b'
                }}>
                  <Clock size={16} />
                </div>
                <div>
                  <div style={{ fontWeight: 'bold', color: '#333' }}>{appointment.time}</div>
                  <div style={{ fontSize: '14px', color: '#666' }}>
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
                color: appointment.status === 'confirmada' ? '#10b981' : '#f59e0b'
              }}>
                {appointment.status}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;