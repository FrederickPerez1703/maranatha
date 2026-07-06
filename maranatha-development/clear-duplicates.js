// LIMPIAR FACTURAS DUPLICADAS
// Abre la consola del navegador (F12) y pega este código

console.log('🧹 Limpiando facturas duplicadas...');

// Limpiar facturas
localStorage.removeItem('maranatha-invoices');
localStorage.removeItem('maranatha-deleted-invoices');

console.log('✅ Facturas limpiadas');
console.log('🔄 Recargando página...');

// Recargar la página
setTimeout(() => {
    location.reload();
}, 1000);
