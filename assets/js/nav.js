/* Navbar 184:323 — one component, every page. */
(function () {
  'use strict';

  var COPY = {
    en: {
      aria: 'Main navigation',
      home: 'Cristofolini | Home',
      work: 'Work',
      insights: 'Insights',
      curriculum: 'Curriculum',
      lang: 'Language',
      toPt: 'Mudar para português',
      menu: 'Toggle menu',
      cta: 'Get in touch'
    },
    pt: {
      aria: 'Navegação principal',
      home: 'Cristofolini | Início',
      work: 'Trabalhos',
      insights: 'Insights',
      curriculum: 'Currículo',
      lang: 'Idioma',
      toEn: 'Switch to English',
      menu: 'Abrir menu',
      cta: 'Fale comigo'
    }
  };

  var TO_PT = {
    '/resume/': '/pt-br/curriculo/',
    '/about/': '/pt-br/sobre/',
    '/privacy-policy/': '/pt-br/politica-de-privacidade/',
    '/terms-of-use/': '/pt-br/termos-de-uso/'
  };
  var TO_EN = {
    '/pt-br/curriculo/': '/resume/',
    '/pt-br/sobre/': '/about/',
    '/pt-br/politica-de-privacidade/': '/privacy-policy/',
    '/pt-br/termos-de-uso/': '/terms-of-use/'
  };

  function norm(path) {
    return (path || '/').replace(/index\.html$/i, '').replace(/\/+$/, '') + '/' || '/';
  }

  function isPt(path) {
    return path === '/pt-br/' || path.indexOf('/pt-br/') === 0;
  }

  function section(path) {
    if (path.indexOf('/work/') === 0 || path.indexOf('/pt-br/work/') === 0) return 'work';
    if (path.indexOf('/blog/') === 0 || path.indexOf('/pt-br/blog/') === 0) return 'insights';
    if (path.indexOf('/resume/') === 0 || path.indexOf('/curriculo/') !== -1) return 'curriculum';
    return '';
  }

  function altFromHead(wantPt) {
    var nodes = document.querySelectorAll('link[rel="alternate"][hreflang]');
    var i, lang, href, path;
    for (i = 0; i < nodes.length; i++) {
      lang = (nodes[i].getAttribute('hreflang') || '').toLowerCase();
      href = nodes[i].getAttribute('href');
      if (!href) continue;
      if (wantPt && lang !== 'pt-br') continue;
      if (!wantPt && lang !== 'en') continue;
      try {
        path = norm(new URL(href, location.href).pathname);
      } catch (err) {
        continue;
      }
      if (wantPt && isPt(path)) return path;
      if (!wantPt && !isPt(path)) return path;
    }
    return '';
  }

  function altPath(path, pt) {
    var fromHead = altFromHead(pt);
    if (fromHead) return fromHead;
    if (pt) {
      if (TO_PT[path]) return TO_PT[path];
      if (isPt(path)) return path;
      return path === '/' ? '/pt-br/' : '/pt-br' + path;
    }
    if (TO_EN[path]) return TO_EN[path];
    if (path === '/pt-br/') return '/';
    if (path.indexOf('/pt-br/') === 0) return path.slice(6);
    return path;
  }

  function current(sec, name) {
    return sec === name ? ' aria-current="page"' : '';
  }

  class CNav extends HTMLElement {
    connectedCallback() {
      if (this._built) return;
      this._built = true;

      var path = norm(location.pathname);
      var pt = isPt(path);
      var t = pt ? COPY.pt : COPY.en;
      var sec = section(path);
      var home = pt ? '/pt-br/' : '/';
      var work = pt ? '/pt-br/work/' : '/work/';
      var insights = pt ? '/pt-br/blog/' : '/blog/';
      var curriculum = pt ? '/pt-br/curriculo/' : '/resume/';
      var cta = (path === '/' || path === '/pt-br/') ? '#contact' : home + '#contact';
      var other = altPath(path, !pt);

      var langSwitch = pt
        ? '<span class="nav-lang__opt is-active" aria-current="true">PT-BR</span>' +
          '<a href="' + other + '" class="nav-lang__opt" hreflang="en" lang="en" aria-label="' + t.toEn + '">EN</a>'
        : '<a href="' + other + '" class="nav-lang__opt" hreflang="pt-BR" lang="pt-BR" aria-label="' + t.toPt + '">PT-BR</a>' +
          '<span class="nav-lang__opt is-active" aria-current="true">EN</span>';

      this.innerHTML =
        '<nav class="nav" role="navigation" aria-label="' + t.aria + '">' +
          '<a href="' + home + '" class="nav-logo" aria-label="' + t.home + '">' +
            '<img src="/assets/img/Cristofolini-logo-2.svg" alt="Cristofolini" width="38" height="24">' +
          '</a>' +
          '<button type="button" class="nav-toggle" aria-label="' + t.menu + '" aria-expanded="false">' +
            '<svg aria-hidden="true" class="nav-toggle__icon nav-toggle__icon--open" viewBox="0 0 24 24"><path d="M3 6h18M3 12h18M3 18h18"/></svg>' +
            '<svg aria-hidden="true" class="nav-toggle__icon nav-toggle__icon--close" viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18"/></svg>' +
          '</button>' +
          '<ul class="nav-links" role="list">' +
            '<li><a href="' + work + '"' + current(sec, 'work') + '>' + t.work + '</a></li>' +
            '<li><a href="' + insights + '"' + current(sec, 'insights') + '>' + t.insights + '</a></li>' +
            '<li><a href="' + curriculum + '"' + current(sec, 'curriculum') + '>' + t.curriculum + '</a></li>' +
          '</ul>' +
          '<div class="nav-lang" role="group" aria-label="' + t.lang + '">' + langSwitch + '</div>' +
          '<a href="' + cta + '" class="nav-cta">' +
            '<span class="nav-cta__label">' + t.cta + '</span>' +
          '</a>' +
        '</nav>';

      this.bindToggle();
    }

    bindToggle() {
      var nav = this.querySelector('.nav');
      var toggle = this.querySelector('.nav-toggle');
      if (!nav || !toggle) return;

      toggle.addEventListener('click', function () {
        var open = nav.classList.toggle('is-open');
        toggle.setAttribute('aria-expanded', String(open));
        document.documentElement.classList.toggle('nav-open', open);
      });

      nav.querySelectorAll('.nav-links a, .nav-cta').forEach(function (link) {
        link.addEventListener('click', function () {
          nav.classList.remove('is-open');
          toggle.setAttribute('aria-expanded', 'false');
          document.documentElement.classList.remove('nav-open');
        });
      });

      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && nav.classList.contains('is-open')) {
          nav.classList.remove('is-open');
          toggle.setAttribute('aria-expanded', 'false');
          document.documentElement.classList.remove('nav-open');
          toggle.focus();
        }
      });
    }
  }

  customElements.define('c-nav', CNav);
})();
