import { useState } from 'react';
import { Calendar, DollarSign, Users, Clock, Settings, LogOut, FileText, Menu, X } from 'lucide-react';

const Sidebar = ({ activeSection, setActiveSection, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <Calendar size={20} /> },
    { id: 'appointments', label: 'Citas', icon: <Clock size={20} /> },
    { id: 'clients', label: 'Clientes', icon: <Users size={20} /> },
    { id: 'services', label: 'Servicios', icon: <Settings size={20} /> },
    { id: 'invoices', label: 'Facturas', icon: <FileText size={20} /> },
    { id: 'reports', label: 'Reportes', icon: <DollarSign size={20} /> }
  ];

  const handleMenuClick = (id) => {
    setActiveSection(id);
    setIsOpen(false); // Cerrar menú en móvil después de seleccionar
  };

  return (
    <>
      <style>{`
        @media (max-width: 768px) {
          .sidebar-desktop {
            display: none !important;
          }
          .sidebar-mobile-toggle {
            display: flex !important;
          }
          .sidebar-mobile {
            transform: translateX(${isOpen ? '0' : '-100%'}) !important;
          }
          .sidebar-overlay {
            display: ${isOpen ? 'block' : 'none'} !important;
          }
        }
        @media (min-width: 769px) {
          .sidebar-desktop {
            display: flex !important;
          }
          .sidebar-mobile-toggle {
            display: none !important;
          }
          .sidebar-mobile {
            display: none !important;
          }
          .sidebar-overlay {
            display: none !important;
          }
        }
      `}</style>

      {/* Botón hamburguesa para móvil */}
      <button
        className="sidebar-mobile-toggle"
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          zIndex: 1001,
          background: 'linear-gradient(135deg, #ff6b9d, #ff8fab)',
          border: 'none',
          borderRadius: '12px',
          padding: '12px',
          cursor: 'pointer',
          boxShadow: '0 4px 15px rgba(255, 107, 157, 0.3)',
          display: 'none'
        }}
      >
        {isOpen ? <X size={24} color="white" /> : <Menu size={24} color="white" />}
      </button>

      {/* Overlay para cerrar el menú en móvil */}
      <div
        className="sidebar-overlay"
        onClick={() => setIsOpen(false)}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.3)', // Overlay más sutil
          backdropFilter: 'blur(3px)', // Desenfoque sutil en el fondo
          zIndex: 999,
          display: 'none',
          transition: 'all 0.3s ease'
        }}
      />

      {/* Sidebar Desktop */}
      <div className="sidebar-desktop" style={{
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
        flexDirection: 'column',
        zIndex: 100
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
          display: 'flex',
          flexDirection: 'column'
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
                width: '100%',
                boxSizing: 'border-box'
              }}
              onClick={() => handleMenuClick(item.id)}
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
          marginTop: 'auto'
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

      {/* Sidebar Mobile (Estilo Nativo iOS) */}
      <div className="sidebar-mobile" style={{
        width: '280px',
        height: '100vh',
        // Fondo translúcido estilo iOS (Glassmorphism)
        background: 'rgba(255, 107, 157, 0.85)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)', // Soporte para Safari
        color: 'white',
        position: 'fixed',
        left: 0,
        top: 0,
        padding: '20px 0',
        // Sombra suave y difusa
        boxShadow: '10px 0 40px rgba(255, 107, 157, 0.3)',
        display: 'flex',
        flexDirection: 'column',
        zIndex: 1000,
        // Animación suave estilo iOS (Spring)
        transition: 'transform 0.5s cubic-bezier(0.32, 0.72, 0, 1)',
        transform: 'translateX(-100%)',
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
          display: 'flex',
          flexDirection: 'column',
          padding: '0 15px'
        }}>
          {menuItems.map(item => (
            <div
              key={item.id}
              style={{
                padding: '16px 20px',
                marginBottom: '8px',
                cursor: 'pointer',
                // Estilo de botón seleccionado estilo iOS
                background: activeSection === item.id ? 'rgba(255, 255, 255, 0.25)' : 'transparent',
                borderRadius: '16px', // Bordes redondeados en los items
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '15px',
                width: '100%',
                boxSizing: 'border-box',
                fontWeight: activeSection === item.id ? 'bold' : 'normal'
              }}
              onClick={() => handleMenuClick(item.id)}
            >
              {item.icon}
              <span style={{ fontSize: '17px' }}>{item.label}</span>
            </div>
          ))}
        </nav>

        <div style={{
          padding: '0 20px',
          marginTop: 'auto',
          marginBottom: '30px' // Espacio para el home indicator
        }}>
          <div
            style={{
              padding: '16px',
              cursor: 'pointer',
              background: 'rgba(255, 255, 255, 0.15)',
              borderRadius: '16px',
              transition: 'all 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              backdropFilter: 'blur(5px)'
            }}
            onClick={() => {
              onLogout();
              setIsOpen(false);
            }}
          >
            <LogOut size={20} />
            <span style={{ fontWeight: '500' }}>Cerrar Sesión</span>
          </div>
        </div>
      </div >
    </>
  );
};

export default Sidebar;