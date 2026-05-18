import { useState } from 'react';
import { Printer, Calendar, User, Search, Plus, X, Edit2, Trash2, History } from 'lucide-react';
import { useNotifications } from '../../../contexts/NotificationsContext';
import { useInvoices } from '../../../contexts/InvoicesContext';
import { useServices } from '../../../contexts/ServicesContext';
import Alert from '../../ui/Alert/Alert';
import ConfirmationModal from '../../ui/ConfirmationModal/ConfirmationModal';
import SendService from '../../../services/send/SendService';

const InvoiceManager = ({ user }) => {
    // Contexto de notificaciones
    const { requestDeletion, hasPendingDeletion, notifications, removeNotification } = useNotifications();
    // Contexto de facturas
    const { invoices, deletedInvoices, addInvoice, updateInvoice, toggleInvoiceStatus, resetTotal, weeklyPaidInvoices } = useInvoices();
    // Contexto de servicios
    const { getActiveServices } = useServices();

    const currentUser = user?.username || 'admin'; // Nombre del usuario actual
    const sendService = new SendService();

    // Obtener solo los nombres de servicios activos
    const allServices = getActiveServices().map(service => service.name);

    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showHistoryModal, setShowHistoryModal] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showWarningModal, setShowWarningModal] = useState(false);
    const [showResetModal, setShowResetModal] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [warningMessage, setWarningMessage] = useState('');
    const [invoiceToDelete, setInvoiceToDelete] = useState(null);
    const [deleteComment, setDeleteComment] = useState('');
    const [editingInvoice, setEditingInvoice] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [formData, setFormData] = useState({
        clientName: '',
        paymentMethod: 'Efectivo',
        services: []
    });
    const [selectedService, setSelectedService] = useState('');
    const [serviceQuantity, setServiceQuantity] = useState(1);
    const [servicePrice, setServicePrice] = useState('');

    const pendingInvoiceNotifications = notifications.filter(n => n.type === 'invoice_pending');

    const handleCreateFromNotification = (notification) => {
        const appointment = notification.data;
        // Intentar parsear el precio, eliminando símbolos no numéricos excepto punto
        const priceString = appointment.price ? appointment.price.toString().replace(/[^0-9.]/g, '') : '0';
        const price = parseFloat(priceString) || 0;

        setEditingInvoice(null);
        setFormData({
            clientName: appointment.client,
            paymentMethod: 'Efectivo',
            services: [{
                name: appointment.service,
                price: price,
                quantity: 1
            }]
        });
        setShowModal(true);
        removeNotification(notification.id);
    };

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
            <div class="total-line">
              <div class="flex bold">
                <span>TOTAL:</span>
                <span>$${invoice.total.toFixed(2)}</span>
              </div>
            </div>
            <div class="flex" style="margin-top: 8px; font-size: 13px; font-weight: bold;">
              <span>MÉTODO DE PAGO:</span>
              <span>${(invoice.paymentMethod || 'Efectivo').toUpperCase()}</span>
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

    const openEditModal = (invoice) => {
        setEditingInvoice(invoice);
        setFormData({
            clientName: invoice.clientName,
            paymentMethod: invoice.paymentMethod || 'Efectivo',
            services: [...invoice.services]
        });
        setShowModal(true);
    };

    const openCreateModal = () => {
        setEditingInvoice(null);
        setFormData({ clientName: '', paymentMethod: 'Efectivo', services: [] });
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

    const handleEditService = (index) => {
        const service = formData.services[index];
        setSelectedService(service.name);
        setServicePrice(service.price.toString());
        setServiceQuantity(service.quantity);
        setFormData({ ...formData, services: formData.services.filter((_, i) => i !== index) });
    };

    const calculateTotal = () => {
        const subtotal = formData.services.reduce((sum, s) => sum + s.price * s.quantity, 0);
        return { subtotal, total: subtotal };
    };

    const handleSave = () => {
        // Validación
        if (!formData.clientName || !formData.clientName.trim()) {
            alert('Por favor, ingresa el nombre del cliente');
            return;
        }

        if (!formData.services || formData.services.length === 0) {
            alert('Por favor, agrega al menos un servicio');
            return;
        }

        const { subtotal, total } = calculateTotal();

        if (editingInvoice) {
            updateInvoice({
                ...editingInvoice,
                ...formData,
                subtotal,
                total
            });
        } else {
            // Generar ID único basado en el ID más alto de activas e históricas
            const allExisting = [...invoices, ...deletedInvoices];
            const maxId = allExisting.reduce((max, inv) => {
                const num = parseInt(inv.id.replace('INV-', ''));
                return num > max ? num : max;
            }, 0);

            const newInvoice = {
                id: `INV-${String(maxId + 1).padStart(3, '0')}`,
                date: new Date().toISOString().split('T')[0],
                ...formData,
                subtotal,
                total,
                status: 'pending'
            };
            addInvoice(newInvoice);
        }
        setShowModal(false);
    };

    const openDeleteModal = (invoice) => {
        setInvoiceToDelete(invoice);
        setDeleteComment('');
        setShowDeleteModal(true);
    };

    const handleRequestDelete = () => {
        if (!deleteComment.trim()) {
            setWarningMessage('Por favor, ingresa un comentario explicando por qué eliminas esta factura');
            setShowWarningModal(true);
            return;
        }

        // Verificar si ya hay una solicitud pendiente
        if (hasPendingDeletion(invoiceToDelete.id)) {
            setWarningMessage('Ya existe una solicitud pendiente para eliminar esta factura. Espera la aprobación del administrador.');
            setShowWarningModal(true);
            setShowDeleteModal(false);
            setInvoiceToDelete(null);
            setDeleteComment('');
            return;
        }

        // Crear solicitud de eliminación
        requestDeletion(
            'invoice',
            invoiceToDelete.id,
            `Factura ${invoiceToDelete.id} - ${invoiceToDelete.clientName}`,
            currentUser,
            deleteComment.trim()
        );

        // Enviar notificación por WhatsApp
        sendService.sendDeletionRequestMessage({
            invoiceId: invoiceToDelete.id,
            requestedBy: currentUser,
            reason: deleteComment.trim(),
            amount: invoiceToDelete.total,
            clientName: invoiceToDelete.clientName
        });

        setSuccessMessage('Solicitud enviada al administrador. La factura se eliminará cuando sea aprobada.');
        setShowSuccessModal(true);

        // Cerrar modal
        setShowDeleteModal(false);
        setInvoiceToDelete(null);
        setDeleteComment('');
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
        
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.02);
          }
        }
      `}</style>

            <div style={{ marginBottom: '30px' }}>
                <div className="invoice-header" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px', gap: '15px', flexWrap: 'wrap' }}>
                    <div>
                        <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#1f2937', margin: 0 }}>
                            💰 Gestión de Facturas
                        </h1>
                        <p style={{ color: '#6b7280', marginTop: '5px', margin: 0 }}>Crea, gestiona e imprime facturas</p>

                        {/* Total General - Solo visible para admin */}
                        {currentUser === 'admin' && (
                            <div style={{
                                marginTop: '15px',
                                padding: '12px 20px',
                                background: 'linear-gradient(135deg, #10b981, #059669)',
                                borderRadius: '12px',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '15px',
                                boxShadow: '0 4px 15px rgba(16, 185, 129, 0.3)'
                            }}>
                                <div>
                                    <div style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '12px', fontWeight: '500', marginBottom: '4px' }}>
                                        Total Generado ({weeklyPaidInvoices.length} facturas pagadas)
                                    </div>
                                    <div style={{ color: 'white', fontSize: '24px', fontWeight: 'bold' }}>
                                        ${weeklyPaidInvoices.reduce((sum, inv) => sum + inv.total, 0).toFixed(2)}
                                    </div>
                                </div>
                                <button
                                    onClick={() => setShowResetModal(true)}
                                    style={{
                                        background: 'rgba(255, 255, 255, 0.2)',
                                        border: '1px solid rgba(255, 255, 255, 0.4)',
                                        color: 'white',
                                        padding: '8px 14px',
                                        borderRadius: '8px',
                                        cursor: 'pointer',
                                        fontSize: '12px',
                                        fontWeight: 'bold',
                                        transition: 'background 0.2s'
                                    }}
                                    onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.35)'}
                                    onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'}
                                    title="Reiniciar Total Manualmente"
                                >
                                    🔄 Reiniciar
                                </button>
                            </div>
                        )}
                    </div>
                    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                        <button
                            onClick={() => setShowHistoryModal(true)}
                            style={{
                                background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                                color: 'white',
                                border: 'none',
                                padding: '12px 24px',
                                borderRadius: '12px',
                                cursor: 'pointer',
                                fontWeight: 'bold',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                boxShadow: '0 4px 15px rgba(99, 102, 241, 0.3)',
                                transition: 'transform 0.2s'
                            }}
                            onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                            onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                        >
                            <History size={20} />
                            Historial ({deletedInvoices.length})
                        </button>
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


            {/* Notificaciones de Facturas Pendientes */}
            {
                pendingInvoiceNotifications.length > 0 && (
                    <div style={{ marginBottom: '30px', display: 'grid', gap: '15px' }}>
                        {pendingInvoiceNotifications.map(notification => (
                            <div key={notification.id} style={{
                                background: '#fff7ed',
                                border: '2px solid #f97316',
                                borderRadius: '12px',
                                padding: '15px',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                boxShadow: '0 4px 12px rgba(249, 115, 22, 0.1)'
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                    <div style={{
                                        background: '#f97316',
                                        color: 'white',
                                        padding: '10px',
                                        borderRadius: '50%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                        <Calendar size={20} />
                                    </div>
                                    <div>
                                        <h4 style={{ margin: '0 0 5px 0', color: '#9a3412', fontSize: '16px' }}>Factura Pendiente por Cita Confirmada</h4>
                                        <p style={{ margin: 0, color: '#c2410c', fontSize: '14px' }}>
                                            Cliente: <strong>{notification.data.client}</strong> - Servicio: <strong>{notification.data.service}</strong>
                                        </p>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', gap: '10px' }}>
                                    <button
                                        onClick={() => removeNotification(notification.id)}
                                        style={{
                                            padding: '8px 16px',
                                            background: 'transparent',
                                            border: '1px solid #f97316',
                                            color: '#f97316',
                                            borderRadius: '8px',
                                            cursor: 'pointer',
                                            fontWeight: 'bold'
                                        }}
                                    >
                                        Ignorar
                                    </button>
                                    <button
                                        onClick={() => handleCreateFromNotification(notification)}
                                        style={{
                                            padding: '8px 16px',
                                            background: '#f97316',
                                            border: 'none',
                                            color: 'white',
                                            borderRadius: '8px',
                                            cursor: 'pointer',
                                            fontWeight: 'bold',
                                            boxShadow: '0 2px 5px rgba(249, 115, 22, 0.3)'
                                        }}
                                    >
                                        Generar Factura
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )
            }

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
                                     <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                         <span style={{
                                             fontSize: '11px',
                                             padding: '3px 8px',
                                             borderRadius: '12px',
                                             background: '#f3f4f6',
                                             color: '#4b5563',
                                             fontWeight: '600',
                                             letterSpacing: '0.3px'
                                         }}>
                                             💵 {invoice.paymentMethod || 'Efectivo'}
                                         </span>
                                     </div>
                                </div>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                                <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#ff6b9d' }}>
                                    ${invoice.total.toFixed(2)}
                                </div>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        // Solo permitir cambio si no está pagado
                                        if (invoice.status !== 'paid') {
                                            toggleInvoiceStatus(invoice.id);
                                        }
                                    }}
                                    disabled={invoice.status === 'paid'}
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
                                        cursor: invoice.status === 'paid' ? 'not-allowed' : 'pointer',
                                        opacity: invoice.status === 'paid' ? 0.8 : 1
                                    }}
                                >
                                    {invoice.status === 'paid' ? '✓ Pagado' : '⏱ Pendiente'}
                                </button>

                                {/* Badge de solicitud pendiente */}
                                {hasPendingDeletion(invoice.id) && (
                                    <div style={{
                                        marginTop: '8px',
                                        padding: '6px 12px',
                                        borderRadius: '12px',
                                        background: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
                                        color: 'white',
                                        fontSize: '11px',
                                        fontWeight: 'bold',
                                        textAlign: 'center',
                                        boxShadow: '0 2px 8px rgba(251, 191, 36, 0.3)',
                                        animation: 'pulse 2s infinite'
                                    }}>
                                        ⏳ Pendiente de aprobación
                                    </div>
                                )}
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
                            <button
                                onClick={() => openDeleteModal(invoice)}
                                style={{
                                    flex: 1,
                                    padding: '10px',
                                    border: '2px solid #ef4444',
                                    background: 'white',
                                    color: '#ef4444',
                                    borderRadius: '10px',
                                    cursor: 'pointer',
                                    fontWeight: 'bold',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '8px'
                                }}
                            >
                                <Trash2 size={18} />
                                Eliminar
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {
                showModal && (
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
                        <div style={{
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
                                    Nombre del Personal *
                                </label>
                                <select
                                    value={formData.clientName}
                                    onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                                    style={{
                                        width: '100%',
                                        padding: '12px',
                                        border: '2px solid #e5e7eb',
                                        borderRadius: '10px',
                                        fontSize: '14px',
                                        outline: 'none',
                                        boxSizing: 'border-box',
                                        background: 'white',
                                        cursor: 'pointer'
                                    }}
                                >
                                    <option value="">Seleccionar personal...</option>
                                    <option value="Ana">Ana</option>
                                    <option value="Mariela">Mariela</option>
                                    <option value="Rubi">Rubi</option>
                                </select>
                            </div>

                            <div style={{ marginBottom: '20px' }}>
                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#374151' }}>
                                    Método de Pago *
                                </label>
                                <select
                                    value={formData.paymentMethod || 'Efectivo'}
                                    onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                                    style={{
                                        width: '100%',
                                        padding: '12px',
                                        border: '2px solid #e5e7eb',
                                        borderRadius: '10px',
                                        fontSize: '14px',
                                        outline: 'none',
                                        boxSizing: 'border-box',
                                        background: 'white',
                                        cursor: 'pointer'
                                    }}
                                >
                                    <option value="Efectivo">Efectivo</option>
                                    <option value="Transferencia">Transferencia</option>
                                </select>
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
                                    <div style={{
                                        position: 'relative',
                                        flex: '1 1 calc(50% - 4px)',
                                        minWidth: '120px'
                                    }}>
                                        <span style={{
                                            position: 'absolute',
                                            left: '12px',
                                            top: '50%',
                                            transform: 'translateY(-50%)',
                                            color: !selectedService ? '#9ca3af' : '#4b5563',
                                            fontWeight: 'bold',
                                            fontSize: '14px',
                                            pointerEvents: 'none'
                                        }}>
                                            $
                                        </span>
                                        <input
                                            type="text"
                                            inputMode="decimal"
                                            placeholder="Precio"
                                            value={servicePrice}
                                            disabled={!selectedService}
                                            onChange={(e) => {
                                                const val = e.target.value;
                                                if (val === '' || /^\d*\.?\d*$/.test(val)) {
                                                    setServicePrice(val);
                                                }
                                            }}
                                            style={{
                                                width: '100%',
                                                padding: '10px 10px 10px 24px',
                                                border: '2px solid #e5e7eb',
                                                borderRadius: '8px',
                                                fontSize: '14px',
                                                outline: 'none',
                                                boxSizing: 'border-box',
                                                background: !selectedService ? '#f3f4f6' : 'white',
                                                cursor: !selectedService ? 'not-allowed' : 'text',
                                                color: !selectedService ? '#9ca3af' : '#1f2937'
                                            }}
                                        />
                                    </div>
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
                                                <span style={{ fontSize: '14px', color: '#374151' }}>{service.quantity}x {service.name}</span>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                                    <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#ff6b9d' }}>
                                                        ${(service.price * service.quantity).toFixed(2)}
                                                    </span>
                                                    <button
                                                        type="button"
                                                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleEditService(index); }}
                                                        style={{
                                                            background: '#e0f2fe',
                                                            color: '#0284c7',
                                                            border: 'none',
                                                            borderRadius: '6px',
                                                            width: '24px',
                                                            height: '24px',
                                                            cursor: 'pointer',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center'
                                                        }}
                                                        title="Editar servicio"
                                                    >
                                                        <Edit2 size={14} />
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleRemoveService(index); }}
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
                                                        title="Eliminar servicio"
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
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '14px', color: '#374151' }}>
                                    <span>Subtotal:</span>
                                    <span>${calculateTotal().subtotal.toFixed(2)}</span>
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
                                    Guardar
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }

            {/* Modal de confirmación de eliminación */}
            {
                showDeleteModal && (
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
                        <div style={{
                            background: 'white',
                            borderRadius: '20px',
                            padding: '30px',
                            maxWidth: '400px',
                            width: '100%',
                            boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
                        }}>
                            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                                <div style={{
                                    width: '60px',
                                    height: '60px',
                                    borderRadius: '50%',
                                    background: '#fee2e2',
                                    color: '#dc2626',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    margin: '0 auto 15px auto'
                                }}>
                                    <Trash2 size={30} />
                                </div>
                                <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1f2937', marginBottom: '10px' }}>
                                    Solicitud de Eliminación
                                </h3>
                                <p style={{ color: '#6b7280', fontSize: '14px', lineHeight: '1.5' }}>
                                    ¿Estás seguro de que deseas solicitar la eliminación de la factura <strong>{invoiceToDelete?.id}</strong>?
                                </p>
                                <p style={{ color: '#d97706', fontSize: '13px', marginTop: '10px', background: '#fffbeb', padding: '8px', borderRadius: '8px' }}>
                                    ⚠️ Esta acción requiere aprobación del administrador.
                                </p>
                            </div>

                            <div style={{ marginBottom: '20px' }}>
                                <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: '#374151' }}>
                                    Motivo de la eliminación *
                                </label>
                                <textarea
                                    value={deleteComment}
                                    onChange={(e) => setDeleteComment(e.target.value)}
                                    placeholder="Ej: Error en el monto, factura duplicada..."
                                    style={{
                                        width: '100%',
                                        padding: '10px',
                                        border: '2px solid #e5e7eb',
                                        borderRadius: '10px',
                                        fontSize: '14px',
                                        minHeight: '80px',
                                        outline: 'none',
                                        resize: 'vertical',
                                        boxSizing: 'border-box'
                                    }}
                                />
                            </div>

                            <div style={{ display: 'flex', gap: '12px' }}>
                                <button
                                    onClick={() => setShowDeleteModal(false)}
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
                                    onClick={handleRequestDelete}
                                    disabled={!deleteComment.trim()}
                                    style={{
                                        flex: 1,
                                        padding: '12px',
                                        background: '#ef4444',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '10px',
                                        cursor: 'pointer',
                                        fontWeight: 'bold',
                                        opacity: !deleteComment.trim() ? 0.5 : 1
                                    }}
                                >
                                    Solicitar Eliminación
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }

            {/* Modal de Historial */}
            {
                showHistoryModal && (
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
                            maxHeight: '80vh',
                            overflowY: 'auto'
                        }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                                <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1f2937', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <History size={24} />
                                    Historial de Eliminaciones
                                </h2>
                                <button
                                    onClick={() => setShowHistoryModal(false)}
                                    style={{
                                        background: 'none',
                                        border: 'none',
                                        cursor: 'pointer',
                                        color: '#6b7280'
                                    }}
                                >
                                    <X size={24} />
                                </button>
                            </div>

                            {deletedInvoices.length === 0 ? (
                                <div style={{ textAlign: 'center', padding: '40px 0', color: '#6b7280' }}>
                                    No hay facturas eliminadas en el historial.
                                </div>
                            ) : (
                                <div style={{ display: 'grid', gap: '15px' }}>
                                    {deletedInvoices.map((invoice, idx) => {
                                        const isReinicio = invoice.status === 'paid';
                                        return (
                                        <div key={idx} style={{
                                            background: isReinicio ? '#f0fdf4' : '#fef2f2',
                                            border: `1px solid ${isReinicio ? '#dcfce7' : '#fee2e2'}`,
                                            borderRadius: '12px',
                                            padding: '16px'
                                        }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                                                <div>
                                                    <span style={{ fontWeight: 'bold', color: isReinicio ? '#166534' : '#991b1b' }}>{invoice.id}</span>
                                                    <span style={{ margin: '0 8px', color: isReinicio ? '#22c55e' : '#ef4444' }}>•</span>
                                                    <span style={{ color: isReinicio ? '#14532d' : '#7f1d1d', fontWeight: '500' }}>{invoice.clientName} ({isReinicio ? 'Archivada Paga' : 'Eliminada'})</span>
                                                </div>
                                                <div style={{ fontSize: '12px', color: isReinicio ? '#166534' : '#991b1b' }}>
                                                    {isReinicio ? 'Archivado el: ' : 'Eliminado el: '} {new Date(invoice.deletedAt).toLocaleDateString('es-ES', {
                                                        year: 'numeric',
                                                        month: 'long',
                                                        day: 'numeric',
                                                        hour: '2-digit',
                                                        minute: '2-digit'
                                                    })}
                                                </div>
                                            </div>

                                            <div style={{ background: 'white', padding: '12px', borderRadius: '8px', marginBottom: '12px', border: isReinicio ? '1px solid #e6f4ea' : '1px solid #fbebeb' }}>
                                                <p style={{ fontSize: '12px', color: '#6b7280', margin: '0 0 4px 0', fontWeight: '600' }}>
                                                    {isReinicio ? 'Detalle del Reinicio / Comentario:' : 'Motivo de eliminación:'}
                                                </p>
                                                <p style={{ fontSize: '14px', color: '#374151', margin: '0 0 8px 0' }}>
                                                    {invoice.deleteComment}
                                                </p>
                                                <div style={{ display: 'flex', gap: '15px', fontSize: '12px', color: '#6b7280', marginTop: '8px' }}>
                                                    <span>
                                                        <strong>Solicitado por:</strong> {invoice.deletedBy || 'N/A'}
                                                    </span>
                                                    {invoice.approvedBy && (
                                                        <span>
                                                            <strong>Aprobado por:</strong> {invoice.approvedBy}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>

                                            <div style={{ fontSize: '12px', color: isReinicio ? '#166534' : '#991b1b' }}>
                                                <strong>Servicios:</strong> {invoice.services.map(s => `${s.quantity}x ${s.name}`).join(', ')}
                                            </div>
                                        </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    </div>
                )
            }

            {/* Modal de éxito */}
            <ConfirmationModal
                isOpen={showSuccessModal}
                onClose={() => setShowSuccessModal(false)}
                onConfirm={() => setShowSuccessModal(false)}
                title="Solicitud Enviada"
                message={successMessage}
                type="success"
                confirmText="Aceptar"
                showCancel={false}
            />

            {/* Modal de advertencia */}
            <ConfirmationModal
                isOpen={showWarningModal}
                onClose={() => setShowWarningModal(false)}
                onConfirm={() => setShowWarningModal(false)}
                title="Atención"
                message={warningMessage}
                type="warning"
                confirmText="Entendido"
                showCancel={false}
            />

            {/* Modal de confirmación de reinicio */}
            <ConfirmationModal
                isOpen={showResetModal}
                onClose={() => setShowResetModal(false)}
                onConfirm={() => {
                    resetTotal(currentUser);
                    setShowResetModal(false);
                }}
                title="Reiniciar Total Generado"
                message="¿Estás seguro de que quieres reiniciar el total generado? Las facturas pagadas se borrarán de la lista activa y se guardarán en el historial."
                type="warning"
                confirmText="Sí, reiniciar"
                cancelText="Cancelar"
                showCancel={true}
            />
        </div >
    );
};

export default InvoiceManager;
