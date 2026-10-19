'use strict';

document.getElementById('year').textContent = new Date().getFullYear();

(function buildMarquee(){
  const track = document.getElementById('track');
  const items = ['15 y.o. programmer', 'frontend enthusiast', 'open-source lover', 'pixel perfectionist', 'bug hunter'];
  const html = items.map(t => '<span class="chip"><span class="star">✦</span>' + t + '<span class="star">✦</span></span>').join('');
  track.innerHTML = html + html;
})();

(function nav(){
  const el = document.getElementById('nav');
  const links = document.querySelectorAll('.nav a[data-link]');
  const sections = ['home', 'about', 'projects', 'contact']
    .map(id => document.getElementById(id))
    .filter(Boolean);
  function onScroll(){
    el.classList.toggle('show', window.scrollY > 80);
    const y = window.scrollY + window.innerHeight * 0.35;
    let current = 'home';
    sections.forEach(s => { if (s.offsetTop <= y) current = s.id; });
    links.forEach(a => a.classList.toggle('active', a.dataset.link === current));
  }
  window.addEventListener('scroll', onScroll, {passive:true});
  onScroll();
})();

(function reveal(){
  const io = new IntersectionObserver(entries => {
    entries.forEach((e, i) => {
      if (e.isIntersecting){
        setTimeout(() => e.target.classList.add('in'), i * 60);
        io.unobserve(e.target);
      }
    });
  }, {threshold:.12});
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));
})();

(function progress(){
  const p = document.getElementById('progress');
  function update(){
    const h = document.documentElement.scrollHeight - window.innerHeight;
    p.style.width = (h > 0 ? window.scrollY / h * 100 : 0) + '%';
  }
  window.addEventListener('scroll', update, {passive:true});
  update();
})();

(function glow(){
  const g = document.getElementById('glow');
  let tx = 0, ty = 0, cx = 0, cy = 0;
  window.addEventListener('pointermove', e => { tx = e.clientX; ty = e.clientY; }, {passive:true});
  function loop(){
    cx += (tx - cx) * .12; cy += (ty - cy) * .12;
    g.style.left = cx + 'px'; g.style.top = cy + 'px';
    requestAnimationFrame(loop);
  }
  loop();
})();

(function cursor(){
  const dot = document.getElementById('cursorDot');
  const ring = document.getElementById('cursorRing');
  let mx = 0, my = 0, rx = 0, ry = 0;
  window.addEventListener('pointermove', e => { mx = e.clientX; my = e.clientY; }, {passive:true});
  const hoverables = 'a, button, .social, .project, .tag, .strip';
  document.addEventListener('mouseover', e => {
    if (e.target.closest(hoverables)){ dot.classList.add('hover'); ring.classList.add('hover'); }
  });
  document.addEventListener('mouseout', e => {
    if (e.target.closest(hoverables)){ dot.classList.remove('hover'); ring.classList.remove('hover'); }
  });
  function loop(){
    rx += (mx - rx) * .18; ry += (my - ry) * .18;
    dot.style.left = mx + 'px'; dot.style.top = my + 'px';
    ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
    requestAnimationFrame(loop);
  }
  loop();
})();

(function magnetic(){
  document.querySelectorAll('.magnetic').forEach(el => {
    el.addEventListener('pointermove', e => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - r.left - r.width / 2;
      const y = e.clientY - r.top - r.height / 2;
      el.style.transform = 'translate(' + (x * .35) + 'px, ' + (y * .35) + 'px)';
    });
    el.addEventListener('pointerleave', () => { el.style.transform = ''; });
  });
})();

(function typed(){
  const el = document.getElementById('typed');
  const phrases = [
    "scroll down — there's a bit about me.",
    'i build things for the web.',
    'currently exploring modern js & ui/ux.',
    "welcome to my little corner of the internet."
  ];
  let pi = 0, ci = 0, deleting = false;
  function tick(){
    const phrase = phrases[pi];
    if (!deleting){
      el.textContent = phrase.slice(0, ++ci);
      if (ci === phrase.length){ deleting = true; setTimeout(tick, 1800); return; }
    } else {
      el.textContent = phrase.slice(0, --ci);
      if (ci === 0){ deleting = false; pi = (pi + 1) % phrases.length; }
    }
    setTimeout(tick, deleting ? 30 : 55);
  }
  tick();
})();

