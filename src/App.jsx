import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/Home/HomePage';
import About from './components/Home/About';
import BeautySalonDashboard from './components/admin/BeautySalonDashboard/BeautySalonDashboard';
import InstallPWA from './components/InstallPWA/InstallPWA';
import InstallPWAiOS from './components/InstallPWA/InstallPWAiOS';
import { NotificationsProvider } from './contexts/NotificationsContext';
import { InvoicesProvider } from './contexts/InvoicesContext';

function App() {
  return (
    <NotificationsProvider>
      <InvoicesProvider>
        <Router>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/admin" element={<BeautySalonDashboard />} />
          </Routes>
          <InstallPWA />
          <InstallPWAiOS />
        </Router>
      </InvoicesProvider>
    </NotificationsProvider>
  );
}

export default App;
