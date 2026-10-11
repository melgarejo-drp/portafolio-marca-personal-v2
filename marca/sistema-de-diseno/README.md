# Simón Melgarejo — sistema de diseño (v1)

Libro de marca y documento base del sistema de diseño de **Simón Melgarejo**: filmmaker, editor e investigador de IA, en Colombia.
Sirve para personas y para agentes. Cada valor sale del portafolio publicado (`assets/site.css`, `build/gen.mjs`, `build/data.mjs`).
Cuando un valor es **derivado** (no existe en el sitio) se marca así.

> Marca anterior obsoleta: la paleta verde/oscura con la tipografía Anybody (repo `portfolio-simon`) **ya no se usa**. No mezclar.

## Contenido del paquete

| Archivo | Qué es |
|---|---|
| `README.md` | Este libro de marca. Empieza aquí. |
| `tokens.json` | Tokens en el formato del tipo Design System de Claude: color (temas Papel y Sala), tipografía, spacing, radius, shadow. |
| `tokens.css` | Los mismos tokens como custom properties (`:root` = Papel, `[data-theme="dark"]` = Sala) con sus `clamp()` reales y los `@font-face`. |
| `muestras.html` | Hoja visual autocontenida (doble clic, sin servidor): paleta con contraste, especímenes, componentes en sus estados, plantillas de redes, hacer / no hacer. |
| `fonts/` | `inter-tight.woff2`, `inter-tight-italic.woff2` (variables 100–900), `jetbrains-mono.woff2` (400). |
| `assets/` | `monograma-sm.svg`, `simon_profile.webp` (1024×1024), `artista/01–06.webp` (600×750, 4:5), `og.jpg` (1200×630). |

**Para agentes:** lee este README entero, toma los valores de `tokens.json` (o `tokens.css` si generas CSS) y copia el marcado de la sección Componentes tal cual. En `tokens.json` los tamaños de letra, el gutter y el radio son el **máximo** de su `clamp()`; en web usa siempre el `clamp()` que aparece en las tablas y en `tokens.css`.

---

## 1. Esencia y posicionamiento

**Quién:** Simón Melgarejo, comunicador audiovisual, filmmaker e investigador de IA. Dirige la parte creativa de **Lemon Drop** (producción audiovisual, contenido para redes y edición con IA).

**Qué hace:** dirección, filmmaking, montaje, colorización e IA creativa, "de punta a punta". Del cortometraje al reel.

**Idea central:** *no solo organiza clips: construye sistemas para contar historias.* Mentalidad de cineasta con la eficiencia de la producción independiente; la IA como amplificador, nunca como reemplazo del criterio.

**Tres pilares** (página de marca personal):

| Signo | Pilar | En una frase (texto real) |
|---|---|---|
| ◐ | **Creación audiovisual** | "Dirijo, grabo, edito y coloreo. Del guion a la pieza final, en formatos que van del cortometraje al reel." |
| ◇ | **Estudio de la IA** | "Investigo y pruebo herramientas generativas para ampliar lo que una historia puede hacer: video con IA, edición automatizada y flujos que ahorran horas sin quitarle el criterio a nadie." |
| ✎ | **Pasión por lo artesanal** | "Ilustración a mano, animación y piezas hechas con tiempo. El Invasor, ganador en Cineminutos por el Océano, nació así." |

**Personalidad visual:** editorial y minimalista. Papel claro, tinta casi negra, tipografía enorme y apretada, mucho aire y **un solo rojo**. Las metáforas vienen de la sala de montaje: línea de tiempo, cabezal, pistas, corte, hoja de contactos.

**Firma:** `Simón Melgarejo` · `Filmmaker, editor e investigador de IA` · `Colombia`.

**Redes**

| Red | Usuario | URL | Verificado en el sitio |
|---|---|---|---|
| Instagram | @smnmelgarejo | https://www.instagram.com/smnmelgarejo/ | Sí (`data.mjs`) |
| TikTok | @simnmelgarejo | https://www.tiktok.com/@simnmelgarejo | **No**: dato del encargo, no aparece en el sitio |
| YouTube | @simonmelgarejo | https://www.youtube.com/@simonmelgarejo | Sí |
| LinkedIn | simon-melgarejo | https://www.linkedin.com/in/simon-melgarejo/ | Sí |

---

## 2. Voz y tono

Simón habla como edita: **cortes limpios, frases cortas, primera persona y un verbo concreto.** Tutea al lector. Usa el vocabulario del oficio (plano, corte, línea de tiempo, pista, cabezal) como metáfora.

**Rasgos**

- Primera persona del singular: "Dirijo", "Investigo", "Creo, estudio y hago a mano."
- Ternas y enumeraciones con ritmo: "Visión. *Sistema.* Ejecución." · "Idea, cámara, *corte* y entrega."
- Dos puntos para el giro: "No solo organizo clips en una línea de tiempo: *construyo sistemas para contar historias.*"
- Titulares que terminan en un remate en itálica (en pantalla, color `muted`): "Hecho para *el scroll.*", "Hagamos algo *cinematográfico.*", "Creo, estudio y hago *a mano.*"
- La IA siempre al servicio del criterio: "Uso la IA como un amplificador, para expandir lo que es posible bajo restricciones."
- Humor de oficio, discreto: 404 → "Este plano no quedó en el corte final."
- Concreción con cifras: "12 piezas en 40 minutos", "1.2M vistas", "150k+".

**Convenciones de escritura**

- Español con tildes y signos de apertura (¿ ¡). Anglicismos aceptados del oficio: filmmaker, reel, VFX, podcast.
- Números de orden con dos dígitos: `01`, `05`, `(18)`.
- Separador de metadatos: punto medio ` · ` ("Colombia · 14:32", "Cortometraje · 2023").
- Rangos de años con flecha, del más reciente al más antiguo: `2026 → 2022`.
- Colaboraciones con `×`: "UMS × Juanse Laverde", "Chef Felipe Hincapié × Beluga".
- Títulos de obra en itálica: *Al fuego*.
- Flechas como texto en navegación: `← Trabajos`, `Volver arriba ↑`, enlaces externos `Instagram ↗`.

**Hacer / no hacer**

| Hacer | No hacer |
|---|---|
| "No solo organizo clips. Construyo sistemas narrativos." | "Somos una agencia líder en soluciones audiovisuales disruptivas." |
| "Cuéntame del proyecto: formato, tiempos y lo que quieres que sienta la gente. Te respondo por correo." | "¡¡Contáctanos ya!! Respuesta inmediata garantizada." |
| "El ritmo se entrena con baquetas y se aplica en la línea de tiempo." | "Me apasiona la música y me encanta el ritmo." |
| "Lápiz y papel antes que cualquier software." | Frases genéricas sin imagen: "Soy muy creativo y detallista." |
| CTA de dos palabras: "Ver reel", "Ver trabajos", "Hablemos". | CTA largos o en mayúsculas: "HAZ CLIC AQUÍ PARA DESCUBRIR MÁS". |
| La IA como herramienta: "flujos que ahorran horas sin quitarle el criterio a nadie". | Vender la IA como magia: "La IA lo hace todo por ti". |
| Sin emojis; ★ solo para galardones. | Emojis como iconos o decoración (🏆🔥🎬). |
| Tercera persona solo en metadatos (SEO, créditos). | Tercera persona corporativa en textos de marca. |

**Repertorio real (para citar o adaptar)**

- Hero: "No solo organizo clips en una línea de tiempo: *construyo sistemas para contar historias.* Dirección, montaje, VFX, color e IA, de punta a punta."
- Sobre mí: "Visión. *Sistema.* Ejecución." · "Mi proceso combina la mentalidad de un cineasta con la eficiencia de la producción independiente."
- Marca personal: "Creo, estudio y hago *a mano.*" · "Puedo idear una pieza, ponerle la cara, grabarla y editarla. Contenido vertical con voz propia, hecho por alguien que de verdad usa, prueba y cuenta."
- Redes: "Hecho para *el scroll.*" · "Ganchos en los primeros segundos, subtítulos y un ritmo pensado para que nadie pase de largo."
- Contacto: "Hagamos algo *cinematográfico.*" · Pie: "¿Tienes una historia?" → "Hablemos".
- CTA de marca: "¿Tu marca necesita a alguien que la cuente?"
- Servicios: "Cortando líneas de tiempo para un ritmo agresivo e intencional." · "Paletas industriales y melancólicas."
- Fotografía: "Mi trabajo era estar ahí sin estorbar, y lograr que las fotos se sintieran como la noche y no como un catálogo." · "El fuego no se pone en pausa para la foto."
- Microcopia: "Disponible para proyectos" · "Arrastra, desliza o usa ← →" · "Ningún proyecto con ese filtro." · "Ver proyecto" · "Volver arriba ↑".

---

## 3. Color

Papel, tinta y **un solo rojo**. El rojo marca lo que está vivo: el cabezal, el estado, la cita, el clic.

### 3.1 Tema Papel (light) — el del sitio

