// Pages are built FROM the Droow template files (src/tpl/html/*.html, copied from the Droow template):
// the template markup, classes and scripts stay as shipped; only content,
// links and images are swapped. Shared chrome (head, header, nav, footer)
// is filled here so every page matches.
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import * as cheerio from 'cheerio';
import { SITE, ROUTES } from '../data.mjs';
import { T } from '../i18n.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
export const TPL_DIR = join(root, 'src', 'tpl', 'html');

export const loadTemplate = (file) => cheerio.load(readFileSync(join(TPL_DIR, file), 'utf8'), { decodeEntities: false });

const esc = (s = '') => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const navItems = (lang) => {
  const r = ROUTES[lang];
  const t = T[lang];
  return [
    [r.home, t.home],
    [r.work, t.work],
    [r.blog, t.insights],
    [r.about, t.about],
    [r.resume, t.curriculum],
    [r.contact, lang === 'pt' ? 'Contato' : 'Contact'],
  ];
};

// Head, preloader, header/nav, footer, scripts: template structure, our content.
export const fillChrome = ($, { lang, title, description, path, alt, image = '/assets/img/og-default.jpg' }) => {
  const t = T[lang];
  const r = ROUTES[lang];
  const other = lang === 'en' ? 'pt' : 'en';
  const abs = (p) => SITE.url + p;

  $('html').attr('lang', t.htmlLang);
  const head = $('head');
  head.find('meta[name="discrption"], meta[name="keyword"], title, link[href*="fonts.googleapis"]').remove();
  head.find('link[rel*="icon"]').remove();
  head.prepend(`
    <title>${esc(title)}</title>
    <meta name="description" content="${esc(description)}">
    <meta name="author" content="Dhiego Cristofolini">
    <meta name="theme-color" content="#000000">
    <link rel="canonical" href="${abs(path)}">
    ${alt ? `<link rel="alternate" hreflang="${lang === 'en' ? 'pt-BR' : 'en'}" href="${abs(alt)}"><link rel="alternate" hreflang="${t.htmlLang}" href="${abs(path)}">` : ''}
    <meta property="og:type" content="website">
    <meta property="og:title" content="${esc(title)}">
    <meta property="og:description" content="${esc(description)}">
    <meta property="og:url" content="${abs(path)}">
    <meta property="og:image" content="${abs(image)}">
    <meta property="og:site_name" content="Dhiego Cristofolini">
    <meta property="og:locale" content="${lang === 'pt' ? 'pt_BR' : 'en_US'}">
    <meta name="twitter:card" content="summary_large_image">
    <link rel="icon" href="/assets/img/favicon.svg" type="image/svg+xml">
    <link rel="icon" href="/favicon.ico" sizes="any">
    <link rel="apple-touch-icon" href="/assets/img/apple-touch-icon.png">
    <link rel="preload" href="/assets/fonts/geist-latin.woff2" as="font" type="font/woff2" crossorigin>`);
  // One bundle: template plugins + template style + our brand layer
  // (scripts/assets.mjs builds it).
  head.find('link[href="assets/css/plugins.css"]').remove();
  head.find('link[href="assets/css/style.css"]').attr('href', '/assets/tpl/css/site.min.css');
  head.append(`
    <script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('consent','default',{analytics_storage:'denied',ad_storage:'denied'});gtag('js',new Date());gtag('config','${SITE.gaId}');</script>
    <script async src="https://www.googletagmanager.com/gtag/js?id=${SITE.gaId}"></script>`);

  // Template body classes (smooth scroll + cursor) stay; page-to-page ajax
  // loading is left off so every URL is a real page load.
  $('body').removeClass('dsn-ajax').attr('data-lang', lang);
  $('body').prepend(`<a href="#main-content" class="skip-link">${t.skip}</a>`);

  $('.preloader .title').text('Dhiego Cristofolini');

  // Header: logo, links (template copies .site-header nav > ul into the menu)
  $('.main-logo a, .logo a').attr('href', r.home).removeAttr('aria-label');
  $('.main-logo img, .logo img').each((_, el) => {
    $(el).attr('src', '/assets/img/site/logo.svg').attr('alt', t.logoLabel).attr('width', '51').attr('height', '32');
  });
  const ul = navItems(lang)
    .map(([href, label]) => `<li${href === path ? ' class="active"' : ''}><a href="${href}">${label}</a></li>`)
    .join('');
  $('.site-header nav').html(`<ul>${ul}</ul>`).attr('aria-label', t.menuLabel);
  $('.menu-icon').attr('role', 'button').attr('tabindex', '0').attr('aria-label', t.menu).attr('aria-controls', 'site-nav').attr('aria-expanded', 'false');
  $('.menu-icon .text-button').text(t.menu);
  $('.menu-icon .text-open').text(t.open);
  $('.menu-icon .text-close').text(t.close);
  $('.header-top .nav').attr('id', 'site-nav');
  $('.nav-content address').html(`<span>${lang === 'pt' ? 'Curitiba, Brasil · Remoto' : 'Curitiba, Brazil · Remote'}</span><span><a href="mailto:${SITE.email}">${SITE.email}</a></span><span><a href="${alt || ROUTES[other].home}" hreflang="${other === 'pt' ? 'pt-BR' : 'en'}">${t.switchLang}</a></span>`);

  // Footer: template columns, our info
  const footer = $('footer.footer');
  footer.find('.footer-logo a').attr('href', r.home).removeAttr('aria-label');
  footer.find('.footer-logo img').attr('src', '/assets/img/site/logo.svg').attr('alt', t.logoLabel).attr('width', '51').attr('height', '32');
  footer.find('.footer-social ul').html(
    [
      ['https://www.linkedin.com/in/dhiego-cristofolini-77b964150/', 'fa-linkedin-in', 'LinkedIn'],
      [SITE.behance, 'fa-behance', 'Behance'],
      ['https://www.instagram.com/dhiegopires/', 'fa-instagram', 'Instagram'],
      ['https://github.com/Dhiegopires', 'fa-github', 'GitHub'],
    ]
      .map(([h, i, l]) => `<li><a href="${h}" target="_blank" rel="noopener" aria-label="${l}"><i class="fab ${i}" aria-hidden="true"></i></a></li>`)
      .join(''),
  );
  footer.find('.col-menu .footer-title').text(lang === 'pt' ? 'Navegação' : 'Navigation');
  footer.find('.col-menu nav ul').html(navItems(lang).slice(1).map(([h, l]) => `<li><a href="${h}">${l}</a></li>`).join(''));
  footer.find('.col-contact .footer-title').text(lang === 'pt' ? 'Contato' : 'Contact');
  footer.find('.col-contact').find('p').remove();
  footer.find('.col-contact').append(`<p><strong>E</strong> <span>:</span> <a class="link-hover" data-hover-text="${SITE.email}" href="mailto:${SITE.email}">${SITE.email}</a></p><p><strong>${lang === 'pt' ? 'Idioma' : 'Lang'}</strong> <span>:</span> <a href="${alt || ROUTES[other].home}">${other === 'pt' ? 'Português' : 'English'}</a></p>`);
  footer.find('.col-address .footer-title').text(lang === 'pt' ? 'Onde' : 'Based in');
  footer.find('.col-address p').html(`${lang === 'pt' ? 'Curitiba, Brasil' : 'Curitiba, Brazil'}<br>${lang === 'pt' ? 'Remoto, qualquer fuso' : 'Remote, any time zone'}`);
  footer.find('.copyright p').first().text(t.rights);
  footer.find('.copright-text').html(`<a href="${r.privacy}">${t.privacy}</a> · <a href="${r.terms}">${t.terms}</a>`);

  // Scripts from /assets/tpl (minified copies of the unminified ones); our
  // small add-on after the template's.
  $('script[src^="assets/js/"]').each((_, el) => $(el).attr('src', '/assets/tpl/js/' + $(el).attr('src').split('/').pop().replace(/^custom.js$/, 'custom.min.js')));
  $('script[src$="custom.min.js"]').after('<script src="/assets/tpl/js/addons.min.js"></script>');

  // Remaining relative template asset paths
  $('[src^="assets/"]').each((_, el) => $(el).attr('src', '/assets/tpl/' + $(el).attr('src').slice(7)));
  $('[data-image-src^="assets/"]').each((_, el) => $(el).attr('data-image-src', '/assets/tpl/' + $(el).attr('data-image-src').slice(7)));
  $('main.main-root').attr('id', 'main-content').attr('tabindex', '-1');
};

