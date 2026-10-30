# Guía de modificación

Esta guía cubre las tareas más comunes de modificación de la producción. En todos los casos: ejecutar `npm run typecheck` después de cada cambio y verificar en `npm run studio` antes de re-renderizar.

---

## Modificar texto de una escena

Los textos de pantalla están directamente en los componentes de escena, no en archivos de traducción separados.

**Escenas 1–8:**
```
src/scenes/S1.tsx  … S8.tsx
```

**Escenas 7–21 (producción del Diplomado):**
```
src/scenes/diplomado/Block07_10.tsx   → escenas 7–10
src/scenes/diplomado/Block11_16.tsx   → escenas 11–16
src/scenes/diplomado/Block17_21.tsx   → escenas 17–21
```

**Proceso:**
1. Localizar el componente de la escena (ver tabla en [SCENE-BY-SCENE.md](SCENE-BY-SCENE.md))
2. Editar la cadena de texto en el JSX
3. `npm run typecheck`
4. Verificar en `npm run studio`
5. Re-renderizar el bloque afectado

**Nota ortográfica:** "carnet" (no "carné") — grafía venezolana aprobada en todo el proyecto.

---

## Modificar colores

Todos los tokens de color están en `src/theme.ts`.

```typescript
export const C = {
  bg:     "#06162F",  // fondo principal — modificar con precaución
  blue:   "#56B3F3",  // elemento digital
  orange: "#F46A25",  // elemento humano
  green:  "#45C99A",  // elemento propuesta
  yellow: "#F7FAFF",  // texto de título
  // ...
};
```

Cambiar un valor aquí afecta todas las escenas que usen ese token. Para probar una variante sin afectar la producción, crear un token nuevo (ej: `C.blue2`).

---

## Modificar tipografías

Las tipografías se cargan en `src/theme.ts` desde Google Fonts vía `@remotion/google-fonts`.

```typescript
import { loadFont as loadInter } from "@remotion/google-fonts/Inter";
import { loadFont as loadOutfit } from "@remotion/google-fonts/Outfit";

export const INTER  = loadInter("normal",  { weights: [...] }).fontFamily;
export const OUTFIT = loadOutfit("normal", { weights: [...] }).fontFamily;
```

Para cambiar una tipografía:
1. Instalar el paquete: `npm install @remotion/google-fonts/NombreFuente`
2. Reemplazar el import en `theme.ts`
3. Verificar que los pesos necesarios están disponibles

---

## Modificar cues de sincronización

Los cues de animación están vinculados a palabras en `words.json`. Si el texto de la locución cambia o se re-graba:

1. **Actualizar `voices.json`** con la nueva duración (medida con ffprobe):
   ```bash
   ffprobe -v quiet -show_entries format=duration -of csv="p=0" public/voice/diplomado/vN.wav
   ```

2. **Re-transcribir** (si la locución cambió):
   ```bash
   python3 scripts/transcribe.py
   ```

3. **Verificar los cues** usados en el componente de la escena:
   - Buscar en el componente las llamadas `cueAt('vN', 'palabra')`
   - Confirmar que esas palabras existen con los tiempos correctos en el nuevo `words.json`

4. **Ajustar manualmente** si Whisper produjo timestamps inexactos para palabras críticas.

---

## Agregar una nueva escena

1. Crear el componente en `src/scenes/diplomado/` o como escena individual en `src/scenes/`
2. Añadir la entrada de escena en `src/locales/diplomado.tsx` con `id`, `voice`, `pre`, `tail`
3. Añadir la locución en `public/voice/diplomado/` y su duración en `voices.json`
4. Transcribir la locución y añadir los timestamps en `words.json`
5. Importar y renderizar el componente en `src/Video.tsx` dentro del bloque correspondiente
6. Si se crea un bloque nuevo, registrar la composición en `src/Root.tsx`

---

## Modificar tiempos de escena (pre-roll y cola)

Los valores `pre` y `tail` de cada escena se definen en `src/locales/diplomado.tsx`.

```typescript
{id: 's7', voice: 'v7', pre: 0.6, tail: 0.9}
//                       ^^^^^^^^       ^^^
//  segundos antes de la voz     segundos después
```

Cambiar estos valores desplaza todas las escenas posteriores. Verificar el resultado total con `TOTAL_FRAMES` y `TOTAL_SEC` en `timeline.ts`.

---

## Reemplazar un ícono institucional

Los íconos provienen de la librería Lucide React. Para cambiarlos:

```typescript
import { Landmark, GraduationCap, BriefcaseBusiness } from 'lucide-react';

<InstitutionalIcon
  Icon={Landmark}     // ← cambiar aquí
  label="Banco"
  x={580} y={610}
  scale={1.2}
  color={C.orange}
  glow={0.6}
/>
```

Ver el catálogo completo en [lucide.dev](https://lucide.dev/).

---

## Modificar el componente Person (Isabel)

Isabel se representa con el componente `Person` con color naranja:

```tsx
<Person
  x={330} y={610}
  scale={1.05}
  color={C.orange}
  mood={0.65}    // 0 = neutral, 1 = activa
  look={0.8}     // -1 = izquierda, 1 = derecha
  glow={0.5}
/>
```

El componente `Person` es una figura SVG parametrizada. Modificaciones de forma requieren editar `src/fx/index.tsx`.

---

## Proceso QA después de modificar

```bash
npm run typecheck                        # siempre primero
npm run studio                           # verificar visualmente
# Si se re-renderiza:
python3 scripts/qa_diplomado_final.py   # verificar técnicamente el resultado
```

Ver [QA-AND-VALIDATION.md](QA-AND-VALIDATION.md) para el proceso completo de control de calidad.
