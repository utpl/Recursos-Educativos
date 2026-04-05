#!/usr/bin/env node

/**
 * Generador de index.html - Crea página dinámica del catálogo
 * Los recursos se cargan automáticamente desde el JSON generado por scanner.js
 */

const fs = require('fs');
const path = require('path');

function generateIndexHtml() {
    const html = `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Catálogo de Recursos Académicos</title>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Inter', sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            padding: 20px;
            color: #1a1a1a;
        }

        .container {
            max-width: 800px;
            margin: 0 auto;
            background: white;
            border-radius: 16px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
            overflow: hidden;
        }

        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 40px 30px;
            text-align: center;
        }

        .header h1 {
            font-family: 'Poppins', sans-serif;
            font-size: 2.2em;
            margin-bottom: 10px;
            font-weight: 700;
        }

        .header p {
            font-size: 0.95em;
            opacity: 0.95;
            margin-bottom: 20px;
        }

        .stats {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
            gap: 15px;
            margin-top: 20px;
        }

        .stat-card {
            background: rgba(255, 255, 255, 0.15);
            backdrop-filter: blur(10px);
            padding: 15px;
            border-radius: 12px;
            text-align: center;
            transition: transform 0.3s ease;
        }

        .stat-card:hover {
            transform: translateY(-3px);
            background: rgba(255, 255, 255, 0.25);
        }

        .stat-number {
            font-size: 1.8em;
            font-weight: 700;
            display: block;
        }

        .stat-label {
            font-size: 0.75em;
            opacity: 0.9;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-top: 5px;
        }

        .nav-buttons {
            display: flex;
            gap: 10px;
            justify-content: center;
            flex-wrap: wrap;
            margin-top: 15px;
        }

        .nav-btn {
            background: rgba(255, 255, 255, 0.2);
            color: white;
            border: 1px solid rgba(255, 255, 255, 0.3);
            padding: 8px 16px;
            border-radius: 20px;
            font-size: 0.85em;
            cursor: pointer;
            transition: all 0.3s ease;
            text-decoration: none;
            display: inline-block;
        }

        .nav-btn:hover {
            background: rgba(255, 255, 255, 0.3);
        }

        .content {
            padding: 40px 30px;
        }

        .search-box {
            margin-bottom: 30px;
        }

        .search-input {
            width: 100%;
            padding: 12px 16px;
            border: 2px solid #e0e0e0;
            border-radius: 8px;
            font-size: 0.95em;
            transition: all 0.3s ease;
        }

        .search-input:focus {
            outline: none;
            border-color: #667eea;
            box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }

        .folders-container {
            display: flex;
            flex-direction: column;
            gap: 25px;
        }

        .folder-section {
            border-radius: 12px;
            overflow: hidden;
            border: 2px solid #f0f0f0;
            transition: all 0.3s ease;
        }

        .folder-section:hover {
            border-color: #667eea;
            box-shadow: 0 4px 16px rgba(102, 126, 234, 0.1);
        }

        .folder-header {
            background: linear-gradient(135deg, #667eea15 0%, #764ba215 100%);
            padding: 16px 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            cursor: pointer;
            user-select: none;
        }

        .folder-header h2 {
            font-family: 'Poppins', sans-serif;
            font-size: 1.1em;
            color: #667eea;
            font-weight: 600;
            margin: 0;
        }

        .folder-count {
            background: #667eea;
            color: white;
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 0.8em;
            font-weight: 600;
        }

        .toggle-icon {
            font-size: 1.2em;
            transition: transform 0.3s ease;
            margin-left: 10px;
        }

        .folder-section.collapsed .toggle-icon {
            transform: rotate(-90deg);
        }

        .resources-list {
            padding: 15px 20px;
            background: #fafafa;
            max-height: 1000px;
            overflow: hidden;
            transition: max-height 0.3s ease;
        }

        .folder-section.collapsed .resources-list {
            max-height: 0;
            padding: 0 20px;
        }

        .resource-item {
            padding: 12px 0;
            border-bottom: 1px solid #e8e8e8;
            display: flex;
            align-items: center;
            gap: 12px;
        }

        .resource-item:last-child {
            border-bottom: none;
        }

        .resource-item:hover {
            background-color: rgba(102, 126, 234, 0.05);
            padding-left: 8px;
        }

        .resource-icon {
            color: #667eea;
            font-size: 0.9em;
        }

        .resource-link {
            color: #667eea;
            text-decoration: none;
            font-weight: 500;
            word-break: break-word;
            flex: 1;
        }

        .resource-link:hover {
            color: #764ba2;
            text-decoration: underline;
        }

        .footer {
            background: #f8f8f8;
            padding: 20px 30px;
            text-align: center;
            font-size: 0.85em;
            color: #666;
            border-top: 1px solid #e0e0e0;
        }

        .empty-state {
            text-align: center;
            padding: 30px;
            color: #999;
        }

        @media (max-width: 480px) {
            .header h1 {
                font-size: 1.8em;
            }
            .content {
                padding: 20px;
            }
        }

        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }

        .folder-section {
            animation: fadeIn 0.3s ease;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>📚 Centro de Recursos</h1>
            <p>Catálogo de materiales educativos</p>
            
            <div class="stats" id="stats">
                <div class="stat-card">
                    <span class="stat-number" id="totalRecursos">0</span>
                    <span class="stat-label">Recursos</span>
                </div>
                <div class="stat-card">
                    <span class="stat-number" id="totalCarpetas">0</span>
                    <span class="stat-label">Carpetas</span>
                </div>
                <div class="stat-card">
                    <span class="stat-number" id="promedio">0</span>
                    <span class="stat-label">Promedio</span>
                </div>
            </div>

            <div class="nav-buttons">
                <a href="reporte.html" class="nav-btn">📊 Ver Reporte</a>
            </div>
        </div>

        <div class="content">
            <div class="search-box">
                <input 
                    type="text" 
                    id="searchInput" 
                    class="search-input" 
                    placeholder="🔍 Buscar recurso..."
                >
            </div>

            <div id="foldersList" class="folders-container">
                <div class="empty-state">Cargando recursos...</div>
            </div>
        </div>

        <div class="footer">
            <p>© 2026 Recursos Académicos • Actualizado: <span id="updateDate">hoy</span></p>
        </div>
    </div>

    <script>
        let allResources = {};
        let filteredResources = {};

        async function loadResources() {
            try {
                const response = await fetch('recursos-data.json');
                if (!response.ok) throw new Error('No se encontró recursos-data.json');
                
                const data = await response.json();
                allResources = data.recursos;
                filteredResources = JSON.parse(JSON.stringify(allResources));
                
                renderFolders();
                updateStats();
            } catch (error) {
                console.error('Error cargando recursos:', error);
                document.getElementById('foldersList').innerHTML = 
                    '<div class="empty-state"><p>⚠️ Error cargando recursos. Por favor, recarga la página.</p></div>';
            }
        }

        function renderFolders() {
            const container = document.getElementById('foldersList');
            container.innerHTML = '';

            const sortedFolders = Object.keys(filteredResources).sort();

            if (sortedFolders.length === 0) {
                container.innerHTML = '<div class="empty-state">No hay recursos que coincidan.</div>';
                return;
            }

            sortedFolders.forEach(folder => {
                const resources = filteredResources[folder];
                const section = document.createElement('div');
                section.className = 'folder-section';
                
                section.innerHTML = \`
                    <div class="folder-header">
                        <h2>\${folder}</h2>
                        <div style="display: flex; align-items: center; gap: 10px;">
                            <span class="folder-count">\${resources.length}</span>
                            <span class="toggle-icon">▶</span>
                        </div>
                    </div>
                    <div class="resources-list">
                        \${resources.map(r => \`
                            <div class="resource-item">
                                <span class="resource-icon">📄</span>
                                <a href="\${r.ruta}" class="resource-link" title="\${r.nombre}">
                                    \${r.nombre.replace(/_/g, ' ')}
                                </a>
                            </div>
                        \`).join('')}
                    </div>
                \`;

                section.querySelector('.folder-header').addEventListener('click', () => {
                    section.classList.toggle('collapsed');
                });

                container.appendChild(section);
            });
        }

        function updateStats() {
            const total = Object.values(filteredResources).reduce((sum, arr) => sum + arr.length, 0);
            const carpetas = Object.keys(filteredResources).length;
            const promedio = carpetas > 0 ? Math.round(total / carpetas) : 0;

            document.getElementById('totalRecursos').textContent = total;
            document.getElementById('totalCarpetas').textContent = carpetas;
            document.getElementById('promedio').textContent = promedio;
        }

        document.getElementById('searchInput').addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            
            filteredResources = {};

            Object.keys(allResources).forEach(folder => {
                const filtered = allResources[folder].filter(r =>
                    folder.toLowerCase().includes(searchTerm) ||
                    r.nombre.toLowerCase().includes(searchTerm)
                );

                if (filtered.length > 0) {
                    filteredResources[folder] = filtered;
                }
            });

            renderFolders();
            updateStats();
        });

        // Actualizar fecha
        const today = new Date();
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        document.getElementById('updateDate').textContent = today.toLocaleDateString('es-ES', options);

        // Cargar recursos al abrir
        document.addEventListener('DOMContentLoaded', loadResources);
    </script>
</body>
</html>`;

    try {
        fs.writeFileSync('index.html', html);
        console.log('✅ index.html generado exitosamente');
        return true;
    } catch (error) {
        console.error('Error generando index.html:', error);
        return false;
    }
}

if (require.main === module) {
    generateIndexHtml();
}

module.exports = { generateIndexHtml };
