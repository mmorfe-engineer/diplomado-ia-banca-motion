# Arquitectura V1–V2

V1: 21 escenas, 19 locuciones, cinco bloques aprobados y 15.957 fotogramas. V2 conserva ese vídeo e inserta un bloque autónomo de cinco escenas y locuciones: 26 escenas, 24 voces y 20.963 fotogramas. El máster es una salida de ensamblaje; no existe una composición que re-renderice las 26 escenas juntas.

```mermaid
flowchart TD
  L["locale.ts → diplomado.tsx"] --> T["timeline.ts + sync.ts"]
  T --> V["Video.tsx · escenas V1"]
  F["theme.ts + fx originales"] --> V
  F --> S["v2/Strategic.tsx"]
  D["v2/data.json · palabras, duraciones, frames"] --> S
  I["v2/Refinements.tsx · SVG y Lucide"] --> S
  E["v2/sfx.json · cues de sonido"] --> S
  V --> R["Root.tsx · Composition V1 por props"]
  S --> R2["Root.tsx · cinco casos y bloque V2"]
  R2 --> C["render_v2.py · chunks recuperables"]
  B["Pistas de vídeo V1 aprobadas"] --> A["assemble_v2.py · FFmpeg"]
  C --> A
  E --> A
  A --> M["Máster V2 H.264/AAC"]
  M --> Q["qa_v2.py · integridad y preservación"]
```

## Componentes y datos

`Person`, `Glass`, `Background`, `Title`, `Grad`, `Doc`, `Prism`, `InstitutionalIcon` y los FX V1 no se alteraron. La V2 utiliza `Person` con desplazamiento, mirada, expresión y escala locales; iconos Lucide funcionales; mapas world-atlas ISO 862; grafo con anclajes en bordes; gráficos SVG deterministas.

```mermaid
flowchart LR
  FX["FX y tema existentes"] --> CASE["StrategicCase"]
  CASE --> C["Caption V2 · mismas palabras del SRT"]
  CASE --> G["Bars · Grid · Chart aprobados"]
  CASE --> RF["Refinements"]
  RF --> MAP["OperationsPanel + OperationalNetwork"]
  RF --> PG["PlanningOpening + PlanningGraph"]
  RF --> IC["SemanticFlow + InstitutionalClose"]
  CASE --> SF["Sfx · efectos originales"]
```

V2 implementa su lector `cue` y su `Caption` local para no alterar `L`, `SCENES`, IDs o captions V1. Cada `Sequence` reinicia el tiempo local del caso. Las composiciones registradas son `V2-negocios`, `V2-credito`, `V2-operaciones`, `V2-planificacion`, `V2-finanzas` y `DiplomadoIA-V2-Estrategico`.

## Inserción y custodia

```mermaid
flowchart LR
  A["V1 · 01–16 · 13.632 frames"] --> B["16A Negocios"]
  B --> C["16B Crédito"] --> D["16C Operaciones"]
  D --> E["16D Planificación"] --> F["16E Finanzas + cinco áreas"]
  F --> G["V1 · 17–21 · 2.325 frames"]
```

Se concatena vídeo sin recodificar V1. El vídeo V2 armoniza metadatos SPS a BT.470BG/rango TV mediante copia de flujo. A 48 kHz y 30 fps hay 1.600 muestras por frame. La mezcla PCM conserva el prefijo/sufijo original; la salida AAC se codifica de nuevo. Las escenas 17/18 mantienen una única locución continua y sus 493 frames de separación visual interna.

[Build y render](BUILD-AND-RENDER.md) · [Sincronización](AUDIO-SYNCHRONIZATION.md) · [QA](QA-AND-VALIDATION.md).
