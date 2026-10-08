/* Motion — GSAP + Lenis.
   Focal: hero assembles. Scroll: work masks, stats count, footer signs.
   No generic fade-up. Clip, scale, count, magnetic. */
(function () {
  'use strict';

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (reduce || typeof gsap === 'undefined') {
    document.documentElement.classList.remove('has-motion');
    document.documentElement.classList.remove('has-card-mask');
    return;
  }

  /* Pre-hide cards via CSS until gsap.set owns the clip (no flash of finished cards). */
  document.documentElement.classList.add('has-card-mask');

  gsap.registerPlugin(ScrollTrigger);

  var EASE = 'expo.out';
  var CLIP_OPEN = 'inset(0% 0% 0% 0%)';

  /* Smooth scroll — desktop only. Touch keeps native inertia. */
  var lenis = null;
  if (fine && typeof Lenis !== 'undefined') {
    lenis = new Lenis({
      duration: 1.2,
      easing: function (t) { return Math.min(1, 1.001 - Math.pow(2, -10 * t)); },
      smoothWheel: true
    });
    lenis.on('scroll', function (e) {
      ScrollTrigger.update();
      var v = e && typeof e.velocity === 'number' ? Math.abs(e.velocity) : 0;
      window.__mqBoost = 1 + Math.min(1.8, v / 14);
    });
    gsap.ticker.add(function (time) { lenis.raf(time * 1000); });
    gsap.ticker.lagSmoothing(0);
    window.__lenis = lenis;
  }

  /* Scroll progress — the yellow rule is a map of where you are. */
  var bar = document.createElement('div');
  bar.className = 'scroll-progress';
  bar.setAttribute('aria-hidden', 'true');
  document.body.appendChild(bar);
  gsap.to(bar, {
    scaleX: 1,
    ease: 'none',
    scrollTrigger: { scrub: 0.15, start: 'top top', end: 'bottom bottom' }
  });

  /* Cursor — yellow core + lagging ring. Grows on anything you can hit. */
  if (fine) {
    document.documentElement.classList.add('has-cursor');
    var core = document.createElement('div');
    core.className = 'cursor';
    core.setAttribute('aria-hidden', 'true');
    var ring = document.createElement('div');
    ring.className = 'cursor__ring';
    ring.setAttribute('aria-hidden', 'true');
    document.body.appendChild(ring);
    document.body.appendChild(core);

    var tx = 0, ty = 0, cx = 0, cy = 0, rx = 0, ry = 0;
    window.addEventListener('pointermove', function (e) {
      tx = e.clientX;
      ty = e.clientY;
    }, { passive: true });

    gsap.ticker.add(function () {
      cx += (tx - cx) * 0.38;
      cy += (ty - cy) * 0.38;
      rx += (tx - rx) * 0.14;
      ry += (ty - ry) * 0.14;
      core.style.transform = 'translate3d(' + cx + 'px,' + cy + 'px,0)';
      ring.style.transform = 'translate3d(' + rx + 'px,' + ry + 'px,0)';
    });

    document.addEventListener('pointerover', function (e) {
      var work = e.target.closest('.hp-work .work-card, .page-work .work-card, .page-blog .post-card');
      var acc = e.target.closest('.hp-acc__item');
      var hit = e.target.closest('a, button, .work-card, .post-card, .filter-btn, .hp-acc__btn, .lead-field__input');
      core.classList.toggle('is-work', Boolean(work));
      core.classList.toggle('is-acc', Boolean(acc) && !work);
      if (acc && !work) {
        var img = acc.querySelector('.hp-acc__media img');
        var url = img ? (img.currentSrc || img.src) : '';
        if (url) core.style.setProperty('--cursor-img', 'url("' + url + '")');
      } else {
        core.style.removeProperty('--cursor-img');
      }
      ring.classList.toggle('is-hide', Boolean(work) || Boolean(acc));
      ring.classList.toggle('is-grow', Boolean(hit) && !work && !acc);
    });
  }

  /* Magnetic CTAs — the control leans toward the pointer, then snaps back. */
  if (fine) {
    document.querySelectorAll('.nav-cta, .btn-shiny, .btn-ghost-glow, .lead-form__submit').forEach(function (el) {
      el.addEventListener('pointermove', function (e) {
        var r = el.getBoundingClientRect();
        var x = e.clientX - (r.left + r.width / 2);
        var y = e.clientY - (r.top + r.height / 2);
        gsap.to(el, { x: x * 0.28, y: y * 0.28, duration: 0.35, ease: 'power3.out', overwrite: true });
      });
      el.addEventListener('pointerleave', function () {
        gsap.to(el, { x: 0, y: 0, duration: 0.55, ease: EASE, overwrite: true });
      });
    });
  }

  function clipIn(el, from, opts) {
    if (!el) return;
    gsap.fromTo(el, { clipPath: from }, Object.assign({
      clipPath: CLIP_OPEN,
      duration: 0.95,
      ease: EASE
    }, opts || {}));
  }

  /* Focal: hero assembles in reading order — role, arrows, portrait, wordmark, ticker. */
  var hero = document.querySelector('.hp-hero');
  if (hero) {
    var role = hero.querySelector('.hp-hero__role');
    var arrows = hero.querySelector('.hp-hero__arrows');
    var portrait = hero.querySelector('.hp-hero__portrait');
    var wordmark = hero.querySelector('.hp-hero__wordmark');
    var ticker = hero.querySelector('.hp-hero__ticker');
    var tl = gsap.timeline({ defaults: { ease: EASE }, delay: 0.06 });
    if (role) tl.to(role, { clipPath: CLIP_OPEN, duration: 0.9 }, 0);
    if (arrows) tl.to(arrows, { clipPath: CLIP_OPEN, y: 0, yPercent: 0, duration: 0.95 }, 0.1);
    if (portrait) tl.to(portrait, { scale: 1, duration: 1.35 }, 0.06);
    if (wordmark) tl.to(wordmark, { clipPath: CLIP_OPEN, duration: 1.1 }, 0.18);
    if (ticker) tl.to(ticker, { clipPath: CLIP_OPEN, duration: 0.75 }, 0.42);
    tl.add(function () {
      document.documentElement.classList.remove('has-motion');
      gsap.set([role, arrows, wordmark, ticker].filter(Boolean), { clearProps: 'clipPath' });
    });

    /* After assemble, the portrait yields to the work below — scroll is a handoff.
       Compact viewports keep the stacked hero still; parallax would drive the
       wordmark into the ticker. */
    var compact = window.matchMedia('(max-width: 899px)').matches;
    if (compact && wordmark) {
      gsap.set(wordmark, { y: 0, yPercent: 0, clearProps: 'transform' });
    }
    if (portrait && !compact) {
      gsap.to(portrait, {
        yPercent: 14,
        ease: 'none',
        scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: 0.4 }
      });
    }
    if (wordmark && !compact) {
      gsap.to(wordmark, {
        yPercent: -8,
        ease: 'none',
        scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: 0.5 }
      });
    }
    if (arrows && !compact) {
      gsap.to(arrows, {
        yPercent: 18,
        ease: 'none',
        scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: 0.6 }
      });
    }
  } else if (!document.querySelector('.work-hero, .blog-hero')) {
    document.documentElement.classList.remove('has-motion');
  }

  /* Listing pages: drop the home-only pre-hide class immediately. */
  if (document.querySelector('.work-hero, .blog-hero')) {
    document.documentElement.classList.remove('has-motion');
  }

  /* Hard failsafe — never leave content clipped if a tween stalls. */
  window.setTimeout(function () {
    document.documentElement.classList.remove('has-motion');
  }, 2200);

  /* Work title — clips up so the section names itself as you arrive. */
  var workTitle = document.querySelector('.hp-work__title');
  if (workTitle) {
    clipIn(workTitle, 'inset(100% 0 0 0)', {
      duration: 0.95,
      scrollTrigger: { trigger: workTitle, start: 'top 85%' }
    });
  }

  /* Listing heroes (Work / Insights) — assemble without CSS pre-hide.
   Pre-clip caused blank flashes when CDN/GSAP lagged. fromTo owns the reveal. */
  function assembleListingHero(root, titleSel, descSel, markSel, watermarkSel) {
    if (!root) return;
    var title = root.querySelector(titleSel);
    var desc = root.querySelector(descSel);
    var mark = markSel ? root.querySelector(markSel) : null;
    var watermark = watermarkSel ? root.querySelector(watermarkSel) : null;
    var tl = gsap.timeline({ defaults: { ease: EASE }, delay: 0.05 });
    if (watermark) tl.fromTo(watermark, { opacity: 0.15, scale: 1.04 }, { opacity: 1, scale: 1, duration: 1.1 }, 0);
    if (title) tl.fromTo(title, { clipPath: 'inset(100% 0 0 0)' }, { clipPath: CLIP_OPEN, duration: 0.95 }, 0.08);
    if (desc) tl.fromTo(desc, { clipPath: 'inset(100% 0 0 0)' }, { clipPath: CLIP_OPEN, duration: 0.8 }, 0.22);
    if (mark) tl.fromTo(mark, { scale: 0.92, opacity: 0.5 }, { scale: 1, opacity: 1, duration: 1.2 }, 0.12);
    tl.add(function () {
      gsap.set([title, desc].filter(Boolean), { clearProps: 'clipPath' });
    });
  }
  assembleListingHero(
    document.querySelector('.work-hero'),
    '.work-hero__title',
    '.work-hero__desc',
    '.work-hero__mark',
    '.work-hero__watermark'
  );
  assembleListingHero(
    document.querySelector('.blog-hero'),
    '.blog-hero__title',
    '.blog-hero__desc',
    '.blog-hero__mark',
    '.blog-hero__watermark'
  );

  /* Toolbar chips — arrive as a short stagger after the hero. */
  var toolbarChips = document.querySelectorAll('.work-toolbar .filter-btn, .blog-toolbar .filter-btn');
  if (toolbarChips.length) {
    gsap.fromTo(toolbarChips, { y: 16, opacity: 0 }, {
      y: 0,
      opacity: 1,
      duration: 0.55,
      stagger: 0.05,
      ease: EASE,
      delay: 0.35,
      clearProps: 'transform,opacity'
    });
  }
  var blogSearch = document.querySelector('.blog-search');
  if (blogSearch) {
    gsap.fromTo(blogSearch, { clipPath: 'inset(0 0 100% 0)' }, {
      clipPath: CLIP_OPEN,
      duration: 0.7,
      delay: 0.45,
      ease: EASE,
      onComplete: function () { gsap.set(blogSearch, { clearProps: 'clipPath' }); }
    });
  }

  /* Cards — mask until scroll. immediateRender:false so they stay clipped
     until the trigger, instead of resolving while the hero is still on screen. */
  function maskCard(card, i) {
    var img = card.querySelector('.work-card__image img, .post-card__img img');
    var title = card.querySelector('.work-card__title, .post-card__title');
    var desc = card.querySelector('.work-card__desc, .post-card__excerpt');
    var delay = (i % 2) * 0.1;
    var st = { trigger: card, start: 'top 90%', once: true };

    if (img) {
      gsap.set(img, { clipPath: 'inset(100% 0% 0% 0%)', scale: 1.12 });
      gsap.to(img, {
        clipPath: CLIP_OPEN,
        scale: 1,
        duration: 1.15,
        delay: delay,
        ease: EASE,
        overwrite: true,
        immediateRender: false,
        scrollTrigger: st,
        onComplete: function () { gsap.set(img, { clearProps: 'clipPath,transform' }); }
      });
    }
    if (title) {
      gsap.set(title, { clipPath: 'inset(100% 0 0 0)' });
      gsap.to(title, {
        clipPath: CLIP_OPEN,
        duration: 0.8,
        delay: delay + 0.14,
        ease: EASE,
        immediateRender: false,
        scrollTrigger: st,
        onComplete: function () { gsap.set(title, { clearProps: 'clipPath' }); }
      });
    }
    if (desc) {
      gsap.set(desc, { clipPath: 'inset(100% 0 0 0)' });
      gsap.to(desc, {
        clipPath: CLIP_OPEN,
        duration: 0.75,
        delay: delay + 0.22,
        ease: EASE,
        immediateRender: false,
        scrollTrigger: st,
        onComplete: function () { gsap.set(desc, { clearProps: 'clipPath' }); }
      });
    }
  }

  function isWorkCardOn(card) {
    return card.style.display !== 'none' && card.getAttribute('aria-hidden') !== 'true' && !card.hasAttribute('hidden');
  }

  function bindCardTilt(card) {
    if (!fine || card.dataset.tiltBound) return;
    var img = card.querySelector('.work-card__image img, .post-card__img img');
    var frame = card.querySelector('.work-card__image, .post-card__img');
    if (!img || !frame) return;
    card.dataset.tiltBound = '1';
    frame.addEventListener('pointermove', function (e) {
      var r = frame.getBoundingClientRect();
      var x = (e.clientX - r.left) / r.width - 0.5;
      var y = (e.clientY - r.top) / r.height - 0.5;
      gsap.to(img, { x: x * 28, y: y * 20, scale: 1.08, duration: 0.55, ease: 'power3.out', overwrite: 'auto' });
    });
    frame.addEventListener('pointerleave', function () {
      gsap.to(img, { x: 0, y: 0, scale: 1, duration: 0.7, ease: EASE, overwrite: 'auto' });
    });
  }

  function revealCards(selector) {
    var visible = 0;
    document.querySelectorAll(selector).forEach(function (card) {
      if (!isWorkCardOn(card)) return;
      if (card.dataset.masked === '1') {
        bindCardTilt(card);
        return;
      }
      card.dataset.masked = '1';
      maskCard(card, visible);
      bindCardTilt(card);
      visible += 1;
    });
  }

  revealCards('.hp-work .work-card');
  revealCards('.page-work .work-card');
  revealCards('.page-blog .post-card');
  /* Inline gsap clips are set — drop the CSS pre-mask so clearProps can finish clean. */
  document.documentElement.classList.remove('has-card-mask');

  /* After filter/search swaps, remask newly shown cards and refresh triggers. */
  function onListingChange() {
    window.setTimeout(function () {
      revealCards('.page-work .work-card');
      revealCards('.page-blog .post-card');
      revealCards('.hp-work .work-card');
      ScrollTrigger.refresh();
    }, 60);
  }
  document.querySelectorAll('.filter-bar .filter-btn').forEach(function (btn) {
    btn.addEventListener('click', onListingChange);
  });
  var searchInput = document.getElementById('blog-search-input');
  if (searchInput) searchInput.addEventListener('input', onListingChange);

  /* Next/prev: the pair slides as a plane. Incoming cards are already formed. */
  window.__workSlide = function (dir, prepare, commit) {
    var grid = document.getElementById('home-work-grid');
    if (!grid) {
      prepare();
      commit();
      return;
    }

    var outgoing = Array.prototype.filter.call(grid.querySelectorAll('.work-card'), isWorkCardOn);
    if (!outgoing.length) {
      prepare();
      commit();
      return;
    }

    var gridRect = grid.getBoundingClientRect();
    var snaps = outgoing.map(function (card) {
      var r = card.getBoundingClientRect();
      return { card: card, top: r.top - gridRect.top, left: r.left - gridRect.left, width: r.width };
    });

    grid.classList.add('is-sliding');
    grid.setAttribute('aria-busy', 'true');
    grid.style.minHeight = gridRect.height + 'px';

    snaps.forEach(function (s) {
      gsap.set(s.card, {
        position: 'absolute',
        top: s.top,
        left: s.left,
        width: s.width,
        zIndex: 2,
        margin: 0
      });
    });

    prepare();

    var incoming = Array.prototype.filter.call(grid.querySelectorAll('.work-card'), function (card) {
      return card.style.display !== 'none' && outgoing.indexOf(card) === -1;
    });

    incoming.forEach(function (card) {
      var bits = card.querySelectorAll('.work-card__image img, .work-card__title, .work-card__desc');
      gsap.killTweensOf(bits);
      gsap.set(bits, { clipPath: 'none', scale: 1, x: 0, y: 0, clearProps: 'clipPath' });
    });

    var dx = dir * gridRect.width;
    gsap.set(incoming, { x: dx, zIndex: 1 });

    var done = function () {
      commit();
      gsap.set(outgoing, { clearProps: 'position,top,left,width,zIndex,margin,transform,x' });
      gsap.set(incoming, { clearProps: 'transform,x,zIndex' });
      grid.style.minHeight = '';
      grid.classList.remove('is-sliding');
      grid.setAttribute('aria-busy', 'false');
    };

    if (!incoming.length) {
      gsap.to(outgoing, {
        x: -dx,
        duration: 0.45,
        ease: 'power3.in',
        onComplete: done
      });
      return;
    }

    gsap.timeline({ defaults: { duration: 0.58, ease: 'power3.inOut' }, onComplete: done })
      .to(outgoing, { x: -dx, stagger: dir > 0 ? 0.05 : -0.05 }, 0)
      .to(incoming, { x: 0, stagger: dir > 0 ? 0.05 : -0.05 }, 0);
  };

  /* Intro — lines clip up; the yellow-capped panel wipes open. */
  document.querySelectorAll('.hp-intro__line').forEach(function (line, i) {
    clipIn(line, 'inset(100% 0 0 0)', {
      duration: 0.9,
      delay: i * 0.1,
      clearProps: 'clipPath',
      scrollTrigger: { trigger: '.hp-intro__headline', start: 'top 80%' }
    });
  });
  var introPanel = document.querySelector('.hp-intro__panel');
  if (introPanel) {
    clipIn(introPanel, 'inset(0 0 100% 0)', {
      duration: 1.15,
      scrollTrigger: { trigger: introPanel, start: 'top 82%' }
    });
  }

  /* Stats — numbers run to their claim when the yellow band hits. */
  document.querySelectorAll('.hp-stats__num').forEach(function (el) {
    var raw = el.textContent.trim();
    var prefix = raw.charAt(0) === '+' || raw.charAt(0) === '-' ? raw.charAt(0) : '';
    var core = prefix ? raw.slice(1) : raw;
    var suffix = core.replace(/[\d.]+/, '');
    var end = parseFloat(core);
    if (!isFinite(end)) return;
    var obj = { n: 0 };
    el.textContent = prefix + '0' + suffix;
    gsap.to(obj, {
      n: end,
      duration: 1.5,
      ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 85%' },
      onUpdate: function () {
        var n = suffix.indexOf('%') > -1 ? obj.n.toFixed(0) : Math.round(obj.n);
        el.textContent = prefix + n + suffix;
      }
    });
  });
  document.querySelectorAll('.hp-stats__label').forEach(function (label, i) {
    clipIn(label, 'inset(100% 0 0 0)', {
      duration: 0.7,
      delay: i * 0.06,
      scrollTrigger: { trigger: '.hp-stats', start: 'top 80%' }
    });
  });

  /* Services title — two lines clip in. Dump: League Gothic. Never leave clipped. */
  document.querySelectorAll('.hp-services__line').forEach(function (line, i) {
    gsap.set(line, { clipPath: 'inset(100% 0 0 0)' });
    gsap.to(line, {
      clipPath: CLIP_OPEN,
      duration: 0.9,
      delay: i * 0.1,
      ease: EASE,
      immediateRender: false,
      scrollTrigger: { trigger: '.hp-services__title', start: 'top 82%', once: true },
      onComplete: function () { gsap.set(line, { clearProps: 'clipPath' }); }
    });
  });

  /* Accordion media — the image is a wipe, not a pop. */
  var openMedia = document.querySelector('.hp-acc__item.is-open .hp-acc__media');
  if (openMedia) {
    clipIn(openMedia, 'inset(0 100% 0 0)', {
      duration: 0.9,
      scrollTrigger: { trigger: '.hp-acc', start: 'top 75%' }
    });
  }
  document.querySelectorAll('.hp-acc__btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var item = btn.closest('.hp-acc__item');
      if (!item) return;
      window.requestAnimationFrame(function () {
        var media = item.querySelector('.hp-acc__media');
        if (!media || !item.classList.contains('is-open')) return;
        gsap.fromTo(media, { clipPath: 'inset(0 100% 0 0)' }, {
          clipPath: CLIP_OPEN,
          duration: 0.85,
          ease: EASE,
          overwrite: true
        });
      });
    });
  });

  /* Case study cover — same clip language as listing heroes. */
  var csCover = document.querySelector('.cs-cover');
  if (csCover) {
    document.documentElement.classList.remove('has-motion');
    var csTitle = csCover.querySelector('.cs-cover__title, .cs-hero__title, h1');
    var csMedia = csCover.querySelector('.cs-cover__media img, .cs-cover__image img, img');
    var csDek = csCover.querySelector('.cs-cover__dek, .cs-cover__desc');
    var csTl = gsap.timeline({ defaults: { ease: EASE }, delay: 0.05 });
    if (csMedia) {
      csTl.fromTo(csMedia, { clipPath: 'inset(0 0 100% 0)', scale: 1.08 }, {
        clipPath: CLIP_OPEN, scale: 1, duration: 1.15
      }, 0);
    }
    if (csTitle) {
      csTl.fromTo(csTitle, { clipPath: 'inset(100% 0 0 0)' }, {
        clipPath: CLIP_OPEN, duration: 0.95
      }, 0.12);
    }
    if (csDek) {
      csTl.fromTo(csDek, { clipPath: 'inset(100% 0 0 0)' }, {
        clipPath: CLIP_OPEN, duration: 0.8
      }, 0.24);
    }
    csTl.add(function () {
      gsap.set([csTitle, csDek, csMedia].filter(Boolean), { clearProps: 'clipPath' });
    });
    document.querySelectorAll('.cs-cover-stat, .cs-cover__stat, .cs-stat').forEach(function (el, i) {
      clipIn(el, 'inset(100% 0 0 0)', {
        duration: 0.7,
        delay: i * 0.06,
        scrollTrigger: { trigger: el, start: 'top 90%' }
      });
    });
  }

  /* Generic page titles (resume, about, legal) — one clip in. */
  if (!document.querySelector('.hp-hero, .work-hero, .blog-hero, .cs-cover')) {
    var pageTitle = document.querySelector('main h1');
    if (pageTitle) {
      clipIn(pageTitle, 'inset(100% 0 0 0)', {
        duration: 0.9,
        delay: 0.05,
        clearProps: 'clipPath'
      });
    }
  }

  /* Contact — the ask clips in as you arrive. */
  var ask = document.querySelector('.lead-cta-section__title');
  if (ask) {
    clipIn(ask, 'inset(100% 0 0 0)', {
      duration: 0.95,
      scrollTrigger: { trigger: ask, start: 'top 82%' }
    });
  }

  /* Footer mark — the name writes itself as you leave. */
  var mark = document.querySelector('.footer__mark');
  if (mark) {
    clipIn(mark, 'inset(0 100% 0 0)', {
      duration: 1.25,
      scrollTrigger: { trigger: mark, start: 'top 92%' }
    });
  }

  function refreshST() {
    ScrollTrigger.refresh();
  }
  window.addEventListener('load', refreshST);
  if (document.readyState === 'complete') refreshST();
  [280, 600].forEach(function (ms) { setTimeout(refreshST, ms); });
})();
