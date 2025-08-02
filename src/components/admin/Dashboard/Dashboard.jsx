import Sidebar from '../Sidebar/Sidebar';
import DashboardOverview from '../DashboardOverview/DashboardOverview';
import AppointmentsManager from '../AppointmentsManager/AppointmentsManager';
import ClientsManager from '../ClientsManager/ClientsManager';
import ServicesManager from '../ServicesManager/ServicesManager';
import ReportsManager from '../ReportsManager/ReportsManager';
import { useState } from 'react';

// Componente principal del Dashboard
const Dashboard = ({ onLogout }) => {
  const [activeSection, setActiveSection] = useState('dashboard');

  const renderContent = () => {
    switch(activeSection) {
      case 'dashboard':
        return <DashboardOverview />;
      case 'appointments':
        return <AppointmentsManager />;
      case 'clients':
        return <ClientsManager />;
      case 'services':
        return <ServicesManager />;
      case 'reports':
        return <ReportsManager />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f8f9fa' }}>
      <Sidebar 
        activeSection={activeSection} 
        setActiveSection={setActiveSection}
        onLogout={onLogout}
      />
      <div style={{ 
        marginLeft: '280px', 
        flex: 1,
        overflowY: 'auto'
      }}>
        {renderContent()}
      </div>
    </div>
  );
};
export default Dashboard;