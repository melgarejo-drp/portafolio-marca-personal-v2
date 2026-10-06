// Genera el sitio estático: index.html, proyecto/*.html, coleccion/*.html, 404.html y sitemap.xml.
// Uso: node build/gen.mjs   (sin dependencias)
import { readdirSync, writeFileSync, mkdirSync, existsSync, rmSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { SITE, TAGS, PROJECTS, FEATURED, SERVICES, COLLECTIONS } from './data.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const YEAR = 2026;

const esc = (s) => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const pad = (n) => String(n).padStart(2, '0');
const ytThumb = (id) => `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;

const projects = PROJECTS.filter((p) => !p.draft);
const bySlug = Object.fromEntries(projects.map((p) => [p.slug, p]));
const years = [...new Set(projects.map((p) => p.year))].sort();
const tagLabel = Object.fromEntries(TAGS.map((t) => [t.key, t.label]));

const collections = COLLECTIONS.map((c) => {
  const dir = join(ROOT, 'img', 'colecciones', c.slug);
  const photos = existsSync(dir)
    ? readdirSync(dir).filter((f) => /\.(jpe?g|png|webp|avif)$/i.test(f)).sort().map((f) => `/img/colecciones/${c.slug}/${encodeURIComponent(f)}`)
    : [];
  return { ...c, photos, cover: c.cover || photos[0] || null };
});

/* ---------------------------------------------------------------- piezas comunes */

const ICON = {
  arrow: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9" fill="none" stroke="currentColor" stroke-width="1.8"/></svg>',
  play: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5.5v13l11-6.5z" fill="currentColor"/></svg>'
};

function cover(p, { cls = '', eager = false, sizes = '' } = {}) {
  if (p.cover && /^https?:/.test(p.cover)) {
    // Portada remota (miniatura de YouTube): si no carga, queda la portada tipográfica debajo.
    return `${cover({ ...p, cover: null })}<img class="${cls}" src="${esc(p.cover)}" alt="${esc(p.title)} — ${esc(p.format)}" loading="lazy" decoding="async" onerror="this.remove()">`;
  }
  if (p.cover) {
    return `<img class="${cls}" src="${esc(p.cover)}" alt="${esc(p.title)} — ${esc(p.format)}" ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async"${sizes}>`;
  }
  // Portada tipográfica para piezas que solo viven en Instagram.
  return `<span class="type-cover tone-${p.tone || 'ink'} ${cls}" aria-hidden="true"><span class="tc-title">${esc(p.short || p.title)}</span><span class="tc-meta"><span>${esc(p.format)}</span><span>${{ ig: 'Instagram ↗', yt: 'YouTube ↗' }[p.media[0] && (p.media[0].ig ? 'ig' : p.media[0].yt ? 'yt' : '')] || ''}</span></span></span>`;
}

const header = (current) => `
<a class="skip" href="#main">Saltar al contenido</a>
<header class="nav" data-nav>
  <a class="brand" href="/" aria-label="Simón Melgarejo — inicio">Simón Melgarejo</a>
  <nav class="nav-links" aria-label="Principal">
    <a href="/#trabajo">Trabajo</a>
    <a href="/#proyectos">Línea de tiempo</a>
    <a href="/#fotografia">Fotografía</a>
    <a href="/#servicios">Servicios</a>
    <a href="/#sobre-mi">Sobre mí</a>
  </nav>
  <a class="pill pill-dark nav-cta" href="/#contacto">Contacto</a>
  <button class="menu-btn" type="button" aria-expanded="false" aria-controls="menu" data-menu-btn><span></span><span></span><span class="sr">Menú</span></button>
</header>
<div class="menu" id="menu" data-menu hidden>
  <nav aria-label="Menú móvil">
    <a href="/#trabajo">Trabajo</a>
    <a href="/#proyectos">Línea de tiempo</a>
    <a href="/#fotografia">Fotografía</a>
    <a href="/#servicios">Servicios</a>
    <a href="/#sobre-mi">Sobre mí</a>
    <a href="/#contacto">Contacto</a>
  </nav>
  <div class="menu-foot">${SITE.socials.map((s) => `<a href="${s.url}" target="_blank" rel="noreferrer noopener">${s.name}</a>`).join('')}</div>
</div>`;

