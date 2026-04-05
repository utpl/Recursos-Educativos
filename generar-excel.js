#!/usr/bin/env node

/**
 * Generador de Excel - Crea recursos.xlsx automáticamente
 * Usa librería xlsx para generar archivos Excel nativos
 */

const fs = require('fs');
const path = require('path');

// Intentar requerir xlsx, si no existe usar fallback CSV
let XLSX = null;
try {
    XLSX = require('xlsx');
} catch (e) {
    console.warn('⚠️  xlsx no instalado. Use: npm install xlsx');
}

function generateExcel(dataPath = 'recursos-data.json') {
    try {
        // Leer datos
        const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
        
        if (XLSX) {
            // Generar archivo Excel nativo
            generateXLSX(data);
        } else {
            // Fallback a CSV
            generateCSV(data);
        }
        
        return true;
    } catch (error) {
        console.error('❌ Error generando datos:', error.message);
        return false;
    }
}

function generateXLSX(data) {
    try {
        // Crear workbook
        const workbook = XLSX.utils.book_new();

        // ===== HOJA 1: DETALLE DE RECURSOS =====
        const detalleData = [];
        Object.keys(data.recursos).forEach(folder => {
            data.recursos[folder].forEach(resource => {
                detalleData.push({
                    'Carpeta': folder,
                    'Nombre del Recurso': resource.nombre.replace(/_/g, ' ')
                });
            });
        });
        
        const detalleSheet = XLSX.utils.json_to_sheet(detalleData);
        detalleSheet['!cols'] = [
            { wch: 25 }, // Carpeta
            { wch: 40 }  // Nombre del Recurso
        ];
        XLSX.utils.book_append_sheet(workbook, detalleSheet, 'Detalle');

        // ===== HOJA 2: RESUMEN =====
        const resumenData = Object.entries(data.por_carpeta)
            .sort((a, b) => b[1] - a[1])
            .map(([carpeta, cantidad]) => ({
                'Carpeta': carpeta,
                'Cantidad de Recursos': cantidad
            }));

        // Agregar total
        resumenData.push({
            'Carpeta': '=== TOTAL ===',
            'Cantidad de Recursos': data.total_recursos
        });

        const resumenSheet = XLSX.utils.json_to_sheet(resumenData);
        resumenSheet['!cols'] = [
            { wch: 25 }, // Carpeta
            { wch: 20 }  // Cantidad
        ];
        XLSX.utils.book_append_sheet(workbook, resumenSheet, 'Resumen');

        // Escribir archivo
        XLSX.writeFile(workbook, 'recursos.xlsx');
        console.log('✅ recursos.xlsx generado correctamente');
        return true;
    } catch (error) {
        console.error('❌ Error generando XLSX:', error.message);
        generateCSV(data); // Fallback
    }
}

function generateCSV(data) {
    // CSV para detalle de recursos
    let csvDetail = 'Carpeta,Nombre del Recurso\n';
    
    Object.keys(data.recursos).forEach(folder => {
        data.recursos[folder].forEach(resource => {
            const nombre = resource.nombre.replace(/,/g, ' ').replace(/"/g, '""');
            csvDetail += `"${folder}","${nombre}"\n`;
        });
    });

    fs.writeFileSync('recursos.csv', csvDetail, 'utf8');
    console.log('✅ recursos.csv generado (usando CSV como fallback)');

    // CSV para resumen
    let csvResumen = 'Carpeta,Cantidad de Recursos\n';
    Object.entries(data.por_carpeta)
        .sort((a, b) => b[1] - a[1])
        .forEach(([carpeta, qty]) => {
            csvResumen += `"${carpeta}",${qty}\n`;
        });
    csvResumen += `"=== TOTAL ===",${data.total_recursos}\n`;

    fs.writeFileSync('recursos-resumen.csv', csvResumen, 'utf8');
    console.log('✅ recursos-resumen.csv generado');
}

if (require.main === module) {
    generateExcel();
}

module.exports = { generateExcel };
