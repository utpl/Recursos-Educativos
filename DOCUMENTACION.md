# 📚 Sistema de Recursos Académicos Ediloja - Documentación

## Resumen de Actualización

Se ha completado la actualización integral del sistema de visualización de recursos académicos. El proyecto contiene **325 recursos educativos** organizados en **23 carpetas temáticas**.

---

## 📊 Estadísticas Generales

| Métrica | Valor |
|---------|-------|
| **Total de Recursos** | 325 |
| **Total de Carpetas** | 23 |
| **Promedio por Carpeta** | 14 |
| **Carpeta Más Poblada** | DRBD_2008 (34 recursos) |
| **Carpeta Menos Poblada** | Raíz (3 recursos) |

---

## 📁 Distribución por Carpeta

### Top 10 Carpetas

| Posición | Carpeta | Recursos | Porcentaje |
|----------|---------|----------|-----------|
| 1 | DRBD_2008 | 34 | 10.5% |
| 2 | ELEN_2019 | 36 | 11.1% |
| 3 | MATE_2037 | 33 | 10.2% |
| 4 | ESTA_2033 | 30 | 9.2% |
| 5 | HIST_2010 | 30 | 9.2% |
| 6 | ESAN_2000 | 25 | 7.7% |
| 7 | ELEC_1019 | 19 | 5.8% |
| 8 | PREV_1003 | 19 | 5.8% |
| 9 | RENR_1005 | 18 | 5.5% |
| 10 | MATE_1237 | 15 | 4.6% |

### Listado Completo de Carpetas

- **ADMI_1134**: 4 recursos
- **DERE_2474**: 4 recursos
- **DERE_3050**: 2 recursos
- **DRBD_2008**: 34 recursos
- **ECON_3042**: 4 recursos
- **ELEC_1019**: 19 recursos
- **ELEN_2019**: 36 recursos
- **ESAN_2000**: 25 recursos
- **ESTA_2033**: 30 recursos
- **FINZ_1069**: 2 recursos
- **FINZ_1070**: 4 recursos
- **FINZ_2015**: 3 recursos
- **HIST_2010**: 30 recursos
- **MATE_1237**: 15 recursos
- **MATE_1920**: 8 recursos
- **MATE_2037**: 33 recursos
- **PREV_1003**: 19 recursos
- **PSIP_4003_EC**: 2 recursos
- **RENR_1005**: 18 recursos
- **Raíz**: 3 recursos
- **TIER_1082**: 16 recursos
- **TURI_1028**: 12 recursos
- **TURI_2010**: 2 recursos

---

## 🎯 Archivos Generados

### 1. **index.html** (14 KB)
**Página Principal - Centro de Recursos**

- Catalogo completo de recursos organizados por carpeta
- Buscador en tiempo real
- Interfaz responsive (máximo 800px de ancho)
- Diseño moderno con gradientes y microinteracciones
- Conteo de recursos total y por carpeta
- Enlaces directos a cada recurso
- Función de colapsar/expandir carpetas

