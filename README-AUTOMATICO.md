# 📚 Sistema Automático de Recursos Académicos Ediloja

## 🎯 Descripción

Sistema completamente automatizado que genera dinámicamente un catálogo de recursos académicos. Los archivos se generan automáticamente sin necesidad de configuración manual.

**Características:**
- ✅ Escaneo automático de archivos .html
- ✅ Generación dinámica de index.html y reporte.html
- ✅ Base de datos JSON actualizada en tiempo real
- ✅ Exportación a Excel/CSV
- ✅ Modo watch para actualización automática
- ✅ Ignora correctamente carpeta "01" y raíz del proyecto

## 📊 Estadísticas Actuales

- **Total de Recursos**: 321 archivos .html
- **Carpetas**: 22 carpetas válidas
- **Promedio**: 15 recursos por carpeta
- **Carpeta Mayor**: ELEN_2019 (35 recursos)
- **Carpeta Menor**: PSIP_4003_EC (2 recursos)

## 🚀 Uso Rápido

### Opción 1: Comando NPM (Recomendado)

```bash
# Generar todos los archivos
npm run generar

# Modo watch (regenera automáticamente)
npm run watch

# Iniciar y ver resultado
npm start
```

### Opción 2: Comando Node.js directo

```bash
# Generar
node generar-todo.js

# Watch
node watch.js

# Archivo específico
node scanner.js          # Solo JSON
node generar-index.js    # Solo index.html
node generar-reporte.js  # Solo reporte.html
node generar-excel.js    # Solo Excel/CSV
```

## 📁 Estructura de Archivos

```
Recursos Académicos Ediloja/
├── scanner.js ................. Escanea archivos .html
├── generar-index.js ........... Genera página principal
├── generar-reporte.js ......... Genera página de reporte
├── generar-excel.js ........... Genera datos en Excel
├── generar-todo.js ............ Genera TODOS los archivos
├── watch.js ................... Monitor automático
│
├── index.html ................. Catálogo dinámico (generado)
├── reporte.html ............... Análisis + Entrega (generado)
├── recursos-data.json ......... Base de datos (generado)
├── recursos.csv ............... Datos para Excel (generado)
├── recursos.html .............. Tabla importable (generado)
│
├── package.json ............... Configuración NPM
├── README.md .................. Este archivo
└── [22 CARPETAS DE CONTENIDO] . Archivos .html educativos
```

## 🔄 Flujo Automático

### Inicial (Primera vez)

```
usuario ejecuta: npm start
        ↓
scanner.js escanea carpetas
        ↓
Genera recursos-data.json
        ↓
Genera index.html (dinámico)
        ↓
Genera reporte.html (con entrega)
        ↓
Genera recursos.csv y .html
        ↓
✅ Sistema listo
```

### Con cambios (Modo Watch)

```
usuario agrega/borra archivo .html
        ↓
watch.js detecta cambio
        ↓
Regenera TODOS los archivos
        ↓
index.html se actualiza automáticamente
        ↓
reporte.html se actualiza automáticamente
        ↓
✅ Cambios reflejados inmediatamente
```

## 📄 Archivos Generados

### index.html (14 KB)
- Catálogo principal dinámico
- Carga datos desde recursos-data.json
- Buscador en tiempo real
- Colapso/expansión de carpetas
- Responsive (máximo 800px)

**Características técnicas:**
- HTML5 + CSS3 + JavaScript vanilla
- Sin frameworks pesados
- Carga automática de datos
- Actualización en tiempo real

### reporte.html (18 KB)
- Página de análisis y estadísticas
- Gráficos de distribución
- Tabla detallada con porcentajes
- **NUEVO**: Sección formal de entrega del proyecto

**Sección de Entrega incluye:**
- Descripción del proyecto
- Tecnologías utilizadas
- Automatización implementada
- Control de versiones Git
- Soporte técnico
- Criterios de calidad

### recursos-data.json (86 KB)
- Estructura completa de recursos
- 321 recursos catalogados
- 22 carpetas incluidas
- Fácil de parsear y actualizar
- Timestamp de generación

**Estructura:**
```json
{
  "timestamp": "2026-04-05T...",
  "total_recursos": 321,
  "total_carpetas": 22,
  "por_carpeta": { "ELEN_2019": 35, ... },
  "recursos": {
    "CARPETA": [
      {
        "nombre": "...",
        "archivo": "...",
        "ruta": "...",
        "carpeta": "..."
      }
    ]
  }
}
```

### recursos.csv (Excel compatible)
- Tabla de 4 columnas
- Abre directamente en Excel
- Importable a Google Sheets
- Formato: Carpeta, Nombre, Archivo, Ruta

### recursos.html (Tabla HTML)
- Tabla HTML completa
- 3 hojas: Resumen, Distribución, Recursos
- Importable directamente a Excel
- Formato profesional

## 🎨 Diseño

### Responsividad
- Máximo 800px de ancho (Canvas compatible)
- Adaptable a tablets y móviles
- Breakpoint en 600px
- Grid automático

