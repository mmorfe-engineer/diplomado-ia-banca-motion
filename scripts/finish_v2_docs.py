"""Publish local production evidence only after the current master passes QA."""
import json,hashlib,shutil
from pathlib import Path
R=Path(__file__).resolve().parent.parent;O=R/'out/v2';D=R/'deliverables/v2'
if (D/'approval.json').exists():
 raise SystemExit('Approved release: documentary regeneration is locked. Use refresh_release_manifest.py after reviewed metadata edits.')
q=json.loads((O/'qa-v2.json').read_text())
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
assert q['status']=='TECHNICAL_PASS' and q['masterSha256']==sha(O/'diplomado-ia-v2-final.mp4')
assert 'PASS' in (O/'review-artifacts.log').read_text()
for f in ['README.md','README.en.md']:
 p=R/f;s=p.read_text();s=s.replace('**en producción; pendiente de revisión audiovisual**','**lista para revisión; QA técnico PASS; aprobación audiovisual pendiente**').replace('26 previstas','26').replace('698,77 s previstas (20.963 frames)','698,77 s (20.963 fotogramas)').replace('Render y QA en curso','Máster listo para revisión')
 s=s.replace('**V2 is in production and awaits audiovisual review.**','**V2 is ready for review: technical QA PASS; artistic approval pending.**').replace('26 planned','26').replace('698.77 s planned (20,963 frames)','698.77 s (20,963 frames)').replace('Rendering and QA in progress','Master ready for review')
 s=s.replace('[Producción y reproducción V2](docs/v2/PRODUCCION.md).','[Producción y reproducción V2](docs/v2/PRODUCCION.md) · [Entrega V2](docs/v2/ENTREGA.md) · [QA V2](deliverables/v2/qa-v2.json).').replace('[V2 production and reproduction](docs/v2/PRODUCCION.md).','[V2 production and reproduction](docs/v2/PRODUCCION.md) · [V2 delivery](docs/v2/ENTREGA.md) · [V2 QA](deliverables/v2/qa-v2.json).')
 p.write_text(s)
for f in ['docs/PROJECT-STATUS.md','docs/CHANGELOG.md']:
 p=R/f;s=p.read_text().replace('producción local en curso, pendiente de revisión','máster local terminado, QA técnico PASS, aprobación audiovisual pendiente');p.write_text(s)
