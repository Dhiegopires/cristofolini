/* Additions to the Droow template scripts: menu state for assistive tech,
   keyboard access, in-page scrolling, slider controls, forms, CTA tracking,
   article demos and the analytics consent note. */
(function () {
  'use strict';
  var body = document.body;
  var btn = document.querySelector('.menu-icon');
  if (btn) {
    new MutationObserver(function () {
      btn.setAttribute('aria-expanded', String(body.classList.contains('nav-active')));
    }).observe(body, { attributes: true, attributeFilter: ['class'] });
    btn.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); btn.click(); }
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && body.classList.contains('nav-active')) btn.click();
    });
  }

  // In-page links (#work, skip link): smooth-scrollbar owns scrolling, so a
  // plain hash jump does nothing. Scroll the bar, then move focus there.
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href^="#"]');
    if (!a || a.getAttribute('href').length < 2) return;
    var el = document.getElementById(a.getAttribute('href').slice(1));
    var root = document.querySelector('#dsn-scrollbar');
    var sb = el && root && window.Scrollbar && window.Scrollbar.get(root);
    if (!sb) return;
    e.preventDefault();
    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var gap = el.id === 'main-content' ? 0 : 100; // clear the section eyebrow under the header
    var y = el.getBoundingClientRect().top - root.getBoundingClientRect().top + sb.offset.y - gap;
    sb.scrollTo(0, Math.min(y, sb.limit.y), reduce ? 0 : 1100);
    if (!el.hasAttribute('tabindex')) el.setAttribute('tabindex', '-1');
    el.focus({ preventScroll: true });
  });

  // The work slider autoplays in the template; with prev/next buttons it is
  // user-driven instead (cards no longer move while someone is reading).
  window.addEventListener('load', function () {
    if (!window.jQuery) return;
    window.jQuery('.our-work .slick-slider.slick-initialized').slick('slickPause');
  });

  // Lazy images change page height after smooth-scrollbar measured it;
  // re-measure when any of them loads so the end of the page stays reachable.
  var bar = document.querySelector('#dsn-scrollbar');
  document.addEventListener('load', function (e) {
    if (e.target.tagName !== 'IMG' || !bar || !window.Scrollbar) return;
    var sb = window.Scrollbar.get(bar);
    if (sb) sb.update();
  }, true);

  // Prev/next buttons for the template's slick sliders
  document.addEventListener('click', function (e) {
    var nav = e.target.closest && e.target.closest('[data-slick-dir]');
    if (!nav || !window.jQuery) return;
    var slider = window.jQuery(nav.closest('section')).find('.slick-slider.slick-initialized').first();
    if (slider.length) slider.slick(nav.getAttribute('data-slick-dir') === 'prev' ? 'slickPrev' : 'slickNext');
  });

  // Forms (contact, newsletter): inline validation of required fields, then
  // POST to /contact.php, which requires the XHR header and answers {ok}.
  // A confirmed send fires form_submit + generate_lead (methodology 5.1 #23).
  var track = function (name, params) { if (typeof window.gtag === 'function') window.gtag('event', name, params); };
  Array.prototype.forEach.call(document.querySelectorAll('#site-contact, form[data-site-form]'), function (form) {
    var status = form.querySelector('.messages');
    var submit = form.querySelector('button[type="submit"]');
    var fields = Array.prototype.filter.call(form.elements, function (el) { return el.required; });
    var say = function (text, kind) {
      status.textContent = text;
      status.className = 'messages' + (kind ? ' is-' + kind : '');
    };
    var check = function (el) {
      var err = document.getElementById(el.id + '_err');
      var bad = !el.value.trim() || (el.type === 'email' && !el.validity.valid);
      el.setAttribute('aria-invalid', String(bad));
      el.closest('.form-group').classList.toggle('has-error', bad);
      if (err) err.textContent = bad ? form.getAttribute('data-err-' + el.name) : '';
      return !bad;
    };
    fields.forEach(function (el) {
      el.addEventListener('blur', function () { if (el.value) check(el); });
      el.addEventListener('input', function () { if (el.getAttribute('aria-invalid') === 'true') check(el); });
    });
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var firstBad = null;
      fields.forEach(function (el) { if (!check(el) && !firstBad) firstBad = el; });
      if (firstBad) { firstBad.focus(); return; }
      var label = submit.textContent;
      var kind = (form.elements.type && form.elements.type.value) || 'contact';
      submit.disabled = true;
      submit.textContent = form.getAttribute('data-sending');
      say('');
      fetch(form.getAttribute('action'), {
        method: 'POST',
        headers: { 'X-Requested-With': 'XMLHttpRequest' },
        body: new FormData(form),
      })
        .then(function (res) { return res.json().catch(function () { return { ok: false }; }); })
        .then(function (data) {
          if (!data.ok) throw new Error(data.message || 'fail');
          form.reset();
          say(form.getAttribute('data-ok'), 'ok');
          track('form_submit', { event_category: 'form', event_label: kind });
          if (kind === 'contact') track('generate_lead', { event_category: 'cta', event_label: 'contact_form_send' });
        })
        .catch(function () { say(form.getAttribute('data-fail'), 'error'); })
        .then(function () { submit.disabled = false; submit.textContent = label; });
    });
  });

  // CTA clicks: any element with data-cta reports cta_click with its label.
  document.addEventListener('click', function (e) {
    var cta = e.target.closest && e.target.closest('[data-cta]');
    if (cta) track('cta_click', { event_category: cta.getAttribute('data-cta-cat') || 'cta', event_label: cta.getAttribute('data-cta') });
  });

  // Article demo: accent picker (carried over from the previous site)
  Array.prototype.forEach.call(document.querySelectorAll('.demo-swatch'), function (demo) {
    var value = demo.querySelector('.demo-swatch__value');
    var btns = demo.querySelectorAll('.demo-swatch__btn');
    Array.prototype.forEach.call(btns, function (b) {
      b.addEventListener('click', function () {
        Array.prototype.forEach.call(btns, function (x) {
          x.classList.toggle('is-active', x === b);
          x.setAttribute('aria-pressed', String(x === b));
        });
        var host = demo.closest('.article-body') || demo;
        host.style.setProperty('--demo-accent', b.getAttribute('data-accent'));
        if (value) value.textContent = b.getAttribute('data-accent');
      });
    });
  });

  // Résumé: print button
  Array.prototype.forEach.call(document.querySelectorAll('[data-print]'), function (b) {
    b.addEventListener('click', function () { window.print(); });
  });

  var KEY = 'cookie-consent';
  var stored = null;
  try { stored = localStorage.getItem(KEY); } catch (e) {}
  var grant = function () { if (typeof window.gtag === 'function') window.gtag('consent', 'update', { analytics_storage: 'granted' }); };
  if (stored === 'granted') { grant(); return; }
  if (stored === 'denied') return;
  var pt = body.getAttribute('data-lang') === 'pt';
  var box = document.createElement('div');
  box.className = 'cookie-note';
  box.setAttribute('role', 'region');
  box.setAttribute('aria-label', pt ? 'Aviso de cookies' : 'Cookie notice');
  box.innerHTML = '<p>' + (pt ? 'Este site usa cookies de analytics. ' : 'This site uses analytics cookies. ') +
    '<a href="' + (pt ? '/pt-br/politica-de-privacidade/' : '/privacy-policy/') + '">' + (pt ? 'Política de Privacidade' : 'Privacy Policy') + '</a></p>' +
    '<button type="button" data-v="denied">' + (pt ? 'Recusar' : 'Decline') + '</button><button type="button" data-v="granted">' + (pt ? 'Aceitar' : 'Accept') + '</button>';
  box.addEventListener('click', function (e) {
    var v = e.target.getAttribute && e.target.getAttribute('data-v');
    if (!v) return;
    try { localStorage.setItem(KEY, v); } catch (err) {}
    if (v === 'granted') grant();
    box.remove();
  });
  body.appendChild(box);
})();