| Token | Valor | Uso |
|---|---|---|
| `--bg` | `#F2F1EE` | Fondo de página ("papel"). |
| `--bg-2` | `#E8E6E1` | Fondo secundario: placeholders de imagen, media sin cargar. |
| `--surface` | `#FFFFFF` | Tarjetas: clip, pillar, award, blob-cta, contadores. |
| `--ink` | `#111110` | Texto principal, titulares, fondo de `pill-dark` y chip activo, bloques de contacto y pie. |
| `--ink-2` | `#3B3A37` | Texto secundario: leads, párrafos de apoyo, enlaces del nav en reposo. |
| `--muted` | `#7A7872` | Metadatos, eyebrows, contadores `<sup>`, itálica de énfasis en titulares. **Ver contraste.** |
| `--muted-aa` | `#66645F` | **Derivado.** Variante de `muted` que pasa AA para texto pequeño. |
| `--line` | `rgba(17,17,16,.12)` | Filetes y divisores. |
| `--line-2` | `rgba(17,17,16,.22)` | Bordes de controles (pill, chip, round, subrayado de link-arrow). |
| `--accent` | `#D62F1F` | **Único acento.** Cabezal de la línea de tiempo, punto de estado, hover del CTA oscuro, comillas de cita, subrayado de títulos narrativos, ★, fondo de la transición, anillo de foco. |
| `--accent-text` | `#B8281A` | **Derivado.** Rojo para texto pequeño que debe leerse (números de capítulo, etiquetas). |
| `--on-ink` | `#F2F1EE` | Texto sobre `ink`. |
| `--on-accent` | `#FFFFFF` | Texto sobre `accent` (el sitio ya usa `#fff` en hover de pill-light, índice cued y etiqueta de transición). |
| `--on-ink-2` | `rgba(242,241,238,.7)` | Texto secundario dentro de bloques ink. |
| `--on-ink-dim` | `rgba(242,241,238,.55)` | Eyebrows y etiquetas mono dentro de bloques ink. |

### 3.2 Tonos fijos (iguales en ambos temas)

| Token | Valor | Uso |
|---|---|---|
| `--tone-ink` | `#111110` | Portada tipográfica, texto `#F2F1EE`. |
| `--tone-accent` | `#D62F1F` | Portada tipográfica, texto `#F2F1EE`. |
| `--tone-clay` | `#B9A48F` | Portada tipográfica, texto `#111110`. |
| `--tone-sand` | `#DCD6C8` | Portada tipográfica, texto `#111110`. |
| `--sala-bg` | `#141110` | Sala de montaje (sección oscura de Trabajos): fondo. |
| `--sala-2` | `#1F1A17` | Sala: clips y etiquetas de pista. |
| `--sala-3` | `#2A2320` | Sala: clip en hover/foco. |
| `--sala-fg` | `#EFE9DE` | Sala: texto. |
| `--sala-dim` | `rgba(239,233,222,.45)` | Sala: metadatos no esenciales. **Ver contraste.** |
| `--sala-line` | `rgba(239,233,222,.14)` | Sala: bordes, marcas mayores de la regla. |
| `--sala-line-soft` | `rgba(239,233,222,.08)` | Sala: divisores internos, marcas menores. |
| `--story-bg` | `#0E0C0A` | Relatos fotográficos y página de contacto: sala cálida y nocturna. |
| `--story-ink` | `#EFE9E1` | Relato: texto. |
| `--story-dim` | `rgba(239,233,225,.58)` | Relato: texto de capítulo, subtítulos, eyebrows. |
| `--story-line` | `rgba(239,233,225,.14)` | Relato: filetes. |
| `--nav-glass` | `rgba(242,241,238,.82)` (Sala: `rgba(14,12,10,.82)`) | Fondo del nav con scroll + `backdrop-filter: saturate(1.4) blur(14px)`. |
| `--overlay` | `rgba(10,10,10,.86)` | Velo del modal del reel (el visor de fotos usa `rgba(12,12,12,.94)`). |
| `--letterbox` | `#1A1A1A` | Fondo de media vertical encajada en un marco 16:9. |

### 3.3 Tema Sala (dark) — derivado de la sala de montaje

El sitio no tiene modo oscuro global; tiene **secciones** oscuras (sala de montaje, relatos, contacto). El tema Sala lleva esa paleta a todos los tokens semánticos para piezas oscuras (miniaturas, presentaciones, stories nocturnas).

| Token | Sala | Origen |
|---|---|---|
| `--bg` | `#141110` | `--nle-bg` del sitio |
| `--bg-2` | `#1F1A17` | `--nle-2` |
| `--surface` | `#2A2320` | `--nle-3` |
| `--ink` | `#EFE9DE` | `--nle-fg` |
| `--ink-2` | `#CFC8BC` | derivado (11.31:1 sobre bg) |
| `--muted` / `--muted-aa` | `#9A948B` | derivado; sustituye a `--nle-45` (que no pasa AA) |
| `--line` | `rgba(239,233,222,.14)` | `--nle-14` |
| `--line-2` | `rgba(239,233,222,.22)` | derivado (simétrico a Papel) |
| `--accent` | `#D62F1F` | igual: el rojo no cambia |
| `--accent-text` | `#F26450` | derivado: rojo aclarado para texto pequeño sobre oscuro |
| `--on-ink` | `#141110` | texto sobre `ink` claro |
| `--on-accent` | `#FFFFFF` | igual |

En Sala, los bloques "de contraste" (lo que en Papel es un bloque `ink`, como contacto o pie) se resuelven con `--surface` o `--story-bg`, no invirtiendo a crema.

### 3.4 Contraste verificado (WCAG 2.x)

Luminancia relativa WCAG; los colores con alfa se componen sobre su fondo antes de medir. AA normal ≥ 4.5:1; AA grande (≥ 24px, o ≥ 18.66px en negrita) y elementos no textuales ≥ 3:1.

| Texto / elemento | Fondo | Ratio | Resultado | Uso permitido |
|---|---|---|---|---|
| ink `#111110` | bg `#F2F1EE` | **16.73:1** | AA | Todo texto |
| ink | bg-2 `#E8E6E1` | 15.15:1 | AA | Todo texto |
| ink | surface `#FFFFFF` | 18.89:1 | AA | Todo texto |
| ink-2 `#3B3A37` | bg | 10.07:1 | AA | Párrafos, leads |
| ink-2 | bg-2 | 9.12:1 | AA | Párrafos |
| ink-2 | surface | 11.37:1 | AA | Texto de pillar |
| muted `#7A7872` | bg | **3.91:1** | **No pasa 4.5** | Solo texto ≥ 24px (itálica de énfasis en titulares) o metadatos no esenciales |
| muted | bg-2 | **3.54:1** | **No pasa 4.5** | Solo ≥ 24px |
| muted | surface | **4.41:1** | **No pasa 4.5** | Solo ≥ 24px (en el sitio: `clip-role`) |
| muted | ink `#111110` | 4.28:1 | No pasa 4.5 | No usar como texto sobre ink |
| muted-aa `#66645F` | bg | 5.23:1 | AA | Eyebrows y metadatos pequeños |
| muted-aa | bg-2 | 4.74:1 | AA | Ídem |
| muted-aa | surface | 5.91:1 | AA | Ídem |
| on-ink `#F2F1EE` | ink | 16.73:1 | AA | Todo texto |
| on-ink `#F2F1EE` | accent `#D62F1F` | **4.34:1** | **No pasa 4.5** | Solo ≥ 24px (tc-title en tone-accent). En botones usa on-accent |
| on-accent `#FFFFFF` | accent | 4.90:1 | AA | Texto de botón en hover, índice cued, etiqueta de la transición |
| accent `#D62F1F` | bg | **4.34:1** | **No pasa 4.5** | Comillas, ★, signos de pilar, puntos, cabezal; texto solo ≥ 24px |
| accent | bg-2 | 3.93:1 | AA grande | No-texto |
| accent | surface | 4.90:1 | AA | ★ dentro del award |
| accent-text `#B8281A` | bg | 5.54:1 | AA | Texto rojo pequeño |
| accent-text | bg-2 / surface | 5.02:1 / 6.26:1 | AA | Ídem |
| ink | tone-clay `#B9A48F` | 7.89:1 | AA | Portada tipográfica |
| ink | tone-sand `#DCD6C8` | 13.04:1 | AA | Portada tipográfica |
| on-ink-2 `rgba(242,241,238,.7)` | ink | 8.50:1 | AA | Secundario en bloques ink |
| on-ink-dim `rgba(242,241,238,.55)` | ink | 5.62:1 | AA | Eyebrows de contacto y pie |
| `rgba(242,241,238,.5)` (em del contact-title) | ink | 4.85:1 | AA | Itálica de énfasis sobre ink |
| tc-meta `rgba(242,241,238,.7)` | accent | **2.78:1** | **No pasa** | Decorativo (repite datos del título) |
| tc-meta `rgba(17,17,16,.7)` | tone-clay | 4.48:1 | AA grande | Decorativo |
| line `rgba(17,17,16,.12)` | bg | 1.29:1 | No pasa 3:1 | Solo filetes decorativos |
| line-2 `rgba(17,17,16,.22)` | bg | **1.61:1** | **No pasa 3:1** | Borde de control: decorativo, la etiqueta identifica el control |
| **Sala** ink `#EFE9DE` | bg `#141110` | 15.55:1 | AA | Todo texto |
| Sala ink | bg-2 `#1F1A17` | 14.27:1 | AA | Todo texto |
| Sala ink | surface `#2A2320` | 12.78:1 | AA | Todo texto |
| Sala ink-2 `#CFC8BC` | bg / surface | 11.31:1 / 9.30:1 | AA | Secundario |
| Sala muted `#9A948B` | bg / bg-2 / surface | 6.25:1 / 5.73:1 / 5.14:1 | AA | Metadatos |
| sala-dim `rgba(239,233,222,.45)` | sala-bg | **3.95:1** | **No pasa 4.5** | Solo metadatos no esenciales (así está en el sitio) |
| sala-dim | sala-2 | 3.90:1 | No pasa 4.5 | Ídem |
| Sala accent `#D62F1F` | bg | **3.84:1** | AA grande | Cabezal, puntos, ★, texto ≥ 24px |
| Sala accent | sala-2 / surface | 3.52:1 / 3.15:1 | AA grande | No-texto |
| Sala accent-text `#F26450` | bg / bg-2 / surface | 6.01:1 / 5.51:1 / 4.94:1 | AA | Texto rojo pequeño |
| Sala on-ink `#141110` | ink `#EFE9DE` | 15.55:1 | AA | pill-dark en Sala |
| Sala line-2 | bg | 1.85:1 | No pasa 3:1 | Decorativo |
| story-ink `#EFE9E1` | story-bg `#0E0C0A` | 16.19:1 | AA | Todo texto |
| story-dim `rgba(239,233,225,.58)` | story-bg | 5.86:1 | AA | Texto de capítulo |

