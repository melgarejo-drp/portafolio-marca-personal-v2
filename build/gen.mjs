// Genera el sitio estático: index, trabajos, redes, marca-personal, proyecto/*, coleccion/*, 404 y sitemap.
// Uso: node build/gen.mjs   (sin dependencias)
import { readdirSync, writeFileSync, mkdirSync, existsSync, rmSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { SITE, TAGS, PROJECTS, FEATURED, SERVICES, COLLECTIONS, REELS } from './data.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const YEAR = 2026;

const esc = (s) => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const pad = (n) => String(n).padStart(2, '0');
const ytThumb = (id) => `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
const igUrl = (r) => `https://www.instagram.com/${r.kind === 'p' ? 'p' : 'reel'}/${r.ig}/`;
const fileName = (p) => (p.short || p.title).normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '').slice(0, 22) + '.mov';

// Miniaturas de publicaciones de Instagram: img/redes/<código>.(webp|jpg). Si existen, sirven de portada.
const igThumb = (code) => {
  for (const ext of ['webp', 'jpg', 'png']) if (code && existsSync(join(ROOT, 'img', 'redes', `${code}.${ext}`))) return `/img/redes/${code}.${ext}`;
  return null;
};
const projects = PROJECTS.filter((p) => !p.draft).map((p) => {
  if (p.cover) return p;
  const ig = p.media.find((m) => m.ig && igThumb(m.ig));
  return ig ? { ...p, cover: igThumb(ig.ig), coverVertical: true } : p;
});
const bySlug = Object.fromEntries(projects.map((p) => [p.slug, p]));
const years = [...new Set(projects.map((p) => p.year))].sort();
const tagLabel = Object.fromEntries(TAGS.map((t) => [t.key, t.label]));
const reels = REELS.filter((r) => !r.draft).map((r) => (r.ig && !r.poster ? { ...r, thumb: igThumb(r.ig) } : r));
const reelClients = [...new Set(reels.map((r) => r.client))];

const readImages = (rel) => {
  const dir = join(ROOT, rel);
  return existsSync(dir)
    ? readdirSync(dir).filter((f) => /\.(jpe?g|png|webp|avif)$/i.test(f)).sort().map((f) => `/${rel}/${encodeURIComponent(f)}`)
    : [];
};
const artistFrames = readImages('img/artista');
const collections = COLLECTIONS.map((c) => {
  const photos = readImages(`img/colecciones/${c.slug}`);
  return { ...c, photos, cover: c.cover || photos[0] || null };
});

/* ---------------------------------------------------------------- piezas comunes */

const ICON = {
  arrow: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9" fill="none" stroke="currentColor" stroke-width="1.8"/></svg>',
  play: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5.5v13l11-6.5z" fill="currentColor"/></svg>',
  left: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7" fill="none" stroke="currentColor" stroke-width="1.8"/></svg>',
  right: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7" fill="none" stroke="currentColor" stroke-width="1.8"/></svg>',
  sound: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9v6h4l5 4V5L8 9H4z" fill="currentColor"/><path class="wave" d="M16 8.5a5 5 0 0 1 0 7M18.5 6a8.5 8.5 0 0 1 0 12" fill="none" stroke="currentColor" stroke-width="1.6"/></svg>'
};

const sourceLabel = (p) => {
  const m = p.media[0];
  if (m && m.ig) return 'Instagram ↗';
  if (m && m.yt) return 'YouTube ↗';
  return '';
};

