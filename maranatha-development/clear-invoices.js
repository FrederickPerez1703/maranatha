// Script para limpiar localStorage de facturas
// Abre la consola del navegador (F12) y pega este código

console.log('🧹 Limpiando localStorage de facturas...');

// Limpiar facturas
localStorage.removeItem('maranatha-invoices');

console.log('✅ localStorage limpiado');
console.log('🔄 Recarga la página para empezar de cero');

// Descomenta la siguiente línea si quieres recargar automáticamente
// location.reload();
