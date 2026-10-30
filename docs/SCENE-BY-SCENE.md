# Guía de escenas

Descripción técnica de las 21 escenas del piloto. Los valores de duración son aproximados basados en las duraciones de locución de `voices.json` más los tiempos de pre-roll y cola definidos en `diplomado.tsx`. Los cues son palabras reales verificadas en el código fuente.

---

## Bloque 01-02 · `DiplomadoIA-Revision01-02`

### Escena 01 · S1.tsx
**Etiqueta:** INTELIGENCIA ARTIFICIAL APLICADA A LA BANCA  
**Locución:** v1 (27.01 s) · pre: 0.6 s · cola: 0.9 s  
**Contenido narrativo:** Apertura. Contrasta "plataformas y automatización" con el conocimiento humano como recurso más valioso. Termina con "Conocimiento humano. Proyectos de digitalización."

**Cues de animación verificados:**
| Palabra cue | Elemento activado |
|---|---|
| `plataformas` | Glass panel — Plataformas |
| `automatización` | Glass panel — Automatización |
| `conocimiento` | Transición: human phase |
| `convertir` | Movimiento de iconos a posición lineal |
| `oportunidades` | Prism — dispersión de luz |
| `proyectos` | Transición a card final |

**Componentes FX:** `Background(blue)` · `Glass` × 2 · `Title` × 4 · `Prism` · `InstitutionalIcon` × 3 · `Sfx`(pop, whoosh, shimmer, ding)

---

### Escena 02 · S2.tsx
**Etiqueta:** Isabel — componente humano  
**Locución:** v2 (23.17 s) · pre: 0.6 s · cola: 1.2 s  
**Contenido narrativo:** Presenta a Isabel como representación de los profesionales bancarios. Establece el personaje central de la narrativa.

**Componentes FX:** `Background` · `Person` · `Glass` · `Title` · `Sfx`

---

## Bloque 03-06 · `DiplomadoIA-Revision03-06`

### Escena 03 · S3.tsx
**Etiqueta:** Principios de aprendizaje  
**Locución:** v3 (24.19 s) · pre: 0.6 s · cola: 0.9 s  
**Contenido narrativo:** Principios pedagógicos del programa.

---

### Escena 04 · S4.tsx
**Etiqueta:** Alianza institucional  
**Locución:** v4 (29.23 s) · pre: 0.6 s · cola: 0.9 s  
**Contenido narrativo:** Marco de colaboración institucional para el Diplomado.

---

### Escena 05 · S5.tsx
**Nota:** Doble locución — v5a + v5b (en locale `es`); en el locale `diplomado` usa v5 unificado (28.53 s).  
**Locución es:** v5a · gap 1.0 s · v5b · pre: 0.8 s · cola: 1.6 s  
**Contenido narrativo:** Rutas formativas del programa.

---

### Escena 06 · S6.tsx
**Locución:** v6 (29.39 s) · pre: 1.0 s · cola: 1.2 s  
**Contenido narrativo:** Arquitectura general del programa académico. Preparación para el detalle de escenas 7–16.

---

## Bloque 07-10 · `DiplomadoIA-Revision07-10`

### Escena 07 · Block07_10.tsx → `S7`
**Etiqueta:** ALIANZA ACADÉMICA Y ORGANIZACIONAL  
**Locución:** v7 (29.57 s) · pre: 0.6 s · cola: 0.9 s  
**Contenido narrativo:** Presenta los tres actores de la alianza: PSICOSERVICIOS, ENAHP, El banco. Cierra con "Fortalecer las capacidades desde adentro."

**Tres actores:**
| Actor | Color | Cue palabra |
|---|---|---|
| PSICOSERVICIOS | `C.blue` | "PSICOSERVICIOS" |
| Escuela Nacional de Administración y Hacienda Pública IUT | `C.green` | "Escuela" |
| El banco | `C.orange` | "protagonista" |

**Componentes FX:** `Background(blue)` · `Glass` × 3 · `InstitutionalIcon`(BriefcaseBusiness, GraduationCap, Landmark) · `Title` · SVG arcos de conexión

---

### Escena 08 · Block07_10.tsx → `S8`
**Etiqueta:** BASE COMPARTIDA · MÓDULOS 1 Y 2  
**Locución:** v8 (28.19 s) · pre: 0.6 s · cola: 0.9 s  
**Contenido narrativo:** Módulos base del programa. Módulo 1: Gobernanza y cambio (Gobernanza, Ética, Privacidad, Riesgos, Gestión del cambio). Módulo 2: Fundamentos de IA (Inteligencia artificial, Cultura de datos, Aplicaciones, Limitaciones, Regulaciones). Cierra: "Antes de formular proyectos, una base común."

