// Content pages on the Droow template:
//   work list   = work.html (header-hero + isotope filter grid)
//   insights    = blog.html (post-list-item list)
//   article     = post.html (header-single-post + news-content)
//   about, résumé, privacy, terms, Meaple doc, 404 = contact.html shell
//     (header-hero + a content block + contact-up call-out)
// Long-form bodies keep their own markup and are styled by content.css,
// scoped to .content-body.
import { SITE, ROUTES, CASES, POSTS, FILTERS, postUrl } from '../data.mjs';
import { T } from '../i18n.mjs';
import { postMeta, pageContent } from '../content.mjs';
import { normalizeBody } from './normalize.mjs';
import { loadTemplate, fillChrome, html, esc } from './from-template.mjs';
import { webpSize } from './img-size.mjs';

const other = (lang) => (lang === 'en' ? 'pt' : 'en');
const footerFromIndex = ($) => {
  const idx = loadTemplate('home.html');
  $('main footer').first().replaceWith(idx.html(idx('footer.footer').first()));
};
const contentCss = ($) => $('link[href="/assets/tpl/css/site.min.css"]').after('<link href="/assets/tpl/css/content.min.css" rel="stylesheet">');
const jsonld = ($, data) => data.forEach((j) => $('head').append(`<script type="application/ld+json">${JSON.stringify(j)}</script>`));
const imgDims = (url) => {
  const d = /\.webp$/.test(url) ? webpSize(url) : null;
  return d ? ` width="${d.w}" height="${d.h}"` : '';
};

/* contact-up call-out (template big outlined text) */
const callout = ($, { href, small, big }) => {
  const up = $('.contact-up').first();
  up.find('a').attr('href', href).removeClass('effect-ajax');
  up.find('.hiring').text(small);
  up.find('.career').text(big);
};

/* ---------- Generic shell from contact.html ---------- */
export const shellPage = ({ lang, title, description, path, alt, eyebrow, h1, h1Hidden, lead, body, up, bodyClass = '', noindex = false, ld = [], image }) => {
  const $ = loadTemplate('contact.html');
  footerFromIndex($);
  fillChrome($, { lang, title, description, path, alt });
  contentCss($);
  if (image) $('meta[property="og:image"]').attr('content', SITE.url + image);
  if (noindex) $('head').prepend('<meta name="robots" content="noindex">');
  jsonld($, ld);
  $('body').addClass(`page-content ${bodyClass}`.trim());
  const hero = $('.header-hero .contenet-hero');
  hero.find('h5').text(eyebrow || '');
  if (!eyebrow) hero.find('h5').remove();
  hero.find('h1').text(h1);
  if (h1Hidden) {
    hero.find('h1').prepend(`<span class="visually-hidden">${esc(h1Hidden)} </span>`);
    hero.find('h5').attr('aria-hidden', 'true');
  }
  if (lead) hero.append(`<p>${esc(lead)}</p>`);
  hero.closest('.col-lg-6').removeClass('col-lg-6').addClass('col-lg-9');
  $('.root-contact').replaceWith(`<div class="root-content container section-margin"><div class="content-body">${body}</div></div>`);
  if (up) callout($, up);
  else $('.contact-up').remove();
  return html($);
};

/* ---------- Work ---------- */
export const workListPage = (lang) => {
  const $ = loadTemplate('work.html');
  const r = ROUTES[lang];
  const pt = lang === 'pt';
  footerFromIndex($);
  fillChrome($, {
    lang,
    title: pt ? 'Trabalhos | Dhiego Cristofolini | Senior Product Designer' : 'Work | Dhiego Cristofolini | Senior Product Designer',
    description: pt
      ? 'Cases de product design: SaaS, healthtech, eventos, design systems e sites de conversão, com o processo e os resultados de cada um.'
      : 'Product design case studies: SaaS, healthtech, events, design systems and conversion sites, with the process and results behind each one.',
    path: r.work,
    alt: ROUTES[other(lang)].work,
  });
  const hero = $('.header-hero .contenet-hero');
  hero.find('h5').text(pt ? 'Trabalhos' : 'Work');
  hero.find('h1').text(pt ? 'Cases selecionados' : 'Selected work');
  hero.append(`<p>${pt ? 'Produto, design system e sites, do problema ao resultado.' : 'Product, design systems and websites, from the problem to the result.'}</p>`);
  hero.closest('.col-lg-6').removeClass('col-lg-6').addClass('col-lg-9');
  $('.box-title .title-cover').text(pt ? 'Projetos' : 'Projects');
  const flt = $('.filtering');
  flt.find('button').remove();
  flt.append(`<button type="button" data-filter="*" class="active">${pt ? 'Todos' : 'All'}</button>`);
  FILTERS.work.forEach((f) => flt.append(`<button type="button" data-filter=".f-${f.id}">${esc(f[lang])}</button>`));
  const list = $('.projects-list').empty();
  [...CASES].sort((a, b) => a.home - b.home).forEach((c) => {
    list.append(`
      <div class="item ${c.filters.map((f) => 'f-' + f).join(' ')}">
        <a href="${r.case(c.slug)}" data-dsn-grid="move-up">
          <img class="has-top-bottom" src="${c.img.src}" srcset="${c.img.srcset}" sizes="(min-width: 992px) 45vw, 100vw" width="${c.img.w}" height="${c.img.h}" alt="${esc(c.alt ? c.alt[lang] || '' : '')}" loading="lazy" decoding="async">
          <div class="item-border"></div>
          <div class="item-info">
            <h5 class="cat">${esc(c.cat[lang])}</h5>
            <h4>${esc(c.title)}</h4>
            <span><span>${pt ? 'Ver projeto' : 'View project'}</span></span>
          </div>
        </a>
      </div>`);
  });
  callout($, { href: r.contact, small: pt ? 'Vamos conversar' : 'Let’s talk', big: pt ? 'Tem um projeto em mente?' : 'Have a project in mind?' });
  return html($);
};

