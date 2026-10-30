# Procedencia de recursos

## Código fuente

| Elemento | Propietario | Licencia |
|---|---|---|
| Componentes React/TypeScript (`src/`) | Martin Morfe .°. | Derechos reservados |
| Scripts de producción (`scripts/`) | Martin Morfe .°. | Derechos reservados |
| Datos de sincronización (`locales/diplomado/`) | Martin Morfe .°. | Derechos reservados |

---

## Locuciones de voz

| Recurso | Origen | Distribución |
|---|---|---|
| `public/voice/diplomado/v1.wav` … `v20.wav`, `v17_18.wav` | Generadas con ElevenLabs | Derechos reservados; no distribuidas en repo público |

**Nota:** Las locuciones tienen derechos del proveedor de síntesis de voz (ElevenLabs). No se asume redistribución libre. Los archivos están excluidos del repositorio por `.gitignore`.

---

## Efectos de sonido

| Recurso | Origen | Distribución |
|---|---|---|
| `public/sfx/*.wav` (boom, click, ding, key, pad, pop, rise, shimmer, whoosh) | Generados sintéticamente con scripts propios | Generados con `npm run sfx`; no incluidos en el repo |

---

## Tipografías

| Tipografía | Propietario | Licencia | Método de distribución |
|---|---|---|---|
| Inter | Rasmus Andersson / Google | SIL Open Font License 1.1 | Cargada en tiempo de render desde Google Fonts vía `@remotion/google-fonts` |
| Outfit | Rodrigo Fuenzalida / Google | SIL Open Font License 1.1 | Cargada en tiempo de render desde Google Fonts vía `@remotion/google-fonts` |

Las tipografías no se redistribuyen como archivos; se cargan como dependencia npm en tiempo de render.

---

## Iconografía

| Elemento | Origen | Licencia |
|---|---|---|
| Íconos de Lucide React (Landmark, GraduationCap, UsersRound, etc.) | Lucide | ISC License |
| Figura humana vectorial (`Person`) | Martin Morfe .°. (SVG generativo original) | Derechos reservados |
| Componente `InstitutionalIcon` | Martin Morfe .°. | Derechos reservados |

---

## Dependencias npm

Las dependencias de terceros conservan sus licencias originales:

| Paquete | Licencia |
|---|---|
| `remotion` y `@remotion/*` | Remotion License (no OSS para producción comercial) |
| `react`, `react-dom` | MIT |
| `typescript` | Apache 2.0 |
| `lucide-react` | ISC |
| `d3-geo` | ISC |
| `topojson-client` | ISC |
| `world-atlas` | ISC |
| `@remotion/google-fonts` | MIT |

**Nota sobre Remotion:** La licencia de Remotion requiere una licencia comercial para producciones con ingresos superiores a los umbrales indicados en su sitio. Verificar los términos actuales en [remotion.dev/license](https://www.remotion.dev/license).

---

## Máster de video

| Recurso | Estado |
|---|---|
| `deliverables/diplomado-ia-01-21-final.mp4` | Propiedad del autor; disponible en Vimeo para visualización |
| `deliverables/diplomado-ia-01-21.srt` | Generado por el autor a partir de `words.json`; incluido en el repositorio |

---

## Material institucional

El programa académico del Diplomado IA Bancaria es una propuesta académica. El contenido del guion, los datos del programa (120 horas, estructura de evaluación, rutas funcionales) y la narrativa fueron definidos por el autor en consulta con los colaboradores académicos institucionales. Ningún logotipo, marca ni material gráfico de terceros institucionales se reproduce en este repositorio.

---

## Referencia NuevaMente

El motor de motion graphics está **inspirado** en el lenguaje visual y técnico del proyecto NuevaMente ([github.com/morfemartin/nuevamente-motion-video](https://github.com/morfemartin/nuevamente-motion-video)). El código de este repositorio fue escrito de forma independiente para el Diplomado IA Bancaria. No se copió código ni se redistribuyen assets de ese proyecto.
