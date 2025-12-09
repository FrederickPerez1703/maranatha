import { useState, useMemo } from 'react';
import { useInvoices } from '../../../contexts/InvoicesContext';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

// Componente de Reportes
const ReportsManager = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('week');
  const [selectedReport, setSelectedReport] = useState('revenue');

  // Obtener facturas del contexto
  const { invoices } = useInvoices();

  // Calcular datos reales basados en las facturas
  const reportsData = useMemo(() => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    // Filtrar facturas pagadas
    const paidInvoices = invoices.filter(inv => inv.status === 'paid');

    // Agrupar por período
    const weeklyData = {};
    const monthlyData = {};
    const quarterlyData = {};
    const yearlyData = {};

    paidInvoices.forEach(invoice => {
      const invoiceDate = new Date(invoice.date);
      const month = invoiceDate.getMonth();
      const year = invoiceDate.getFullYear();
      const quarter = Math.floor(month / 3);

      // Datos semanales (última semana - últimos 7 días)
      const daysDiff = Math.floor((now - invoiceDate) / (1000 * 60 * 60 * 24));
      if (daysDiff >= 0 && daysDiff < 7) {
        const dayNames = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
        const dayKey = dayNames[invoiceDate.getDay()];
        if (!weeklyData[dayKey]) {
          weeklyData[dayKey] = { value: 0, appointments: 0 };
        }
        weeklyData[dayKey].value += invoice.total;
        weeklyData[dayKey].appointments += 1;
      }

      // Datos mensuales (últimas 4 semanas del mes actual)
      if (month === currentMonth && year === currentYear) {
        const weekOfMonth = Math.floor(invoiceDate.getDate() / 7);
        const weekKey = `Semana ${weekOfMonth + 1}`;
        if (!monthlyData[weekKey]) {
          monthlyData[weekKey] = { value: 0, appointments: 0 };
        }
        monthlyData[weekKey].value += invoice.total;
        monthlyData[weekKey].appointments += 1;
      }

      // Datos trimestrales (últimos 3 meses)
      if (year === currentYear && quarter === Math.floor(currentMonth / 3)) {
        const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
          'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
        const monthKey = monthNames[month];
        if (!quarterlyData[monthKey]) {
          quarterlyData[monthKey] = { value: 0, appointments: 0 };
        }
        quarterlyData[monthKey].value += invoice.total;
        quarterlyData[monthKey].appointments += 1;
      }

      // Datos anuales
      const yearKey = year.toString();
      if (!yearlyData[yearKey]) {
        yearlyData[yearKey] = { value: 0, appointments: 0 };
      }
      yearlyData[yearKey].value += invoice.total;
      yearlyData[yearKey].appointments += 1;
    });

    // Convertir a arrays
    const weekArray = Object.entries(weeklyData).map(([period, data]) => ({
      period,
      value: data.value,
      appointments: data.appointments
    }));

    const monthArray = Object.entries(monthlyData).map(([period, data]) => ({
      period,
      value: data.value,
      appointments: data.appointments
    }));

    const quarterArray = Object.entries(quarterlyData).map(([period, data]) => ({
      period,
      value: data.value,
      appointments: data.appointments
    }));

    const yearArray = Object.entries(yearlyData).map(([period, data]) => ({
      period,
      value: data.value,
      appointments: data.appointments
    }));

    // Calcular servicios más populares
    const servicesMap = {};
    paidInvoices.forEach(invoice => {
      invoice.services.forEach(service => {
        if (!servicesMap[service.name]) {
          servicesMap[service.name] = { count: 0, revenue: 0 };
        }
        servicesMap[service.name].count += service.quantity;
        servicesMap[service.name].revenue += service.price * service.quantity;
      });
    });

    const totalRevenue = Object.values(servicesMap).reduce((sum, s) => sum + s.revenue, 0);
    const servicesArray = Object.entries(servicesMap)
      .map(([name, data]) => ({
        service: name,
        count: data.count,
        revenue: data.revenue,
        percentage: totalRevenue > 0 ? Math.round((data.revenue / totalRevenue) * 100) : 0
      }))
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 5);

    return {
      week: weekArray.length > 0 ? weekArray : [{ period: 'Sin datos', value: 0, appointments: 0 }],
      month: monthArray.length > 0 ? monthArray : [{ period: 'Sin datos', value: 0, appointments: 0 }],
      quarter: quarterArray.length > 0 ? quarterArray : [{ period: 'Sin datos', value: 0, appointments: 0 }],
      year: yearArray.length > 0 ? yearArray : [{ period: 'Sin datos', value: 0, appointments: 0 }],
      services: servicesArray.length > 0 ? servicesArray : [{ service: 'Sin datos', count: 0, revenue: 0, percentage: 0 }]
    };
  }, [invoices]);

  const getCurrentData = () => {
    return reportsData[selectedPeriod] || reportsData.week;
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

  // Función para exportar a PDF
  const exportToPDF = () => {
    try {
      const doc = new jsPDF();
      const pageWidth = doc.internal.pageSize.getWidth();

      // Título
      doc.setFontSize(20);
      doc.setTextColor(255, 107, 157);
      doc.text('Reporte de Ingresos - En Maranatha', pageWidth / 2, 20, { align: 'center' });

      // Fecha del reporte
      doc.setFontSize(10);
      doc.setTextColor(100);
      doc.text(`Generado: ${new Date().toLocaleDateString('es-ES')}`, pageWidth / 2, 28, { align: 'center' });

      // Período seleccionado
      const periodText = selectedPeriod === 'week' ? 'Esta Semana' :
        selectedPeriod === 'month' ? 'Este Mes' :
          selectedPeriod === 'quarter' ? 'Este Trimestre' : 'Este Año';
      doc.text(`Período: ${periodText}`, pageWidth / 2, 34, { align: 'center' });

      // Resumen Ejecutivo
      doc.setFontSize(14);
      doc.setTextColor(0);
      doc.text('Resumen Ejecutivo', 14, 45);

      doc.setFontSize(10);
      const summary = [
        ['Métrica', 'Valor'],
        ['Ingresos Totales', `$${getTotalRevenue().toLocaleString('es-ES', { minimumFractionDigits: 2 })}`],
        ['Total de Facturas', getTotalAppointments().toString()],
        ['Promedio por Factura', `$${getAveragePerAppointment()}`],
        ['Facturas Totales en Sistema', invoices.length.toString()],
        ['Facturas Pagadas', invoices.filter(inv => inv.status === 'paid').length.toString()],
        ['Facturas Pendientes', invoices.filter(inv => inv.status === 'pending').length.toString()]
      ];

      autoTable(doc, {
        startY: 50,
        head: [summary[0]],
        body: summary.slice(1),
        theme: 'grid',
        headStyles: { fillColor: [255, 107, 157], textColor: 255 },
        margin: { left: 14, right: 14 }
      });

      // Detalle de Ingresos por Período
      let currentY = doc.lastAutoTable.finalY + 10;
      doc.setFontSize(14);
      doc.text('Detalle de Ingresos por Período', 14, currentY);

      const periodData = getCurrentData().map(item => [
        item.period,
        item.appointments.toString(),
        `$${item.value.toLocaleString('es-ES', { minimumFractionDigits: 2 })}`
      ]);

      autoTable(doc, {
        startY: currentY + 5,
        head: [['Período', 'Facturas', 'Ingresos']],
        body: periodData,
        theme: 'striped',
        headStyles: { fillColor: [147, 51, 234], textColor: 255 },
        margin: { left: 14, right: 14 }
      });

      // Servicios Más Populares
      currentY = doc.lastAutoTable.finalY + 10;

      // Verificar si necesitamos una nueva página
      if (currentY > 250) {
        doc.addPage();
        currentY = 20;
      }

      doc.setFontSize(14);
      doc.text('Servicios Más Populares', 14, currentY);

      const servicesTableData = reportsData.services.map(service => [
        service.service,
        service.count.toString(),
        `$${service.revenue.toLocaleString('es-ES', { minimumFractionDigits: 2 })}`,
        `${service.percentage}%`
      ]);

      autoTable(doc, {
        startY: currentY + 5,
        head: [['Servicio', 'Cantidad', 'Ingresos', 'Porcentaje']],
        body: servicesTableData,
        theme: 'striped',
        headStyles: { fillColor: [16, 185, 129], textColor: 255 },
        margin: { left: 14, right: 14 }
      });

      // Detalle de Todas las Facturas Pagadas
      currentY = doc.lastAutoTable.finalY + 10;

      // Nueva página para el detalle de facturas
      doc.addPage();
      doc.setFontSize(14);
      doc.text('Detalle de Facturas Pagadas', 14, 20);

      const paidInvoices = invoices.filter(inv => inv.status === 'paid');
      const invoicesTableData = paidInvoices.map(invoice => [
        invoice.id,
        new Date(invoice.date).toLocaleDateString('es-ES'),
        invoice.clientName,
        `$${invoice.total.toLocaleString('es-ES', { minimumFractionDigits: 2 })}`
      ]);

      autoTable(doc, {
        startY: 25,
        head: [['ID Factura', 'Fecha', 'Cliente', 'Total']],
        body: invoicesTableData.length > 0 ? invoicesTableData : [['No hay facturas pagadas', '', '', '']],
        theme: 'grid',
        headStyles: { fillColor: [255, 107, 157], textColor: 255 },
        margin: { left: 14, right: 14 },
        styles: { fontSize: 8 }
      });

      // Footer en todas las páginas
      const pageCount = doc.internal.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(8);
        doc.setTextColor(150);
        doc.text(
          `Página ${i} de ${pageCount}`,
          pageWidth / 2,
          doc.internal.pageSize.getHeight() - 10,
          { align: 'center' }
        );
        doc.text(
          '© 2024 En Maranatha - Reporte Confidencial',
          pageWidth / 2,
          doc.internal.pageSize.getHeight() - 5,
          { align: 'center' }
        );
      }

      // Guardar el PDF
      const fileName = `Reporte_EnMaranatha_${periodText.replace(' ', '_')}_${new Date().toISOString().split('T')[0]}.pdf`;
      doc.save(fileName);

      console.log('PDF generado exitosamente');
    } catch (error) {
      console.error('Error al generar PDF:', error);
      alert('Error al generar el PDF. Por favor, revisa la consola para más detalles.');
    }
  };

  const clientsData = [
    { segment: 'Clientes Únicos', count: new Set(invoices.map(inv => inv.clientName)).size, percentage: 100 }
  ];

  return (
    <div style={{ padding: '20px' }}>
      <div className="reports-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', flexWrap: 'wrap', gap: '15px' }}>
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
            <option value="week">Esta Semana</option>
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
          <div style={{ fontSize: '28px', fontWeight: 'bold' }}>${getTotalRevenue().toLocaleString('es-ES', { minimumFractionDigits: 2 })}</div>
          <div style={{ fontSize: '12px', opacity: 0.8, marginTop: '5px' }}>
            {selectedPeriod === 'week' ? 'Esta semana' : selectedPeriod === 'month' ? 'Este mes' : selectedPeriod === 'quarter' ? 'Este trimestre' : 'Este año'}
          </div>
        </div>

        <div style={{
          background: 'linear-gradient(135deg, #9333ea, #a855f7)',
          color: 'white',
          padding: '25px',
          borderRadius: '20px',
          boxShadow: '0 10px 30px rgba(147, 51, 234, 0.3)'
        }}>
          <div style={{ fontSize: '14px', opacity: 0.9, marginBottom: '5px' }}>Total Facturas</div>
          <div style={{ fontSize: '28px', fontWeight: 'bold' }}>{getTotalAppointments()}</div>
          <div style={{ fontSize: '12px', opacity: 0.8, marginTop: '5px' }}>Facturas pagadas</div>
        </div>

        <div style={{
          background: 'linear-gradient(135deg, #10b981, #34d399)',
          color: 'white',
          padding: '25px',
          borderRadius: '20px',
          boxShadow: '0 10px 30px rgba(16, 185, 129, 0.3)'
        }}>
          <div style={{ fontSize: '14px', opacity: 0.9, marginBottom: '5px' }}>Promedio por Factura</div>
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
          <div style={{ fontSize: '14px', opacity: 0.9, marginBottom: '5px' }}>Total en Sistema</div>
          <div style={{ fontSize: '28px', fontWeight: 'bold' }}>{invoices.length}</div>
          <div style={{ fontSize: '12px', opacity: 0.8, marginTop: '5px' }}>Todas las facturas</div>
        </div>
      </div>

      <div className="reports-grid" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '30px' }}>
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
            {selectedReport === 'clients' && 'Información de Clientes'}
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
                      <div style={{ fontSize: '14px', color: '#666' }}>{item.appointments} facturas</div>
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
                      <div style={{ fontWeight: 'bold', color: '#ff6b9d', minWidth: '100px', textAlign: 'right' }}>
                        ${item.value.toLocaleString('es-ES', { minimumFractionDigits: 2 })}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {selectedReport === 'services' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {reportsData.services.map((service, index) => (
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
                      {service.count} servicios • ${service.revenue.toLocaleString('es-ES', { minimumFractionDigits: 2 })}
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
                    background: `conic-gradient(#ff6b9d ${segment.percentage * 3.6}deg, #f0f0f0 0deg)`,
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
                      color: '#ff6b9d'
                    }}>
                      {segment.count}
                    </div>
                  </div>
                  <div style={{ fontWeight: 'bold', color: '#333', marginBottom: '5px' }}>
                    {segment.segment}
                  </div>
                  <div style={{ fontSize: '14px', color: '#666' }}>
                    Total de clientes únicos
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
                <div style={{ fontSize: '20px' }}>💰</div>
                <div style={{ fontWeight: 'bold', color: '#10b981' }}>Ingresos Reales</div>
              </div>
              <div style={{ fontSize: '14px', color: '#666' }}>
                Los datos mostrados provienen de facturas reales pagadas en el sistema.
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
                {reportsData.services[0]?.service || 'Sin datos'} es el servicio más solicitado.
              </div>
            </div>

            <div style={{
              padding: '15px',
              background: 'linear-gradient(135deg, #9333ea15, #a855f715)',
              borderRadius: '15px',
              border: '1px solid #9333ea30'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                <div style={{ fontSize: '20px' }}>📊</div>
                <div style={{ fontWeight: 'bold', color: '#9333ea' }}>Estado de Facturas</div>
              </div>
              <div style={{ fontSize: '14px', color: '#666' }}>
                {invoices.filter(inv => inv.status === 'paid').length} pagadas de {invoices.length} totales.
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
                <div style={{ fontWeight: 'bold', color: '#f59e0b' }}>Datos en Tiempo Real</div>
              </div>
              <div style={{ fontSize: '14px', color: '#666' }}>
                Los reportes se actualizan automáticamente con cada nueva factura.
              </div>
            </div>
          </div>

          {/* Botón de exportar */}
          <button
            onClick={exportToPDF}
            style={{
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