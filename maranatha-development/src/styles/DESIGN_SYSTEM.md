# 🎨 Design System - En Maranatha

Sistema de diseño unificado para mantener consistencia visual en toda la aplicación.

## 📁 Estructura de Archivos

```
src/styles/
├── index.css       -- Punto de entrada (importa todo)
├── tokens.css      -- Variables CSS (colores, spacing, etc.)
├── buttons.css     -- Clases para botones
├── forms.css       -- Clases para formularios
├── components.css  -- Cards, badges, alerts, modales
└── utilities.css   -- Clases utilitarias
```

## 🚀 Cómo Usar

El design system ya está importado en `src/index.css`. Solo necesitas usar las clases en tus componentes.

---

## 🎯 Botones

### Variantes Sólidas (con gradiente)

```jsx
<button className="btn btn-primary">Primary</button>
<button className="btn btn-success">Success</button>
<button className="btn btn-warning">Warning</button>
<button className="btn btn-danger">Danger</button>
<button className="btn btn-info">Info</button>
<button className="btn btn-purple">Purple</button>
```

### Variantes Outline

```jsx
<button className="btn btn-outline-primary">Outline Primary</button>
<button className="btn btn-outline-danger">Outline Danger</button>
<button className="btn btn-outline-gray">Outline Gray</button>
```

### Variantes Soft (fondo suave)

```jsx
<button className="btn btn-soft-primary">Soft Primary</button>
<button className="btn btn-soft-success">Soft Success</button>
<button className="btn btn-soft-danger">Soft Danger</button>
```

### Tamaños

```jsx
<button className="btn btn-primary btn-sm">Small</button>
<button className="btn btn-primary">Default</button>
<button className="btn btn-primary btn-lg">Large</button>
<button className="btn btn-primary btn-xl">Extra Large</button>
```

### Estilos Especiales

```jsx
<button className="btn btn-primary btn-pill">Pill Button</button>
<button className="btn btn-primary btn-block">Full Width</button>
<button className="btn btn-primary btn-icon"><Icon /></button>
<button className="btn btn-primary btn-icon btn-icon-circle"><Icon /></button>
```

### Grupos de Botones

```jsx
<div className="btn-group">
  <button className="btn btn-outline-gray">Cancelar</button>
  <button className="btn btn-primary">Confirmar</button>
</div>
```

---

## 📝 Formularios

### Inputs Básicos

```jsx
<div className="form-group">
  <label className="form-label">Nombre</label>
  <input type="text" className="form-input" placeholder="Tu nombre" />
</div>

<div className="form-group">
  <label className="form-label form-label-required">Email</label>
  <input type="email" className="form-input" />
  <span className="form-help-text">Nunca compartiremos tu email.</span>
</div>
```

### Tamaños

```jsx
<input className="form-input form-input-sm" placeholder="Small" />
<input className="form-input" placeholder="Default" />
<input className="form-input form-input-lg" placeholder="Large" />
```

### Estados de Validación

```jsx
<input className="form-input form-input-error" value="Error" />
<span className="form-error-message">Este campo es requerido</span>

<input className="form-input form-input-success" value="Válido" />
```

### Select

```jsx
<select className="form-select">
  <option>Selecciona una opción</option>
  <option>Opción 1</option>
  <option>Opción 2</option>
</select>
```

### Textarea

```jsx
<textarea className="form-textarea" rows="4" placeholder="Escribe aquí..."></textarea>
```

### Input con Icono

```jsx
<div className="form-input-wrapper">
  <Search className="form-input-icon form-input-icon-left" size={18} />
  <input className="form-input form-input-with-icon-left" placeholder="Buscar..." />
</div>
```

### Grid de Formulario

```jsx
<div className="form-row form-row-2">
  <div className="form-group">
    <label className="form-label">Nombre</label>
    <input className="form-input" />
  </div>
  <div className="form-group">
    <label className="form-label">Apellido</label>
    <input className="form-input" />
  </div>
</div>
```

---

## 🃏 Cards

### Card Básica

```jsx
<div className="card">
  <div className="card-header">
    <h3>Título</h3>
  </div>
  <div className="card-body">
    <p>Contenido de la card</p>
  </div>
  <div className="card-footer">
    <button className="btn btn-primary">Acción</button>
  </div>
</div>
```

### Card con Hover

```jsx
<div className="card card-hover">
  <div className="card-body">
    <p>Esta card se eleva al hacer hover</p>
  </div>
</div>
```

### Card con Gradiente

```jsx
<div className="card card-gradient-header">
  <div className="card-header">
    <h3>Cabecera con Gradiente</h3>
  </div>
  <div className="card-body">
    <p>Contenido</p>
  </div>
</div>
```

---

## 🏷️ Badges

```jsx
<span className="badge badge-primary">Primary</span>
<span className="badge badge-success">Pagado</span>
<span className="badge badge-warning">Pendiente</span>
<span className="badge badge-danger">Cancelado</span>
<span className="badge badge-info">Info</span>
<span className="badge badge-gray">Inactivo</span>
```

### Badges Sólidos

```jsx
<span className="badge badge-solid-success">✓ Completado</span>
<span className="badge badge-solid-warning">⏱ En Proceso</span>
```

