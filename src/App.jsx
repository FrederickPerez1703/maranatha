import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/Home/HomePage';
import BeautySalonDashboard from './components/admin/BeautySalonDashboard/BeautySalonDashboard';
import InstallPWA from './components/InstallPWA/InstallPWA';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/admin" element={<BeautySalonDashboard />} />
      </Routes>
      <InstallPWA />
    </Router>
  );
}

export default App;
