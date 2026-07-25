# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

**Equipo de finanzas y administración** del hospital: preparan, consolidan y presentan los informes financieros mensuales. Su trabajo es transformar datos crudos (planillas Excel/Google Sheets) en una narrativa financiera clara para la junta.

**Junta directiva del hospital**: recibe la presentación en vivo durante la reunión mensual. Toma decisiones de presupuesto, inversión, asignación de recursos y estrategia institucional basándose en los datos expuestos. No son necesariamente financieros de formación — necesitan claridad visual y narrativa, no tablas contables densas.

## Product Purpose

Un dashboard web interactivo que permite al equipo de finanzas cargar datos desde planillas, generar visualizaciones financieras de nivel ejecutivo, y presentarlas en vivo ante la junta directiva del hospital durante la reunión mensual. El producto reemplaza presentaciones estáticas de PowerPoint y PDFs improvisados con una herramienta viva que invita a explorar los datos en el momento.

Éxito significa: la junta entiende el estado financiero en los primeros 3 minutos de proyección, puede hacer preguntas y obtener respuestas inmediatas navegando el dashboard, y las decisiones se toman sobre datos visibles, no sobre intuición.

## Positioning

Un tablero financiero diseñado específicamente para la gobernanza hospitalaria. A diferencia de herramientas genéricas de BI (Power BI, Tableau, Looker), este producto entiende el lenguaje económico de un hospital: costo por cama-día, margen por servicio clínico, ocupación, mix de financiadores (público/privado/obra social), y glosa. No es un dashboard de contabilidad — es una herramienta de decisión para la junta.

## Operating Context

- **Preparación**: el equipo de finanzas carga datos mensuales desde planillas Excel o Google Sheets. La carga puede ser manual o por importación de archivos estructurados.
- **Presentación**: durante la reunión de junta, el dashboard se proyecta en pantalla grande. El presentador navega entre módulos (balance, KPIs, presupuesto, proyecciones) según el flujo de la reunión.
- **Frecuencia**: mensual. Cada mes se actualizan los datos del período cerrado y se comparan contra períodos anteriores y presupuesto.
- **Entorno físico**: sala de reuniones con proyector o pantalla grande. Puede haber miembros remotos de la junta.

## Capabilities and Constraints

### Capacidades confirmadas

1. **Estados contables**: balance general, estado de resultados (P&L) y flujo de caja con comparativas inter-período.
2. **KPIs y métricas operativas**: ocupación, costo por cama, márgenes por servicio/unidad de negocio, días de inventario, glosa.
3. **Presupuesto vs real**: ejecución presupuestaria contra lo planificado, con desvíos destacados visualmente.
4. **Proyecciones y escenarios**: forecasts a futuro con análisis de sensibilidad (optimista/base/pesimista).
5. **Importación desde Excel/Google Sheets**: ingesta de datos desde planillas con validación y detección de errores.
6. **Vista presentación**: modo optimizado para proyección en pantalla grande (tipografía grande, alto contraste, navegación simplificada).

### Restricciones

- La fuente primaria de datos son planillas Excel/Google Sheets. No hay integración directa con HIS o ERP en esta etapa.
- El dashboard debe funcionar en un navegador web estándar, sin instalación de software en la sala de reuniones.
- El tiempo de preparación mensual no debe exceder 2 horas para el equipo de finanzas.

### Decisiones pendientes

- [ ] Stack tecnológico (framework, librerías de visualización, hosting).
- [ ] Mecanismo de autenticación (¿usuario/contraseña o acceso abierto en red local?).
- [ ] Persistencia de datos (¿base de datos, archivos locales, localStorage?).
- [ ] ¿Se necesita exportación a PDF/Slides como complemento al dashboard en vivo?

## Brand Commitments

El hospital no tiene identidad visual definida (sin logo, sin paleta, sin tipografía corporativa). Todo el sistema visual se diseñará desde cero como parte del proyecto. La identidad debe proyectar: solidez institucional, transparencia, y seriedad médica sin frialdad clínica. La junta representa el gobierno de una institución de salud — la identidad debe estar a la altura de esa responsabilidad.

## Evidence on Hand

- No hay activos visuales previos (logos, guías de marca, assets).
- No hay implementación previa de este producto.
- Los datos reales residen en planillas Excel del equipo de finanzas (no disponibles en este momento).

## Product Principles

1. **Claridad sobre complejidad** — La junta debe entender el mensaje financiero sin esfuerzo. Cada pantalla responde una sola pregunta.
2. **Verdad visible** — Los datos mandan. No hay adornos que oscurezcan la realidad financiera. Lo positivo y lo negativo se muestran con el mismo rigor.
3. **Diseñado para la sala** — Cada decisión visual (tamaño de fuente, contraste, densidad de información) se toma pensando en una pantalla de proyección a 3 metros de distancia, no en un monitor de escritorio.
4. **Fluidez en la reunión** — La junta no espera. Navegar entre módulos, filtrar, hacer drill-down debe ser instantáneo e intuitivo para quien presenta.
5. **Mensual sin fricción** — Actualizar los datos cada mes no puede ser un proyecto. La carga debe ser simple, validada y predecible.

## Accessibility & Inclusion

- El modo presentación debe garantizar contraste suficiente para proyección (WCAG AA mínimo, preferible AAA en datos críticos).
- Las visualizaciones deben ser legibles para personas con daltonismo (no depender exclusivamente del color para transmitir información).
- La interfaz debe funcionar con navegación por teclado para el presentador.
- Si la junta incluye miembros remotos, el dashboard debe ser accesible vía navegador sin degradación significativa.