**Desajustes del sitio publicado (conservar, pero no repetir en piezas nuevas)**

1. Eyebrows, `sec-note`, `work-meta` y metadatos usan `muted` a .64–.72rem: 3.91:1. En piezas nuevas usa `muted-aa`.
2. `.pill-dark:hover` pasa a fondo rojo pero deja el texto en `on-ink` `#F2F1EE`: 4.34:1. Corrección recomendada: `color: var(--on-accent)` (4.90:1), como ya hace `.pill-light:hover`.
3. `.bay-eyebrow` y `.nle-tc` son texto rojo de .62–.7rem sobre `#141110`: 3.84:1. En piezas nuevas usa `accent-text` (Sala).

---

## 4. Tipografía

### 4.1 Familias

| Familia | Archivo | Pesos | Uso |
|---|---|---|---|
| **Inter Tight** | `fonts/inter-tight.woff2` + `fonts/inter-tight-italic.woff2` | variable 100–900, normal e itálica | **Todo**: titulares, texto, botones, navegación, la sala de montaje. |
| **JetBrains Mono** | `fonts/jetbrains-mono.woff2` | 400 | **Solo** metadatos: eyebrows, notas de sección, contadores, fechas, etiquetas, timecode. Casi siempre en MAYÚSCULAS con tracking .05–.06em. |

```css
--f-sans: 'Inter Tight', ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif;
--f-mono: 'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace;
```

Pesos en uso: **500** para titulares y etiquetas, **400** para texto y citas en itálica, **600** para la marca (`brand`) y `<strong>`, **700** solo en la sala de montaje (`bay-title`, `nle-title`, en MAYÚSCULAS). No uses 800–900.

### 4.2 Escala completa

Tamaños fluidos con `clamp()`. "Máx." es el valor que va en `tokens.json`.

**Display** (Inter Tight)

| Estilo | Tamaño | Máx. | Peso | Tracking | Interlineado | Uso |
|---|---|---|---|---|---|---|
| `hero-title` | `clamp(4rem,23.5vw,24rem)` | 384px | 500 | -.065em | .84 (.88 bajo 700px) | Nombre en el héroe del inicio, en dos líneas que suben (`rise` 1.1s). |
| `footer-mark` | `clamp(3rem,14.2vw,15rem)` | 240px | 500 | -.07em | .9 | Nombre a todo el ancho en el pie, una línea, centrado. |
| `st-title` | `clamp(4rem,13vw,13rem)` | 208px | 500 | -.075em | .82 | Título de relato fotográfico, con subrayado rojo `.42em × .06em`. |
| `page-title` | `clamp(3rem,10vw,9.5rem)` | 152px | 500 | -.065em | .88 | Titular de páginas internas ("Hecho para *el scroll.*"). `text-wrap: balance`. |
| `p-title` | `clamp(2.6rem,8vw,8.5rem)` | 136px | 500 | -.065em | .9 | Título de proyecto (máx. 16ch). |
| `contact-title` | `clamp(2.8rem,7vw,7rem)` | 112px | 500 | -.06em | .9 | "Hagamos algo *cinematográfico.*" |
| `about-title` | `clamp(2.6rem,6.4vw,6rem)` | 96px | 500 | -.06em | .92 | "Visión. *Sistema.* Ejecución." |
| `sec-title` | `clamp(2.3rem,6vw,5.4rem)` | 86.4px | 500 | -.055em | .95 | Título de sección con contador `<sup>(05)</sup>`. |
| `st-quote` | `clamp(2rem,5.2vw,5rem)` | 80px | 400 itálica | -.05em | 1 | Cita narrativa (máx. 16ch) con comillas rojas. |
| `svc-title` | `clamp(1.9rem,4.6vw,4rem)` | 64px | 500 | -.055em | 1 | Servicio en la lista "Lo que hago". |
| `kpi` | `clamp(2.2rem,4.5vw,4rem)` | 64px | 500 | -.06em | 1 | Cifra de impacto. |
| `footer-mail` | `clamp(2rem,5vw,4rem)` | 64px | 500 | -.05em | 1 | "Hablemos" en el pie. |
| `stat` | `clamp(1.7rem,2.8vw,2.7rem)` | 43.2px | 500 | -.05em | 1 | Datos de "Sobre mí". |
| `p-quote` | `clamp(1.5rem,3vw,2.6rem)` | 41.6px | 500 itálica | -.04em | 1.1 | Cita de proyecto (con filete rojo de 2px a la izquierda en el sitio). |
| `pillar-title` | `clamp(1.6rem,2.6vw,2.3rem)` | 36.8px | 500 | -.05em | 1 | Título de pilar. |
| `tc-title` | `clamp(1.35rem,2.3vw,2.2rem)` | 35.2px | 500 | -.05em | .95 | Título de portada tipográfica (máx. 12ch). |

**Texto** (Inter Tight)

| Estilo | Tamaño | Máx. | Peso | Tracking | Interlineado | Uso |
|---|---|---|---|---|---|---|
| `st-lead` | `clamp(1.35rem,2.5vw,2.25rem)` | 36px | 400 | -.03em | 1.22 | Introducción de relato. |
| `p-lead` | `clamp(1.25rem,2.1vw,1.85rem)` | 29.6px | 400 | -.03em | 1.3 | Lead de página y de proyecto (Reto / Respuesta). |
| `work-title` | `clamp(1.3rem,2vw,1.75rem)` | 28px | 500 | -.035em | 1.1 | Título de work-card. |
| `hero-lede` | `clamp(1.05rem,1.5vw,1.3rem)` | 20.8px | 400 | -.015em | 1.4 | Bajada del héroe (máx. 34rem), `em` en ink. |
| `brand` | `1.1rem` | 17.6px | 600 | -.03em | 1.2 | Nombre en la barra de navegación. |
| `clip-title` | `1.08rem` | 17.28px | 500 | -.025em | 1.15 | Título de clip de la línea de tiempo. |
| `body` | `clamp(15px,1.05vw,17px)` | 17px | 400 | 0 | 1.55 | Texto base. |
| `label` | `.95rem` | 15.2px | 500 | -.01em | 1.2 | Pills, enlaces del nav (chip: .88rem). |
| `small` | `.82rem` | 13.12px | 400 | 0 | 1.35 | Rol del clip, pies de pieza (.88rem). |

**Mono** (JetBrains Mono 400, MAYÚSCULAS salvo timecode)

| Estilo | Tamaño | Máx. | Tracking | Uso |
|---|---|---|---|---|
| `st-ch-n` | `.8rem` | 12.8px | 0 | Número de capítulo `04/06` (en rojo). |
| `eyebrow` | `.72rem` | 11.52px | .06em | Rótulo sobre titulares; `margin-bottom: .9rem`. |
| `sec-note` | `.72rem` | 11.52px | .05em | Nota a la derecha del título de sección; meta del héroe. |
| `work-meta` | `.7rem` | 11.2px | 0 | Formato · año de una work-card (con punto de 4px). |
| `award` | `.66rem` | 10.56px | .03em | Texto del galardón. |
| `meta-label` | `.64rem` | 10.24px | 0 | `dt` de KPIs, stats y fichas; barra del clip. |
| `tc-meta` | `.62rem` | 9.92px | .06em | Pie de portada tipográfica (opacidad .7); índice del clip. |

### 4.3 Reglas

- Titulares: peso 500, tracking entre **-.055em y -.075em**, interlineado **.82–.95**. Cuanto más grande, más apretado.
- Énfasis dentro de un titular: `<em>` en itálica de Inter Tight y color `--muted` (sobre ink: `rgba(242,241,238,.5)`). Siempre al final de la frase: "Hecho para *el scroll.*"
- Contador de sección: `<sup>(05)</sup>` en mono, `.28em`, color `muted`, desplazado `top: .35em`.
- Nunca MAYÚSCULAS sostenidas en Inter Tight (excepción: la sala de montaje, peso 700). Las mayúsculas son de la mono.
- Medidas máximas: lead 36–40rem, `hero-lede` 34rem, `p-title` 16ch, `st-quote` 16ch, `tc-title` 12ch.
- Cifras tabulares (`font-variant-numeric: tabular-nums`) en reloj, timecode, contadores y años.

