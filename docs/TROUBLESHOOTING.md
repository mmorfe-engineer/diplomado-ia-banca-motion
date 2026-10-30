# Solución de problemas

- `cueAt` falla si la transcripción no contiene la palabra/ocurrencia: actualiza timestamps cotejados con voz.
- Faltan medios: confirma `public/voice/diplomado/` y `public/sfx/`.
- Remotion no inicia: reinstala con `npm ci` y verifica Node/Chromium compatible.
- Ensamblaje incompleto: inspecciona checkpoint y rangos; no sobrescribas segmentos existentes válidos.
