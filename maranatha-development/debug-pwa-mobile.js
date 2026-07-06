// Script temporal para debug de PWA en móvil
// Pega esto en la consola de Chrome en tu móvil para diagnosticar

console.log('=== PWA DEBUG ===');

// 1. Verificar si está en modo standalone
const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
const isIOSStandalone = window.navigator.standalone === true;
console.log('📱 Modo standalone:', isStandalone);
console.log('🍎 iOS standalone:', isIOSStandalone);

// 2. Verificar localStorage
const dismissedData = localStorage.getItem('pwa-install-dismissed');
console.log('📦 localStorage:', dismissedData);

if (dismissedData) {
    const data = JSON.parse(dismissedData);
    const daysSince = (Date.now() - data.timestamp) / (1000 * 60 * 60 * 24);
    console.log('⏰ Días desde que se cerró:', daysSince);
}

// 3. Limpiar localStorage (descomentar para usar)
// localStorage.removeItem('pwa-install-dismissed');
// console.log('✅ localStorage limpiado - recarga la página');

// 4. Verificar si el service worker está registrado
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations().then(registrations => {
        console.log('🔧 Service Workers:', registrations.length);
        registrations.forEach(reg => {
            console.log('  - Estado:', reg.active ? 'activo' : 'inactivo');
        });
    });
}

// 5. Verificar manifest
fetch('/manifest.webmanifest')
    .then(r => r.json())
    .then(manifest => {
        console.log('📄 Manifest cargado:', manifest.name);
        console.log('  - Iconos:', manifest.icons.length);
    })
    .catch(e => console.error('❌ Error cargando manifest:', e));

console.log('=== FIN DEBUG ===');