const footer = () => `
<footer class="footer">
  <div class="wrap footer-top">
    <div>
      <p class="eyebrow">¿Tienes una historia?</p>
      <a class="footer-mail" href="/#contacto">Hablemos <span>${ICON.arrow}</span></a>
    </div>
    <nav class="footer-links" aria-label="Pie de página">
      <div><p class="eyebrow">Sitio</p><a href="/#trabajo">Trabajo</a><a href="/#proyectos">Línea de tiempo</a><a href="/#fotografia">Fotografía</a><a href="/#sobre-mi">Sobre mí</a></div>
      <div><p class="eyebrow">Redes</p>${SITE.socials.map((s) => `<a href="${s.url}" target="_blank" rel="noreferrer noopener">${s.name}</a>`).join('')}</div>
    </nav>
  </div>
  <div class="footer-mark" aria-hidden="true">Simón Melgarejo</div>
  <div class="wrap footer-bottom"><span>© ${YEAR} Simón Melgarejo</span><span>${esc(SITE.tagline)}</span><a href="#main" data-top>Volver arriba ↑</a></div>
</footer>`;

const reelModal = () => `
<div class="modal" id="reel" data-modal hidden role="dialog" aria-modal="true" aria-label="Reel de Simón Melgarejo">
  <div class="modal-box">
    <button class="modal-x" type="button" data-close aria-label="Cerrar">✕</button>
    <div class="modal-frame"><iframe data-src="https://www.youtube-nocookie.com/embed/${SITE.reel}?autoplay=1&amp;rel=0" title="Reel — Simón Melgarejo" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe></div>
  </div>
</div>`;

function page({ title, desc = SITE.description, path, body, og = '/img/og.jpg', bodyClass = '' }) {
  const full = title ? `${title} — Simón Melgarejo` : `Simón Melgarejo — ${SITE.role}`;
  return `<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(full)}</title>
<meta name="description" content="${esc(desc)}">
<link rel="canonical" href="${path}">
<meta property="og:type" content="website">
<meta property="og:title" content="${esc(full)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:image" content="${og}">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#F2F1EE">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="preload" href="/fonts/inter-tight.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="/assets/site.css">
</head>
<body class="${bodyClass}">
${header()}
<main id="main">
${body}
</main>
${footer()}
${reelModal()}
<script src="/assets/site.js" defer></script>
</body>
</html>
`;
}

/* ---------------------------------------------------------------- inicio */

function hero() {
  const trail = projects.filter((p) => p.cover && p.cover.startsWith('/') && !p.coverVertical).map((p) => p.cover);
  return `
<section class="hero" data-trail='${esc(JSON.stringify(trail))}'>
  <div class="wrap hero-meta">
    <span class="status"><i aria-hidden="true"></i>Disponible para proyectos</span>
    <span class="hide-sm">${esc(SITE.tagline)}</span>
    <span>Colombia · <b data-clock>--:--</b></span>
  </div>
  <h1 class="hero-title" aria-label="Simón Melgarejo"><span class="line"><span>Simón</span></span><span class="line"><span>Melgarejo</span></span></h1>
  <div class="wrap hero-foot">
    <p class="hero-lede">No solo organizo clips en una línea de tiempo: <em>construyo sistemas para contar historias.</em> Dirección, montaje, VFX, color e IA, de punta a punta.</p>
    <div class="hero-cta">
      <button class="pill pill-dark" type="button" data-reel>${ICON.play} Ver reel</button>
      <a class="pill" href="#proyectos">Ver proyectos</a>
    </div>
  </div>
  <p class="trail-hint" aria-hidden="true"><span class="hint-fine">Mueve el cursor</span><span class="hint-touch">Desliza sobre la portada</span></p>
</section>`;
}

