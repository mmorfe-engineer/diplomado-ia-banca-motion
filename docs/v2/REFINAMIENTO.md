> **Cierre 2026-11-16:** producto audiovisual aprobado definitivamente por dirección. El texto siguiente conserva el registro de producción; las referencias antiguas a aprobación/publicación pendiente fueron superadas por [el acta de cierre](../PROJECT-CLOSURE-V2.md).

# Refinamiento quirúrgico V2

La revisión de dirección posterior al contrato visual prevalece. La V2 base fue valorada al 90 % y se conserva íntegra en `out/v2/base-revision-90/`. Su máster tiene SHA-256 `7e5ab7c12955be6efb273f1cf1d8ba34fd37fd36c75669e39ee00be450a511bc`.

## Alcance

No se modifican las 21 escenas V1, el diseño de Person, Glass, Background, Title, Captions, el tema cromático ni los cinco audios definitivos. `src/v2/data.json` conserva exactamente duraciones y palabras alineadas. El SRT se verifica contra la copia base. Los gráficos aprobados de barras, requisitos y escenarios se reutilizan; sus cifras y unidades permanecen iguales.

Los cambios se concentran en `src/v2/Strategic.tsx` y el archivo local `src/v2/Refinements.tsx`. No hay refactorización global. La limpieza de los encabezados afecta a los cinco casos, por lo que se vuelve a renderizar únicamente el bloque nuevo de 5.006 fotogramas. La V1 se ensambla por copia de sus pistas de vídeo originales.

## Cambios de dirección

- Se eliminan las coletillas académicas y advertencias repetidas del bloque V2. Los encabezados identifican exclusivamente la unidad organizacional; el cierre transversal usa CINCO ÁREAS MEDULARES.
- Los documentos repetidos se sustituyen por iconos semánticos Lucide por función, con entradas escalonadas y conexiones animadas.
- Los personajes originales se desplazan, cambian ligeramente de escala, mirada y expresión, y salen antes de expandir el tablero. Se reutilizan los patrones de Isabel sin cambiar su anatomía.
- Operaciones conserva la geometría de Venezuela ISO 862. Marcadores MapPin progresivos, halos, pulsos, rutas ortogonales y activación de nodo acompañan siete variables: agencias, pagos, rentabilidad, productividad, demanda, servicios e incidencias. Los cambios se disparan con palabras reales. Desde «torre» el tablero se expande. El gráfico de demanda/capacidad y la alerta evolucionan hacia el cierre Anticipación operativa.
- Planificación abre con Plan de Negocios Anual → Iniciativa → Evaluación de impacto. El grafo usa anclajes en bordes, corredores ortogonales y líneas detrás de tarjetas opacas. El nodo central queda separado del texto; la activación depende de «objetivos», «estructura», «procedimientos» y «escenarios». El cierre muestra relaciones y dependencias para evaluar impacto.
- Los cierres específicos mantienen el resultado del tablero: oportunidades, expediente estructurado, red monitorizada, grafo de impacto y escenarios financieros.
- El cierre general identifica Negocios, Crédito, Operaciones, Planificación y Finanzas; los iconos convergen hacia Banco de Proyectos en «convertir». Se conserva PROPUESTAS DE ALTO VALOR ESTRATÉGICO.
- Se usan SFX originales discretos: pop, click, whoosh, ding y shimmer. `src/v2/sfx.json` fija sus fotogramas y volúmenes; lo leen la composición y el mezclador final. Las voces no se cortan ni se desplazan.

## Controles y decisiones

Fotogramas de control antes del render MP4: cinco cierres, iconografía por unidad, mapa, selector, gráfico operativo, apertura/grafo de Planificación y convergencia. Se corrigió una colisión detectada en el gráfico operativo: altura local de 350 px, tipografía ajustada sólo en ese gráfico y nota a y=880. Las líneas del cierre general comienzan por debajo de las denominaciones y estas salen antes de la convergencia para evitar cruces.

Se omiten etiquetas secundarias Vicepresidencia/Gerencia bajo los cinco iconos finales para mantener legibilidad; la unidad completa aparece en su caso individual. La revisión humana continua de ritmo y escucha sigue pendiente del director; los reportes diferencian análisis automático e inspección por fotogramas.

## Contexto demostrativo y descripción de publicación

Estos cinco casos son demostraciones conceptuales para el Diplomado en Inteligencia Artificial Aplicada a la Banca. Las cifras, escenarios, requisitos y ubicaciones de marcadores son ilustrativos y no describen resultados obtenidos, clientes ni posiciones de una institución bancaria real. Las salidas representan análisis para evaluación humana, no decisiones automáticas ni despliegues operativos. Este contexto se mantiene en la documentación y debe acompañar cualquier futura descripción de publicación; no se repite como advertencia sobre cada tablero.

No se publica en GitHub ni Vimeo ni se modifica el remoto antes de la aprobación audiovisual final.

## Reproducción de esta revisión

Conservar primero el archivo de referencia V2 y `locked-media.json` de `out/v2/base-revision-90/`: el QA de esta revisión los necesita para comprobar preservación. No ejecutar nuevamente la transcripción; reutilizar el `data.json` y los cinco WAV definitivos. Copiar desde la V1 autorizada a `public/sfx/` los archivos originales `pop.wav`, `click.wav`, `whoosh.wav`, `ding.wav` y `shimmer.wav`. El mezclador reutiliza también el pad original desde la fuente V1 de sólo lectura.

Comandos ejecutados: `npm run typecheck`, `python3 scripts/render_v2.py controls`, `python3 scripts/render_v2.py full`, `python3 scripts/assemble_v2.py`, `python3 scripts/review_v2_artifacts.py`, `python3 scripts/qa_v2.py` y `python3 scripts/finish_v2_docs.py`. No repetir la preparación de voces ni el render V1. El checkpoint de chunks valida la revisión de código, datos, audios y settings antes de reanudar.
