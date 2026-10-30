# Continuidad de producción · 28 de octubre de 2026

## Estado recuperado

Última escena completada: **06**. Se conservan S1–S6, voces v1–v6, los MP4 de revisión 01–02 y 03–06, SRT, fotogramas y QA PASS. Los hashes actuales de ambos MP4 coinciden con sus informes. Los 19 originales coinciden con el manifiesto. Registro de preservación: `out/recuperacion-2026-10-28.json`.

No hay escenas bancarias 07–21 ni renders posteriores a 06 en el estado recuperado. Las S7/S8 originales del motor no representan esas escenas bancarias y se conservan. El último registro disponible documenta el cierre del QA de 03–06. No se puede establecer el comando exacto interrumpido a partir de esos archivos; no se encontró un proceso de producción activo. Esta sesión no contiene el historial completo de la terminal anterior.

Las aprobaciones del usuario mantienen 01–02 aprobadas visual y editorialmente, 03–06 aprobadas visualmente y autorizan producir 07–21. No se realizan commits ni publicaciones.

## Continuación

Primer bloque: 07–10. Fuentes originales verificadas; copias WAV nuevas, completas y normalizadas, sin modificar las anteriores. Preparación incremental: `scripts/continue_diplomado.py`. Las transcripciones candidatas se guardan separadas en `out/` hasta cotejo editorial. Nuevas escenas en `src/scenes/diplomado/`, utilizando los componentes, fuentes, paleta y sincronización existentes.

Controles por bloque: cotejo de voz/guion, tiempos por palabra, comprobación de cues, TypeScript, MP4 completo, correspondencia de audio, SRT y revisión de fotogramas. No se da por aprobado un render por el solo hecho de existir. La pista 17_18 permanece única hasta auditar el punto de transición.


## Avance de esta sesión

Se implementaron las escenas 07–21 en tres archivos nuevos de `src/scenes/diplomado/`, sin modificar S1–S6. Se prepararon todas las voces restantes a partir de los originales verificados; transcripciones candidatas preservadas en `out/`. Se cotejaron los subtítulos; se corrigieron errores de reconocimiento y representación de cifras, sin sintetizar ni recortar voces. Las variantes 07 («selecciona el talento») y 08 («experiencias significativas») fueron aprobadas explícitamente por el usuario y verificadas con una segunda transcripción; versiones anteriores y aprobaciones en `docs/editorial/`.

Los tres bloques nuevos pasan la revisión previa de texto, tiempos y preservación. Sus SRT y cronologías están en `out/revision-07-10/`, `out/revision-11-16/` y `out/revision-17-21/`. TypeScript y `git diff --check` pasan. Se inspeccionaron vistas previas de 11–21, además de dos fotogramas del render recuperado de 07–08. Esto **no equivale a QA de MP4 completo ni a aprobación audiovisual**.

17–18: una sola reproducción de `v17_18.wav`, conservada completa. Transición visual en fotograma 493 del bloque (15,833333 s de la fuente, antes de «Y cuya iniciativa»); la frase fue cotejada mediante una segunda transcripción. No se parte, reinicia ni duplica el audio. La escena 21 no tiene voz y usa el prisma vectorial existente con los créditos del brief.

### Recuperación del render nuevo

El primer render 07–10 recibió SIGTERM (código 143) antes de cerrar el contenedor. Se conservaron los datos originales de esa exportación en `out/revision-07-10/recuperacion/`. Se recuperó el flujo H.264 con parámetros compatibles; su decodificación completa no informa errores. Se guardaron los primeros 1170 fotogramas (39 s) como `frames-000000-001169.mp4`, y se inspeccionaron las imágenes de 07 y 08. Los fotogramas posteriores se exportan en tramos de 300 para limitar pérdidas ante otro cierre. Ningún render aprobado se regeneró.

### Comandos de continuación

```sh
python3 scripts/qa_diplomado_continuation.py --block 07-10 --prepare
python3 scripts/render_diplomado_blocks.py --block 07-10
```

El exportador guarda un solo tramo pendiente por invocación; se repite hasta completar el bloque. Después ensambla los tramos, mezcla el audio y ejecuta QA técnico. Omite los tramos completos y conserva archivos incompletos para inspección. Se utiliza igualmente para `11-16` y `17-21`. Requiere Chromium fuera del aislamiento; ese comando ya fue autorizado. El archivo `produccion.json` de cada bloque identifica exactamente el rango activo o el último completado.

Pendiente: completar los renders nuevos, comprobar correlación de todas sus voces y decodificación, inspeccionar fotogramas de los MP4 finales y revisar las transiciones. No marcar como aprobados ni como finalizados los bloques cuyo QA siga pendiente. No hay commits ni publicaciones.


Actualización: recuperados y verificados 1470 fotogramas (49 s) de 07–10. Avance reproducible: `out/revision-07-10/avance-000000-001469.mp4`; no es el MP4 final. Los primeros 1170 fotogramas proceden del flujo recuperado y los siguientes 300 del primer tramo persistente. El punto siguiente es el fotograma 1470. Las mezclas de audio completas de los tres bloques se generaron con ffmpeg usando las voces intactas, el pad y los mismos efectos con tiempos cuantizados por fotograma (`scripts/mix_diplomado_audio.py`, registros `audio-events.json`). No es necesaria la exportación de audio mediante Chromium. Las exportaciones visuales de los tres bloques continúan por tramos, con dos navegadores por bloque.


## Punto persistido más reciente

- 07–10: fotogramas 0–1769 guardados. Siguiente rango: 1770–2069.
- 11–16: fotogramas 0–299 guardados. Siguiente rango: 300–599.
- 17–21: fotogramas 0–299 guardados. Siguiente rango: 300–599.
- Avance reproducible corregido: `out/revision-07-10/avance-normalizado-000000-001469.mp4` (1470 fotogramas, 49 s de video y audio). El archivo anterior `avance-000000-001469.mp4` es una prueba de ensamblado con escala temporal incompatible; se conserva para trazabilidad y no debe usarse como entrega.
- El prefijo de recuperación válido para ensamblar es `recuperacion/frames-000000-001169-normalizado.mp4`: rango completo de color y escala temporal 90000, coherentes con Remotion. Los demás ensayos de recuperación se conservan como material diagnóstico.

Cola de continuación iniciada fuera de la terminal: `scripts/diplomado_queue.py`, PID inicial 24852. Estado vigente en `out/cola-produccion.json`; log en `out/cola-produccion.log`. Espera las exportaciones ya activas y después continúa **en serie**, omitiendo tramos completos. Se detiene con registro explícito si una comprobación falla. El QA técnico no marca la revisión visual como completada automáticamente.

Para comprobar o reactivar sin duplicar una cola existente:

```sh
python3 scripts/render_diplomado_blocks.py --block 07-10 --launch-queue
```

La última escena con render y QA completos al cierre de este registro sigue siendo 06. Las escenas 07–21 tienen implementación, voces, subtítulos y revisión previa; faltan los MP4 completos y su revisión final. Las escenas 01–06 y los originales permanecen intactos. Sin commits ni publicación.
