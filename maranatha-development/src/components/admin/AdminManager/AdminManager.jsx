import { useState, useEffect } from 'react';
import { Users, Bell, Shield, UserPlus, Edit2, Trash2, Check, X, AlertCircle } from 'lucide-react';
import ConfirmationModal from '../../ui/ConfirmationModal/ConfirmationModal';
import { useNotifications } from '../../../contexts/NotificationsContext';

const AdminManager = () => {
    // Usar el contexto de notificaciones
    const { pendingDeletions, approveDeletion, rejectDeletion, getPendingCount } = useNotifications();

    // Estados para usuarios
    const [users, setUsers] = useState([
        {
            id: 1,
            username: 'admin',
            email: 'admin@maranatha.com',
            roles: ['admin'],
            status: 'active',
            createdAt: '2024-01-01'
        },
        {
            id: 2,
            username: 'recepcion',
            email: 'recepcion@maranatha.com',
            roles: ['reception'],
            status: 'active',
            createdAt: '2024-02-15'
        },
        {
            id: 3,
            username: 'estilista1',
            email: 'estilista@maranatha.com',
            roles: ['stylist'],
            status: 'active',
            createdAt: '2024-03-10'
        }
    ]);

    const [activeTab, setActiveTab] = useState('users'); // 'users' o 'notifications'
    const [showUserModal, setShowUserModal] = useState(false);
    const [editingUser, setEditingUser] = useState(null);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [actionToConfirm, setActionToConfirm] = useState(null);

    const [newUser, setNewUser] = useState({
        username: '',
        email: '',
        password: '',
        roles: [],
        status: 'active'
    });

    const availableRoles = [
        { id: 'admin', name: 'Administrador', description: 'Acceso total al sistema' },
        { id: 'reception', name: 'Recepción', description: 'Gestión de citas y clientes' },
        { id: 'stylist', name: 'Estilista', description: 'Gestión de servicios y citas' },
        { id: 'accounting', name: 'Contabilidad', description: 'Gestión de facturas' }
    ];

    const roleColors = {
        admin: { bg: '#fee2e2', color: '#ef4444', label: 'Admin' },
        reception: { bg: '#dbeafe', color: '#3b82f6', label: 'Recepción' },
        stylist: { bg: '#fce7f3', color: '#ff6b9d', label: 'Estilista' },
        accounting: { bg: '#d1fae5', color: '#10b981', label: 'Contabilidad' }
    };

    // Funciones para usuarios
    const handleSaveUser = () => {
        if (editingUser) {
            setUsers(users.map(u => u.id === editingUser.id ? { ...newUser, id: editingUser.id } : u));
        } else {
            const id = Math.max(...users.map(u => u.id), 0) + 1;
            setUsers([...users, { ...newUser, id, createdAt: new Date().toISOString().split('T')[0] }]);
        }
        resetUserForm();
    };

    const handleEditUser = (user) => {
        setEditingUser(user);
        setNewUser({
            username: user.username,
            email: user.email,
            password: '',
            roles: user.roles,
            status: user.status
        });
        setShowUserModal(true);
    };

    const handleDeleteUser = (userId) => {
        setActionToConfirm({
            type: 'deleteUser',
            data: userId
        });
        setShowConfirmModal(true);
    };

    const resetUserForm = () => {
        setNewUser({
            username: '',
            email: '',
            password: '',
            roles: [],
            status: 'active'
        });
        setEditingUser(null);
        setShowUserModal(false);
    };

    const toggleRole = (roleId) => {
        setNewUser(prev => ({
            ...prev,
            roles: prev.roles.includes(roleId)
                ? prev.roles.filter(r => r !== roleId)
                : [...prev.roles, roleId]
        }));
    };

    // Funciones para notificaciones
    const handleApproveDelete = (notificationId) => {
        approveDeletion(notificationId);
    };

    const handleRejectDelete = (notificationId) => {
        rejectDeletion(notificationId);
    };

    const confirmAction = () => {
        if (actionToConfirm?.type === 'deleteUser') {
            setUsers(users.filter(u => u.id !== actionToConfirm.data));
        }
        setShowConfirmModal(false);
        setActionToConfirm(null);
    };

    const pendingCount = getPendingCount();

    return (
        <div style={{ padding: '20px' }}>
            {/* Header */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '30px',
                flexWrap: 'wrap',
                gap: '15px'
            }}>
                <div>
                    <h2 style={{ color: '#ff6b9d', fontSize: '28px', margin: 0, marginBottom: '5px' }}>
                        Panel de Administración
                    </h2>
                    <p style={{ color: '#666', fontSize: '14px', margin: 0 }}>
                        Gestiona usuarios, permisos y notificaciones del sistema
                    </p>
                </div>
            </div>

            {/* Tabs */}
            <div style={{
                display: 'flex',
                gap: '10px',
                marginBottom: '30px',
                borderBottom: '2px solid #f0f0f0',
                flexWrap: 'wrap'
            }}>
                <button
                    onClick={() => setActiveTab('users')}
                    style={{
                        padding: '15px 25px',
                        border: 'none',
                        background: activeTab === 'users' ? 'linear-gradient(135deg, #ff6b9d, #ff8fab)' : 'transparent',
                        color: activeTab === 'users' ? 'white' : '#666',
                        borderRadius: '12px 12px 0 0',
                        fontSize: '15px',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        transition: 'all 0.3s ease'
                    }}
                >
                    <Users size={20} />
                    Usuarios y Permisos
                </button>
                <button
                    onClick={() => setActiveTab('notifications')}
                    style={{
                        padding: '15px 25px',
                        border: 'none',
                        background: activeTab === 'notifications' ? 'linear-gradient(135deg, #ff6b9d, #ff8fab)' : 'transparent',
                        color: activeTab === 'notifications' ? 'white' : '#666',
                        borderRadius: '12px 12px 0 0',
                        fontSize: '15px',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        transition: 'all 0.3s ease',
                        position: 'relative'
                    }}
                >
                    <Bell size={20} />
                    Notificaciones
                    {pendingCount > 0 && (
                        <span style={{
                            position: 'absolute',
                            top: '8px',
                            right: '8px',
                            background: '#ef4444',
                            color: 'white',
                            borderRadius: '50%',
                            width: '20px',
                            height: '20px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '11px',
                            fontWeight: 'bold'
                        }}>
                            {pendingCount}
                        </span>
                    )}
                </button>
            </div>

            {/* Contenido según tab activo */}
            {activeTab === 'users' ? (
                <div>
                    {/* Botón añadir usuario */}
                    <div style={{ marginBottom: '25px' }}>
                        <button
                            onClick={() => setShowUserModal(true)}
                            style={{
                                background: 'linear-gradient(135deg, #ff6b9d, #ff8fab)',
                                color: 'white',
                                padding: '12px 24px',
                                borderRadius: '12px',
                                border: 'none',
                                fontSize: '14px',
                                fontWeight: 'bold',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                boxShadow: '0 5px 20px rgba(255, 107, 157, 0.3)'
                            }}
                        >
                            <UserPlus size={20} />
                            Añadir Usuario
                        </button>
                    </div>

                    {/* Lista de usuarios */}
                    <div style={{
                        background: 'white',
                        borderRadius: '20px',
                        padding: '25px',
                        boxShadow: '0 10px 30px rgba(255, 107, 157, 0.1)'
                    }}>
                        <div style={{ display: 'grid', gap: '15px' }}>
                            {users.map(user => (
                                <div key={user.id} style={{
                                    display: 'grid',
                                    gridTemplateColumns: '1fr auto',
                                    alignItems: 'center',
                                    padding: '20px',
                                    background: '#f8f9fa',
                                    borderRadius: '15px',
                                    border: '2px solid #f0f0f0',
                                    gap: '20px'
                                }}>
                                    <div>
                                        <div style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '12px',
                                            marginBottom: '10px'
                                        }}>
                                            <div style={{
                                                width: '45px',
                                                height: '45px',
                                                borderRadius: '50%',
                                                background: 'linear-gradient(135deg, #ff6b9d, #ff8fab)',
                                                color: 'white',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                fontSize: '18px',
                                                fontWeight: 'bold'
                                            }}>
                                                {user.username.charAt(0).toUpperCase()}
                                            </div>
                                            <div>
                                                <div style={{ fontWeight: 'bold', color: '#333', fontSize: '16px' }}>
                                                    {user.username}
                                                </div>
                                                <div style={{ fontSize: '13px', color: '#666' }}>
                                                    {user.email}
                                                </div>
                                            </div>
                                        </div>
                                        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                                            {user.roles.map(role => (
                                                <span key={role} style={{
                                                    padding: '4px 12px',
                                                    borderRadius: '10px',
                                                    fontSize: '12px',
                                                    fontWeight: 'bold',
                                                    background: roleColors[role]?.bg || '#f0f0f0',
                                                    color: roleColors[role]?.color || '#666'
                                                }}>
                                                    {roleColors[role]?.label || role}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', gap: '8px' }}>
                                        <button
                                            onClick={() => handleEditUser(user)}
                                            style={{
                                                padding: '10px',
                                                borderRadius: '10px',
                                                border: 'none',
                                                background: '#3b82f615',
                                                color: '#3b82f6',
                                                cursor: 'pointer',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center'
                                            }}
                                        >
                                            <Edit2 size={18} />
                                        </button>
                                        {user.username !== 'admin' && (
                                            <button
                                                onClick={() => handleDeleteUser(user.id)}
                                                style={{
                                                    padding: '10px',
                                                    borderRadius: '10px',
                                                    border: 'none',
                                                    background: '#ef444415',
                                                    color: '#ef4444',
                                                    cursor: 'pointer',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center'
                                                }}
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ) : (
                <div>
                    {/* Notificaciones */}
                    {pendingDeletions.length === 0 ? (
                        <div style={{
                            background: 'white',
                            borderRadius: '20px',
                            padding: '60px 40px',
                            textAlign: 'center',
                            boxShadow: '0 10px 30px rgba(255, 107, 157, 0.1)'
                        }}>
                            <Bell size={60} color="#d1d5db" style={{ marginBottom: '20px' }} />
                            <h3 style={{ color: '#666', fontSize: '18px', margin: 0 }}>
                                No hay notificaciones pendientes
                            </h3>
                            <p style={{ color: '#999', fontSize: '14px', marginTop: '10px' }}>
                                Las solicitudes de eliminación aparecerán aquí
                            </p>
                        </div>
                    ) : (
                        <div style={{ display: 'grid', gap: '15px' }}>
                            {pendingDeletions.map(notification => (
                                <div key={notification.id} style={{
                                    background: 'white',
                                    borderRadius: '20px',
                                    padding: '25px',
                                    boxShadow: '0 10px 30px rgba(255, 107, 157, 0.1)',
                                    border: notification.status === 'pending' ? '2px solid #fbbf24' :
                                        notification.status === 'approved' ? '2px solid #10b981' : '2px solid #ef4444'
                                }}>
                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'flex-start',
                                        marginBottom: '20px'
                                    }}>
                                        <div style={{ flex: 1 }}>
                                            <div style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '10px',
                                                marginBottom: '10px'
                                            }}>
                                                <AlertCircle size={24} color="#f59e0b" />
                                                <h4 style={{ margin: 0, fontSize: '18px', color: '#333' }}>
                                                    Solicitud de Eliminación
                                                </h4>
                                            </div>
                                            <p style={{ margin: '0 0 8px 0', fontSize: '15px', color: '#666', fontWeight: 'bold' }}>
                                                {notification.itemName}
                                            </p>
                                            <p style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#999' }}>
                                                <strong>Solicitado por:</strong> {notification.requestedBy}
                                            </p>
                                            <p style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#999' }}>
                                                <strong>Fecha:</strong> {new Date(notification.requestedAt).toLocaleString('es-ES')}
                                            </p>
                                            <p style={{ margin: 0, fontSize: '14px', color: '#666' }}>
                                                <strong>Motivo:</strong> {notification.reason}
                                            </p>
                                        </div>
                                        {notification.status === 'pending' && (
                                            <div style={{ display: 'flex', gap: '10px' }}>
                                                <button
                                                    onClick={() => handleApproveDelete(notification.id)}
                                                    style={{
                                                        padding: '10px 20px',
                                                        borderRadius: '12px',
                                                        border: 'none',
                                                        background: 'linear-gradient(135deg, #10b981, #34d399)',
                                                        color: 'white',
                                                        cursor: 'pointer',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '6px',
                                                        fontSize: '14px',
                                                        fontWeight: 'bold',
                                                        boxShadow: '0 4px 14px rgba(16, 185, 129, 0.4)'
                                                    }}
                                                >
                                                    <Check size={18} />
                                                    Aprobar
                                                </button>
                                                <button
                                                    onClick={() => handleRejectDelete(notification.id)}
                                                    style={{
                                                        padding: '10px 20px',
                                                        borderRadius: '12px',
                                                        border: 'none',
                                                        background: 'linear-gradient(135deg, #ef4444, #f87171)',
                                                        color: 'white',
                                                        cursor: 'pointer',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '6px',
                                                        fontSize: '14px',
                                                        fontWeight: 'bold',
                                                        boxShadow: '0 4px 14px rgba(239, 68, 68, 0.4)'
                                                    }}
                                                >
                                                    <X size={18} />
                                                    Rechazar
                                                </button>
                                            </div>
                                        )}
                                        {notification.status === 'approved' && (
                                            <div style={{
                                                padding: '10px 20px',
                                                borderRadius: '12px',
                                                background: '#d1fae5',
                                                color: '#10b981',
                                                fontSize: '14px',
                                                fontWeight: 'bold'
                                            }}>
                                                ✓ Aprobado
                                            </div>
                                        )}
                                        {notification.status === 'rejected' && (
                                            <div style={{
                                                padding: '10px 20px',
                                                borderRadius: '12px',
                                                background: '#fee2e2',
                                                color: '#ef4444',
                                                fontSize: '14px',
                                                fontWeight: 'bold'
                                            }}>
                                                ✗ Rechazado
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {/* Modal de Usuario */}
            {showUserModal && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'rgba(0, 0, 0, 0.5)',
                    backdropFilter: 'blur(5px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1000,
                    padding: '20px'
                }} onClick={() => resetUserForm()}>
                    <div style={{
                        background: 'white',
                        borderRadius: '20px',
                        padding: '30px',
                        width: '90%',
                        maxWidth: '500px',
                        maxHeight: '90vh',
                        overflowY: 'auto'
                    }} onClick={(e) => e.stopPropagation()}>
                        <h3 style={{ color: '#ff6b9d', fontSize: '24px', margin: '0 0 25px 0' }}>
                            {editingUser ? 'Editar Usuario' : 'Nuevo Usuario'}
                        </h3>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            <div>
                                <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', color: '#333', marginBottom: '8px' }}>
                                    Nombre de Usuario *
                                </label>
                                <input
                                    type="text"
                                    value={newUser.username}
                                    onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                                    style={{
                                        width: '100%',
                                        padding: '12px 16px',
                                        border: '2px solid #f0f0f0',
                                        borderRadius: '10px',
                                        fontSize: '16px',
                                        outline: 'none'
                                    }}
                                    placeholder="usuario123"
                                />
                            </div>

                            <div>
                                <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', color: '#333', marginBottom: '8px' }}>
                                    Email *
                                </label>
                                <input
                                    type="email"
                                    value={newUser.email}
                                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                                    style={{
                                        width: '100%',
                                        padding: '12px 16px',
                                        border: '2px solid #f0f0f0',
                                        borderRadius: '10px',
                                        fontSize: '16px',
                                        outline: 'none'
                                    }}
                                    placeholder="usuario@ejemplo.com"
                                />
                            </div>

                            <div>
                                <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', color: '#333', marginBottom: '8px' }}>
                                    Contraseña {editingUser ? '(dejar vacío para no cambiar)' : '*'}
                                </label>
                                <input
                                    type="password"
                                    value={newUser.password}
                                    onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                                    style={{
                                        width: '100%',
                                        padding: '12px 16px',
                                        border: '2px solid #f0f0f0',
                                        borderRadius: '10px',
                                        fontSize: '16px',
                                        outline: 'none'
                                    }}
                                    placeholder="••••••••"
                                />
                            </div>

                            <div>
                                <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', color: '#333', marginBottom: '12px' }}>
                                    Roles y Permisos *
                                </label>
                                <div style={{ display: 'grid', gap: '12px' }}>
                                    {availableRoles.map(role => (
                                        <div
                                            key={role.id}
                                            onClick={() => toggleRole(role.id)}
                                            style={{
                                                padding: '15px',
                                                border: `2px solid ${newUser.roles.includes(role.id) ? '#ff6b9d' : '#f0f0f0'}`,
                                                borderRadius: '12px',
                                                cursor: 'pointer',
                                                background: newUser.roles.includes(role.id) ? '#fff5f8' : 'white',
                                                transition: 'all 0.3s ease'
                                            }}
                                        >
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '5px' }}>
                                                <div style={{
                                                    width: '20px',
                                                    height: '20px',
                                                    borderRadius: '6px',
                                                    border: `2px solid ${newUser.roles.includes(role.id) ? '#ff6b9d' : '#d1d5db'}`,
                                                    background: newUser.roles.includes(role.id) ? '#ff6b9d' : 'white',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    color: 'white',
                                                    fontSize: '12px'
                                                }}>
                                                    {newUser.roles.includes(role.id) && '✓'}
                                                </div>
                                                <span style={{ fontWeight: 'bold', color: '#333', fontSize: '15px' }}>
                                                    {role.name}
                                                </span>
                                            </div>
                                            <p style={{ margin: '0 0 0 30px', fontSize: '13px', color: '#666' }}>
                                                {role.description}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div style={{ display: 'flex', gap: '15px', marginTop: '10px' }}>
                                <button
                                    onClick={resetUserForm}
                                    style={{
                                        flex: 1,
                                        padding: '15px',
                                        border: '2px solid #f0f0f0',
                                        borderRadius: '10px',
                                        background: 'white',
                                        color: '#666',
                                        fontSize: '16px',
                                        fontWeight: 'bold',
                                        cursor: 'pointer'
                                    }}
                                >
                                    Cancelar
                                </button>
                                <button
                                    onClick={handleSaveUser}
                                    disabled={!newUser.username || !newUser.email || newUser.roles.length === 0 || (!editingUser && !newUser.password)}
                                    style={{
                                        flex: 1,
                                        padding: '15px',
                                        border: 'none',
                                        borderRadius: '10px',
                                        background: (!newUser.username || !newUser.email || newUser.roles.length === 0 || (!editingUser && !newUser.password))
                                            ? '#ccc'
                                            : 'linear-gradient(135deg, #ff6b9d, #ff8fab)',
                                        color: 'white',
                                        fontSize: '16px',
                                        fontWeight: 'bold',
                                        cursor: (!newUser.username || !newUser.email || newUser.roles.length === 0 || (!editingUser && !newUser.password)) ? 'not-allowed' : 'pointer'
                                    }}
                                >
                                    {editingUser ? 'Actualizar' : 'Crear'} Usuario
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal de Confirmación */}
            <ConfirmationModal
                isOpen={showConfirmModal}
                onClose={() => setShowConfirmModal(false)}
                onConfirm={confirmAction}
                title="¿Eliminar Usuario?"
                message="Esta acción no se puede deshacer. El usuario perderá acceso al sistema inmediatamente."
                type="danger"
                confirmText="Eliminar"
                cancelText="Cancelar"
            />
        </div>
    );
};

export default AdminManager;
