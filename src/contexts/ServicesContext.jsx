import { createContext, useContext, useState, useEffect } from 'react';

const ServicesContext = createContext();

export const useServices = () => {
    const context = useContext(ServicesContext);
    if (!context) {
        throw new Error('useServices must be used within a ServicesProvider');
    }
    return context;
};

export const ServicesProvider = ({ children }) => {
    const [services, setServices] = useState([]);

    // Categorías por defecto
    const defaultCategories = [
        { id: 'cat-1', name: 'Uñas', icon: '💅', color: '#ff6b9d' },
        { id: 'cat-2', name: 'Cabello', icon: '💇', color: '#a855f7' },
        { id: 'cat-3', name: 'Maquillaje', icon: '💄', color: '#ec4899' },
        { id: 'cat-4', name: 'Tratamientos Faciales', icon: '✨', color: '#8b5cf6' },
        { id: 'cat-5', name: 'Depilación', icon: '🌟', color: '#f59e0b' },
        { id: 'cat-6', name: 'Otros', icon: '💎', color: '#10b981' }
    ];

    // Cargar categorías desde localStorage
    const [categories, setCategories] = useState(() => {
        try {
            const savedCategories = localStorage.getItem('serviceCategories');
            return savedCategories ? JSON.parse(savedCategories) : defaultCategories;
        } catch (error) {
            console.error('Error loading categories:', error);
            return defaultCategories;
        }
    });

    // Guardar categorías cuando cambien
    useEffect(() => {
        try {
            localStorage.setItem('serviceCategories', JSON.stringify(categories));
        } catch (error) {
            console.error('Error saving categories:', error);
        }
    }, [categories]);

    // Cargar servicios desde localStorage al iniciar
    // Cargar servicios desde localStorage al iniciar
    useEffect(() => {
        const savedServices = localStorage.getItem('salonServices');

        // Servicios por defecto
        const defaultServices = [
            {
                id: 'service-1',
                name: 'Manicura',
                category: 'Uñas',
                duration: 45,
                description: 'Manicura completa con esmaltado',
                active: true,
                subServices: [],
                createdAt: new Date().toISOString()
            },
            {
                id: 'service-2',
                name: 'Pedicura',
                category: 'Uñas',
                duration: 60,
                description: 'Pedicura completa con esmaltado',
                active: true,
                subServices: [],
                createdAt: new Date().toISOString()
            },
            {
                id: 'service-3',
                name: 'Corte de Cabello',
                category: 'Cabello',
                duration: 45,
                description: 'Corte de cabello profesional',
                active: true,
                subServices: [],
                createdAt: new Date().toISOString()
            },
            {
                id: 'service-4',
                name: 'Tinte de Cabello',
                category: 'Cabello',
                duration: 120,
                description: 'Tinte completo de cabello',
                active: true,
                subServices: [],
                createdAt: new Date().toISOString()
            },
            {
                id: 'service-5',
                name: 'Maquillaje Profesional',
                category: 'Maquillaje',
                duration: 60,
                description: 'Maquillaje profesional',
                active: true,
                subServices: [
                    'Maquillaje de Día',
                    'Maquillaje de Noche',
                    'Maquillaje de Novia',
                    'Maquillaje XV Años',
                    'Maquillaje Graduación',
                    'Prueba de Maquillaje'
                ],
                createdAt: new Date().toISOString()
            },
            {
                id: 'service-6',
                name: 'Trenzas',
                category: 'Cabello',
                duration: 90,
                description: 'Estilos de trenzas variados',
                active: true,
                subServices: [],
                createdAt: new Date().toISOString()
            }
        ];

        if (savedServices) {
            try {
                let parsedServices = JSON.parse(savedServices);

                // Verificar si falta el servicio de Trenzas y agregarlo si es necesario
                const trenzasExists = parsedServices.some(s => s.name === 'Trenzas');

                // Eliminar 'Trenza' singular si existe para evitar duplicados
                parsedServices = parsedServices.filter(s => s.name !== 'Trenza');

                if (!trenzasExists) {
                    const trenzasService = defaultServices.find(s => s.name === 'Trenzas');
                    if (trenzasService) {
                        parsedServices.push(trenzasService);
                    }
                }

                // Actualizar localStorage inmediatamente para persistir los cambios
                localStorage.setItem('salonServices', JSON.stringify(parsedServices));

                setServices(parsedServices);
            } catch (error) {
                console.error('Error al cargar servicios:', error);
                setServices([]);
            }
        } else {
            setServices(defaultServices);
            localStorage.setItem('salonServices', JSON.stringify(defaultServices));
        }
    }, []);

    // Guardar servicios en localStorage cada vez que cambien
    useEffect(() => {
        if (services.length > 0) {
            localStorage.setItem('salonServices', JSON.stringify(services));
        }
    }, [services]);

    // Agregar nuevo servicio
    const addService = (serviceData) => {
        const newService = {
            id: `service-${Date.now()}`,
            ...serviceData,
            active: true,
            subServices: serviceData.subServices || [],
            createdAt: new Date().toISOString()
        };
        setServices(prev => [...prev, newService]);
        return newService;
    };

    // Actualizar servicio existente
    const updateService = (serviceId, updatedData) => {
        setServices(prev =>
            prev.map(service =>
                service.id === serviceId
                    ? { ...service, ...updatedData, updatedAt: new Date().toISOString() }
                    : service
            )
        );
    };

    // Eliminar servicio
    const deleteService = (serviceId) => {
        setServices(prev => prev.filter(service => service.id !== serviceId));
    };

    // Activar/Desactivar servicio
    const toggleServiceStatus = (serviceId) => {
        setServices(prev =>
            prev.map(service =>
                service.id === serviceId
                    ? { ...service, active: !service.active }
                    : service
            )
        );
    };

    // Agregar nueva categoría
    const addCategory = (categoryData) => {
        const newCategory = {
            id: `cat-${Date.now()}`,
            ...categoryData
        };
        setCategories(prev => [...prev, newCategory]);
        return newCategory;
    };

    // Eliminar categoría
    const deleteCategory = (categoryId) => {
        setCategories(prev => prev.filter(cat => cat.id !== categoryId));
    };

    // Obtener servicios activos
    const getActiveServices = () => {
        return services.filter(service => service.active);
    };

    // Obtener servicios por categoría
    const getServicesByCategory = () => {
        const categorized = {};
        services.forEach(service => {
            if (!categorized[service.category]) {
                categorized[service.category] = [];
            }
            categorized[service.category].push(service);
        });
        return categorized;
    };

    const value = {
        services,
        categories,
        addService,
        updateService,
        deleteService,
        toggleServiceStatus,
        addCategory,
        deleteCategory,
        getActiveServices,
        getServicesByCategory
    };

    return (
        <ServicesContext.Provider value={value}>
            {children}
        </ServicesContext.Provider>
    );
};
