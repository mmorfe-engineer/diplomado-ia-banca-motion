# Seguridad

No incluir secretos, tokens, datos bancarios operativos ni información personal. Reporta vulnerabilidades al correo del autor. Revisar el estado de visibilidad antes de publicar entregables.

## Auditoría V2.0.0

La publicación excluye tokens, .env reales, voces, MP4/WAV/MP3 privados, node_modules, cachés y chunks. Los originales se conservan en custodia local; no se borran durante la limpieza. Los reportes y capturas aprobadas sí se publican.

`npm audit` de la cadena fijada Remotion 4.0.538 identifica [GHSA-mrhx-c7xc-m3w5](https://github.com/advisories/GHSA-mrhx-c7xc-m3w5) (Zod: agotamiento de memoria con colecciones restringidas sobredimensionadas), propagado a diez paquetes de la herramienta, severidad high, sin avisos críticos. Es un riesgo residual documentado, no un hallazgo corregido. No se cambió el lockfile de producción para actualizar versiones durante este cierre documental. No se expone Remotion Studio como servicio público ni se presenta este motor como aplicación bancaria productiva. Una actualización de dependencias requiere una validación técnica separada; los medios aprobados permanecen inmutables.
