// Home = SITE/template/dark/index.html with Dhiego's content.
import { ROUTES, CASES, POSTS, TESTIMONIALS, COMPANIES, postUrl } from '../data.mjs';
import { T } from '../i18n.mjs';
import { postMeta, caseContent } from '../content.mjs';
import { loadTemplate, fillChrome, html, esc } from './from-template.mjs';

const plain = (s = '') => String(s).replace(/<[^>]+>/g, '');

export const homePage = (lang) => {
  const $ = loadTemplate('index.html');
  const t = T[lang];
  const r = ROUTES[lang];
  const pt = lang === 'pt';
  const cases = [...CASES].sort((a, b) => a.home - b.home);
  const coverOf = (c) => (c.cover ? c.cover.src : c.img.src);

  fillChrome($, {
    lang,
    title: 'Dhiego Cristofolini | Senior Product Designer',
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
    <h1 class="title-text-header"><span class="title-text-header-inner"><span>Senior Product Designer</span></span></h1>
    <p class="hero-lead">${esc(pt
      ? 'Mais de 7 anos desenhando SaaS B2B e B2B2C. UX orientado a conversão, design systems e fluxos complexos, da pesquisa à interface pronta para produção.'
      : '7+ years designing B2B and B2B2C SaaS. Conversion-driven UX, design systems and complex product flows, from research to production-ready UI.')}</p>
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
  intro.find('small').text('Senior Product Designer');
  intro.find('.numb-ex .word').text('7');
  intro.find('.exper h4').html(pt ? 'ANOS DE <br> DESIGN DE PRODUTO' : 'YEARS OF <br> PRODUCT DESIGN');
  intro.find('.background-mask img').attr('src', '/assets/img/site/hello.webp').attr('alt', t.hello.alt);

  /* Services: about.html's text grid (rule, title, copy). No icons, so
     every service stands on its own words instead of repeated artwork. */
  const ab = loadTemplate('about.html');
  const svc = ab('.our-services').first();
  svc.find('.title-sub').text(pt ? 'Serviços' : 'Services');
  svc.find('.title-main').text(`${t.services.title[0]} ${t.services.title[1]}${t.services.accent}`);
  const sTpl = svc.find('.row .col-md-6').first().clone();
  const sRow = svc.find('.row').empty();
  t.services.items.forEach(([name, desc]) => {
    const col = sTpl.clone();
    col.find('.subtitle').text(name);
    col.find('p').text(desc);
    sRow.append(col);
  });
  $('.our-services-2').replaceWith(ab.html(svc));


  // Prev/next for the template sliders (they ship with arrows: false);
  // addons.js drives them through the slick API.
  const sliderNav = (what) => `
    <div class="slider-nav">
      <button type="button" class="slider-btn" data-slick-dir="prev" aria-label="${pt ? `${what}: anterior` : `Previous ${what}`}"><i class="fas fa-angle-left" aria-hidden="true"></i></button>
      <button type="button" class="slider-btn" data-slick-dir="next" aria-label="${pt ? `${what}: próximo` : `Next ${what}`}"><i class="fas fa-angle-right" aria-hidden="true"></i></button>
    </div>`;

  /* Work slider */
  const work = $('.our-work');
  work.attr('id', 'work');
  work.find('.title-sub').text(pt ? 'Trabalhos' : 'Work');
  work.find('.title-main').text(pt ? 'Trabalhos selecionados' : 'Selected work');
  work.find('.one-title').first().wrap('<div class="section-head"></div>').after(sliderNav(pt ? 'Projeto' : 'project'));
  const itemTpl = work.find('.work-item').first().clone();
  const slider = work.find('.slick-slider').empty();
  cases.forEach((c) => {
    const it = itemTpl.clone();
    it.find('img').attr('src', c.img.src).attr('alt', '');
    it.find('.item-info a').attr('href', r.case(c.slug)).removeClass('effect-ajax');
    it.find('.cat').text(c.cat[lang]);
    it.find('h4').text(c.title);
    it.find('.item-info a > span > span').text(pt ? 'Ver projeto' : 'View Project');
    // Whole card opens the case. The text link stays the one link assistive
    // tech and Tab see; this cover link is pointer-only.
    it.append(`<a class="card-cover-link" href="${r.case(c.slug)}" tabindex="-1" aria-hidden="true"></a>`);
    slider.append(it);
  });

  /* Testimonials */
  const cs = $('.client-see');
  cs.find('.title .text').text(pt ? 'O que dizem sobre mim.' : 'What they say about me.');
  const qTpl = cs.find('.slick-slider .item').first().clone();
  const qs = cs.find('.slick-slider').empty();
  TESTIMONIALS.forEach((q) => {
    const it = qTpl.clone();
    it.find('.quote p').text(`“${q.quote[lang]}”`);
    it.find('.avatar img').attr('src', q.avatar).attr('alt', '');
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
    it.find('.image img').attr('src', `/assets/img/blog/${p.hero}`).attr('alt', '').attr('loading', 'lazy');
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
    it.find('img').attr('src', `/assets/img/logos/${c.logo}.svg`).attr('alt', c.name);
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

  const order = ['.our-work', '.intro-about', '.brand-client', '.our-services', '.our-news', '.client-see', '.contact-up'];
  const wrapper = $('.wrapper');
  order.forEach((sel) => wrapper.append($(sel).first()));
  wrapper.append(wrapper.children('footer'));
  $('script[src$="addons.js"]').after('<script src="/assets/tpl/js/hero-gl.js"></script>');
  return html($);
};