function featured() {
  const items = FEATURED.map((s) => bySlug[s]).filter(Boolean);
  return `
<section class="section" id="trabajo">
  <div class="wrap">
    <div class="sec-head">
      <h2 class="sec-title">Trabajo seleccionado <sup>(${pad(items.length)})</sup></h2>
      <a class="link-arrow" href="#proyectos">Toda la línea de tiempo ${ICON.arrow}</a>
    </div>
    <div class="work-grid">
      ${items.map((p, i) => `
      <a class="work-card reveal" href="/proyecto/${p.slug}" style="--d:${(i % 2) * 80}ms">
        <span class="blob-media" data-blob>
          ${cover(p, { cls: 'base' })}
          ${p.cover ? `<img class="color" src="${esc(p.cover)}" alt="" loading="lazy" decoding="async" aria-hidden="true">` : ''}
          <span class="blob-cta" aria-hidden="true">Ver proyecto ${ICON.arrow}</span>
        </span>
        <span class="work-info">
          <span class="work-title">${esc(p.short || p.title)}</span>
          <span class="work-meta">${esc(p.format)} <i></i> ${p.year}</span>
        </span>
      </a>`).join('')}
    </div>
  </div>
</section>`;
}

function timeline() {
  let lastYear = null;
  const track = projects.map((p, i) => {
    const sep = p.year !== lastYear ? `<span class="tl-year" data-sep="${p.year}" aria-hidden="true"><b>${p.year}</b></span>` : '';
    lastYear = p.year;
    const roleLine = p.role || p.client || p.studio || '';
    return `${sep}
      <a class="clip" href="/proyecto/${p.slug}" data-year="${p.year}" data-tags="${p.tags.join(' ')}">
        <span class="clip-media">${cover(p, { cls: p.coverVertical ? 'fit-contain' : '' })}<span class="clip-idx">${pad(i + 1)}</span></span>
        <span class="clip-body">
          <span class="clip-title">${esc(p.short || p.title)}</span>
          <span class="clip-role">${esc(roleLine)}</span>
          <span class="clip-bar"><span>${esc(p.format)}</span><span>${p.year}</span></span>
        </span>
      </a>`;
  }).join('');
  return `
<section class="section section-tl" id="proyectos">
  <div class="wrap">
    <div class="sec-head">
      <h2 class="sec-title">Línea de tiempo <sup data-count>(${pad(projects.length)})</sup></h2>
      <p class="sec-note">${years[0]} → ${years[years.length - 1]} · Arrastra, desliza o usa ← →</p>
    </div>
    <div class="filters" role="group" aria-label="Filtrar proyectos" data-filters>
      <button class="chip" type="button" data-tag="all" aria-pressed="true">Todos</button>
      ${TAGS.map((t) => `<button class="chip" type="button" data-tag="${t.key}" aria-pressed="false">${t.label}</button>`).join('')}
    </div>
  </div>
  <div class="tl">
    <div class="tl-track" data-track>${track}
      <span class="tl-end" aria-hidden="true"></span>
    </div>
    <div class="tl-playhead" aria-hidden="true"></div>
    <div class="tl-scrub wrap" aria-hidden="true"><span class="tl-scrub-bar"><i data-progress></i></span><span class="tl-now" data-now>${years[0]}</span></div>
  </div>
  <p class="wrap tl-empty" data-empty hidden>Ningún proyecto con ese filtro.</p>
</section>`;
}

function services() {
  return `
<section class="section" id="servicios">
  <div class="wrap">
    <div class="sec-head">
      <h2 class="sec-title">Lo que hago <sup>(${pad(SERVICES.length)})</sup></h2>
      <p class="sec-note">Disciplina y experiencia</p>
    </div>
    <ol class="services">
      ${SERVICES.map((s, i) => `
      <li class="service reveal">
        <span class="svc-n">${pad(i + 1)}</span>
        <h3 class="svc-title">${esc(s.title)}</h3>
        <p class="svc-text">${esc(s.text)}</p>
      </li>`).join('')}
    </ol>
  </div>
</section>`;
}

