> **Cierre 2026-11-16:** producto audiovisual aprobado definitivamente por dirección. El texto siguiente conserva el registro de producción; las referencias antiguas a aprobación/publicación pendiente fueron superadas por [el acta de cierre](../PROJECT-CLOSURE-V2.md).

# Producción V2 · 16 de noviembre de 2026

Estado: máster local listo para revisión; QA técnico PASS; aprobación audiovisual de Martin Morfe pendiente. Sin publicación remota.

Workspace exclusivo: diplomado-ia-banca-motion-v2. Rama: feature/v2-strategic-use-cases. HEAD inicial: 7e902433f9bd060c755e3ddeacd56ae7e4e76427; tag V1: 1f3518cfd7c190d525cf9ae4f46ab390240f9c5a.

Paquete: /home/bitcoinpapa/Descargas/diplomado-v2-produccion. Leídos LEEME, PROMPT-CODEX y CONTRATO-VISUAL-Y-QA. Cuatro TXT y cinco MP3 disponibles: falta TXT fuente de Crédito. Su texto se documenta como transcripción del MP3, no como guion fuente suministrado.

La decisión editorial posterior prevalece: **Simulador de Impacto Estratégico** en Planificación. La locución recibida ya incorpora esa denominación.

## Custodia V1

Máster local autorizado: motion-video-final/out/finalizacion-01-21/diplomado-ia-01-21-final.mp4. SHA-256 verificado: 0f9d610c65a5663a3ae0ab380c309fcf256339997ee4f6d4c5f6c07b1b7c9b19. Las fuentes V1 se usan sólo para lectura. Se reutilizan sus pistas de vídeo y mezcla PCM; no se renderizan las escenas originales.

## Arquitectura y reproducción

Composiciones independientes V2-negocios, V2-credito, V2-operaciones, V2-planificacion, V2-finanzas y DiplomadoIA-V2-Estrategico. Root conserva la composición V1 existente. No se alteran theme, Person ni los componentes originales. Gráficos React/SVG deterministas; cartografía world-atlas ISO 862. Los nodos del mapa son ilustrativos.

1. npm ci; npm run typecheck.
2. Preparar entorno Python con faster-whisper. scripts/prepare_v2.py usa modelo small local, CPU int8; conserva hashes MP3 y convierte copias a PCM 24 bits/48 kHz/estéreo sin cambiar velocidad.
3. scripts/review_v2_words.py concilia transcripción con los cuatro textos fuente; registra diferencias. Crédito procede de transcripción.
4. python3 scripts/render_v2.py stills / previews / full. V2_BROWSER permite configurar navegador. Los chunks de 300 frames se verifican y guardan por hash de revisión; checkpoint evita repetir chunks válidos.

Los tiempos de palabra son estimaciones Whisper a partir del audio, no alineación fonética certificada. Las dos correcciones de reconocimiento en Planificación se registran en out/v2/transcription-differences.json. Las animaciones, captions y SRT usan los mismos datos.

## Storyboard y datos

Cada caso pasa por persona/problema, desafío, inteligencia/propuesta, producto/demostración y cierre. Los cues proceden de palabras efectivas. El área inferior queda reservada para captions; el disclaimer se ubica a y=875.

Negocios: 32 servicios de pago, 24 de nómina, 18 gestión de cobros; total 74 oportunidades, sin equivalencia con clientes únicos. Crédito: 8/10 requisitos verificados, 2/10 pendientes; escenarios cualitativos y borrador. Operaciones: demanda 45,50,62,78,90 frente a capacidad 65 operaciones/hora, cruce jueves; alerta por investigar. Planificación: 3 objetivos, 6 procesos, 4 procedimientos, 5 áreas; conteos de entidades diferentes. Finanzas: ocho puntos Hoy a +7 en miles USD, base 1200,1150,1050,980,850,760,650,550 y adverso 1200,1000,850,620,450,250,100,-300. Todos los datos son sintéticos y no describen entidades reales.

Cierres con decisión humana y alcance académico. Finanzas retira el gráfico antes del banco de proyectos y del antecedente V1.

## Preflight adicional y sonido

`git diff v1.0.0-pilot HEAD --stat` no muestra diferencias: HEAD inicial y tag apuntan al mismo árbol de contenido. npm ci instaló las versiones fijadas; typecheck inicial y posterior PASS. El navegador se reutiliza desde una instalación local autorizada en modo lectura. Los procesos de Chrome necesitan ejecución fuera del sandbox; no se cambian permisos del repositorio ni se escribe en las fuentes V1.

Las voces nuevas suman 159,29475 s; con pre-roll 0,6 s y cola 0,9 s redondeados por caso: 5.006 fotogramas, 166,866667 s. V2 prevista: 20.963 fotogramas, 698,766667 s.