/* ---------- Insights ---------- */
const fmtDate = (d, lang) =>
  new Date(`${d}T12:00:00Z`).toLocaleDateString(lang === 'pt' ? 'pt-BR' : 'en-US', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });

export const blogListPage = (lang) => {
  const $ = loadTemplate('blog.html');
  const r = ROUTES[lang];
  const pt = lang === 'pt';
  footerFromIndex($);
  fillChrome($, {
    lang,
    title: pt ? 'Artigos de design e acessibilidade | Dhiego Cristofolini' : 'Articles on design and accessibility | Dhiego Cristofolini',
    description: pt
      ? 'Artigos sobre acessibilidade, design systems e decisões de produto, com demos interativas e o raciocínio por trás de cada escolha.'
      : 'Articles on accessibility, design systems and product decisions, with interactive demos and the reasoning behind each call.',
    path: r.blog,
    alt: ROUTES[other(lang)].blog,
  });
  const hero = $('.header-hero .contenet-hero');
  hero.find('h5').text('Insights');
  hero.find('h1').text(pt ? 'Artigos' : 'Articles');
  hero.append(`<p>${pt ? 'Acessibilidade, design systems e decisões de produto, com demos que você pode testar.' : 'Accessibility, design systems and product decisions, with demos you can try.'}</p>`);
  hero.closest('.col-lg-6').removeClass('col-lg-6').addClass('col-lg-9');
  const root = $('.root-blog .container').empty();
  [...POSTS].sort((a, b) => b.date.localeCompare(a.date)).forEach((p) => {
    const m = postMeta(p.slug, lang);
    const cat = FILTERS.blog.find((f) => f.id === p.cat);
    const src = `/assets/img/blog/${p.hero}`;
    root.append(`
      <article class="post-list-item">
        <figure>
          <a class="image-zoom" href="${postUrl(p, lang)}" tabindex="-1" aria-hidden="true" data-dsn-animate="up">
            <img src="${src}"${imgDims(src)} alt="${esc(m.hero && m.hero.alt ? m.hero.alt : '')}" loading="lazy" decoding="async">
          </a>
        </figure>
        <div class="post-list-item-content">
          <div class="post-info-top">
            <div class="post-info-date"><span><time datetime="${p.date}">${fmtDate(p.date, lang)}</time> · ${T[lang].minRead(p.read)}</span></div>
            <div class="post-info-category"><span>${esc(cat[lang])}</span></div>
          </div>
          <h2 class="post-list-title"><a href="${postUrl(p, lang)}">${esc(m.title)}</a></h2>
          <p class="post-list-desc">${esc(m.description)}</p>
          <div class="link-custom" data-dsn-animate="up">
            <a class="image-zoom" href="${postUrl(p, lang)}" data-dsn="parallax" aria-label="${esc((pt ? 'Ler: ' : 'Read: ') + m.title)}"><span>${pt ? 'Ler artigo' : 'Read article'}</span></a>
          </div>
        </div>
      </article>`);
  });
  root.append(newsletterForm(lang));
  callout($, { href: r.contact, small: pt ? 'Vamos conversar' : 'Let’s talk', big: pt ? 'Tem um projeto em mente?' : 'Have a project in mind?' });
  return html($);
};

