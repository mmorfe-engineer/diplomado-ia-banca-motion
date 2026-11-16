> **Cierre 2026-11-16:** producto audiovisual aprobado definitivamente por dirección. El texto siguiente conserva el registro de producción; las referencias antiguas a aprobación/publicación pendiente fueron superadas por [el acta de cierre](../PROJECT-CLOSURE-V2.md).

# Máster V2 optimizado · Listo para revisión

16 de noviembre de 2026 · Martin Morfe · morfe.studio

Referencia base conservada en `out/v2/base-revision-90/`. Refinamiento editorial y audiovisual documentado en REFINAMIENTO.md.

QA técnico PASS. Aprobación artística y escucha perceptual completa pendientes del director. No se publicó ni se modificó el remoto.

## Archivos locales

- Máster: `out/v2/diplomado-ia-v2-final.mp4`.
- Bloque nuevo: `out/v2/bloque-estrategico.mp4`.
- Cinco previews: `out/v2/preview-{negocios,credito,operaciones,planificacion,finanzas}.mp4`.
- Subtítulos: `out/v2/diplomado-ia-v2.srt` y `deliverables/v2/diplomado-ia-v2.srt`.
- Timeline y capítulos: `out/v2/timeline-v2.json`, `out/v2/capitulos.ffmetadata`.
- Contacto: `out/v2/hoja-de-contacto.png`; uniones/créditos: `out/v2/uniones-y-final.png`.
- Informes y manifiesto: `deliverables/v2/`.

## Métricas verificadas

20.963 fotogramas · 698,766667 s (11:38,767) · 1920×1080 · 30 fps · H.264 High / AAC estéreo 48 kHz. 26 unidades narrativas, 24 locuciones, 264 cues SRT, 26 capítulos. Cinco secuencias nuevas: 5.006 fotogramas (166,866667 s). Las cinco voces duran 159,29475 s antes de pre-roll/colas.

SHA-256 del máster V2: `06665a81e4968434acac12cb9c319d71d1787b42fceb1b8e207076fdcf4d8be5`.

V1 SHA-256 intacto: `0f9d610c65a5663a3ae0ab380c309fcf256339997ee4f6d4c5f6c07b1b7c9b19`. Todos los fotogramas V1 se preservan sin recodificación: prefijo 13.632/13.632 y sufijo 2.325/2.325 idénticos por píxel. Prefijo y sufijo de audio idénticos por muestras en el intermedio PCM; el AAC final se recodifica. Correlaciones de las cinco voces nuevas verificadas en el máster. Sin clipping esperado ni negros inesperados; mediciones completas en out/v2/loudness.txt y QA.

## Puntos de revisión

Inserción desde 07:34,400 hasta 10:21,267. Negocios 07:34,400; Crédito 08:08,267; Operaciones 08:40,467; Planificación 09:12,733; Finanzas 09:46,767. Escena 17 original desde 10:21,267; 17/18 mantienen su voz continua y créditos conservan ausencia de narración.

La aprobación de ritmo, continuidad perceptual y dirección artística requiere reproducir el máster completo. La revisión interna de imagen fue por muestreo de fotogramas reales; el análisis automático no equivale a escucha humana. El TXT de Crédito no estaba en el paquete: su texto se documentó desde el MP3 recibido. Las otras cuatro locuciones se contrastaron con sus TXT; Planificación ya usa Simulador de Impacto Estratégico.

## Reproducción comprobada

`npm run typecheck`; `python3 scripts/render_v2.py full`; `python3 scripts/assemble_v2.py`; `python3 scripts/review_v2_artifacts.py`; `python3 scripts/qa_v2.py`; `python3 scripts/finish_v2_docs.py`. Véanse PRODUCCION.md, STORYBOARD.md, ENTORNO.txt y checkpoint en out/v2/. Requiere fuentes privadas V1 y V2. Variables V2_PACKAGE, V2_V1_ROOT y V2_BROWSER permiten configurar las fuentes de sólo lectura y el navegador.

Estado Git: cambios locales sin commit; rama feature/v2-strategic-use-cases. Ninguna operación de push, release o Vimeo. Máster y audios excluidos de Git.
