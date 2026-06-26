/* ==========================================================================
   main.js: Interactive behaviors · Cristofolini Portfolio (DS v4)
   ========================================================================== */

(function () {
  'use strict';

  /* --------------------------------------------------------------------------
     2. Current page nav highlight
     -------------------------------------------------------------------------- */
  function normalizePath(pathname) {
    const withoutIndex = pathname.replace(/index\.html$/i, '');
    const trimmed = withoutIndex.replace(/\/+$/, '');
    return trimmed || '/';
  }

  const currentPath = normalizePath(window.location.pathname);
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;

    const resolved = new URL(href, window.location.href);
    const linkPath = normalizePath(resolved.pathname);

    if (linkPath === currentPath) {
      link.setAttribute('aria-current', 'page');
    } else {
      link.removeAttribute('aria-current');
    }
  });

  /* --------------------------------------------------------------------------
     2b. Mobile nav toggle
     -------------------------------------------------------------------------- */
  const navEl = document.querySelector('.nav');
  const navToggle = document.querySelector('.nav-toggle');
  if (navEl && navToggle) {
    navToggle.addEventListener('click', () => {
      const isOpen = navEl.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });
    navEl.querySelectorAll('.nav-links a, .nav-cta').forEach(link => {
      link.addEventListener('click', () => {
        navEl.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && navEl.classList.contains('is-open')) {
        navEl.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.focus();
      }
    });
  }

  /* --------------------------------------------------------------------------
     3. Intersection Observer — scroll reveal
        Watches both .sr (DS v4 → adds .on) and .reveal (compat → adds .is-visible)
     -------------------------------------------------------------------------- */
  const revealObserver = new IntersectionObserver(
    entries => entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('is-visible', 'on');
        revealObserver.unobserve(e.target);
      }
    }),
    { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
  );

  document.querySelectorAll('.sr, .reveal').forEach(el => revealObserver.observe(el));

  /* --------------------------------------------------------------------------
     4. Infinite marquees — seamless loop with dynamic distance
     -------------------------------------------------------------------------- */
  (function initMarquees() {
    const marquees = Array.from(document.querySelectorAll('.mq'));
    if (!marquees.length) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    marquees.forEach((marquee) => {
      const track = marquee.querySelector('.mq-tr');
      if (!track || track.dataset.mqReady === 'true') return;

      const speed = parseFloat(marquee.dataset.marqueeSpeed || '90');
      const direction = (marquee.dataset.marqueeDirection || 'normal').toLowerCase();
      const startRatioAttr = parseFloat(marquee.dataset.marqueeStart || '');
      const startRatio = Number.isFinite(startRatioAttr) ? Math.min(0.95, Math.max(0.05, startRatioAttr)) : 0.18;
      const sourceItems = Array.from(track.children).map((item) => item.cloneNode(true));
      if (!sourceItems.length) return;

      let setWidth = Math.max(1, track.scrollWidth / 2);
      let offset = 0;
      let paused = false;
      let rafId = 0;
      let lastTime = 0;
      let revealed = false;

      const normalizeOffset = (value) => {
        const mod = value % setWidth;
        return mod < 0 ? mod + setWidth : mod;
      };

      const buildTrack = () => {
        const prevWidth = setWidth;
        const progress = prevWidth > 0 ? offset / prevWidth : startRatio;

        track.textContent = '';
        sourceItems.forEach((item) => {
          track.appendChild(item.cloneNode(true));
        });

        const oneSetWidth = Math.max(1, track.scrollWidth);
        const minSetWidth = Math.max(oneSetWidth, marquee.clientWidth * 1.08);
        const repeatCount = Math.max(1, Math.ceil(minSetWidth / oneSetWidth));

        if (repeatCount > 1) {
          track.textContent = '';
          for (let i = 0; i < repeatCount; i++) {
            sourceItems.forEach((item) => {
              track.appendChild(item.cloneNode(true));
            });
          }
        }

        const logicalSet = Array.from(track.children);
        logicalSet.forEach((item) => {
          const clone = item.cloneNode(true);
          clone.setAttribute('aria-hidden', 'true');
          track.appendChild(clone);
        });

        setWidth = Math.max(1, track.scrollWidth / 2);
        offset = normalizeOffset(progress * setWidth);
      };

      const recomputeWidth = () => {
        buildTrack();
      };

      const render = () => {
        const x = -offset;
        track.style.transform = `translate3d(${x}px,0,0)`;
      };

      const tick = (time) => {
        if (!lastTime) lastTime = time;
        const dt = (time - lastTime) / 1000;
        lastTime = time;

        if (!paused && !prefersReducedMotion) {
          const signedSpeed = direction === 'reverse' ? -speed : speed;
          offset = normalizeOffset(offset + signedSpeed * dt);
          render();
        }

        rafId = window.requestAnimationFrame(tick);
      };

      const scheduleRecompute = () => {
        if (rafId) {
          window.cancelAnimationFrame(rafId);
          rafId = 0;
        }
        recomputeWidth();
        render();

        if (!revealed) {
          marquee.classList.add('is-ready');
          revealed = true;
        }

        lastTime = 0;
        rafId = window.requestAnimationFrame(tick);
      };

      marquee.addEventListener('mouseenter', () => { paused = true; });
      marquee.addEventListener('mouseleave', () => { paused = false; });

      buildTrack();
      offset = normalizeOffset(setWidth * startRatio);
      render();

      window.addEventListener('resize', scheduleRecompute);

      if ('ResizeObserver' in window) {
        const resizeObserver = new ResizeObserver(scheduleRecompute);
        resizeObserver.observe(track);
      }

      track.querySelectorAll('img').forEach((img) => {
        if (!img.complete) {
          img.addEventListener('load', scheduleRecompute, { once: true });
          img.addEventListener('error', scheduleRecompute, { once: true });
          return;
        }
        if (typeof img.decode === 'function') {
          img.decode().then(scheduleRecompute).catch(() => {});
        }
      });

      if (document.fonts && typeof document.fonts.ready === 'object') {
        document.fonts.ready.then(scheduleRecompute).catch(() => {});
      }

      rafId = window.requestAnimationFrame(tick);

      track.dataset.mqReady = 'true';
    });
  })();

  /* --------------------------------------------------------------------------
     5. Cases Carousel
     -------------------------------------------------------------------------- */
  const carousel = document.querySelector('.carousel');
  if (carousel) {
    const track   = carousel.querySelector('.carousel__track');
    const slides  = Array.from(track.querySelectorAll('.carousel__slide'));
    const btnPrev = carousel.querySelector('.carousel__btn--prev');
    const btnNext = carousel.querySelector('.carousel__btn--next');
    const statusEl = carousel.querySelector('.carousel__status');
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (slides.length >= 2) {
      const firstClone = slides[0].cloneNode(true);
      const lastClone  = slides[slides.length - 1].cloneNode(true);
      firstClone.setAttribute('aria-hidden', 'true');
      lastClone.setAttribute('aria-hidden', 'true');
      track.appendChild(firstClone);
      track.insertBefore(lastClone, slides[0]);

      const allSlides = Array.from(track.querySelectorAll('.carousel__slide'));
      let current = 1;
      let isTransitioning = false;
      let loopTimer = null;

      const TRANSITION_MS = parseFloat(
        getComputedStyle(document.documentElement).getPropertyValue('--duration-slow')
      ) || 600;

      function getSlideWidth() {
        const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
        return allSlides[0].getBoundingClientRect().width + gap;
      }

      function jumpTo(index) {
        track.style.transition = 'none';
        track.getBoundingClientRect(); // flush
        track.style.transform = `translateX(${-index * getSlideWidth()}px)`;
        current = index;
        allSlides.forEach(s => { s.style.transition = 'none'; });
        updateOpacity();
        track.getBoundingClientRect(); // flush
        allSlides.forEach(s => { s.style.transition = ''; });
      }

      function goTo(index) {
        if (isTransitioning) return;
        isTransitioning = true;
        clearTimeout(loopTimer);

        track.style.transition = reduceMotion
          ? 'none'
          : 'transform var(--duration-slow) var(--ease-in-out)';
        track.style.transform = `translateX(${-index * getSlideWidth()}px)`;
        current = index;
        updateOpacity();

        const delay = reduceMotion ? 0 : TRANSITION_MS + 32;
        loopTimer = setTimeout(() => {
          if (current === 0)                         jumpTo(allSlides.length - 2);
          else if (current === allSlides.length - 1) jumpTo(1);
          isTransitioning = false;
        }, delay);
      }

      function setSlideInteractivity(slide, isVisible) {
        const focusables = slide.querySelectorAll('a, button, input, select, textarea, [tabindex]');
        focusables.forEach((el) => {
          if (!isVisible) {
            if (!el.hasAttribute('data-prev-tabindex')) {
              el.setAttribute('data-prev-tabindex', el.getAttribute('tabindex') || '');
            }
            el.setAttribute('tabindex', '-1');
            return;
          }

          if (el.hasAttribute('data-prev-tabindex')) {
            const prev = el.getAttribute('data-prev-tabindex');
            if (prev) el.setAttribute('tabindex', prev);
            else el.removeAttribute('tabindex');
            el.removeAttribute('data-prev-tabindex');
          }
        });
      }

      function updateOpacity() {
        allSlides.forEach((s, i) => {
          s.style.opacity   = i === current ? '1' : '0.4';
          s.style.transform = i === current ? 'scale(1)' : 'scale(0.96)';
        });

        const visibleIndex = current === 0
          ? slides.length
          : (current === allSlides.length - 1 ? 1 : current);

        allSlides.forEach((slide, i) => {
          const logicalIndex = i === 0
            ? slides.length
            : (i === allSlides.length - 1 ? 1 : i);
          const isVisible = i === current;
          slide.setAttribute('aria-hidden', String(!isVisible));
          setSlideInteractivity(slide, isVisible);

          const cardLink = slide.querySelector('a.carousel-card');
          const titleEl = slide.querySelector('.carousel-card__title');
          if (cardLink) {
            const title = titleEl ? titleEl.textContent.trim() : 'Project';
            cardLink.setAttribute('aria-label', `Case study ${logicalIndex} of ${slides.length}: ${title}`);
            if (isVisible) cardLink.setAttribute('aria-current', 'true');
            else cardLink.removeAttribute('aria-current');
          }
        });

        if (statusEl) {
          statusEl.textContent = `Case study ${visibleIndex} of ${slides.length}`;
        }
      }

      jumpTo(1);

      if (btnNext) btnNext.addEventListener('click', () => goTo(current + 1));
      if (btnPrev) btnPrev.addEventListener('click', () => goTo(current - 1));

      carousel.addEventListener('keydown', e => {
        if (e.key === 'ArrowRight') {
          e.preventDefault();
          btnNext && btnNext.click();
        }
        if (e.key === 'ArrowLeft') {
          e.preventDefault();
          btnPrev && btnPrev.click();
        }
        if (e.key === 'Home') {
          e.preventDefault();
          goTo(1);
        }
        if (e.key === 'End') {
          e.preventDefault();
          goTo(slides.length);
        }
      });

      let dragStartX = 0, wasDragged = false;
      track.addEventListener('pointerdown', e => { dragStartX = e.clientX; wasDragged = false; });
      track.addEventListener('pointerup', e => {
        const delta = e.clientX - dragStartX;
        if (Math.abs(delta) > 40) {
          wasDragged = true;
          delta < 0 ? btnNext && btnNext.click() : btnPrev && btnPrev.click();
        }
      });
      track.addEventListener('pointercancel', () => { wasDragged = false; });
      track.addEventListener('click', e => { if (wasDragged) { e.preventDefault(); wasDragged = false; } });
      window.addEventListener('resize', () => goTo(current, false));
    } else {
      if (btnPrev) btnPrev.style.display = 'none';
      if (btnNext) btnNext.style.display = 'none';
    }
  }

  /* --------------------------------------------------------------------------
      6. Service items — hover reveal description
     -------------------------------------------------------------------------- */
  document.querySelectorAll('.service-item').forEach(item => {
    const description = item.querySelector('.service-item__desc');

    function setOpen(isOpen) {
      item.classList.toggle('is-open', isOpen);
      item.setAttribute('aria-expanded', String(isOpen));
      if (description) {
        description.setAttribute('aria-hidden', String(!isOpen));
      }
    }

    setOpen(false);

    item.addEventListener('mouseenter', () => setOpen(true));
    item.addEventListener('mouseleave', () => setOpen(false));
    item.addEventListener('focusin', () => setOpen(true));
    item.addEventListener('focusout', (event) => {
      const nextTarget = event.relatedTarget;
      if (!nextTarget || !item.contains(nextTarget)) {
        setOpen(false);
      }
    });
    item.addEventListener('click', () => {
      setOpen(item.getAttribute('aria-expanded') !== 'true');
    });
    item.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        setOpen(item.getAttribute('aria-expanded') !== 'true');
      }
      if (event.key === 'Escape') {
        setOpen(false);
      }
    });
  });

    /* --------------------------------------------------------------------------
        6b. Service tabs — click to reveal panel
       -------------------------------------------------------------------------- */
    const serviceTabs = document.querySelectorAll('.service-tab');
    const servicePanels = document.querySelectorAll('.service-panel');

    serviceTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const controlsId = tab.getAttribute('aria-controls');
        const targetPanel = document.getElementById(controlsId);

        serviceTabs.forEach(t => {
          t.classList.remove('service-tab--active');
          t.setAttribute('aria-selected', 'false');
        });

        servicePanels.forEach(p => {
          p.classList.remove('service-panel--active');
        });

        tab.classList.add('service-tab--active');
        tab.setAttribute('aria-selected', 'true');

        if (targetPanel) {
          targetPanel.classList.add('service-panel--active');
        }
      });
    });

    // arrow-key roving tabindex for ARIA tablist pattern
    serviceTabs.forEach((tab, index) => {
      tab.addEventListener('keydown', (e) => {
        let nextTab;
        if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
          e.preventDefault();
          nextTab = serviceTabs[index + 1] || serviceTabs[0];
        } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
          e.preventDefault();
          nextTab = serviceTabs[index - 1] || serviceTabs[serviceTabs.length - 1];
        }
        if (nextTab) {
          nextTab.click();
          nextTab.focus();
        }
      });
    });

  /* --------------------------------------------------------------------------
      7. Contact form
     -------------------------------------------------------------------------- */
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    const nameField    = document.getElementById('field-name');
    const emailField   = document.getElementById('field-email');
    const messageField = document.getElementById('field-message');
    const submitBtn    = contactForm.querySelector('.form-submit');
    const successEl    = document.getElementById('form-success');
    const errorEl      = document.getElementById('form-error-msg');

    function showSendFailure(message) {
      if (!errorEl) return;
      errorEl.textContent = '';
      errorEl.appendChild(document.createTextNode(message + ' Or email me directly at '));
      const emailBtn = document.querySelector('[data-email]');
      if (emailBtn) {
        const addr = `${emailBtn.dataset.user}@${emailBtn.dataset.domain}.${emailBtn.dataset.tld}`;
        const link = document.createElement('a');
        link.href = `mailto:${addr}`;
        link.textContent = addr;
        link.style.color = 'var(--y)';
        link.style.textDecoration = 'underline';
        errorEl.appendChild(link);
        errorEl.appendChild(document.createTextNode('.'));
      }
      errorEl.style.display = 'block';
    }

    function validateEmail(v) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
    }

    function setError(field, show) {
      if (!field) return;
      const wrapper = field.closest('.form-field');
      if (wrapper) {
        wrapper.classList.toggle('has-error', show);
        const fieldError = wrapper.querySelector('.form-error');
        if (fieldError) {
          fieldError.style.display = show ? 'block' : 'none';
        }
      }
      field.setAttribute('aria-invalid', String(show));
    }

    function clearErrors() {
      contactForm.querySelectorAll('.form-field').forEach((wrapper) => {
        wrapper.classList.remove('has-error');
        const field = wrapper.querySelector('input, textarea, select');
        if (field) field.setAttribute('aria-invalid', 'false');
        const fieldError = wrapper.querySelector('.form-error');
        if (fieldError) fieldError.style.display = 'none';
      });
      if (errorEl) errorEl.style.display = 'none';
    }

    function validate() {
      let valid = true;
      let firstInvalid = null;

      if (!nameField.value.trim()) {
        setError(nameField, true);
        valid = false;
        firstInvalid = firstInvalid || nameField;
      }

      if (!validateEmail(emailField.value.trim())) {
        setError(emailField, true);
        valid = false;
        firstInvalid = firstInvalid || emailField;
      }

      if (!messageField.value.trim()) {
        setError(messageField, true);
        valid = false;
        firstInvalid = firstInvalid || messageField;
      }

      return { valid, firstInvalid };
    }

    [nameField, emailField, messageField].forEach(f => {
      if (f) f.addEventListener('input', () => setError(f, false));
    });

    contactForm.addEventListener('submit', async e => {
      e.preventDefault();
      clearErrors();
      const { valid, firstInvalid } = validate();
      if (!valid) {
        if (errorEl) {
          errorEl.textContent = 'Please fix the highlighted fields and try again.';
          errorEl.style.display = 'block';
        }
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      submitBtn.disabled = true;
      submitBtn.setAttribute('aria-busy', 'true');
      submitBtn.textContent = 'Sending…';

      const data = new URLSearchParams({
        name:    nameField.value.trim(),
        email:   emailField.value.trim(),
        message: messageField.value.trim(),
        budget:  contactForm.querySelector('#field-budget')?.value || ''
      });

      try {
        const res  = await fetch('contact.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'X-Requested-With': 'XMLHttpRequest' },
          body: data
        });
        const json = await res.json();

        if (json.ok) {
          contactForm.style.display = 'none';
          if (successEl) {
            successEl.style.display = 'flex';
            successEl.focus();
          }
        } else {
          showSendFailure(json.message || 'Something went wrong.');
          submitBtn.disabled = false;
          submitBtn.removeAttribute('aria-busy');
          submitBtn.textContent = 'Send it →';
        }
      } catch {
        showSendFailure('Network error.');
        submitBtn.disabled = false;
        submitBtn.removeAttribute('aria-busy');
        submitBtn.textContent = 'Send it →';
      }
    });
  }

  /* --------------------------------------------------------------------------
      8. Email obfuscation
     -------------------------------------------------------------------------- */
  const emailLink = document.querySelector('[data-email]');
  if (emailLink) {
    const addr = `${emailLink.dataset.user}@${emailLink.dataset.domain}.${emailLink.dataset.tld}`;
    emailLink.textContent = addr;
    emailLink.addEventListener('click', e => {
      e.preventDefault();
      if (navigator.clipboard) {
        navigator.clipboard.writeText(addr).then(() => {
          const orig = emailLink.textContent;
          emailLink.textContent = 'Copied!';
          setTimeout(() => { emailLink.textContent = orig; }, 2000);
        });
      } else {
        window.location.href = `mailto:${addr}`;
      }
    });
  }

  /* --------------------------------------------------------------------------
      9. Work page — filter bar
     -------------------------------------------------------------------------- */
  const filterBar = document.querySelector('.filter-bar');
  if (filterBar) {
    const btns  = filterBar.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('.work-card');
    const grid = document.getElementById('work-cases-grid');
    const filterStatus = document.getElementById('work-filter-status');
    const emptyState = document.getElementById('work-empty-state');
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let filterStatusTimer = 0;

    function getVisibleCards() {
      return Array.from(cards).filter(card => card.style.display !== 'none');
    }

    function updateFilterButtonLabels() {
      const total = cards.length;
      const counts = { all: total };

      cards.forEach((card) => {
        const categories = (card.dataset.categories || '').toLowerCase().split(/\s+/).filter(Boolean);
        categories.forEach((category) => {
          counts[category] = (counts[category] || 0) + 1;
        });
      });

      btns.forEach((btn) => {
        const filter = btn.dataset.filter;
        const count = counts[filter] || 0;
        btn.setAttribute('aria-label', `${btn.textContent.trim()} (${count})`);
      });
    }

    function updateEmptyState() {
      if (!emptyState) return;
      const hasVisibleCards = getVisibleCards().length > 0;
      emptyState.style.display = hasVisibleCards ? 'none' : 'block';
    }

    function updateFilterStatus(cat) {
      if (!filterStatus) return;

      const visibleCards = getVisibleCards();
      const total = cards.length;
      const filterLabel = cat === 'all' ? 'all categories' : cat;
      filterStatus.textContent = `Showing ${visibleCards.length} of ${total} projects for ${filterLabel}.`;
    }

    function cardMatchesFilter(card, cat) {
      if (cat === 'all') return true;
      const categories = (card.dataset.categories || '').toLowerCase().split(/\s+/).filter(Boolean);
      return categories.includes(cat);
    }

    function filterCards(cat) {
      const animationDelay = reduceMotion ? 0 : 200;
      if (grid) grid.setAttribute('aria-busy', 'true');

      cards.forEach(card => {
        const match = cardMatchesFilter(card, cat);
        if (reduceMotion) {
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(8px)';
        }

        setTimeout(() => {
          card.style.display = match ? 'block' : 'none';
          card.setAttribute('aria-hidden', String(!match));
          if (!reduceMotion && match) requestAnimationFrame(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          });
        }, animationDelay);
      });

      if (filterStatusTimer) window.clearTimeout(filterStatusTimer);
      filterStatusTimer = window.setTimeout(() => {
        updateFilterStatus(cat);
        updateEmptyState();
        if (grid) grid.setAttribute('aria-busy', 'false');
      }, animationDelay + 30);
    }

    function setActiveButton(cat) {
      btns.forEach(b => { b.classList.remove('is-active'); b.setAttribute('aria-pressed', 'false'); });
      const active = Array.from(btns).find((btn) => btn.dataset.filter === cat);
      if (!active) return false;
      active.classList.add('is-active');
      active.setAttribute('aria-pressed', 'true');
      return true;
    }

    function applyFilter(cat, syncHash = true) {
      const hasFilter = setActiveButton(cat);
      const selectedFilter = hasFilter ? cat : 'all';
      filterCards(selectedFilter);

      if (!syncHash) return;
      const nextHash = selectedFilter === 'all' ? '' : `#filter=${encodeURIComponent(selectedFilter)}`;
      if (window.location.hash !== nextHash) {
        window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}${nextHash}`);
      }
    }

    btns.forEach(btn => btn.addEventListener('click', () => {
      applyFilter(btn.dataset.filter, true);
    }));

    updateFilterButtonLabels();
    updateEmptyState();
    const hashMatch = window.location.hash.match(/^#filter=([^&]+)/);
    const initialFilter = hashMatch ? decodeURIComponent(hashMatch[1]).toLowerCase() : 'all';
    applyFilter(initialFilter, false);

    window.addEventListener('hashchange', () => {
      const nextMatch = window.location.hash.match(/^#filter=([^&]+)/);
      const nextFilter = nextMatch ? decodeURIComponent(nextMatch[1]).toLowerCase() : 'all';
      applyFilter(nextFilter, false);
    });
  }

  /* --------------------------------------------------------------------------
     10. Case study carousels
     -------------------------------------------------------------------------- */
  document.querySelectorAll('.case-carousel').forEach(carousel => {
    const track = carousel.querySelector('.case-carousel__track');
    const dotsContainer = carousel.querySelector('.case-carousel__dots');
    const prevBtn = carousel.querySelector('[data-dir="-1"]');
    const nextBtn = carousel.querySelector('[data-dir="1"]');
    const slides = Array.from(track.querySelectorAll('img'));
    if (!slides.length) return;

    slides.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.className = 'case-carousel__dot' + (i === 0 ? ' is-active' : '');
      dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
      dot.addEventListener('click', () => goTo(i));
      dotsContainer.appendChild(dot);
    });

    const dots = Array.from(dotsContainer.querySelectorAll('.case-carousel__dot'));

    function goTo(index) {
      track.scrollTo({ left: track.clientWidth * index, behavior: 'smooth' });
    }

    function updateDots() {
      const index = Math.round(track.scrollLeft / track.clientWidth);
      dots.forEach((d, i) => d.classList.toggle('is-active', i === index));
      if (prevBtn) prevBtn.disabled = index === 0;
      if (nextBtn) nextBtn.disabled = index === slides.length - 1;
    }

    if (prevBtn) prevBtn.addEventListener('click', () => {
      goTo(Math.max(0, Math.round(track.scrollLeft / track.clientWidth) - 1));
    });

    if (nextBtn) nextBtn.addEventListener('click', () => {
      goTo(Math.min(slides.length - 1, Math.round(track.scrollLeft / track.clientWidth) + 1));
    });

    track.addEventListener('scroll', updateDots, { passive: true });
    updateDots();
  });

  /* --------------------------------------------------------------------------
     11. Image lightbox — cs-diagram and cs-screen-placeholder images
     -------------------------------------------------------------------------- */
  (function initLightbox() {
    const triggers = document.querySelectorAll('.cs-diagram img, .cs-screen-placeholder img');
    if (!triggers.length) return;

    const lightbox = document.createElement('div');
    lightbox.className = 'cs-lightbox';
    lightbox.setAttribute('role', 'dialog');
    lightbox.setAttribute('aria-modal', 'true');
    lightbox.setAttribute('aria-label', 'Image preview');

    const img = document.createElement('img');
    img.className = 'cs-lightbox__img';
    img.setAttribute('alt', '');

    const closeBtn = document.createElement('button');
    closeBtn.className = 'cs-lightbox__close';
    closeBtn.setAttribute('aria-label', 'Close image preview');
    closeBtn.textContent = '×';

    lightbox.appendChild(img);
    lightbox.appendChild(closeBtn);
    document.body.appendChild(lightbox);

    let lastFocused = null;

    function open(src, alt) {
      img.src = src;
      img.alt = alt || '';
      lastFocused = document.activeElement;
      lightbox.classList.add('is-open');
      document.body.style.overflow = 'hidden';
      closeBtn.focus();
    }

    function close() {
      lightbox.classList.remove('is-open');
      document.body.style.overflow = '';
      img.src = '';
      if (lastFocused) lastFocused.focus();
    }

    triggers.forEach(trigger => {
      trigger.addEventListener('click', () => open(trigger.src, trigger.alt));
    });

    closeBtn.addEventListener('click', e => { e.stopPropagation(); close(); });
    lightbox.addEventListener('click', close);
    img.addEventListener('click', e => e.stopPropagation());

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && lightbox.classList.contains('is-open')) close();
    });
  })();

  /* --------------------------------------------------------------------------
     12. MedMe TOC — active section tracking via IntersectionObserver
     -------------------------------------------------------------------------- */
  const tocItems = document.querySelectorAll('.cs-toc__item');
  if (tocItems.length) {
    const sectionIds = Array.from(tocItems).map(a => a.getAttribute('href').replace('#', ''));
    const sections = sectionIds.map(id => document.getElementById(id)).filter(Boolean);

    let activeSectionId = null;

    const obs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          activeSectionId = entry.target.id;
        }
      });
      tocItems.forEach(item => {
        const href = item.getAttribute('href').replace('#', '');
        item.classList.toggle('is-active', href === activeSectionId);
      });
    }, { rootMargin: '-20% 0px -70% 0px', threshold: 0 });

    sections.forEach(s => obs.observe(s));
  }

  /* --------------------------------------------------------------------------
     13. Animated number counters — .cs-benchmark-num, .exp-stat__num
         Counts up from 0 to the real value on scroll-into-view, then restores
         the original markup (handles %, ×, ~, + and unit suffixes like k/w).
     -------------------------------------------------------------------------- */
  (function initCounters() {
    const counters = document.querySelectorAll('.cs-benchmark-num, .exp-stat__num');
    if (!counters.length) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function animateCounter(el) {
      const finalHTML = el.innerHTML;
      const match = el.textContent.match(/[\d.]+/);
      const target = match ? parseFloat(match[0]) : null;

      if (prefersReducedMotion || target === null || target <= 0) return;

      const duration = 900;
      const start = performance.now();
      const isInt = Number.isInteger(target);

      function step(now) {
        const progress = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = target * eased;
        el.textContent = isInt ? String(Math.round(current)) : current.toFixed(1);

        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          el.innerHTML = finalHTML;
        }
      }

      requestAnimationFrame(step);
    }

    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });

    counters.forEach((el) => counterObserver.observe(el));
  })();

})();
