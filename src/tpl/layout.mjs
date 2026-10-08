// Page shell built on the Droow template markup (SITE/template/dark):
// preloader, hamburger header + fullscreen nav, .main-root/.wrapper and the
// template scripts. Native scroll: body has no `dsn-effect-scroll`, and
// pages load normally (no `dsn-ajax`) so analytics and URLs stay plain.
import { SITE, ROUTES } from '../data.mjs';
import { T } from '../i18n.mjs';
import { esc, join, icon } from '../lib.mjs';

const A = () => globalThis.__TPL_ASSETS || { css: '/assets/css/site.css', v: 'dev' };

export const tplHead = ({ lang, title, description, path, alt, image = '/assets/img/og-default.jpg', imageAlt, type = 'website', jsonld = [], preload = [] }) => {
  const t = T[lang];
  const enPath = lang === 'en' ? path : alt;
  const ptPath = lang === 'pt' ? path : alt;
  const abs = (p) => SITE.url + p;
  return `<!doctype html>
<html lang="${t.htmlLang}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(description)}">
  <meta name="robots" content="index,follow">
  <meta name="author" content="Dhiego Cristofolini">
  <meta name="theme-color" content="#040404">
  <link rel="canonical" href="${abs(path)}">
${enPath && ptPath ? `  <link rel="alternate" hreflang="en" href="${abs(enPath)}">
  <link rel="alternate" hreflang="pt-BR" href="${abs(ptPath)}">
  <link rel="alternate" hreflang="x-default" href="${abs(enPath)}">
` : ''}  <meta property="og:type" content="${type}">
  <meta property="og:locale" content="${t.ogLocale}">
  <meta property="og:site_name" content="Dhiego Cristofolini">
  <meta property="og:title" content="${esc(title)}">
  <meta property="og:description" content="${esc(description)}">
  <meta property="og:url" content="${abs(path)}">
  <meta property="og:image" content="${abs(image)}">
  <meta property="og:image:alt" content="${esc(imageAlt || title)}">
  <meta name="twitter:card" content="summary_large_image">
  <link rel="icon" href="/assets/img/favicon.svg" type="image/svg+xml">
  <link rel="icon" href="/favicon.ico" sizes="any">
  <link rel="apple-touch-icon" href="/assets/img/apple-touch-icon.png">
  <link rel="preload" href="/assets/fonts/geist-latin.woff2" as="font" type="font/woff2" crossorigin>
${join(preload, (p) => `  <link rel="preload" ${p}>\n`)}  <link rel="stylesheet" href="/assets/tpl/css/plugins.css">
  <link rel="stylesheet" href="/assets/tpl/css/style.css">
  <link rel="stylesheet" href="${A().css}?v=${A().v}">
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('consent', 'default', { analytics_storage: 'denied', ad_storage: 'denied' });
    gtag('js', new Date());
    gtag('config', '${SITE.gaId}');
  </script>
  <script async src="https://www.googletagmanager.com/gtag/js?id=${SITE.gaId}"></script>
${join(jsonld, (j) => `  <script type="application/ld+json">${JSON.stringify(j)}</script>\n`)}</head>`;
};

const navItems = (lang) => {
  const r = ROUTES[lang];
  const t = T[lang];
  return [
    { id: 'home', href: r.home, label: t.home },
    { id: 'work', href: r.work, label: t.work },
    { id: 'blog', href: r.blog, label: t.insights },
    { id: 'about', href: r.about, label: t.about },
    { id: 'resume', href: r.resume, label: t.curriculum },
  ];
};

