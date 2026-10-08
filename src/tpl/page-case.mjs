// Case page = SITE/template/dark/project-9.html, filled from a case spec in
// src/content/cases-v2. Template pieces kept: headefr-fexid hero,
// intro-project (intro + giant outline word), next-project, shared footer,
// data-dsn-* animations.
// Blocks:
//   wide     full-bleed photo with caption
//   boards   stacked full-bleed photos, each with a label
//   section  numbered heading + short text. Default layout: heading row,
//            then any of stats / artifact / wide / pair / wide2.
//            layout 'split': copy on one side, media on the other
//            (portrait | stats | pair), `reverse` swaps sides.
//   results  numbers, source line, links
import { ROUTES, CASES } from '../data.mjs';
import { loadTemplate, fillChrome, html, esc } from './from-template.mjs';
import { webpSize } from './img-size.mjs';

export const casePageV2 = (spec, lang) => {
  const $ = loadTemplate('project-9.html');
  const c = spec[lang];
  const r = ROUTES[lang];
  const pt = lang === 'pt';
  const base = `/assets/img/case/${spec.slug}/`;
  const pic = (name, { sizes = '100vw', alt = '', small = 1000, cls = '' } = {}) => {
    const d = webpSize(`${base}${name}.webp`);
    const dims = d ? ` width="${d.w}" height="${d.h}"` : '';
    return `<img${cls ? ` class="${cls}"` : ''}${dims} src="${base}${name}.webp" srcset="${base}${name}-${small}.webp ${small}w, ${base}${name}.webp 2000w" sizes="${sizes}" alt="${esc(alt)}" loading="lazy" decoding="async">`;
  };

  const idx = loadTemplate('index.html');
  $('#dsn-scrollbar > footer, main footer').first().replaceWith(idx.html(idx('footer.footer').first()));

  fillChrome($, {
    lang,
    title: c.seoTitle,
    description: c.description,
    path: r.case(spec.slug),
    alt: ROUTES[pt ? 'en' : 'pt'].case(spec.slug),
  });
  $('body').addClass('case-v2');

  /* Hero */
  const hero = $('.headefr-fexid').first();
  hero.find('.bg-image').attr('data-image-src', spec.hero.src).attr('data-overlay', '2');
  hero.find('.cat span').text(c.cat);
  hero.find('.title-text-header-inner').replaceWith(`<h1 class="title-text-header-inner"><span>${esc(c.title)}</span></h1>`);
  hero.find('.sub-text-header').html(`<h5>${esc(c.sub)}</h5>`);
  hero.find('.project-page__inner').remove();

  /* Intro + project facts */
  const intro = $('.intro-project').first();
  intro.find('.title-cover').text(c.cover);
  intro.find('.inner h2').text(c.introTitle);
  intro.find('.inner p').first().text(c.intro);
  intro.find('.bottom-link').replaceWith(`
    <dl class="case-meta" data-dsn-animate="up">
      ${c.meta.map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join('')}
    </dl>`);

  const root = $('.root-project');
  root.children().not(intro).remove();

  /* Pieces */
  const stats = (list, cls = '') =>
    `<ul class="cs-stats ${cls}" data-dsn-animate="up">${list.map(([n, l]) => `<li><strong>${esc(n)}</strong><span>${esc(l)}</span></li>`).join('')}</ul>`;
  const fig = (o, sizes) =>
    `<figure class="cs-fig">${pic(o.img, { alt: o.alt, sizes })}${o.caption ? `<figcaption>${esc(o.caption)}</figcaption>` : ''}</figure>`;
  const wide = (o) => `
    <figure class="cs-wide">
      <div class="cs-wide__img">${pic(o.img, { alt: o.alt })}</div>
      ${o.caption ? `<figcaption class="container">${esc(o.caption)}</figcaption>` : ''}
    </figure>`;
  const artifact = (o) => `
    <figure class="cs-artifact container">
      <a class="cs-artifact__frame" href="${base}${o.img}-${lang}.webp" target="_blank" rel="noopener">
        ${pic(`${o.img}-${lang}`, { alt: o.alt, sizes: '(min-width: 1200px) 1140px, 100vw' })}
      </a>
      <figcaption>${pt ? 'Abrir em tamanho real' : 'Open full size'}</figcaption>
    </figure>`;
  const pair = (items, even) => `<div class="cs-pair${even ? ' cs-pair--even' : ''} container">${items.map((o) => fig(o, '(min-width: 768px) 50vw, 100vw')).join('')}</div>`;
  const boards = (items) => `<div class="cs-boards">${items.map((o) => `
      <figure class="cs-board">
        <figcaption class="container"><span class="cs-board__label">${esc(o.label)}</span>${o.caption ? `<span>${esc(o.caption)}</span>` : ''}</figcaption>
        <div class="cs-board__img">${pic(o.img, { alt: o.alt })}</div>
      </figure>`).join('')}</div>`;
  const headBlock = (b) => `
    <div class="cs-head__main">
      ${b.num ? `<span class="cs-num" aria-hidden="true">${esc(b.num)}</span>` : ''}
      <p class="cs-eyebrow">${esc(b.sub)}</p>
      <h2 class="cs-title" data-dsn-animate="up">${esc(b.title)}</h2>
    </div>`;
  const text = (t) => (t ? `<p class="cs-text" data-dsn-animate="up">${esc(t)}</p>` : '');

  const blocks = c.blocks.map((b) => {
    if (b.type === 'wide') return wide(b);
    if (b.type === 'boards') {
      return `<section class="cs cs--boards">
        ${b.title ? `<div class="container cs-head">${headBlock(b)}${text(b.text)}</div>` : ''}
        ${boards(b.items)}
      </section>`;
    }
    if (b.type !== 'section') return '';
    if (b.layout === 'split') {
      let media = '';
      if (b.portrait) media = fig(b.portrait, '(min-width: 992px) 50vw, 100vw');
      else if (b.stats) media = stats(b.stats, 'cs-stats--grid');
      else if (b.pair) media = `<div class="cs-stack">${b.pair.map((o) => fig(o, '(min-width: 992px) 30vw, 100vw')).join('')}</div>`;
      return `<section class="cs cs--split${b.reverse ? ' cs--reverse' : ''}">
        <div class="container cs-split">
          <div class="cs-split__copy">${headBlock(b)}${text(b.text)}</div>
          <div class="cs-split__media">${media}</div>
        </div>
        ${b.artifact ? artifact(b.artifact) : ''}
        ${b.wide ? wide(b.wide) : ''}
      </section>`;
    }
    return `<section class="cs">
      <div class="container cs-head">${headBlock(b)}${text(b.text)}</div>
      ${b.stats ? `<div class="container">${stats(b.stats)}</div>` : ''}
      ${b.artifact ? artifact(b.artifact) : ''}
      ${b.artifacts ? `<div class="cs-artifacts">${b.artifacts.map(artifact).join('')}</div>` : ''}
      ${b.wide ? wide(b.wide) : ''}
      ${b.pair ? pair(b.pair, b.pairEven) : ''}
      ${b.wide2 ? wide(b.wide2) : ''}
    </section>`;
  });

  if (c.results) {
    const x = c.results;
    blocks.push(`<section class="cs cs--results">
      <div class="container">
        <div class="cs-head">${headBlock({ sub: x.sub, title: x.title })}${text(x.text)}</div>
        ${stats(x.stats, 'cs-stats--results')}
        ${x.source ? `<p class="cs-source">${esc(x.source)}</p>` : ''}
        ${x.links ? `<div class="cs-links">${x.links.map(([h, l]) => `<div class="link-custom"><a href="${h}"${h.startsWith('http') ? ' target="_blank" rel="noopener"' : ''}><span>${esc(l)}</span></a></div>`).join('')}</div>` : ''}
      </div>
    </section>`);
  }
  root.append(blocks.join('\n'));

  /* Next project: following case in home order */
  const order = [...CASES].sort((a, b) => a.home - b.home);
  const next = order[(order.findIndex((x) => x.slug === spec.slug) + 1) % order.length];
  const np = $('.next-project').first();
  np.find('.bg-image').attr('data-image-src', next.cover ? next.cover.src : next.img.src);
  np.find('a').attr('href', r.case(next.slug)).removeClass('effect-ajax').removeAttr('data-dsn-ajax');
  np.find('.title-text-header-inner span').text(next.title);
  np.find('.sub-text-header h5').text(pt ? 'Próximo projeto' : 'Next project');

  return html($);
};
