# Acta de cierre · Diplomado IA Bancaria · V2.0.0

Dirección: Martin Morfe .°. · morfe.studio. Aprobación audiovisual definitiva: **16 de noviembre de 2026**, mediante instrucción explícita de dirección. El cierre documental y la publicación se ejecutan después de esa aprobación; no hay nuevo desarrollo creativo.

## Identificación y alcance

Repositorio autorizado: https://github.com/mmorfe-engineer/diplomado-ia-banca-motion. Rama de trabajo: feature/v2-strategic-use-cases. Release definitiva publicada: v2.0.0. La cuenta verificada es mmorfe-engineer; se mantiene la visibilidad pública y LICENSE original sin cambios.

V1: 21 escenas y 19 locuciones, 15.957 frames, 531,9 s. V2: 26 escenas, 24 locuciones, 20.963 frames, 20.963/30 s (11:38,767), 1920×1080/30 fps, H.264/AAC estéreo/48 kHz. Inserción de cinco casos 16A–16E entre escenas 16 y 17. No se reconstruyó V1; sus 13.632 frames de prefijo y 2.325 de sufijo son idénticos por píxel. Audio PCM original preservado; AAC final recodificado.

## Inventario y custodia

| Entregable | Ubicación relativa al workspace |
|---|---|
| Máster aprobado, 122.159.559 bytes | out/v2/diplomado-ia-v2-optimizado.mp4 |
| Bloque estratégico definitivo | out/v2/bloque-estrategico-optimizado.mp4 |
| Base previa al refinamiento | out/v2/base-revision-90/diplomado-ia-v2-final.mp4 |
| Originales ElevenLabs (cinco) | inputs/private/v2-originals/ y paquete externo autorizado |
| WAV definitivos | public/voice/v2/ |
| Subtítulos | deliverables/v2/diplomado-ia-v2.srt |
| Timeline y capítulos | deliverables/v2/timeline-v2.json y capitulos.ffmetadata |
| Aprobación, QA y manifiesto | deliverables/v2/ |
| Capturas de máster verificado | docs/media/v2/ y frames.json |
| Checkpoints recuperables | out/v2/checkpoint.json y chunks/ |
| Evidencia de cierre privado | out/closure-v2/ |

Workspace exclusivo: `/home/bitcoinpapa/projects/diplomado_ia/diplomado-ia-banca-motion-v2`.

SHA-256 del máster aprobado: `06665a81e4968434acac12cb9c319d71d1787b42fceb1b8e207076fdcf4d8be5`.

SHA-256 V1 preservado: `0f9d610c65a5663a3ae0ab380c309fcf256339997ee4f6d4c5f6c07b1b7c9b19`. Referencia base V2 al 90 %: `7e5ab7c12955be6efb273f1cf1d8ba34fd37fd36c75669e39ee00be450a511bc`. El [manifiesto público](../deliverables/v2/MANIFEST.json) cubre entregables y capturas; los binarios privados no se adjuntan al repositorio ni a la release.

## QA y documentación

[QA de medios](../deliverables/v2/qa-v2.json): decodificación completa, códecs y dimensiones, 26 capítulos, 264 cues SRT monótonos, cinco voces sincronizadas, ausencia de negros inesperados y preservación V1. La inspección interna fue por fotogramas; la aprobación definitiva de dirección se registra separada en [approval.json](../deliverables/v2/approval.json).

[Validación de cierre](../deliverables/v2/closure-validation.json): TypeScript/imports, dependencias, Mermaid, enlaces e imágenes, manifiestos, auditoría del contenido y prueba desde copia limpia. PR, release y README se comprobaron directamente en GitHub. El token carece de scope workflow: no se instala CI alojada; los checks locales comprobados se conservan y no se presentan como una ejecución GitHub Actions.

README bilingüe, arquitectura, secuencia de 26 escenas, sistema visual, sincronización, render, modificación, reproducción, QA, estado, procedencia, release, changelog y créditos actualizados. Se mantiene Simulador de Impacto Estratégico. Los cinco casos son propuestas demostrativas y no implementaciones bancarias productivas; los datos y ubicaciones son ilustrativos.

## Decisiones y limitaciones

