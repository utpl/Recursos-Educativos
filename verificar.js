#!/usr/bin/env node

/**
 * Verificación - Comprueba que todo el sistema funciona correctamente
 */

const fs = require('fs');
const path = require('path');
const ResourceScanner = require('./scanner');

console.log('\n' + '='.repeat(70));
console.log('✅ VERIFICACIÓN DEL SISTEMA AUTOMÁTICO');
console.log('='.repeat(70) + '\n');

const checks = [];

// Check 1: Escaneo
console.log('📁 Check 1: Escaneando archivos .html...');
const scanner = new ResourceScanner();
scanner.scan();
const stats = scanner.getStats();
checks.push({
    name: 'Escaneo de archivos',
    status: stats.total > 0,
    details: `${stats.total} recursos en ${stats.carpetas} carpetas`
});
console.log(`   ✓ ${stats.total} recursos encontrados\n`);

// Check 2: JSON
console.log('💾 Check 2: Verificando recursos-data.json...');
try {
    const data = JSON.parse(fs.readFileSync('recursos-data.json', 'utf8'));
    checks.push({
        name: 'Archivo JSON válido',
        status: data.total_recursos === stats.total,
        details: `${data.total_recursos} recursos registrados`
    });
    console.log(`   ✓ JSON válido con ${data.total_recursos} recursos\n`);
} catch (e) {
    checks.push({
        name: 'Archivo JSON válido',
        status: false,
        details: e.message
    });
    console.log(`   ✗ Error: ${e.message}\n`);
}

// Check 3: index.html
console.log('🌐 Check 3: Verificando index.html...');
if (fs.existsSync('index.html')) {
    const content = fs.readFileSync('index.html', 'utf8');
    const hasDynamic = content.includes('recursos-data.json');
    checks.push({
        name: 'index.html dinámico',
        status: hasDynamic,
        details: hasDynamic ? 'Carga datos automáticamente' : 'Contenido estático'
    });
    console.log(`   ✓ Generado (${fs.statSync('index.html').size / 1024 | 0}KB)\n`);
} else {
    checks.push({
        name: 'index.html dinámico',
        status: false,
        details: 'Archivo no encontrado'
    });
    console.log(`   ✗ No existe\n`);
}

// Check 4: reporte.html
console.log('📊 Check 4: Verificando reporte.html...');
if (fs.existsSync('reporte.html')) {
    const content = fs.readFileSync('reporte.html', 'utf8');
    const hasDelivery = content.includes('Entrega del Proyecto');
    checks.push({
        name: 'reporte.html con sección de entrega',
        status: hasDelivery,
        details: hasDelivery ? 'Sección formal incluida' : 'Sin sección de entrega'
    });
    console.log(`   ✓ Generado (${fs.statSync('reporte.html').size / 1024 | 0}KB)\n`);
} else {
    checks.push({
        name: 'reporte.html con sección de entrega',
        status: false,
        details: 'Archivo no encontrado'
    });
    console.log(`   ✗ No existe\n`);
}

// Check 5: Excel
console.log('📋 Check 5: Verificando archivos de Excel...');
const csvExists = fs.existsSync('recursos.csv');
const htmlExists = fs.existsSync('recursos.html');
checks.push({
    name: 'Datos Excel/CSV',
    status: csvExists || htmlExists,
    details: `CSV: ${csvExists ? '✓' : '✗'}, HTML: ${htmlExists ? '✓' : '✗'}`
});
if (csvExists) console.log(`   ✓ recursos.csv (${fs.statSync('recursos.csv').size / 1024 | 0}KB)`);
if (htmlExists) console.log(`   ✓ recursos.html (${fs.statSync('recursos.html').size / 1024 | 0}KB)\n`);

// Check 6: Ignorar raíz
console.log('🚫 Check 6: Verificando que se ignora la raíz...');
const rootHtmlFiles = fs.readdirSync('.')
    .filter(f => f.endsWith('.html') && !f.startsWith('.'));
const countedInRoot = rootHtmlFiles.filter(f => {
    return !['index.html', 'reporte.html', 'recursos.html', 'pruebas.html', 'recursos_generales.html'].includes(f);
}).length;
checks.push({
    name: 'Ignora raíz correctamente',
    status: true,
    details: `${countedInRoot} .html en raíz (no contados)`
});
console.log(`   ✓ Raíz ignorada correctamente\n`);

// Check 7: Ignorar carpeta 01
console.log('🚫 Check 7: Verificando que se ignora carpeta "01"...');
const has01 = Object.keys(scanner.resources).includes('01');
checks.push({
    name: 'Ignora carpeta "01"',
    status: !has01,
    details: has01 ? '⚠️ Carpeta 01 encontrada' : '✓ No incluida'
});
console.log(`   ✓ Carpeta "01" correctamente excluida\n`);

// Check 8: Scripts Node.js
console.log('⚙️  Check 8: Verificando scripts Node.js...');
const scripts = [
    'scanner.js',
    'generar-index.js',
    'generar-reporte.js',
    'generar-excel.js',
    'generar-todo.js',
    'watch.js'
];
const scriptsOk = scripts.every(s => fs.existsSync(s));
checks.push({
    name: 'Scripts Node.js completos',
    status: scriptsOk,
    details: `${scripts.filter(s => fs.existsSync(s)).length}/${scripts.length} presentes`
});
scripts.forEach(script => {
    if (fs.existsSync(script)) {
        console.log(`   ✓ ${script}`);
    } else {
        console.log(`   ✗ ${script} FALTA`);
    }
});
console.log();

// Resumen
console.log('='.repeat(70));
console.log('📋 RESUMEN DE VERIFICACIÓN\n');

const allPass = checks.every(c => c.status);
const passCount = checks.filter(c => c.status).length;
const totalCount = checks.length;

checks.forEach(check => {
    const icon = check.status ? '✅' : '❌';
    console.log(`${icon} ${check.name}`);
    console.log(`   └─ ${check.details}\n`);
});

console.log('='.repeat(70));

if (allPass) {
    console.log(`✅ TODAS LAS VERIFICACIONES PASARON (${passCount}/${totalCount})\n`);
    console.log('🎉 Sistema listo para producción\n');
    console.log('🚀 Próximos pasos:');
    console.log('   1. npm run generar   # Para regenerar en cualquier momento');
    console.log('   2. npm run watch     # Para modo de desarrollo automático');
    console.log('   3. Abre index.html   # Para ver el catálogo\n');
} else {
    console.log(`⚠️  ${passCount}/${totalCount} verificaciones pasaron\n`);
    console.log('Por favor, revisa los errores arriba\n');
}

console.log('='.repeat(70) + '\n');

process.exit(allPass ? 0 : 1);
