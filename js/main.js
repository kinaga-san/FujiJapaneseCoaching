/* =========================================================
   FUJI JAPANESE COACHING — main.js
   Shared header/footer, page transitions, sounds (Web Audio,
   no audio files needed), sakura, reveal, counters, tilt,
   hanabi fireworks, events tabs/filters/modal, reels.
   ========================================================= */
(() => {
  'use strict';
  const FORM = 'https://docs.google.com/forms/d/e/1FAIpQLSfliyLvwOg9tHByiZltqmypr33xbGVwbjqziv8R7DSxpZICjg/viewform?usp=sf_link';
  const page = document.body.dataset.page || 'home';
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  /* ---------- SOUND ENGINE (synth: koto / taiko / bell) ---------- */
  let ctx, soundOn = (() => { try { return localStorage.getItem('fujiSound') !== 'off'; } catch (e) { return true; } })();
  const scale = [293.66, 329.63, 349.23, 440, 466.16, 587.33, 659.25]; // miyako-bushi-ish
  const ac = () => { if (!ctx) { try { ctx = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) {} } if (ctx && ctx.state === 'suspended') ctx.resume(); return ctx; };
  function pluck(freq, vol = .18, dur = 1.1) {
    if (!soundOn || !ac()) return;
    const t = ctx.currentTime, o = ctx.createOscillator(), o2 = ctx.createOscillator(), g = ctx.createGain(), f = ctx.createBiquadFilter();
    o.type = 'triangle'; o2.type = 'sine'; o.frequency.value = freq; o2.frequency.value = freq * 2.01;
    f.type = 'lowpass'; f.frequency.setValueAtTime(3500, t); f.frequency.exponentialRampToValueAtTime(500, t + dur);
    g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(vol, t + .008); g.gain.exponentialRampToValueAtTime(.0008, t + dur);
    o.connect(f); o2.connect(f); f.connect(g); g.connect(ctx.destination);
    o.start(t); o2.start(t); o.stop(t + dur); o2.stop(t + dur);
  }
  function taiko(vol = .5) {
    if (!soundOn || !ac()) return;
    const t = ctx.currentTime, o = ctx.createOscillator(), g = ctx.createGain();
    o.frequency.setValueAtTime(150, t); o.frequency.exponentialRampToValueAtTime(42, t + .35);
    g.gain.setValueAtTime(vol, t); g.gain.exponentialRampToValueAtTime(.001, t + .5);
    o.connect(g); g.connect(ctx.destination); o.start(t); o.stop(t + .55);
  }
  function boom() {
    if (!soundOn || !ac()) return;
    const t = ctx.currentTime, len = ctx.sampleRate * .6, b = ctx.createBuffer(1, len, ctx.sampleRate), d = b.getChannelData(0);
    for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 3);
    const s = ctx.createBufferSource(), g = ctx.createGain(), f = ctx.createBiquadFilter();
    f.type = 'lowpass'; f.frequency.value = 900; g.gain.value = .35; s.buffer = b; s.connect(f); f.connect(g); g.connect(ctx.destination); s.start(t);
  }
  function bell() { pluck(880, .1, 1.6); setTimeout(() => pluck(1320, .06, 1.6), 90); }
  const rnd = () => scale[Math.floor(Math.random() * scale.length)];
  window.FujiSound = { pluck, taiko, boom, bell, rnd };

  /* ---------- SHARED HEADER / FOOTER ---------- */
  const nav = [['index.html', 'home', 'Fuji', '富士'], ['about.html', 'about', 'About', '概要'], ['events.html', 'events', 'Events', '行事'], ['sensei.html', 'sensei', 'Sensei', '先生']];
  const header = document.createElement('header');
  header.className = 'site';
  header.innerHTML = `<div class="container navbar">
    <a href="index.html" class="logo"><img src="images/logo.png" alt="Fuji logo"><span>富士日本語</span></a>
    <nav class="nav-links" id="navLinks">
      ${nav.map(n => `<a class="nav ${n[1] === page ? 'active' : ''}" href="${n[0]}">${n[2]}<small>${n[3]}</small></a>`).join('')}
      <a class="btn sm" href="${FORM}" target="_blank" rel="noopener"><span>Book a lesson</span></a>
      <button class="sound-toggle" id="soundBtn" aria-label="Toggle sound"><i class="fas ${soundOn ? 'fa-volume-high' : 'fa-volume-xmark'}"></i></button>
    </nav>
    <button class="menu-btn" id="menuBtn" aria-label="Menu">☰</button></div>`;
  document.body.prepend(header);

  const footer = document.createElement('footer');
  footer.className = 'site';
  footer.innerHTML = `<div class="container foot">
    <div class="hanko">富士</div>
    <div><h3>Fuji Japanese Coaching</h3><p>Learning Japanese with precision, culture, and passion.</p></div>
    <div class="social">
      <a href="https://www.facebook.com/share/18FfwqDDXB/" target="_blank" rel="noopener" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a>
      <a href="https://www.instagram.com/fuji.forjapanesecoaching?igsh=aGVtMzJmOGIxbjli" target="_blank" rel="noopener" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
      <a href="https://wa.me/2130797305798" target="_blank" rel="noopener" aria-label="WhatsApp"><i class="fab fa-whatsapp"></i></a>
      <a href="https://t.me/%2Bd2MMLCcc-bA4NTU0" target="_blank" rel="noopener" aria-label="Telegram"><i class="fab fa-telegram"></i></a>
    </div>
    <p>© 2026 Fuji Japanese Coaching. All rights reserved. Full legal ownership and intellectual property belong to the author.</p></div>`;
  document.body.appendChild(footer);

  // progress + curtain + sakura canvas
  document.body.insertAdjacentHTML('afterbegin', `<div id="progress"></div><div id="curtain"><span>富士</span></div><canvas id="sakura"></canvas>`);
  requestAnimationFrame(() => setTimeout(() => document.body.classList.add('ready'), 250));
  addEventListener('pageshow', e => { if (e.persisted) document.body.classList.remove('leaving'); });

  const bar = $('#progress');
  const onScroll = () => {
    header.classList.toggle('scrolled', scrollY > 40);
    const h = document.documentElement.scrollHeight - innerHeight;
    bar.style.width = (h > 0 ? scrollY / h * 100 : 0) + '%';
    $$('.parallax').forEach(el => el.style.transform = `translateY(${scrollY * (+el.dataset.speed || .2)}px)`);
  };
  addEventListener('scroll', onScroll, { passive: true }); onScroll();

  // menu
  const menuBtn = $('#menuBtn'), navLinks = $('#navLinks');
  menuBtn.addEventListener('click', () => {
    const open = navLinks.classList.toggle('active');
    menuBtn.textContent = open ? '✕' : '☰'; menuBtn.classList.toggle('open', open);
  });
  // sound toggle
  $('#soundBtn').addEventListener('click', e => {
    soundOn = !soundOn; try { localStorage.setItem('fujiSound', soundOn ? 'on' : 'off'); } catch (er) {}
    e.currentTarget.innerHTML = `<i class="fas ${soundOn ? 'fa-volume-high' : 'fa-volume-xmark'}"></i>`;
    if (soundOn) { ac(); bell(); }
  });

  // page transitions (internal links only)
  document.addEventListener('click', e => {
    const a = e.target.closest('a[href]'); if (!a) return;
    const href = a.getAttribute('href');
    if (a.target === '_blank' || /^(https?:|mailto:|tel:|#|javascript:)/.test(href) || a.hasAttribute('download')) return;
    if (e.metaKey || e.ctrlKey || e.shiftKey) return;
    e.preventDefault(); taiko(.4);
    document.body.classList.add('leaving');
    setTimeout(() => location.href = href, reduce ? 0 : 650);
  });

  // click ripple + click sound on interactive things
  document.addEventListener('pointerdown', e => {
    ac();
    const r = document.createElement('div'); r.className = 'ripple';
    r.style.cssText = `left:${e.clientX}px;top:${e.clientY}px;width:200px;height:200px`;
    document.body.appendChild(r); setTimeout(() => r.remove(), 800);
    const t = e.target.closest('a,button,.card,.ws,.tab,.chip,.stat,.project,video');
    if (t) pluck(rnd(), .16);
  });
  document.addEventListener('pointerover', e => {
    const t = e.target.closest('.nav,.btn,.social a');
    if (t && t !== document._lastHover) { document._lastHover = t; pluck(rnd() * 2, .04, .5); }
  });

  /* ---------- SAKURA PETALS ---------- */
  (() => {
    const c = $('#sakura'); if (!c || reduce) return;
    const g = c.getContext('2d'); let W, H, petals = [];
    const size = () => { W = c.width = innerWidth; H = c.height = innerHeight; }; size(); addEventListener('resize', size);
    const make = (top) => ({ x: Math.random() * W, y: top ? -20 : Math.random() * H, s: 5 + Math.random() * 8, vy: .5 + Math.random() * 1, vx: -.3 + Math.random() * .8, r: Math.random() * 6, vr: (Math.random() - .5) * .03, sw: Math.random() * 6, a: .35 + Math.random() * .4 });
    for (let i = 0; i < (innerWidth < 700 ? 14 : 30); i++) petals.push(make(false));
    let mx = 0; addEventListener('pointermove', e => mx = (e.clientX / W - .5) * 1.5);
    (function loop() {
      g.clearRect(0, 0, W, H);
      petals.forEach((p, i) => {
        p.y += p.vy; p.sw += .02; p.x += p.vx + Math.sin(p.sw) * .6 + mx; p.r += p.vr;
        g.save(); g.translate(p.x, p.y); g.rotate(p.r); g.globalAlpha = p.a;
        g.fillStyle = '#f3a8b5'; g.beginPath(); g.moveTo(0, 0);
        g.bezierCurveTo(p.s, -p.s, p.s * 1.6, p.s * .6, 0, p.s * 1.3);
        g.bezierCurveTo(-p.s * 1.6, p.s * .6, -p.s, -p.s, 0, 0); g.fill(); g.restore();
        if (p.y > H + 20 || p.x > W + 40 || p.x < -40) petals[i] = make(true);
      });
      requestAnimationFrame(loop);
    })();
  })();

  /* ---------- REVEAL + COUNTERS + TILT ---------- */
  const io = new IntersectionObserver((es, o) => es.forEach(en => {
    if (!en.isIntersecting) return;
    en.target.classList.add('show'); o.unobserve(en.target);
    $$('.counter', en.target).forEach(count);
    if (en.target.classList.contains('counter')) count(en.target);
  }), { threshold: .15, rootMargin: '0px 0px -40px 0px' });
  $$('.reveal,.counter').forEach(el => io.observe(el));
  function count(el) {
    if (el.dataset.done) return; el.dataset.done = 1;
    const target = +el.dataset.target, t0 = performance.now(), dur = 1800;
    (function tick(n) { const p = Math.min((n - t0) / dur, 1); el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3))); if (p < 1) requestAnimationFrame(tick); })(t0);
  }
  if (!reduce && matchMedia('(hover:hover)').matches) {
    $$('[data-tilt]').forEach(el => {
      el.addEventListener('pointermove', e => {
        const r = el.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
        el.style.transform = `perspective(900px) rotateY(${x * 12}deg) rotateX(${-y * 12}deg) translateY(-8px)`;
      });
      el.addEventListener('pointerleave', () => el.style.transform = '');
    });
  }

  /* ---------- HERO: typer + mountain parallax ---------- */
  const typer = $('.typer');
  if (typer) {
    const lines = JSON.parse(typer.dataset.lines); let li = 0, ci = 0, del = false;
    (function type() {
      const s = lines[li]; typer.textContent = s.slice(0, ci);
      if (!del && ci++ === s.length) { del = true; return setTimeout(type, 1800); }
      if (del && --ci < 0) { del = false; ci = 0; li = (li + 1) % lines.length; }
      setTimeout(type, del ? 22 : 48);
    })();
  }
  const layers = $$('.hero-fuji .layer');
  if (layers.length && !reduce) {
    addEventListener('pointermove', e => { const x = e.clientX / innerWidth - .5; layers.forEach((l, i) => l.style.transform = `translateX(${x * (i + 1) * -14}px)`); });
  }

  /* ---------- HANABI (fireworks) ---------- */
  function hanabi(canvas, auto) {
    if (!canvas) return; const g = canvas.getContext('2d'); let W, H, rockets = [], sparks = [];
    const fit = () => { const r = canvas.parentElement.getBoundingClientRect(); W = canvas.width = r.width; H = canvas.height = r.height; }; fit(); addEventListener('resize', fit);
    const launch = (x) => rockets.push({ x: x ?? W * (.15 + Math.random() * .7), y: H, ty: H * (.12 + Math.random() * .4), c: Math.floor(Math.random() * 360) });
    function burst(x, y, hue) {
      boom(); const n = 70;
      for (let i = 0; i < n; i++) { const a = Math.PI * 2 * i / n, v = 1.5 + Math.random() * 3.5; sparks.push({ x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v, l: 1, h: hue + Math.random() * 40 }); }
    }
    (function loop() {
      g.globalCompositeOperation = 'destination-out'; g.fillStyle = 'rgba(0,0,0,.18)'; g.fillRect(0, 0, W, H); g.globalCompositeOperation = 'lighter';
      rockets.forEach((r, i) => { r.y -= 7; g.fillStyle = `hsl(${r.c},100%,70%)`; g.fillRect(r.x, r.y, 3, 10); if (r.y <= r.ty) { burst(r.x, r.y, r.c); rockets.splice(i, 1); } });
      sparks.forEach((s, i) => { s.x += s.vx; s.y += s.vy; s.vy += .04; s.vx *= .985; s.l -= .012; g.fillStyle = `hsla(${s.h},100%,65%,${s.l})`; g.beginPath(); g.arc(s.x, s.y, 2, 0, 7); g.fill(); if (s.l <= 0) sparks.splice(i, 1); });
      requestAnimationFrame(loop);
    })();
    if (auto && !reduce) setInterval(() => { if (!document.hidden && rockets.length < 2) launch(); }, 2600);
    return { launch, show: (n = 5) => { for (let i = 0; i < n; i++) setTimeout(launch, i * 350); } };
  }
  const hb = hanabi($('.hanabi'), true);
  $$('[data-hanabi]').forEach(b => b.addEventListener('click', () => { if (hb) { hb.show(6); taiko(.7); } }));

  /* ---------- HOME: teacher modal ---------- */
  const openers = $$('[data-open]');
  const closeAll = () => $$('.modal').forEach(m => m.classList.remove('open'));
  openers.forEach(o => o.addEventListener('click', e => { e.preventDefault(); $('#' + o.dataset.open).classList.add('open'); bell(); }));
  document.addEventListener('click', e => { if (e.target.classList.contains('modal') || e.target.closest('.modal-x')) closeAll(); });
  addEventListener('keydown', e => { if (e.key === 'Escape') closeAll(); });

  /* ---------- EVENTS PAGE ---------- */
  $$('.tab').forEach(t => t.addEventListener('click', () => {
    $$('.tab').forEach(x => x.classList.toggle('active', x === t));
    $$('.day-panel').forEach(p => p.classList.toggle('active', p.id === t.dataset.day));
    taiko(.5);
  }));
  $$('.chip').forEach(c => c.addEventListener('click', () => {
    $$('.chip').forEach(x => x.classList.toggle('active', x === c));
    $$('.ws').forEach(w => w.classList.toggle('hidden', c.dataset.f !== 'all' && !w.dataset.tags.split(' ').includes(c.dataset.f)));
  }));
  const wsModal = $('#wsModal');
  $$('.ws').forEach(w => w.addEventListener('click', () => {
    if (!wsModal) return;
    $('#mTitle').textContent = $('h3', w).textContent;
    $('#mJp').textContent = $('.jp', w).textContent;
    $('#mDesc').textContent = w.dataset.long;
    $('#mList').innerHTML = w.dataset.points.split('|').map(p => `<li>${p}</li>`).join('');
    const img = $('img', w), mph = $('#mImg'); mph.innerHTML = `<div class="fb">${w.dataset.kanji}</div>`;
    if (img && img.style.display !== 'none') { const i2 = img.cloneNode(); i2.style.display = ''; mph.appendChild(i2); }
    wsModal.classList.add('open'); bell();
  }));
  // image fallbacks (hide broken photo, keep kanji tile)
  $$('.ph img').forEach(i => i.addEventListener('error', () => i.style.display = 'none'));

  /* ---------- ABOUT: reels ---------- */
  const vids = $$('.reels video');
  vids.forEach((v, i) => {
    v.muted = true; v.playsInline = true; v.preload = 'metadata';
    v.addEventListener('click', () => {
      const wasPlaying = !v.paused;
      vids.forEach(x => { x.pause(); x.classList.remove('playing'); });
      if (!wasPlaying) { v.muted = false; v.play(); v.classList.add('playing'); }
    });
    v.addEventListener('ended', () => { v.classList.remove('playing'); const n = vids[i + 1]; if (n) { n.muted = false; n.play(); n.classList.add('playing'); n.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' }); } });
  });

  /* ---------- SENSEI voice ---------- */
  const vb = $('#voiceBtn'), au = $('#voiceAudio');
  if (vb && au) {
    vb.addEventListener('click', () => { if (au.paused) { au.play(); vb.classList.add('on'); } else { au.pause(); vb.classList.remove('on'); } });
    au.addEventListener('ended', () => vb.classList.remove('on'));
  }
})();
