# Sistema visual

## Paleta de colores

Definida en `src/theme.ts`. Todos los tokens se acceden a través del objeto `C`.

| Token | Valor hex | Rol semántico |
|---|---|---|
| `C.bg` | `#06162F` | Fondo principal: azul noche profundo |
| `C.bg2` | `#0B2548` | Fondo secundario / variante más clara |
| `C.blue` | `#56B3F3` | Elemento digital, controles, azul corporativo |
| `C.orange` | `#F46A25` | Elemento humano, Isabel, acento cálido |
| `C.green` | `#45C99A` | Propuesta, acción positiva, verde esmeralda |
| `C.yellow` | `#F7FAFF` | Texto de título, blanco cálido |
| `C.slate200` | `#e2e8f0` | Cuerpo de texto, lectura normal |
| `C.slate300` | `#cbd5e1` | Texto secundario |
| `C.slate400` | `#94a3b8` | Texto terciario / captions |

**Uso semántico del color:**
- El azul (`C.blue`) representa tecnología, datos y entornos digitales.
- El naranja (`C.orange`) representa personas, talento y el componente humano (Isabel).
- El verde (`C.green`) representa propuestas, resultados y crecimiento.
- El blanco-amarillo (`C.yellow`) es exclusivo para títulos y etiquetas de destaque.

---

## Tipografías

Cargadas en tiempo de render mediante `@remotion/google-fonts`.

| Variable | Familia | Pesos cargados | Uso |
|---|---|---|---|
| `INTER` | Inter | 300, 400, 500, 600, 700, 800 | Cuerpo de texto, captions, etiquetas, valores numéricos |
| `OUTFIT` | Outfit | 400, 500, 600, 700 | Títulos, etiquetas superiores (caps), nombres de módulos |

**Nota:** las tipografías no se redistribuyen con el repositorio. Se cargan desde Google Fonts durante el proceso de render. Ambas están bajo licencia OFL 1.1 (Open Font License).

---

## Componentes FX reutilizables

### `Background`

Fondo degradado con tinte de color y ligera variación de luminosidad. Acepta `hue` (uno de los colores de `C`) para ajustar la tonalidad base.

```tsx
<Background hue={C.blue} />
<Background hue={C.green} />
```

---

### `Glass`

Panel de glassmorphism animable. Los parámetros clave:

| Prop | Descripción |
|---|---|
| `tint` | Color del panel (alpha reducido del color base) |
| `rainbow` | Intensidad del borde iridiscente (0–1) |
| `style` | Posición, tamaño y cualquier estilo CSS adicional |

```tsx
<Glass tint={C.blue} rainbow={0.4} style={{left:130, top:365, width:810, height:485}}>
  {/* contenido */}
</Glass>
```

---

### `Title` + `Grad`

`Title` renderiza texto grande con `prog`-driven opacity/translate. `Grad` aplica un gradiente de texto CSS inline.

```tsx
<Title p={prog(t, 0.2, 0.8)} y={150} size={76}>
  La transformación <Grad>digital</Grad>
</Title>

<Title p={end} y={145} size={65}>
  Fortalecer las capacidades<br/>
  <Grad from={C.orange} to={C.yellow}>desde adentro.</Grad>
</Title>
```

`Grad` usa por defecto `from={C.blue}` `to={C.green}` cuando no se especifican colores.

---

### `Prism`

Efecto de dispersión de luz tipo prisma. Parámetros principales:

| Prop | Descripción |
|---|---|
| `cx`, `cy` | Centro del prisma en px |
| `size` | Tamaño del triángulo central |
| `inP`, `outP` | Progreso de entrada/salida |
| `spread` | Ángulo de dispersión del espectro |
| `outLen` | Longitud de los rayos espectrales |
| `inAngle` | Ángulo de incidencia de la luz entrante |
| `colors` | Colores del espectro (default: azul, verde, naranja) |

Aparece en escena 1 (transición de conocimiento a oportunidad) y escena 21 (créditos).

---

### `InstitutionalIcon`

Icono Lucide renderizado sobre SVG con efecto de resplandor (glow) y etiqueta de texto. Usado para representar instituciones, áreas funcionales y conceptos.

```tsx
<InstitutionalIcon
  Icon={Landmark}
  label="Banco"
  x={580} y={610}
  scale={1.2}
  color={C.orange}
  glow={0.6}
/>
```

---

### `Person`

Figura humana vectorial SVG. Parametrizada con:

| Prop | Descripción |
|---|---|
| `x`, `y` | Posición central |
| `scale` | Escala relativa (1 = tamaño normal) |
| `color` | Color del personaje |
| `mood` | Expresión facial (0 = neutral, 1 = activo) |
| `look` | Dirección de la mirada (-1 a 1) |
| `glow` | Intensidad del resplandor |

Usado para Isabel (naranja) y figuras secundarias (azul, verde).

---

### `Doc`

Documento SVG animado que representa propuestas, fichas académicas y documentos institucionales.

```tsx
<Doc x={960} y={650} w={180} glow={0.6} />
```

---

### `Sfx`

Activador declarativo de efectos de sonido. Dispara el audio en el fotograma correspondiente al tiempo `at`.

```tsx
<Sfx at={v('plataformas')} name="pop" vol={0.15} />
<Sfx at={at(7, 'fortalecer')} name="ding" vol={0.14} />
```

**Efectos disponibles** (archivos en `public/sfx/`): `boom` · `click` · `ding` · `key` · `pad` · `pop` · `rise` · `shimmer` · `whoosh`

---

### `Captions`

Subtítulos por palabra generados a partir de `words.json`. Aparecen sincronizados con la locución y se animan fotograma a fotograma.

---

## Principios de diseño visual

1. **Jerarquía por color**: azul = digital/sistema, naranja = humano/persona, verde = propuesta/resultado.
2. **Glassmorphism controlado**: los paneles Glass usan opacidad reducida y blur para mantener legibilidad sobre el fondo oscuro.
3. **Gradientes de texto** (`Grad`): reservados para la segunda línea de títulos, siempre con la paleta aprobada.
4. **Tipografía legible**: tamaños ≥ 25 px en cuerpo, ≥ 60 px en títulos. Nunca texto decorativo ilegible.
5. **SVG animado**: los trazos SVG (arcos de conexión, partículas, líneas) usan `strokeDashoffset={-t*N}` para crear movimiento continuo sutil.
6. **Consistencia de espacio**: márgenes laterales de 110–160 px; área segura 1920×1080.

---

## Tokens de color no documentados en el código

| Token | Valor | Nota |
|---|---|---|
| `C.violet` | `#F46A25` | Alias de orange, usado en el prisma |
| `C.emerald` | `#45C99A` | Alias de green |
| `C.mente1`, `C.mente2` | `#56B3F3` | Alias de blue (herencia del motor NuevaMente) |
| `RAINBOW_CONIC` | conic-gradient | Gradiente cónico para bordes iridiscentes |
