import { useState, useEffect } from 'react';
import LoginComponent from '../Login/LoginComponent';
import Dashboard from '../Dashboard/Dashboard';

// Componente principal
export default function BeautySalonDashboard() {
  const [user, setUser] = useState(null);

  // Cargar sesión desde localStorage al montar el componente
  useEffect(() => {
    const savedUser = localStorage.getItem('adminUser');
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        setUser(userData);
      } catch (error) {
        console.error('Error al cargar sesión:', error);
        localStorage.removeItem('adminUser');
      }
    }
  }, []);

  const handleLogin = (userData) => {
    console.log(userData);
    setUser(userData);
    // Guardar sesión en localStorage
    localStorage.setItem('adminUser', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    // Eliminar sesión de localStorage
    localStorage.removeItem('adminUser');
  };

  if (!user) {
    return <LoginComponent onLogin={handleLogin} />;
  }

  return <Dashboard onLogout={handleLogout} user={user} />;
}