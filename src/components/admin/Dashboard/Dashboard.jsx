import Sidebar from '../Sidebar/Sidebar';
import DashboardOverview from '../DashboardOverview/DashboardOverview';
import AppointmentsManager from '../AppointmentsManager/AppointmentsManager';
import ClientsManager from '../ClientsManager/ClientsManager';
import ServicesManager from '../ServicesManager/ServicesManager';
import InvoiceManager from '../InvoiceManager/InvoiceManager';
import ReportsManager from '../ReportsManager/ReportsManager';
import AdminManager from '../AdminManager/AdminManager';
import Alert from '../../ui/Alert/Alert';
import { useState, useEffect } from 'react';
import '../AdminResponsive.css';

// Componente principal del Dashboard
const Dashboard = ({ onLogout, user }) => {
  // Cargar la sección activa desde localStorage o usar 'dashboard' por defecto
  const [activeSection, setActiveSection] = useState(() => {
    const savedSection = localStorage.getItem('adminActiveSection');
    return savedSection || 'dashboard';
  });

  const hasRole = (role) => user.roles.includes(role);

  // Guardar la sección activa en localStorage cada vez que cambie
  useEffect(() => {
    localStorage.setItem('adminActiveSection', activeSection);
  }, [activeSection]);

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <DashboardOverview />;
      case 'appointments':
        return hasRole('admin') || hasRole('reception') || hasRole('stylist')
          ? <AppointmentsManager />
          : <Alert
            type="permission"
            title="Acceso Denegado"
            message={`Hola ${user.username}, no tienes los permisos necesarios para ver la sección de citas. Por favor, contacta al administrador si necesitas acceso.`}
          />;
      case 'clients':
        return hasRole('admin') || hasRole('reception')
          ? <ClientsManager />
          : <Alert
            type="permission"
            title="Acceso Denegado"
            message={`Hola ${user.username}, no tienes los permisos necesarios para ver la sección de clientes. Por favor, contacta al administrador si necesitas acceso.`}
          />;
      case 'services':
        return hasRole('admin') || hasRole('stylist')
          ? <ServicesManager />
          : <Alert
            type="permission"
            title="Acceso Denegado"
            message={`Hola ${user.username}, no tienes los permisos necesarios para ver la sección de servicios. Por favor, contacta al administrador si necesitas acceso.`}
          />;
      case 'invoices':
        return hasRole('admin') || hasRole('accounting')
          ? <InvoiceManager user={user} />
          : <Alert
            type="permission"
            title="Acceso Denegado"
            message={`Hola ${user.username}, no tienes los permisos necesarios para ver la sección de facturas. Por favor, contacta al administrador si necesitas acceso.`}
          />;
      case 'reports':
        return hasRole('admin')
          ? <ReportsManager />
          : <Alert
            type="permission"
            title="Acceso Denegado"
            message={`Hola ${user.username}, no tienes los permisos necesarios para ver la sección de reportes. Esta sección está disponible solo para administradores.`}
          />;
      case 'admin':
        return hasRole('admin')
          ? <AdminManager />
          : <Alert
            type="permission"
            title="Acceso Denegado"
            message={`Hola ${user.username}, esta sección está disponible solo para administradores. Aquí se gestionan usuarios, permisos y notificaciones del sistema.`}
          />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <>
      <style>{`
        @media (max-width: 768px) {
          .dashboard-content {
            margin-left: 0 !important;
            padding-top: 70px;
            padding-left: 10px;
            padding-right: 10px;
          }
        }
        
        @media (min-width: 769px) {
          .dashboard-content {
            padding: 20px;
          }
        }
      `}</style>

      <div style={{ display: 'flex', minHeight: '100vh', background: '#f8f9fa' }}>
        <Sidebar
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          onLogout={onLogout}
        />
        <div className="dashboard-content" style={{
          marginLeft: '280px',
          flex: 1,
          overflowY: 'auto',
          overflowX: 'hidden'
        }}>
          {renderContent()}
        </div>
      </div>
    </>
  );
};

export default Dashboard;