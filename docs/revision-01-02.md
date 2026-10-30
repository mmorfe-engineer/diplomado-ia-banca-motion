# Revisión audiovisual 01–02

La composición `DiplomadoIA-Revision01-02` adapta el motor original de este repositorio. Sólo monta S1 y S2. El guion de 19 bloques conserva su estructura; sólo se actualizaron los dos fragmentos aprobados en `docs/dialogos_banca.json` y `docs/guion_verificado_carnet.txt`. En esa primera entrega no se produjeron las escenas 03–21; posteriormente se autorizó el bloque 03–06, documentado por separado.

Se reutilizan sin rediseño `Person` (SVG, anatomía, expresión, mirada, parpadeo y luz), `Glass`, `Title`, `Prism`, `Doc`, `Background`, `Grad`, `Sfx`, `Captions`, `cueAt`, `prog`, `keys`, `useSpring` y la secuenciación/crossfade de `Video.tsx`. S1/S2 cambian su coreografía y contenido; no se importan composiciones de prototipos anteriores. `src/ui/App.tsx` se inspeccionó y no se monta: estas escenas aún no presentan una aplicación y su interfaz contiene el branding comercial original.

Isabel usa el `Person` original, naranja #F46A25, sin brazos añadidos. Conserva su identidad geométrica durante su desplazamiento y el cambio de expresión. El fondo, la tipografía Inter/Outfit y los acentos emplean la paleta solicitada.

## Audio y sincronización

Correspondencias explícitas, verificadas por transcripción de las grabaciones completas:

| Escena | Original | WAV completo | Inicio global de voz |
|---|---|---:|---:|
| 01 | `../voice bnc/voice bnc 1.mp3` | 27,010625 s | 0,600000 s |
| 02 | `../voice bnc/voice bnc 2.mp3` | 23,170625 s | 29,133333 s |

Las copias WAV se normalizan a −16 LUFS, 48 kHz mono, sin cortar silencios ni frases. Los originales no se sobrescriben. `inputs/voiceover/diplomado-manifest.json` conserva las 19 correspondencias, el texto aprobado, las duraciones MP3 medidas y SHA-256 de los originales. La duración decodificada WAV difiere ligeramente de la duración del contenedor MP3 por su padding; la composición usa el WAV real.

La escena 02 empieza en el fotograma 856, 28,533333 s. La composición suma 1606 fotogramas, 53,533333 s a 30 fps. Se conserva el crossfade original de 0,5 s, sin superponer las voces. Los 117 tiempos por palabra proceden de faster-whisper small local; se ajustó puntuación y mayúsculas, no el contenido hablado.

Señales de movimiento: `plataformas`, `automatización`, `conocimiento`, `operaciones`, `clientes`, `responsabilidades`, `convertir`, `oportunidades`, `proyectos`; para Isabel: `Isabel`, `seguridad`, `programadora`, `procedimientos`, `necesidades`, `reconoce`, `trámites`, `oportunidad`, `método`, `propuesta`. El motor original resuelve cada señal con `cueAt`.

## Observaciones editoriales: RESUELTAS Y APROBADAS

Registro histórico de las diferencias detectadas, ambas aprobadas expresamente por dirección audiovisual el 2026-10-28:

- 01: el guion termina «formular proyectos de digitalización». La grabación dice «formular proyectos de gestión de productos de inteligencia artificial y profundizar los procesos de digitalización bancaria».
- 02: el guion comienza «Pensemos en Isabel»; la grabación comienza «Conoce a Isabel». El resto coincide en contenido.

No se sintetizó ni editó una voz para esconder estas diferencias. Ambas observaciones están RESUELTAS Y APROBADAS. El guion de trabajo ya recoge las palabras pronunciadas y los subtítulos existentes coinciden palabra por palabra (ignorando puntuación y mayúsculas). La versión anterior se conserva en `docs/editorial/version-anterior-01-02/`. No se modificó ni volvió a renderizar el MP4.

La pista `17_18` se conserva como una única fuente que corresponde a [17,18]; no se inventó un punto de corte ni se generaron esas escenas. El resto de correspondencias del manifiesto se basa en los identificadores numéricos explícitos; sólo 01 y 02 se han cotejado por transcripción en esta entrega.

## Reproducción

```sh
npm ci
npm run setup
npm run typecheck
npm run render:review -- --concurrency=4 --browser-executable=/ruta/a/chrome-headless-shell
python3 scripts/qa_diplomado_review.py
```

`npm run setup` prepara únicamente las dos voces autorizadas y los efectos sintetizados originales. Los WAV, efectos y renders están ignorados por Git. El script de QA usa la biblioteca estándar de Python y ffmpeg/ffprobe disponibles en este entorno.

La prueba original previa a la adaptación quedó en `out/original-engine-check.mp4` (30 fotogramas renderizados del motor original; no forma parte de la entrega bancaria).

La instalación mantuvo las versiones del lockfile original; npm informó 10 vulnerabilidades altas en el árbol existente. No se aplicaron actualizaciones de dependencias ni cambios de arquitectura durante esta adaptación.

Los resultados técnicos del MP4 final están en `out/revision/qa.json`. Los fotogramas se revisan por legibilidad, identidad de Isabel, marcas, márgenes y separación de subtítulos. Se corrigió la inclinación del haz del prisma para que no atravesase los rostros. Sin publicación ni git push.

## Resultado de esta entrega

- TypeScript (`tsc --noEmit`) y `git diff --check`: sin errores.
- MP4 H.264/AAC, 1920×1080, 30 fps, 1606 fotogramas. Duración de video 53,533333 s; contenedor con padding AAC 53,547 s. Decodificación completa sin errores.
- Correspondencia de audio: correlación 0,9908 para 01 y 0,9881 para 02; desplazamientos medidos 0 y −0,333 ms (redondeo de posicionamiento de audio, inferior a 1 ms).
- Sonoridad integrada −16,3 LUFS; pico verdadero −4,5 dBFS. Audio AAC idéntico por SHA-256 antes y después de integrar la corrección visual.
- Siete fotogramas extraídos del MP4 definitivo e inspeccionados; se corrigió el haz que cruzaba los rostros. No se detectó branding prohibido en las escenas y subtítulos activos.
- Los 19 originales conservan su SHA-256. Ningún MP3 fue sobrescrito.
- Observaciones editoriales 01 y 02: RESUELTAS Y APROBADAS por dirección audiovisual. Aprobación y SHA-256 del MP4 en `docs/editorial/aprobaciones-01-02.json`. El siguiente bloque autorizado es 03–06.