export const tplHeader = ({ lang, alt, current, path }) => {
  const t = T[lang];
  const r = ROUTES[lang];
  const enHref = lang === 'en' ? path : alt || ROUTES.en.home;
  const ptHref = lang === 'pt' ? path : alt || ROUTES.pt.home;
  return `
<a href="#main-content" class="skip-link">${t.skip}</a>
<div class="preloader" aria-hidden="true">
  <div class="preloader-after"></div>
  <div class="preloader-before"></div>
  <div class="preloader-block">
    <div class="title">Dhiego Cristofolini</div>
    <div class="percent">0</div>
    <div class="loading">${lang === 'pt' ? 'carregando' : 'loading'}...</div>
  </div>
  <div class="preloader-bar"><div class="preloader-progress"></div></div>
</div>
<header class="dsn-nav-bar">
  <div class="site-header">
    <nav aria-label="${t.menuLabel}">
      <ul>
${join(navItems(lang), (n) => `        <li><a href="${n.href}"${n.id === current ? ' aria-current="page"' : ''}>${n.label}</a></li>\n`)}      </ul>
    </nav>
  </div>
  <div class="header-top header-top-hamburger">
    <div class="header-container">
      <div class="logo main-logo">
        <a href="${r.home}" aria-label="${t.logoLabel}"><img class="light-logo" src="/assets/img/site/logo.svg" width="51" height="32" alt=""></a>
      </div>
      <div class="nav-lang" data-lang-menu>
        <button class="nav-lang-button" type="button" aria-haspopup="true" aria-expanded="false" aria-label="${t.menuLanguage}: ${lang === 'pt' ? 'Português (Brasil)' : 'English'}">${icon.globe}</button>
        <div class="nav-lang-lang">
          <ul>
            <li><a href="${enHref}" hreflang="en" lang="en"${lang === 'en' ? ' aria-current="true"' : ''}><span>EN</span>English</a></li>
            <li><a href="${ptHref}" hreflang="pt-BR" lang="pt-BR"${lang === 'pt' ? ' aria-current="true"' : ''}><span>PT</span>Português</a></li>
          </ul>
        </div>
      </div>
      <button class="menu-icon" type="button" aria-expanded="false" aria-controls="site-nav" aria-label="${t.menu}">
        <span class="icon-m" aria-hidden="true">
          <i class="menu-icon-close fas fa-times"></i>
          <span class="menu-icon__line menu-icon__line-left"></span>
          <span class="menu-icon__line"></span>
          <span class="menu-icon__line menu-icon__line-right"></span>
        </span>
        <span class="text-menu" aria-hidden="true">
          <span class="text-button">${t.menu}</span>
          <span class="text-open">${t.open}</span>
          <span class="text-close">${t.close}</span>
        </span>
      </button>
      <div class="nav" id="site-nav">
        <div class="inner">
          <div class="nav__content"></div>
        </div>
      </div>
      <div class="nav-content">
        <div class="inner-content">
          <address class="v-middle">
            <span>${t.menuContact}</span>
            <a href="mailto:${SITE.email}">${SITE.email}</a>
            <span>Curitiba, Brazil · Remote</span>
          </address>
        </div>
      </div>
    </div>
  </div>
</header>`;
};

export const tplFooter = ({ lang }) => {
  const t = T[lang];
  const r = ROUTES[lang];
  const items = navItems(lang).filter((n) => n.id !== 'about');
  return `
<footer class="footer site-footer">
  <div class="container site-footer__inner">
    <div class="site-footer__top">
      <nav aria-label="${t.footerNav}">
        <ul class="footer-nav">
${join(items, (n) => `          <li><a href="${n.href}">${n.label}</a></li>\n`)}        </ul>
      </nav>
      <ul class="socials" aria-label="${t.socialLabel}">
${join(SITE.socials, (s) => `        <li><a href="${s.href}" rel="noopener" target="_blank" aria-label="${s.label}">${icon[s.id]}</a></li>\n`)}      </ul>
    </div>
    <a class="wordmark" href="${r.home}" aria-label="${t.logoLabel}">
      <img src="/assets/img/site/wordmark.svg" width="1748" height="201" alt="" loading="lazy">
    </a>
    <div class="site-footer__bottom">
      <p>${t.rights}</p>
      <ul class="footer-legal">
        <li><a href="${r.privacy}">${t.privacy}</a></li>
        <li><a href="${r.terms}">${t.terms}</a></li>
      </ul>
    </div>
  </div>
</footer>`;
};

// `hero` renders outside .wrapper (template: header sits above the wrapper
// so effctStickyNavBar measures from the content start).
export const tplPage = ({ lang, current, alt, headOpts, hero = '', body, bodyClass = '' }) => `${tplHead({ lang, alt, ...headOpts })}
<body class="hamburger-menu ${bodyClass}" data-lang="${lang}" data-privacy="${ROUTES[lang].privacy}">
${tplHeader({ lang, alt, current, path: headOpts.path })}
<main class="main-root" id="main-content" tabindex="-1">
  <div id="dsn-scrollbar">
${hero}
    <div class="wrapper">
${body}
    </div>
${tplFooter({ lang })}
  </div>
</main>
<script src="/assets/tpl/js/jquery-3.1.1.min.js"></script>
<script src="/assets/tpl/js/plugins.js"></script>
<script src="/assets/tpl/js/dsn-grid.js"></script>
<script src="/assets/tpl/js/custom.js"></script>
<script src="${A().css.endsWith('.min.css') ? '/assets/js/site.min.js' : '/assets/js/site.js'}?v=${A().v}"></script>
</body>
</html>
`;
