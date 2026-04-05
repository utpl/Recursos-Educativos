#!/usr/bin/env node

/**
 * Watch Mode - Monitorea cambios en archivos y regenera automáticamente
 * Uso: node watch.js
 */

const fs = require('fs');
const path = require('path');
const ResourceScanner = require('./scanner');
const { generateIndexHtml } = require('./generar-index');
const { generateReporteHtml } = require('./generar-reporte');
const { generateExcel } = require('./generar-excel');

let isGenerating = false;
let pendingGeneration = false;

function regenerateAll() {
    if (isGenerating) {
        pendingGeneration = true;
        return;
    }

    isGenerating = true;
    pendingGeneration = false;

    console.log('\n🔄 Detectado cambio - Regenerando archivos...');
    
    try {
        const scanner = new ResourceScanner();
        scanner.scan();
        
        scanner.saveJSON('recursos-data.json');
        generateIndexHtml();
        generateReporteHtml();
        generateExcel('recursos-data.json');
        
        console.log('✅ Regeneración completada\n');
        console.log(`📊 Recursos: ${scanner.getStats().total}`);
        console.log(`📁 Carpetas: ${scanner.getStats().carpetas}\n`);
    } catch (error) {
        console.error('❌ Error en regeneración:', error.message);
    } finally {
        isGenerating = false;
        
        if (pendingGeneration) {
            regenerateAll();
        }
    }
}

console.log('\n' + '='.repeat(60));
console.log('👀 MODO WATCH - Monitor automático de cambios');
console.log('='.repeat(60));
console.log('\nEscuchando cambios en carpetas...');
console.log('Presiona Ctrl+C para detener\n');

// Monitorear cambios en las carpetas
const baseDir = process.cwd();
const dirs = fs.readdirSync(baseDir)
    .filter(item => {
        const stat = fs.statSync(path.join(baseDir, item));
        return stat.isDirectory() && 
               !['01', '.git', 'node_modules', '.venv'].includes(item) &&
               !item.startsWith('.');
    });

// Crear watchers
const watchers = [];

dirs.forEach(dir => {
    const watcher = fs.watch(dir, { recursive: true }, (eventType, filename) => {
        if (filename && filename.endsWith('.html')) {
            regenerateAll();
        }
    });
    watchers.push(watcher);
});

console.log(`✓ Monitoreando ${dirs.length} carpetas de recursos\n`);

// Limpiar al salir
process.on('SIGINT', () => {
    console.log('\n\n👋 Deteniendo monitor...');
    watchers.forEach(w => w.close());
    process.exit(0);
});

// Generar inicial
regenerateAll();
