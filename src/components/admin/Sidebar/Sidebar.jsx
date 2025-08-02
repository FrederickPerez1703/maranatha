import { Calendar, DollarSign, Users, Clock, Settings, LogOut } from 'lucide-react';

const Sidebar = ({ activeSection, setActiveSection, onLogout }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <Calendar size={20} /> },
    { id: 'appointments', label: 'Citas', icon: <Clock size={20} /> },
    { id: 'clients', label: 'Clientes', icon: <Users size={20} /> },
    { id: 'services', label: 'Servicios', icon: <Settings size={20} /> },
    { id: 'reports', label: 'Reportes', icon: <DollarSign size={20} /> }
  ];

  return (
    <div style={{
      width: '280px',
      height: '100vh',
      background: 'linear-gradient(180deg, #ff6b9d, #ff8fab)',
      color: 'white',
      position: 'fixed',
      left: 0,
      top: 0,
      padding: '20px 0',
      boxShadow: '4px 0 20px rgba(255, 107, 157, 0.2)',
      display: 'flex',
      flexDirection: 'column' // Esto asegura que todo el contenido se apile verticalmente
    }}>
      <div style={{ 
        padding: '0 20px', 
        marginBottom: '40px', 
        textAlign: 'center' 
      }}>
        <div style={{ fontSize: '2rem', marginBottom: '10px' }}>🌸</div>
        <h2 style={{ fontSize: '18px', fontWeight: 'bold', margin: 0 }}>En Maranatha</h2>
        <p style={{ fontSize: '12px', opacity: 0.8, margin: '5px 0 0 0' }}>Panel de Administración</p>
      </div>

      <nav style={{ 
        //flex: 1, // Esto hace que el nav ocupe el espacio disponible
        display: 'flex',
        flexDirection: 'column' // Asegura que los elementos del menú se apilen verticalmente
      }}>
        {menuItems.map(item => (
          <div
            key={item.id}
            style={{
              padding: '15px 20px',
              cursor: 'pointer',
              background: activeSection === item.id ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
              borderRight: activeSection === item.id ? '4px solid white' : '4px solid transparent',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              width: '100%', // Asegura que cada elemento ocupe todo el ancho
              boxSizing: 'border-box' // Incluye padding en el ancho total
            }}
            onClick={() => setActiveSection(item.id)}
            onMouseOver={(e) => {
              if (activeSection !== item.id) {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
              }
            }}
            onMouseOut={(e) => {
              if (activeSection !== item.id) {
                e.currentTarget.style.background = 'transparent';
              }
            }}
          >
            {item.icon}
            <span style={{ fontSize: '16px' }}>{item.label}</span>
          </div>
        ))}
      </nav>

      <div style={{ 
        padding: '0 20px',
        marginTop: 'auto' // Empuja el botón hacia abajo
      }}>
        <div
          style={{
            padding: '15px',
            cursor: 'pointer',
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '15px',
            transition: 'all 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}
          onClick={onLogout}
          onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'}
          onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'}
        >
          <LogOut size={20} />
          <span>Cerrar Sesión</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;