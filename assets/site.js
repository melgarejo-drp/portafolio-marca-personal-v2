/* Simón Melgarejo — marca personal v2 · sala de montaje */
(function () {
  'use strict';
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var fine = window.matchMedia('(hover:hover) and (pointer:fine)').matches;

  /* ---------- cursor: cruz de encuadre ---------- */
  if (fine && !reduced) {
    var cur = document.createElement('div');
    cur.className = 'cursor';
    cur.innerHTML = '<i class="h"></i><i class="v"></i><span class="ring"></span><span class="lbl"></span>';
    document.body.appendChild(cur);
    document.body.classList.add('has-cursor');
    var lbl = cur.querySelector('.lbl');
    var cx = 0, cy = 0, rx = 0, ry = 0, raf = null;

    document.addEventListener('mousemove', function (e) {
      cx = e.clientX; cy = e.clientY;
      cur.classList.add('on');
      if (!raf) raf = requestAnimationFrame(follow);
    });
    function follow() {
      rx += (cx - rx) * 0.3; ry += (cy - ry) * 0.3;
      cur.style.transform = 'translate(' + rx + 'px,' + ry + 'px) translate(-50%,-50%)';
      raf = requestAnimationFrame(follow);
    }
    document.addEventListener('mouseover', function (e) {
      var t = e.target;
      var track = t.closest('.tl-track');
      var link = t.closest('a,button,input,textarea,[role="button"]');
      cur.classList.toggle('scrub', !!track && !link);
      cur.classList.toggle('link', !!link);
      if (track && !link) lbl.textContent = 'arrastrar';
      else if (t.closest('.clip')) lbl.textContent = 'abrir';
      else lbl.textContent = '';
    });
    document.addEventListener('mouseleave', function () { cur.classList.remove('on'); });
  }

  /* ---------- timecode 24fps ---------- */
  var tc = document.querySelector('[data-tc]');
  if (tc) {
    if (reduced) tc.textContent = '00:00:00:00';
    else {
      var t0 = performance.now();
      var pad = function (n) { return String(n).padStart(2, '0'); };
      (function tick() {
        var f = Math.floor((performance.now() - t0) / 1000 * 24);
        tc.textContent = pad(Math.floor(f / 24 / 60 / 60)) + ':' + pad(Math.floor(f / 24 / 60) % 60) +
                         ':' + pad(Math.floor(f / 24) % 60) + ':' + pad(f % 24);
        requestAnimationFrame(tick);
      })();
    }
  }

  /* ---------- boot log ---------- */
  var boot = document.querySelector('[data-boot]');
  if (boot) {
    var lines = (boot.getAttribute('data-boot') || '').split('|');
    if (reduced) {
      boot.innerHTML = lines.map(function (l, i) {
        return '<div' + (i === lines.length - 1 ? ' class="ok"' : '') + '>' + l + '</div>';
      }).join('');
    } else {
      var li = 0;
      (function typeLine() {
        if (li >= lines.length) return;
        var el = document.createElement('div');
        if (li === lines.length - 1) el.className = 'ok';
        boot.appendChild(el);
        var chars = lines[li].split(''), ci = 0;
        var iv = setInterval(function () {
          el.textContent += chars[ci++];
          if (ci >= chars.length) { clearInterval(iv); li++; setTimeout(typeLine, 200); }
        }, 24);
      })();
    }
  }

  /* ---------- claqueta: golpe al hacer clic ---------- */
  document.querySelectorAll('.clapper').forEach(function (c) {
    c.addEventListener('click', function () {
      c.classList.remove('snap');
      void c.offsetWidth;
      c.classList.add('snap');
    });
  });

  /* ---------- línea de tiempo ---------- */
  var track = document.querySelector('[data-track]');
  if (track) {
    var clips = Array.prototype.slice.call(track.querySelectorAll('.clip'));

    // arrastrar para desplazar (escritorio)
    var down = false, startX = 0, startScroll = 0, moved = 0;
    track.addEventListener('pointerdown', function (e) {
      if (e.pointerType !== 'mouse') return;
      down = true; moved = 0;
      startX = e.clientX; startScroll = track.scrollLeft;
    });
    window.addEventListener('pointermove', function (e) {
      if (!down) return;
      var dx = e.clientX - startX;
      moved = Math.abs(dx);
      if (moved > 3) track.scrollLeft = startScroll - dx;
    });
    window.addEventListener('pointerup', function () {
      if (down && moved > 6) {
        // evita abrir el clip si el gesto fue un arrastre
        var kill = function (ev) { ev.preventDefault(); ev.stopPropagation(); };
        track.addEventListener('click', kill, { capture: true, once: true });
        setTimeout(function () { track.removeEventListener('click', kill, true); }, 80);
      }
      down = false;
    });

    // el clip bajo el cabezal queda "cargado"
    var cue = function () {
      var mid = track.getBoundingClientRect().left + track.clientWidth / 2;
      var best = null, bestD = Infinity;
      clips.forEach(function (c) {
        if (c.hidden) return;
        var r = c.getBoundingClientRect();
        var d = Math.abs(r.left + r.width / 2 - mid);
        if (d < bestD) { bestD = d; best = c; }
      });
      clips.forEach(function (c) { c.classList.toggle('cued', c === best); });
    };
    track.addEventListener('scroll', function () {
      window.requestAnimationFrame(cue);
    }, { passive: true });
    cue();

    // teclado: flechas mueven la pista
    track.setAttribute('tabindex', '0');
    track.setAttribute('role', 'region');
    track.setAttribute('aria-label', 'Línea de tiempo de proyectos, desplazable');
    track.addEventListener('keydown', function (e) {
      var step = track.clientWidth * 0.7;
      if (e.key === 'ArrowRight') { track.scrollBy({ left: step, behavior: reduced ? 'auto' : 'smooth' }); e.preventDefault(); }
      if (e.key === 'ArrowLeft') { track.scrollBy({ left: -step, behavior: reduced ? 'auto' : 'smooth' }); e.preventDefault(); }
    });
  }

  /* ---------- filtros del archivo ---------- */
  var fbar = document.querySelector('[data-filters]');
  if (fbar) {
    var items = Array.prototype.slice.call(document.querySelectorAll('[data-year]'));
    var counter = document.querySelector('[data-count]');
    var empty = document.querySelector('[data-empty]');
    var active = { year: 'all', role: 'all' };

    var qs = new URLSearchParams(window.location.search);
    [['role', 'rol'], ['year', 'anio']].forEach(function (p) {
      var val = qs.get(p[1]);
      if (!val) return;
      var chip = fbar.querySelector('.chip[data-group="' + p[0] + '"][data-value="' + val + '"]');
      if (!chip) return;
      active[p[0]] = val;
      fbar.querySelectorAll('.chip[data-group="' + p[0] + '"]').forEach(function (c) {
        c.setAttribute('aria-pressed', String(c === chip));
      });
    });

    function apply() {
      var shown = 0;
      items.forEach(function (c) {
        var okY = active.year === 'all' || c.getAttribute('data-year') === active.year;
        var okR = active.role === 'all' || (c.getAttribute('data-roles') || '').indexOf(active.role) !== -1;
        var ok = okY && okR;
        c.hidden = !ok;
        if (ok) shown++;
      });
      if (counter) counter.innerHTML = '<b>' + shown + '</b> de ' + items.length + ' proyectos en la pista';
      if (empty) empty.hidden = shown !== 0;
      if (track) track.scrollLeft = 0;
    }
    fbar.addEventListener('click', function (e) {
      var chip = e.target.closest('.chip');
      if (!chip) return;
      var group = chip.getAttribute('data-group');
      active[group] = chip.getAttribute('data-value');
      fbar.querySelectorAll('.chip[data-group="' + group + '"]').forEach(function (c) {
        c.setAttribute('aria-pressed', String(c === chip));
      });
      apply();
    });
    apply();
  }

  /* ---------- modal del reel ---------- */
  var modal = document.getElementById('reel-modal');
  if (modal) {
    var iframe = modal.querySelector('iframe');
    var src = iframe ? iframe.getAttribute('data-src') : null;
    var lastFocus = null;
    function openModal() {
      lastFocus = document.activeElement;
      if (iframe && src && !iframe.src) iframe.src = src;
      modal.classList.add('open');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      var x = modal.querySelector('.x'); if (x) x.focus();
    }
    function closeModal() {
      modal.classList.remove('open');
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      if (iframe) iframe.src = '';
      if (lastFocus) lastFocus.focus();
    }
    document.querySelectorAll('[data-reel]').forEach(function (b) {
      b.addEventListener('click', function (e) { e.preventDefault(); openModal(); });
    });
    modal.querySelectorAll('[data-close]').forEach(function (b) { b.addEventListener('click', closeModal); });
    modal.addEventListener('click', function (e) { if (e.target === modal) closeModal(); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && modal.classList.contains('open')) closeModal();
    });
  }

  /* ---------- toggle raw / colorizado ---------- */
  var stage = document.querySelector('[data-stage]');
  if (stage) {
    var glabel = stage.querySelector('[data-grade-label]');
    stage.querySelectorAll('[data-grade]').forEach(function (b) {
      b.addEventListener('click', function () {
        var mode = b.getAttribute('data-grade');
        stage.classList.toggle('raw', mode === 'raw');
        stage.classList.toggle('graded', mode === 'graded');
        stage.querySelectorAll('[data-grade]').forEach(function (o) {
          o.setAttribute('aria-pressed', String(o === b));
        });
        if (glabel) glabel.textContent = mode === 'raw' ? 'Raw v-log' : 'Colorizado';
      });
    });
  }

  /* ---------- formulario ---------- */
  var form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = form.elements.nombre.value.trim();
      var mail = form.elements.correo.value.trim();
      var msg = form.elements.mensaje.value.trim();
      var to = ['melgarejorodriguez19', 'gmail.com'].join('@');
      window.location.href = 'mailto:' + to +
        '?subject=' + encodeURIComponent('Nuevo proyecto — ' + (name || 'contacto desde el portafolio')) +
        '&body=' + encodeURIComponent(msg + '\n\n— ' + name + ' (' + mail + ')');
      var st = form.querySelector('[data-status]');
      if (st) st.textContent = 'Abriendo tu cliente de correo…';
    });
  }

  /* ---------- enlace activo por sección ---------- */
  var spy = document.querySelectorAll('[data-spy]');
  if (spy.length && 'IntersectionObserver' in window) {
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        spy.forEach(function (a) {
          a.classList.toggle('active', a.getAttribute('href') === '#' + en.target.id);
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    spy.forEach(function (a) {
      var el = document.getElementById(a.getAttribute('href').slice(1));
      if (el) obs.observe(el);
    });
  }
})();