(function tilt(){
  document.querySelectorAll('[data-tilt]').forEach(card => {
    const banner = card.querySelector('.banner');
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - .5;
      const py = (e.clientY - r.top) / r.height - .5;
      card.style.transform = 'perspective(900px) rotateX(' + (-py * 6).toFixed(2) + 'deg) rotateY(' + (px * 8).toFixed(2) + 'deg) translateY(-4px)';
      if (banner) banner.style.transform = 'scale(1.08) translate(' + (-px * 10).toFixed(1) + 'px, ' + (-py * 10).toFixed(1) + 'px)';
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      if (banner) banner.style.transform = '';
    });
  });
})();

(function avatarTilt(){
  const wrap = document.getElementById('avatarWrap');
  if (!wrap) return;
  wrap.addEventListener('mousemove', e => {
    const r = wrap.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - .5;
    const py = (e.clientY - r.top) / r.height - .5;
    wrap.style.transform = 'perspective(800px) rotateX(' + (-py * 10).toFixed(2) + 'deg) rotateY(' + (px * 12).toFixed(2) + 'deg) scale(1.02)';
  });
  wrap.addEventListener('mouseleave', () => { wrap.style.transform = ''; });
})();

(function particles(){
  const canvas = document.getElementById('particles');
  const ctx = canvas.getContext('2d');
  let w, h, pts;
  const COUNT = 70;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const mouse = {x:-9999, y:-9999};

  function resize(){
    w = canvas.width = Math.round(window.innerWidth * dpr);
    h = canvas.height = Math.round(window.innerHeight * dpr);
    canvas.style.width = window.innerWidth + 'px';
    canvas.style.height = window.innerHeight + 'px';
  }
  function init(){
    pts = [];
    for (let i = 0; i < COUNT; i++){
      pts.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - .5) * .3 * dpr,
        vy: (Math.random() - .5) * .3 * dpr,
        r: (Math.random() * 1.6 + .4) * dpr,
        a: Math.random() * .5 + .2
      });
    }
  }
  window.addEventListener('resize', () => { resize(); init(); });
  window.addEventListener('pointermove', e => { mouse.x = e.clientX * dpr; mouse.y = e.clientY * dpr; }, {passive:true});

  function draw(){
    ctx.clearRect(0, 0, w, h);
    for (let i = 0; i < pts.length; i++){
      const p = pts[i];
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > w) p.vx *= -1;
      if (p.y < 0 || p.y > h) p.vy *= -1;

      const dx = p.x - mouse.x, dy = p.y - mouse.y;
      const d2 = dx * dx + dy * dy;
      const R = 140 * dpr;
      if (d2 < R * R){
        const d = Math.sqrt(d2) || 1;
        const f = (1 - d / R) * .6;
        p.x += dx / d * f * 2;
        p.y += dy / d * f * 2;
      }

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(140,180,255,' + p.a + ')';
      ctx.fill();

      for (let j = i + 1; j < pts.length; j++){
        const q = pts[j];
        const ddx = p.x - q.x, ddy = p.y - q.y;
        const dist = Math.sqrt(ddx * ddx + ddy * ddy);
        const maxD = 120 * dpr;
        if (dist < maxD){
          ctx.strokeStyle = 'rgba(96,165,250,' + ((1 - dist / maxD) * .18) + ')';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(draw);
  }
  resize(); init(); draw();
})();

(function marqueeScroll(){
  const track = document.getElementById('track');
  if (!track) return;
  let lastY = window.scrollY;
  window.addEventListener('scroll', () => {
    const dy = Math.abs(window.scrollY - lastY);
    lastY = window.scrollY;
    const newDur = Math.max(6, 18 - dy * .3);
    track.style.animationDuration = newDur + 's';
  }, {passive:true});
})();