p=R/'docs/v2/PRODUCCION.md';s=p.read_text().replace('Estado: en producción local; pendiente de revisión audiovisual de Martin Morfe.','Estado: máster local listo para revisión; QA técnico PASS; aprobación audiovisual de Martin Morfe pendiente.');s+='\n## Resultado final verificado\n\n20.963 fotogramas, 698,766667 s, 1920×1080 a 30 fps, H.264/AAC estéreo a 48 kHz. 26 unidades narrativas, 24 locuciones, 264 cues SRT y 26 capítulos. Los 13.632 fotogramas del prefijo y 2.325 del sufijo V1 coinciden por hash de píxeles decodificados. Sin negros inesperados. El hash V1 permanece intacto. Véase ENTREGA.md y deliverables/v2/qa-v2.json.\n';p.write_text(s)
visual=dict(status='INTERNAL_SAMPLED_REVIEW_COMPLETE_DIRECTOR_APPROVAL_PENDING',masterSha256=q['masterSha256'],method='25 stable beat frames from the finished strategic MP4, seven master join/end samples, corrected finance closure at 1080p and financial chart at 720p. No claim of continuous human audiovisual playback.',checks=['Original Person movement, functional institutional icons and synchronized original SFX','Spanish text and final Planning denomination','Editorial cleanup; demonstrative context retained in documentation; units and human evaluation','Caption safe area and sampled collision checks','Five distinct demonstrations','Original joins, continuous scene 17/18 track and credits'],corrections=['Editorial cleanup of all five unit headings','Functional iconography replaces generic documents','Animated geolocation and seven operational indicators','Planning graph edge anchors and differentiated result closure','Original person movement and restrained cue-based SFX','Five named units converge into the project bank','Operational chart spacing verified before MP4 render'],continuousPerceptualReview='Pending director review',missingInput='Credit source TXT was absent; its supplied MP3 was transcribed; all five original MP3s retained outside Git.')
for dest in [O/'qa-visual-v2.json',D/'qa-visual-v2.json']:dest.write_text(json.dumps(visual,ensure_ascii=False,indent=2))
for name in ['timeline-v2.json','capitulos.ffmetadata']:shutil.copy2(O/name,D/name)
text=f'''# Máster V2 optimizado · Listo para revisión

16 de noviembre de 2026 · Martin Morfe · morfe.studio

Referencia base conservada en `out/v2/base-revision-90/`. Refinamiento editorial y audiovisual documentado en REFINAMIENTO.md.

QA técnico PASS. Aprobación artística y escucha perceptual completa pendientes del director. No se publicó ni se modificó el remoto.

## Archivos locales

- Máster: `out/v2/diplomado-ia-v2-final.mp4`.
- Bloque nuevo: `out/v2/bloque-estrategico.mp4`.
- Cinco previews: `out/v2/preview-{{negocios,credito,operaciones,planificacion,finanzas}}.mp4`.
- Subtítulos: `out/v2/diplomado-ia-v2.srt` y `deliverables/v2/diplomado-ia-v2.srt`.
- Timeline y capítulos: `out/v2/timeline-v2.json`, `out/v2/capitulos.ffmetadata`.
- Contacto: `out/v2/hoja-de-contacto.png`; uniones/créditos: `out/v2/uniones-y-final.png`.
- Informes y manifiesto: `deliverables/v2/`.

## Métricas verificadas

20.963 fotogramas · 698,766667 s (11:38,767) · 1920×1080 · 30 fps · H.264 High / AAC estéreo 48 kHz. 26 unidades narrativas, 24 locuciones, 264 cues SRT, 26 capítulos. Cinco secuencias nuevas: 5.006 fotogramas (166,866667 s). Las cinco voces duran 159,29475 s antes de pre-roll/colas.

SHA-256 del máster V2: `{q['masterSha256']}`.

V1 SHA-256 intacto: `{q['V1Sha256']}`. Todos los fotogramas V1 se preservan sin recodificación: prefijo 13.632/13.632 y sufijo 2.325/2.325 idénticos por píxel. Prefijo y sufijo de audio idénticos por muestras en el intermedio PCM; el AAC final se recodifica. Correlaciones de las cinco voces nuevas verificadas en el máster. Sin clipping esperado ni negros inesperados; mediciones completas en out/v2/loudness.txt y QA.

## Puntos de revisión

Inserción desde 07:34,400 hasta 10:21,267. Negocios 07:34,400; Crédito 08:08,267; Operaciones 08:40,467; Planificación 09:12,733; Finanzas 09:46,767. Escena 17 original desde 10:21,267; 17/18 mantienen su voz continua y créditos conservan ausencia de narración.

La aprobación de ritmo, continuidad perceptual y dirección artística requiere reproducir el máster completo. La revisión interna de imagen fue por muestreo de fotogramas reales; el análisis automático no equivale a escucha humana. El TXT de Crédito no estaba en el paquete: su texto se documentó desde el MP3 recibido. Las otras cuatro locuciones se contrastaron con sus TXT; Planificación ya usa Simulador de Impacto Estratégico.

## Reproducción comprobada

`npm run typecheck`; `python3 scripts/render_v2.py full`; `python3 scripts/assemble_v2.py`; `python3 scripts/review_v2_artifacts.py`; `python3 scripts/qa_v2.py`; `python3 scripts/finish_v2_docs.py`. Véanse PRODUCCION.md, STORYBOARD.md, ENTORNO.txt y checkpoint en out/v2/. Requiere fuentes privadas V1 y V2. Variables V2_PACKAGE, V2_V1_ROOT y V2_BROWSER permiten configurar las fuentes de sólo lectura y el navegador.

Estado Git: cambios locales sin commit; rama feature/v2-strategic-use-cases. Ninguna operación de push, release o Vimeo. Máster y audios excluidos de Git.
'''
(R/'docs/v2/ENTREGA.md').write_text(text);(O/'ENTREGA.md').write_text(text)
p=R/'docs/v2/RELEASE-NOTES-v2.0.0.md';p.write_text(f'''# v2.0.0 · Borrador no publicado

V2 optimizado con cinco casos estratégicos: Negocios, Crédito, Operaciones, Planificación y Finanzas. Conserva las 21 escenas originales. Limpieza editorial, iconografía funcional, mapa de Venezuela con geolocalización animada, grafo de impacto estratégico y cierre transversal con cinco unidades identificadas. Movimiento de personajes originales y 22 SFX sincronizados.

20.963 fotogramas, 698,766667 s, 1920×1080/30 fps, 264 cues SRT y 26 capítulos. QA técnico PASS; revisión audiovisual final pendiente. SHA-256 `{q['masterSha256']}`.

Las cifras y posiciones de marcadores son ilustrativas y no describen resultados reales ni despliegues bancarios. Este contexto acompaña una futura descripción de publicación. La base previa está conservada localmente en out/v2/base-revision-90/.

Sin publicación en GitHub o Vimeo. Requiere aprobación audiovisual final y revisión de derechos antes de publicar.
''')
shutil.copy2(O/'diplomado-ia-v2-final.mp4',O/'diplomado-ia-v2-optimizado.mp4')
shutil.copy2(O/'bloque-estrategico.mp4',O/'bloque-estrategico-optimizado.mp4')
files=[O/'diplomado-ia-v2-final.mp4',O/'bloque-estrategico.mp4',O/'diplomado-ia-v2.srt',O/'timeline-v2.json',O/'capitulos.ffmetadata',O/'qa-v2.json',O/'qa-visual-v2.json',O/'hoja-de-contacto.png',O/'uniones-y-final.png',O/'diplomado-ia-v2-optimizado.mp4',O/'bloque-estrategico-optimizado.mp4',*sorted(O.glob('preview-*.mp4'))]
(D/'MANIFEST.json').write_text(json.dumps({str(p.relative_to(R)):sha(p) for p in files},indent=2)+'\n')
summary=f'''# QA compacto · V2 optimizado

Máster SHA-256: `{q['masterSha256']}`.

| Control | Resultado |
|---|---|
| Limpieza editorial en V2 | PASS · encabezados de unidad sin coletillas |
| Iconografía funcional | Revisada en controles y fotogramas reales |
| Venezuela y geolocalización | Geometría ISO 862 preservada; MapPin, pulsos y conexiones animadas |
| Variables operativas | Siete selecciones sincronizadas a palabras; mapa y nodo activos |
| Grafo de Planificación | Anclajes de borde, rutas ortogonales detrás de tarjetas; sin líneas sobre texto en las muestras |
| Personajes originales | Desplazamiento, escala, mirada, expresión y salida local; componente global intacto |
| SFX | 22 eventos originales discretos; límites y fotogramas verificados |
| Cinco áreas | Cinco nombres legibles, encabezado transversal y convergencia |
| Subtítulos y voz | SRT y cinco WAV idénticos a la base; duraciones y timestamps conservados |
| V1 | 15.957/15.957 fotogramas preservados por hash; audio PCM del prefijo/sufijo idéntico |
| Decodificación, capítulos y negros | PASS · 20.963 fotogramas, 26 capítulos, sin negros inesperados |
| Transiciones | Muestras reales de uniones y final revisadas |

Base previa conservada en `out/v2/base-revision-90/`, SHA-256 `7e5ab7c12955be6efb273f1cf1d8ba34fd37fd36c75669e39ee00be450a511bc`.

La comprobación visual es por fotogramas de control y muestras del MP4, con decodificación completa automática. La escucha y revisión artística continua quedan pendientes del director. No se afirma aprobación final ni se publica. Las cifras y ubicaciones siguen siendo ilustrativas, según REFINAMIENTO.md y la descripción prevista de publicación.
'''
(D/'QA-REFINAMIENTO.md').write_text(summary)
for name,en in [('README.md',False),('README.en.md',True)]:
 path=R/name;body=path.read_text();note=('Refinamiento V2 completado: limpieza editorial, iconografía funcional, mapa operativo animado, grafo de impacto y cierre transversal con cinco áreas. La base al 90 % se conserva localmente. [Cambios y contexto demostrativo](docs/v2/REFINAMIENTO.md) · [QA compacto](deliverables/v2/QA-REFINAMIENTO.md).' if not en else 'V2 refinement completed: editorial cleanup, functional icons, animated operational map, impact graph and five named institutional areas. The prior 90% review master is preserved locally. [Changes and illustrative-data context](docs/v2/REFINAMIENTO.md) · [Compact QA](deliverables/v2/QA-REFINAMIENTO.md).')
 if 'V2 refinement completed:' not in body and 'Refinamiento V2 completado:' not in body:body=body.split('\n',1)[0]+'\n\n'+note+'\n'+body.split('\n',1)[1]
 path.write_text(body)

manifest=json.loads((D/'MANIFEST.json').read_text())
for path in [D/'QA-REFINAMIENTO.md',R/'docs/v2/REFINAMIENTO.md',*sorted((R/'docs/media/v2').glob('*.webp'))]:manifest[str(path.relative_to(R))]=sha(path)
(D/'MANIFEST.json').write_text(json.dumps(manifest,indent=2)+'\n')
state=json.loads((O/'checkpoint.json').read_text());(O/'refinamiento-estado.json').write_text(json.dumps(dict(status='READY_FOR_DIRECTOR_REVIEW',revision=state['revision'],completedFrames=5006,totalFrames=5006,technicalQA='PASS',baseMasterPreserved='base-revision-90/diplomado-ia-v2-final.mp4',masterSHA256=q['masterSha256'],remote='UNCHANGED'),indent=2))

print('Documentación final y manifiesto actualizados para el máster verificado:',q['masterSha256'])
