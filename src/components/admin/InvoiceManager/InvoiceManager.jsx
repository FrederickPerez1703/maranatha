import { useState } from 'react';
import { Printer, Calendar, User, Search, Plus, X, Edit2 } from 'lucide-react';
import servicesData from '../../../data/servicesData';

const InvoiceManager = () => {
    // Extract only service names since prices are now manually entered
    const allServices = Object.values(servicesData.es).flatMap(category =>
        category.services.map(service => service.name)
    );

    const [invoices, setInvoices] = useState([
        {
            id: 'INV-001',
            date: '2024-01-15',
            clientName: 'María García',
            services: [
                { name: 'Manicura Francesa', price: 30, quantity: 1 },
                { name: 'Pedicura Spa', price: 40, quantity: 1 }
            ],
            subtotal: 70,
            tax: 11.9,
            total: 81.9,
            status: 'paid'
        }
    ]);

    const [showModal, setShowModal] = useState(false);
    const [editingInvoice, setEditingInvoice] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [formData, setFormData] = useState({
        clientName: '',
        services: []
    });
    const [selectedService, setSelectedService] = useState('');
    const [serviceQuantity, setServiceQuantity] = useState(1);
    const [servicePrice, setServicePrice] = useState('');

    const handlePrint = (invoice) => {
        const printWindow = window.open('', '', 'height=1000,width=800');
        printWindow.document.write(`
      <html>
        <head>
          <title>Factura ${invoice.id}</title>
          <style>
            @page { size: 80mm auto; margin: 0; }
            body { 
              font-family: 'Courier New', monospace; 
              font-size: 15px; 
              line-height: 1.5; 
              color: #000; 
              margin: 0; 
              padding: 8mm; 
              width: 80mm; 
              background: white;
            }
            .center { text-align: center; }
            .bold { font-weight: bold; }
            .dashed { 
              border-bottom: 2px dashed #000; 
              padding-bottom: 12px; 
              margin-bottom: 16px; 
            }
            .solid { border-bottom: 1px solid #000; }
            .flex { 
              display: flex; 
              justify-content: space-between; 
              margin-bottom: 6px; 
            }
            .section { margin-bottom: 18px; }
            .service-item { margin-bottom: 10px; }
            .total-line { 
              border-top: 2px solid #000; 
              padding-top: 8px; 
              margin-top: 8px; 
              font-size: 17px; 
            }
          </style>
        </head>
        <body>
          <div class="center dashed">
            <div style="font-size: 24px; font-weight: bold; margin-bottom: 8px;">🌸 EN MARANATHA 🌸</div>
            <div style="font-size: 14px; font-weight: bold;">Salón de Belleza</div>
            <div style="font-size: 13px; margin-top: 5px;">Santo Domingo Este, RD</div>
            <div style="font-size: 13px;">Tel: (809) 264-5832</div>
          </div>
          <div class="section" style="font-size: 14px;">
            <div class="flex"><span>FACTURA:</span><strong>${invoice.id}</strong></div>
            <div class="flex"><span>FECHA:</span><span>${new Date(invoice.date).toLocaleDateString('es-ES')}</span></div>
            <div class="flex"><span>HORA:</span><span>${new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}</span></div>
          </div>
          <div class="section dashed" style="font-size: 14px;">
            <div style="margin-bottom: 5px;"><strong>CLIENTE:</strong> ${invoice.clientName}</div>
          </div>
          <div class="section">
            <div class="bold" style="margin-bottom: 10px; font-size: 14px;">SERVICIOS:</div>
            <div class="solid" style="margin-bottom: 8px;"></div>
            ${invoice.services.map(service => `
              <div class="service-item">
                <div class="flex" style="font-size: 14px;">
                  <span>${service.name}</span>
                  <span>$${service.price.toFixed(2)}</span>
                </div>
                <div class="flex" style="font-size: 13px; color: #666; padding-left: 12px;">
                  <span>${service.quantity} x $${service.price.toFixed(2)}</span>
                  <strong>$${(service.price * service.quantity).toFixed(2)}</strong>
                </div>
              </div>
            `).join('')}
            <div class="solid" style="margin-top: 10px;"></div>
          </div>
          <div class="section" style="font-size: 14px;">
            <div class="flex" style="margin-bottom: 6px;">
              <span>SUBTOTAL:</span>
              <span>$${invoice.subtotal.toFixed(2)}</span>
            </div>
            <div class="flex" style="margin-bottom: 6px;">
              <span>ITBIS (17%):</span>
              <span>$${invoice.tax.toFixed(2)}</span>
            </div>
            <div class="total-line">
              <div class="flex bold">
                <span>TOTAL:</span>
                <span>$${invoice.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
          <div class="center section" style="font-size: 14px;">
            <div style="display: inline-block; padding: 6px 14px; border: 2px solid #000; font-weight: bold;">
              ${invoice.status === 'paid' ? 'PAGADO' : 'PENDIENTE'}
            </div>
          </div>
          <div class="center dashed" style="font-size: 12px; padding-top: 12px;">
            <div style="margin-bottom: 6px; font-weight: bold;">¡GRACIAS POR SU PREFERENCIA!</div>
            <div style="margin-bottom: 4px;">www.enmaranatha.com</div>
            <div>info@enmaranatha.com</div>
          </div>
          <script>
            window.onload = function() {
              window.print();
              window.onafterprint = function() { window.close(); };
            };
          </script>
        </body>
      </html>
    `);
        printWindow.document.close();
    };

    const toggleInvoiceStatus = (invoiceId) => {
        setInvoices(invoices.map(inv =>
            inv.id === invoiceId ? { ...inv, status: inv.status === 'paid' ? 'pending' : 'paid' } : inv
        ));
    };

    const openEditModal = (invoice) => {
        setEditingInvoice(invoice);
        setFormData({
            clientName: invoice.clientName,
            services: [...invoice.services]
        });
        setShowModal(true);
    };

    const openCreateModal = () => {
        setEditingInvoice(null);
        setFormData({ clientName: '', services: [] });
        setShowModal(true);
    };

    const handleAddService = () => {
        if (!selectedService || !servicePrice) return;
        const price = parseFloat(servicePrice);
        if (isNaN(price) || price <= 0) return;

        const newService = {
            name: selectedService,
            price: price,
            quantity: serviceQuantity
        };

        const existingIndex = formData.services.findIndex(s => s.name === selectedService);
        if (existingIndex >= 0) {
            const updated = [...formData.services];
            updated[existingIndex].quantity += serviceQuantity;
            updated[existingIndex].price = price;
            setFormData({ ...formData, services: updated });
        } else {
            setFormData({ ...formData, services: [...formData.services, newService] });
        }
        setSelectedService('');
        setServicePrice('');
        setServiceQuantity(1);
    };

    const handleRemoveService = (index) => {
        setFormData({ ...formData, services: formData.services.filter((_, i) => i !== index) });
    };

    const calculateTotal = () => {
        const subtotal = formData.services.reduce((sum, s) => sum + s.price * s.quantity, 0);
        const tax = subtotal * 0.17;
        return { subtotal, tax, total: subtotal + tax };
    };

    const handleSave = () => {
        const { subtotal, tax, total } = calculateTotal();
        if (editingInvoice) {
            setInvoices(invoices.map(inv =>
                inv.id === editingInvoice.id
                    ? { ...inv, ...formData, subtotal, tax, total }
                    : inv
            ));
        } else {
            const newInvoice = {
                id: `INV-${String(invoices.length + 1).padStart(3, '0')}`,
                date: new Date().toISOString().split('T')[0],
                ...formData,
                subtotal,
                tax,
                total,
                status: 'pending'
            };
            setInvoices([newInvoice, ...invoices]);
        }
        setShowModal(false);
    };

    const filteredInvoices = invoices.filter(inv =>
        inv.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        inv.id.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div style={{ padding: '20px', maxWidth: '1400px', margin: '0 auto' }}>
            <style>{`
        @media (max-width: 768px) {
          .invoice-card { margin-bottom: 15px !important; }
          .invoice-header { flex-direction: column !important; align-items: flex-start !important; }
          .invoice-actions { flex-direction: column !important; width: 100% !important; }
          .invoice-actions button { width: 100% !important; }
          .modal-content { width: 95% !important; max-height: 95vh !important; }
          .form-grid { grid-template-columns: 1fr !important; }
          .service-grid { grid-template-columns: 1fr 1fr 1fr auto !important; }
        }
      `}</style>

            <div style={{ marginBottom: '30px' }}>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px', gap: '15px', flexWrap: 'wrap' }}>
                    <div>
                        <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#1f2937', margin: 0 }}>
                            💰 Gestión de Facturas
                        </h1>
                        <p style={{ color: '#6b7280', marginTop: '5px', margin: 0 }}>Crea, gestiona e imprime facturas</p>
                    </div>
                    <button
                        onClick={openCreateModal}
                        style={{
                            background: 'linear-gradient(135deg, #ff6b9d, #ff8fab)',
                            color: 'white',
                            border: 'none',
                            padding: '12px 24px',
                            borderRadius: '12px',
                            cursor: 'pointer',
                            fontWeight: 'bold',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            boxShadow: '0 4px 15px rgba(255, 107, 157, 0.3)',
                            transition: 'transform 0.2s'
                        }}
                        onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                        onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                    >
                        <Plus size={20} />
                        Nueva Factura
                    </button>
                </div>

                <div style={{ position: 'relative', maxWidth: '400px' }}>
                    <Search size={20} style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
                    <input
                        type="text"
                        placeholder="Buscar por cliente o número..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '12px 12px 12px 45px',
                            border: '2px solid #e5e7eb',
                            borderRadius: '12px',
                            fontSize: '14px',
                            outline: 'none'
                        }}
                        onFocus={(e) => e.target.style.borderColor = '#ff6b9d'}
                        onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                    />
                </div>
            </div>

            <div style={{ display: 'grid', gap: '20px' }}>
                {filteredInvoices.map((invoice) => (
                    <div
                        key={invoice.id}
                        className="invoice-card"
                        style={{
                            background: 'white',
                            borderRadius: '16px',
                            padding: '24px',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                            border: '2px solid #f3f4f6'
                        }}
                    >
                        <div className="invoice-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '20px', gap: '15px' }}>
                            <div style={{ flex: 1 }}>
                                <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1f2937', margin: '0 0 8px 0' }}>
                                    {invoice.id}
                                </h3>
                                <div style={{ display: 'flex', gap: '20px', fontSize: '14px', color: '#6b7280', flexWrap: 'wrap' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                        <Calendar size={16} />
                                        {new Date(invoice.date).toLocaleDateString('es-ES')}
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                        <User size={16} />
                                        {invoice.clientName}
                                    </div>
                                </div>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                                <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#ff6b9d' }}>
                                    ${invoice.total.toFixed(2)}
                                </div>
                                <button
                                    onClick={() => toggleInvoiceStatus(invoice.id)}
                                    style={{
                                        display: 'inline-block',
                                        padding: '4px 12px',
                                        borderRadius: '20px',
                                        fontSize: '12px',
                                        fontWeight: 'bold',
                                        background: invoice.status === 'paid' ? '#d1fae5' : '#fef3c7',
                                        color: invoice.status === 'paid' ? '#065f46' : '#92400e',
                                        marginTop: '8px',
                                        border: 'none',
                                        cursor: 'pointer'
                                    }}
                                >
                                    {invoice.status === 'paid' ? '✓ Pagado' : '⏱ Pendiente'}
                                </button>
                            </div>
                        </div>

                        <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '16px', marginBottom: '16px' }}>
                            <h4 style={{ fontSize: '14px', fontWeight: 'bold', color: '#374151', marginBottom: '12px' }}>Servicios:</h4>
                            {invoice.services.map((service, idx) => (
                                <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: '#6b7280', marginBottom: '8px' }}>
                                    <span>{service.quantity}x {service.name}</span>
                                    <span>${(service.price * service.quantity).toFixed(2)}</span>
                                </div>
                            ))}
                        </div>

                        <div className="invoice-actions" style={{ display: 'flex', gap: '12px' }}>
                            <button
                                onClick={() => openEditModal(invoice)}
                                style={{
                                    flex: 1,
                                    padding: '10px',
                                    border: '2px solid #3b82f6',
                                    background: 'white',
                                    color: '#3b82f6',
                                    borderRadius: '10px',
                                    cursor: 'pointer',
                                    fontWeight: 'bold',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '8px'
                                }}
                            >
                                <Edit2 size={18} />
                                Editar
                            </button>
                            <button
                                onClick={() => handlePrint(invoice)}
                                style={{
                                    flex: 1,
                                    padding: '10px',
                                    border: '2px solid #ff6b9d',
                                    background: 'white',
                                    color: '#ff6b9d',
                                    borderRadius: '10px',
                                    cursor: 'pointer',
                                    fontWeight: 'bold',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '8px'
                                }}
                            >
                                <Printer size={18} />
                                Imprimir
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {showModal && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(0,0,0,0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1000,
                    padding: '20px'
                }}>
                    <div className="modal-content" style={{
                        background: 'white',
                        borderRadius: '20px',
                        padding: '30px',
                        maxWidth: '800px',
                        width: '100%',
                        maxHeight: '90vh',
                        overflowY: 'auto'
                    }}>
                        <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px', color: '#1f2937' }}>
                            {editingInvoice ? 'Editar Factura' : 'Nueva Factura'}
                        </h2>

                        <div style={{ marginBottom: '20px' }}>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#374151' }}>
                                Nombre del Cliente *
                            </label>
                            <input
                                type="text"
                                value={formData.clientName}
                                onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                                style={{
                                    width: '100%',
                                    padding: '12px',
                                    border: '2px solid #e5e7eb',
                                    borderRadius: '10px',
                                    fontSize: '14px',
                                    outline: 'none',
                                    boxSizing: 'border-box'
                                }}
                            />
                        </div>

                        <div style={{ marginBottom: '20px' }}>
                            <label style={{ display: 'block', marginBottom: '12px', fontWeight: '500', color: '#374151' }}>Servicios *</label>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '12px' }}>
                                <select
                                    value={selectedService}
                                    onChange={(e) => setSelectedService(e.target.value)}
                                    style={{
                                        flex: '1 1 100%',
                                        minWidth: '200px',
                                        padding: '10px',
                                        border: '2px solid #e5e7eb',
                                        borderRadius: '8px',
                                        fontSize: '14px',
                                        outline: 'none',
                                        background: 'white',
                                        boxSizing: 'border-box'
                                    }}
                                >
                                    <option value="">Servicio...</option>
                                    {allServices.map((serviceName, idx) => (
                                        <option key={idx} value={serviceName}>{serviceName}</option>
                                    ))}
                                </select>
                                <input
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    placeholder="Precio"
                                    value={servicePrice}
                                    onChange={(e) => setServicePrice(e.target.value)}
                                    style={{
                                        flex: '1 1 calc(50% - 4px)',
                                        minWidth: '120px',
                                        padding: '10px',
                                        border: '2px solid #e5e7eb',
                                        borderRadius: '8px',
                                        fontSize: '14px',
                                        outline: 'none',
                                        boxSizing: 'border-box'
                                    }}
                                />
                                <input
                                    type="number"
                                    min="1"
                                    placeholder="Cant."
                                    value={serviceQuantity}
                                    onChange={(e) => setServiceQuantity(parseInt(e.target.value) || 1)}
                                    style={{
                                        flex: '1 1 calc(50% - 4px)',
                                        minWidth: '100px',
                                        padding: '10px',
                                        border: '2px solid #e5e7eb',
                                        borderRadius: '8px',
                                        fontSize: '14px',
                                        outline: 'none',
                                        boxSizing: 'border-box'
                                    }}
                                />
                                <button
                                    onClick={handleAddService}
                                    disabled={!selectedService || !servicePrice}
                                    style={{
                                        flex: '1 1 100%',
                                        padding: '10px 16px',
                                        background: (selectedService && servicePrice) ? 'linear-gradient(135deg, #ff6b9d, #ff8fab)' : '#e5e7eb',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '8px',
                                        cursor: (selectedService && servicePrice) ? 'pointer' : 'not-allowed',
                                        fontWeight: 'bold'
                                    }}
                                >
                                    Agregar Servicio
                                </button>
                            </div>

                            {formData.services.length > 0 && (
                                <div style={{ background: '#f9fafb', padding: '12px', borderRadius: '8px' }}>
                                    {formData.services.map((service, index) => (
                                        <div key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: index < formData.services.length - 1 ? '1px solid #e5e7eb' : 'none' }}>
                                            <span style={{ fontSize: '14px' }}>{service.quantity}x {service.name}</span>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                                <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#ff6b9d' }}>
                                                    ${(service.price * service.quantity).toFixed(2)}
                                                </span>
                                                <button
                                                    onClick={() => handleRemoveService(index)}
                                                    style={{
                                                        background: '#fee2e2',
                                                        color: '#dc2626',
                                                        border: 'none',
                                                        borderRadius: '6px',
                                                        width: '24px',
                                                        height: '24px',
                                                        cursor: 'pointer',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center'
                                                    }}
                                                >
                                                    <X size={14} />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div style={{ background: '#f9fafb', padding: '16px', borderRadius: '12px', marginBottom: '20px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '14px' }}>
                                <span>Subtotal:</span>
                                <span>${calculateTotal().subtotal.toFixed(2)}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '14px', color: '#6b7280' }}>
                                <span>ITBIS (17%):</span>
                                <span>${calculateTotal().tax.toFixed(2)}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '18px', fontWeight: 'bold', color: '#ff6b9d', paddingTop: '8px', borderTop: '2px solid #e5e7eb' }}>
                                <span>Total:</span>
                                <span>${calculateTotal().total.toFixed(2)}</span>
                            </div>
                        </div>

                        <div style={{ display: 'flex', gap: '12px' }}>
                            <button
                                onClick={() => setShowModal(false)}
                                style={{
                                    flex: 1,
                                    padding: '12px',
                                    background: '#f3f4f6',
                                    color: '#374151',
                                    border: 'none',
                                    borderRadius: '10px',
                                    cursor: 'pointer',
                                    fontWeight: 'bold'
                                }}
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={handleSave}
                                disabled={!formData.clientName || formData.services.length === 0}
                                style={{
                                    flex: 1,
                                    padding: '12px',
                                    background: 'linear-gradient(135deg, #ff6b9d, #ff8fab)',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '10px',
                                    cursor: 'pointer',
                                    fontWeight: 'bold',
                                    opacity: (!formData.clientName || formData.services.length === 0) ? 0.5 : 1
                                }}
                            >
                                {editingInvoice ? 'Guardar Cambios' : 'Crear Factura'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default InvoiceManager;
