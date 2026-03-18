Realice una infografía interactiva en HTML tipo Genially / Prezi, con diseño moderno, altamente visual e interactivo, optimizado para uso en LMS (Moodle/Canvas) dentro de un iframe.

────────────────────────────────────────
1. FORMATO Y CONTROL DEL LIENZO (CRÍTICO)
────────────────────────────────────────

- El recurso debe comportarse como una diapositiva tipo PowerPoint
- Proporción fija 16:9 (ejemplo: 1280x720)
- NO debe crecer verticalmente bajo ninguna circunstancia
- PROHIBIDO scroll interno (ni vertical ni horizontal)

Escalado obligatorio:
- Usar transform: scale() para adaptar el contenido
- Todo el contenido debe permanecer dentro del viewport
- Debe ajustarse perfectamente dentro de un iframe sin romper diseño

────────────────────────────────────────
2. RESPONSIVIDAD (OBLIGATORIO)
────────────────────────────────────────

- Escritorio: lienzo centrado tipo presentación
- Tablet: layout adaptativo (grid flexible)
- Móvil: layout vertical (stack)

Reglas:
- Sin necesidad de zoom
- Botones táctiles accesibles
- Usar @media:
  - Tablet: max-width 1024px
  - Móvil: max-width 768px
  - otros: 480px

────────────────────────────────────────
3. TIPOGRAFÍA (CRÍTICO)
────────────────────────────────────────

- Tamaño máximo de títulos: 20px
- Subtítulos: entre 16px y 18px
- Texto general (párrafos, contenido, labels): 12px
- PROHIBIDO usar tamaños mayores a 20px
- Usar tipografía del sistema (system fonts) para evitar cargas externas:
  - font-family: system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;

────────────────────────────────────────
4. SISTEMA DE COLORES (OBLIGATORIO)
────────────────────────────────────────

- Toda la paleta debe definirse en :root {}

Ejemplo:

:root{
  --primary: #2A6F97;
  --secondary: #468FAF;
  --accent: #61A5C2;
  --bg: #FFFFFF;
  --text: #1A1A1A;
  --muted: #6B7280;
}

Reglas:
- Cumplir accesibilidad W3C (mínimo contraste 7:1)
- No usar colores fuera de variables
- Toda la plantilla debe depender de :root
- Si no se proporcionan colores:
  - Generar automáticamente una paleta accesible

────────────────────────────────────────
5. FIDELIDAD AL CONTENIDO (ESTRICTO)
────────────────────────────────────────

- NO agregar texto
- NO resumir
- NO reinterpretar
- Respetar exactamente el contenido del Word

Si falta contenido:
- eliminar el bloque o dejarlo vacío

────────────────────────────────────────
6. DISEÑO VISUAL (PROFESIONAL)
────────────────────────────────────────

Estilo tipo Genially:

- Tarjetas (cards)
- Sombras suaves
- Bordes redondeados
- Layout limpio tipo dashboard

Elementos visuales:
- Usar únicamente SVG inline para iconos (NO librerías externas)
- Ilustraciones simples en SVG (NO pedir al usuario)
- Líneas, conectores, badges
- Indicadores visuales

────────────────────────────────────────
7. LIBRERÍAS PERMITIDAS
────────────────────────────────────────

Restricción estricta:

- ❌ NO usar librerías externas (CDN o links)
- ❌ NO usar Google Fonts
- ❌ NO usar Font Awesome
- ❌ NO usar Bootstrap
- ❌ NO usar Tailwind

✔ Solo permitido:
- HTML
- CSS puro
- JavaScript puro
- SVG inline

Objetivo:
- Máximo rendimiento
- Compatibilidad total con LMS (Moodle / Canvas)

────────────────────────────────────────
8. IMÁGENES
────────────────────────────────────────

- Usar únicamente:
  - SVG generados
  - placeholders en CSS o SVG
- NO usar imágenes externas (CDN)
- NO solicitar imágenes al usuario

────────────────────────────────────────
9. INTERACTIVIDAD (TIPO PRESENTACIÓN)
────────────────────────────────────────

Modo obligatorio: slides

- Navegación:
  - Botón siguiente
  - Botón anterior
  - Tabs opcionales

Animaciones:
- Fade
- Slide
- Scale
- Usar solo CSS o JS puro

Modales:
- Para contenido extenso
- Overlay oscuro
- Botón de cierre visible

────────────────────────────────────────
10. ACCESIBILIDAD
────────────────────────────────────────

- Fondo base: #FFFFFF
- Contraste mínimo: 7:1
- Texto mínimo: 12px
- Botones accesibles y claros

────────────────────────────────────────
11. CONTROL DE ESTRUCTURA
────────────────────────────────────────

- Agregar contenido NO debe romper el layout
- Todo debe mantenerse dentro del mismo lienzo
- PROHIBIDO scroll interno

────────────────────────────────────────
12. INTEGRACIÓN LMS
────────────────────────────────────────

- Código en un solo archivo HTML
- Compatible con Moodle y Canvas
- Optimizado para iframe

────────────────────────────────────────
13. SALIDA
────────────────────────────────────────

- Entregar solo código HTML completo
- No incluir explicaciones

────────────────────────────────────────
14. ENTRADAS
────────────────────────────────────────

Contenido del Word:
[PEGAR TEXTO AQUÍ]

Imagen de referencia:
[ADJUNTAR O DESCRIBIR]