/* Simón Melgarejo — marca personal v2 · comportamiento compartido */
(function () {
  'use strict';
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var fine = window.matchMedia('(hover:hover) and (pointer:fine)').matches;

  /* ---------- cursor personalizado (solo puntero fino) ---------- */
  if (fine && !reduced) {
    var cur = document.createElement('div');
    cur.className = 'cursor';
    document.body.appendChild(cur);
    document.body.classList.add('has-cursor');
    var cx = 0, cy = 0, rx = 0, ry = 0, raf = null;
    document.addEventListener('mousemove', function (e) {
      cx = e.clientX; cy = e.clientY;
      cur.classList.add('on');
      if (!raf) raf = requestAnimationFrame(follow);
    });
    function follow() {
      rx += (cx - rx) * 0.28; ry += (cy - ry) * 0.28;
      cur.style.transform = 'translate(' + rx + 'px,' + ry + 'px) translate(-50%,-50%)';
      raf = requestAnimationFrame(follow);
    }
    document.addEventListener('mouseover', function (e) {
      var t = e.target;
      var isLink = t.closest('a,button,input,textarea,[role="button"]');
      var isMedia = t.closest('.card,.feat .media,.about .portrait,.p-stage');
      cur.classList.toggle('link', !!isLink);
      cur.classList.toggle('media', !isLink && !!isMedia);
    });
    document.addEventListener('mouseleave', function () { cur.classList.remove('on'); });
  }

  /* ---------- timecode 24fps ---------- */
  var tc = document.querySelector('[data-tc]');
  if (tc) {
    if (reduced) { tc.textContent = '00:00:00:00'; }
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

  /* ---------- filtros del archivo ---------- */
  var fbar = document.querySelector('[data-filters]');
  if (fbar) {
    var cards = Array.prototype.slice.call(document.querySelectorAll('[data-year]'));
    var counter = document.querySelector('[data-count]');
    var empty = document.querySelector('[data-empty]');
    var active = { year: 'all', role: 'all' };

    // permite entrar filtrado desde otra página: /archivo?rol=color&anio=2024
    var qs = new URLSearchParams(window.location.search);
    ['role:rol', 'year:anio'].forEach(function (pair) {
      var group = pair.split(':')[0], param = pair.split(':')[1];
      var val = qs.get(param);
      if (!val) return;
      var chip = fbar.querySelector('.chip[data-group="' + group + '"][data-value="' + val + '"]');
      if (!chip) return;
      active[group] = val;
      fbar.querySelectorAll('.chip[data-group="' + group + '"]').forEach(function (c) {
        c.setAttribute('aria-pressed', String(c === chip));
      });
    });

    function apply() {
      var shown = 0;
      cards.forEach(function (c) {
        var okY = active.year === 'all' || c.getAttribute('data-year') === active.year;
        var okR = active.role === 'all' || (c.getAttribute('data-roles') || '').indexOf(active.role) !== -1;
        var ok = okY && okR;
        c.hidden = !ok;
        if (ok) shown++;
      });
      if (counter) counter.innerHTML = '<b>' + shown + '</b> de ' + cards.length + ' proyectos';
      if (empty) empty.hidden = shown !== 0;
    }
    fbar.addEventListener('click', function (e) {
      var chip = e.target.closest('.chip');
      if (!chip) return;
      var group = chip.getAttribute('data-group');
      var val = chip.getAttribute('data-value');
      active[group] = val;
      fbar.querySelectorAll('.chip[data-group="' + group + '"]').forEach(function (c) {
        c.setAttribute('aria-pressed', String(c === chip));
      });
      apply();
    });
    apply();
  }

  /* ---------- toggle raw / colorizado ---------- */
  var stage = document.querySelector('[data-stage]');
  if (stage) {
    var label = stage.querySelector('[data-grade-label]');
    stage.querySelectorAll('[data-grade]').forEach(function (b) {
      b.addEventListener('click', function () {
        var mode = b.getAttribute('data-grade');
        stage.classList.toggle('raw', mode === 'raw');
        stage.classList.toggle('graded', mode === 'graded');
        stage.querySelectorAll('[data-grade]').forEach(function (o) {
          o.setAttribute('aria-pressed', String(o === b));
        });
        if (label) label.textContent = mode === 'raw' ? 'Raw v-log' : 'Colorizado';
      });
    });
  }

  /* ---------- formulario de contacto ---------- */
  var form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = form.elements.nombre.value.trim();
      var mail = form.elements.correo.value.trim();
      var msg = form.elements.mensaje.value.trim();
      var to = ['melgarejorodriguez19', 'gmail.com'].join('@');
      var subject = encodeURIComponent('Nuevo proyecto — ' + (name || 'contacto desde el portafolio'));
      var body = encodeURIComponent(msg + '\n\n— ' + name + ' (' + mail + ')');
      window.location.href = 'mailto:' + to + '?subject=' + subject + '&body=' + body;
      var st = form.querySelector('[data-status]');
      if (st) st.textContent = 'Abriendo tu cliente de correo…';
    });
  }

  /* ---------- enlace activo según sección visible ---------- */
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
