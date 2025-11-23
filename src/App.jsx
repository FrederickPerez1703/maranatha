import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/home/LandingPage';
import Dashboard from './components/admin/Dashboard/Dashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/admin" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
