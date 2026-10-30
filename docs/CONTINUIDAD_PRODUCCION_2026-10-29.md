# Continuidad de producción — 29 de octubre de 2026

Máster exportado: `out/finalizacion-01-21/diplomado-ia-01-21-final.mp4`.
Duración: **8:51,90**, 15.957 fotogramas a 30 fps, 1920×1080. Exportación pendiente: **0 segundos**.

El checkpoint histórico del bloque 07–10 en 2700 ya estaba superado al recuperar la sesión. La corrección institucional estaba terminada y su revisión coincidía con el código. Se conservaron 32 segmentos válidos (11.977 fotogramas); únicamente se renderizaron los 3.980 fotogramas faltantes: 11–16 desde 1500 hasta 5001 y los intervalos 300–492 / 2040–2324 de 17–21. Los MP4 existentes y los originales de ElevenLabs se conservaron.

| Bloque | Duración | Exportación | Archivo |
|---|---:|---|---|
| 01-02 | 53.53 s | Completo | `out/correccion-institucional/bloque-01-02/diplomado-ia-01-02-iconos.mp4` |
| 03-06 | 117.67 s | Completo | `out/correccion-institucional/bloque-03-06/diplomado-ia-03-06-iconos.mp4` |
| 07-10 | 116.47 s | Completo | `out/correccion-institucional/bloque-07-10/diplomado-ia-07-10-iconos.mp4` |
| 11-16 | 166.73 s | Completo | `out/finalizacion-01-21/bloque-11-16.mp4` |
| 17-21 | 77.50 s | Completo | `out/finalizacion-01-21/bloque-17-21.mp4` |

El montaje reutiliza los fotogramas de estos cinco bloques sin recodificar el video. La mezcla final ajusta cada bloque a su presupuesto exacto de muestras para evitar acumular el relleno AAC. La grabación compartida 17–18 se conserva completa y continua; los créditos finales duran 10 segundos y llevan únicamente música.

QA y cierre definitivo: consultar `out/finalizacion-01-21/qa-final.json` y `estado.json`. Evidencias técnicas en `qa-tecnico.json`, revisión visual por muestreo en `qa-visual.json`, y registro de ejecución en `qa-ejecucion.log`. Las hojas de contacto y fotogramas están en `qa-visual/`.

Subtítulos globales: `out/finalizacion-01-21/diplomado-ia-01-21.srt`. El máster contiene 21 capítulos.

No se modificaron composiciones, guion, locuciones, identidad gráfica ni archivos audiovisuales previos. No se realizaron commits ni publicaciones. La cola antigua permanece detenida; no debe reactivarse para duplicar esta exportación. Se conserva el documento histórico `CONTINUIDAD_PRODUCCION.md` por formar parte de la huella de recuperación institucional.