---

## 5. Layout, espaciado, radios, sombras y movimiento

| Token | Valor real | En `tokens.json` | Uso |
|---|---|---|---|
| `--container-max` | `1520px` | 1520px | `.wrap { max-width: 1520px; margin: 0 auto; padding: 0 var(--gutter) }` |
| `--gutter` | `clamp(1rem,4vw,3rem)` | 3rem | Margen lateral: 16px en móvil, 48px desde 1200px. |
| `--section-y` | `clamp(4rem,8vw,7rem)` | 7rem | Padding vertical de cada sección. |
| `--nav-h` | `64px` | 64px | Alto del nav; `scroll-padding-top: calc(var(--nav-h) + 8px)`. |
| `--grid-gap` | `clamp(1rem,2vw,1.6rem)` | 1.6rem | Grillas de tarjetas. |
| `--work-grid-row` | `clamp(2.2rem,4vw,3.5rem)` | 3.5rem | Gap vertical de la grilla de trabajos (columnas: `clamp(1rem,2vw,1.6rem)`). |
| sec-head | `margin-bottom: clamp(1.8rem,4vw,3rem); padding-bottom: 1.1rem` | — | Separación título → contenido, con filete `line`. |
| `--space-1…6` | `.5rem · .9rem · 1rem · 1.4rem · 2rem · 3rem` | ídem | Escala de separaciones observada en el sitio. |
| `--control-h` | `44px` | 44px | Pill y botón de menú (objetivo táctil). |
| `--control-h-sm` | `38px` | 38px | nav-cta y blob-cta. |
| `--chip-h` | `36px` | 36px | Chip de filtro. |
| `--round-size` | `48px` | 48px | Botón redondo. |

**Retículas:** trabajos destacados en 2 columnas (1 bajo 760px); todos los trabajos en 3 → 2 (≤1000px) → 1 (≤600px), con los proyectos premiados ocupando 2 columnas; pilares en 3 (1 bajo 900px); relatos en 12 columnas con fotos desplazadas (duo, duo-r, trio, mosaic, wide).

**Radios**

| Token | Valor | Uso |
|---|---|---|
| `--radius` | `clamp(10px,1.2vw,18px)` (18px en tokens) | Media y tarjetas. |
| `--radius-trail` | `calc(var(--radius) * .8)` | Imágenes de la estela del héroe. |
| `--radius-half` | `calc(var(--radius) * .5)` | Fotos de relatos. |
| `--radius-thumb` | `4px` | Hoja de contactos, anillo de foco. |
| `--radius-window` | `2px` | Ventana de la transición. |
| `--radius-pill` | `99px` | Pills, chips, award, contadores. |
| `--radius-circle` | `50%` | Round, punto de estado, play, sonido. |

**Sombras** (pocas y bajas: la profundidad viene de la foto)

| Token | Valor | Uso |
|---|---|---|
| `--shadow-nav` | `0 1px 0 rgba(17,17,16,.12)` | Filete del nav con scroll. |
| `--shadow-lift` | `0 24px 40px -28px rgba(0,0,0,.45)` | Clip en hover (+ `translateY(-6px)`). |
| `--shadow-float` | `0 20px 50px -20px rgba(0,0,0,.35)` | Imágenes de la estela. |
| `--shadow-badge` | `0 6px 20px -10px rgba(0,0,0,.4)` | Award sobre portada. |
| `--shadow-playhead` | `0 0 12px rgba(214,47,31,.45)` | Brillo del cabezal en la sala. |

**Movimiento**

- Curva única: `--ease: cubic-bezier(.22,1,.36,1)`.
- Duraciones: color de chips y enlaces .25s; pills y bordes .3s; filas de servicio y clips de la sala .55s; aparición al hacer scroll .9s (`opacity 0 → 1`, `translateY(28px) → 0`, escalonado 70–80 ms); zoom de imagen 1.2s (`scale(1.035)`); héroe `rise` 1.1s; título de relato 1.4s.
- Transición de página: 620 ms, `cubic-bezier(.76,0,.24,1)` (ver componente 18).
- Estado: `pulse` 2s infinito.
- `prefers-reduced-motion: reduce` apaga animaciones y transiciones (duración .01ms) y muestra todo en su estado final.

---

## 6. Fotografía e imagen

- **Color siempre.** El filtro blanco y negro → color del sitio está **desactivado** (`site.css`, bloque "efecto blanco y negro → color: desactivado por ahora"). No conviertas fotos a B/N por defecto.
  - Excepciones vigentes: miniaturas de la **hoja de contactos** en B/N con opacidad .75 que pasan a color en hover; fondo del encabezado de proyecto (portada en B/N, `blur(7px)`, opacidad .42) como textura detrás del título. Los fotogramas `artista/03–06` son tratamientos (B/N, duotono rojo, semitono) solo para el loop del retrato.
- **Luz real, según la serie.** Luz disponible cuando el ambiente es la historia ("Trabajé con la luz disponible —llamas, lámparas, el rojo del techo— para no romper el ambiente con un flash", *Al fuego*); flash cuando hay que congelar movimiento en penumbra ("Usé flash para congelar el movimiento en la penumbra del salón", *El Castillo*).
- **Series narrativas con capítulos.** Una colección es un relato: portada a sangre, introducción con créditos, capítulos numerados (`01/06`) con texto, disposiciones de fotos (duo, duo-r, trio, mosaic, wide), citas y una hoja de contactos al final. En el relato las fotos van en su **proporción natural, sin recortes**.
- **Estar sin estorbar.** Momentos antes y después de la acción, gestos, manos, el espacio vacío que espera. "Que las fotos se sintieran como la noche y no como un catálogo."
- **Formatos**

| Formato | Proporción | Dónde |
|---|---|---|
| Reels, stories, TikTok | 9:16 (1080×1920) | Redes, carrusel de la página de redes |
| Retratos, colecciones, carrusel de Instagram | 4:5 (1080×1350) | Retrato de "Sobre mí", loop del artista, portadas de colecciones |
| Video, portada de proyecto, YouTube | 16:9 (1920×1080 / 1280×720) | Portadas de proyecto, piezas, miniaturas |
| Work-card | 4:3 | Grillas de trabajos |
| Clip de línea de tiempo | 16:10 | Línea de tiempo |
| Hoja de contactos | 1:1 | Relatos |
| Imagen para compartir | 1200×630 | `assets/og.jpg` |

- Entrega web: WebP de ~1600px de ancho; videos H.264 con `faststart`.
- Media vertical dentro de un marco 16:9: `object-fit: contain` sobre `#1A1A1A` (`--letterbox`), nunca estirada.
- Todas las imágenes llevan `--radius` (o `radius-half` en relatos), sin bordes ni marcos.
- Retrato oficial: `assets/simon_profile.webp` (sonrisa, camiseta negra, manos juntas, fondo de vidrio con trazos turquesa).

---

## 7. Iconografía

- Iconos SVG en línea, `viewBox="0 0 24 24"`, **trazo 1.8** (sonido: 1.6), `stroke="currentColor"`, sin relleno salvo play y altavoz. Tamaño `1em` (en pills `.9em`; en round 18px).
- **Flecha diagonal ↗** = enlace, CTA y "ir a". En hover se desplaza `translate(2px,-2px)` (en next-title `4px,-4px`; en el pie gira 45° dentro del círculo rojo).
- **★** (texto, color `accent`) solo para galardones.
- Signos de pilar (texto, color `accent`, 1.6rem): ◐ creación audiovisual, ◇ estudio de la IA, ✎ lo artesanal.
- Flechas de texto para navegación: `←` volver, `→` siguiente, `↑` volver arriba, `↗` enlace externo.
- **Sin emojis**, nunca.

```html
<!-- arrow (↗) -->
<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9" fill="none" stroke="currentColor" stroke-width="1.8"/></svg>
<!-- play -->
<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5.5v13l11-6.5z" fill="currentColor"/></svg>
<!-- left / right -->
<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7" fill="none" stroke="currentColor" stroke-width="1.8"/></svg>
<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7" fill="none" stroke="currentColor" stroke-width="1.8"/></svg>
<!-- sound -->
<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9v6h4l5 4V5L8 9H4z" fill="currentColor"/><path d="M16 8.5a5 5 0 0 1 0 7M18.5 6a8.5 8.5 0 0 1 0 12" fill="none" stroke="currentColor" stroke-width="1.6"/></svg>
```

**Monograma** (`assets/monograma-sm.svg`): cuadrado `#111110` con radio 8/32, "SM" en Inter Tight 600 `#F2F1EE` (tracking -1) y un punto rojo `#D62F1F` arriba a la derecha. Es el favicon. Úsalo a partir de 16px; no lo recolorees ni le quites el punto. Nota: el SVG usa texto, no trazos; donde Inter Tight no está disponible (p. ej. al cargarlo como `<img>`) cae a Helvetica/Arial. Para impresión o piezas donde la forma deba ser exacta, conviértelo a contornos con Inter Tight 600.

---

## 8. Componentes

Todos usan los tokens de `tokens.css`. El CSS mostrado es el del sitio (resumido a lo esencial). Ejemplos renderizados en `muestras.html`.

### 01 · Pill