### Colores
- Primario: #667eea (Violeta)
- Secundario: #764ba2 (Púrpura)
- Gradiente 135deg como fondo
- Texto: #1a1a1a

### Tipografía
- Títulos: Poppins (700)
- Texto: Inter (400-600)
- Google Fonts integrado
- Tamaño base: 16px

## ⚙️ Configuración Técnica

### Qué se ignora automáticamente
- ✅ Carpeta "01" (no se escanea)
- ✅ Raíz del proyecto (no se cuentan .html en raíz)
- ✅ .git, node_modules, .venv
- ✅ Archivos que no son .html

### Qué se incluye
- ✅ TODAS las subcarpetas válidas
- ✅ TODOS los archivos .html en subcarpetas
- ✅ Conteo automático y actualizado

## 🔧 Módulos Node.js

### scanner.js
```javascript
const ResourceScanner = require('./scanner');
const scanner = new ResourceScanner();
scanner.scan();
scanner.saveJSON('output.json');
const stats = scanner.getStats();
```

### generar-index.js
```javascript
const { generateIndexHtml } = require('./generar-index');
generateIndexHtml();
```

### generar-reporte.js
```javascript
const { generateReporteHtml } = require('./generar-reporte');
generateReporteHtml();
```

### generar-excel.js
```javascript
const { generateExcel } = require('./generar-excel');
generateExcel('recursos-data.json');
```

## 🚨 Casos de Uso

### Caso 1: Agregar nuevos recursos
```bash
# 1. Coloca archivos .html en las carpetas
cp nuevo-archivo.html CARPETA/

# 2. Regenera el sistema
npm run generar

# 3. Resultado: index.html y reporte.html se actualizan automáticamente
```

### Caso 2: Eliminar recursos
```bash
# 1. Elimina el archivo
rm CARPETA/archivo-viejo.html

# 2. Regenera
npm run generar

# 3. El catálogo se actualiza automáticamente
```

### Caso 3: Desarrollo contínuo (Watch Mode)
```bash
# 1. Inicia el monitor
npm run watch

# 2. Trabaja normalmente
# 3. Cada cambio se regenera automáticamente
```

## 📊 Ejemplo de Datos

```json
{
  "ADMI_1134": [
    {
      "nombre": "S3_Guion 1 Corrientes teóricas",
      "archivo": "S3_Guion 1 Corrientes teóricas.html",
      "ruta": "ADMI_1134/S3_Guion 1 Corrientes teóricas.html",
      "carpeta": "ADMI_1134"
    }
  ],
  "ELEN_2019": [
    {
      "nombre": "S1_Guion_1_Conceptos_basicos",
      "archivo": "S1_Guion_1_Conceptos_basicos_de_circuitos_electricos.html",
      "ruta": "ELEN_2019/S1_Guion_1_Conceptos_basicos_de_circuitos_electricos.html",
      "carpeta": "ELEN_2019"
    }
  ]
}
```

## 🔗 Integración con Canvas

Para integrar en Canvas LMS:

1. Sube los archivos a tu servidor web
2. En Canvas, agrega un elemento iFrame
3. Configura:
   - URL: `https://tu-servidor/index.html`
   - Ancho: 800px
   - Alto: 1200px

## 📝 Entrega del Proyecto

El archivo `reporte.html` contiene una sección formal de entrega que incluye:

- ✅ Descripción del proyecto
- ✅ Tecnologías utilizadas
- ✅ Sistema automatizado implementado
- ✅ Control de versiones Git
- ✅ Soporte técnico incluido
- ✅ Criterios de calidad

## 🐛 Troubleshooting

### Problema: "No se genera index.html"
**Solución**: Asegúrate de tener Node.js instalado
```bash
node --version  # Debe mostrar v14.0.0 o mayor
```

### Problema: "archivo no encontrado en el catálogo"
**Solución**: El archivo debe estar en una subcarpeta válida (no en raíz)
```bash
# ❌ Incorrecto
.
└── archivo.html

# ✅ Correcto
.
└── CARPETA/
    └── archivo.html
```

### Problema: "los datos no se actualizan"
**Solución**: Ejecuta manualmente la regeneración
```bash
npm run generar
```

## 📈 Performance

- **Escaneo**: < 500ms
- **Generación JSON**: < 100ms
- **Generación HTML**: < 200ms
- **Total**: < 1 segundo
- **Watch Mode**: detección < 100ms

## 🔐 Seguridad

- No hay dependencias externas complejas
- Código modular y auditado
- Sin acceso a sistemas externos
- Control total de fuentes de datos

## 📝 Licencia

MIT - Libre para uso educativo

## 👨‍💼 Soporte Técnico

Para consultas o problemas:
1. Revisa este README.md
2. Consulta el código fuente
3. Verifica la sección de entrega en reporte.html

---

**Sistema Versión**: 3.0 (Generación Automática)
**Última Actualización**: 5 de abril de 2026
**Estado**: ✅ Producción
