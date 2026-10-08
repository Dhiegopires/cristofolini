import { SITE, ROUTES } from './data.mjs';
import { T } from './i18n.mjs';
import { esc, join, icon, when } from './lib.mjs';

// Filled by scripts/build.mjs: minified file names + content hash.
const A = () => globalThis.__ASSETS || { css: '/assets/css/style.css', js: '/assets/js/main.js', v: 'dev' };

export const head = ({ lang, title, description, path, alt, image = '/assets/img/og-default.jpg', imageAlt, type = 'website', jsonld = [], preload = [] }) => {
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
${when(enPath && ptPath, `  <link rel="alternate" hreflang="en" href="${abs(enPath)}">
  <link rel="alternate" hreflang="pt-BR" href="${abs(ptPath)}">
  <link rel="alternate" hreflang="x-default" href="${abs(enPath)}">
`)}  <meta property="og:type" content="${type}">
  <meta property="og:locale" content="${t.ogLocale}">
  <meta property="og:site_name" content="Dhiego Cristofolini">
  <meta property="og:title" content="${esc(title)}">
  <meta property="og:description" content="${esc(description)}">
  <meta property="og:url" content="${abs(path)}">
  <meta property="og:image" content="${abs(image)}">
  <meta property="og:image:alt" content="${esc(imageAlt || title)}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${esc(title)}">
  <meta name="twitter:description" content="${esc(description)}">
  <meta name="twitter:image" content="${abs(image)}">
  <link rel="icon" href="/assets/img/favicon.svg" type="image/svg+xml">
  <link rel="icon" href="/favicon.ico" sizes="any">
  <link rel="apple-touch-icon" href="/assets/img/apple-touch-icon.png">
  <link rel="preload" href="/assets/fonts/geist-latin.woff2" as="font" type="font/woff2" crossorigin>
${join(preload, (p) => `  <link rel="preload" ${p}>\n`)}  <link rel="stylesheet" href="${A().css}?v=${A().v}">
  <script>
    document.documentElement.classList.add('js');
    try {
      if (!sessionStorage.getItem('seen') && !matchMedia('(prefers-reduced-motion: reduce)').matches) document.documentElement.classList.add('js-preload');
    } catch (e) {}
    setTimeout(function () { if (!window.__siteReady) document.documentElement.classList.remove('js', 'js-preload'); }, 3000);
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('consent', 'default', { analytics_storage: 'denied', ad_storage: 'denied' });
    gtag('js', new Date());
    gtag('config', '${SITE.gaId}');
  </script>
  <script async src="https://www.googletagmanager.com/gtag/js?id=${SITE.gaId}"></script>
  <script src="/assets/vendor/gsap.min.js" defer></script>
  <script src="/assets/vendor/ScrollTrigger.min.js" defer></script>
  <script src="${A().js}?v=${A().v}" defer></script>
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

export const header = ({ lang, alt, current, path }) => {
  const t = T[lang];
  const r = ROUTES[lang];
  const otherLang = lang === 'en' ? 'pt' : 'en';
  const otherHref = alt || ROUTES[otherLang].home;
  return `
<a href="#main-content" class="skip-link">${t.skip}</a>
<div class="loader" aria-hidden="true">
  <div class="loader__panel"></div>
  <div class="loader__panel loader__panel--front">
    <span class="loader__count" data-loader-count>0</span>
    <div class="loader__bar"><span data-loader-bar></span></div>
  </div>
</div>
<header class="site-header" data-header>
  <div class="site-header__inner">
    <a class="site-header__logo" href="${r.home}" aria-label="${t.logoLabel}" data-cta="${lang}_nav_logo">
      <img src="/assets/img/site/logo.svg" width="51" height="32" alt="">
    </a>
    <div class="site-header__actions">
      <button class="lang-toggle" type="button" aria-expanded="false" aria-controls="lang-menu" aria-label="${t.menuLanguage}: ${lang === 'pt' ? 'Português (Brasil)' : 'English'}" title="${t.menuLanguage}" data-lang-toggle>
        ${icon.globe}
      </button>
      <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="site-menu" data-menu-toggle>
        <span class="menu-toggle__icons" aria-hidden="true">${icon.menu}${icon.minus}${icon.close}</span>
        <span class="menu-toggle__label"><span class="menu-toggle__text menu-toggle__text--menu">${t.menu}</span><span class="menu-toggle__text menu-toggle__text--open" aria-hidden="true">${t.open}</span><span class="menu-toggle__text menu-toggle__text--close" aria-hidden="true">${t.close}</span></span>
      </button>
    </div>
  </div>
</header>
<div class="lang-menu" id="lang-menu" hidden data-lang-menu>
  <ul class="lang-menu__list">
    <li><a class="lang-menu__item" href="${lang === 'en' ? (path || r.home) : otherHref}" hreflang="en" lang="en"${lang === 'en' ? ' aria-current="true"' : ''}><span class="lang-menu__code" aria-hidden="true">EN</span>English</a></li>
    <li><a class="lang-menu__item" href="${lang === 'pt' ? (path || r.home) : otherHref}" hreflang="pt-BR" lang="pt-BR"${lang === 'pt' ? ' aria-current="true"' : ''}><span class="lang-menu__code" aria-hidden="true">PT</span>Português (Brasil)</a></li>
  </ul>
</div>
<div class="menu" id="site-menu" data-menu>
  <div class="menu__panel menu__panel--back"></div>
  <div class="menu__panel"></div>
  <nav class="menu__inner" aria-label="${t.menuLabel}">
    <span></span>
    <ul class="menu__list">
${join(navItems(lang), (n, i) => `      <li><a class="menu__link" href="${n.href}"${n.id === current ? ' aria-current="page"' : ''}><span class="menu__num" aria-hidden="true">0${i + 1}</span><span class="menu__word">${n.label}</span></a></li>\n`)}    </ul>
    <div class="menu__foot">
      <div class="menu__row">
        <span>${t.menuContact}:</span>
        <a href="mailto:${SITE.email}" data-cta="${lang}_menu_email">${SITE.email}</a>
      </div>
      <div class="menu__row">
${join(SITE.socials, (s) => `        <a href="${s.href}" rel="noopener" target="_blank">${s.label}</a>\n`)}        <a href="${SITE.behance}" rel="noopener" target="_blank">Behance</a>
      </div>
      <div class="menu__row">
        <span>${t.menuLanguage}:</span>
        <a href="${lang === 'en' ? path || r.home : otherHref}" hreflang="en" lang="en"${lang === 'en' ? ' aria-current="true"' : ''}>English</a>
        <a href="${lang === 'pt' ? path || r.home : otherHref}" hreflang="pt-BR" lang="pt-BR"${lang === 'pt' ? ' aria-current="true"' : ''}>Português (Brasil)</a>
      </div>
    </div>
  </nav>
</div>`;
};

export const footer = ({ lang }) => {
  const t = T[lang];
  const r = ROUTES[lang];
  const items = navItems(lang).filter((n) => n.id !== 'about');
  return `
<footer class="site-footer">
  <div class="container site-footer__inner">
    <div class="site-footer__top">
      <nav aria-label="${t.footerNav}">
        <ul class="footer-nav">
${join(items, (n) => `          <li><a href="${n.href}">${n.label}</a></li>\n`)}        </ul>
      </nav>
      <ul class="socials" aria-label="${t.socialLabel}">
${join(SITE.socials, (s) => `        <li><a href="${s.href}" rel="noopener" target="_blank" aria-label="${s.label}">${icon[s.id]}</a></li>\n`)}      </ul>
    </div>
    <a class="wordmark" href="${r.home}" aria-label="${t.logoLabel}" data-reveal="mask">
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
</footer>
<div class="cursor" aria-hidden="true" data-cursor-el><span class="cursor__label">${t.view}</span></div>
<button class="to-top" type="button" aria-label="${t.toTop}" data-to-top>
  <svg class="to-top__progress" viewBox="0 0 64 64" aria-hidden="true" focusable="false"><circle class="to-top__ring" cx="32" cy="32" r="30" pathLength="100" stroke-dasharray="100" stroke-dashoffset="100" data-to-top-ring/></svg>
  ${icon.arrowUp}
</button>`;
};

const field = ({ id, name, type = 'text', label, autocomplete, t }) => `
        <div class="field-wrap">
          <div class="field">
            <input class="field__input" id="${id}" name="${name}" type="${type}" placeholder=" " autocomplete="${autocomplete}" required aria-describedby="${id}-error">
            <label class="field__label" for="${id}">${label}</label>
          </div>
          <span class="field__error" id="${id}-error" hidden></span>
        </div>`;

export const contactCta = ({ lang, page }) => {
  const t = T[lang];
  const c = t.contact;
  const r = ROUTES[lang];
  const id = `${page}-contact`;
  return `
<section class="section cta" aria-labelledby="${id}-title">
  <div class="container">
    <h2 class="h-xl cta__title" id="${id}-title" data-reveal="words">${c.title}</h2>
    <form class="form form--contact" action="/contact.php" method="post" novalidate data-form="contact" data-cta-label="${lang}_${page}_contact"
      data-msg-ok="${esc(c.ok)}" data-msg-error="${esc(c.error)}" data-msg-sending="${esc(c.sending)}" data-msg-required="${esc(c.required)}" data-msg-email="${esc(c.invalidEmail)}">
      <input type="hidden" name="type" value="contact">
      <div class="hp-field" aria-hidden="true"><label for="${id}-company">Company</label><input id="${id}-company" name="company" tabindex="-1" autocomplete="off"></div>
${field({ id: `${id}-name`, name: 'name', label: c.name, autocomplete: 'name', t })}
${field({ id: `${id}-email`, name: 'email', type: 'email', label: c.email, autocomplete: 'email', t })}
${field({ id: `${id}-message`, name: 'message', label: c.message, autocomplete: 'off', t })}
      <button class="btn btn--split" type="submit">${c.submit}${icon.arrowNE}</button>
      <p class="form__consent">${c.consent} <a href="${r.privacy}">${t.privacy}</a>.</p>
      <p class="form__status" role="status" aria-live="polite" data-form-status></p>
    </form>
  </div>
</section>`;
};

export const newsletterCta = ({ lang, page }) => {
  const t = T[lang];
  const n = t.newsletter;
  const c = t.contact;
  const r = ROUTES[lang];
  const id = `${page}-newsletter`;
  return `
<section class="section cta" aria-labelledby="${id}-title">
  <div class="container">
    <h2 class="h-xl cta__title" id="${id}-title" data-reveal="words">${n.title}</h2>
    <form class="form form--newsletter" action="/contact.php" method="post" novalidate data-form="newsletter" data-cta-label="${lang}_${page}_newsletter"
      data-msg-ok="${esc(n.ok)}" data-msg-error="${esc(c.error)}" data-msg-sending="${esc(c.sending)}" data-msg-required="${esc(c.required)}" data-msg-email="${esc(c.invalidEmail)}">
      <input type="hidden" name="type" value="newsletter">
      <input type="hidden" name="lang" value="${lang}">
      <div class="hp-field" aria-hidden="true"><label for="${id}-company">Company</label><input id="${id}-company" name="company" tabindex="-1" autocomplete="off"></div>
${field({ id: `${id}-email`, name: 'email', type: 'email', label: n.email, autocomplete: 'email', t })}
      <button class="btn btn--split" type="submit">${n.submit}${icon.arrowNE}</button>
      <p class="form__consent">${n.consent} <a href="${r.privacy}">${t.privacy}</a>.</p>
      <p class="form__status" role="status" aria-live="polite" data-form-status></p>
    </form>
  </div>
</section>`;
};

export const page = ({ lang, current, alt, headOpts, body: rawBody, bodyClass = '' }) => {
  const body = lang === 'pt' ? rawBody.replace(/aria-label="Table"/g, 'aria-label="Tabela"') : rawBody;
  return `${head({ lang, alt, ...headOpts })}
<body${bodyClass ? ` class="${bodyClass}"` : ''} data-lang="${lang}" data-privacy="${ROUTES[lang].privacy}">
${header({ lang, alt, current, path: headOpts.path })}
<main id="main-content" tabindex="-1">
${body}
</main>
${footer({ lang })}
</body>
</html>
`;
};