function cover(p, { cls = '', eager = false } = {}) {
  if (p.cover && /^https?:/.test(p.cover)) {
    // Portada remota (miniatura de YouTube): si no carga, queda la portada tipográfica debajo.
    return `${cover({ ...p, cover: null })}<img class="${cls}" src="${esc(p.cover)}" alt="${esc(p.title)} — ${esc(p.format)}" loading="lazy" decoding="async" onerror="this.remove()">`;
  }
  if (p.cover) {
    return `<img class="${cls}" src="${esc(p.cover)}" alt="${esc(p.title)} — ${esc(p.format)}" ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async">`;
  }
  // Portada tipográfica para piezas sin imagen propia.
  return `<span class="type-cover tone-${p.tone || 'ink'} ${cls}" aria-hidden="true"><span class="tc-title">${esc(p.short || p.title)}</span><span class="tc-meta"><span>${esc(p.format)}</span><span>${sourceLabel(p)}</span></span></span>`;
}

const award = (p, cls = '') => (p.award ? `<span class="award ${cls}"><i aria-hidden="true">★</i>${esc(p.award)}</span>` : '');

// Secuencia de retratos en loop (tipo GIF). Fotogramas en img/artista/.
function artistLoop(cls = '') {
  if (!artistFrames.length) return '';
  return `<span class="artist-loop ${cls}" data-loop role="img" aria-label="Retratos de Simón Melgarejo">${artistFrames
    .map((src, i) => `<img src="${src}" alt="" ${i === 0 ? 'class="on"' : 'loading="lazy"'} decoding="async">`).join('')}</span>`;
}

const NAV = [
  ['trabajos', '/trabajos', 'Trabajos'],
  ['redes', '/redes', 'Redes'],
  ['marca', '/marca-personal', 'Marca personal'],
  ['fotografia', '/#fotografia', 'Fotografía']
];

const header = (current) => `
<a class="skip" href="#main">Saltar al contenido</a>
<header class="nav" data-nav>
  <a class="brand" href="/" aria-label="Simón Melgarejo — inicio">Simón Melgarejo</a>
  <nav class="nav-links" aria-label="Principal">
    ${NAV.map(([k, href, label]) => `<a href="${href}"${k === current ? ' aria-current="page"' : ''}>${label}</a>`).join('\n    ')}
  </nav>
  <a class="pill pill-dark nav-cta" href="/#contacto">Contacto</a>
  <button class="menu-btn" type="button" aria-expanded="false" aria-controls="menu" data-menu-btn><span></span><span></span><span class="sr">Menú</span></button>
</header>
<div class="menu" id="menu" data-menu hidden>
  <nav aria-label="Menú móvil">
    <a href="/">Inicio</a>
    ${NAV.map(([, href, label]) => `<a href="${href}">${label}</a>`).join('\n    ')}
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
      <div><p class="eyebrow">Sitio</p><a href="/">Inicio</a>${NAV.map(([, href, label]) => `<a href="${href}">${label}</a>`).join('')}</div>
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

function page({ title, desc = SITE.description, path, body, og = '/img/og.jpg', bodyClass = '', current = '' }) {
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
<script>if('scrollRestoration' in history)history.scrollRestoration='manual';</script>
</head>
<body class="${bodyClass}">
${header(current)}
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

const secHead = (title, count, right = '') => `
    <div class="sec-head">
      <h2 class="sec-title">${title}${count != null ? ` <sup${count.attr || ''}>(${pad(count.n ?? count)})</sup>` : ''}</h2>
      ${right}
    </div>`;

/* ---------------------------------------------------------------- tarjetas */

function workCard(p, i = 0, { cls = '' } = {}) {
  return `
      <a class="work-card reveal ${cls}${p.award ? ' has-award' : ''}" href="/proyecto/${p.slug}" style="--d:${(i % 3) * 70}ms" data-tags="${p.tags.join(' ')}">
        <span class="blob-media" data-blob>
          ${cover(p, { cls: 'base' })}
          ${p.cover && !/^https?:/.test(p.cover) ? `<img class="color" src="${esc(p.cover)}" alt="" loading="lazy" decoding="async" aria-hidden="true">` : ''}
          ${award(p, 'on-media')}
          <span class="blob-cta" aria-hidden="true">Ver proyecto ${ICON.arrow}</span>
        </span>
        <span class="work-info">
          <span class="work-title">${esc(p.short || p.title)}</span>
          <span class="work-meta">${esc(p.format)} <i></i> ${p.year}</span>
        </span>
      </a>`;
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
  <h1 class="hero-title" aria-label="Simón Melgarejo"><span class="line"><span>Simón${artistLoop('in-title')}</span></span><span class="line"><span>Melgarejo</span></span></h1>
  <div class="wrap hero-foot">
    <p class="hero-lede">No solo organizo clips en una línea de tiempo: <em>construyo sistemas para contar historias.</em> Dirección, montaje, VFX, color e IA, de punta a punta.</p>
    <div class="hero-cta">
      <button class="pill pill-dark" type="button" data-reel>${ICON.play} Ver reel</button>
      <a class="pill" href="/trabajos">Ver trabajos</a>
    </div>
  </div>
  <p class="trail-hint" aria-hidden="true"><span class="hint-fine">Mueve el cursor</span><span class="hint-touch">Desliza sobre la portada</span></p>
</section>`;
}

