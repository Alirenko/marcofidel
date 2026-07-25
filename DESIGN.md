---
name: Informe Financiero Hospitalario
description: Dashboard de gobernanza financiera para junta directiva de hospital, con lenguaje visual de plano arquitectónico.
colors:
  architectural-white: "#FAF9F6"
  surface-warm: "#F4F2ED"
  ink-full: "#1A1D20"
  ink-soft: "#4A4D52"
  ink-muted: "#7A7D82"
  blueprint-blue: "#1B5E84"
  blueprint-blue-soft: "#3A7DA3"
  blueprint-blue-pale: "rgba(27, 94, 132, 0.06)"
  structural-rule: "rgba(27, 94, 132, 0.12)"
  structural-rule-light: "rgba(27, 94, 132, 0.06)"
  drafting-grid: "rgba(27, 94, 132, 0.03)"
  alert-red: "#B83A2E"
  positive-green: "#2D6A4F"
  annotation-gold: "#8B6914"
typography:
  data:
    fontFamily: "'JetBrains Mono', 'Consolas', monospace"
    fontSize: "0.8125rem"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "-0.02em"
  ui:
    fontFamily: "'Work Sans', system-ui, -apple-system, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "normal"
  heading:
    fontFamily: "'Barlow Semi Condensed', system-ui, sans-serif"
    fontSize: "1.75rem"
    fontWeight: 600
    lineHeight: 1.15
    letterSpacing: "-0.01em"
  narrative:
    fontFamily: "'Source Serif 4', 'Georgia', serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
rounded:
  drafting: "2px"
  blueprint: "4px"
spacing:
  sheet-padding: "60px 48px 100px 48px"
  section-gap: "40px"
  component-gap: "24px"
  rule-gap: "16px"
  tight-gap: "8px"
components:
  nav-sheet:
    backgroundColor: transparent
    textColor: "{colors.ink-soft}"
    typography: "{typography.ui}"
    rounded: "{rounded.drafting}"
    padding: "10px 12px"
  nav-sheet-active:
    backgroundColor: "{colors.blueprint-blue-pale}"
    textColor: "{colors.ink-full}"
  metric-card:
    backgroundColor: transparent
    textColor: "{colors.ink-full}"
    padding: "24px 24px 20px"
  data-table-cell:
    backgroundColor: transparent
    textColor: "{colors.ink-full}"
    typography: "{typography.data}"
    padding: "10px 16px"
  sheet-btn:
    backgroundColor: "{colors.architectural-white}"
    textColor: "{colors.ink-soft}"
    rounded: "{rounded.blueprint}"
    size: "40px 40px"
  kpi-item:
    backgroundColor: transparent
    textColor: "{colors.ink-full}"
    padding: "28px 32px"
---

# Design System: Informe Financiero Hospitalario

## Overview

**Creative North Star: "El Plano de Corte"**

El dashboard toma prestado el lenguaje visual más estructural que conoce una junta de hospital: los planos arquitectónicos con los que gobierna el edificio mismo. Cada módulo financiero es una lámina numerada. Cada cifra es una cota medida con precisión de mesa de dibujo. La institución se revela como estructura — sus ingresos, sus costos, sus márgenes — mediante líneas finas, anotaciones precisas y una economía visual que rechaza todo adorno.

La identidad es sobria por convicción, no por omisión. El blanco arquitectónico del papel de dibujo como suelo; el azul estructural como único acento; las líneas finas como lenguaje primario de separación. No hay sombras, no hay gradientes, no hay tarjetas flotantes. La jerarquía se construye con peso tipográfico, posición y espacio. El rojo existe solo para marcar umbrales — como la línea de un signo vital que cruza el límite.

El sistema está diseñado para proyección en sala de juntas: tipografía que se lee a tres metros, contraste que sobrevive a un proyector envejecido, y una densidad de información que permite al presentador narrar, no leer.

**Key Characteristics:**
- Lenguaje visual de plano arquitectónico: líneas finas, cotas, anotaciones, láminas numeradas
- Un solo acento cromático (azul estructural) sobre fondo blanco arquitectónico
- Sin sombras — la separación es por reglas y espacio, no por elevación
- JetBrains Mono para toda cifra financiera; Work Sans para etiquetas institucionales; Barlow Semi Condensed para títulos de lámina; Source Serif 4 para anotaciones narrativas
- Grid de dibujo técnico sutil como textura de fondo
- Modo presentación que escala todo el sistema para proyección en sala
- Bordes rectos o apenas suavizados (2–4 px) — la precisión del dibujo técnico

