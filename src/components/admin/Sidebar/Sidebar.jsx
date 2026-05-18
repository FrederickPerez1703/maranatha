import { useState } from 'react';
import { Calendar, DollarSign, Users, Clock, Settings, LogOut, FileText, Menu, X, Shield, MessageSquare, Zap } from 'lucide-react';
import ConfirmationModal from '../../ui/ConfirmationModal/ConfirmationModal';
import './Sidebar.css';

const Sidebar = ({ activeSection, setActiveSection, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <Calendar size={20} /> },
    { id: 'appointments', label: 'Citas', icon: <Clock size={20} /> },
    { id: 'clients', label: 'Clientes', icon: <Users size={20} /> },
    { id: 'services', label: 'Servicios', icon: <Settings size={20} /> },
    { id: 'events', label: 'Eventos', icon: <Calendar size={20} /> },
    { id: 'reviews', label: 'Reseñas', icon: <MessageSquare size={20} /> },
    { id: 'features', label: 'Funcionalidades', icon: <Zap size={20} /> },
    { id: 'invoices', label: 'Facturas', icon: <FileText size={20} /> },
    { id: 'reports', label: 'Reportes', icon: <DollarSign size={20} /> },
    { id: 'admin', label: 'Administración', icon: <Shield size={20} /> }
  ];

  const handleMenuClick = (id) => {
    setActiveSection(id);
    setIsOpen(false);
  };

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  const handleConfirmLogout = () => {
    onLogout();
    setIsOpen(false);
  };

  return (
    <>
      {/* Botón hamburguesa para móvil */}
      <button
        className="sidebar-mobile-toggle"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={24} color="white" /> : <Menu size={24} color="white" />}
      </button>

      {/* Overlay para cerrar el menú en móvil */}
      <div
        className={`sidebar-overlay ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(false)}
      />

      {/* Sidebar Desktop */}
      <div className="sidebar-desktop sidebar-scroll">
        <div className="sidebar-brand">
          <div className="sidebar-brand-icon">🌸</div>
          <h2 className="sidebar-brand-title">En Maranatha</h2>
          <p className="sidebar-brand-subtitle">Panel de Administración</p>
        </div>

        <nav className="sidebar-nav">
          {menuItems.map(item => (
            <button
              key={item.id}
              className={`sidebar-nav-item ${activeSection === item.id ? 'active' : ''}`}
              onClick={() => handleMenuClick(item.id)}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <button className="sidebar-logout" onClick={handleLogoutClick}>
            <LogOut size={20} />
            <span>Cerrar Sesión</span>
          </button>
        </div>
      </div>

      {/* Sidebar Mobile */}
      <div className={`sidebar-mobile sidebar-scroll ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-brand">
          <div className="sidebar-brand-icon">🌸</div>
          <h2 className="sidebar-brand-title">En Maranatha</h2>
          <p className="sidebar-brand-subtitle">Panel de Administración</p>
        </div>

        <nav className="sidebar-nav">
          {menuItems.map(item => (
            <button
              key={item.id}
              className={`sidebar-nav-item ${activeSection === item.id ? 'active' : ''}`}
              onClick={() => handleMenuClick(item.id)}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <button
            className="sidebar-logout"
            onClick={() => {
              handleLogoutClick();
              setIsOpen(false);
            }}
          >
            <LogOut size={20} />
            <span>Cerrar Sesión</span>
          </button>
        </div>
      </div>

      {/* Modal de confirmación de logout */}
      <ConfirmationModal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={handleConfirmLogout}
        title="¿Cerrar Sesión?"
        message="¿Estás seguro de que quieres cerrar sesión? Tendrás que volver a iniciar sesión para acceder al panel."
        type="logout"
        confirmText="Cerrar Sesión"
        cancelText="Cancelar"
      />
    </>
  );
};

export default Sidebar;