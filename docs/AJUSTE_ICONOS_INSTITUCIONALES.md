# Ajuste de representación institucional

## Regla aplicada

Person se conserva para Isabel y casos humanos explícitos. Las instituciones, áreas, rutas, capacidades, procesos y colectivos abstractos utilizan íconos de Lucide, la biblioteca ya usada por las tarjetas Glass y los pipelines. No se introduce una familia gráfica nueva. Se conservan los centros, las escalas relativas, los colores, la opacidad y los tiempos de entrada y convergencia de cada elemento sustituido.

## Auditoría de las 21 escenas activas

| Escena | Decisión | Representación |
|---|---|---|
| 01 | Corregida | Operaciones: Workflow; clientes: UsersRound; responsabilidades: ShieldCheck. La convergencia mantiene sus coordenadas y tiempos. |
| 02 | Conservada | Isabel, persona concreta. |
| 03 | Conservada | Isabel, idea y formulación de su proyecto. El pipeline ya usa íconos. |
| 04 | Corregida | Negocios: Handshake; Crédito: Landmark; Operaciones: ArrowLeftRight. Se reutilizan los mismos íconos de sus encabezados para la convergencia. |
| 05 | Corregida | Participantes, embajadores y cohortes abstractas: UsersRound; no hay personajes individualizados. El título académico ya usa GraduationCap. |
| 06 | Conservada | Cuatro principios con íconos; Isabel demuestra su aprendizaje. |
| 07 | Corregida | Psicoservicios: BriefcaseBusiness; ENAHP: GraduationCap; banco y sus capacidades: Landmark. |
| 08 | Corregida | Base común: BrainCircuit para potencial tecnológico y ShieldCheck para responsabilidad y gobernanza. Los módulos ya usan tarjetas de sistema. |
| 09 | Corregida | Rutas: ShieldCheck, ChartNoAxesCombined, ArrowLeftRight y ServerCog. |
| 10 | Conservada | Evaluación mediante porcentajes, barras y ficha académica; sin personajes. |
| 11 | Conservada | Horas, modalidades y estructura académica mediante cifras, tarjetas y documento. |
| 12 | Conservada | Caso humano explícito: un participante formula y defiende su iniciativa ante especialistas. Los personajes representan personas presentes en esa acción, no áreas. |
| 13 | Conservada | Isabel y la fotografía abstracta de una persona en el carnet; caso individual. |
| 14 | Conservada | Isabel estudia una propuesta. El proceso se representa mediante documento y tarjeta. |
| 15 | Conservada | Trabajador individual que solicita un carnet e Isabel; simulación narrativa humana. |
| 16 | Conservada | Isabel presenta su ficha académica. |
| 17 | Conservada | Resultados numéricos y tarjetas; sin personajes. |
| 18 | Corregida | Resultados formativos: GraduationCap; talento colectivo: UsersRound; digitalización: Workflow. |
| 19 | Corregida | Embajadores/conocimiento colectivo: UsersRound; áreas técnicas: ServerCog; áreas de control: ShieldCheck. |
| 20 | Corregida | Isabel permanece como única figura individual central; el colectivo que la acompaña usa UsersRound. |
| 21 | Conservada | Prisma vectorial y créditos; sin personajes. |

Las S7/S8 históricas de `src/scenes/` pertenecen al motor de referencia y no están montadas en Video. No se alteran. La escena compartida S17_18 contiene las dos escenas visuales 17 y 18 y mantiene una única reproducción de audio.

## Alcance de exportación

Se renderizan únicamente 01, 04–05, 07–09 y 18–20, con 15 fotogramas de continuidad hacia la escena siguiente cuando corresponde. Las primeras tres revisiones se ensamblan sobre los MP4 existentes de 01–02, 03–06 y 07–10. Los intervalos ajenos a la corrección reutilizan sus imágenes existentes; las pistas AAC se copian sin recodificar. Los MP4 anteriores permanecen intactos.

18–20 se entrega como secuencia de revisión en contexto; no se completa el resto del bloque 17–21. Sus voces y efectos proceden de la mezcla ya existente. Se conserva la continuidad de la voz única 17_18.

Todos los resultados nuevos están en `out/correccion-institucional/`: clips individuales `escena-XX-iconos.mp4`, revisiones por bloque y registros. La cola anterior se detuvo antes de editar; no se reinicia después de esta entrega.

## Preservación y verificación

Estado previo: `preservacion-anterior.json` y copias de las escenas anteriores con extensión `.snapshot`, dentro del directorio de resultados. Se protegen por hash guion, voces, transcripción, cronología, subtítulos, componentes compartidos y todos los renders anteriores. Sólo cambian cinco archivos de escenas y se añade el adaptador de posicionamiento `InstitutionalIcon`, que usa Lucide.

La auditoría sintáctica comprueba los 22 componentes montados, incluidas las dos escenas internas de S17_18. Person queda restringido a las escenas humanas documentadas; en 20 se comprueba la condición que limita Person a la figura central. Las 14 vistas previas de los estados principales y las convergencias fueron inspeccionadas: íconos legibles, márgenes conservados y subtítulos separados. Esta revisión previa se complementa con la inspección de los MP4 exportados.

Estado de render y QA final: consultar `out/correccion-institucional/estado.json`, `entregas.json` y `qa.json`. No considerar terminada la entrega mientras falten los nueve clips o el QA final.
