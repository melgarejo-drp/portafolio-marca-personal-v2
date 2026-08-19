# Portafolio marca personal v2 — Simón Melgarejo

Sitio estático (sin build) del portafolio de Simón Melgarejo, filmmaker & editor.

## Dirección de arte

Sala de montaje: **papel crema** (guion / hoja de rodaje) contra **negro de timeline**,
con **rojo de lápiz graso** como único acento. Los proyectos viven en una línea de
tiempo horizontal tipo NLE, sobre fondo negro, como una pista de edición real.

| Token | Valor | Uso |
|---|---|---|
| `--cream` | `#F2EDE3` | Fondo de página |
| `--ink` | `#141110` | Tinta, barra superior, sección de montaje |
| `--red` | `#D62F1F` | Cabezal, REC, acentos, hover |

Tipografías: **Climate Crisis** (display), **Chakra Petch** (títulos/UI),
**Archivo** (cuerpo), **Space Mono** (metadatos y terminal).

## Rutas

| URL | Página |
|---|---|
| `/` | Inicio — hero con claqueta, línea de tiempo, destacados, cargos, sobre mí, contacto |
| `/archivo` | La misma línea de tiempo, filtrable por año y por rol |
| `/proyecto/<slug>` | Ficha individual (13 páginas) con toggle raw/colorizado |

## Interacción

- **Línea de tiempo**: regla de años, pista arrastrable, cabezal fijo que "carga"
  el clip centrado, scroll-snap, y navegación con `←` `→`.
- **Claqueta**: SVG con el palo articulado; golpea sola cada pocos segundos y
  al hacerle clic.
- **Cursor**: cruz de encuadre que se abre en anillo sobre enlaces y cambia a
  modo scrub sobre la pista.
- **Hover de clip**: blanco y negro → color, más un tinte rojo por `mix-blend-mode:
  multiply` (el recurso original del sitio, no un degradado de puntos).
- **Ficha de proyecto**: toggle Raw v-log / Colorizado sobre el fotograma.

## Estructura

```
index.html          inicio
archivo.html        línea de tiempo filtrable
404.html            página de error
proyecto/*.html     13 fichas
assets/site.css     tokens + componentes
assets/site.js      cursor, timecode, timeline, filtros, modal, toggle
img/                imágenes originales optimizadas a WebP (1400px)
fonts/              las cuatro tipografías, self-hosted
vercel.json         cleanUrls + cabeceras de caché
```

Las páginas se generan con `gen.pl` a partir de un único array de datos; no editar
`index.html`, `archivo.html` ni `proyecto/*.html` a mano.

## Despliegue

No requiere build. En Vercel: importar el repo, framework **Other**, sin build
command, output el directorio raíz. `cleanUrls` hace que `/archivo` sirva
`archivo.html` y `/proyecto/slug` sirva `proyecto/slug.html`.

## Mantenimiento

- Correo del formulario: `assets/site.js` (variable `to`, partida en dos para
  dificultar el scraping).
- Imágenes: reemplazar el archivo en `img/` manteniendo el nombre.
- Las métricas de los dos proyectos destacados vienen del contenido original del
  repo `portfolio-simon`; el resto de fichas solo muestra datos verificables.