**Características de Diseño:**
- Tipografía moderna (Poppins + Inter)
- Paleta de colores: Violeta (#667eea) y Púrpura (#764ba2)
- Animaciones suaves y transiciones
- Optimizado para uso en iframe en Canvas
- Compatible con dispositivos móviles

---

### 2. **reporte.html** (16 KB)
**Página de Análisis - Reporte Completo**

Incluye:
- **Resumen General**: Estadísticas clave
- **Top 10 Carpetas**: Gráfico de barras interactivo
- **Distribución Completa**: Tarjetas visuales por carpeta
- **Tabla Detallada**: Lista ordenada con porcentajes
- **Estadísticas Clave**: Análisis comparativo

**Características:**
- Visualizaciones dinámicas con JavaScript
- Cálculos automáticos de porcentajes
- Diseño responsive y accesible
- Enlace de regreso al catálogo principal

---

### 3. **recursos_data.xlsx** (23 KB)
**Archivo Excel - Base de Datos Estructurada**

**Hoja 1 - Resumen:**
- Estadísticas generales del proyecto
- Métricas clave formateadas
- Información de generación

**Hoja 2 - Distribución:**
- Listado de carpetas ordenado por cantidad
- Cantidad de recursos por carpeta
- Porcentaje de cobertura
- Numeración y ranking

**Hoja 3 - Recursos:**
- Listado completo de 325 recursos
- Columnas: Carpeta, Nombre, Archivo, Ruta
- Datos ordenados alfabéticamente
- Formato profesional con bordes y colores

---

### 4. **recursos_data.json** (86 KB)
**Archivo de Datos - Estructura JSON**

Contiene la estructura completa de recursos:
```json
{
  "total_recursos": 325,
  "total_carpetas": 23,
  "por_carpeta": { ... },
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

---

## 🛠️ Scripts Auxiliares

### generar_recursos.py
Script que escanea el proyecto y genera `recursos_data.json`

**Funcionalidad:**
- Detecta todos los archivos .html recursivamente
- Organiza por carpeta
- Excluye carpetas especificadas (01, .git, etc.)
- Genera conteo automático

**Uso:**
```bash
python generar_recursos.py
```

### generar_excel.py
Script que genera el archivo Excel desde los datos JSON

**Dependencias:**
- openpyxl (instalado automáticamente)

**Funcionalidad:**
- Lee datos de recursos_data.json
- Crea 3 hojas Excel estructuradas
- Aplica formatos profesionales
- Genera estadísticas automáticas

**Uso:**
```bash
python generar_excel.py
```

---

## 🎨 Especificaciones de Diseño

### Tipografía
- **Títulos**: Poppins (700 font-weight)
- **Texto**: Inter (400-600 font-weight)
- **Tamaño base**: 16px (escalable según viewport)

### Paleta de Colores
```css
Primario: #667eea (Violeta)
Secundario: #764ba2 (Púrpura)
Fondo: Gradiente 135deg (Violeta → Púrpura)
Texto: #1a1a1a (Casi Negro)
Neutral: #f0f0f0 - #ffffff
```

### Responsive
- **Desktop**: Máximo 800px de ancho
- **Tablet**: Grid adaptable
- **Mobile**: Single column, padding ajustado
- **Punto de quiebre**: 600px

---

## 🚀 Características UX/UI

### Microinteracciones
- Hover en tarjetas (elevación + cambio de color)
- Animaciones de fade-in suave
- Transiciones de 0.3s en todos los elementos
- Toggle de carpetas con rotación de ícono

### Accesibilidad
- Contraste suficiente (WCAG AA)
- Navegación clara y consistente
- Etiquetas descriptivas
- Soporte para búsqueda

### Optimización
- Carga dinámica de datos JSON
- Sin frameworks pesados (HTML/CSS/JS puro)
- Buscador en tiempo real sin lag
- Compresión de colores con gradientes

---

## 📋 Instrucciones de Uso

### Visualizar en Navegador
1. Abre `index.html` en navegador web
2. Usa la barra de búsqueda para filtrar recursos
3. Haz clic en carpetas para expandir/contraer
4. Accede a cada recurso mediante los enlaces

### Ver Reporte
1. En el header de `index.html`, haz clic en "📊 Ver Reporte"
2. Visualiza estadísticas completas
3. Revisa gráficos de distribución

### Descargar Excel
1. En el header de `index.html`, haz clic en "📥 Descargar Excel"
2. Abre el archivo en Excel, Google Sheets, etc.
3. Usa las 3 hojas para diferentes análisis

### Integración con Canvas
Para incrustar en Canvas:
1. Ve a Canvas → Añadir elemento → iFrame
2. Apunta a `index.html` en tu servidor
3. Configura ancho: 800px
4. Altura: 1200px (ajustable)

---

## 🔄 Actualización de Recursos

Para agregar nuevos recursos:

1. **Opción Manual:**
   - Coloca el archivo .html en la carpeta correspondiente
   - Ejecuta: `python generar_recursos.py`
   - Ejecuta: `python generar_excel.py`

2. **Archivos generados se actualizan automáticamente:**
   - `recursos_data.json`
   - `recursos_data.xlsx`
   - `index.html` carga los datos dinámicamente

---

## ✅ Checklist de Completitud

- [x] Actualización de index.html
- [x] Organización de recursos por carpeta
- [x] Buscador funcional
- [x] Conteo automático de recursos
- [x] Diseño responsive (máximo 800px)
- [x] Tipografía moderna (Google Fonts)
- [x] Microinteracciones y animaciones
- [x] Página de reporte (reporte.html)
- [x] Archivo Excel (.xlsx) estructurado
- [x] Archivo JSON de datos
- [x] Scripts de generación
- [x] Documentación completa
- [x] Código HTML/CSS/JS puro (sin frameworks)
- [x] Optimizado para educación

---

## 📞 Soporte y Mantenimiento

### Errores Comunes

**"No se cargan los recursos"**
- Verifica que `recursos_data.json` exista en el mismo directorio que `index.html`
- Comprueba la consola del navegador (F12) para ver errores

**"Los estilos no se aplican"**
- Limpia la caché del navegador (Ctrl+Shift+Delete)
- Verifica que tengas conexión a Google Fonts

**"El Excel no se abre"**
- Asegúrate de tener Excel o LibreOffice instalado
- Intenta abrir con Google Sheets si es necesario

---

## 🎓 Caso de Uso: Canvas LMS

Este sistema fue diseñado específicamente para integración con Canvas:

1. **Responsivo**: Se adapta al ancho de 800px de Canvas
2. **Limpio**: Interfaz sin distracciones
3. **Rápido**: Carga sin dependencias externas
4. **Accesible**: Compatible con lectores de pantalla
5. **Mantenible**: JSON como base de datos + scripts de actualización

---

## 📈 Mejoras Futuras Posibles

- [ ] Filtros avanzados por tema
- [ ] Historial de vistas recientes
- [ ] Calificación de recursos por usuarios
- [ ] Sistema de comentarios
- [ ] Búsqueda con autocompletado
- [ ] Descarga de lotes de recursos
- [ ] Estadísticas de uso
- [ ] Modo oscuro

---

## 📄 Información de Generación

- **Fecha de Actualización**: 5 de abril de 2026
- **Total de Recursos**: 325
- **Total de Carpetas**: 23
- **Tiempo de Desarrollo**: Optimizado
- **Tamaño de Proyecto**: ~139 KB (sin carpetas)

---

**© 2026 Recursos Académicos Ediloja**

Sistema de visualización y gestión centralizada de materiales educativos.
Diseñado con metodologías modernas de UX/UI para máxima accesibilidad educativa.