const newsletterForm = (lang) => {
  const pt = lang === 'pt';
  return `
  <section class="newsletter" aria-labelledby="nl-title">
    <h2 id="nl-title" class="newsletter__title">${pt ? 'Receba o próximo artigo' : 'Get the next article'}</h2>
    <p class="newsletter__text">${pt ? 'Um email quando sair um artigo novo. Sem spam, sai quando quiser.' : 'One email when a new article is out. No spam, leave anytime.'}</p>
    <form class="form newsletter__form" method="post" action="/contact.php" data-site-form novalidate
      data-sending="${pt ? 'Enviando…' : 'Sending…'}"
      data-ok="${esc(pt ? 'Pronto. Você recebe o próximo artigo por email.' : 'Done. You’ll get the next article by email.')}"
      data-fail="${esc(pt ? `Não foi possível agora. Escreva para ${SITE.email}.` : `Couldn’t do it right now. Email ${SITE.email}.`)}"
      data-err-email="${esc(pt ? 'Informe um email válido.' : 'Please enter a valid email.')}">
      <input type="hidden" name="type" value="newsletter">
      <input type="hidden" name="lang" value="${lang}">
      <div class="hp-field" aria-hidden="true"><label for="nl_company">Company</label><input id="nl_company" type="text" name="company" tabindex="-1" autocomplete="off"></div>
      <div class="newsletter__row">
        <div class="form-group">
          <label for="nl_email">Email</label>
          <input id="nl_email" type="email" name="email" autocomplete="email" required placeholder="${pt ? 'voce@empresa.com' : 'you@company.com'}" aria-describedby="nl_email_err">
          <div class="help-block with-errors" id="nl_email_err"></div>
        </div>
        <button type="submit">${pt ? 'Inscrever' : 'Subscribe'}</button>
      </div>
      <p class="newsletter__legal">${pt ? 'Ao se inscrever, você concorda com a' : 'By subscribing you agree to the'} <a href="${ROUTES[lang].privacy}">${pt ? 'Política de Privacidade' : 'Privacy Policy'}</a>.</p>
      <div class="messages" role="status" aria-live="polite"></div>
    </form>
  </section>`;
};

/* ---------- Article ---------- */
export const articlePage = (slug, lang) => {
  const $ = loadTemplate('post.html');
  const t = T[lang];
  const pt = lang === 'pt';
  const i = POSTS.findIndex((p) => p.slug === slug);
  const p = POSTS[i];
  const d = postMeta(slug, lang);
  const sorted = [...POSTS].sort((a, b) => b.date.localeCompare(a.date));
  const next = sorted[(sorted.findIndex((x) => x.slug === slug) + 1) % sorted.length];
  const nm = postMeta(next.slug, lang);
  const cat = FILTERS.blog.find((f) => f.id === p.cat);
  const hero = `/assets/img/blog/${p.hero}`;
  footerFromIndex($);
  fillChrome($, { lang, title: d.seoTitle, description: d.description, path: postUrl(p, lang), alt: postUrl(p, other(lang)), image: `/assets/img/og/post-${slug}.jpg` });
  contentCss($);
  $('meta[property="og:type"]').attr('content', 'article');
  jsonld($, [{
    '@context': 'https://schema.org', '@type': 'Article', headline: d.title, description: d.description,
    datePublished: p.date, dateModified: p.date, image: SITE.url + hero, url: SITE.url + postUrl(p, lang),
    inLanguage: t.htmlLang, author: { '@type': 'Person', name: 'Dhiego Cristofolini', url: SITE.url + '/' },
  }]);
  $('body').addClass('page-post');
  const head = $('.header-single-post').first();
  head.find('#dsn-hero-parallax-img').attr('src', hero).attr({ width: webpSize(hero).w, height: webpSize(hero).h }).attr('alt', d.hero && d.hero.alt ? d.hero.alt : '').attr('fetchpriority', 'high')
    .removeAttr('data-dsn-ajax');
  const info = head.find('.post-info');
  info.html(`<a href="${ROUTES[lang].blog}" class="blog-post-date dsn-link">${t.insights}</a>
    <div class="blog-post-cat dsn-link"><span><time datetime="${p.date}">${fmtDate(p.date, lang)}</time> · ${t.minRead(p.read)} · ${esc(cat[lang])}</span></div>`);
  head.find('.title-box').replaceWith(`<h1 class="title-box mt-10">${esc(d.title)}</h1><p class="post-dek">${esc(d.description)}</p>`);
  const inner = $('.news-content-inner').first();
  inner.find('.News-socials-wrapper').remove();
  inner.find('.post-content').replaceWith(`<div class="post-content content-body"><div class="article-body">${normalizeBody(d.body)}</div></div>`);
  $('.comments-post').remove();
  $('.news-content-inner').after(`<div class="post-newsletter">${newsletterForm(lang)}</div>`);
  const up = $('.contact-up').first();
  up.find('a').attr('href', postUrl(next, lang)).removeClass('effect-ajax');
  up.find('.hiring').text(pt ? 'Próximo artigo' : 'Next article');
  up.find('.career').text(nm.title);
  return html($);
};