La mezcla nueva conserva las copias completas de las locuciones, usa el pad original a 0,55 y aplica +1,6 dB de ganancia uniforme: −16,2 LUFS integrados, −4,3 dBTP medidos, LRA 2,6 LU. No usa compresión dinámica, cambio de velocidad ni síntesis sustituta. Entrada y salida del pad de 0,5 s. La mezcla final inserta muestras nuevas entre las muestras 21.811.200 y 21.811.201 del audio V1 decodificado; el audio V1 se conserva por muestras en el intermedio PCM. La entrega AAC requiere recodificar audio, por lo que no se afirma identidad binaria de la pista comprimida. El vídeo V1 se concatena por copia de flujo.

Una segunda transcripción con Whisper base reconoció «Plan de Negocios Anual» y el título nuevo. La transcripción automática puede unir fonéticamente «simular escenarios»; el texto visible conserva el guion fuente. Escucha perceptual completa y aprobación artística corresponden a la revisión del director; no se declaran realizadas por un análisis automático.

## Revisión del primer pase

Hoja de contacto preliminar revisada. Se corrigió la colisión de la nota operativa con la leyenda del gráfico reduciendo la altura de los gráficos a 430 px. Se verificó a 1080p el gráfico financiero y se añadieron entradas progresivas de documentos y tarjetas, preservando personajes y componentes originales. Los cinco casos usan demostraciones diferentes: barras, expediente, red/serie temporal, grafo/conteos y escenarios de liquidez.

La versión fijada de Remotion usa por defecto coeficientes BT.601 (ver código local renderer/options/color-space.js). Los chunks nuevos se armonizan por metadatos SPS con la V1 BT.470BG, rango TV, mediante h264_metadata; no se recodifica ni cambia la imagen. Las pistas usan H.264 High nivel 4.0, yuv420p, SAR 1:1 y timebase 1/90000.

## Evidencia de preservación PCM

Comprobación ejecutada sobre la mezcla intermedia: prefijo V1 MD5 888d05537640cd85e08214b8bc8826f9 y sufijo V1 MD5 d27f39d8398b286954d2318d52727505. Los segmentos V2 correspondientes coinciden exactamente. Esta comprobación es previa al codificador AAC final y no sustituye la escucha de continuidad.

Correlación de voz nueva en diez ventanas (inicio y cerca del final de cada voz), con filtro de análisis de 1.200 Hz para reducir el pad: 0,9980–0,9999, sin desplazamiento temporal aplicado. El filtro es sólo de medición y no se incorpora al audio entregado.

En el pase de contacto final se detectó un documento sobre el texto inferior del cierre de Finanzas. Se movió de y=815 a y=730 y se retiró su etiqueta redundante. Se reutilizaron los primeros 4.500 fotogramas, cuya ejecución no alcanza ese cierre (comienza en 4.634), y se regeneraron los últimos 506. Se verificó el hash de la revisión anterior reconstruyendo únicamente ese cambio de código. La captura corregida ya se inspeccionó a 1080p. El gráfico financiero también se revisó reducido a 720p.

Configuración: `V2_PACKAGE` selecciona el paquete de guiones y audios; `V2_V1_ROOT` selecciona la copia local aprobada V1 (sólo lectura); `V2_BROWSER` selecciona Chrome. Los valores predeterminados son los de esta producción. Atajos de npm: `v2:render`, `v2:assemble`, `v2:qa`, `v2:artifacts`. El máster y todo audio permanecen excluidos de Git.

## Resultado final verificado

20.963 fotogramas, 698,766667 s, 1920×1080 a 30 fps, H.264/AAC estéreo a 48 kHz. 26 unidades narrativas, 24 locuciones, 264 cues SRT y 26 capítulos. Los 13.632 fotogramas del prefijo y 2.325 del sufijo V1 coinciden por hash de píxeles decodificados. Sin negros inesperados. El hash V1 permanece intacto. Véase ENTREGA.md y deliverables/v2/qa-v2.json.

## Refinamiento posterior de dirección

Las decisiones de la revisión al 90 % sustituyen las advertencias visuales y cierres genéricos descritos en el registro histórico anterior. Véase [REFINAMIENTO.md](REFINAMIENTO.md) para la implementación vigente, el respaldo de la base, los SFX y el contexto demostrativo que debe acompañar una futura publicación. La V1 y los cinco audios no se modifican.

## Resultado final verificado

20.963 fotogramas, 698,766667 s, 1920×1080 a 30 fps, H.264/AAC estéreo a 48 kHz. 26 unidades narrativas, 24 locuciones, 264 cues SRT y 26 capítulos. Los 13.632 fotogramas del prefijo y 2.325 del sufijo V1 coinciden por hash de píxeles decodificados. Sin negros inesperados. El hash V1 permanece intacto. Véase ENTREGA.md y deliverables/v2/qa-v2.json.
