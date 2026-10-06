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

Tipografías self-hosted: **Inter Tight** (variable) y **JetBrains Mono** (metadatos).

## Rutas

| URL | Página |
|---|---|
| `/` | Hero · Trabajo seleccionado · Línea de tiempo · Lo que hago · Fotografía · Sobre mí · Contacto |
| `/proyecto/<slug>` | Ficha: metadatos, reto/respuesta, impacto y piezas (YouTube, MP4, Instagram) |
| `/coleccion/<slug>` | Galería con lightbox (sólo se genera si la colección tiene fotos) |
| `/archivo` | Redirige a `/#proyectos` |

## Editar contenido

Todo sale de `build/data.mjs`. Después de editar:

```bash
node build/gen.mjs
```

Eso regenera `index.html`, `proyecto/*.html`, `coleccion/*.html`, `404.html` y `sitemap.xml`.
No editar esos archivos a mano.

- **Proyecto nuevo**: agregar un objeto a `PROJECTS` (en orden cronológico). `draft: true` lo deja fuera.
- **Humind** está como borrador: falta portada, textos y piezas.
- **Colecciones de fotos**: soltar las imágenes en `img/colecciones/<slug>/`
  (`al-fuego`, `el-castillo`, `la-base-fraternidad`) y volver a generar. El orden es alfabético;
  la primera es la portada. Recomendado: WebP de ~1600 px de ancho.
- **Videos**: `media/` (H.264, `faststart`). Portadas en `img/`.

## Desarrollo local

Cualquier servidor estático sirve, pero las URL limpias (`/proyecto/slug`) necesitan uno que
resuelva `.html`, por ejemplo `npx vercel dev` o `npx serve` con `cleanUrls`.

## Despliegue

Vercel, framework **Other**, sin build command, output el directorio raíz.
