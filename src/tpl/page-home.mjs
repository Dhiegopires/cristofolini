// Home = src/tpl/html/index.html with Dhiego's content.
import { ROUTES, CASES, FEATURED, POSTS, TESTIMONIALS, COMPANIES, postUrl } from '../data.mjs';
import { T } from '../i18n.mjs';
import { postMeta } from '../content.mjs';
import { loadTemplate, fillChrome, html, esc } from './from-template.mjs';
import { imgSize } from './img-size.mjs';

const dims = (url) => {
  const d = imgSize(url);
  return d ? { width: d.w, height: d.h } : {};
};

export const homePage = (lang) => {
  const $ = loadTemplate('home.html');
  const t = T[lang];
  const r = ROUTES[lang];
  const pt = lang === 'pt';
  const cases = [...CASES].sort((a, b) => a.home - b.home);

  fillChrome($, {
    lang,
    title: pt ? 'Dhiego Cristofolini | Product Designer Sênior' : 'Dhiego Cristofolini | Senior Product Designer',
    description: pt
      ? 'Senior Product Designer com mais de 7 anos em SaaS, B2B e B2B2C. UX orientado a conversão, design systems e fluxos complexos de produto.'
      : 'Senior Product Designer with 7+ years in SaaS, B2B and B2B2C. Conversion-driven UX, design systems, complex product flows.',
    path: r.home,
    alt: ROUTES[pt ? 'en' : 'pt'].home,
  });

  /* Hero: one-page-4's full-screen header (centered title, parallax on
     scroll). Its video slot holds a WebGL surface (assets/tpl/js/hero-gl.js)
     with a CSS gradient underneath as the no-WebGL fallback. Two CTAs in the
     template's link-custom pill: work first, résumé for recruiters. */
  const op4 = loadTemplate('one-page-4.html');
  const hero = op4('main header').first();
  hero.find('.headefr-fexid').addClass('hero-home');
  hero.find('#dsn-hero-parallax-img').html('<canvas class="hero-gl" data-hero-gl aria-hidden="true"></canvas>');
  hero.find('.sub-text-header h5').text('Dhiego Cristofolini');
  hero.find('.title-text-header').replaceWith(`
    <h1 class="title-text-header"><span class="title-text-header-inner"><span>${pt ? 'Product Designer Sênior' : 'Senior Product Designer'}</span></span></h1>
    <p class="hero-lead">${esc(pt
      ? 'Mais de 7 anos desenhando SaaS B2B e B2B2C. UX orientado a conversão, design systems e fluxos complexos, da pesquisa à interface pronta para produção.'
      : '7+ years designing B2B and B2B2C SaaS. Conversion-driven UX, design systems and complex product flows, from research to production-ready UI.')}</p>
    <p class="hero-status">${pt ? 'Aberto a vagas de Product Designer Sênior · Remoto' : 'Open to Senior Product Designer roles · Remote'}</p>
    <div class="hero-ctas">
      <div class="link-custom link-custom--accent"><a href="#work" class="image-zoom" data-dsn="parallax"><span>${pt ? 'Ver trabalhos' : 'View work'}</span></a></div>
      <div class="link-custom"><a href="${r.resume}" class="image-zoom" data-dsn="parallax"><span>${pt ? 'Currículo' : 'Résumé'}</span></a></div>
    </div>`);
  $('.dsn-slider').replaceWith(op4.html(hero));
  $('.footer-slid').remove();
  $('.box-seat, .box-gallery-vertical').remove();

  /* About intro */
  const intro = $('.intro-about');
  intro.find('h2').html(`${t.hello.title[0]} <br> ${t.hello.title[1]}`);
  intro.find('.intro-content-text > p').first().text(t.hello.p.join(' '));
  intro.find('h6').text('Dhiego Cristofolini');
  intro.find('small').text(pt ? 'Product Designer Sênior' : 'Senior Product Designer');
  intro.find('.numb-ex .word').text('7');
  intro.find('.exper h4').html(pt ? 'ANOS DE <br> DESIGN DE PRODUTO' : 'YEARS OF <br> PRODUCT DESIGN');
  intro.find('.background-mask img').attr({ src: '/assets/img/site/hello.webp', alt: t.hello.alt, width: 640, height: 640, loading: 'lazy', decoding: 'async' });

  /* No services section: the home talks to hiring teams, not clients. */
  $('.our-services-2').remove();

  // Prev/next for the template sliders (they ship with arrows: false);
  // addons.js drives them through the slick API.
  const sliderNav = (what) => `
    <div class="slider-nav">
      <button type="button" class="slider-btn" data-slick-dir="prev" aria-label="${pt ? `${what}: anterior` : `Previous ${what}`}"><i class="fas fa-angle-left" aria-hidden="true"></i></button>
      <button type="button" class="slider-btn" data-slick-dir="next" aria-label="${pt ? `${what}: próximo` : `Next ${what}`}"><i class="fas fa-angle-right" aria-hidden="true"></i></button>
    </div>`;

  /* Work: the Work page's two-column grid (same markup, same isotope
     layout), featured product cases only, all visible without a carousel. */
  const cards = cases
    .slice(0, FEATURED)
    .map(
      (c) => `
      <div class="item">
        <a href="${r.case(c.slug)}" data-dsn-grid="move-up">
          <img class="has-top-bottom" src="${c.img.src}" srcset="${c.img.srcset}" sizes="(min-width: 768px) 45vw, 100vw" width="${c.img.w}" height="${c.img.h}" alt="${esc(c.alt ? c.alt[lang] : c.title)}" loading="lazy" decoding="async">
          <div class="item-border"></div>
          <div class="item-info">
            <h5 class="cat">${esc(c.cat[lang])}</h5>
            <h4>${esc(c.title)}</h4>
            <p class="item-result">${esc(c.result[lang])}</p>
            <span><span>${pt ? 'Ver projeto' : 'View project'}</span></span>
          </div>
        </a>
      </div>`,
    )
    .join('');
  $('.our-work').replaceWith(`
    <section class="our-work root-work home-work section-margin" id="work">
      <div class="container">
        <div class="section-head">
          <div class="one-title">
            <div class="title-sub-container"><p class="title-sub">${pt ? 'Trabalhos' : 'Work'}</p></div>
            <h2 class="title-main">${pt ? 'Trabalhos selecionados' : 'Selected work'}</h2>
          </div>
          <div class="link-custom"><a href="${r.work}" class="image-zoom" data-dsn="parallax"><span>${pt ? 'Todos os trabalhos' : 'All work'}</span></a></div>
        </div>
        <div class="projects-list gallery">${cards}</div>
      </div>
    </section>`);

  /* Testimonials */
  const cs = $('.client-see');
  cs.find('.title .text').text(pt ? 'O que dizem sobre mim.' : 'What they say about me.');
  const qTpl = cs.find('.slick-slider .item').first().clone();
  const qs = cs.find('.slick-slider').empty();
  TESTIMONIALS.forEach((q) => {
    const it = qTpl.clone();
    it.find('.quote p').text(`“${q.quote[lang]}”`);
    it.find('.avatar img').attr({ src: q.avatar, alt: q.name, ...dims(q.avatar) });
    it.find('.label .cell').text(`- ${q.name}, ${q.role[lang]}`);
    qs.append(it);
  });

  /* Insights: template news slider. Newest first; each card carries tag,
     date and reading time, and the whole card is one link (the title's
     ::after stretches over it). "All articles" sits beside the heading. */
  const news = $('.our-news');
  news.find('.title-sub').text('Insights');
  news.find('.title-main').text(pt ? 'Artigos recentes' : 'Latest articles');
  news.find('.one-title').wrap('<div class="section-head"></div>').after(
    `<div class="head-actions">${sliderNav(pt ? 'Artigo' : 'article')}<div class="link-custom"><a href="${r.blog}" class="image-zoom" data-dsn="parallax"><span>${pt ? 'Todos os artigos' : 'All articles'}</span></a></div></div>`,
  );
  const fmtDate = (d) =>
    new Date(`${d}T12:00:00Z`).toLocaleDateString(pt ? 'pt-BR' : 'en-US', { month: 'short', year: 'numeric', timeZone: 'UTC' }).replace('.', '');
  const nTpl = news.find('.item-new').first().clone();
  const ns = news.find('.slick-slider').empty();
  [...POSTS].sort((a, b) => b.date.localeCompare(a.date)).forEach((p) => {
    const m = postMeta(p.slug, lang);
    const it = nTpl.clone();
    it.find('.image img').attr('src', `/assets/img/blog/${p.hero}`).attr('alt', m.hero && m.hero.alt ? m.hero.alt : '').attr({ loading: 'lazy', decoding: 'async', ...dims(`/assets/img/blog/${p.hero}`) });
    it.find('h5').replaceWith(
      `<p class="news-meta"><span class="news-tag">${esc(m.tag)}</span><span><time datetime="${p.date}">${fmtDate(p.date)}</time> · ${p.read} min</span></p>`,
    );
    it.find('.cta a').attr('href', postUrl(p, lang)).text(m.title);
    it.find('.content > p').not('.news-meta').addClass('news-desc').text(m.description);
    it.find('.content').append(`<span class="news-read" aria-hidden="true">${pt ? 'Ler artigo' : 'Read article'}</span>`);
    ns.append(it);
  });

  /* Clients: template logo grid with the + reveal */
  const SITES = { 'selo-h': 'https://seloh.org', meaple: 'https://meaple.com.br' };
  const bc = $('.brand-client');
  bc.find('.title-sub').text(pt ? 'Empresas' : 'Companies');
  bc.find('.title-main').text(t.companies.title);
  const lTpl = bc.find('.logo-box').first().clone();
  const lw = bc.find('.wapper-client').empty();
  COMPANIES.forEach((c) => {
    const it = lTpl.clone();
    it.find('img').attr({ src: `/assets/img/logos/${c.logo}.svg`, alt: c.name, ...dims(`/assets/img/logos/${c.logo}.svg`) });
    it.find('.entry h5').text(c.name);
    it.find('.info .icon').attr('tabindex', '0').attr('role', 'button').attr('aria-label', `${c.name}: ${pt ? 'mais informações' : 'more info'}`);
    it.find('.info .icon i').attr('aria-hidden', 'true');
    const site = SITES[c.id];
    it.find('.entry a').replaceWith(
      (c.role ? `<p>${esc(c.role[lang])}</p>` : '') +
        (site ? `<a href="${site}" target="_blank" rel="noopener">${site.replace(/^https?:\/\//, '')}</a>` : ''),
    );
    lw.append(it);
  });

  /* Contact call-out */
  const cu = $('.contact-up');
  cu.find('a').attr('href', r.contact).removeClass('effect-ajax');
  cu.find('.hiring').text(pt ? 'Vamos conversar' : "Let's talk");
  cu.find('.career').text(t.contact.title);

  const order = ['.our-work', '.intro-about', '.client-see', '.brand-client', '.our-news', '.contact-up'];
  const wrapper = $('.wrapper');
  order.forEach((sel) => wrapper.append($(sel).first()));
  wrapper.append(wrapper.children('footer'));
  $('script[src$="addons.min.js"]').after('<script src="/assets/tpl/js/hero-gl.min.js"></script>');
  return html($);
};
