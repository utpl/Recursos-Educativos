# 📥 Botón de Descarga de Excel

## 🎯 Descripción

Se ha agregado un botón de descarga de Excel en la página **reporte.html** que permite descargar automáticamente un archivo `recursos.xlsx` con los datos completos del catálogo de recursos académicos.

---

## ✨ Características

### Botón Visual
- **Ubicación**: Parte superior del reporte (sección destacada)
- **Diseño**: Moderno y llamativo con hover suave
- **Texto**: "📥 Descargar reporte en Excel"
- **Animación**: Elevación y cambio de color al pasar el cursor

### Archivo Excel Generado
El archivo `recursos.xlsx` contiene **2 hojas**:

#### 📄 Hoja 1: "Detalle"
Lista completa de todos los recursos con:
- **Carpeta**: Nombre de la carpeta/semana
- **Nombre del Recurso**: Título del archivo .html

**Ejemplo:**
| Carpeta | Nombre del Recurso |
|---------|-------------------|
| ADMI_1134 | S3 Guion 1 Corrientes teóricas y modelos contemporáneos en la Administración Pública |
| ELEN_2019 | S1 Guion 1 Introducción a la Electrónica |

#### 📊 Hoja 2: "Resumen"
Resumen por carpeta con:
- **Carpeta**: Nombre de la carpeta
- **Cantidad de Recursos**: Total de .html en cada carpeta

**Ejemplo:**
| Carpeta | Cantidad de Recursos |
|---------|-------------------|
| ELEN_2019 | 35 |
| DRBD_2008 | 34 |
| MATE_2037 | 33 |
| ... | ... |
| === TOTAL === | 321 |

---

## 🚀 Cómo Usar

### 1️⃣ Ver el Botón
Abre [reporte.html](reporte.html) en tu navegador y verás el botón en la sección superior.

### 2️⃣ Descargar Excel
Haz clic en el botón **"📥 Descargar reporte en Excel"** y se descargará automáticamente:
- Nombre del archivo: `recursos.xlsx`
- Ubicación: Tu carpeta de Descargas

### 3️⃣ Abrir en Excel
- Abre Excel, Google Sheets, LibreOffice o cualquier aplicación de hojas de cálculo
- El archivo tiene formato nativo Excel (.xlsx)
- Los datos se importan automáticamente

---

## 🔄 Generación Automática

El archivo Excel se genera **automáticamente** cuando ejecutas:

```bash
npm run generar
```

O cuando cambias archivos con:

```bash
npm run watch
```

### Proceso de Generación

```
npm run generar
    ↓
scanner.js escanea 321 recursos
    ↓
generar-excel.js crea recursos.xlsx
    ↓
✅ Archivo listo en 0.5 segundos
```

---

## 📋 Estructura del Archivo

### Archivo: `recursos.xlsx`

```
recursos.xlsx (60 KB)
├── Sheet: "Detalle"
│   ├── Columna A: Carpeta (22 valores únicos)
│   ├── Columna B: Nombre del Recurso (321 valores)
│   └── Total: 321 filas de datos
│
└── Sheet: "Resumen"
    ├── Columna A: Carpeta
    ├── Columna B: Cantidad de Recursos
    └── Total: 23 filas (22 carpetas + 1 total)
```

---

## 💾 Archivos Relacionados

Aunque el botón descarga **recursos.xlsx**, el sistema también genera:

| Archivo | Descripción | Tamaño | Formato |
|---------|-------------|--------|---------|
| **recursos.xlsx** | Excel nativo (2 hojas) | 60 KB | Excel |
| recursos.csv | Datos en CSV | 55 KB | Texto |
| recursos.html | Tabla HTML importable | 67 KB | HTML |
| recursos-data.json | Base de datos JSON | 85 KB | JSON |

---

## 🎨 Estilo del Botón

### CSS Personalizado
```css
.btn-excel {
    padding: 12px 20px;
    background: linear-gradient(135deg, #0E2D52 0%, #1a4d7f 100%);
    color: white;
    border-radius: 8px;
    font-weight: 600;
    transition: all 0.3s ease;
}

.btn-excel:hover {
    background: linear-gradient(135deg, #174a84 0%, #2a5a9a 100%);
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(14, 45, 82, 0.3);
}
```

