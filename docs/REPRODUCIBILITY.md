# Reproducibilidad y dependencias privadas

## Repositorio público

```bash
git clone https://github.com/mmorfe-engineer/diplomado-ia-banca-motion.git
cd diplomado-ia-banca-motion
npm ci
npm run typecheck
npm run docs:check
npm run studio
```

El código, imports, datos de sincronización, geometrías SVG, manifiestos, SRT y documentación son públicos. Studio registra las composiciones, pero reproducción con audio y renders audiovisuales requieren medios privados; no se promete que una escena con assets ausentes se renderice correctamente. Las fuentes Inter/Outfit se cargan con @remotion/google-fonts y necesitan conectividad o caché adecuada.

## Medios privados necesarios

| Recurso | Uso | Ubicación esperada |
|---|---|---|
| 19 WAV V1 | Re-render de escenas V1 | public/voice/diplomado/ |
| Cinco WAV V2 | Audio de casos | public/voice/v2/negocios.wav, credito.wav, operaciones.wav, planificacion.wav, finanzas.wav |
| Originales ElevenLabs | Custodia y nueva preparación autorizada | Paquete externo y inputs/private/v2-originals/ (ignorado) |
| SFX originales | Render/reproducción y mezcla | public/sfx/ y fuente V1 autorizada |
| Pistas de vídeo V1 | Inserción sin reconstrucción | V2_V1_ROOT/out/finalizacion-01-21/pistas-video/ |
| Máster y timeline V1 | Integridad y audio original | V2_V1_ROOT/out/finalizacion-01-21/ |
| Base V2 al 90 % y locked-media.json | Auditoría de preservación del refinamiento | out/v2/base-revision-90/ |
| Chrome y FFmpeg/ffprobe | Render, ensamblaje y QA | Instalación local configurada |

La base privada V2 no se incorpora a Git. `V2_PACKAGE`, `V2_V1_ROOT` y `V2_BROWSER` configuran recursos externos. Los defaults corresponden al workspace del autor; deben reemplazarse en otra máquina. No copiar ni escribir en los repositorios V1 originales.

## Ambas versiones

La V1 exacta permanece en `v1.0.0-pilot`; una copia independiente puede fijarse con `git checkout v1.0.0-pilot`. La rama V2 conserva esos componentes y selecciona bloques V1 mediante props. El ensamblaje V2 reutiliza los cinco tracks V1; `assemble_v2.py` define sus conteos y exige el hash del máster original.

[Build/render](BUILD-AND-RENDER.md) incluye comandos reales para preview, preparación, timestamps, chunks, ensamblaje y QA. [Modificación](MODIFICATION-GUIDE.md) explica dónde editar cada elemento. Una nueva locución requiere nueva revisión de texto, timestamps y cues antes de renderizar; no sustituir los JSON aprobados por tiempos estimados.

La prueba independiente de cierre se registra en [closure-validation.json](../deliverables/v2/closure-validation.json): instalación y typecheck desde un clon limpio, validación documental y listado de composiciones sin copiar voces. El render audiovisual completo desde cero no se afirma desde el repositorio público; requiere los recursos privados enumerados. Tampoco se garantiza identidad bit a bit de un nuevo encode.
