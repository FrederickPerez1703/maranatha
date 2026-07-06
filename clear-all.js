// SCRIPT DE LIMPIEZA COMPLETA
// Abre la consola del navegador (F12) y pega este código

console.log('🧹 LIMPIEZA COMPLETA DEL SISTEMA');

// 1. Limpiar localStorage
console.log('1️⃣ Limpiando localStorage...');
localStorage.clear();
console.log('✅ localStorage limpiado');

// 2. Limpiar sessionStorage
console.log('2️⃣ Limpiando sessionStorage...');
sessionStorage.clear();
console.log('✅ sessionStorage limpiado');

// 3. Desregistrar service workers
console.log('3️⃣ Limpiando service workers...');
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations().then(registrations => {
        registrations.forEach(registration => {
            registration.unregister();
            console.log('✅ Service worker desregistrado');
        });
    });
}

// 4. Limpiar caché
console.log('4️⃣ Limpiando caché...');
if ('caches' in window) {
    caches.keys().then(names => {
        names.forEach(name => {
            caches.delete(name);
            console.log(`✅ Caché "${name}" eliminado`);
        });
    });
}

console.log('');
console.log('✅ LIMPIEZA COMPLETA FINALIZADA');
console.log('🔄 Recargando página en 2 segundos...');

// Recargar la página después de 2 segundos
setTimeout(() => {
    location.reload(true); // true = hard reload
}, 2000);
