import Sidebar from '../Sidebar/Sidebar';
import DashboardOverview from '../DashboardOverview/DashboardOverview';
import AppointmentsManager from '../AppointmentsManager/AppointmentsManager';
import ClientsManager from '../ClientsManager/ClientsManager';
import ServicesManager from '../ServicesManager/ServicesManager';
import InvoiceManager from '../InvoiceManager/InvoiceManager';
import ReportsManager from '../ReportsManager/ReportsManager';
import { useState } from 'react';
import '../AdminResponsive.css';

// Componente principal del Dashboard
const Dashboard = ({ onLogout }) => {
  const [activeSection, setActiveSection] = useState('dashboard');

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <DashboardOverview />;
      case 'appointments':
        return <AppointmentsManager />;
      case 'clients':
        return <ClientsManager />;
      case 'services':
        return <ServicesManager />;
      case 'invoices':
        return <InvoiceManager />;
      case 'reports':
        return <ReportsManager />;
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