function photos() {
  return `
<section class="section" id="fotografia">
  <div class="wrap">
    <div class="sec-head">
      <h2 class="sec-title">Fotografía <sup>(${pad(collections.length)})</sup></h2>
      <p class="sec-note">Colecciones</p>
    </div>
    <div class="col-grid">
      ${collections.map((c, i) => {
        const inner = `
        <span class="col-media">${c.cover
          ? `<img src="${esc(c.cover)}" alt="${esc(c.title)} — ${esc(c.subtitle)}" loading="lazy" decoding="async">`
          : `<span class="col-empty" aria-hidden="true"><span>${pad(i + 1)}</span></span>`}
          <span class="col-count">${c.photos.length ? `${c.photos.length} fotos` : 'Próximamente'}</span>
        </span>
        <span class="col-info"><span class="col-title">${esc(c.title)}</span><span class="col-sub">${esc(c.subtitle)}</span></span>`;
        return c.photos.length
          ? `<a class="col-card reveal" href="/coleccion/${c.slug}" style="--d:${i * 80}ms">${inner}</a>`
          : `<div class="col-card is-empty reveal" style="--d:${i * 80}ms">${inner}</div>`;
      }).join('')}
    </div>
  </div>
</section>`;
}

function about() {
  return `
<section class="section" id="sobre-mi">
  <div class="wrap about">
    <figure class="portrait reveal">
      <img src="/img/simon_profile.webp" alt="Retrato de Simón Melgarejo" loading="lazy" decoding="async" width="1024" height="1024">
    </figure>
    <div class="about-copy">
      <p class="eyebrow">Sobre mí</p>
      <h2 class="about-title">Visión. <em>Sistema.</em> Ejecución.</h2>
      <p>No solo organizo clips. Construyo sistemas narrativos. Mi proceso combina la <strong>mentalidad de un cineasta</strong> con la <strong>eficiencia de la producción independiente</strong>.</p>
      <p>Desde operar cámaras de cine hasta gestionar conductos de postproducción, trato cada proyecto como un rompecabezas. Uso la <strong>IA como un amplificador</strong>, para expandir lo que es posible bajo restricciones.</p>
      <p>Hoy dirijo la parte creativa de <strong>Lemon Drop</strong>, donde cruzamos producción audiovisual, contenido para redes y edición con IA.</p>
      <dl class="stats">
        <div><dt>Proyectos</dt><dd>${pad(projects.length)}</dd></div>
        <div><dt>Años activos</dt><dd>${years[0]}—${String(years[years.length - 1]).slice(2)}</dd></div>
        <div><dt>Disciplinas</dt><dd>${pad(SERVICES.length)}</dd></div>
        <div><dt>Premio internacional</dt><dd>01</dd></div>
      </dl>
      <div class="socials">${SITE.socials.map((s) => `<a class="pill" href="${s.url}" target="_blank" rel="noreferrer noopener">${s.name} ${ICON.arrow}</a>`).join('')}</div>
    </div>
  </div>
</section>`;
}

function contact() {
  return `
<section class="section contact" id="contacto">
  <div class="wrap contact-grid">
    <div>
      <p class="eyebrow">Contacto</p>
      <h2 class="contact-title">Hagamos algo <em>cinematográfico.</em></h2>
      <p class="contact-note">Cuéntame del proyecto: formato, tiempos y lo que quieres que sienta la gente. Te respondo por correo.</p>
    </div>
    <form class="form" id="contact-form" novalidate data-to="${SITE.email.join('|')}">
      <label><span>Nombre</span><input name="nombre" type="text" placeholder="Tu nombre" required autocomplete="name"></label>
      <label><span>Correo</span><input name="correo" type="email" placeholder="tu@correo.com" required autocomplete="email"></label>
      <label><span>Proyecto</span><textarea name="mensaje" rows="4" placeholder="Cuéntame la idea" required></textarea></label>
      <div class="form-row"><span class="form-status" data-status role="status"></span><button class="pill pill-dark" type="submit">Enviar mensaje ${ICON.arrow}</button></div>
    </form>
  </div>
</section>`;
}

function home() {
  return page({ path: '/', body: hero() + featured() + timeline() + services() + photos() + about() + contact(), bodyClass: 'is-home' });
}

/* ---------------------------------------------------------------- proyecto */

