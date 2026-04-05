#!/usr/bin/env node

/**
 * Script Maestro - Genera automáticamente todos los archivos
 * Uso: node generar-todo.js
 */

const fs = require('fs');
const path = require('path');
const ResourceScanner = require('./scanner');
const { generateIndexHtml } = require('./generar-index');
const { generateReporteHtml } = require('./generar-reporte');
const { generateExcel } = require('./generar-excel');

console.log('\n' + '='.repeat(60));
console.log('🚀 GENERADOR AUTOMÁTICO DE RECURSOS ACADÉMICOS');
console.log('='.repeat(60) + '\n');

// Paso 1: Escanear recursos
console.log('📁 Paso 1: Escaneando archivos .html...');
const scanner = new ResourceScanner();
scanner.scan();
const stats = scanner.getStats();

console.log(`   ✓ Encontrados ${stats.total} recursos`);
console.log(`   ✓ En ${stats.carpetas} carpetas válidas`);
console.log(`   ✓ Ignoradas: carpeta "01" y raíz del proyecto\n`);

// Paso 2: Guardar JSON
console.log('💾 Paso 2: Generando base de datos JSON...');
scanner.saveJSON('recursos-data.json');
console.log('   ✓ Archivo: recursos-data.json\n');

// Paso 3: Generar index.html
console.log('🌐 Paso 3: Generando página principal...');
generateIndexHtml();
console.log('   ✓ Archivo: index.html');
console.log('   ✓ Dinámico (carga datos automáticamente)\n');

// Paso 4: Generar reporte.html
console.log('📊 Paso 4: Generando página de reporte...');
generateReporteHtml();
console.log('   ✓ Archivo: reporte.html');
console.log('   ✓ Con sección de entrega formal\n');

// Paso 5: Generar Excel
console.log('📋 Paso 5: Generando datos en Excel...');
generateExcel('recursos-data.json');
console.log('   ✓ Archivos: recursos.csv y recursos.html\n');

// Resumen
console.log('='.repeat(60));
console.log('✅ GENERACIÓN COMPLETADA EXITOSAMENTE');
console.log('='.repeat(60) + '\n');

console.log('📊 ESTADÍSTICAS:');
console.log(`   • Total de Recursos: ${stats.total}`);
console.log(`   • Total de Carpetas: ${stats.carpetas}`);
console.log(`   • Promedio por Carpeta: ${Math.round(stats.total / stats.carpetas)}`);
console.log('\n📁 TOP CARPETAS:');
stats.carpetasMayores.slice(0, 5).forEach(([folder, count], idx) => {
    console.log(`   ${idx + 1}. ${folder}: ${count} recursos`);
});

console.log('\n📄 ARCHIVOS GENERADOS:');
console.log('   • index.html ............. Catálogo dinámico');
console.log('   • reporte.html ........... Análisis + Entrega');
console.log('   • recursos-data.json ..... Base de datos');
console.log('   • recursos.csv ........... Tabla (Excel compatible)');
console.log('   • recursos.html .......... Tabla (importable)');

console.log('\n🚀 PRÓXIMOS PASOS:');
console.log('   1. Abre index.html en tu navegador');
console.log('   2. Usa el buscador y explora los recursos');
console.log('   3. Haz clic en "Ver Reporte" para estadísticas');
console.log('   4. Descarga recursos.csv para Excel');

console.log('\n💡 ACTUALIZACIONES AUTOMÁTICAS:');
console.log('   Ejecuta nuevamente este script si:');
console.log('   • Agregaste archivos .html a las carpetas');
console.log('   • Eliminaste archivos');
console.log('   • Cambió la estructura de carpetas');

console.log('\n' + '='.repeat(60) + '\n');

module.exports = { stats };