- **Propósito:** botón o enlace principal (CTA).
- **Anatomía:** etiqueta (+ icono opcional antes o después). 44px de alto, padding `0 1.25rem`, radio 99px, borde `line-2`, `.95rem` 500.
- **Variantes:** `pill` (contorno) · `pill-dark` (relleno ink) · `pill-light` (relleno on-ink, sobre fondos ink).
- **Estados:** hover del contorno → relleno ink; hover de `pill-dark` y `pill-light` → relleno rojo; foco: `outline 2px accent`, offset 3px.
- **Usar:** "Ver reel", "Ver trabajos", "Hablemos", "Enviar mensaje". Un solo `pill-dark` por grupo, a la izquierda.
- **No usar:** para filtros (usa chip) ni con más de 3–4 palabras; nunca en mayúsculas.

```html
<a class="pill pill-dark" href="/contacto">Hablemos <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9" fill="none" stroke="currentColor" stroke-width="1.8"/></svg></a>
<a class="pill" href="/trabajos">Ver trabajos</a>
```
```css
.pill{display:inline-flex;align-items:center;gap:.5rem;height:44px;padding:0 1.25rem;border-radius:99px;border:1px solid var(--line-2);font-size:.95rem;font-weight:500;letter-spacing:-.01em;white-space:nowrap;transition:background .3s var(--ease),color .3s var(--ease),border-color .3s var(--ease);}
.pill:hover{background:var(--ink);color:var(--on-ink);border-color:var(--ink);}
.pill-dark{background:var(--ink);color:var(--on-ink);border-color:var(--ink);}
.pill-dark:hover{background:var(--accent);border-color:var(--accent);color:var(--on-accent);} /* el sitio omite color: ver 3.4 */
.pill-light{background:var(--on-ink);color:var(--ink);border-color:var(--on-ink);}
.pill-light:hover{background:var(--accent);color:#fff;border-color:var(--accent);}
.pill svg{width:.9em;height:.9em;}
```

### 02 · Chip de filtro

- **Propósito:** filtrar listas (disciplina, cliente).
- **Anatomía:** `<button>` de 36px, padding `0 1rem`, radio 99px, `.88rem` 500, dentro de `.filters` (`role="group"`, gap .5rem, envuelve; en móvil se desplaza en horizontal).
- **Estados:** reposo (borde line-2) · hover (borde ink) · activo `aria-pressed="true"` (relleno ink).
- **Usar:** el primero siempre es "Todos"/"Todo". **No usar:** para navegar entre páginas.

```html
<div class="filters" role="group" aria-label="Filtrar proyectos">
  <button class="chip" type="button" aria-pressed="true">Todos</button>
  <button class="chip" type="button" aria-pressed="false">Dirección</button>
</div>
```
```css
.filters{display:flex;gap:.5rem;flex-wrap:wrap;}
.chip{height:36px;padding:0 1rem;border-radius:99px;border:1px solid var(--line-2);font-size:.88rem;font-weight:500;transition:background .25s,color .25s,border-color .25s;}
.chip:hover{border-color:var(--ink);}
.chip[aria-pressed="true"]{background:var(--ink);color:var(--on-ink);border-color:var(--ink);}
```

### 03 · Link-arrow

- **Propósito:** enlace secundario ("Todos los trabajos ↗", "Ver El Invasor ↗").
- **Anatomía:** texto 500 + flecha ↗; subrayado de 1px `line-2` con 2px de aire.
- **Estados:** hover → subrayado ink y flecha `translate(2px,-2px)`.
- **Usar:** junto al título de sección o al pie de una tarjeta. **No usar:** como CTA principal.

```html
<a class="link-arrow" href="/trabajos">Todos los trabajos <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9" fill="none" stroke="currentColor" stroke-width="1.8"/></svg></a>
```
```css
.link-arrow{display:inline-flex;align-items:center;gap:.4rem;font-weight:500;border-bottom:1px solid var(--line-2);padding-bottom:2px;transition:border-color .3s;}
.link-arrow:hover{border-color:var(--ink);}
.link-arrow svg{transition:transform .35s var(--ease);}
.link-arrow:hover svg{transform:translate(2px,-2px);}
```

### 04 · Botón redondo

- **Propósito:** anterior / siguiente en carruseles.
- **Anatomía:** círculo de 48px, borde line-2, icono de 18px. Siempre con `aria-label`.
- **Estados:** hover → relleno ink, icono on-ink. **No usar:** con texto dentro.

```html
<button class="round" type="button" aria-label="Pieza siguiente"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7" fill="none" stroke="currentColor" stroke-width="1.8"/></svg></button>
```
```css
.round{width:48px;height:48px;border-radius:50%;border:1px solid var(--line-2);display:flex;align-items:center;justify-content:center;transition:background .25s,color .25s,border-color .25s;}
.round:hover{background:var(--ink);color:var(--on-ink);border-color:var(--ink);}
.round svg{width:18px;height:18px;}
```

### 05 · Eyebrow

- **Propósito:** nombrar la sección o el contexto antes del titular ("Edición para redes", "Sobre mí", "Contacto").
- **Anatomía:** mono .72rem, MAYÚSCULAS, tracking .06em, color muted (en piezas nuevas `muted-aa`), margen inferior .9rem. Sobre ink: `on-ink-dim`.
- **No usar:** para frases largas (máx. ~5 palabras) ni dos eyebrows seguidos.

```html
<p class="eyebrow">Edición para redes</p>
```
```css
.eyebrow{font-family:var(--f-mono);font-size:.72rem;letter-spacing:.06em;text-transform:uppercase;color:var(--muted);margin-bottom:.9rem;}
```

### 06 · Título de sección con contador

- **Propósito:** abrir cada sección con su nombre y la cantidad de elementos.
- **Anatomía:** `.sec-head` (flex, filete inferior `line`) → `h2.sec-title` + `<sup>(NN)</sup>` + a la derecha `sec-note` o `link-arrow`.
- **Usar:** contador con dos dígitos entre paréntesis. **No usar:** el contador si no cuenta nada.

```html
<div class="sec-head">
  <h2 class="sec-title">Destacados <sup>(05)</sup></h2>
  <a class="link-arrow" href="/trabajos">Todos los trabajos <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9" fill="none" stroke="currentColor" stroke-width="1.8"/></svg></a>
</div>
```
```css
.sec-head{display:flex;justify-content:space-between;align-items:flex-end;gap:1rem 2rem;flex-wrap:wrap;margin-bottom:clamp(1.8rem,4vw,3rem);padding-bottom:1.1rem;border-bottom:1px solid var(--line);}
.sec-title{font-size:clamp(2.3rem,6vw,5.4rem);font-weight:500;letter-spacing:-.055em;line-height:.95;}
.sec-title sup{font-size:.28em;font-weight:400;letter-spacing:0;vertical-align:top;position:relative;top:.35em;margin-left:.2em;font-family:var(--f-mono);color:var(--muted);}
.sec-note{font-family:var(--f-mono);font-size:.72rem;text-transform:uppercase;letter-spacing:.05em;color:var(--muted);}
```

### 07 · Estado "Disponible para proyectos"

- **Propósito:** decir que Simón acepta trabajo. Arriba a la izquierda del héroe (`hero-meta`, mono .72rem, MAYÚSCULAS, `ink-2`).
- **Anatomía:** punto rojo de 8px que pulsa (`pulse` 2s infinito) + texto.
- **No usar:** el punto rojo para otra cosa en la misma vista; quitarlo si no hay disponibilidad.

```html
<span class="status"><i aria-hidden="true"></i>Disponible para proyectos</span>
```
```css
.status{display:inline-flex;align-items:center;gap:.5rem;}
.status i{width:8px;height:8px;border-radius:50%;background:var(--accent);box-shadow:0 0 0 0 rgba(214,47,31,.5);animation:pulse 2s infinite;}
@keyframes pulse{70%{box-shadow:0 0 0 8px rgba(214,47,31,0);}100%{box-shadow:0 0 0 0 rgba(214,47,31,0);}}
```

### 08 · Award (galardón)

- **Propósito:** destacar un premio ("Ganador · Cineminutos por el Océano").
- **Anatomía:** cápsula surface, mono .66rem MAYÚSCULAS tracking .03em, ★ en accent.
- **Variantes:** `on-media` (sobre la portada, arriba a la izquierda, con `shadow-badge`) · `p-award` (en la ficha, con borde line-2).
- **Usar:** solo premios reales. Un proyecto premiado ocupa 2 columnas en la grilla de 3. **No usar:** para etiquetas como "Nuevo" o "Destacado".

```html
<span class="award on-media"><i aria-hidden="true">★</i>Ganador · Cineminutos por el Océano</span>
```
```css
.award{display:inline-flex;align-items:center;gap:.45rem;font-family:var(--f-mono);font-size:.66rem;text-transform:uppercase;letter-spacing:.03em;line-height:1.3;padding:.38rem .7rem;border-radius:99px;background:var(--surface);color:var(--ink);max-width:calc(100% - 2rem);}
.award i{font-style:normal;color:var(--accent);}
.award.on-media{position:absolute;top:.9rem;left:.9rem;z-index:3;box-shadow:0 6px 20px -10px rgba(0,0,0,.4);}
.award.p-award{margin-top:1.2rem;border:1px solid var(--line-2);}
```

### 09 · KPIs

