import React, { useState } from 'react';

// Componente de Reportes
const ReportsManager = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedReport, setSelectedReport] = useState('revenue');

  // Datos simulados para los reportes
  const revenueData = {
    month: [
      { period: 'Semana 1', value: 850, appointments: 28 },
      { period: 'Semana 2', value: 920, appointments: 31 },
      { period: 'Semana 3', value: 780, appointments: 25 },
      { period: 'Semana 4', value: 695, appointments: 22 }
    ],
    quarter: [
      { period: 'Enero', value: 3245, appointments: 106 },
      { period: 'Febrero', value: 2980, appointments: 98 },
      { period: 'Marzo', value: 3456, appointments: 112 }
    ],
    year: [
      { period: '2023', value: 35600, appointments: 1200 },
      { period: '2024', value: 42300, appointments: 1450 }
    ]
  };

  const servicesData = [
    { service: 'Manicura & Pedicura', count: 45, revenue: 1350, percentage: 35 },
    { service: 'Corte de Cabello', count: 38, revenue: 1140, percentage: 29 },
    { service: 'Tratamientos Faciales', count: 22, revenue: 1210, percentage: 18 },
    { service: 'Maquillaje', count: 15, revenue: 750, percentage: 12 },
    { service: 'Otros', count: 8, revenue: 295, percentage: 6 }
  ];

  const clientsData = [
    { segment: 'Clientes Nuevos', count: 23, percentage: 35 },
    { segment: 'Clientes Recurrentes', count: 42, percentage: 65 }
  ];

  const getCurrentData = () => {
    return revenueData[selectedPeriod] || revenueData.month;
  };

  const getTotalRevenue = () => {
    return getCurrentData().reduce((sum, item) => sum + item.value, 0);
  };

  const getTotalAppointments = () => {
    return getCurrentData().reduce((sum, item) => sum + item.appointments, 0);
  };

  const getAveragePerAppointment = () => {
    const total = getTotalRevenue();
    const appointments = getTotalAppointments();
    return appointments > 0 ? (total / appointments).toFixed(2) : 0;
  };

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h2 style={{ color: '#ff6b9d', fontSize: '28px', margin: 0 }}>Reportes y Análisis</h2>
        <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            style={{
              padding: '10px 15px',
              borderRadius: '10px',
              border: '2px solid #f0f0f0',
              background: 'white',
              fontSize: '14px',
              outline: 'none'
            }}
          >
            <option value="month">Este Mes</option>
            <option value="quarter">Trimestre</option>
            <option value="year">Año</option>
          </select>
          <select
            value={selectedReport}
            onChange={(e) => setSelectedReport(e.target.value)}
            style={{
              padding: '10px 15px',
              borderRadius: '10px',
              border: '2px solid #f0f0f0',
              background: 'white',
              fontSize: '14px',
              outline: 'none'
            }}
          >
            <option value="revenue">Ingresos</option>
            <option value="services">Servicios</option>
            <option value="clients">Clientes</option>
          </select>
        </div>
      </div>

      {/* Resumen Ejecutivo */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
        gap: '20px',
        marginBottom: '40px'
      }}>
        <div style={{
          background: 'linear-gradient(135deg, #ff6b9d, #ff8fab)',
          color: 'white',
          padding: '25px',
          borderRadius: '20px',
          boxShadow: '0 10px 30px rgba(255, 107, 157, 0.3)'
        }}>
          <div style={{ fontSize: '14px', opacity: 0.9, marginBottom: '5px' }}>Ingresos Totales</div>
          <div style={{ fontSize: '28px', fontWeight: 'bold' }}>${getTotalRevenue().toLocaleString()}</div>
          <div style={{ fontSize: '12px', opacity: 0.8, marginTop: '5px' }}>
            {selectedPeriod === 'month' ? 'Este mes' : selectedPeriod === 'quarter' ? 'Este trimestre' : 'Este año'}
          </div>
        </div>

        <div style={{
          background: 'linear-gradient(135deg, #9333ea, #a855f7)',
          color: 'white',
          padding: '25px',
          borderRadius: '20px',
          boxShadow: '0 10px 30px rgba(147, 51, 234, 0.3)'
        }}>
          <div style={{ fontSize: '14px', opacity: 0.9, marginBottom: '5px' }}>Total Citas</div>
          <div style={{ fontSize: '28px', fontWeight: 'bold' }}>{getTotalAppointments()}</div>
          <div style={{ fontSize: '12px', opacity: 0.8, marginTop: '5px' }}>Citas completadas</div>
        </div>

        <div style={{
          background: 'linear-gradient(135deg, #10b981, #34d399)',
          color: 'white',
          padding: '25px',
          borderRadius: '20px',
          boxShadow: '0 10px 30px rgba(16, 185, 129, 0.3)'
        }}>
          <div style={{ fontSize: '14px', opacity: 0.9, marginBottom: '5px' }}>Promedio por Cita</div>
          <div style={{ fontSize: '28px', fontWeight: 'bold' }}>${getAveragePerAppointment()}</div>
          <div style={{ fontSize: '12px', opacity: 0.8, marginTop: '5px' }}>Valor promedio</div>
        </div>

        <div style={{
          background: 'linear-gradient(135deg, #f59e0b, #fbbf24)',
          color: 'white',
          padding: '25px',
          borderRadius: '20px',
          boxShadow: '0 10px 30px rgba(245, 158, 11, 0.3)'
        }}>
          <div style={{ fontSize: '14px', opacity: 0.9, marginBottom: '5px' }}>Crecimiento</div>
          <div style={{ fontSize: '28px', fontWeight: 'bold' }}>+12.5%</div>
          <div style={{ fontSize: '12px', opacity: 0.8, marginTop: '5px' }}>vs período anterior</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '30px' }}>
        {/* Gráfico de Ingresos */}
        <div style={{
          background: 'white',
          borderRadius: '20px',
          padding: '25px',
          boxShadow: '0 10px 30px rgba(255, 107, 157, 0.1)'
        }}>
          <h3 style={{ color: '#ff6b9d', marginBottom: '20px' }}>
            {selectedReport === 'revenue' && 'Evolución de Ingresos'}
            {selectedReport === 'services' && 'Servicios Más Populares'}
            {selectedReport === 'clients' && 'Segmentación de Clientes'}
          </h3>
          
          {selectedReport === 'revenue' && (
            <div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                {getCurrentData().map((item, index) => (
                  <div key={index} style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '15px',
                    background: '#f8f9fa',
                    borderRadius: '15px'
                  }}>
                    <div>
                      <div style={{ fontWeight: 'bold', color: '#333' }}>{item.period}</div>
                      <div style={{ fontSize: '14px', color: '#666' }}>{item.appointments} citas</div>
                    </div>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '15px'
                    }}>
                      <div style={{
                        width: '150px',
                        height: '8px',
                        background: '#f0f0f0',
                        borderRadius: '4px',
                        overflow: 'hidden'
                      }}>
                        <div style={{
                          width: `${(item.value / Math.max(...getCurrentData().map(d => d.value))) * 100}%`,
                          height: '100%',
                          background: 'linear-gradient(90deg, #ff6b9d, #ff8fab)',
                          borderRadius: '4px'
                        }}></div>
                      </div>
                      <div style={{ fontWeight: 'bold', color: '#ff6b9d', minWidth: '80px', textAlign: 'right' }}>
                        ${item.value.toLocaleString()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {selectedReport === 'services' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {servicesData.map((service, index) => (
                <div key={index} style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '15px',
                  background: '#f8f9fa',
                  borderRadius: '15px'
                }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 'bold', color: '#333', marginBottom: '5px' }}>
                      {service.service}
                    </div>
                    <div style={{ fontSize: '14px', color: '#666' }}>
                      {service.count} servicios • ${service.revenue}
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <div style={{
                      width: '100px',
                      height: '8px',
                      background: '#f0f0f0',
                      borderRadius: '4px',
                      overflow: 'hidden'
                    }}>
                      <div style={{
                        width: `${service.percentage}%`,
                        height: '100%',
                        background: `hsl(${330 - index * 30}, 70%, 60%)`,
                        borderRadius: '4px'
                      }}></div>
                    </div>
                    <div style={{ fontWeight: 'bold', color: '#333', minWidth: '50px', textAlign: 'right' }}>
                      {service.percentage}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {selectedReport === 'clients' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {clientsData.map((segment, index) => (
                <div key={index} style={{
                  padding: '20px',
                  background: '#f8f9fa',
                  borderRadius: '15px',
                  textAlign: 'center'
                }}>
                  <div style={{
                    width: '120px',
                    height: '120px',
                    margin: '0 auto 15px auto',
                    borderRadius: '50%',
                    background: `conic-gradient(${index === 0 ? '#ff6b9d' : '#9333ea'} ${segment.percentage * 3.6}deg, #f0f0f0 0deg)`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative'
                  }}>
                    <div style={{
                      width: '80px',
                      height: '80px',
                      background: 'white',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '18px',
                      fontWeight: 'bold',
                      color: index === 0 ? '#ff6b9d' : '#9333ea'
                    }}>
                      {segment.percentage}%
                    </div>
                  </div>
                  <div style={{ fontWeight: 'bold', color: '#333', marginBottom: '5px' }}>
                    {segment.segment}
                  </div>
                  <div style={{ fontSize: '14px', color: '#666' }}>
                    {segment.count} clientes
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Panel Lateral de Insights */}
        <div style={{
          background: 'white',
          borderRadius: '20px',
          padding: '25px',
          boxShadow: '0 10px 30px rgba(255, 107, 157, 0.1)',
          height: 'fit-content'
        }}>
          <h3 style={{ color: '#ff6b9d', marginBottom: '20px' }}>Insights del Negocio</h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{
              padding: '15px',
              background: 'linear-gradient(135deg, #10b98115, #34d39915)',
              borderRadius: '15px',
              border: '1px solid #10b98130'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                <div style={{ fontSize: '20px' }}>📈</div>
                <div style={{ fontWeight: 'bold', color: '#10b981' }}>Tendencia Positiva</div>
              </div>
              <div style={{ fontSize: '14px', color: '#666' }}>
                Los ingresos han aumentado un 12.5% comparado con el período anterior.
              </div>
            </div>

            <div style={{
              padding: '15px',
              background: 'linear-gradient(135deg, #ff6b9d15, #ff8fab15)',
              borderRadius: '15px',
              border: '1px solid #ff6b9d30'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                <div style={{ fontSize: '20px' }}>💅</div>
                <div style={{ fontWeight: 'bold', color: '#ff6b9d' }}>Servicio Top</div>
              </div>
              <div style={{ fontSize: '14px', color: '#666' }}>
                Manicura & Pedicura representa el 35% de los ingresos totales.
              </div>
            </div>

            <div style={{
              padding: '15px',
              background: 'linear-gradient(135deg, #9333ea15, #a855f715)',
              borderRadius: '15px',
              border: '1px solid #9333ea30'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                <div style={{ fontSize: '20px' }}>👥</div>
                <div style={{ fontWeight: 'bold', color: '#9333ea' }}>Fidelización</div>
              </div>
              <div style={{ fontSize: '14px', color: '#666' }}>
                65% de tus clientes son recurrentes, indicando alta satisfacción.
              </div>
            </div>

            <div style={{
              padding: '15px',
              background: 'linear-gradient(135deg, #f59e0b15, #fbbf2415)',
              borderRadius: '15px',
              border: '1px solid #f59e0b30'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                <div style={{ fontSize: '20px' }}>💡</div>
                <div style={{ fontWeight: 'bold', color: '#f59e0b' }}>Recomendación</div>
              </div>
              <div style={{ fontSize: '14px', color: '#666' }}>
                Considera promocionar tratamientos faciales para aumentar su demanda.
              </div>
            </div>
          </div>

          {/* Botón de exportar */}
          <button style={{
            width: '100%',
            padding: '15px',
            marginTop: '20px',
            background: 'linear-gradient(135deg, #ff6b9d, #ff8fab)',
            color: 'white',
            border: 'none',
            borderRadius: '15px',
            fontSize: '14px',
            fontWeight: 'bold',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          }}
          onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
          onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}>
            📊 Exportar Reporte PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportsManager;