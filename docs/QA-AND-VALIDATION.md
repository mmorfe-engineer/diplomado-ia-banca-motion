# QA y aprobación definitiva

La aprobación audiovisual V2 fue emitida por Martin Morfe el 16 de noviembre de 2026, después del refinamiento. Se registra separada de las comprobaciones automáticas: [approval.json](../deliverables/v2/approval.json). La inspección interna de imagen fue por fotogramas reales; no se hace pasar un análisis automático por visionado humano continuo.

| Control V2 | Evidencia |
|---|---|
| 1920×1080, 30 fps, H.264/AAC, 2 canales, 48 kHz | ffprobe y approval.json |
| 20.963 frames, 20.963/30 s, 26 capítulos | qa-v2.json y timeline-v2.json |
| Decodificación completa | qa_v2.py |
| 264 cues monótonos; 178 originales intactos y 25 desplazados | SRT y qa-v2.json |
| Cinco WAV, palabras, tiempos y subtítulos sin cambios | Comparación de hashes con base privada |
| 13.632 frames de prefijo y 2.325 de sufijo idénticos a V1 | Hashes de píxeles decodificados |
| Audio V1 preservado por muestras en PCM | Hash de prefijo/sufijo; AAC final recodificado |
| Cinco voces sincronizadas en AAC | Dos ventanas por voz, correlación con filtro de análisis |
| Sin negros inesperados | blackdetect; se permiten fades cortos justificados |
| −16,2 LUFS y aproximadamente −4,0 dBTP | Medición ebur128 |
| Control visual y refinamientos | QA-REFINAMIENTO.md, capturas del máster y aprobación de dirección |
| Cierre documental, seguridad y clon limpio | closure-validation.json |

```bash
npm run typecheck
npm ls --depth=0
npm run docs:check
python3 scripts/qa_v2.py
python3 scripts/close_v2_custody.py
```

QA de medios requiere los privados del autor; no se ejecuta en CI público. Esta publicación registra esas validaciones locales sin instalar un workflow activo: el token disponible no tiene scope workflow. No se afirma ejecución CI alojada. La propuesta de workflow quedó en custodia local. El cierre verifica el MP4 aprobado existente y no vuelve a codificarlo.

Typecheck verifica tipos e imports, no demuestra por sí solo corrección audiovisual. Correlaciones muestreadas no equivalen a alineación fonética certificada. La publicación de código/capturas no concede redistribución de másteres o voces. El estado CI real y el commit final se registran en el acta; los badges no afirman cobertura ni checks inexistentes.

Los informes V1 originales se conservan sin cambios en deliverables/; su release y Vimeo permanecen independientes. [Manifiesto V2](../deliverables/v2/MANIFEST.json) · [Acta](PROJECT-CLOSURE-V2.md).