function mediaItem(m) {
  if (m.yt) {
    return `<figure class="piece piece-wide">
      <button class="yt" type="button" data-yt="${m.yt}" aria-label="Reproducir ${esc(m.title)}">
        <img src="${ytThumb(m.yt)}" alt="" loading="lazy" decoding="async" onerror="this.remove()"><span class="yt-play">${ICON.play}</span>
      </button>
      <figcaption>${esc(m.title)}</figcaption></figure>`;
  }
  if (m.video) {
    return `<figure class="piece ${m.vertical ? 'piece-tall' : 'piece-wide'}">
      <video controls playsinline preload="none" poster="${esc(m.poster || '')}"><source src="${esc(m.video)}" type="video/mp4"></video>
      <figcaption>${esc(m.title)}</figcaption></figure>`;
  }
  if (m.ig) {
    const url = `https://www.instagram.com/${m.kind === 'p' ? 'p' : 'reel'}/${m.ig}/`;
    return `<figure class="piece piece-tall piece-ig">
      <iframe src="${url}embed/" title="${esc(m.title)} — Instagram" loading="lazy" allowtransparency="true" scrolling="no"></iframe>
      <figcaption><a href="${url}" target="_blank" rel="noreferrer noopener">${esc(m.title)} · Ver en Instagram ↗</a></figcaption></figure>`;
  }
  return '';
}

function projectPage(p, i) {
  const next = projects[(i + 1) % projects.length];
  const prev = projects[(i - 1 + projects.length) % projects.length];
  const meta = [['Año', p.year], ['Formato', p.format], ['Rol', p.role], ['Cliente', p.client], ['Estudio', p.studio]].filter(([, v]) => v);
  const related = p.related && bySlug[p.related];
  const wide = p.media.filter((m) => !m.vertical && !m.ig);
  const tall = p.media.filter((m) => m.vertical || m.ig);
  const body = `
<article class="project">
  <div class="wrap">
    <a class="back" href="/#proyectos">← Línea de tiempo</a>
    <header class="p-head">
      <p class="eyebrow">${pad(i + 1)} / ${pad(projects.length)} · ${p.tags.map((t) => tagLabel[t]).join(' · ')}</p>
      <h1 class="p-title">${esc(p.title)}</h1>
    </header>
    <dl class="p-meta">${meta.map(([k, v]) => `<div><dt>${k}</dt><dd>${esc(v)}</dd></div>`).join('')}</dl>
  </div>
  <div class="wrap">
    <div class="p-cover ${p.coverVertical ? 'is-vertical' : ''}">${cover(p, { eager: true })}</div>
  </div>
  <div class="wrap p-text">
    ${p.reto ? `<div class="reveal"><p class="eyebrow">Reto</p><p class="p-lead">${esc(p.reto)}</p></div>` : ''}
    ${p.respuesta ? `<div class="reveal"><p class="eyebrow">${p.reto ? 'Respuesta' : 'El proyecto'}</p><p class="p-lead">${esc(p.respuesta)}</p></div>` : ''}
  </div>
  ${p.quote || p.kpis ? `<div class="wrap p-impact reveal">
    ${p.quote ? `<blockquote class="p-quote">“${esc(p.quote.replace(/^"|"$/g, ''))}”</blockquote>` : ''}
    ${p.kpis ? `<dl class="kpis">${p.kpis.map(([v, l]) => `<div><dd>${esc(v)}</dd><dt>${esc(l)}</dt></div>`).join('')}</dl>` : ''}
  </div>` : ''}
  ${p.media.length ? `<section class="wrap p-media">
    <div class="sec-head"><h2 class="sec-title">Piezas <sup>(${pad(p.media.length)})</sup></h2></div>
    ${wide.length ? `<div class="pieces-wide">${wide.map(mediaItem).join('')}</div>` : ''}
    ${tall.length ? `<div class="pieces-tall">${tall.map(mediaItem).join('')}</div>` : ''}
  </section>` : ''}
  ${related ? `<div class="wrap"><a class="related" href="/proyecto/${related.slug}">Proyecto relacionado: <b>${esc(related.title)}</b> ${ICON.arrow}</a></div>` : ''}
  <nav class="wrap p-next" aria-label="Más proyectos">
    <a class="p-prev-link" href="/proyecto/${prev.slug}">← ${esc(prev.short || prev.title)}</a>
    <a class="next-card" href="/proyecto/${next.slug}">
      <span class="next-label">Siguiente proyecto</span>
      <span class="next-title">${esc(next.short || next.title)} ${ICON.arrow}</span>
      <span class="next-media blob-media" data-blob>${cover(next, { cls: 'base' })}${next.cover ? `<img class="color" src="${esc(next.cover)}" alt="" loading="lazy" aria-hidden="true">` : ''}</span>
    </a>
  </nav>
</article>`;
  const og = p.cover && p.cover.startsWith('/') ? p.cover : '/img/og.jpg';
  return page({ title: p.title, desc: `${p.title} (${p.year}) — ${p.format}. ${p.respuesta || ''}`.trim(), path: `/proyecto/${p.slug}`, body, og });
}

