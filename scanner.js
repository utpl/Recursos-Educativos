#!/usr/bin/env node

/**
 * Scanner de Recursos - Escanea automáticamente archivos .html del proyecto
 * Ignora: carpeta "01" y archivos en raíz
 * Solo escanea subcarpetas válidas
 */

const fs = require('fs');
const path = require('path');

class ResourceScanner {
    constructor(baseDir = '.') {
        this.baseDir = baseDir;
        this.resources = {};
        this.stats = {
            total: 0,
            byFolder: {},
            folders: []
        };
    }

    /**
     * Obtiene lista de carpetas válidas (ignorando 01 y .git, node_modules, etc)
     */
    getValidFolders() {
        const ignoreList = ['01', '.git', 'node_modules', '.venv', '.env', '.DS_Store'];
        
        try {
            const items = fs.readdirSync(this.baseDir);
            const folders = items.filter(item => {
                const fullPath = path.join(this.baseDir, item);
                const stat = fs.statSync(fullPath);
                return stat.isDirectory() && !ignoreList.includes(item);
            });
            return folders.sort();
        } catch (error) {
            console.error('Error leyendo directorios:', error);
            return [];
        }
    }

    /**
     * Obtiene archivos .html de una carpeta
     */
    getHtmlFiles(folder) {
        try {
            const folderPath = path.join(this.baseDir, folder);
            const files = fs.readdirSync(folderPath);
            
            return files
                .filter(file => file.endsWith('.html'))
                .map(file => ({
                    nombre: path.parse(file).name,
                    archivo: file,
                    ruta: path.join(folder, file),
                    carpeta: folder
                }))
                .sort((a, b) => a.nombre.localeCompare(b.nombre));
        } catch (error) {
            console.error(`Error leyendo ${folder}:`, error);
            return [];
        }
    }

    /**
     * Escanea todo el proyecto
     */
    scan() {
        const folders = this.getValidFolders();
        
        folders.forEach(folder => {
            const files = this.getHtmlFiles(folder);
            
            if (files.length > 0) {
                this.resources[folder] = files;
                this.stats.byFolder[folder] = files.length;
                this.stats.total += files.length;
            }
        });

        this.stats.folders = Object.keys(this.resources).sort();
        
        return this;
    }

    /**
     * Obtiene los datos en formato JSON
     */
    toJSON() {
        return {
            timestamp: new Date().toISOString(),
            total_recursos: this.stats.total,
            total_carpetas: this.stats.folders.length,
            por_carpeta: this.stats.byFolder,
            recursos: this.resources
        };
    }

    /**
     * Obtiene solo el resumen estadístico
     */
    getStats() {
        return {
            total: this.stats.total,
            carpetas: this.stats.folders.length,
            porCarpeta: this.stats.byFolder,
            carpetasMayores: Object.entries(this.stats.byFolder)
                .sort((a, b) => b[1] - a[1])
                .slice(0, 10)
        };
    }

    /**
     * Guarda datos en archivo JSON
     */
    saveJSON(outputPath = 'recursos-data.json') {
        try {
            fs.writeFileSync(outputPath, JSON.stringify(this.toJSON(), null, 2));
            console.log(`✅ Datos guardados en: ${outputPath}`);
            return true;
        } catch (error) {
            console.error('Error guardando JSON:', error);
            return false;
        }
    }
}

// Exportar para uso en otros scripts
module.exports = ResourceScanner;

// Ejecutar si se llama directamente
if (require.main === module) {
    const scanner = new ResourceScanner();
    scanner.scan();
    
    console.log('\n📊 ESCANEO DE RECURSOS');
    console.log('='.repeat(50));
    
    const stats = scanner.getStats();
    console.log(`Total de recursos: ${stats.total}`);
    console.log(`Total de carpetas: ${stats.carpetas}`);
    console.log('\nTop carpetas:');
    stats.carpetasMayores.forEach(([folder, count], idx) => {
        console.log(`  ${idx + 1}. ${folder}: ${count}`);
    });
    
    scanner.saveJSON();
}
