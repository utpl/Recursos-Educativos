#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script para procesar recursos educativos y generar Excel
"""

import os
import json
from pathlib import Path
from collections import defaultdict

# Directorio base
BASE_DIR = Path(__file__).parent

# Extensiones a buscar
RESOURCE_EXT = '.html'

# Carpetas a ignorar
IGNORE_FOLDERS = {'01', '.git', '__pycache__', 'node_modules', '.DS_Store'}

def get_folder_name(path: str) -> str:
    """Extrae el nombre de la carpeta principal"""
    parts = path.split(os.sep)
    for part in parts:
        if part and part not in {'.', '..'}:
            return part
    return 'Raiz'

def scan_resources():
    """Escanea todos los recursos .html organizados por carpeta"""
    resources_by_folder = defaultdict(list)
    
    # Recorrer directorios principales
    for item in BASE_DIR.iterdir():
        if not item.is_dir():
            continue
        
        folder_name = item.name
        
        # Ignorar carpetas específicas
        if folder_name.startswith('.') or folder_name in IGNORE_FOLDERS:
            continue
        
        # Buscar archivos .html
        for html_file in item.glob('*.html'):
            rel_path = html_file.relative_to(BASE_DIR)
            
            resources_by_folder[folder_name].append({
                'nombre': html_file.stem,
                'archivo': html_file.name,
                'ruta': str(rel_path),
                'carpeta': folder_name
            })
    
    # Añadir archivos raíz
    for html_file in BASE_DIR.glob('*.html'):
        if html_file.is_file():
            resources_by_folder['Raíz'].append({
                'nombre': html_file.stem,
                'archivo': html_file.name,
                'ruta': str(html_file.relative_to(BASE_DIR)),
                'carpeta': 'Raíz'
            })
    
    return dict(sorted(resources_by_folder.items()))

def generate_summary():
    """Genera resumen de recursos"""
    resources = scan_resources()
    
    summary = {
        'total_recursos': sum(len(v) for v in resources.values()),
        'total_carpetas': len(resources),
        'por_carpeta': {k: len(v) for k, v in resources.items()},
        'recursos': resources
    }
    
    return summary

if __name__ == '__main__':
    summary = generate_summary()
    
    # Guardar JSON para usar en HTML
    json_path = BASE_DIR / 'recursos_data.json'
    with open(json_path, 'w', encoding='utf-8') as f:
        json.dump(summary, f, ensure_ascii=False, indent=2)
    
    # Mostrar resumen
    print(f"Total de recursos: {summary['total_recursos']}")
    print(f"Total de carpetas: {summary['total_carpetas']}")
    print("\nRecursos por carpeta:")
    for carpeta, cantidad in sorted(summary['por_carpeta'].items()):
        print(f"  {carpeta}: {cantidad}")
    
    print(f"\nDatos guardados en: {json_path}")
