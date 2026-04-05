#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script auxiliar para actualizar todos los archivos de recursos
Ejecuta automáticamente ambos generadores
"""

import subprocess
import sys
from pathlib import Path

BASE_DIR = Path(__file__).parent

def run_command(cmd, description):
    """Ejecuta un comando y reporta el resultado"""
    print(f"\n{'='*60}")
    print(f"▶ {description}")
    print(f"{'='*60}")
    try:
        result = subprocess.run(cmd, shell=True, capture_output=True, text=True)
        print(result.stdout)
        if result.returncode != 0:
            print(f"❌ Error: {result.stderr}")
            return False
        return True
    except Exception as e:
        print(f"❌ Error ejecutando comando: {e}")
        return False

def main():
    print("\n" + "="*60)
    print("📚 ACTUALIZADOR DE RECURSOS ACADÉMICOS EDILOJA")
    print("="*60)
    
    # Cambiar al directorio del proyecto
    import os
    os.chdir(BASE_DIR)
    
    # Configurar path a Python del venv
    python_cmd = str(BASE_DIR / ".venv" / "bin" / "python")
    
    # Paso 1: Generar datos JSON
    success1 = run_command(
        f'"{python_cmd}" generar_recursos.py',
        "Paso 1: Generando datos JSON de recursos"
    )
    
    if not success1:
        print("\n❌ Error en paso 1. Abortando.")
        return False
    
    # Paso 2: Generar Excel
    success2 = run_command(
        f'"{python_cmd}" generar_excel.py',
        "Paso 2: Generando archivo Excel"
    )
    
    if not success2:
        print("\n❌ Error en paso 2. Abortando.")
        return False
    
    # Resumen final
    print("\n" + "="*60)
    print("✅ ACTUALIZACIÓN COMPLETADA CON ÉXITO")
    print("="*60)
    print("\n📊 Archivos generados/actualizados:")
    print("  • recursos_data.json - Base de datos de recursos")
    print("  • recursos_data.xlsx - Archivo Excel con análisis")
    print("  • index.html - Catálogo interactivo (dinámico)")
    print("  • reporte.html - Página de estadísticas (dinámico)")
    print("\n💡 Tip: Los archivos HTML cargan datos automáticamente desde JSON")
    print("   No necesitas regenerar index.html ni reporte.html\n")
    
    return True

if __name__ == '__main__':
    success = main()
    sys.exit(0 if success else 1)
