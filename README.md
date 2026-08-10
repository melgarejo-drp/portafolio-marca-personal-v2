# Portafolio marca personal v2 — Simón Melgarejo

Sitio estático (sin build) del portafolio de Simón Melgarejo, filmmaker & editor.

## Rutas

| URL | Página |
|---|---|
| `/` | Inicio — hero, destacados, cargos, proyectos, sobre mí, contacto |
| `/archivo` | Los 13 proyectos, filtrables por año y por rol |
| `/proyecto/<slug>` | Ficha individual de cada proyecto (13 páginas) |

## Estructura

```
index.html          inicio
archivo.html        archivo filtrable
404.html            página de error
proyecto/*.html     13 fichas de proyecto
assets/site.css     estilos (tokens de la marca)
assets/site.js      cursor, timecode, filtros, modal, toggle de color
img/                imágenes originales optimizadas a WebP (1400px)
fonts/              Climate Crisis · Chakra Petch · Archivo · Space Mono
vercel.json         cleanUrls + cabeceras de caché
```

## Despliegue

No requiere build. En Vercel: importar el repo y dejar el framework en **Other**,
sin build command y con el directorio raíz como output. `cleanUrls` en `vercel.json`
hace que `/archivo` sirva `archivo.html` y `/proyecto/slug` sirva `proyecto/slug.html`.

## Notas de mantenimiento

- El correo del formulario de contacto está en `assets/site.js` (`to`), ensamblado
  en dos partes para dificultar el scraping. Cambiarlo ahí.
- Las imágenes vienen del CDN de Adobe Portfolio, ya optimizadas a WebP y commiteadas.
  Para actualizarlas, reemplazar el archivo en `img/` manteniendo el nombre.
- Las métricas de los dos proyectos destacados salen del contenido original del repo
  `portfolio-simon`; el resto de fichas solo muestra datos verificables (año, rol, formato).
