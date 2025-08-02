import { useState } from 'react';
import LoginComponent from '../Login/LoginComponent';
import Dashboard from '../Dashboard/Dashboard';

// Componente principal
export default function BeautySalonDashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  if (!isLoggedIn) {
    return <LoginComponent onLogin={handleLogin} />;
  }

  return <Dashboard onLogout={handleLogout} />;
}