**Cues de animación:**
| Palabra | Elemento |
|---|---|
| `primer` | Glass panel módulo 1 |
| `segundo` | Glass panel módulo 2 |
| `Antes` | Transición a síntesis final |

---

### Escena 09 · Block07_10.tsx → `S9`
**Etiqueta:** CUATRO RUTAS FUNCIONALES  
**Locución:** v9 (27.64 s) · pre: 0.6 s · cola: 0.9 s  
**Contenido narrativo:** Segmentación del programa en cuatro rutas funcionales con pertinencia diferenciada.

**Cuatro rutas (tal como aparecen en pantalla):**
| # | Ruta | Color | Cue |
|---|---|---|---|
| 1 | Riesgo y Cumplimiento | `C.blue` | "Riesgo" |
| 2 | Planificación y Mejora Continua, Productos y Servicios | `C.green` | "Planificación" |
| 3 | Operaciones y Finanzas | `C.blue` | "Operaciones" |
| 4 | Tecnología y Seguridad de la información | `C.green` | "Tecnología" |

**Iconografía:** ShieldCheck, ChartNoAxesCombined, ArrowLeftRight, ServerCog

---

### Escena 10 · Block07_10.tsx → `S10`
**Etiqueta:** EVALUACIÓN DEL APRENDIZAJE  
**Locución:** v10 (24.69 s) · pre: 0.6 s · cola: 1.2 s  
**Contenido narrativo:** Modelo de evaluación 20/20/60. Cierra: "Aprobar demuestra aprendizaje y criterio."

**Componentes de evaluación:**
| % | Componente | Cue | Color |
|---|---|---|---|
| 20 % | Comprensión continua | "veinte" (1a aparición) | `C.blue` |
| 20 % | Actividades y tutorías | "veinte" (2a aparición) | `C.green` |
| 60 % | Proyecto integrador y defensa | "sesenta" | `C.orange` |

**Animación:** barras de progreso con `Math.round(pct * p)` para conteo animado.

---

## Bloque 11-16 · `DiplomadoIA-Revision11-16`

### Escena 11 · Block11_16.tsx → `S11`
**Etiqueta:** PRIMER CICLO · 120 HORAS ACADÉMICAS PREVISTAS  
**Locución:** v11 (29.96 s) · pre: 0.6 s · cola: 0.9 s  
**Contenido narrativo:** Estructura del primer ciclo de 120 horas. Cierra: "Entornos de enseñanza externos a la plataforma bancaria."

**Distribución de horas:**
| Módulo | Horas | Institución | Cue |
|---|---|---|---|
| Inmersión presencial | 20 h | ENAHP | "inmersión" |
| Formación y acompañamiento | 60 h | Moodle | "Moodle" |
| Proyecto integrador | 40 h | — | "dedicadas" |

**Animación:** contadores animados con `Math.round(hours * q)`.

---

### Escena 12 · Block11_16.tsx → `S12`
**Etiqueta:** SEGUNDO CICLO · DE LA OPORTUNIDAD A LA PROPUESTA  
**Locución:** v12 (25.31 s) · pre: 0.6 s · cola: 0.9 s  
**Contenido narrativo:** Proceso del segundo ciclo en 5 pasos + defensa. Cierra: "Defender la pertinencia. Argumentar las condiciones."

**Cinco pasos del ciclo:**
| Paso | Título | Cue |
|---|---|---|
| 1 | Oportunidad | "oportunidad" |
| 2 | Problema y requisitos | "problema" |
| 3 | Factibilidad | "factibilidad" |
| 4 | Riesgos y controles | "riesgos" |
| 5 | Propuesta académica | "propuesta" |

---

### Escena 13 · Block11_16.tsx → `S13`
**Etiqueta:** ISABEL · SEGURIDAD BANCARIA  
**Locución:** v13 (22.28 s) · pre: 0.6 s · cola: 0.9 s  
**Contenido narrativo:** Caso didáctico: Isabel debe reponer su carnet de identificación. Presenta el proceso actual (requisitos, motivo, validaciones) y plantea la pregunta de mejora: "¿Orientación más ágil con los controles necesarios?"

**Nota ortográfica verificada:** "carnet" — grafía venezolana aprobada.

---

### Escena 14 · Block11_16.tsx → `S14`
**Etiqueta:** PROPUESTA DE ESTUDIO · ALCANCE ACADÉMICO  
**Locución:** v14 (26.44 s) · pre: 0.6 s · cola: 0.9 s  
**Contenido narrativo:** Hipótesis de solución: Informar requisitos, Orientar solicitudes, Facilitar seguimiento. Cierra: "Mirar más allá de la herramienta" — automatizar y digitalizar con impacto en el banco y respeto a normativa financiera.