- **Propósito:** impacto en cifras ("1.2M · Vistas", "Global · Alcance", "04 · Episodios").
- **Anatomía:** `dl.kpis`; cada `div` muestra `dd` (cifra, display) arriba y `dt` (mono .64rem) debajo gracias a `column-reverse`.
- **Usar:** 2–4 cifras, cortas. **No usar:** frases en el `dd`.

```html
<dl class="kpis"><div><dd>1.2M</dd><dt>Vistas</dt></div><div><dd>04</dd><dt>Episodios</dt></div></dl>
```
```css
.kpis{display:flex;gap:clamp(1.4rem,4vw,3.5rem);}
.kpis div{display:flex;flex-direction:column-reverse;}
.kpis dd{font-size:clamp(2.2rem,4.5vw,4rem);font-weight:500;letter-spacing:-.06em;line-height:1;}
.kpis dt{font-family:var(--f-mono);font-size:.64rem;text-transform:uppercase;color:var(--muted);margin-top:.4rem;}
```

### 10 · Work-card

- **Propósito:** proyecto en una grilla.
- **Anatomía:** enlace → `blob-media` (portada 4:3, radio, fondo bg-2; foto o type-cover; award opcional; `blob-cta` "Ver proyecto ↗") + `work-info` (título a la izquierda, meta mono "Formato · año" a la derecha; apilados bajo 760px).
- **Estados:** hover → imagen `scale(1.035)` en 1.2s y aparece el `blob-cta` (surface, 38px). En táctil la imagen se ve a color siempre.
- **No usar:** sin año o sin formato; títulos de más de dos líneas (usa el `short`).

```html
<a class="work-card" href="/proyecto/el-invasor">
  <span class="blob-media">
    <img src="/img/el-invasor.webp" alt="El Invasor — Corto animado" loading="lazy">
    <span class="award on-media"><i aria-hidden="true">★</i>Ganador · Cineminutos por el Océano</span>
    <span class="blob-cta" aria-hidden="true">Ver proyecto <svg viewBox="0 0 24 24"><path d="M7 17 17 7M8 7h9v9" fill="none" stroke="currentColor" stroke-width="1.8"/></svg></span>
  </span>
  <span class="work-info"><span class="work-title">El Invasor</span><span class="work-meta">Corto animado <i></i> 2023</span></span>
</a>
```
```css
.work-card{display:flex;flex-direction:column;gap:1rem;}
.blob-media{position:relative;display:block;overflow:hidden;border-radius:var(--radius);background:var(--bg-2);aspect-ratio:4/3;}
.blob-media img,.blob-media .type-cover{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;transition:transform 1.2s var(--ease);}
.work-card:hover .blob-media img{transform:scale(1.035);}
.blob-cta{position:absolute;left:1rem;bottom:1rem;z-index:3;display:inline-flex;align-items:center;gap:.4rem;height:38px;padding:0 1rem;border-radius:99px;background:var(--surface);color:var(--ink);font-size:.88rem;font-weight:500;opacity:0;transform:translateY(8px);transition:opacity .4s var(--ease),transform .4s var(--ease);}
.work-card:hover .blob-cta,.work-card:focus-visible .blob-cta{opacity:1;transform:none;}
.work-info{display:flex;justify-content:space-between;align-items:baseline;gap:1rem;}
.work-title{font-size:clamp(1.3rem,2vw,1.75rem);font-weight:500;letter-spacing:-.035em;line-height:1.1;}
.work-meta{display:inline-flex;align-items:center;gap:.5rem;font-family:var(--f-mono);font-size:.7rem;text-transform:uppercase;color:var(--muted);white-space:nowrap;}
.work-meta i{width:4px;height:4px;border-radius:50%;background:currentColor;}
```

### 11 · Portada tipográfica

- **Propósito:** portada para piezas sin imagen propia (p. ej. solo en Instagram).
- **Anatomía:** caja que llena el marco: título arriba (`tc-title`, máx. 12ch) y pie mono (formato a la izquierda, fuente "Instagram ↗" a la derecha, opacidad .7).
- **Tonos:** `tone-ink` (por defecto), `tone-accent`, `tone-clay`, `tone-sand`. Alterna tonos en una grilla; no pongas dos rojos juntos.
- **No usar:** cuando exista una foto o fotograma de la pieza.

```html
<span class="type-cover tone-clay" aria-hidden="true"><span class="tc-title">Sin prisa y sin pausa</span><span class="tc-meta"><span>Promocional</span><span>Instagram ↗</span></span></span>
```
```css
.type-cover{display:flex;flex-direction:column;justify-content:space-between;padding:clamp(.9rem,1.6vw,1.4rem);background:var(--ink);color:var(--on-ink);}
.type-cover .tc-title{font-size:clamp(1.35rem,2.3vw,2.2rem);font-weight:500;letter-spacing:-.05em;line-height:.95;max-width:12ch;}
.type-cover .tc-meta{font-family:var(--f-mono);font-size:.62rem;text-transform:uppercase;letter-spacing:.06em;opacity:.7;display:flex;justify-content:space-between;gap:1rem;}
.tone-accent{background:var(--accent);} .tone-clay{background:#B9A48F;color:var(--ink);} .tone-sand{background:#DCD6C8;color:var(--ink);} .tone-ink{background:var(--ink);}
```

### 12 · Línea de tiempo con cabezal rojo (y sala de montaje)

- **Propósito:** recorrer la filmografía como una pista de edición.
- **Anatomía:** filtros (chips) → `.tl-track` horizontal (arrastrable, snap, sin barra) con separadores de año (`tl-year`, número vertical + línea) y clips (`clip`: media 16:10 con índice `01`, título, rol, barra mono formato/año) → `tl-playhead` (línea roja de 1px con triángulo, centrada) → `tl-scrub` (barra de progreso de 2px + año actual mono).
- **Estados del clip:** reposo · hover (`translateY(-6px)` + `shadow-lift`, imagen `scale(1.05)`) · `cued` (el clip bajo el cabezal: borde ink e índice rojo con texto blanco).
- **Interacción:** arrastrar, deslizar o `←` `→`. Orden: del proyecto más reciente al primero. Bajo 700px el clip mide 76vw y el cabezal se oculta.
- **Variante oscura (sala de montaje, Trabajos):** dos pistas V1 "Cine y dirección" y V2 "IA, edición y redes" que corren en sentido contrario bajo un cabezal de 2px con `shadow-playhead`; clips `nle-clip` sobre `sala-2` con perforaciones de película, cabecera "`04 el_invasor.mov`", título en MAYÚSCULAS 700 y año en rojo.

```html
<div class="tl">
  <div class="tl-track">
    <span class="tl-year" aria-hidden="true"><b>2025</b></span>
    <a class="clip cued" href="/proyecto/kling-3">
      <span class="clip-media"><img src="/img/kling-3.webp" alt=""><span class="clip-idx">01</span></span>
      <span class="clip-body"><span class="clip-title">Kling 3.0</span><span class="clip-role">Lemon Drop</span><span class="clip-bar"><span>Video con IA</span><span>2025</span></span></span>
    </a>
  </div>
  <div class="tl-playhead" aria-hidden="true"></div>
</div>
```
```css
.tl{position:relative;}
.tl-track{display:flex;align-items:stretch;gap:clamp(.8rem,1.4vw,1.2rem);overflow-x:auto;scroll-snap-type:x proximity;scrollbar-width:none;padding:.5rem var(--gutter) 1.6rem;}
.tl-year b{font-size:clamp(2.4rem,5vw,4.4rem);font-weight:500;letter-spacing:-.06em;line-height:.85;writing-mode:vertical-rl;transform:rotate(180deg);}
.tl-year{flex:none;display:flex;flex-direction:column;align-items:flex-start;}
.tl-year::after{content:'';flex:1;width:1px;background:var(--line-2);margin:.8rem 0 0 calc(50% - .5px);}
.clip{flex:none;width:clamp(240px,24vw,340px);display:flex;flex-direction:column;scroll-snap-align:center;border-radius:var(--radius);background:var(--surface);border:1px solid var(--line);overflow:hidden;transition:transform .5s var(--ease),border-color .3s,box-shadow .5s var(--ease);}
.clip:hover{transform:translateY(-6px);box-shadow:0 24px 40px -28px rgba(0,0,0,.45);}
.clip.cued{border-color:var(--ink);}
.clip-media{position:relative;aspect-ratio:16/10;overflow:hidden;background:var(--bg-2);}
.clip-idx{position:absolute;top:.6rem;left:.6rem;font-family:var(--f-mono);font-size:.62rem;padding:.2rem .45rem;border-radius:99px;background:rgba(255,255,255,.88);color:var(--ink);}
.clip.cued .clip-idx{background:var(--accent);color:#fff;}
.clip-body{display:flex;flex-direction:column;gap:.3rem;padding:.9rem 1rem 1rem;flex:1;}
.clip-title{font-size:1.08rem;font-weight:500;letter-spacing:-.025em;line-height:1.15;}
.clip-role{font-size:.82rem;color:var(--muted);line-height:1.35;}
.clip-bar{margin-top:auto;padding-top:.7rem;display:flex;justify-content:space-between;gap:.6rem;font-family:var(--f-mono);font-size:.64rem;text-transform:uppercase;color:var(--muted);border-top:1px solid var(--line);}
.tl-playhead{position:absolute;top:0;bottom:1.6rem;left:50%;width:1px;background:var(--accent);pointer-events:none;z-index:3;opacity:.85;}
.tl-playhead::before{content:'';position:absolute;top:-6px;left:-5px;border:5.5px solid transparent;border-top:7px solid var(--accent);}
```

