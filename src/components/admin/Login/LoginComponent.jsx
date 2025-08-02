import { useState } from 'react';

// Componente de Login
const LoginComponent = ({ onLogin }) => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (credentials.username === 'admin' && credentials.password === 'admin') {
      onLogin();
      setError('');
    } else {
      setError('Usuario o contraseña incorrectos');
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #ff6b9d 0%, #ff8fab 50%, #ffd6e8 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div style={{
        background: 'white',
        borderRadius: '20px',
        padding: '40px',
        width: '100%',
        maxWidth: '400px',
        boxShadow: '0 20px 40px rgba(255, 107, 157, 0.2)',
        textAlign: 'center'
      }}>
        <div style={{ marginBottom: '30px' }}>
          <div style={{ fontSize: '3rem', marginBottom: '10px' }}>🌸</div>
          <h1 style={{ 
            color: '#ff6b9d', 
            fontSize: '24px', 
            fontWeight: 'bold',
            marginBottom: '8px'
          }}>
            Panel de Administración
          </h1>
          <p style={{ color: '#666', fontSize: '14px' }}>En Maranatha - Salón de Belleza</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <input
              type="text"
              placeholder="Usuario"
              value={credentials.username}
              onChange={(e) => setCredentials(prev => ({ ...prev, username: e.target.value }))}
              style={{
                width: '100%',
                padding: '15px 20px',
                border: '2px solid #f0f0f0',
                borderRadius: '50px',
                fontSize: '16px',
                outline: 'none',
                transition: 'all 0.3s ease',
                background: '#f9f9f9'
              }}
              onFocus={(e) => e.target.style.borderColor = '#ff6b9d'}
              onBlur={(e) => e.target.style.borderColor = '#f0f0f0'}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleLogin(e);
                }
              }}
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Contraseña"
              value={credentials.password}
              onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
              style={{
                width: '100%',
                padding: '15px 20px',
                border: '2px solid #f0f0f0',
                borderRadius: '50px',
                fontSize: '16px',
                outline: 'none',
                transition: 'all 0.3s ease',
                background: '#f9f9f9'
              }}
              onFocus={(e) => e.target.style.borderColor = '#ff6b9d'}
              onBlur={(e) => e.target.style.borderColor = '#f0f0f0'}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleLogin(e);
                }
              }}
            />
          </div>
          {error && (
            <div style={{ 
              color: '#ff4444', 
              fontSize: '14px',
              padding: '10px',
              background: '#fff0f0',
              borderRadius: '10px',
              border: '1px solid #ffdddd'
            }}>
              {error}
            </div>
          )}
          <button
            onClick={handleLogin}
            style={{
              background: 'linear-gradient(135deg, #ff6b9d, #ff8fab)',
              color: 'white',
              padding: '15px 30px',
              borderRadius: '50px',
              border: 'none',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 5px 20px rgba(255, 107, 157, 0.3)'
            }}
            onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
            onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
          >
            Iniciar Sesión
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;