# Portafolio — Simón Melgarejo (v3)

Sitio estático (sin build en Vercel) del portafolio de Simón Melgarejo, filmmaker, editor e investigador de IA.

## Dirección de arte

Base: la plantilla editorial minimalista **Ethan Clark** (Framer). Papel claro, tinta casi negra,
tipografía grande y apretada, mucho aire, estela de imágenes que sigue al cursor y revelado de
imagen con forma de blob. De la v2 se conservan los datos personales, las imágenes y el componente
de **línea de tiempo** (pista arrastrable, cabezal que "carga" el clip centrado, separadores por año,
navegación con `←` `→`), rediseñado al estilo de la plantilla y con filtros por categoría.

| Token | Valor | Uso |
|---|---|---|
| `--bg` | `#F2F1EE` | Fondo |
| `--ink` | `#111110` | Texto, contacto y pie |
| `--accent` | `#D62F1F` | Cabezal de la línea de tiempo, estado, CTA del pie |

Tipografías self-hosted: **Inter Tight** (variable) y **JetBrains Mono** (metadatos). La sala de
montaje conserva las de la v2: **Chakra Petch** y **Space Mono**.

## Rutas

| URL | Página |
|---|---|
| `/` | Hero con loop del artista · Línea de tiempo · Destacados · Lo que hago · Fotografía · Sobre mí · Contacto |
| `/trabajos` | Sala de montaje: dos pistas (V1 cine y dirección, V2 IA, edición y redes) que corren en sentido contrario bajo el cabezal + todos los proyectos con filtros |
| `/redes` | Carrusel de piezas de edición para redes, filtrable por cliente |
| `/marca-personal` | Creación audiovisual, estudio de la IA y lo artesanal; intereses; formatos frente a cámara |
| `/proyecto/<slug>` | Ficha: metadatos, galardón, reto/respuesta, impacto y piezas (YouTube, MP4, Instagram) |
| `/coleccion/<slug>` | Galería con lightbox (sólo se genera si la colección tiene fotos) |
| `/archivo` | Redirige a `/trabajos` |

## Editar contenido

Todo sale de `build/data.mjs`. Después de editar:

```bash
node build/gen.mjs
```

Eso regenera `index.html`, `proyecto/*.html`, `coleccion/*.html`, `404.html` y `sitemap.xml`.
No editar esos archivos a mano.

- **Proyecto nuevo**: agregar un objeto a `PROJECTS` (en orden cronológico). `draft: true` lo deja fuera.
- **Humind** está como borrador: falta portada, textos y piezas.
- **Roque**: falta portada, rol y enlace (hoy usa portada tipográfica).
- **Carrusel de redes**: `REELS` en `build/data.mjs`. Para una pieza de Instagram basta el código de la
  URL (`instagram.com/reel/<código>/`). Pendientes: Conversaciones de piernas abiertas y redes de
  Emi Falck.
- **Miniaturas de Instagram**: guardar la imagen como `img/redes/<código>.webp` (9:16). Se usa como
  portada del proyecto si no tiene `cover`. En el carrusel la pieza de Instagram se carga embebida.
- **Loop del artista**: los fotogramas salen de `img/artista/` (orden alfabético, 4:5). Hoy son seis
  tratamientos del mismo retrato; reemplázalos por fotos reales en secuencia para un loop tipo GIF.
- **Colecciones de fotos**: soltar las imágenes en `img/colecciones/<slug>/`
  (`al-fuego`, `el-castillo`, `la-base-fraternidad`) y volver a generar. El orden es alfabético;
  la primera es la portada. Recomendado: WebP de ~1600 px de ancho.
- **Colección narrativa**: si la colección tiene `story` en `build/data.mjs`, `/coleccion/<slug>` deja de ser
  galería y se arma como relato: portada, introducción con créditos (enlaces a Instagram), capítulos de texto
  con disposiciones de fotos (`duo`, `duo-r`, `trio`, `mosaic`, `wide`, `quote`) y hoja de contactos final.
  Las fotos se nombran por número (`NN.webp`). Hoy la usa **Al fuego** (Felipe Hincapié × Beluga); sus textos
  son borrador. Los originales viven en `img/raw/` y no se publican (`.vercelignore`).
- **Videos**: `media/` (H.264, `faststart`). Portadas en `img/`.

## Desarrollo local

Cualquier servidor estático sirve, pero las URL limpias (`/proyecto/slug`) necesitan uno que
resuelva `.html`, por ejemplo `npx vercel dev` o `npx serve` con `cleanUrls`.

## Despliegue

Vercel, framework **Other**, sin build command, output el directorio raíz.