/* ---------------------------------------------------------------- colección */

function collectionPage(c) {
  const body = `
<article class="project">
  <div class="wrap">
    <a class="back" href="/#fotografia">← Fotografía</a>
    <header class="p-head">
      <p class="eyebrow">Colección fotográfica · ${c.photos.length} fotos</p>
      <h1 class="p-title">${esc(c.title)}</h1>
      <p class="p-sub">${esc(c.subtitle)}</p>
    </header>
    <div class="masonry" data-gallery>
      ${c.photos.map((src, i) => `<button class="m-item" type="button" data-index="${i}" aria-label="Ampliar foto ${i + 1}"><img src="${src}" alt="${esc(c.title)} — foto ${i + 1}" loading="lazy" decoding="async"></button>`).join('')}
    </div>
  </div>
</article>
<div class="lightbox" data-lightbox hidden role="dialog" aria-modal="true" aria-label="Foto ampliada">
  <button class="lb-x" type="button" data-lb-close aria-label="Cerrar">✕</button>
  <button class="lb-nav lb-prev" type="button" data-lb-prev aria-label="Anterior">←</button>
  <img alt="">
  <button class="lb-nav lb-next" type="button" data-lb-next aria-label="Siguiente">→</button>
  <span class="lb-count" data-lb-count></span>
</div>`;
  return page({ title: `${c.title} — ${c.subtitle}`, path: `/coleccion/${c.slug}`, body, og: c.cover || '/img/og.jpg' });
}

/* ---------------------------------------------------------------- 404 */

function notFound() {
  return page({ title: 'Página no encontrada', path: '/404', body: `
<section class="section nf">
  <div class="wrap">
    <p class="eyebrow">Error 404</p>
    <h1 class="p-title">Este plano no quedó en el corte final.</h1>
    <p class="p-lead">La página que buscas no existe o cambió de lugar.</p>
    <a class="pill pill-dark" href="/">Volver al inicio ${ICON.arrow}</a>
  </div>
</section>` });
}

/* ---------------------------------------------------------------- escribir */

function out(rel, html) {
  const file = join(ROOT, rel);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, html);
}

for (const d of ['proyecto', 'coleccion']) rmSync(join(ROOT, d), { recursive: true, force: true });
out('index.html', home());
projects.forEach((p, i) => out(`proyecto/${p.slug}.html`, projectPage(p, i)));
collections.filter((c) => c.photos.length).forEach((c) => out(`coleccion/${c.slug}.html`, collectionPage(c)));
out('404.html', notFound());
out('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>/</loc><priority>1.0</priority></url>
${projects.map((p) => `  <url><loc>/proyecto/${p.slug}</loc><priority>0.7</priority></url>`).join('\n')}
${collections.filter((c) => c.photos.length).map((c) => `  <url><loc>/coleccion/${c.slug}</loc><priority>0.6</priority></url>`).join('\n')}
</urlset>
`);

const drafts = PROJECTS.filter((p) => p.draft).map((p) => p.slug);
console.log(`ok · ${projects.length} proyectos · ${collections.filter((c) => c.photos.length).length}/${collections.length} colecciones con fotos${drafts.length ? ` · borradores sin publicar: ${drafts.join(', ')}` : ''}`);
