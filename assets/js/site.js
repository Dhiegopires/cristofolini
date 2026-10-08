/* Site behaviour that the Droow template does not provide. The template
   (assets/tpl/js/custom.js) owns preloader, menu, sliders and scroll
   animations; this file adds accessibility glue, forms and content UI. */
(() => {
  'use strict';

  const body = document.body;
  const lang = body.dataset.lang || 'en';
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const hasGsap = false;
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => Array.from(el.querySelectorAll(s));
  const track = (event, params) => {
    if (typeof window.gtag === 'function') window.gtag('event', event, params);
  };

  /* Menu: keep aria in sync with the template's body.nav-active toggle */
  const initMenu = () => {
    const btn = $('.menu-icon');
    if (!btn) return;
    const sync = () => {
      const open = body.classList.contains('nav-active');
      btn.setAttribute('aria-expanded', String(open));
      const main = $('.wrapper');
      if (main) main.inert = open;
    };
    new MutationObserver(sync).observe(body, { attributes: true, attributeFilter: ['class'] });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && body.classList.contains('nav-active')) {
        body.classList.remove('nav-active');
        btn.focus();
      }
    });
  };

  /* Language menu: template opens it on hover; add click + keyboard */
  const initLang = () => {
    const root = $('[data-lang-menu]');
    if (!root) return;
    const btn = $('.nav-lang-button', root);
    const set = (open) => {
      root.classList.toggle('is-open', open);
      btn.setAttribute('aria-expanded', String(open));
    };
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      set(!root.classList.contains('is-open'));
      if (root.classList.contains('is-open')) ($('[aria-current="true"]', root) || $('a', root)).focus();
    });
    document.addEventListener('click', (e) => { if (!root.contains(e.target)) set(false); });
    root.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') { set(false); btn.focus(); }
    });
    window.addEventListener('scroll', () => { if (root.classList.contains('is-open')) set(false); }, { passive: true });
    root.addEventListener('focusout', () => setTimeout(() => { if (!root.contains(document.activeElement)) set(false); }, 0));
  };

  /* Arrow buttons for the template's slick sliders */
  const initSlickNav = () => {
    if (!window.jQuery) return;
    $$('[data-slick-nav]').forEach((nav) => {
      const section = nav.closest('section');
      const slider = section && section.querySelector('.slick-slider');
      if (!slider) return;
      const $s = window.jQuery(slider);
      $('[data-slick-prev]', nav).addEventListener('click', () => $s.slick('slickPrev'));
      $('[data-slick-next]', nav).addEventListener('click', () => $s.slick('slickNext'));
    });
  };

  /* Company cards: template reveals info on hover; tap/focus for touch + keyboard */
  const initCompanies = () => {
    $$('.logo-box').forEach((box) => {
      box.addEventListener('click', () => box.classList.toggle('is-open'));
      box.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); box.classList.toggle('is-open'); }
      });
      box.addEventListener('blur', () => box.classList.remove('is-open'));
    });
  };

  /* Services accordion (Figma component) */
  const initAccordions = () => {
    const triggers = $$('[data-accordion]');
    triggers.forEach((btn) => {
      btn.addEventListener('click', () => {
        const open = btn.getAttribute('aria-expanded') !== 'true';
        triggers.forEach((o) => {
          o.setAttribute('aria-expanded', 'false');
          o.closest('[data-service]').classList.remove('is-open');
        });
        btn.setAttribute('aria-expanded', String(open));
        btn.closest('[data-service]').classList.toggle('is-open', open);
      });
    });
  };

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


  document.addEventListener('click', (e) => {
    const el = e.target.closest('[data-cta]');
    if (el) track('cta_click', { event_category: el.dataset.eventCategory || 'cta', event_label: el.dataset.cta });
  });
  $$('[data-print]').forEach((b) => b.addEventListener('click', () => window.print()));

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


  initMenu();
  initLang();
  initSlickNav();
  initCompanies();
  initAccordions();
  initForms();
  initFilters();
  initProgress();
  initDemos();
  initLightbox();
  initConsent();
})();
