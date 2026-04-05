#!/usr/bin/env node

/**
 * Generador de Excel - Crea recursos.xlsx automáticamente
 * Usa CSV como formato intermedio
 */

const fs = require('fs');
const path = require('path');

function generateExcel(dataPath = 'recursos-data.json') {
    try {
        // Leer datos
        const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
        
        // Crear CSV (Excel nativo soporta CSV con UTF-8)
        let csvContent = 'Carpeta,Nombre,Archivo,Ruta\n';
        
        Object.keys(data.recursos).forEach(folder => {
            data.recursos[folder].forEach(resource => {
                const nombre = resource.nombre.replace(/,/g, ' ');
                const archivo = resource.archivo.replace(/,/g, ' ');
                const ruta = resource.ruta.replace(/,/g, ' ');
                csvContent += `"${folder}","${nombre}","${archivo}","${ruta}"\n`;
            });
        });

        fs.writeFileSync('recursos.csv', csvContent, 'utf8');
        console.log('✅ recursos.csv generado (abre en Excel)');
        
        // Crear HTML table para Excel
        generateExcelHTML(data);
        
        return true;
    } catch (error) {
        console.error('Error generando datos:', error);
        return false;
    }
}

function generateExcelHTML(data) {
    const html = `<html>
<head>
    <meta charset="UTF-8">
</head>
<body>
    <h2>Resumen</h2>
    <table border="1">
        <tr><th>Métrica</th><th>Valor</th></tr>
        <tr><td>Total de Recursos</td><td>${data.total_recursos}</td></tr>
        <tr><td>Total de Carpetas</td><td>${data.total_carpetas}</td></tr>
        <tr><td>Promedio por Carpeta</td><td>${Math.round(data.total_recursos / data.total_carpetas)}</td></tr>
    </table>

    <h2>Distribución</h2>
    <table border="1">
        <tr><th>#</th><th>Carpeta</th><th>Cantidad</th><th>Porcentaje</th></tr>
        ${Object.entries(data.por_carpeta)
            .sort((a, b) => b[1] - a[1])
            .map(([carpeta, qty], idx) => 
                `<tr><td>${idx + 1}</td><td>${carpeta}</td><td>${qty}</td><td>${((qty / data.total_recursos) * 100).toFixed(1)}%</td></tr>`
            ).join('')}
    </table>

    <h2>Recursos Completo</h2>
    <table border="1">
        <tr><th>Carpeta</th><th>Nombre</th><th>Archivo</th><th>Ruta</th></tr>
        ${Object.keys(data.recursos).flatMap(carpeta => 
            data.recursos[carpeta].map(r => 
                `<tr><td>${carpeta}</td><td>${r.nombre.replace(/_/g, ' ')}</td><td>${r.archivo}</td><td>${r.ruta}</td></tr>`
            )
        ).join('')}
    </table>
</body>
</html>`;

    fs.writeFileSync('recursos.html', html, 'utf8');
    console.log('✅ recursos.html generado (importable a Excel)');
}

if (require.main === module) {
    generateExcel();
}

module.exports = { generateExcel };
