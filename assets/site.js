/* Simón Melgarejo — portafolio v3 */
(function () {
  'use strict';
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var canHover = window.matchMedia('(hover:hover) and (pointer:fine)').matches;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  /* ---------- navegación: fondo al hacer scroll, se esconde al bajar ---------- */
  var nav = $('[data-nav]');
  var lastY = window.scrollY;
  function onScroll() {
    var y = window.scrollY;
    nav.classList.toggle('scrolled', y > 20);
    var menuOpen = document.body.classList.contains('menu-open');
    nav.classList.toggle('hide', !menuOpen && y > 400 && y > lastY + 4);
    if (y < lastY - 4 || y < 400) nav.classList.remove('hide');
    lastY = y;
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- menú móvil ---------- */
  var mbtn = $('[data-menu-btn]'), menu = $('[data-menu]');
  function setMenu(open) {
    mbtn.setAttribute('aria-expanded', String(open));
    document.body.classList.toggle('menu-open', open);
    if (open) { menu.hidden = false; requestAnimationFrame(function () { menu.classList.add('open'); }); }
    else { menu.classList.remove('open'); setTimeout(function () { if (!menu.classList.contains('open')) menu.hidden = true; }, reduced ? 0 : 700); }
    document.documentElement.style.overflow = open ? 'hidden' : '';
  }
  mbtn.addEventListener('click', function () { setMenu(mbtn.getAttribute('aria-expanded') !== 'true'); });
  $$('a', menu).forEach(function (a) { a.addEventListener('click', function () { setMenu(false); }); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && document.body.classList.contains('menu-open')) setMenu(false); });

  /* ---------- enlace activo por sección ---------- */
  var links = $$('.nav-links a');
  if (links.length && 'IntersectionObserver' in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        links.forEach(function (a) { a.classList.toggle('active', a.hash === '#' + en.target.id); });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    links.forEach(function (a) { var t = a.hash && document.getElementById(a.hash.slice(1)); if (t) spy.observe(t); });
  }

  /* ---------- reloj local (Colombia) ---------- */
  var clock = $('[data-clock]');
  if (clock) {
    var fmt = function () {
      try { clock.textContent = new Date().toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'America/Bogota' }); }
      catch (e) { clock.textContent = ''; }
    };
    fmt(); setInterval(fmt, 15000);
  }

  /* ---------- aparición al hacer scroll ---------- */
  var reveals = $$('.reveal');
  if ('IntersectionObserver' in window && !reduced) {
    var ro = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('in'); ro.unobserve(en.target); } });
    }, { rootMargin: '0px 0px -8% 0px' });
    reveals.forEach(function (el) { ro.observe(el); });
  } else reveals.forEach(function (el) { el.classList.add('in'); });

  /* ---------- hero: estela de imágenes que sigue al cursor ---------- */
  var hero = $('[data-trail]');
  if (hero && !reduced) {
    var srcs = [];
    try { srcs = JSON.parse(hero.getAttribute('data-trail')) || []; } catch (e) {}
    if (srcs.length) {
      var POOL = 9, pool = [], k = 0, last = null, z = 1;
      srcs.forEach(function (s) { var i = new Image(); i.src = s; }); // precarga
      for (var i = 0; i < POOL; i++) {
        var img = document.createElement('img');
        img.className = 'trail-img'; img.alt = ''; img.setAttribute('aria-hidden', 'true'); img.style.opacity = '0';
        hero.appendChild(img); pool.push(img);
      }
      var spawn = function (x, y) {
        var el = pool[k % POOL], src = srcs[k % srcs.length]; k++;
        el.src = src;
        el.style.zIndex = String(++z);
        var w = el.offsetWidth || 220, h = w * 0.75;
        var rot = (Math.random() - 0.5) * 10;
        el.getAnimations().forEach(function (a) { a.cancel(); });
        el.animate([
          { opacity: 0, transform: 'translate(' + (x - w / 2) + 'px,' + (y - h / 2) + 'px) scale(.6) rotate(' + rot + 'deg)' },
          { opacity: 1, transform: 'translate(' + (x - w / 2) + 'px,' + (y - h / 2) + 'px) scale(1) rotate(' + rot + 'deg)', offset: 0.18 },
          { opacity: 1, transform: 'translate(' + (x - w / 2) + 'px,' + (y - h / 2 + 10) + 'px) scale(1) rotate(' + rot + 'deg)', offset: 0.7 },
          { opacity: 0, transform: 'translate(' + (x - w / 2) + 'px,' + (y - h / 2 + 30) + 'px) scale(.92) rotate(' + rot + 'deg)' }
        ], { duration: 1100, easing: 'cubic-bezier(.22,1,.36,1)', fill: 'forwards' });
      };
      var move = function (cx, cy) {
        var r = hero.getBoundingClientRect(), x = cx - r.left, y = cy - r.top;
        var gap = Math.max(70, r.width / 14);
        if (!last || Math.hypot(x - last.x, y - last.y) > gap) { spawn(x, y); last = { x: x, y: y }; }
      };
      hero.addEventListener('pointermove', function (e) { if (e.pointerType === 'mouse') move(e.clientX, e.clientY); });
      hero.addEventListener('touchmove', function (e) { var t = e.touches[0]; if (t) move(t.clientX, t.clientY); }, { passive: true });
      hero.addEventListener('pointerleave', function () { last = null; });
    }
  }

  /* ---------- revelado con blob (imagen a color desde el cursor) ---------- */
  if (canHover) {
    $$('[data-blob]').forEach(function (m) {
      var host = m.closest('a') || m;
      var setPos = function (e) {
        var r = m.getBoundingClientRect();
        m.style.setProperty('--x', (e.clientX - r.left) + 'px');
        m.style.setProperty('--y', (e.clientY - r.top) + 'px');
      };
      host.addEventListener('pointerenter', function (e) { setPos(e); m.classList.add('on'); });
      host.addEventListener('pointermove', setPos);
      host.addEventListener('pointerleave', function (e) { setPos(e); m.classList.remove('on'); });
      host.addEventListener('focus', function () { m.style.setProperty('--x', '50%'); m.style.setProperty('--y', '50%'); m.classList.add('on'); });
      host.addEventListener('blur', function () { m.classList.remove('on'); });
    });
  }

  /* ---------- pistas desplazables (línea de tiempo del inicio y sala de montaje) ---------- */
  var behavior = reduced ? 'auto' : 'smooth';
  function dragScroll(el) {
    var down = false, sx = 0, ss = 0, moved = 0;
    el.addEventListener('pointerdown', function (e) {
      if (e.pointerType !== 'mouse' || e.button !== 0) return;
      down = true; moved = 0; sx = e.clientX; ss = el.scrollLeft;
    });
    window.addEventListener('pointermove', function (e) {
      if (!down) return;
      var dx = e.clientX - sx; moved = Math.max(moved, Math.abs(dx));
      if (moved > 4) { el.classList.add('dragging'); el.scrollLeft = ss - dx; }
    });
    window.addEventListener('pointerup', function () {
      if (!down) return;
      down = false;
      if (moved > 6) {
        var kill = function (ev) { ev.preventDefault(); ev.stopPropagation(); };
        el.addEventListener('click', kill, { capture: true, once: true });
        setTimeout(function () { el.removeEventListener('click', kill, true); }, 60);
      }
      el.classList.remove('dragging');
    });
  }
  function keyScroll(el, label) {
    el.setAttribute('tabindex', '0');
    el.setAttribute('role', 'region');
    el.setAttribute('aria-label', label);
    el.addEventListener('keydown', function (e) {
      var step = el.clientWidth * 0.6;
      if (e.key === 'ArrowRight') { el.scrollBy({ left: step, behavior: behavior }); e.preventDefault(); }
      if (e.key === 'ArrowLeft') { el.scrollBy({ left: -step, behavior: behavior }); e.preventDefault(); }
    });
  }
  // marca como "cargado" el elemento bajo el centro del contenedor (el cabezal)
  function cueTrack(el, items, onCue) {
    var cue = function () {
      var tr = el.getBoundingClientRect(), mid = tr.left + tr.width / 2;
      var best = null, bestD = Infinity;
      items.forEach(function (c) {
        if (c.hidden) return;
        var r = c.getBoundingClientRect(), d = Math.abs(r.left + r.width / 2 - mid);
        if (d < bestD) { bestD = d; best = c; }
      });
      items.forEach(function (c) { c.classList.toggle('cued', c === best); });
      if (onCue) onCue(best);
    };
    var ticking = false;
    el.addEventListener('scroll', function () {
      if (ticking) return; ticking = true;
      requestAnimationFrame(function () { cue(); ticking = false; });
    }, { passive: true });
    window.addEventListener('resize', cue);
    cue();
    return cue;
  }

  /* ---------- línea de tiempo del inicio ---------- */
  var track = $('[data-track]');
  if (track) {
    var clips = $$('.clip', track), seps = $$('.tl-year', track);
    var progress = $('[data-progress]'), now = $('[data-now]');
    dragScroll(track);
    keyScroll(track, 'Línea de tiempo de proyectos, desplazable con las flechas');
    var cue = cueTrack(track, clips, function (best) {
      var max = track.scrollWidth - track.clientWidth;
      if (progress) progress.parentNode.style.setProperty('--p', max > 0 ? (track.scrollLeft / max).toFixed(4) : 1);
      if (now && best) now.textContent = best.getAttribute('data-year');
    });

    // filtros por categoría
    var fbar = $('[data-filters]'), count = $('[data-count]'), empty = $('[data-empty]');
    if (fbar) {
      var apply = function (tag) {
        var shown = 0, yearsShown = {};
        clips.forEach(function (c) {
          var ok = tag === 'all' || (' ' + c.getAttribute('data-tags') + ' ').indexOf(' ' + tag + ' ') !== -1;
          c.hidden = !ok;
          if (ok) { shown++; yearsShown[c.getAttribute('data-year')] = true; }
        });
        seps.forEach(function (s) { s.hidden = !yearsShown[s.getAttribute('data-sep')]; });
        if (count) count.textContent = '(' + String(shown).padStart(2, '0') + ')';
        if (empty) empty.hidden = shown !== 0;
        track.scrollTo({ left: 0, behavior: 'auto' });
        cue();
      };
      fbar.addEventListener('click', function (e) {
        var chip = e.target.closest('.chip'); if (!chip) return;
        $$('.chip', fbar).forEach(function (c) { c.setAttribute('aria-pressed', String(c === chip)); });
        apply(chip.getAttribute('data-tag'));
      });
    }
  }

  /* ---------- sala de montaje (Trabajos) ---------- */
  var nle = $('[data-nle]');
  if (nle) {
    var nclips = $$('.nle-clip', nle), marks = $$('[data-mark]', nle);
    // la regla marca cada año justo donde empieza su primer clip
    var placeMarks = function () {
      var inner = $('.nle-inner', nle), pl = parseFloat(getComputedStyle(inner).paddingLeft) || 0;
      marks.forEach(function (m) {
        var first = nclips.filter(function (c) { return c.getAttribute('data-year') === m.getAttribute('data-mark'); })[0];
        if (first) m.style.left = (first.offsetLeft - pl) + 'px';
      });
    };
    placeMarks();
    window.addEventListener('resize', placeMarks);
    window.addEventListener('load', placeMarks);
    dragScroll(nle);
    keyScroll(nle, 'Sala de montaje: proyectos en orden cronológico, desplazable con las flechas');
    cueTrack(nle, nclips);
  }

  /* ---------- grilla filtrable de Trabajos ---------- */
  var gbar = $('[data-grid-filters]'), grid = $('[data-grid]');
  if (gbar && grid) {
    var cards = $$('.work-card', grid), gcount = $('[data-grid-count]'), gempty = $('[data-grid-empty]');
    gbar.addEventListener('click', function (e) {
      var chip = e.target.closest('.chip'); if (!chip) return;
      var tag = chip.getAttribute('data-tag'), shown = 0;
      $$('.chip', gbar).forEach(function (c) { c.setAttribute('aria-pressed', String(c === chip)); });
      cards.forEach(function (c) {
        var ok = tag === 'all' || (' ' + c.getAttribute('data-tags') + ' ').indexOf(' ' + tag + ' ') !== -1;
        c.hidden = !ok; if (ok) { shown++; c.classList.add('in'); }
      });
      if (gcount) gcount.textContent = '(' + String(shown).padStart(2, '0') + ')';
      if (gempty) gempty.hidden = shown !== 0;
    });
  }

  /* ---------- carrusel de redes ---------- */
  var car = $('[data-carousel-track]');
  if (car) {
    var reels = $$('.reel', car), ccount = $('[data-carousel-count]'), cprog = $('[data-carousel-progress]');
    var active = null;
    var visible = function () { return reels.filter(function (r) { return !r.hidden; }); };
    var update = function () {
      var tr = car.getBoundingClientRect(), mid = tr.left + tr.width / 2, vis = visible();
      var best = null, bestD = Infinity;
      vis.forEach(function (r) {
        var b = r.getBoundingClientRect(), c = b.left + b.width / 2, d = Math.abs(c - mid);
        r.style.setProperty('--k', Math.min(1, d / (b.width * 1.4)).toFixed(3));
        if (d < bestD) { bestD = d; best = r; }
      });
      var idx = vis.indexOf(best);
      if (ccount) ccount.textContent = String(idx + 1).padStart(2, '0') + ' / ' + String(vis.length).padStart(2, '0');
      if (cprog) cprog.parentNode.style.setProperty('--p', vis.length > 1 ? (idx / (vis.length - 1)).toFixed(4) : 1);
      if (best !== active) {
        if (active) { var ov = $('video', active); if (ov) ov.pause(); }
        active = best;
        var v = active && $('video', active);
        if (v && !reduced) { var pr = v.play(); if (pr && pr.catch) pr.catch(function () {}); }
      }
    };
    var tick = false;
    car.addEventListener('scroll', function () {
      if (tick) return; tick = true;
      requestAnimationFrame(function () { update(); tick = false; });
    }, { passive: true });
    window.addEventListener('resize', update);
    // reproducir sólo cuando el carrusel está en pantalla
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (en) {
        en.forEach(function (x) {
          var v = active && $('video', active);
          if (!v) return;
          if (x.isIntersecting && !reduced) { var pr = v.play(); if (pr && pr.catch) pr.catch(function () {}); } else v.pause();
        });
      }, { threshold: 0.35 }).observe(car);
    }
    var go = function (dir) {
      var vis = visible(), i = vis.indexOf(active) + dir;
      i = Math.max(0, Math.min(vis.length - 1, i));
      vis[i].scrollIntoView({ behavior: behavior, inline: 'center', block: 'nearest' });
    };
    $('[data-carousel-prev]').addEventListener('click', function () { go(-1); });
    $('[data-carousel-next]').addEventListener('click', function () { go(1); });
    dragScroll(car);
    car.setAttribute('tabindex', '0');
    car.setAttribute('aria-label', 'Piezas para redes; usa las flechas para avanzar');
    car.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') { go(1); e.preventDefault(); }
      if (e.key === 'ArrowLeft') { go(-1); e.preventDefault(); }
    });
    // un toque en el video activa o silencia el sonido
    reels.forEach(function (r) {
      var v = $('video', r), b = $('[data-sound]', r);
      if (!v || !b) return;
      var toggle = function () {
        v.muted = !v.muted;
        b.setAttribute('aria-pressed', String(!v.muted));
        b.setAttribute('aria-label', v.muted ? 'Activar sonido' : 'Silenciar');
        if (!v.muted) { reels.forEach(function (o) { var ov = $('video', o); if (ov && ov !== v) ov.muted = true; }); var pr = v.play(); if (pr && pr.catch) pr.catch(function () {}); }
      };
      b.addEventListener('click', toggle);
      v.addEventListener('click', toggle);
    });
    // Instagram: carga el embebido al tocar la tarjeta
    $$('[data-ig]', car).forEach(function (a) {
      a.addEventListener('click', function (e) {
        if (a.closest('.reel') !== active) { e.preventDefault(); a.closest('.reel').scrollIntoView({ behavior: behavior, inline: 'center', block: 'nearest' }); return; }
        e.preventDefault();
        var f = document.createElement('iframe');
        f.src = a.href + 'embed/';
        f.title = a.getAttribute('aria-label') || 'Instagram';
        f.setAttribute('scrolling', 'no');
        a.replaceWith(f);
      });
    });
    // filtros por cliente
    var cbar = $('[data-reel-filters]');
    if (cbar) cbar.addEventListener('click', function (e) {
      var chip = e.target.closest('.chip'); if (!chip) return;
      var c = chip.getAttribute('data-client');
      $$('.chip', cbar).forEach(function (o) { o.setAttribute('aria-pressed', String(o === chip)); });
      reels.forEach(function (r) { r.hidden = c !== 'all' && r.getAttribute('data-client') !== c; });
      if (active) { var ov = $('video', active); if (ov) ov.pause(); }
      active = null;
      car.scrollTo({ left: 0, behavior: 'auto' });
      update();
    });
    update();
  }

  /* ---------- loop del artista (secuencia tipo GIF) ---------- */
  $$('[data-loop]').forEach(function (box) {
    var frames = $$('img', box);
    if (frames.length < 2 || reduced) return;
    var i = 0, timer = null;
    var step = function () {
      frames[i].classList.remove('on');
      i = (i + 1) % frames.length;
      frames[i].classList.add('on');
    };
    var start = function () { if (!timer) timer = setInterval(step, box.classList.contains('large') ? 420 : 320); };
    var stop = function () { clearInterval(timer); timer = null; };
    // en hover acelera, como al hacer scrub
    box.addEventListener('pointerenter', function () { stop(); timer = setInterval(step, 110); });
    box.addEventListener('pointerleave', function () { stop(); start(); });
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (en) { en.forEach(function (x) { if (x.isIntersecting) start(); else stop(); }); }).observe(box);
    } else start();
  });

  /* ---------- modal del reel ---------- */
  var modal = $('[data-modal]');
  if (modal) {
    var frame = $('iframe', modal), lastFocus = null;
    var open = function () {
      lastFocus = document.activeElement;
      frame.src = frame.getAttribute('data-src');
      modal.hidden = false;
      requestAnimationFrame(function () { modal.classList.add('open'); });
      document.documentElement.style.overflow = 'hidden';
      $('[data-close]', modal).focus();
    };
    var close = function () {
      modal.classList.remove('open');
      modal.hidden = true; frame.src = '';
      document.documentElement.style.overflow = '';
      if (lastFocus) lastFocus.focus();
    };
    $$('[data-reel]').forEach(function (b) { b.addEventListener('click', open); });
    $('[data-close]', modal).addEventListener('click', close);
    modal.addEventListener('click', function (e) { if (e.target === modal) close(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !modal.hidden) close(); });
  }

  /* ---------- YouTube ligero: carga el iframe sólo al hacer clic ---------- */
  $$('[data-yt]').forEach(function (b) {
    b.addEventListener('click', function () {
      var f = document.createElement('iframe');
      f.src = 'https://www.youtube-nocookie.com/embed/' + b.getAttribute('data-yt') + '?autoplay=1&rel=0';
      f.title = b.getAttribute('aria-label') || 'Video';
      f.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
      f.allowFullscreen = true;
      b.appendChild(f);
      b.removeAttribute('aria-label');
    }, { once: true });
  });

  /* ---------- un solo video reproduciéndose a la vez ---------- */
  var vids = $$('video');
  vids.forEach(function (v) {
    v.addEventListener('play', function () { vids.forEach(function (o) { if (o !== v) o.pause(); }); });
  });

  /* ---------- galería de colección ---------- */
  var gallery = $('[data-gallery]'), lb = $('[data-lightbox]');
  if (gallery && lb) {
    var items = $$('.m-item', gallery), lbImg = $('img', lb), lbCount = $('[data-lb-count]', lb), idx = 0, prevFocus = null;
    var show = function (i) {
      idx = (i + items.length) % items.length;
      var src = $('img', items[idx]);
      lbImg.src = src.currentSrc || src.src; lbImg.alt = src.alt;
      lbCount.textContent = (idx + 1) + ' / ' + items.length;
    };
    var openLb = function (i) { prevFocus = document.activeElement; show(i); lb.hidden = false; document.documentElement.style.overflow = 'hidden'; $('[data-lb-close]', lb).focus(); };
    var closeLb = function () { lb.hidden = true; document.documentElement.style.overflow = ''; if (prevFocus) prevFocus.focus(); };
    items.forEach(function (b, i) { b.addEventListener('click', function () { openLb(i); }); });
    $('[data-lb-close]', lb).addEventListener('click', closeLb);
    $('[data-lb-prev]', lb).addEventListener('click', function () { show(idx - 1); });
    $('[data-lb-next]', lb).addEventListener('click', function () { show(idx + 1); });
    lb.addEventListener('click', function (e) { if (e.target === lb) closeLb(); });
    document.addEventListener('keydown', function (e) {
      if (lb.hidden) return;
      if (e.key === 'Escape') closeLb();
      if (e.key === 'ArrowLeft') show(idx - 1);
      if (e.key === 'ArrowRight') show(idx + 1);
    });
    var tx = null;
    lb.addEventListener('touchstart', function (e) { tx = e.touches[0].clientX; }, { passive: true });
    lb.addEventListener('touchend', function (e) {
      if (tx === null) return;
      var dx = e.changedTouches[0].clientX - tx; tx = null;
      if (Math.abs(dx) > 50) show(idx + (dx < 0 ? 1 : -1));
    });
  }

  /* ---------- formulario: abre el cliente de correo ---------- */
  var form = $('#contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var st = $('[data-status]', form), ok = true;
      ['nombre', 'correo', 'mensaje'].forEach(function (n) {
        var f = form.elements[n], bad = !f.value.trim() || (f.type === 'email' && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(f.value.trim()));
        f.classList.toggle('invalid', bad); if (bad) ok = false;
      });
      if (!ok) { st.textContent = 'Revisa los campos marcados.'; return; }
      var name = form.elements.nombre.value.trim(), mail = form.elements.correo.value.trim(), msg = form.elements.mensaje.value.trim();
      var to = form.getAttribute('data-to').split('|').join('@');
      window.location.href = 'mailto:' + to +
        '?subject=' + encodeURIComponent('Nuevo proyecto — ' + name) +
        '&body=' + encodeURIComponent(msg + '\n\n— ' + name + ' (' + mail + ')');
      st.textContent = 'Abriendo tu cliente de correo…';
    });
  }
})();