/* ---------- About / Résumé / legal / doc / 404 ---------- */
export const aboutPage2 = (lang) => {
  const d = pageContent('about', lang);
  const pt = lang === 'pt';
  const t = T[lang];
  const body = `
    <div class="about-layout">
      <figure class="about-photo"><img src="/assets/img/site/hello.webp" width="640" height="640" alt="${esc(t.hello.alt)}" loading="lazy" decoding="async"></figure>
      <div class="about-body">${d.html.replace(/class="about-grid"/, '')}</div>
    </div>`;
  return shellPage({
    lang, title: d.seoTitle, description: d.description, path: ROUTES[lang].about, alt: ROUTES[other(lang)].about,
    eyebrow: pt ? 'Sobre' : 'About', h1: d.title.replace(/\.$/, ''), lead: d.sub, body,
    up: { href: ROUTES[lang].work, small: pt ? 'Portfólio' : 'Portfolio', big: pt ? 'Ver trabalhos' : 'See selected work' },
  });
};

export const resumePage2 = (lang) => {
  const d = pageContent('resume', lang);
  const pt = lang === 'pt';
  const pdf = `/assets/files/Dhiego%20Cristofolini%20-%20${pt ? 'PT' : 'EN'}%20-%20PRODUCT%20DESIGNER.pdf`;
  const actions = `<div class="resume-actions"><div class="link-custom"><a href="${pdf}" download><span>${pt ? 'Baixar PDF' : 'Download PDF'}</span></a></div>
    <button class="resume-print" type="button" data-print>${pt ? 'Imprimir esta página' : 'Print this page'}</button></div>`;
  const htmlBody = normalizeBody(d.html)
    .replace(/<button[^>]*resume-print-btn[\s\S]*?<\/button>/, '')
    .replace(/<span class="resume-header__hint">[\s\S]*?<\/span>/, '')
    .replace(/<h1 class="resume-header__name">([\s\S]*?)<\/h1>/, '<p class="resume-header__name">$1</p>');
  return shellPage({
    lang, title: d.seoTitle, description: d.description, path: ROUTES[lang].resume, alt: ROUTES[other(lang)].resume,
    eyebrow: pt ? 'Currículo' : 'Résumé', h1: 'Dhiego Cristofolini', h1Hidden: pt ? 'Currículo:' : 'Résumé:', lead: pt ? 'Senior Product Designer · Curitiba, Brasil · Remoto' : 'Senior Product Designer · Curitiba, Brazil · Remote',
    body: actions + htmlBody, bodyClass: 'page-resume',
    ld: [{ '@context': 'https://schema.org', '@type': 'ProfilePage', mainEntity: { '@type': 'Person', name: 'Dhiego Cristofolini', jobTitle: 'Senior Product Designer', url: SITE.url + '/' } }],
    up: { href: ROUTES[lang].contact, small: pt ? 'Vamos conversar' : 'Let’s talk', big: pt ? 'Entre em contato' : 'Get in touch' },
  });
};

export const legalPage2 = (key, lang) => {
  const d = pageContent(key, lang);
  return shellPage({
    lang, title: d.seoTitle, description: d.description, path: ROUTES[lang][key], alt: ROUTES[other(lang)][key],
    eyebrow: lang === 'pt' ? 'Legal' : 'Legal', h1: d.title.replace(/\.$/, ''), lead: d.sub,
    body: `<div class="prose-read legal">${d.html}</div>`,
  });
};

export const meapleDocPage2 = () => {
  const d = pageContent('meaple-doc', 'en');
  return shellPage({
    lang: 'en', title: d.seoTitle, description: d.description, path: '/work/meaple/documentation/', alt: null,
    eyebrow: d.meta, h1: d.title, lead: d.description,
    body: `<div class="prose-read article-body doc-body">${normalizeBody(d.html)}</div>`,
    up: { href: ROUTES.en.case('meaple'), small: 'Back to the case', big: 'Meaple: five apps for one Friday night' },
  });
};

export const notFoundPage2 = () =>
  shellPage({
    lang: 'en', title: 'Page not found | Dhiego Cristofolini', description: 'This page does not exist or has moved.', path: '/404.html', alt: null, noindex: true,
    eyebrow: '404', h1: 'This page doesn’t exist, or moved.', lead: 'Essa página não existe, ou mudou de lugar.',
    body: `<div class="nf-actions">
      <div class="link-custom"><a href="/"><span>Back to home</span></a></div>
      <div class="link-custom"><a href="/work/"><span>See the work</span></a></div>
      <div class="link-custom"><a href="/pt-br/" lang="pt-BR"><span>Versão em português</span></a></div></div>`,
  });