## Colors

Una paleta contenida donde un solo color — el azul estructural del plano — carga todo el acento. Los neutros son cálidos (blanco papel, grises entintados), nunca fríos ni clínicos. El rojo y el verde existen como señales, no como decoración.

### Primary
- **Azul Estructural / Blueprint Blue** (#1B5E84): El único acento cromático del sistema. Marca la lámina activa en la navegación, tiñe las barras de los gráficos, colorea los códigos de lámina (L-01, L-02). Su versión clara (#3A7DA3) se usa en estados hover. Su versión más pálida (rgba al 6%) es el fondo de elementos activos. Su versión al 12% y 6% de opacidad son las líneas de regla horizontales y verticales. Su versión al 3% es el grid de dibujo.

### Neutral
- **Blanco Arquitectónico / Architectural White** (#FAF9F6): El suelo de cada lámina. Un blanco cálido — no frío ni azulado — que evoca el papel de dibujo técnico. Fondo de la hoja principal y de los botones de navegación.
- **Superficie Cálida / Surface Warm** (#F4F2ED): Un tono apenas más bajo que el blanco arquitectónico. Fondo de la barra lateral de navegación y superficies secundarias.
- **Tinta Plena / Ink Full** (#1A1D20): Color de texto principal. Un negro azulado profundo, no negro puro — como la tinta de un plotter de arquitectura.
- **Tinta Suave / Ink Soft** (#4A4D52): Texto secundario, etiquetas de navegación, contexto de métricas. Contraste suficiente (>7:1 sobre el blanco arquitectónico).
- **Tinta Apagada / Ink Muted** (#7A7D82): Texto terciario, unidades de medida, códigos de lámina inactivos. Suficiente para AA (>4.5:1).

### Semantic
- **Rojo de Alerta / Alert Red** (#B83A2E): Variaciones negativas, desvíos presupuestales que exceden el umbral, líneas de threshold en KPIs. Un rojo ladrillo — no un rojo brillante de alerta de sistema — que pertenece al mundo de las anotaciones de corrección sobre planos.
- **Verde Positivo / Positive Green** (#2D6A4F): Variaciones positivas, flujo operativo favorable. Un verde apagado, botánico, como el sello de aprobación de una oficina técnica.
- **Oro de Anotación / Annotation Gold** (#8B6914): Notas al margen y anotaciones que no son ni positivas ni negativas — observaciones, contexto. El color del lápiz de un revisor de planos.

### Named Rules
**La Regla del Acento Único.** El azul estructural es el único color no-neutro en la superficie. Rojo y verde aparecen exclusivamente en datos (deltas, variaciones, thresholds) — jamás como decoración ni en elementos de UI. Un botón, una pestaña, un borde decorativo nunca son rojos ni verdes.

**La Regla de las Líneas, No Sombras.** La separación entre elementos se logra con líneas finas (1px, rgba del azul estructural al 6–12%) y espacio. Jamás con sombras, elevación o tarjetas flotantes. El sistema es plano por definición.

## Typography

Cuatro voces tipográficas con roles fijos e inconfundibles. La regla es simple: toda cifra financiera va en monoespaciada; toda etiqueta de interfaz va en sans-serif institucional; todo título de sección va en condensada; toda nota narrativa va en serif.

**Display Font:** Barlow Semi Condensed (con system-ui fallback)
**Body / UI Font:** Work Sans (con system-ui, -apple-system fallback)
**Data Font:** JetBrains Mono (con Consolas, monospace fallback)
**Narrative Font:** Source Serif 4 (con Georgia, serif fallback)

**Character:** La mesa de dibujo hecha tipografía. Barlow Semi Condensed aporta la voz arquitectónica — condensada, precisa, con el peso justo para títulos de lámina. Work Sans es la voz institucional — limpia, neutral, diseñada para lectura funcional. JetBrains Mono es el instrumento de medición — cada cifra ocupa el mismo ancho, alineada como una columna de cotas. Source Serif 4 es la voz del revisor — las anotaciones al margen, el contexto que humaniza el dato.

### Hierarchy
- **Heading** (Barlow Semi Condensed, 600, 1.75rem, line-height 1.15): Título de lámina (L-01 Balance General, L-02 Estado de Resultados). Solo uno por lámina.
- **Section Title** (Barlow Semi Condensed, 600, 0.875rem, letter-spacing 0.06em, uppercase): Separadores de sección dentro de una lámina (Activo, Pasivo, Ingresos). Llevan línea de regla inferior.
- **Metric Value** (JetBrains Mono, 500, 1.75rem–2.25rem, letter-spacing -0.02em): Cifras grandes en tarjetas de métrica y KPIs. La jerarquía se construye con tamaño (1.75rem en métricas, 2.25rem en KPIs).
- **Body / UI** (Work Sans, 400, 0.8125rem): Etiquetas, navegación, cuerpo de tablas. Medida máxima de 68 caracteres para texto corrido.
- **Data Cell** (JetBrains Mono, 400, 0.8125rem): Cifras dentro de tablas de datos. Alineación derecha consistente.
- **Narrative Annotation** (Source Serif 4, 400 italic, 0.75rem–0.9375rem): Contexto debajo de gráficos, notas al margen, subtítulos de lámina. Siempre en itálica — la voz del revisor, no del autor.
- **Label** (Work Sans, 500, 0.6875rem, letter-spacing 0.08em, uppercase): Etiquetas de tarjetas de métrica y KPIs. Tracking generoso para legibilidad a distancia.

### Named Rules
**La Regla de la Cifra Monoespaciada.** Toda cifra financiera — en métricas, tablas, gráficos, tooltips — se compone en JetBrains Mono. Ninguna otra familia muestra números en este sistema.

**La Regla de la Anotación en Itálica.** Todo texto de contexto, interpretación o narrativa se compone en Source Serif 4 itálica. La voz que comenta nunca compite con la voz que informa.

## Layout

El dashboard sigue un modelo de dos paneles fijos: barra lateral de navegación (240px, reducida a 200px en modo presentación) + hoja de dibujo principal que ocupa el espacio restante. La hoja principal scrollea verticalmente; la barra lateral es fija.

Cada lámina se compone dentro de un contenedor centrado de ancho máximo 960px (1100px en modo presentación). El grid de dibujo técnico (celdas de 32px) cubre todo el fondo como textura sutil, recordando el papel milimetrado de una mesa de dibujo. El bloque de título (tipo plotter) se ancla en la esquina superior derecha.

La densidad es baja-media: los datos respiran. Cada sección tiene 40px de separación vertical. Las métricas de resumen usan un grid responsive que va de 1 a 4 columnas según el ancho disponible.

El comportamiento responsive (breakpoint 900px) convierte la barra lateral en una barra horizontal superior, oculta el bloque de título y reduce el padding a 32px 20px. En ≤500px las métricas colapsan a una columna.

### Spacing Rhythm
- 60px: padding superior de la hoja
- 48px: padding horizontal de la hoja
- 100px: padding inferior (espacio para controles de navegación)
- 40px: separación entre secciones
- 24px: padding interno de tarjetas de métrica
- 16px: separación entre elementos relacionados
- 8px: espacio mínimo (gap entre botones, unidades de medida)

## Elevation & Depth

**Este sistema es plano.** No utiliza sombras, elevación ni capas visuales. La jerarquía espacial se construye exclusivamente con líneas de regla (1px, azul estructural al 6–12% de opacidad) y espacio negativo. La barra lateral se separa del contenido con una línea de borde, no con una sombra. Los elementos activos se distinguen por un indicador lineal de 2px en el borde — nunca por elevación.

El grid de dibujo en el fondo es la única concesión a la profundidad, y funciona como textura, no como capa.

### Named Rules
**La Regla de Separación por Línea.** Dos superficies adyacentes se separan con una línea de 1px en el color de regla estructural. Nunca con sombra, diferencia de color de fondo, ni blur. Si la línea no alcanza, el elemento necesita más espacio, no más decoración.

## Shapes

El lenguaje formal es el del dibujo técnico: esencialmente recto, con curvatura mínima donde la legibilidad lo exige. Los bordes son cuadrados o apenas redondeados — 2px para elementos pequeños (botones de navegación, celdas activas), 4px para botones de acción. Las tarjetas de métrica y los items de KPI no tienen bordes redondeados ni contenedor visible — su separación es por líneas de regla internas.

Las tablas de datos usan bordes de celda finos (1px, regla estructural ligera) sin radio. Los gráficos usan barras con esquinas apenas suavizadas (2px) para mantener la precisión del dibujo técnico sin bordes agresivos.

No hay siluetas orgánicas, círculos decorativos, chips redondeados ni pills en este sistema. Cada forma pertenece a la mesa de dibujo o no pertenece.

## Components

### Navigation — Barra Lateral de Láminas
La navegación es un índice de láminas numeradas (L-01 a L-06) en una barra lateral fija. Cada ítem muestra un código monoespaciado (L-01) y una etiqueta en Work Sans. La lámina activa recibe un fondo azul pálido y un indicador lineal de 2px en azul estructural a la izquierda. El hover tiñe el fondo con el azul más pálido.

En móvil, la barra se convierte en un scroll horizontal de pestañas con el indicador activo en la parte inferior.

### Metric Card
Contenedor sin borde ni sombra que agrupa: etiqueta superior en tracking expandido, valor grande en JetBrains Mono con unidad, y delta opcional (↑/↓ con color semántico). Separadas entre sí por líneas de regla verticales (en desktop) u horizontales (en mobile).

### KPI Item
Variante de mayor jerarquía que la metric card. Ocupa media grilla (2 columnas en desktop). Incluye el valor en 2.25rem, contexto narrativo en Source Serif 4 itálica, y opcionalmente una anotación vertical de threshold en rojo en la esquina derecha. Separadores por líneas de regla en ambos ejes.

### Data Table
Tablas de precisión contable con líneas finas. Cabeceras en Work Sans tracking expandido, uppercase. Celdas de datos en JetBrains Mono con alineación derecha. La columna de concepto (primera) va en Work Sans alineada a la izquierda. Las filas de total llevan borde superior de 1px y borde inferior de 2px en regla estructural.

### Sheet Button (Prev / Next)
Botones cuadrados de 40px con borde de 1px en regla estructural y fondo blanco arquitectónico. Contienen iconos SVG de flecha. En hover: borde y texto cambian a azul estructural, fondo a azul pálido. Focus visible: outline azul de 2px con offset.

### Chart Container
Los gráficos (Chart.js) heredan la paleta del sistema: barras y líneas en azul estructural, verde positivo o rojo de alerta según el contexto. Fondos transparentes. Grid de gráfico usa líneas en regla estructural ligera (rgba al 6%). Tooltips en fondo tinta plena con texto blanco y cifras en JetBrains Mono. Sin sombras en tooltips.

### Annotation Line
Elemento distintivo del sistema: una línea horizontal corta (24px) seguida de texto narrativo en Source Serif 4 itálica. Simula las líneas de cota de un plano — conecta visualmente un valor con su interpretación. Se usa al pie de tablas y secciones para anotar totales o comentarios.

## Do's and Don'ts

### Do:
- **Do** usar JetBrains Mono para toda cifra financiera — en métricas, tablas, tooltips y gráficos.
- **Do** separar elementos con líneas de 1px en regla estructural (rgba del azul al 6–12%). La línea es el lenguaje del sistema.
- **Do** mantener el azul estructural como único acento cromático en UI. Rojo y verde solo en datos.
- **Do** usar el modo presentación (tecla P o botón) cuando el dashboard se proyecte en sala de juntas.
- **Do** numerar las láminas (L-01 a L-06) y mantener el orden secuencial — la junta recorre la historia financiera en ese orden.
- **Do** anotar totales y contexto con el componente annotation-line: la línea de cota que conecta el dato con su significado.
- **Do** respetar el ancho máximo de lámina (960px estándar, 1100px presentación). Más ancho diluye la precisión del dibujo.

### Don't:
- **Don't** agregar sombras, elevación, tarjetas flotantes ni glass effects. El sistema es plano.
- **Don't** usar gradientes como decoración. Si un gradiente aparece, es porque un gráfico de área lo requiere para mostrar rango — y usa opacidad <8%.
- **Don't** introducir un segundo color de acento en la UI. Un botón verde, una pestaña naranja, un badge rojo rompen la economía cromática.
- **Don't** usar tipografías display (serif grandes, script, decorativas) para títulos de lámina. Barlow Semi Condensed es la única voz para headings.
- **Don't** exceder 6 láminas sin una razón de producto confirmada. Cada lámina adicional diluye la narrativa secuencial.
- **Don't** centrar cifras en tablas. Toda cifra financiera va alineada a la derecha — como en un plano, donde las cotas se leen desde su extremo.
- **Don't** mostrar más de 4 métricas en una fila de resumen. La junta necesita jerarquía, no un tablero de avión.
