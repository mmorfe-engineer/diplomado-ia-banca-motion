# Revisión audiovisual 03–06

Este bloque continúa el motor y el lenguaje audiovisual aprobados en 01–02. No modifica sus composiciones, componentes compartidos ni el MP4 aprobado. La composición seleccionable `DiplomadoIA-Revision03-06` usa las secuencias originales, el crossfade de 0,5 s, las tipografías y la paleta existentes.

## Alcance producido

- 03: Isabel y una idea; transición al recorrido qué resolver → información → viabilidad → riesgos → autorización; convergencia hacia la competencia de formulación responsable. Se adapta el pipeline, pulso de luz y salida estructurada de la S3 original.
- 04: Negocios, Crédito y Operaciones reciben conocimientos distintos mediante documentos y conos de luz; sus tarjetas y personajes convergen hacia lenguaje común, atribuciones y controles. Se reutilizan los recursos de roles y luces de S2 y la convergencia de S6. El naranja se reserva a Isabel; los tres profesionales de esta escena usan azul, verde y blanco.
- 05: presentación del diplomado, límites de su alcance, embajadores digitales, posibilidades/límites de IA, oportunidades e iniciativas para evaluación; cierre 40+ participantes. Se reutilizan la puesta en escena por estados, revelado progresivo y transformaciones del motor. No se monta una aplicación comercial ni se representa un sistema implementado.
- 06: cuatro principios aparecen según su mención, conectados por órbitas; convergen en Isabel y el proyecto académico para demostrar aprendizaje. Se adapta el recurso original de órbitas, pilares y convergencia.

Componentes originales: `Background`, `Person`, `Doc`, `Glass`, `Grad`, `Title`, `Sfx`, `Captions`. Movimiento y sincronización: `prog`, `keys`, `cueAt`, tiempo local por fotograma y el `Video` original. No hay personajes ni anatomías nuevas.

## Fuentes y tiempos

| Escena | Original ElevenLabs | WAV completo | Inicio de escena | Inicio de voz |
|---|---|---:|---:|---:|
| 03 | `voice bnc 3.mp3` | 24,189396 s | 0,000000 s | 0,600000 s |
| 04 | `voice bnc 4.mp3` | 29,231021 s | 25,700000 s | 26,300000 s |
| 05 | `voice bnc 5.mp3` | 28,525729 s | 56,433333 s | 57,033333 s |
| 06 | `voice bnc 6.mp3` | 29,387750 s | 86,466667 s | 87,066667 s |

Duración de composición: 3530 fotogramas, 117,666667 s, 1920×1080 a 30 fps. Duraciones medidas en los WAV reales; no se asignaron por estimación de palabras. Copias a 48 kHz mono y −16 LUFS, sin cortes de voz. Los originales MP3 nunca se sobrescriben.

Los subtítulos conservan las palabras pronunciadas. El reconocimiento se cotejó con el guion autorizado. Se corrigieron errores de reconocimiento (`intuición`, `matices`, ortografía de `cohortes`, escritura de `cuarenta`) y una marca de duración nula en `desarrollo`, esta última mediante una segunda transcripción del fragmento. Estas correcciones de transcripción no cambian el guion ni el audio.

## Trazabilidad editorial

01 y 02: RESUELTAS Y APROBADAS según la actualización definitiva de dirección audiovisual. La versión anterior del guion está en `docs/editorial/version-anterior-01-02/`; el registro es `docs/editorial/aprobaciones-01-02.json`.

05: durante el cotejo se detectó «cohortes de cuarenta o más participantes» frente a «una primera cohorte…». Se consultó al usuario, quien respondió explícitamente «Aprobar la variante grabada». Sólo entonces se actualizó ese fragmento. La versión previa está en `docs/editorial/version-anterior-05/`; el registro es `docs/editorial/aprobacion-05.json`. Estado: RESUELTA Y APROBADA.

No cambió ningún otro fragmento del guion. Los subtítulos 01–06 se cotejaron palabra por palabra con el guion actualizado, ignorando sólo puntuación y mayúsculas.

El MP4 01–02 mantiene SHA-256 `1c63910b2a490d5cb1494561b695fd8392f1aced88ab8e150171f16db64ba2ba`: no se volvió a renderizar. Su informe de QA conserva las aprobaciones al ejecutar de nuevo las comprobaciones técnicas.

## Entrega y comprobación

- Video: `out/revision-03-06/diplomado-ia-escenas-03-06.mp4`.
- Informe técnico: `out/revision-03-06/qa.json`.
- Correspondencias temporales y señales: `out/revision-03-06/timeline.json`, `cues.json`.
- Preservación: `out/revision-03-06/preservacion.json`.
- Fotogramas de revisión: PNG en el mismo directorio, extraídos del MP4 final.

Comandos:

```sh
npm run typecheck
npm run render:03-06 -- --concurrency=4 --browser-executable=/ruta/a/chrome-headless-shell
python3 scripts/qa_diplomado_review.py --block 03-06
npm run studio:03-06
```

El QA compara la forma de onda de cada voz con la mezcla codificada, al principio y al final, comprueba duraciones completas y hashes, valida el texto literal y sus marcas de tiempo y decodifica todo el MP4. Usa Python estándar y ffmpeg/ffprobe. La revisión visual inspecciona fotogramas de todas las fases y transiciones. No se produjeron escenas 07–21 ni se publicó ni hizo git push. La fuente 17_18 sigue siendo única e intacta.

## Resultado final

- TypeScript y comprobación de cambios: sin errores.
- MP4 H.264/AAC con 3530 fotogramas: 117,666667 s de video; 117,675 s de contenedor por padding AAC. Decodificación completa sin errores.
- 248 palabras temporizadas, cotejadas literalmente con el guion aprobado.
- Ocho ventanas de comprobación de audio, al principio y al final de las cuatro pistas: correlación entre 0,9826 y 0,9937; desfase máximo de 0,333 ms.
- Sonoridad −16,1 LUFS; pico verdadero −4,4 dBFS.
- Trece fotogramas extraídos del MP4 definitivo e inspeccionados, incluyendo las tres transiciones.
- La normalización de v6 produce un redondeo de una muestra a 48 kHz (20,8 microsegundos) frente a la decodificación directa; no corresponde a un corte de contenido. Los demás WAV conservan exactamente el número de muestras decodificadas. Los 19 MP3 originales conservan sus hashes.
- Observaciones editoriales 01, 02 y 05: RESUELTAS Y APROBADAS. Ningún otro fragmento del guion cambió.
- MP4 01–02 preservado sin render adicional. Sin producción posterior a 06, publicación ni git push.
