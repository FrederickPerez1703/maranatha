# Maranatha - Progressive Web App (PWA)

## 📱 Instalar la Aplicación

Tu aplicación Maranatha ahora es una **Progressive Web App (PWA)**, lo que significa que los clientes pueden instalarla en sus dispositivos y usarla como una aplicación nativa.

### Cómo instalar en diferentes dispositivos:

#### 📱 **Android (Chrome/Edge)**
1. Abre la aplicación en Chrome o Edge
2. Verás un banner en la parte inferior que dice "Instalar Maranatha"
3. Toca "Instalar" o el ícono de menú (⋮) → "Instalar aplicación"
4. La app se agregará a tu pantalla de inicio

#### 🍎 **iOS (Safari)**
1. Abre la aplicación en Safari
2. Toca el botón de compartir (□ con flecha hacia arriba)
3. Desplázate y selecciona "Agregar a pantalla de inicio"
4. Toca "Agregar"
5. La app aparecerá en tu pantalla de inicio

#### 💻 **Desktop (Chrome/Edge)**
1. Abre la aplicación en Chrome o Edge
2. Verás un ícono de instalación (+) en la barra de direcciones
3. Haz clic en él y selecciona "Instalar"
4. La app se abrirá en su propia ventana

## ✨ Características de la PWA

- ✅ **Funciona offline**: La app guarda en caché los recursos para que funcione sin conexión
- ✅ **Instalable**: Se puede instalar en cualquier dispositivo
- ✅ **Rápida**: Carga instantánea después de la primera visita
- ✅ **Actualizaciones automáticas**: Se actualiza automáticamente cuando hay cambios
- ✅ **Notificaciones**: Preparada para enviar notificaciones push (requiere configuración adicional)
- ✅ **Experiencia nativa**: Se ve y funciona como una app nativa

## 🚀 Para Desarrollo

### Construir para producción:
```bash
npm run build
```

### Vista previa de la build de producción:
```bash
npm run preview
```

### Probar la PWA localmente:
1. Ejecuta `npm run build`
2. Ejecuta `npm run preview`
3. Abre `http://localhost:4173` en tu navegador
4. Verás el banner de instalación si todo está configurado correctamente

## 📦 Archivos importantes de la PWA

- `vite.config.js` - Configuración de la PWA
- `public/pwa-192x192.png` - Ícono de 192x192
- `public/pwa-512x512.png` - Ícono de 512x512
- `src/components/InstallPWA/` - Componente del banner de instalación
- `dist/manifest.webmanifest` - Generado automáticamente al hacer build

## 🎨 Personalización

### Cambiar colores de la PWA:
Edita `vite.config.js` y modifica:
```javascript
theme_color: '#ff6b9d',  // Color de la barra de estado
background_color: '#ffffff',  // Color de fondo al abrir
```

### Cambiar íconos:
Reemplaza los archivos en `public/`:
- `pwa-192x192.png`
- `pwa-512x512.png`

## 🔧 Solución de problemas

### El banner de instalación no aparece:
- Asegúrate de estar usando HTTPS (o localhost)
- Verifica que los íconos existan en `public/`
- Abre las DevTools → Application → Manifest para ver errores

### La app no funciona offline:
- Haz un build de producción (`npm run build`)
- El service worker solo funciona en producción

### Limpiar caché:
Si necesitas forzar una actualización:
1. Abre DevTools → Application → Service Workers
2. Haz clic en "Unregister"
3. Recarga la página

## 📱 Despliegue

Cuando despliegues a producción (Vercel, Netlify, etc.), la PWA funcionará automáticamente. Los usuarios podrán instalar la app directamente desde tu dominio.

### Vercel:
```bash
npm run build
vercel --prod
```

La PWA estará disponible automáticamente en tu dominio de Vercel.

---

**¡Tu aplicación Maranatha ahora es una PWA completa!** 🎉
