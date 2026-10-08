(() => {
  'use strict';

  window.__siteReady = true;

  const doc = document.documentElement;
  const body = document.body;
  const lang = body.dataset.lang || 'en';
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = matchMedia('(hover: hover) and (pointer: fine)').matches;
  const hasGsap = typeof window.gsap !== 'undefined' && typeof window.ScrollTrigger !== 'undefined';
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => Array.from(el.querySelectorAll(s));
  const track = (event, params) => {
    if (typeof window.gtag === 'function') window.gtag('event', event, params);
  };

  if (hasGsap) gsap.registerPlugin(ScrollTrigger);

  /* ------------------------------------------------------------------
     Loader (first visit per session) + page-leave transition
     ------------------------------------------------------------------ */
  const loader = $('.loader');
  const markSeen = () => {
    try { sessionStorage.setItem('seen', '1'); } catch (e) { /* storage blocked */ }
  };

  const runIntro = () => new Promise((resolve) => {
    if (!doc.classList.contains('js-preload') || !hasGsap || !loader) {
      doc.classList.remove('js-preload');
      markSeen();
      resolve();
      return;
    }
    const count = $('[data-loader-count]', loader);
    const bar = $('[data-loader-bar]', loader);
    const front = $('.loader__panel--front', loader);
    const back = $('.loader__panel:not(.loader__panel--front)', loader);
    const state = { v: 0 };
    gsap.timeline({
      onComplete: () => {
        doc.classList.remove('js-preload');
        gsap.set([front, back], { clearProps: 'all' });
        markSeen();
      },
    })
      .to(state, {
        v: 100,
        duration: 0.7,
        ease: 'power2.inOut',
        onUpdate: () => {
          count.textContent = Math.round(state.v);
          bar.style.transform = `scaleX(${state.v / 100})`;
        },
      })
      .to(front, { yPercent: -100, duration: 0.8, ease: 'expo.inOut' }, '+=0.1')
      .to(back, { yPercent: -100, duration: 0.8, ease: 'expo.inOut', onStart: resolve }, '-=0.62');
  });

  const isInternalNav = (a, e) => {
    if (!a || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return false;
    if (a.target && a.target !== '_self') return false;
    if (a.hasAttribute('download')) return false;
    const url = new URL(a.href, location.href);
    if (url.origin !== location.origin) return false;
    if (url.pathname === location.pathname && url.hash) return false;
    if (/\.(pdf|zip|png|jpe?g|webp|svg)$/i.test(url.pathname)) return false;
    return true;
  };

  if (loader && hasGsap && !reduceMotion) {
    document.addEventListener('click', (e) => {
      const a = e.target.closest('a[href]');
      if (!isInternalNav(a, e)) return;
      e.preventDefault();
      const href = a.href;
      const back = $('.loader__panel:not(.loader__panel--front)', loader);
      const front = $('.loader__panel--front', loader);
      $('[data-loader-count]', loader).textContent = '';
      $('.loader__bar', loader).hidden = true;
      loader.classList.add('is-leaving');
      gsap.timeline({ onComplete: () => { location.href = href; } })
        .fromTo(back, { yPercent: 100 }, { yPercent: 0, duration: 0.42, ease: 'expo.inOut' })
        .fromTo(front, { yPercent: 100 }, { yPercent: 0, duration: 0.42, ease: 'expo.inOut' }, '-=0.32');
    });
    window.addEventListener('pageshow', (e) => {
      if (!e.persisted) return;
      loader.classList.remove('is-leaving');
      gsap.set($$('.loader__panel', loader), { clearProps: 'all' });
    });
  }

  /* ------------------------------------------------------------------
     Header: solid after scroll, hides on scroll down
     ------------------------------------------------------------------ */
  const header = $('[data-header]');
  let lastY = window.scrollY;
  const onScrollHeader = () => {
    const y = window.scrollY;
    if (!header) return;
    header.classList.toggle('is-scrolled', y > 40);
    const menuOpen = body.classList.contains('is-locked');
    header.classList.toggle('is-hidden', !menuOpen && y > lastY && y > window.innerHeight * 0.6);
    lastY = y;
  };
  window.addEventListener('scroll', onScrollHeader, { passive: true });
  onScrollHeader();

  /* ------------------------------------------------------------------
     Fullscreen menu
     ------------------------------------------------------------------ */
  const menu = $('[data-menu]');
  const toggle = $('[data-menu-toggle]');
  const main = $('main');
  const footer = $('.site-footer');
  const setMenu = (open) => {
    if (!menu || !toggle) return;
    menu.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    $('.menu-toggle__text--menu', toggle).setAttribute('aria-hidden', String(open));
    $('.menu-toggle__text--close', toggle).setAttribute('aria-hidden', String(!open));
    body.classList.toggle('is-locked', open);
    [main, footer].forEach((el) => el && (el.inert = open));
    header.classList.remove('is-hidden');
    if (open) {
      const first = $('.menu__link', menu);
      setTimeout(() => first && first.focus({ preventScroll: true }), reduceMotion ? 0 : 650);
    }
  };
  if (toggle) {
    toggle.addEventListener('click', () => setMenu(!menu.classList.contains('is-open')));
    document.addEventListener('keydown', (e) => {
      if (!menu.classList.contains('is-open')) return;
      if (e.key === 'Escape') {
        setMenu(false);
        toggle.focus();
      }
      if (e.key === 'Tab') {
        const focusables = [toggle, ...$$('a[href], button', menu)].filter((el) => el.offsetParent !== null);
        const firstEl = focusables[0];
        const lastEl = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === firstEl) {
          e.preventDefault();
          lastEl.focus();
        } else if (!e.shiftKey && document.activeElement === lastEl) {
          e.preventDefault();
          firstEl.focus();
        }
      }
    });
  }

  /* ------------------------------------------------------------------
     Text + element reveals (ported from the template's dsn-animate)
     ------------------------------------------------------------------ */
  const splitWords = (el) => {
    if (el.dataset.split) return;
    el.dataset.split = '1';
    const label = document.createElement('span');
    label.className = 'sr-only';
    label.textContent = el.textContent.replace(/\s+/g, ' ').trim();
    const walk = (node) => {
      Array.from(node.childNodes).forEach((child) => {
        if (child.nodeType === 3) {
          const frag = document.createDocumentFragment();
          child.textContent.split(/(\s+)/).forEach((w) => {
            if (!w) return;
            if (/^\s+$/.test(w)) {
              frag.appendChild(document.createTextNode(w));
            } else {
              const outer = document.createElement('span');
              outer.className = 'word';
              outer.setAttribute('aria-hidden', 'true');
              const inner = document.createElement('span');
              inner.className = 'word__inner';
              inner.textContent = w;
              outer.appendChild(inner);
              frag.appendChild(outer);
            }
          });
          child.replaceWith(frag);
        } else if (child.nodeType === 1 && child.tagName !== 'BR') {
          walk(child);
        }
      });
    };
    walk(el);
    el.prepend(label);
  };

  const revealAllNow = () => {
    doc.classList.remove('js');
  };

  const initReveals = () => {
    if (!hasGsap || reduceMotion) {
      revealAllNow();
      return;
    }
    $$('[data-reveal="words"]').forEach((el) => {
      splitWords(el);
      gsap.to($$('.word__inner', el), {
        y: 0,
        rotate: 0,
        duration: 0.9,
        ease: 'back.out(1.4)',
        stagger: 0.045,
        scrollTrigger: { trigger: el, start: 'top 88%', once: true },
      });
    });
    ScrollTrigger.batch('[data-reveal="up"]', {
      start: 'top 90%',
      once: true,
      onEnter: (els) => gsap.to(els, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', stagger: 0.08 }),
    });
    ScrollTrigger.batch('[data-reveal="fade"]', {
      start: 'top 92%',
      once: true,
      onEnter: (els) => gsap.to(els, { opacity: 1, duration: 1, ease: 'power2.out', stagger: 0.08 }),
    });
    $$('[data-reveal="mask"]').forEach((el) => {
      gsap.to(el, {
        clipPath: 'inset(0 0 0% 0)',
        duration: 1.2,
        ease: 'expo.out',
        scrollTrigger: { trigger: el, start: 'top 95%', once: true },
      });
    });

    // Image parallax (template "move-up": scale 1.1 → 1, y 10%)
    $$('[data-parallax]').forEach((wrap) => {
      const media = wrap.querySelector('img, video');
      if (!media) return;
      gsap.fromTo(media, { scale: 1.12, yPercent: -6 }, {
        scale: 1,
        yPercent: 6,
        ease: 'none',
        scrollTrigger: { trigger: wrap, start: 'top bottom', end: 'bottom top', scrub: true },
      });
    });

    // Count-up stats
    $$('[data-count]').forEach((el) => {
      const raw = el.dataset.count;
      const m = raw.match(/^([^\d]*)(\d+)(.*)$/);
      if (!m) return;
      const [, pre, num, post] = m;
      const state = { v: 0 };
      el.textContent = `${pre}0${post}`;
      gsap.to(state, {
        v: +num,
        duration: 1.6,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 90%', once: true },
        onUpdate: () => { el.textContent = `${pre}${Math.round(state.v)}${post}`; },
      });
    });
  };

  /* ------------------------------------------------------------------
     Home hero choreography
     ------------------------------------------------------------------ */
  const initHero = () => {
    const hero = $('.hero');
    if (!hero || !hasGsap || reduceMotion) return;
    const lines = $$('[data-hero-line]', hero);
    const photo = $('[data-hero-photo]', hero);
    const x = $('[data-hero-x]', hero);
    const names = $$('[data-hero-name]', hero);
    const marquee = $('.marquee', hero);
    gsap.set(lines, { yPercent: 110, opacity: 0 });
    gsap.set(names, { yPercent: 105 });
    gsap.set(photo, { opacity: 0 });
    gsap.set(x, { scale: 0.85, opacity: 0, transformOrigin: '50% 50%' });
    gsap.set(marquee, { opacity: 0 });
    return () => {
      gsap.timeline({ defaults: { ease: 'expo.out' } })
        .to(x, { scale: 1, opacity: 1, duration: 1.4 }, 0)
        .to(photo, { opacity: 1, duration: 1.2, ease: 'power2.out' }, 0.1)
        .to(lines, { yPercent: 0, opacity: 1, duration: 1.2, stagger: 0.08 }, 0.25)
        .to(names, { yPercent: 0, duration: 1.3, stagger: 0.1 }, 0.4)
        .to(marquee, { opacity: 1, duration: 1 }, 0.8);

      // Scroll: content drifts down slower than the page and the headline
      // fades, like the template's hero. Everything stays inside the stage.
      const st = { trigger: hero, start: 'top top', end: 'bottom top', scrub: 0.4 };
      gsap.to(photo, { y: () => hero.offsetHeight * 0.12, ease: 'none', scrollTrigger: { ...st, invalidateOnRefresh: true } });
      gsap.to(x, { y: () => hero.offsetHeight * 0.06, ease: 'none', scrollTrigger: { ...st, invalidateOnRefresh: true } });
      gsap.to('.hero__title', { y: () => hero.offsetHeight * 0.1, opacity: 0, ease: 'none', scrollTrigger: { ...st, end: '60% top', invalidateOnRefresh: true } });
    };
  };

  /* Case/article hero image parallax */
  const initPageHeroParallax = () => {
    if (!hasGsap || reduceMotion) return;
    $$('[data-hero-parallax]').forEach((wrap) => {
      const media = wrap.querySelector('img');
      if (!media) return;
      gsap.fromTo(media, { scale: 1.08 }, { yPercent: 18, scale: 1, ease: 'none', scrollTrigger: { trigger: wrap, start: 'top top', end: 'bottom top', scrub: true } });
    });
  };

  /* ------------------------------------------------------------------
     Rotating split headline
     ------------------------------------------------------------------ */
  const initRotator = () => {
    $$('[data-rotator]').forEach((el) => {
      const pairs = $$('.rotator__pair', el);
      if (true) {
        el.classList.add('rotator--static');
        return;
      }
      let i = 0;
      let timer = null;
      const step = () => {
        const cur = pairs[i];
        i = (i + 1) % pairs.length;
        const next = pairs[i];
        cur.classList.remove('is-active');
        cur.classList.add('is-leaving');
        setTimeout(() => cur.classList.remove('is-leaving'), 700);
        next.classList.add('is-active');
      };
      const io = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting && !timer) timer = setInterval(step, 2600);
        if (!entry.isIntersecting && timer) {
          clearInterval(timer);
          timer = null;
        }
      });
      io.observe(el);
      document.addEventListener('visibilitychange', () => {
        if (document.hidden && timer) {
          clearInterval(timer);
          timer = null;
        }
      });
    });
  };

  /* ------------------------------------------------------------------
     Carousels: infinite, centred slider (the template's Slick behaviour:
     loop, autoplay, dots, drag) without jQuery. The active slide sits in
     the middle of the viewport with its neighbours cut by the edges, as
     in the Figma Work and Insights rows.
     ------------------------------------------------------------------ */
  const initCarousels = () => {
    $$('[data-carousel]').forEach((root) => {
      const track = $('[data-carousel-track]', root);
      if (!track) return;
      const originals = $$('.carousel__slide', track);
      const n = originals.length;
      if (!n) return;
      const prev = $('[data-carousel-prev]', root);
      const next = $('[data-carousel-next]', root);
      const dots = $$('[data-carousel-dots] button', root);
      const viewport = track.parentElement;

      // One clone set on each side makes the loop seamless.
      const cloneSet = () => originals.map((s) => {
        const c = s.cloneNode(true);
        c.setAttribute('aria-hidden', 'true');
        c.inert = true;
        c.classList.add('is-clone');
        $$('[id]', c).forEach((el) => el.removeAttribute('id'));
        return c;
      });
      cloneSet().forEach((c) => track.insertBefore(c, originals[0]));
      cloneSet().forEach((c) => track.appendChild(c));
      const all = $$('.carousel__slide', track);
      track.classList.add('is-ready');

      let index = n;
      let x = 0;
      const ease = 'transform 0.8s cubic-bezier(0.22, 1, 0.36, 1)';
      const targetX = (i) => {
        const s = all[i];
        return viewport.clientWidth / 2 - (s.offsetLeft + s.offsetWidth / 2);
      };
      const apply = (value, animate) => {
        x = value;
        track.style.transition = animate && !reduceMotion ? ease : 'none';
        track.style.transform = `translate3d(${x}px, 0, 0)`;
      };
      const sync = () => {
        const real = ((index % n) + n) % n;
        all.forEach((s, k) => s.classList.toggle('is-active', k === index));
        dots.forEach((d, k) => (k === real ? d.setAttribute('aria-current', 'true') : d.removeAttribute('aria-current')));
      };
      const normalize = () => {
        if (index < n || index >= 2 * n) {
          index = ((index % n) + n) % n + n;
          apply(targetX(index), false);
          sync();
        }
      };
      const goTo = (i, animate = true) => {
        index = i;
        apply(targetX(index), animate);
        sync();
        if (!animate || reduceMotion) normalize();
      };
      track.addEventListener('transitionend', (e) => { if (e.target === track) normalize(); });

      // Autoplay (template default). Pauses on hover, focus, drag, when
      // off-screen or hidden, and stops for good after any manual input.
      let timer = null;
      let stopped = true;
      let hovering = false;
      let visible = false;
      const tick = () => goTo(index + 1);
      const schedule = () => {
        clearInterval(timer);
        timer = null;
        if (!stopped && !hovering && visible && !document.hidden && !root.contains(document.activeElement)) timer = setInterval(tick, 4500);
      };
      const stop = () => { stopped = true; schedule(); };
      root.addEventListener('pointerenter', () => { hovering = true; schedule(); });
      root.addEventListener('pointerleave', () => { hovering = false; schedule(); });
      root.addEventListener('focusin', schedule);
      root.addEventListener('focusout', () => setTimeout(schedule, 0));
      document.addEventListener('visibilitychange', schedule);
      new IntersectionObserver(([e]) => { visible = e.isIntersecting; schedule(); }).observe(root);

      prev && prev.addEventListener('click', () => { stop(); goTo(index - 1); });
      next && next.addEventListener('click', () => { stop(); goTo(index + 1); });
      dots.forEach((d, k) => d.addEventListener('click', () => {
        stop();
        const real = ((index % n) + n) % n;
        goTo(index + (k - real));
      }));

      // Keyboard users tabbing into a card bring it to the centre.
      originals.forEach((s, k) => s.addEventListener('focusin', () => {
        if (index !== n + k) goTo(n + k);
      }));

      // Drag / swipe
      let down = false;
      let moved = false;
      let startX = 0;
      let startY = 0;
      let baseX = 0;
      track.addEventListener('pointerdown', (e) => {
        if (e.button !== 0) return;
        down = true;
        moved = false;
        startX = e.clientX;
        startY = e.clientY;
        baseX = x;
        track.style.transition = 'none';
      });
      window.addEventListener('pointermove', (e) => {
        if (!down) return;
        const dx = e.clientX - startX;
        if (!moved && Math.abs(e.clientY - startY) > Math.abs(dx) && Math.abs(dx) < 8) return;
        if (Math.abs(dx) > 6) moved = true;
        if (moved) apply(baseX + dx, false);
      });
      const release = (e) => {
        if (!down) return;
        down = false;
        if (!moved) return;
        stop();
        const dx = e.clientX - startX;
        const step = all[1].offsetLeft - all[0].offsetLeft;
        let steps = Math.round(-dx / step);
        if (steps === 0 && Math.abs(dx) > 40) steps = dx < 0 ? 1 : -1;
        goTo(index + steps);
      };
      window.addEventListener('pointerup', release);
      window.addEventListener('pointercancel', release);
      track.addEventListener('click', (e) => {
        if (moved) {
          e.preventDefault();
          e.stopPropagation();
          moved = false;
        }
      }, true);
      track.addEventListener('dragstart', (e) => e.preventDefault());

      window.addEventListener('resize', () => goTo(index, false));
      goTo(index, false);
      schedule();
    });
  };

  /* ------------------------------------------------------------------
     Company cards (+ toggles) and services accordion
     ------------------------------------------------------------------ */
  const initCompanies = () => {
    $$('[data-company] .company__toggle').forEach((btn) => {
      const card = btn.closest('[data-company]');
      const panel = document.getElementById(btn.getAttribute('aria-controls'));
      btn.addEventListener('click', () => {
        const open = btn.getAttribute('aria-expanded') !== 'true';
        btn.setAttribute('aria-expanded', String(open));
        btn.setAttribute('aria-label', open ? btn.dataset.labelClose : btn.dataset.labelOpen);
        if (open) {
          panel.hidden = false;
          requestAnimationFrame(() => card.classList.add('is-open'));
        } else {
          card.classList.remove('is-open');
          setTimeout(() => { if (btn.getAttribute('aria-expanded') !== 'true') panel.hidden = true; }, 450);
        }
      });
    });
  };

  const initAccordions = () => {
    const triggers = $$('[data-accordion]');
    triggers.forEach((btn) => {
      btn.addEventListener('click', () => {
        const open = btn.getAttribute('aria-expanded') !== 'true';
        triggers.forEach((other) => {
          other.setAttribute('aria-expanded', 'false');
          document.getElementById(other.getAttribute('aria-controls')).dataset.open = 'false';
          const item = other.closest('[data-service]');
          item && item.classList.remove('is-open');
        });
        btn.setAttribute('aria-expanded', String(open));
        document.getElementById(btn.getAttribute('aria-controls')).dataset.open = String(open);
        const item = btn.closest('[data-service]');
        item && item.classList.toggle('is-open', open);
      });
    });
  };

  /* ------------------------------------------------------------------
     Testimonials
     ------------------------------------------------------------------ */
  const initQuotes = () => {
    $$('[data-quotes]').forEach((root) => {
      const quotes = $$('.quote', root);
      const dots = $$('.indicator button', root);
      if (quotes.length < 2) return;
      let i = 0;
      const show = (k) => {
        i = (k + quotes.length) % quotes.length;
        quotes.forEach((q, n) => q.classList.toggle('is-active', n === i));
        dots.forEach((d, n) => (n === i ? d.setAttribute('aria-current', 'true') : d.removeAttribute('aria-current')));
      };
      let timer = null;
      let visible = false;
      const stop = () => { clearInterval(timer); timer = null; };
      const play = () => {
        stop();

      };
      dots.forEach((d, n) => d.addEventListener('click', () => { show(n); reduceMotionStop(); }));
      const reduceMotionStop = () => { stop(); root.dataset.manual = '1'; };
      new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (!root.dataset.manual) play(); }).observe(root);
      root.addEventListener('pointerenter', stop);
      root.addEventListener('pointerleave', () => { if (!root.dataset.manual) play(); });
      let sx = null;
      root.addEventListener('pointerdown', (e) => { sx = e.clientX; });
      root.addEventListener('pointerup', (e) => {
        if (sx === null) return;
        const dx = e.clientX - sx;
        sx = null;
        if (Math.abs(dx) > 40) { show(i + (dx < 0 ? 1 : -1)); reduceMotionStop(); }
      });
    });
  };

  /* ------------------------------------------------------------------
     Cursor (pointer devices only) + magnetic controls
     ------------------------------------------------------------------ */
  const initCursor = () => {
    const cursor = $('[data-cursor-el]');
    if (!cursor || !finePointer || reduceMotion || !hasGsap) return;
    body.classList.add('has-cursor');
    const xTo = gsap.quickTo(cursor, 'x', { duration: 0.45, ease: 'power3' });
    const yTo = gsap.quickTo(cursor, 'y', { duration: 0.45, ease: 'power3' });
    let shown = false;
    window.addEventListener('pointermove', (e) => {
      if (!shown) {
        gsap.set(cursor, { x: e.clientX, y: e.clientY });
        cursor.classList.add('is-ready');
        shown = true;
      }
      xTo(e.clientX);
      yTo(e.clientY);
    }, { passive: true });
    document.addEventListener('pointerover', (e) => {
      const view = e.target.closest('[data-cursor="view"]');
      const link = e.target.closest('a, button, input, textarea, label');
      cursor.classList.toggle('is-hidden', !!e.target.closest('.work-card'));
      cursor.classList.toggle('is-view', !!view);
      cursor.classList.toggle('is-link', !view && !!link);
    });
    document.addEventListener('pointerleave', () => gsap.to(cursor, { opacity: 0, duration: 0.2 }));
    document.addEventListener('pointerenter', () => gsap.to(cursor, { opacity: 1, duration: 0.2 }));

    $$('.icon-btn, .menu-toggle, .socials a, .to-top').forEach((el) => {
      el.addEventListener('pointermove', (e) => {
        const r = el.getBoundingClientRect();
        gsap.to(el, { x: (e.clientX - r.left - r.width / 2) * 0.3, y: (e.clientY - r.top - r.height / 2) * 0.3, duration: 0.4, ease: 'power3' });
      });
      el.addEventListener('pointerleave', () => gsap.to(el, { x: 0, y: 0, duration: 0.9, ease: 'elastic.out(1, 0.4)' }));
    });
  };

  /* ------------------------------------------------------------------
     Back to top with progress ring
     ------------------------------------------------------------------ */
  const initToTop = () => {
    const btn = $('[data-to-top]');
    if (!btn) return;
    const ring = $('[data-to-top-ring]', btn);
    let nearFooter = false;
    const legal = $('.site-footer__bottom');
    if (legal) {
      new IntersectionObserver(([e]) => {
        nearFooter = e.isIntersecting;
        update();
      }, { rootMargin: '0px 0px 40px 0px' }).observe(legal);
    }
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? window.scrollY / max : 0;
      btn.classList.toggle('is-visible', window.scrollY > window.innerHeight && !nearFooter);
      ring.setAttribute('stroke-dashoffset', String(100 - p * 100));
    };
    window.addEventListener('scroll', update, { passive: true });
    update();
    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
      const target = $('#main-content');
      target && target.focus({ preventScroll: true });
    });
  };

  /* ------------------------------------------------------------------
     Forms: contact + newsletter → /contact.php (Resend)
     ------------------------------------------------------------------ */
  const initForms = () => {
    $$('[data-form]').forEach((form) => {
      const status = $('[data-form-status]', form);
      const submit = $('button[type="submit"]', form);
      const submitHTML = submit.innerHTML;
      const msg = form.dataset;
      const setError = (input, text) => {
        const wrap = input.closest('.field');
        const err = document.getElementById(input.id + '-error');
        wrap.classList.toggle('is-invalid', !!text);
        input.setAttribute('aria-invalid', text ? 'true' : 'false');
        if (err) {
          err.textContent = text || '';
          err.hidden = !text;
        }
      };
      const validate = (input) => {
        const v = input.value.trim();
        if (input.required && !v) return msg.msgRequired;
        if (input.type === 'email' && v && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) return msg.msgEmail;
        return '';
      };
      const inputs = $$('.field__input', form);
      inputs.forEach((input) => {
        input.addEventListener('blur', () => { if (input.value) setError(input, validate(input)); });
        input.addEventListener('input', () => { if (input.getAttribute('aria-invalid') === 'true') setError(input, validate(input)); });
      });
      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        let firstBad = null;
        inputs.forEach((input) => {
          const err = validate(input);
          setError(input, err);
          if (err && !firstBad) firstBad = input;
        });
        if (firstBad) {
          firstBad.focus();
          return;
        }
        track('cta_click', { event_category: 'form', event_label: form.dataset.ctaLabel });
        submit.disabled = true;
        submit.setAttribute('aria-busy', 'true');
        submit.textContent = msg.msgSending;
        status.textContent = '';
        status.removeAttribute('data-state');
        try {
          const res = await fetch(form.getAttribute('action'), {
            method: 'POST',
            headers: { 'X-Requested-With': 'XMLHttpRequest' },
            body: new FormData(form),
          });
          const json = await res.json().catch(() => ({}));
          if (!res.ok || !json.ok) throw new Error(json.message || 'failed');
          status.dataset.state = 'ok';
          status.textContent = msg.msgOk;
          form.reset();
          track('form_submit', { event_category: 'form', event_label: form.dataset.ctaLabel });
          track('generate_lead', { event_category: 'form', event_label: form.dataset.ctaLabel });
        } catch (err) {
          status.dataset.state = 'error';
          status.textContent = msg.msgError;
        } finally {
          submit.disabled = false;
          submit.removeAttribute('aria-busy');
          submit.innerHTML = submitHTML;
        }
      });
    });
  };

  /* Curriculum: print to PDF */
  $$('[data-print]').forEach((b) => b.addEventListener('click', () => window.print()));

  /* CTA click tracking */
  document.addEventListener('click', (e) => {
    const el = e.target.closest('[data-cta]');
    if (!el) return;
    const label = el.dataset.cta;
    track('cta_click', { event_category: el.dataset.eventCategory || (/_nav_|_menu_/.test(label) ? 'nav' : 'cta'), event_label: label });
  });

  /* ------------------------------------------------------------------
     Filters + search (Work / Insights listings)
     ------------------------------------------------------------------ */
  const initFilters = () => {
    $$('[data-filter-root]').forEach((root) => {
      const chips = $$('[data-filter]', root);
      const search = $('[data-search]', root);
      const list = $('[data-filter-list]', root);
      const items = $$('[data-filter-item]', list);
      const empty = $('[data-filter-empty]', root);
      const live = $('[data-filter-live]', root);
      let active = 'all';
      const size = +list.dataset.pageSize || 0;
      const pager = $('[data-pagination]', root);
      const pageList = pager && $('[data-page-list]', pager);
      let page = 0;
      let matches = items;
      const render = (scroll) => {
        const pages = size ? Math.max(1, Math.ceil(matches.length / size)) : 1;
        page = Math.max(0, Math.min(page, pages - 1));
        items.forEach((it) => {
          it.hidden = true;
          it.removeAttribute('data-slot');
        });
        const slice = size ? matches.slice(page * size, page * size + size) : matches;
        slice.forEach((it, k) => {
          it.hidden = false;
          if (size) it.dataset.slot = String(k);
        });
        if (pager) {
          pager.hidden = pages < 2;
          pageList.innerHTML = '';
          for (let n = 0; n < pages; n++) {
            const li = document.createElement('li');
            const b = document.createElement('button');
            b.type = 'button';
            b.className = 'pagination__page';
            b.textContent = String(n + 1);
            b.setAttribute('aria-label', list.dataset.pageLabel.replace('{n}', n + 1));
            if (n === page) b.setAttribute('aria-current', 'page');
            b.addEventListener('click', () => {
              page = n;
              render(true);
            });
            li.appendChild(b);
            pageList.appendChild(li);
          }
          $('[data-page-prev]', pager).disabled = page === 0;
          $('[data-page-next]', pager).disabled = page >= pages - 1;
        }
        if (scroll) root.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
        if (hasGsap) ScrollTrigger.refresh();
      };
      if (pager) {
        $('[data-page-prev]', pager).addEventListener('click', () => {
          page--;
          render(true);
        });
        $('[data-page-next]', pager).addEventListener('click', () => {
          page++;
          render(true);
        });
      }
      const apply = () => {
        const q = search ? search.value.trim().toLowerCase() : '';
        matches = items.filter((it) => {
          const cats = (it.dataset.cats || '').split(' ');
          const okCat = active === 'all' || cats.includes(active);
          const okQ = !q || it.textContent.toLowerCase().includes(q);
          return okCat && okQ;
        });
        page = 0;
        render(false);
        list.classList.toggle('is-filtered', active !== 'all' || !!q);
        if (empty) empty.hidden = matches.length > 0;
        if (live) live.textContent = live.dataset.template.replace('{n}', matches.length);
      };
      apply();
      chips.forEach((chip) => {
        chip.addEventListener('click', () => {
          active = chip.dataset.filter;
          chips.forEach((c) => c.setAttribute('aria-pressed', String(c === chip)));
          apply();
        });
      });
      if (search) {
        search.addEventListener('input', apply);
        const form = search.closest('form');
        form && form.addEventListener('submit', (e) => e.preventDefault());
      }
    });
  };

  /* ------------------------------------------------------------------
     Reading progress (articles)
     ------------------------------------------------------------------ */
  const initProgress = () => {
    const bar = $('[data-progress]');
    const article = $('[data-progress-target]');
    if (!bar || !article) return;
    const update = () => {
      const r = article.getBoundingClientRect();
      const total = r.height - window.innerHeight;
      const p = Math.min(1, Math.max(0, -r.top / (total > 0 ? total : 1)));
      bar.style.transform = `scaleX(${p})`;
    };
    window.addEventListener('scroll', update, { passive: true });
    update();
  };

  /* ------------------------------------------------------------------
     Article demos carried over from the previous site
     ------------------------------------------------------------------ */
  const initDemos = () => {
    $$('.demo-swatch').forEach((demo) => {
      const box = $('.demo-swatch__box', demo);
      const value = $('.demo-swatch__value', demo);
      $$('.demo-swatch__btn', demo).forEach((btn) => {
        btn.addEventListener('click', () => {
          $$('.demo-swatch__btn', demo).forEach((b) => {
            b.classList.toggle('is-active', b === btn);
            b.setAttribute('aria-pressed', String(b === btn));
          });
          demo.closest('.article-body').style.setProperty('--demo-accent', btn.dataset.accent);
          if (value) value.textContent = btn.dataset.accent;
        });
      });
    });
  };

  /* ------------------------------------------------------------------
     Cookie consent (gates GA4 analytics_storage)
     ------------------------------------------------------------------ */
  const initConsent = () => {
    const KEY = 'cookie-consent';
    let stored = null;
    try { stored = localStorage.getItem(KEY); } catch (e) { /* storage blocked */ }
    const grant = () => typeof window.gtag === 'function' && window.gtag('consent', 'update', { analytics_storage: 'granted' });
    if (stored === 'granted') {
      grant();
      return;
    }
    if (stored === 'denied') return;
    const pt = lang === 'pt';
    const box = document.createElement('section');
    box.className = 'cookie';
    box.setAttribute('aria-label', pt ? 'Aviso de cookies' : 'Cookie notice');
    const p = document.createElement('p');
    p.textContent = (pt ? 'Este site usa cookies de analytics para entender como os visitantes usam o site. Veja a ' : 'This site uses analytics cookies to understand how visitors use it. See the ');
    const a = document.createElement('a');
    a.href = body.dataset.privacy || '/privacy-policy/';
    a.textContent = pt ? 'Política de Privacidade' : 'Privacy Policy';
    p.append(a, '.');
    const actions = document.createElement('div');
    actions.className = 'cookie__actions';
    const mk = (label, cls, value) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = `cookie__btn ${cls}`;
      b.textContent = label;
      b.addEventListener('click', () => {
        try { localStorage.setItem(KEY, value); } catch (e) { /* storage blocked */ }
        if (value === 'granted') grant();
        box.remove();
      });
      return b;
    };
    actions.append(mk(pt ? 'Recusar' : 'Decline', '', 'denied'), mk(pt ? 'Aceitar' : 'Accept', 'cookie__btn--accept', 'granted'));
    box.append(p, actions);
    body.appendChild(box);
  };

  /* ------------------------------------------------------------------
     Lightbox for diagrams, screens and gallery thumbnails
     ------------------------------------------------------------------ */
  const initLightbox = () => {
    const targets = $$('.cs-diagram img, .cs-screen-placeholder img, .case-split__media img');
    const thumbs = $$('.gallery-thumb');
    if (!targets.length && !thumbs.length) return;
    const pt = lang === 'pt';
    const dlg = document.createElement('dialog');
    dlg.className = 'lightbox';
    dlg.setAttribute('aria-label', pt ? 'Imagem ampliada' : 'Enlarged image');
    dlg.innerHTML = '<button class="lightbox__close" type="button"><svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M6 6l12 12M18 6 6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg></button><figure class="lightbox__figure"><img class="lightbox__img" alt=""><figcaption class="lightbox__caption"></figcaption></figure>';
    const closeBtn = $('.lightbox__close', dlg);
    closeBtn.setAttribute('aria-label', pt ? 'Fechar' : 'Close');
    const big = $('.lightbox__img', dlg);
    const cap = $('.lightbox__caption', dlg);
    body.appendChild(dlg);
    let opener = null;
    const open = (src, alt, trigger) => {
      opener = trigger;
      big.src = src;
      big.alt = alt || '';
      cap.textContent = alt || '';
      dlg.showModal();
      closeBtn.focus();
    };
    const close = () => {
      dlg.close();
    };
    dlg.addEventListener('close', () => {
      big.removeAttribute('src');
      opener && opener.focus();
    });
    closeBtn.addEventListener('click', close);
    dlg.addEventListener('click', (e) => { if (e.target === dlg) close(); });
    targets.forEach((im) => {
      if (im.closest('a, button')) return;
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'zoom-btn';
      btn.setAttribute('aria-label', (pt ? 'Ampliar imagem: ' : 'Enlarge image: ') + (im.alt || ''));
      im.parentNode.insertBefore(btn, im);
      btn.appendChild(im);
      btn.addEventListener('click', () => open(im.currentSrc || im.src, im.alt, btn));
    });
    thumbs.forEach((btn) => {
      const im = $('img', btn);
      btn.addEventListener('click', () => open(im.currentSrc || im.src, im.alt, btn));
    });
  };

  /* ------------------------------------------------------------------
     Language dropdown
     ------------------------------------------------------------------ */
  const initLangMenu = () => {
    const btn = $('[data-lang-toggle]');
    const panel = $('[data-lang-menu]');
    if (!btn || !panel) return;
    const place = () => {
      const r = btn.getBoundingClientRect();
      panel.style.right = `${Math.max(8, window.innerWidth - r.right)}px`;
    };
    const set = (open, focusBack) => {
      btn.setAttribute('aria-expanded', String(open));
      panel.hidden = !open;
      if (open) {
        place();
        const cur = $('[aria-current="true"]', panel) || $('a', panel);
        cur && cur.focus();
      } else if (focusBack) {
        btn.focus();
      }
    };
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (menu && menu.classList.contains('is-open')) setMenu(false);
      set(panel.hidden);
    });
    document.addEventListener('click', (e) => { if (!panel.hidden && !panel.contains(e.target)) set(false); });
    document.addEventListener('keydown', (e) => {
      if (panel.hidden) return;
      const items = $$('a', panel);
      const i = items.indexOf(document.activeElement);
      if (e.key === 'Escape') set(false, true);
      if (e.key === 'ArrowDown') { e.preventDefault(); items[(i + 1) % items.length].focus(); }
      if (e.key === 'ArrowUp') { e.preventDefault(); items[(i - 1 + items.length) % items.length].focus(); }
      if (e.key === 'Tab') set(false);
    });
    window.addEventListener('resize', () => { if (!panel.hidden) place(); });
    window.addEventListener('scroll', () => { if (!panel.hidden) set(false); }, { passive: true });
  };

  /* ------------------------------------------------------------------
     Boot
     ------------------------------------------------------------------ */
  const heroPlay = initHero();
  initReveals();
  initPageHeroParallax();
  initRotator();
  initCarousels();
  initCompanies();
  initAccordions();
  initQuotes();
  initToTop();
  initForms();
  initFilters();
  initProgress();
  initDemos();
  initLightbox();
  initLangMenu();
  initConsent();
  runIntro().then(() => {
    if (heroPlay) heroPlay();
    if (hasGsap) ScrollTrigger.refresh();
  });
  window.addEventListener('load', () => hasGsap && ScrollTrigger.refresh());
})();