### 13 · Pillar card

- **Propósito:** presentar los tres pilares de la marca (o tres ideas paralelas).
- **Anatomía:** tarjeta surface, borde line, radio, padding `clamp(1.3rem,2.4vw,2rem)`; signo rojo (1.6rem) → `pillar-title` → párrafo `ink-2` (crece) → `link-arrow` al pie.
- **Usar:** siempre en grupos de tres, misma altura. **No usar:** con iconos SVG en lugar de los signos, ni con borde de color a la izquierda.

```html
<article class="pillar">
  <span class="pillar-sign" aria-hidden="true">◇</span>
  <h2 class="pillar-title">Estudio de la IA</h2>
  <p>Investigo y pruebo herramientas generativas para ampliar lo que una historia puede hacer.</p>
  <a class="link-arrow" href="/proyecto/monica-gomez-jaramillo">12 piezas en 40 minutos <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9" fill="none" stroke="currentColor" stroke-width="1.8"/></svg></a>
</article>
```
```css
.pillars{display:grid;grid-template-columns:repeat(3,1fr);gap:clamp(1rem,2vw,1.6rem);}
.pillar{display:flex;flex-direction:column;gap:1rem;padding:clamp(1.3rem,2.4vw,2rem);border-radius:var(--radius);background:var(--surface);border:1px solid var(--line);}
.pillar-sign{font-size:1.6rem;line-height:1;color:var(--accent);}
.pillar-title{font-size:clamp(1.6rem,2.6vw,2.3rem);font-weight:500;letter-spacing:-.05em;line-height:1;}
.pillar p{color:var(--ink-2);flex:1;}
.pillar .link-arrow{align-self:flex-start;}
@media (max-width:900px){.pillars{grid-template-columns:1fr;}}
```

### 14 · Cita narrativa (st-quote)

- **Propósito:** una frase que respira entre fotos en un relato.
- **Anatomía:** `blockquote` desplazado 2 de 12 columnas; `p` en Inter Tight 400 itálica, `clamp(2rem,5.2vw,5rem)`, tracking -.05em, máx. 16ch; comillas tipográficas “ ” en rojo, la de apertura colgada fuera de la caja (`margin-left:-.45em`). En móvil, sin sangría.
- **Usar:** una cita por capítulo como máximo, frase corta y propia. **No usar:** comillas rectas, ni para testimonios de clientes (para eso `p-quote`).

```html
<blockquote class="st-quote"><p>El fuego no se pone en pausa para la foto.</p></blockquote>
```
```css
.st-quote{margin:clamp(1rem,4vw,3rem) 0 clamp(4rem,10vw,9rem);padding-left:calc((100% + clamp(.8rem,2vw,1.6rem)) / 12 * 2);}
.st-quote p{font-size:clamp(2rem,5.2vw,5rem);font-weight:400;font-style:italic;letter-spacing:-.05em;line-height:1;max-width:16ch;}
.st-quote p::before{content:'“';color:var(--accent);margin-left:-.45em;padding-right:.05em;}
.st-quote p::after{content:'”';color:var(--accent);}
@media (max-width:820px){.st-quote{padding-left:0;}.st-quote p::before{margin-left:0;}}
```

### 15 · Hoja de contactos

- **Propósito:** cerrar un relato con la serie completa, como una hoja de contactos de laboratorio.
- **Anatomía:** `sec-head` "Hoja de contactos (NN)" + "La serie completa" → `ol.st-contacts` en grilla `auto-fill minmax(110px,1fr)`, miniaturas 1:1 con radio 4px → `st-end` con pills de salida ("← Volver a Fotografía", "Hablemos ↗").
- **Estados:** reposo B/N (`grayscale(1) contrast(1.05)`, opacidad .75) · hover/foco a color, opacidad 1. Cada miniatura abre el visor.
- **No usar:** fuera de las colecciones fotográficas.

```html
<ol class="st-contacts">
  <li><button class="st-ph" type="button" aria-label="Ampliar foto 01"><img src="/img/colecciones/al-fuego/01.webp" alt="" loading="lazy"></button></li>
</ol>
```
```css
.st-ph{display:block;width:100%;padding:0;cursor:zoom-in;overflow:hidden;border-radius:calc(var(--radius) * .5);background:#1A1612;}
.st-contacts{list-style:none;display:grid;grid-template-columns:repeat(auto-fill,minmax(110px,1fr));gap:clamp(.5rem,1vw,.8rem);}
.st-contacts .st-ph{aspect-ratio:1;border-radius:4px;}
.st-contacts img{width:100%;height:100%;object-fit:cover;filter:grayscale(1) contrast(1.05);opacity:.75;transition:filter .4s var(--ease),opacity .4s var(--ease);}
.st-contacts .st-ph:hover img,.st-contacts .st-ph:focus-visible img{filter:none;opacity:1;}
```

### 16 · Navegación

- **Propósito:** barra fija superior.
- **Anatomía:** 64px; `brand` "Simón Melgarejo" (600) a la izquierda → enlaces (Trabajos, Edición para redes, Marca personal, Fotografía; `.95rem`, `ink-2`) → `pill pill-dark nav-cta` "Contacto" (38px). Bajo 900px: enlaces y CTA se ocultan y aparece `menu-btn` (círculo ink de 44px con dos líneas que forman una ✕); el menú móvil se abre con un `clip-path: circle()` desde el botón.
- **Estados:** arriba, transparente · con scroll, `.scrolled` (nav-glass + blur + `shadow-nav`) · al bajar se esconde (`translateY(-100%)`) · enlace activo `aria-current="page"` con subrayado de 1px que crece de izquierda a derecha. Sobre secciones oscuras invierte colores.
- Incluye siempre el enlace "Saltar al contenido".

```html
<header class="nav">
  <a class="brand" href="/">Simón Melgarejo</a>
  <nav class="nav-links" aria-label="Principal"><a href="/trabajos" aria-current="page">Trabajos</a><a href="/redes">Edición para redes</a><a href="/marca-personal">Marca personal</a><a href="/#fotografia">Fotografía</a></nav>
  <a class="pill pill-dark nav-cta" href="/contacto">Contacto</a>
  <button class="menu-btn" type="button" aria-expanded="false" aria-controls="menu"><span></span><span></span><span class="sr">Menú</span></button>
</header>
```
```css
.nav{position:fixed;inset:0 0 auto 0;z-index:100;height:var(--nav-h);display:flex;align-items:center;gap:1.5rem;padding:0 var(--gutter);transition:background .35s var(--ease),box-shadow .35s var(--ease),transform .45s var(--ease);}
.nav.scrolled{background:rgba(242,241,238,.82);backdrop-filter:saturate(1.4) blur(14px);box-shadow:0 1px 0 var(--line);}
.nav.hide{transform:translateY(-100%);}
.brand{font-weight:600;letter-spacing:-.03em;font-size:1.1rem;margin-right:auto;}
.nav-links{display:flex;gap:1.6rem;font-size:.95rem;}
.nav-links a{position:relative;color:var(--ink-2);transition:color .25s;}
.nav-links a::after{content:'';position:absolute;left:0;right:0;bottom:-3px;height:1px;background:currentColor;transform:scaleX(0);transform-origin:right;transition:transform .4s var(--ease);}
.nav-links a:hover::after,.nav-links a[aria-current]::after{transform:scaleX(1);transform-origin:left;}
.nav-links a[aria-current]{color:var(--ink);}
.nav-cta{height:38px;padding:0 1.05rem;font-size:.9rem;}
.menu-btn{display:none;width:44px;height:44px;border-radius:99px;background:var(--ink);position:relative;}
@media (max-width:900px){.nav-links,.nav-cta{display:none;}.menu-btn{display:block;}}
```

### 17 · Pie con marca gigante

- **Propósito:** cierre de todas las páginas.
- **Anatomía:** fondo ink → fila superior: eyebrow "¿Tienes una historia?" + `footer-mail` "Hablemos" con círculo rojo `.9em` y flecha (gira 45° en hover); columnas de enlaces (Sitio, Redes) en `rgba(242,241,238,.8)` → `footer-mark` "Simón Melgarejo" a todo el ancho (`clamp(3rem,14.2vw,15rem)`, una línea) → barra inferior mono: "© 2026 Simón Melgarejo" · tagline · "Volver arriba ↑".
- **No usar:** otro color de fondo que no sea ink; partir la marca en dos líneas.

