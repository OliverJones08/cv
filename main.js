(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  gsap.registerPlugin(ScrollTrigger);

  /* ---------- smooth scroll ---------- */
  let lenis = null;
  if (!reduce && window.Lenis) {
    lenis = new Lenis({ lerp: 0.1 });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((t) => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
  }
  $$('a[href^="#"]').forEach((a) => a.addEventListener('click', (e) => {
    const target = $(a.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    lenis ? lenis.scrollTo(target, { duration: 1.4 }) : target.scrollIntoView({ behavior: 'smooth' });
  }));

  /* ---------- music ----------
     Tries to play the moment the page opens. Most browsers block sound until the
     visitor interacts, so if blocked it starts on the first click / tap / key.
     No popup. The button mutes and is remembered. */
  const audio = $('audio');
  const player = $('.player');
  const store = { get: (k) => { try { return localStorage.getItem(k); } catch { return null; } },
                  set: (k, v) => { try { localStorage.setItem(k, v); } catch {} } };
  let fadeRaf = 0;
  const fade = (to, ms, done) => {
    cancelAnimationFrame(fadeRaf);
    const from = audio.volume, t0 = performance.now();
    const step = (t) => {
      const k = Math.min(1, (t - t0) / ms);
      audio.volume = from + (to - from) * k;
      k < 1 ? (fadeRaf = requestAnimationFrame(step)) : done && done();
    };
    fadeRaf = requestAnimationFrame(step);
  };
  const setPlaying = (on) => { player.classList.toggle('is-playing', on); player.setAttribute('aria-pressed', on); };
  const play = () => {
    audio.volume = 0;
    return audio.play().then(() => { setPlaying(true); fade(0.8, 2000); return true; }).catch(() => false);
  };
  const stop = () => fade(0, 500, () => { audio.pause(); setPlaying(false); });

  // with <source> children, only the last source reports when every option failed
  $$('source', audio).at(-1).addEventListener('error', () => { player.dataset.missing = ''; player.title = 'Music unavailable'; });
  player.addEventListener('click', () => {
    if (audio.paused) { store.set('muted', '0'); play(); } else { store.set('muted', '1'); stop(); }
  });
  // scrolling alone never counts as a gesture for browsers; these do
  const gestures = ['pointerdown', 'pointerup', 'touchend', 'keydown'];
  const stopListening = () => gestures.forEach((t) => window.removeEventListener(t, onGesture, true));
  function onGesture(e) {
    if (player.contains(e.target) || store.get('muted') === '1' || !audio.paused) return stopListening(); // the button handles itself
    play().then((ok) => ok && stopListening());
  }
  gestures.forEach((t) => window.addEventListener(t, onGesture, true));
  if (store.get('muted') !== '1') play().then((ok) => ok && stopListening()); // works when the browser allows autoplay

  /* ---------- loader ---------- */
  const loader = $('.loader');
  const countEl = $('.loader__count span');
  const imgs = $$('img').filter((i) => i.loading !== 'lazy');
  let loaded = 0;
  const progress = { v: 0 };
  const showCount = () => (countEl.textContent = String(Math.round(progress.v)).padStart(3, '0'));
  const tick = () => gsap.to(progress, { v: (loaded / imgs.length) * 100, duration: 0.6, ease: 'power2.out', onUpdate: showCount });
  const ready = Promise.all(imgs.map((img) => img.complete ? Promise.resolve() : new Promise((r) => { img.onload = img.onerror = r; })
    .then(() => { loaded++; tick(); })));
  imgs.forEach((img) => { if (img.complete) { loaded++; } }); tick();
  const minTime = new Promise((r) => setTimeout(r, reduce ? 0 : 1800));

  lenis && lenis.stop();
  Promise.all([ready, minTime, document.fonts.ready]).then(() => {
    gsap.timeline({ onComplete: () => { loader.remove(); lenis && lenis.start(); ScrollTrigger.refresh(); } })
      .to(progress, { v: 100, duration: 0.4, onUpdate: showCount })
      .to('.loader__ring', { scale: 1.6, opacity: 0, duration: 1.2, ease: 'expo.inOut' }, '>-0.1')
      .to('.loader__beam', { scaleX: 0, opacity: 0, duration: 0.8, ease: 'expo.inOut' }, '<')
      .to(['.loader__name', '.loader__count'], { y: -24, opacity: 0, duration: 0.6, ease: 'power2.in' }, '<')
      .to(loader, { opacity: 0, duration: 0.6 }, '-=0.4')
      .add(heroIn, '-=0.5');
  });

  function heroIn() {
    if (reduce) return;
    gsap.timeline()
      .from('.hero__portrait', { scale: 1.12, opacity: 0, duration: 2, ease: 'expo.out' })
      .from('.hero__name .line > span', { yPercent: 110, duration: 1.2, stagger: 0.08, ease: 'expo.out' }, 0.15)
      .from('.nav', { y: -20, opacity: 0, duration: 1, ease: 'expo.out' }, 0.3)
      .from(['.hero__words', '.hero .label', '.player'], { opacity: 0, y: 12, duration: 1, stagger: 0.05, ease: 'power2.out' }, 0.5);
  }

  /* hero: the portrait smiles on the first scroll down, serious again back at the top */
  const hero = $('.hero');
  const smile = (y) => hero.classList.toggle('is-smiling', y > 4);
  lenis ? lenis.on('scroll', (l) => smile(l.scroll)) : addEventListener('scroll', () => smile(scrollY), { passive: true });

  if (reduce) return; // everything below is motion

  /* ---------- generic reveals ---------- */
  const reveals = $$('[data-reveal]');
  gsap.set(reveals, { opacity: 0, y: 28 });
  ScrollTrigger.batch(reveals, {
    start: 'top 88%', once: true,
    onEnter: (b) => gsap.to(b, { opacity: 1, y: 0, duration: 1.1, stagger: 0.08, ease: 'expo.out', overwrite: true }),
  });
  $$('.contact [data-lines] .line > span').forEach((el) => gsap.from(el, {
    yPercent: 110, duration: 1.3, ease: 'expo.out', scrollTrigger: { trigger: el, start: 'top 85%' },
  }));

  /* hero parallax */
  gsap.to('.hero__portrait', { yPercent: 10, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
  gsap.to('.hero__name', { y: -80, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });

  /* school: 8.59 counts up, hairlines draw */
  const gpa = $('.gpa span'); const g = { v: 0 };
  ScrollTrigger.create({ trigger: '.gpa', start: 'top 85%', once: true,
    onEnter: () => gsap.to(g, { v: 8.59, duration: 1.8, ease: 'power3.out', onUpdate: () => (gpa.textContent = g.v.toFixed(2)) }) });
  gpa.textContent = '0.00';
  gsap.from('.row__line', { scaleX: 0, duration: 1.4, stagger: 0.1, ease: 'expo.out', scrollTrigger: { trigger: '.rows', start: 'top 80%' } });
  gsap.from('.row > *:not(.row__line)', { opacity: 0, y: 16, duration: 1, stagger: 0.05, ease: 'expo.out', scrollTrigger: { trigger: '.rows', start: 'top 80%' } });

  /* likes: tags float in */
  gsap.from('.tags li', { opacity: 0, y: 24, duration: 0.9, stagger: 0.04, ease: 'expo.out', scrollTrigger: { trigger: '.tags', start: 'top 85%' } });

  /* world: photos drift sideways at different speeds */
  $$('.world__photo').forEach((el) => gsap.fromTo(el, { x: () => 80 * el.dataset.speed }, {
    x: () => -80 * el.dataset.speed, ease: 'none',
    scrollTrigger: { trigger: '.world__strip', start: 'top bottom', end: 'bottom top', scrub: true, invalidateOnRefresh: true },
  }));

  /* ---------- desktop-only pinned scenes ---------- */
  gsap.matchMedia().add('(min-width: 901px)', () => {
    /* Five words: vertical scroll moves the track sideways, and it ends */
    const track = $('.words__track');
    const pad = () => parseFloat(getComputedStyle($('.words__viewport')).paddingLeft);
    const dist = () => Math.max(0, track.scrollWidth - (document.documentElement.clientWidth - pad() * 2));
    const count = $('.words__count span');
    const bar = $('.progress i');
    gsap.to(track, {
      x: () => -dist(), ease: 'none',
      scrollTrigger: {
        trigger: '.words', start: 'top top', end: () => '+=' + dist(), pin: true, scrub: 1, invalidateOnRefresh: true,
        onUpdate: (st) => {
          count.textContent = String(Math.min(5, 1 + Math.floor(st.progress * 5))).padStart(2, '0');
          gsap.set(bar, { scaleX: 0.2 + st.progress * 0.8 });
        },
      },
    });

    /* Built: cards arrive in depth (KHZ) */
    $$('.project').forEach((p) => gsap.fromTo(p,
      { opacity: 0, y: 140, rotateX: 16, scale: 0.9, transformOrigin: '50% 0%' },
      { opacity: 1, y: 0, rotateX: 0, scale: 1, ease: 'none', scrollTrigger: { trigger: p, start: 'top 98%', end: 'top 55%', scrub: 1 } }));

    /* Sport: photo starts centered and big, slides to the right (Lustre) */
    const photo = $('.sport__photo');
    const toCenter = () => window.innerWidth / 2 - (photo.offsetLeft + photo.offsetWidth / 2);
    gsap.timeline({ scrollTrigger: { trigger: '.sport', start: 'top top', end: '+=120%', pin: true, scrub: 1, invalidateOnRefresh: true } })
      .from(photo, { x: toCenter, scale: 1.12, duration: 1, ease: 'power2.inOut' })
      .from('.sport__text > *', { opacity: 0, y: 40, stagger: 0.06, duration: 0.5, ease: 'power2.out' }, 0.45);
  });

  addEventListener('load', () => ScrollTrigger.refresh());
})();