---

## ⚠️ Alertas

```jsx
<div className="alert alert-success">
  <CheckCircle className="alert-icon" />
  <div className="alert-content">
    <div className="alert-title">¡Éxito!</div>
    <p>La operación se completó correctamente.</p>
  </div>
</div>

<div className="alert alert-warning">
  <AlertTriangle className="alert-icon" />
  <div className="alert-content">
    <div className="alert-title">Advertencia</div>
    <p>Por favor revisa los datos.</p>
  </div>
</div>

<div className="alert alert-danger">
  <XCircle className="alert-icon" />
  <div className="alert-content">
    <div className="alert-title">Error</div>
    <p>Algo salió mal.</p>
  </div>
</div>
```

---

## 📊 Stat Boxes

```jsx
<div className="stat-box">
  <div className="stat-value">1,234</div>
  <div className="stat-label">Total Clientes</div>
</div>

<div className="stat-box stat-box-primary">
  <div className="stat-value">$5,678</div>
  <div className="stat-label">Ingresos del Mes</div>
</div>
```

---

## 👤 Avatars

```jsx
<div className="avatar avatar-sm">SM</div>
<div className="avatar">MD</div>
<div className="avatar avatar-lg">LG</div>
<div className="avatar avatar-xl">XL</div>
```

---

## 📋 Tablas

```jsx
<table className="table table-hover">
  <thead>
    <tr>
      <th>Nombre</th>
      <th>Email</th>
      <th>Estado</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>María García</td>
      <td>maria@example.com</td>
      <td><span className="badge badge-success">Activo</span></td>
    </tr>
  </tbody>
</table>
```

---

## 🔧 Utilities

### Flexbox

```jsx
<div className="d-flex justify-between align-center gap-4">
  <span>Izquierda</span>
  <span>Derecha</span>
</div>
```

### Spacing

```jsx
<div className="mb-4 mt-2 p-5">Contenido con spacing</div>
```

### Tipografía

```jsx
<h1 className="text-2xl font-bold text-gray-800">Título</h1>
<p className="text-sm text-gray-500">Subtítulo</p>
<p className="text-primary font-semibold">Destacado</p>
```

### Colores de Fondo

```jsx
<div className="bg-primary-gradient text-white p-4 rounded-lg">
  Fondo con gradiente
</div>
<div className="bg-success-light text-success p-4 rounded-lg">
  Fondo suave verde
</div>
```

### Bordes y Sombras

```jsx
<div className="border rounded-xl shadow-lg p-4">
  Card con borde y sombra
</div>
```

### Hover Effects

```jsx
<div className="card hover-lift transition">Se eleva al hover</div>
<div className="card hover-scale transition">Escala al hover</div>
```

---

## 📱 Responsive

```jsx
// Se oculta en móvil
<div className="hide-mobile">Solo desktop</div>

// Se oculta en desktop
<div className="hide-desktop">Solo móvil</div>

// Flex column en móvil
<div className="d-flex flex-mobile gap-4">
  <div>Item 1</div>
  <div>Item 2</div>
</div>
```

---

## 🎨 Variables CSS Disponibles

Puedes usar estas variables en tus estilos inline o CSS personalizado:

```css
/* Colores */
var(--color-primary)        /* #ff6b9d */
var(--color-primary-light)  /* #ff8fab */
var(--color-success)        /* #10b981 */
var(--color-warning)        /* #f59e0b */
var(--color-danger)         /* #ef4444 */
var(--color-info)           /* #3b82f6 */

/* Gradientes */
var(--gradient-primary)     /* linear-gradient(...) */
var(--gradient-success)
var(--gradient-danger)

/* Spacing */
var(--spacing-1) /* 4px */
var(--spacing-2) /* 8px */
var(--spacing-3) /* 12px */
var(--spacing-4) /* 16px */
var(--spacing-5) /* 20px */
var(--spacing-6) /* 24px */
var(--spacing-8) /* 32px */

/* Border Radius */
var(--radius-sm)   /* 6px */
var(--radius-md)   /* 8px */
var(--radius-lg)   /* 12px */
var(--radius-xl)   /* 16px */
var(--radius-2xl)  /* 20px */
var(--radius-full) /* 9999px */

/* Sombras */
var(--shadow-sm)
var(--shadow-md)
var(--shadow-lg)
var(--shadow-primary)

/* Transiciones */
var(--transition-fast)   /* 150ms */
var(--transition-normal) /* 200ms */  
var(--transition-slow)   /* 300ms */
```

---

## ✨ Ejemplo de Migración

### Antes (estilo inline):

```jsx
<button 
  style={{
    background: 'linear-gradient(135deg, #ff6b9d, #ff8fab)',
    color: 'white',
    padding: '12px 24px',
    borderRadius: '12px',
    border: 'none',
    fontWeight: 'bold',
    cursor: 'pointer',
    boxShadow: '0 4px 15px rgba(255, 107, 157, 0.3)',
    transition: 'all 0.2s'
  }}
>
  Click Me
</button>
```

### Después (con design system):

```jsx
<button className="btn btn-primary">
  Click Me
</button>
```

¡Mucho más limpio y mantenible! 🎉