```html
<footer class="footer">
  <div class="wrap footer-top">
    <div><p class="eyebrow">¿Tienes una historia?</p><a class="footer-mail" href="/contacto">Hablemos <span><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9" fill="none" stroke="currentColor" stroke-width="1.8"/></svg></span></a></div>
  </div>
  <div class="footer-mark" aria-hidden="true">Simón Melgarejo</div>
  <div class="wrap footer-bottom"><span>© 2026 Simón Melgarejo</span><span>Filmmaker, editor e investigador de IA</span><a href="#main">Volver arriba ↑</a></div>
</footer>
```
```css
.footer{background:var(--ink);color:var(--on-ink);padding-top:clamp(2.5rem,5vw,4.5rem);overflow:hidden;}
.footer .eyebrow{color:rgba(242,241,238,.5);}
.footer-mail{display:inline-flex;align-items:center;gap:.6rem;font-size:clamp(2rem,5vw,4rem);font-weight:500;letter-spacing:-.05em;line-height:1;}
.footer-mail span{display:inline-flex;width:.9em;height:.9em;border-radius:50%;background:var(--accent);align-items:center;justify-content:center;transition:transform .5s var(--ease);}
.footer-mail span svg{width:.45em;height:.45em;}
.footer-mail:hover span{transform:rotate(45deg);}
.footer-mark{font-size:clamp(3rem,14.2vw,15rem);font-weight:500;letter-spacing:-.07em;line-height:.9;padding-bottom:.12em;white-space:nowrap;text-align:center;margin:clamp(3rem,7vw,6rem) 0 .5rem;opacity:.95;}
.footer-bottom{display:flex;justify-content:space-between;gap:1rem;flex-wrap:wrap;padding-top:1.2rem;padding-bottom:1.4rem;border-top:1px solid rgba(242,241,238,.12);font-family:var(--f-mono);font-size:.66rem;text-transform:uppercase;color:rgba(242,241,238,.55);}
```

### 18 · Transición de página

- **Propósito:** pasar de una página a otra como un corte de montaje.
- **Secuencia:** al hacer clic en un enlace interno, una **ventana rectangular** (`.pt-hole`, radio 2px, `box-shadow: 0 0 0 200vmax var(--accent)`) se cierra desde el tamaño de la pantalla (102 %) hasta 0 en 620 ms con `cubic-bezier(.76,0,.24,1)`; a la vez entra la etiqueta (`.pt-label`: nombre del destino en blanco, `clamp(2.6rem,9vw,8rem)`, y "Simón Melgarejo" en mono), que aparece en 380 ms. La página nueva llega con el lienzo rojo (`html.pt-in`) y la ventana se abre desde el centro (740 ms).
- **Reglas:** solo enlaces internos, sin modificadores de teclado; con `prefers-reduced-motion` no hay transición; el nombre se omite si pasa de 34 caracteres.

```html
<div class="pt" aria-hidden="true"><span class="pt-hole"></span><span class="pt-label"><b>El Invasor</b><span>Simón Melgarejo</span></span></div>
```
```css
.pt{position:fixed;inset:0;z-index:1000;overflow:hidden;pointer-events:none;}
.pt-hole{position:absolute;left:50%;top:50%;width:100vw;height:100vh;transform:translate(-50%,-50%);border-radius:2px;box-shadow:0 0 0 200vmax var(--accent);}
.pt-label{position:absolute;left:var(--gutter);bottom:var(--gutter);right:var(--gutter);display:flex;justify-content:space-between;align-items:flex-end;gap:1rem;color:#fff;opacity:0;}
.pt-label b{font-size:clamp(2.6rem,9vw,8rem);font-weight:500;letter-spacing:-.06em;line-height:.9;}
.pt-label span{font-family:var(--f-mono);font-size:.72rem;text-transform:uppercase;letter-spacing:.06em;padding-bottom:.6rem;}
```
```js
// salida (resumen de assets/site.js)
hole.animate([{width:'102vw',height:'102vh'},{width:'0px',height:'0px'}],{duration:620,easing:'cubic-bezier(.76,0,.24,1)',fill:'forwards'});
```

---

## 9. Plantillas de redes

Reglas comunes: fondos solo **papel** (`#F2F1EE`), **ink** (`#111110`), **surface** (`#FFFFFF`), **Sala** (`#141110`) o foto a sangre. Titular en Inter Tight 500 con tracking -.06/-.07em e interlineado .84–.9, remate en itálica `muted` (sobre oscuro, blanco al 50–60 %). Metadatos en JetBrains Mono MAYÚSCULAS .06em. **Un solo elemento rojo por pieza** (punto, subrayado o número). Firma: `@smnmelgarejo` (Instagram/TikTok usa el usuario de cada red). Medidas expresadas en % del ancho para que escalen.

### 9.1 Portada de reel · 9:16 (1080×1920)

- **Zonas seguras:** sin texto en el **14 % superior** (~270px) ni en el **20 % inferior** (~384px): ahí van la interfaz de Instagram/TikTok y el pie del video. Márgenes laterales del 7 % (~76px).
- **Variante foto:** retrato a sangre (`object-position` alto para la cara), degradado a ink desde el 42 % hasta el 100 % de la altura (`rgba(17,17,16,.92)` al 74 %). Eyebrow mono (3.6 % del ancho, ~39px) con punto rojo arriba, justo bajo la zona segura. Titular abajo, apoyado en el límite del 20 %: 15 % del ancho (~160px), máx. 3 líneas, remate en itálica a 60 % de blanco. Fila mono (3.2 %, ~35px) con `@usuario` y tema.
- **Variante tipográfica:** fondo papel; eyebrow y número arriba; imagen 4:5 pequeña (30 % del ancho, radio 3 %); titular de 18 % del ancho con subrayado rojo `.42em × .06em` (el del `st-title`); firma mono abajo.
- Texto en la portada: máx. 6 palabras.

### 9.2 Carrusel · 4:5 (1080×1350)

- Márgenes del 7 % (~76px). Cabecera mono en cada lámina: sección a la izquierda, `01 / 03` a la derecha.
- **Lámina 1 (portada):** papel, gancho en el titular (12.5 % del ancho, ~135px) con remate en itálica, firma con retrato circular (11 %) abajo.
- **Láminas intermedias:** surface blanca, contenido en lista numerada: número mono en `accent-text` `#B8281A`, título 6 % del ancho 500, texto 3.8 % en `ink-2`, filetes `line`. "Desliza →" en mono al pie.
- **Última lámina:** ink, "Hagamos algo *cinematográfico.*", CTA en forma de pill claro ("Hablemos ↗") y fila mono con usuario y "Colombia".
- 3 a 7 láminas; una idea por lámina; texto base mínimo 3.8 % del ancho (~41px).

### 9.3 Miniatura de YouTube · 16:9 (1280×720)

- Retícula 56 % / 44 %: texto a la izquierda, cara a la derecha con un fundido del color de fondo desde el borde izquierdo de la foto (30–35 %).
- Titular de **máx. 3 palabras**, 9.5 % del ancho (~122px), tracking -.07em, interlineado .84, remate en itálica `muted`; subrayado rojo `.42em × .07em`.
- Etiqueta mono (1.9 %, ~24px) con punto rojo arriba; usuario abajo. Deja libre la esquina inferior derecha (~15 % × 12 %): ahí YouTube pone la duración.
- Dos versiones: **Papel** (`#F2F1EE`, muted `#7A7872` en el remate a ese tamaño pasa AA grande) y **Sala** (`#141110`, remate `#9A948B`).

---

## 10. Reglas de oro

1. **Un solo rojo, y poco.** `#D62F1F` aparece en un único elemento por vista o pieza (punto de estado, cabezal, subrayado, ★, hover). Nunca un segundo acento ni degradados.
2. **Titulares grandes y apretados.** Inter Tight 500, tracking -.055 a -.075em, interlineado .82–.95, remate en itálica `--muted`. Nunca mayúsculas sostenidas en la sans.
3. **La mono solo etiqueta.** JetBrains Mono 400 en MAYÚSCULAS, tracking .05–.06em, ≤ .8rem, para metadatos, contadores y fechas. Nunca párrafos ni titulares.
4. **Papel, tinta o sala.** Fondos solo `bg`, `bg-2`, `surface`, `ink`, `sala-bg` o `story-bg`. Mucho aire: contenedor 1520px, gutter `clamp(1rem,4vw,3rem)`, secciones `clamp(4rem,8vw,7rem)`.
5. **Texto pequeño a 4.5:1.** `muted` y `accent` solo en texto ≥ 24px o no esencial; para metadatos usa `muted-aa`, para rojo legible `accent-text`, sobre rojo escribe en `#FFFFFF`.
6. **Foto a color, luz real, formato del canal.** 9:16 redes, 4:5 retratos, 16:9 video; radio `--radius`; sin B/N por defecto, sin marcos, sin deformar.
7. **Habla como editas.** Primera persona, tuteo, frases cortas, verbos de oficio, ternas y dos puntos. Sin emojis, sin jerga de agencia, CTA de dos palabras.
8. **Controles redondos y movimiento con criterio.** Pills de 44px y chips de 36px con radio 99px; iconos de trazo 1.8; toda animación con `--ease` y apagada con `prefers-reduced-motion`.

---

## 11. Notas para mantener el sistema

- **Valores derivados** (no están en el sitio): `muted-aa`, `accent-text` y todo el tema Sala salvo `bg`, `bg-2`, `surface`, `ink`, `line` y `accent` (que salen de `.bay`). Revísalos si cambia la paleta.
- **No verificado en el sitio:** el usuario de TikTok `@simnmelgarejo` (el portafolio solo enlaza Instagram, LinkedIn y YouTube).
- En `tokens.json` los tamaños de letra, `gutter`, `section-y`, `grid-gap`, `work-grid-row` y `radius` son el máximo de su `clamp()`; `tokens.css` conserva el `clamp()`.
- El movimiento no es una familia de `tokens.json` (el formato no la admite): vive en `tokens.css` (`--ease`, `--ease-pt`, `--dur-*`) y en la sección 5.
- Fuente de verdad: `assets/site.css` del portafolio v3. Si cambia el sitio, actualiza primero `tokens.json` y luego este README.