- V1, sus repositorios fuente, tag/release v1.0.0-pilot y Vimeo se preservan. Tag anotado V1: `1f3518cfd7c190d525cf9ae4f46ab390240f9c5a`; commit desreferenciado: `7e902433f9bd060c755e3ddeacd56ae7e4e76427`.
- Se conservan voces, timestamps y SRT durante el refinamiento. Crédito carecía de TXT original; su texto se documentó desde el MP3 definitivo.
- Se eliminaron redundancias de pantalla y se incorporaron iconografía funcional, mapa animado, grafo de impacto, movimiento local, 22 SFX y convergencia de cinco áreas. No se modificaron los componentes globales ni los tableros aprobados.
- El código y checks documentales son públicos. Renders completos y QA de preservación requieren voces, SFX, fuentes de red/caché, Chrome/FFmpeg, pistas y máster V1 y base V2 privada. No se afirma reproducción completa pública ni encode idéntico bit a bit.
- Publicación oficial del máster V2: [YouTube](https://youtu.be/IHxvrOALlcc), incorporada mediante adenda de dirección. No existe una URL de Vimeo V2 asignada. [Vimeo V1](https://vimeo.com/user265304725/diplomado-ia-banca-vzla?share=copy&fl=sv&fe=ci) permanece intacto.
- Copyright y LICENSE preexistentes se conservan. Ninguna autorización nueva de redistribución de voces o másteres se deriva de publicar el código.

## Publicación y commit definitivo

**Publicación verificada el 16 de noviembre de 2026.** [PR #1](https://github.com/mmorfe-engineer/diplomado-ia-banca-motion/pull/1) integrado sin conflictos con merge commit `5df450a70f3dfe3c18c9e7107131c91d7bfd118b`. El árbol integrado coincidió exactamente con la revisión local auditada `3fa4db27c634484411c890295c5636cbcbc2958c`.

- **Release definitiva:** [v2.0.0](https://github.com/mmorfe-engineer/diplomado-ia-banca-motion/releases/tag/v2.0.0), publicada, no draft y no prerelease. ID GitHub: `447691436`.
- **Commit definitivo de la release:** `5df450a70f3dfe3c18c9e7107131c91d7bfd118b`.
- **Etiqueta anotada V2:** objeto `061ed837f1b5c7216c1a6dc15fce45673bfe4427`, desreferenciado al commit anterior. No se vuelve a mover tras publicar.
- **Assets privados adjuntos:** ninguno.
- **V1:** tag anotado `1f3518cfd7c190d525cf9ae4f46ab390240f9c5a`, commit `7e902433f9bd060c755e3ddeacd56ae7e4e76427`; release ID `428546688`, publicada originalmente el 30 de octubre de 2026, sin assets y sin modificación.
- **README en GitHub:** navegador sobre el repositorio real, HTTP 200, portada, cinco casos, aprobación, enlaces de release y las 25 imágenes/badges del README cargados. La portada identifica ahora [YouTube como publicación oficial V2](https://youtu.be/IHxvrOALlcc). Captura y evidencia en out/closure-v2/.
- **Metadatos del repositorio:** descripción actualizada a V2, 26 escenas y 11:38; visibilidad pública y LICENSE conservadas.

El cierre no instaló CI alojada: el token disponible no tiene scope workflow y el conector denegó crear PR. Se preservó localmente la propuesta de workflow, se usó gh para el PR y no se alteraron credenciales, protecciones ni permisos. Las validaciones locales reales y la prueba desde clon limpio pasaron; no se declara una ejecución GitHub Actions inexistente.

El acta y recibo de publicación se incorporan mediante seguimiento documental en main después del corte de release, sin reetiquetar ni reescribir ese commit. Los campos anteriores identifican inequívocamente la versión audiovisual/código publicada.

## Recuperación

Partir del commit/tag publicado; restaurar los medios autorizados desde custodia y comprobar SHA-256. Conservar las copias de referencias V1/V2. La guía [REPRODUCIBILITY.md](REPRODUCIBILITY.md) distingue capacidades públicas y privadas. Reanudar únicamente checkpoints de la revisión que corresponda. Nunca reconstruir V1 desde Vimeo ni sobrescribir releases históricas.

## Declaración final

**Proyecto cerrado dentro de las condiciones de acceso autorizadas.** Producto audiovisual aprobado, máster y originales custodiados, V1 preservada, código/documentación publicados y release V2 verificada. No se realizaron nuevos renders creativos durante el cierre.

Limitaciones declaradas: el acceso oficial V2 está disponible en YouTube; no se ha asignado Vimeo V2; medios privados indispensables para reproducción audiovisual completa; aviso residual Zod propagado a diez paquetes high (cero críticos), documentado en SECURITY.md; CI alojada no configurada por el alcance del token. Ninguna de esas condiciones se presenta como resuelta ni oculta la aprobación del audiovisual. No se autoriza redistribución de másteres o voces por publicar el repositorio.

## Adenda · Publicación audiovisual oficial V2

Enlace aprobado por dirección: [VER PRODUCCIÓN V2](https://youtu.be/IHxvrOALlcc). Incorporado a las portadas en español e inglés, con HERO original clicable, badge YouTube y acceso en la comparativa. La release v2.0.0 incorpora el enlace. Se conserva íntegro el enlace Vimeo V1 y no se cambia el máster, la aprobación ni las etiquetas de ambas versiones.