// .htaccess caches CSS/JS for a week, so template assets carry a content
// hash: a changed file gets a new URL and returning visitors fetch it.
const hashes = new Map();
const version = (url) => {
  if (!hashes.has(url)) {
    let v = '';
    try {
      v = createHash('sha1').update(readFileSync(join(root, url))).digest('hex').slice(0, 8);
    } catch {}
    hashes.set(url, v);
  }
  return hashes.get(url);
};
const bust = ($) => {
  $('link[href^="/assets/tpl/"][href$=".css"], script[src^="/assets/tpl/"][src$=".js"]').each((_, el) => {
    const a = el.tagName === 'link' ? 'href' : 'src';
    const url = $(el).attr(a);
    const v = version(url);
    if (v) $(el).attr(a, `${url}?v=${v}`);
  });
};

// The template uses h4-h6 for labels (card category, hero subtitle, intro
// signature, years label): keep the look, drop the heading semantics so the
// outline goes h1 > h2 > h3 without skips. Footer column titles are real
// section labels, announced as level 2.
const headingSemantics = ($) => {
  $('h5.cat, .sub-text-header h5, .intro-about h6, .exper h4, .services-item h4').attr('role', 'none');
  $('footer .footer-title').attr('aria-level', '2');
  // Card and tile titles sit one level under their section heading.
  $('.our-work .item-info h4, .brand-client .logo-box .entry h5').attr('aria-level', '3');
  $('.projects-list .item-info h4').attr('aria-level', '2');
  // Contact page: the two column titles are sections of the page (h2),
  // the direct-contact line belongs to the first.
  $('.box-info-contact > h3, .form-box > h3').attr('aria-level', '2');
  $('.box-info-contact > h5').attr('aria-level', '3');
};

export const html = ($) => {
  headingSemantics($);
  bust($);
  return '<!DOCTYPE html>\n' + $.html().replace(/^<!DOCTYPE html>\s*/i, '');
};
export { esc };
