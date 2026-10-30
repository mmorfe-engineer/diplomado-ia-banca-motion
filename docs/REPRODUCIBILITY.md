# Reproducibilidad

## Lo que es reproducible

| Elemento | Reproducible | Notas |
|---|---|---|
| Código fuente | Sí | 100% en este repositorio |
| Datos de sincronización | Sí | `words.json`, `voices.json`, `scenes.json` |
| Configuración de build | Sí | `package-lock.json`, `tsconfig.json` |
| Scripts de producción | Sí | `scripts/` completo |
| Documentación | Sí | `docs/` completo |
| Efectos de sonido SFX | Sí | Regenerables con `npm run sfx` |
| Locuciones de voz | **No** | Derechos privados; contactar al autor |
| Máster MP4 | **No** | 90 MB; disponible en Vimeo para visualización |

---

## Procedimiento de clonado y verificación

```bash
# 1. Clonar el repositorio
git clone https://github.com/mmorfe-engineer/diplomado-ia-banca-motion.git
cd diplomado-ia-banca-motion

# 2. Instalar dependencias exactas del lockfile
npm ci

# 3. Verificar tipos (debe pasar sin errores)
npm run typecheck

# 4. Abrir Remotion Studio (animaciones, sin audio si no hay WAV)
npm run studio
```

La verificación de tipos (`npm run typecheck`) es el indicador principal de integridad del código. Si pasa, el código es semánticamente correcto y puede render.

---

## Recursos que no están en el repositorio

### Locuciones de voz (`public/voice/diplomado/`)

Los archivos `v1.wav` … `v20.wav` y `v17_18.wav` son grabaciones originales con derechos privados. No se distribuyen públicamente.

Para reproducir el render completo, estos archivos deben estar disponibles. Contactar al autor: [eskol@protonmail.com](mailto:eskol@protonmail.com).

La estructura esperada:

```
public/voice/diplomado/
  v1.wav v2.wav v3.wav v4.wav v5.wav v6.wav v7.wav
  v8.wav v9.wav v10.wav v11.wav v12.wav v13.wav
  v14.wav v15.wav v16.wav v17_18.wav v19.wav v20.wav
```

### Efectos de sonido (`public/sfx/`)

Generados localmente. Pueden regenerarse:

```bash
npm run sfx
# Requiere: Python 3 con numpy/scipy o herramientas de síntesis del sistema
```

### Máster MP4

`deliverables/diplomado-ia-01-21-final.mp4` (90 MB) no está en el repositorio.  
Ver en Vimeo: [vimeo.com/user265304725/diplomado-ia-banca-vzla](https://vimeo.com/user265304725/diplomado-ia-banca-vzla?share=copy&fl=sv&fe=ci)

Los hashes SHA-256 del máster y entregables verificados están en `deliverables/MANIFEST.json`.

---

## Reproducción parcial sin locuciones

Es posible trabajar con el motor de motion graphics sin las locuciones:

- **`npm run studio`** — las animaciones son visibles; el audio estará ausente
- **`npm run typecheck`** — verificación de integridad completa
- **Modificaciones de escenas** — funcionales sin WAV
- **Render de bloques** — produce video mudo; con silencio en la pista de audio

---

## Verificación de integridad de los datos de sincronización

Los datos de `words.json` fueron generados por Whisper y verificados manualmente. Para re-verificar:

```bash
# Verificar que todas las voces referenciadas en scenes.json tienen datos en words.json
node -e "
const w = require('./src/locales/diplomado/words.json');
const v = require('./src/locales/diplomado/voices.json');
Object.keys(v).filter(k => k !== 'silence').forEach(k => {
  if (!w[k]) console.log('FALTA:', k);
  else console.log('OK:', k, w[k].length, 'palabras');
});
"
```

---

## Integridad del repositorio fuente

El repositorio fuente de producción (`motion-video-final`) se mantuvo en modo de solo lectura durante toda la migración. Los archivos de código fuente son idénticos entre ambas ubicaciones.

Los hashes verificados del máster aprobado están en `deliverables/MANIFEST.json`.

---

## Limitaciones declaradas

| Limitación | Descripción |
|---|---|
| Render desde cero | No garantizado sin locuciones originales |
| Revisión visual continua | El QA visual fue por muestreo de fotogramas, no visionado completo |
| Re-render idéntico al máster | El ensamblaje FFmpeg puede producir diferencias menores de bitrate |
| Audio propietario | Las locuciones no se redistribuyen y no están disponibles públicamente |

Ver [QA-AND-VALIDATION.md](QA-AND-VALIDATION.md) y [ASSET-PROVENANCE.md](ASSET-PROVENANCE.md) para contexto adicional.