### Características Visuales
- ✅ Colores degradados profesionales (azul marino)
- ✅ Efecto hover suave (elevación de 2px)
- ✅ Sombra dinámica al pasar el cursor
- ✅ Responsive (funciona en móvil y escritorio)
- ✅ Iconos emoji (📥, 📊) para mejor UX

---

## ⚙️ Implementación Técnica

### Tecnología Utilizada
- **Librería**: `xlsx` v0.18.5
- **Formato**: Excel nativo (.xlsx)
- **Generación**: Node.js (backend)
- **Descarga**: HTML link (frontend)

### Cómo Funciona

1. **Escaneo** (scanner.js)
   - Lee todos los .html del proyecto
   - Ignora carpeta "01" y raíz

2. **Generación** (generar-excel.js)
   - Lee recursos-data.json
   - Crea 2 hojas Excel
   - Exporta a recursos.xlsx

3. **Descarga** (reporte.html)
   - Botón HTML con atributo `download`
   - Enlace directo a recursos.xlsx
   - Navegador maneja la descarga

---

## 🔧 Instalación de Dependencias

La librería `xlsx` ya está instalada. Si necesitas reinstalarlo:

```bash
npm install xlsx
```

O verifica que esté en package.json:

```json
"dependencies": {
    "xlsx": "^0.18.5"
}
```

---

## ✅ Verificación

El sistema verifica que todo funcione correctamente:

```bash
node verificar.js
```

Resultado esperado:
```
✅ Excel Data Files
   └─ CSV: 55KB, HTML: 67KB, XLSX: 60KB
```

---

## 📊 Datos Actualizados Automáticamente

Cada vez que ejecutas `npm run generar`:

✅ Se regenera resources.xlsx con:
- 321 recursos (conteo correcto)
- 22 carpetas válidas
- Sin carpeta "01"
- Sin archivos de raíz

---

## 💡 Casos de Uso

### 1. Exportar para Análisis
Descarga el Excel y analiza los datos en tu herramienta favorita:
- Excel
- Google Sheets
- Python (pandas)
- R (readxl)

### 2. Compartir con Colegas
Envía el archivo Excel a otros profesores para:
- Revisar el catálogo
- Hacer copias de seguridad
- Importar en otros sistemas

### 3. Auditoría y Reportes
Usa las hojas de Detalle y Resumen para:
- Auditar recursos
- Generar reportes ejecutivos
- Estadísticas educativas

---

## 🎓 Integración en Canvas

Si usas Canvas LMS:

1. Descarga `recursos.xlsx` desde reporte.html
2. Carga el archivo en una tarea de Canvas
3. Los estudiantes lo descarguen desde ahí
4. O incrusta el reporte directamente en Canvas

---

## 📝 Notas Técnicas

### Seguridad
- ✅ Archivo generado localmente (no requiere servidor)
- ✅ Sin datos sensibles
- ✅ Compatible con antivirus

### Compatibilidad
- ✅ Excel 2010 y superior
- ✅ Google Sheets
- ✅ LibreOffice
- ✅ Numbers (Mac)
- ✅ WPS Office

### Rendimiento
- ✅ Generación: < 1 segundo
- ✅ Tamaño: 60 KB
- ✅ Descarga: Instantánea

---

## 🆘 Solución de Problemas

### El botón no descarga nada
→ Verifica que `recursos.xlsx` existe en la carpeta raíz

### El archivo Excel se ve vacío
→ Ejecuta: `npm run generar` para regenerar

### El navegador muestra "Archivo corrupto"
→ Reintenta con: `npm run generar && npm start`

### No puedo abrir el archivo en Excel
→ Intenta con Google Sheets (sin necesidad de descarga)

---

## 🎉 Resultado Final

✅ **Botón funcional** en reporte.html  
✅ **Excel descargable** con datos completos  
✅ **Actualización automática** al generar  
✅ **Diseño moderno** y responsive  
✅ **2 hojas** con información clara  

---

## 📞 Soporte

Para actualizar o modificar:

1. Edita `generar-excel.js` para cambiar la estructura
2. Ejecuta `npm run generar` para regenerar
3. El botón descargará el nuevo archivo automáticamente

---

**Versión**: 3.1.0  
**Fecha**: 5 de abril de 2026  
**Estado**: ✅ Producción
