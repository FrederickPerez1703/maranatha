import { useState } from 'react';
import LoginComponent from '../Login/LoginComponent';
import Dashboard from '../Dashboard/Dashboard';

// Componente principal
export default function BeautySalonDashboard() {
  const [user, setUser] = useState(null); // <- ahora guardamos el usuario completo con roles

  const handleLogin = (userData) => {
    console.log(userData);
    setUser(userData); // userData viene de LoginComponent
  };

  const handleLogout = () => {
    setUser(null);
  };

  if (!user) {
    return <LoginComponent onLogin={handleLogin} />;
  }

  return <Dashboard onLogout={handleLogout} user={user} />;
}