/* Small additions to the Droow template scripts: menu state for assistive
   tech, keyboard access to the menu button, and the analytics consent note. */
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

  // Contact form: inline validation, then POST to /contact.php (which
  // requires the XHR header and answers {ok, message}).
  var form = document.getElementById('site-contact');
  if (form) {
    var status = form.querySelector('.messages');
    var submit = form.querySelector('button[type="submit"]');
    var fields = ['name', 'email', 'message'];
    var say = function (text, kind) {
      status.textContent = text;
      status.className = 'messages' + (kind ? ' is-' + kind : '');
    };
    var check = function (el) {
      var err = document.getElementById(el.id + '_err');
      var bad = !el.value.trim() || (el.type === 'email' && !el.validity.valid);
      el.setAttribute('aria-invalid', String(bad));
      el.closest('.form-group').classList.toggle('has-error', bad);
      err.textContent = bad ? form.getAttribute('data-err-' + el.name) : '';
      return !bad;
    };
    fields.forEach(function (n) {
      var el = form.elements[n];
      el.addEventListener('blur', function () { if (el.value) check(el); });
      el.addEventListener('input', function () { if (el.getAttribute('aria-invalid') === 'true') check(el); });
    });
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var firstBad = null;
      fields.forEach(function (n) { if (!check(form.elements[n]) && !firstBad) firstBad = form.elements[n]; });
      if (firstBad) { firstBad.focus(); return; }
      var label = submit.textContent;
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
        })
        .catch(function () { say(form.getAttribute('data-fail'), 'error'); })
        .then(function () { submit.disabled = false; submit.textContent = label; });
    });
  }

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