---

### Escena 15 · Block11_16.tsx → `S15`
**Etiqueta:** SIMULACIÓN ACADÉMICA · SIN CONEXIÓN A SISTEMAS BANCARIOS  
**Locución:** v15 (26.83 s) · pre: 0.6 s · cola: 0.9 s  
**Contenido narrativo:** Demostración sintética del asistente conversacional (académica, sin conexión a sistemas bancarios reales). Muestra interfaz de chat simulada con opciones: Requisitos, Inicio del trámite, Seguimiento. Nota en pantalla: "Decisiones y validaciones humanas." Cierra: "El cambio está en Isabel y en su criterio profesional."

**Disclaimer visual verificado:** "ASISTENTE · DEMOSTRACIÓN SINTÉTICA" y "Decisiones y validaciones humanas" visibles en pantalla.

---

### Escena 16 · Block11_16.tsx → `S16`
**Etiqueta:** RESULTADO EDUCATIVO · PROPUESTA PARA EVALUACIÓN  
**Locución:** v16 (26.51 s) · pre: 0.6 s · cola: 1.2 s  
**Contenido narrativo:** Ficha académica de proyecto como resultado educativo. Seis campos: Problema, Hipótesis de solución, Requisitos, Factibilidad, Privacidad y seguridad, Mejora esperada y controles. Cierra: "Una ficha que los especialistas pueden examinar con rigor."

---

## Bloque 17-21 · `DiplomadoIA-Revision17-21`

### Escenas 17-18 · Block17_21.tsx → `S17_18` (locución compartida)
**Locución:** v17_18 (32.13 s) · SPLIT en fotograma 493 · pre s17: 0.6 s · cola s18: 0.9 s

**Escena 17:**  
**Etiqueta:** EXPERIENCIA FORMATIVA EN VENEZUELA  
Institución financiera anónima ubicada entre los diez primeros del ranking bancario nacional.  
Contadores animados: **60+ profesionales participantes** · **21 proyectos factibles desarrollados y defendidos**

**Escena 18:**  
**Etiqueta:** BANCO DE PROYECTOS DE DIGITALIZACIÓN  
Proyectos organizados, actualmente en revisión. Cierra: "Resultados formativos. Talento motivado."  
Nota verificada: el texto en pantalla dice "Actualmente en revisión" — sin afirmar implementaciones.

---

### Escena 19 · Block17_21.tsx → `S19`
**Etiqueta:** EMBAJADORES DIGITALES · CONTRIBUCIÓN PROFESIONAL  
**Locución:** v19 (25.00 s) · pre: 0.6 s · cola: 0.9 s  
**Contenido narrativo:** Profesionales como embajadores digitales. Conexión con áreas técnicas y de control. Nota: "Roles y atribuciones se conservan." Cierra: "Conocimiento del proceso. Propuestas bien estructuradas."

---

### Escena 20 · Block17_21.tsx → `S20`
**Etiqueta:** DIPLOMADO EN INTELIGENCIA ARTIFICIAL APLICADA A LA BANCA  
**Locución:** v20 (5.56 s) · pre: 0.6 s · cola: 1.2 s  
**Contenido narrativo:** Cierre narrativo. Transición dual:
- Primera parte: "La tecnología abre posibilidades."
- Segunda parte (cue "gente"): "Su gente transforma el banco."

**Locución de cierre aprobada:** "Porque la tecnología abre posibilidades, pero es su gente la que transforma el Banco."

---

### Escena 21 · Block17_21.tsx → `S21`
**Etiqueta:** CRÉDITOS AUDIOVISUALES  
**Locución:** silence (10 s) · sin voz  
**Contenido:** Efecto Prism central con créditos emergentes.

**Texto verificado de créditos:**
```
Dirección Creativa y Realización Audiovisual
Martin Morfe .°.
morfe.studio
eskol@protonmail.com
Octubre 2026
```

**Componentes:** `Background(blue)` · `Prism` · texto Inter/Outfit con animación `prog`

---

## Resumen técnico de duraciones

| Bloque | Escenas | Locuciones | Duración aprox. |
|---|---|---|---|
| 01-02 | s1, s2 | v1, v2 | ~52 s |
| 03-06 | s3–s6 | v3–v6 | ~117 s |
| 07-10 | s7–s10 | v7–v10 | ~113 s |
| 11-16 | s11–s16 | v11–v16 | ~156 s |
| 17-21 | s17_18, s19, s20, s21 | v17_18, v19, v20, silence | ~93 s |
| **Total** | **21** | **19 locuciones** | **~531 s (8:51)** |

> Las 19 locuciones son: v1–v16, v17_18, v19, v20. Scenes 17 y 18 comparten v17_18.