function timeline() {
  let lastYear = null;
  const track = projects.map((p, i) => {
    const sep = p.year !== lastYear ? `<span class="tl-year" data-sep="${p.year}" aria-hidden="true"><b>${p.year}</b></span>` : '';
    lastYear = p.year;
    const roleLine = p.role || p.award || p.client || p.studio || '';
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
    ${secHead('Línea de tiempo', { n: projects.length, attr: ' data-count' }, `<p class="sec-note">${years[0]} → ${years[years.length - 1]} · Arrastra, desliza o usa ← →</p>`)}
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

function featured() {
  const items = FEATURED.map((s) => bySlug[s]).filter(Boolean);
  return `
<section class="section" id="trabajo">
  <div class="wrap">
    ${secHead('Destacados', items.length, `<a class="link-arrow" href="/trabajos">Todos los trabajos ${ICON.arrow}</a>`)}
    <div class="work-grid">${items.map((p, i) => workCard(p, i % 2)).join('')}
    </div>
  </div>
</section>`;
}

function services() {
  return `
<section class="section" id="servicios">
  <div class="wrap">
    ${secHead('Lo que hago', SERVICES.length, '<p class="sec-note">Disciplina y experiencia</p>')}
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
    ${secHead('Fotografía', collections.length, '<p class="sec-note">Colecciones</p>')}
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

const stats = () => `
      <dl class="stats">
        <div><dt>Proyectos</dt><dd>${pad(projects.length)}</dd></div>
        <div><dt>Años activos</dt><dd>${years[0]}—${String(years[years.length - 1]).slice(2)}</dd></div>
        <div><dt>Piezas para redes</dt><dd>${pad(reels.length)}+</dd></div>
        <div><dt>Galardones</dt><dd>${pad(projects.filter((p) => p.award).length)}</dd></div>
      </dl>`;

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
      ${stats()}
      <div class="socials"><a class="pill pill-dark" href="/marca-personal">Conoce mi marca personal ${ICON.arrow}</a>${SITE.socials.map((s) => `<a class="pill" href="${s.url}" target="_blank" rel="noreferrer noopener">${s.name} ${ICON.arrow}</a>`).join('')}</div>
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
      <label for="f-nombre"><span>Nombre</span><input id="f-nombre" name="nombre" type="text" placeholder="Tu nombre" required autocomplete="name"></label>
      <label for="f-correo"><span>Correo</span><input id="f-correo" name="correo" type="email" placeholder="tu@correo.com" required autocomplete="email"></label>
      <label for="f-mensaje"><span>Proyecto</span><textarea id="f-mensaje" name="mensaje" rows="4" placeholder="Cuéntame la idea" required></textarea></label>
      <div class="form-row"><span class="form-status" data-status role="status"></span><button class="pill pill-dark" type="submit">Enviar mensaje ${ICON.arrow}</button></div>
    </form>
  </div>
</section>`;
}

function home() {
  return page({ path: '/', body: hero() + timeline() + featured() + services() + photos() + about() + contact(), bodyClass: 'is-home' });
}

/* ---------------------------------------------------------------- trabajos */

// Sala de montaje: la línea de tiempo de edición de la v2 (regla de años + cabezal rojo).
// Sala de montaje: dos pistas (V1 y V2) que se desplazan en sentido contrario bajo un cabezal fijo.
const isCine = (p) => p.tags.some((t) => ['direccion', 'cortos', 'cubrimiento'].includes(t));
function nleClip(p, n, clone) {
  return `
        <a class="nle-clip" href="/proyecto/${p.slug}"${clone ? ' aria-hidden="true" tabindex="-1" data-clone' : ''}>
          <span class="nle-head"><b>${pad(n)}</b> ${esc(fileName(p))}</span>
          <span class="nle-art">${cover(p, { cls: p.coverVertical ? 'fit-contain' : '' })}<span class="nle-tint" aria-hidden="true"></span></span>
          <span class="nle-foot">
            <span class="nle-title">${esc(p.short || p.title)}</span>
            <span class="nle-role">${esc(p.role || p.award || p.client || p.studio || '')}</span>
            <span class="nle-bar"><span>${esc(p.format)}</span><span class="yr">${p.year}</span></span>
          </span>
        </a>`;
}
function editBay() {
  const lanes = [
    { id: 'V1', name: 'Cine y dirección', dir: -1, items: projects.filter(isCine) },
    { id: 'V2', name: 'IA, edición y redes', dir: 1, items: projects.filter((p) => !isCine(p)) }
  ];
  const lane = (l) => {
    const clips = l.items.map((p) => nleClip(p, projects.indexOf(p) + 1, false)).join('');
    const clones = l.items.map((p) => nleClip(p, projects.indexOf(p) + 1, true)).join('');
    return `
    <div class="nle-lane" data-lane data-dir="${l.dir}">
      <span class="nle-label" aria-hidden="true"><b>${l.id}</b><small>${l.name}</small><i>${l.dir < 0 ? '←' : '→'}</i></span>
      <div class="nle-viewport" role="region" aria-label="Pista ${l.id}: ${l.name}">
        <div class="nle-belt" data-belt>${clips}${clones}
        </div>
      </div>
    </div>`;
  };
  return `
<section class="bay" id="sala">
  <div class="wrap bay-head">
    <p class="bay-eyebrow"><i aria-hidden="true"></i>~/linea-de-tiempo</p>
    <h1 class="bay-title">La sala de montaje</h1>
    <p class="bay-lede">${projects.length} clips en dos pistas · ${years[0]} → ${years[years.length - 1]}</p>
  </div>
  <div class="nle" data-nle>
    <div class="nle-ruler" data-ruler aria-hidden="true"><span class="nle-tc" data-nle-tc>00:00:00:00</span></div>
    ${lanes.map(lane).join('')}
    <div class="nle-playhead" aria-hidden="true"></div>
  </div>
  <p class="wrap nle-hint">Pasa el cursor sobre una pista para detenerla · arrástrala para recorrerla</p>
</section>`;
}

function trabajosPage() {
  const body = `
${editBay()}
<section class="section works" id="todos">
  <div class="wrap">
    ${secHead('Todos los proyectos', { n: projects.length, attr: ' data-grid-count' }, '<p class="sec-note">Filtra por disciplina</p>')}
    <div class="filters" role="group" aria-label="Filtrar proyectos" data-grid-filters>
      <button class="chip" type="button" data-tag="all" aria-pressed="true">Todos</button>
      ${TAGS.map((t) => `<button class="chip" type="button" data-tag="${t.key}" aria-pressed="false">${t.label}</button>`).join('')}
    </div>
    <div class="work-grid grid-3" data-grid>${projects.slice().reverse().map((p, i) => workCard(p, i)).join('')}
    </div>
    <p class="tl-empty" data-grid-empty hidden>Ningún proyecto con ese filtro.</p>
  </div>
</section>`;
  return page({ title: 'Trabajos', path: '/trabajos', body, current: 'trabajos', bodyClass: 'is-trabajos',
    desc: `Filmografía y proyectos de Simón Melgarejo, ${years[0]}–${years[years.length - 1]}: cortometrajes, campañas, videoclips, edición con IA y contenido para redes.` });
}

/* ---------------------------------------------------------------- redes */

function reelCard(r, i) {
  const proj = r.project && bySlug[r.project];
  let media;
  if (r.video) {
    media = `<video muted loop playsinline preload="none" poster="${esc(r.poster || '')}"><source src="${esc(r.video)}" type="video/mp4"></video>
          <button class="reel-sound" type="button" data-sound aria-label="Activar sonido" aria-pressed="false">${ICON.sound}</button>`;
  } else {
    media = `<a class="reel-ig${r.thumb ? ' has-thumb' : ''}" href="${igUrl(r)}" target="_blank" rel="noopener" data-ig="${r.ig}" data-kind="${r.kind}" aria-label="Ver ${esc(r.title)} — ${esc(r.client)} en Instagram">
            ${r.thumb ? `<img class="reel-thumb" src="${r.thumb}" alt="" loading="lazy" decoding="async">` : ''}
            <span class="reel-ig-client">${esc(r.client)}</span>
            <span class="reel-ig-play">${ICON.play}</span>
            <span class="reel-ig-cta">${r.kind === 'p' ? 'Ver publicación' : 'Ver reel'} ↗</span>
          </a>`;
  }
  return `
      <figure class="reel ${r.wide ? 'is-wide' : ''}" data-client="${esc(r.client)}" data-i="${i}">
        <div class="reel-media">${media}</div>
        <figcaption>
          <span class="reel-client">${esc(r.client)}</span>
          <span class="reel-title">${esc(r.title)}</span>
          ${proj ? `<a class="reel-link" href="/proyecto/${proj.slug}">Ver proyecto ${ICON.arrow}</a>` : ''}
        </figcaption>
      </figure>`;
}

function redesPage() {
  const body = `
<section class="page-hero">
  <div class="wrap">
    <p class="eyebrow">Edición para redes</p>
    <h1 class="page-title">Hecho para <em>el scroll.</em></h1>
    <div class="page-intro">
      <p class="p-lead">Reels, cortes de podcast y series verticales para marcas personales, medios y estudios. Ganchos en los primeros segundos, subtítulos y un ritmo pensado para que nadie pase de largo.</p>
      <dl class="kpis">
        <div><dd>${pad(reels.length)}</dd><dt>Piezas en el carrusel</dt></div>
        <div><dd>${pad(reelClients.length)}</dd><dt>Clientes y formatos</dt></div>
      </dl>
    </div>
  </div>
</section>
<section class="carousel-sec" aria-label="Carrusel de piezas para redes">
  <div class="wrap carousel-bar">
    <div class="filters" role="group" aria-label="Filtrar por cliente" data-reel-filters>
      <button class="chip" type="button" data-client="all" aria-pressed="true">Todo</button>
      ${reelClients.map((c) => `<button class="chip" type="button" data-client="${esc(c)}" aria-pressed="false">${esc(c)}</button>`).join('')}
    </div>
  </div>
  <div class="carousel" data-carousel>
    <div class="carousel-track" data-carousel-track>${reels.map(reelCard).join('')}
    </div>
  </div>
  <div class="wrap carousel-ctrl">
    <span class="carousel-count" data-carousel-count>01 / ${pad(reels.length)}</span>
    <span class="carousel-progress" aria-hidden="true"><i data-carousel-progress></i></span>
    <div class="carousel-btns">
      <button class="round" type="button" data-carousel-prev aria-label="Pieza anterior">${ICON.left}</button>
      <button class="round" type="button" data-carousel-next aria-label="Pieza siguiente">${ICON.right}</button>
    </div>
  </div>
</section>
<section class="section">
  <div class="wrap">
    ${secHead('Para quién edito', reelClients.length)}
    <ul class="client-list">
      ${reelClients.map((c) => {
        const n = reels.filter((r) => r.client === c).length;
        const proj = reels.find((r) => r.client === c && r.project);
        const inner = `<span class="cl-name">${esc(c)}</span><span class="cl-n">${pad(n)} ${n === 1 ? 'pieza' : 'piezas'}</span>`;
        return `<li>${proj ? `<a href="/proyecto/${proj.project}">${inner}<span class="cl-arrow">${ICON.arrow}</span></a>` : `<span class="cl-row">${inner}</span>`}</li>`;
      }).join('')}
    </ul>
  </div>
</section>`;
  return page({ title: 'Edición para redes', path: '/redes', body, current: 'redes', bodyClass: 'is-redes',
    desc: 'Edición de reels, cortes de podcast y series verticales de Simón Melgarejo para marcas personales, medios y estudios.' });
}

/* ---------------------------------------------------------------- marca personal */

function marcaPage() {
  const pillars = [
    ['Creación audiovisual', 'Dirijo, grabo, edito y coloreo. Del guion a la pieza final, en formatos que van del cortometraje al reel.', '/trabajos', 'Ver trabajos'],
    ['Estudio de la IA', 'Investigo y pruebo herramientas generativas para ampliar lo que una historia puede hacer: video con IA, edición automatizada y flujos que ahorran horas sin quitarle el criterio a nadie.', '/proyecto/monica-gomez-jaramillo', '12 piezas en 40 minutos'],
    ['Pasión por lo artesanal', 'Ilustración a mano, animación y piezas hechas con tiempo. El Invasor, ganador en Cineminutos por el Océano, nació así.', '/proyecto/el-invasor', 'Ver El Invasor']
  ];
  const passions = [
    ['Batería', 'El ritmo se entrena con baquetas y se aplica en la línea de tiempo.'],
    ['Salsa y bachata', 'Bailar es escuchar al otro y llegar a tiempo. Un buen corte pide lo mismo.'],
    ['Escribir', 'Ideas, guiones y notas que después se vuelven imagen.'],
    ['Dibujar', 'Lápiz y papel antes que cualquier software.'],
    ['Tecnología', 'Curiosidad por cada herramienta nueva y por entender cómo funciona por dentro.'],
    ['Aprender', 'Lo que más me mueve. Cada proyecto es una excusa para aprender algo que no sabía.']
  ];
  const formats = [
    ['Historias en primera persona', 'Experiencias contadas a cámara, con naturalidad y ritmo.'],
    ['Probar y contar', 'Productos y servicios mostrados desde el uso real, sin guion acartonado.'],
    ['Tutoriales y procesos', 'Paso a paso claros: de una receta de edición a una herramienta de IA.'],
    ['Formatos hablados', 'Opinión, entrevista y podcast llevados a vertical.'],
    ['Detrás de cámara', 'El proceso como contenido: rodajes, pruebas y edición.']
  ];
  const delivers = ['Vertical 9:16', 'Ganchos en los primeros segundos', 'Subtítulos', 'Versiones de 15, 30 y 60 s', 'Música y diseño sonoro', 'Listo para publicar o pautar'];
  const body = `
<section class="page-hero marca-hero">
  <div class="wrap marca-grid">
    <div class="marca-copy">
      <p class="eyebrow">Marca personal</p>
      <h1 class="page-title">Creo, estudio y hago <em>a mano.</em></h1>
      <p class="p-lead">Soy Simón Melgarejo, comunicador audiovisual, filmmaker e investigador de IA. Me muevo entre tres cosas: contar historias con imagen y sonido, entender hacia dónde va la inteligencia artificial y no perder el gusto por lo que se hace con las manos.</p>
    </div>
    ${artistLoop('large')}
  </div>
</section>
<section class="section pillars-sec">
  <div class="wrap">
    <div class="pillars">
      ${pillars.map(([t, d, href, cta], i) => `
      <article class="pillar reveal" style="--d:${i * 80}ms">
        <span class="pillar-sign" aria-hidden="true">${['◐', '◇', '✎'][i]}</span>
        <h2 class="pillar-title">${t}</h2>
        <p>${d}</p>
        <a class="link-arrow" href="${href}">${cta} ${ICON.arrow}</a>
      </article>`).join('')}
    </div>
  </div>
</section>
<section class="section">
  <div class="wrap">
    ${secHead('Fuera del set', null, '<p class="sec-note">Lo que también me forma</p>')}
    <ul class="passions">
      ${passions.map(([t, d], i) => `<li class="passion reveal" style="--d:${(i % 3) * 70}ms"><h3>${t}</h3><p>${d}</p></li>`).join('')}
    </ul>
  </div>
</section>
<section class="section camera">
  <div class="wrap camera-grid">
    <div>
      <p class="eyebrow">Frente y detrás de cámara</p>
      <h2 class="camera-title">Idea, cámara, <em>corte</em> y entrega.</h2>
      <p class="camera-lead">Puedo idear una pieza, ponerle la cara, grabarla y editarla. Contenido vertical con voz propia, hecho por alguien que de verdad usa, prueba y cuenta.</p>
      <ul class="delivers">${delivers.map((d) => `<li>${d}</li>`).join('')}</ul>
      <a class="pill pill-light" href="/redes">Ver piezas para redes ${ICON.arrow}</a>
    </div>
    <ol class="formats">
      ${formats.map(([t, d]) => `<li class="reveal"><h3>${t}</h3><p>${d}</p></li>`).join('')}
    </ol>
  </div>
</section>
<section class="section marca-cta">
  <div class="wrap">
    <h2 class="sec-title">¿Tu marca necesita a alguien que la cuente?</h2>
    <a class="pill pill-dark" href="/#contacto">Hablemos ${ICON.arrow}</a>
  </div>
</section>`;
  return page({ title: 'Marca personal', path: '/marca-personal', body, current: 'marca', bodyClass: 'is-marca', og: '/img/artista/01.webp',
    desc: 'Simón Melgarejo: creación audiovisual, estudio de la IA y pasión por lo artesanal. Batería, salsa y bachata, escritura, dibujo, tecnología y ganas de aprender.' });
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
    const url = igUrl(m);
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
    <a class="back" href="/trabajos">← Trabajos</a>
    <header class="p-head">
      <p class="eyebrow">${pad(i + 1)} / ${pad(projects.length)} · ${p.tags.map((t) => tagLabel[t]).join(' · ')}</p>
      <h1 class="p-title">${esc(p.title)}</h1>
      ${award(p, 'p-award')}
    </header>
    <dl class="p-meta">${meta.map(([k, v]) => `<div><dt>${k}</dt><dd>${esc(v)}</dd></div>`).join('')}</dl>
  </div>
  <div class="wrap">
    <div class="p-cover ${p.coverVertical ? 'is-vertical' : ''}">${cover(p, { eager: true })}</div>
    ${p.link ? `<div class="p-actions"><a class="pill pill-dark" href="${esc(p.link)}" target="_blank" rel="noreferrer noopener">Ver la pieza completa ${ICON.arrow}</a></div>` : ''}
  </div>
  ${p.reto || p.respuesta ? `<div class="wrap p-text">
    ${p.reto ? `<div class="reveal"><p class="eyebrow">Reto</p><p class="p-lead">${esc(p.reto)}</p></div>` : ''}
    ${p.respuesta ? `<div class="reveal"><p class="eyebrow">${p.reto ? 'Respuesta' : 'El proyecto'}</p><p class="p-lead">${esc(p.respuesta)}</p></div>` : ''}
  </div>` : ''}
  ${p.quote || p.kpis ? `<div class="wrap p-impact reveal">
    ${p.quote ? `<blockquote class="p-quote">“${esc(p.quote.replace(/^"|"$/g, ''))}”</blockquote>` : ''}
    ${p.kpis ? `<dl class="kpis">${p.kpis.map(([v, l]) => `<div><dd>${esc(v)}</dd><dt>${esc(l)}</dt></div>`).join('')}</dl>` : ''}
  </div>` : ''}
  ${p.media.length ? `<section class="wrap p-media">
    ${secHead('Piezas', p.media.length)}
    ${wide.length ? `<div class="pieces-wide">${wide.map(mediaItem).join('')}</div>` : ''}
    ${tall.length ? `<div class="pieces-tall">${tall.map(mediaItem).join('')}</div>` : ''}
  </section>` : ''}
  ${related ? `<div class="wrap"><a class="related" href="/proyecto/${related.slug}">Proyecto relacionado: <b>${esc(related.title)}</b> ${ICON.arrow}</a></div>` : ''}
  <nav class="wrap p-next" aria-label="Más proyectos">
    <a class="p-prev-link" href="/proyecto/${prev.slug}">← ${esc(prev.short || prev.title)}</a>
    <a class="next-card" href="/proyecto/${next.slug}">
      <span class="next-label">Siguiente proyecto</span>
      <span class="next-title">${esc(next.short || next.title)} ${ICON.arrow}</span>
      <span class="next-media blob-media" data-blob>${cover(next, { cls: 'base' })}${next.cover && !/^https?:/.test(next.cover) ? `<img class="color" src="${esc(next.cover)}" alt="" loading="lazy" aria-hidden="true">` : ''}</span>
    </a>
  </nav>
</article>`;
  const og = p.cover && p.cover.startsWith('/') ? p.cover : '/img/og.jpg';
  return page({ title: p.title, desc: `${p.title} (${p.year}) — ${p.format}. ${p.respuesta || p.award || p.role || ''}`.trim(), path: `/proyecto/${p.slug}`, body, og, current: 'trabajos' });
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
  return page({ title: `${c.title} — ${c.subtitle}`, path: `/coleccion/${c.slug}`, body, og: c.cover || '/img/og.jpg', current: 'fotografia' });
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
out('trabajos.html', trabajosPage());
out('redes.html', redesPage());
out('marca-personal.html', marcaPage());
projects.forEach((p, i) => out(`proyecto/${p.slug}.html`, projectPage(p, i)));
collections.filter((c) => c.photos.length).forEach((c) => out(`coleccion/${c.slug}.html`, collectionPage(c)));
out('404.html', notFound());
out('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>/</loc><priority>1.0</priority></url>
  <url><loc>/trabajos</loc><priority>0.9</priority></url>
  <url><loc>/redes</loc><priority>0.8</priority></url>
  <url><loc>/marca-personal</loc><priority>0.8</priority></url>
${projects.map((p) => `  <url><loc>/proyecto/${p.slug}</loc><priority>0.7</priority></url>`).join('\n')}
${collections.filter((c) => c.photos.length).map((c) => `  <url><loc>/coleccion/${c.slug}</loc><priority>0.6</priority></url>`).join('\n')}
</urlset>
`);

const drafts = PROJECTS.filter((p) => p.draft).map((p) => p.slug);
const reelDrafts = REELS.filter((r) => r.draft).map((r) => r.client);
console.log(`ok · ${projects.length} proyectos · ${reels.length} piezas de redes · ${artistFrames.length} fotogramas del loop · ${collections.filter((c) => c.photos.length).length}/${collections.length} colecciones con fotos`);
if (drafts.length) console.log(`  borradores sin publicar: ${drafts.join(', ')}`);
if (reelDrafts.length) console.log(`  piezas de redes sin enlace: ${reelDrafts.join(', ')}`);
