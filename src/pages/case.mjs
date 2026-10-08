import { SITE, ROUTES, CASES } from '../data.mjs';
import { T } from '../i18n.mjs';
import { esc, join, img, tags, when } from '../lib.mjs';
import { page, contactCta } from '../partials.mjs';
import { caseContent } from '../content.mjs';
import { toRows } from '../blocks.mjs';

const COPY = {
  en: { next: 'Next project', outcomes: 'Project outcomes', details: 'Project details', context: 'Context', back: 'All work', gallery: 'Gallery' },
  pt: { next: 'Próximo projeto', outcomes: 'Resultados do projeto', details: 'Detalhes do projeto', context: 'Contexto', back: 'Todos os trabalhos', gallery: 'Galeria' },
};

// Hero image per case. Falls back to the case's own /work/<slug>/img/hero.webp.
const HERO = {
  medme: { src: '/assets/img/cards/medme.webp', srcset: '/assets/img/cards/medme-900.webp 900w, /assets/img/cards/medme.webp 1600w', w: 1600, h: 1200 },
  'vellumwire-ds': { src: '/work/vellumwire-ds/img/hero.webp', w: 1064, h: 738, contain: true },
  meaple: { src: '/assets/img/cards/meaple-cover.webp', srcset: '/assets/img/cards/meaple-cover-800.webp 800w, /assets/img/cards/meaple-cover.webp 1376w', w: 1376, h: 768 },
};

// Diagrams were drawn with the old site's fonts; point them at the new families.
export const normalizeBody = (html) =>
  html
    .replace(/font-family="'DM Sans',sans-serif"/g, 'font-family="Geist, sans-serif"')
    .replace(/font-family="'?IBM Plex Mono'?,monospace"/g, `font-family="'Geist Mono', monospace"`)
    .replace(/<img(?![^>]*\bdecoding=)/g, '<img decoding="async"')
    .replace(/<code([^>]*)>([\s\S]*?)<\/code>/g, (m, a, b) => `<code${a}>${b.replace(/"/g, '&quot;')}</code>`)
    .replace(/`tabindex="([1-9])"`/g, '`tabindex=&quot;$1&quot;`')
    .replace(/<br>(?=[^\s<])/g, '<br> ')
    .replace(/<table([\s\S]*?)<\/table>/g, '<div class="table-scroll" tabindex="0" role="region" aria-label="Table"><table$1</table></div>');

const stats = (d, c) =>
  when(d.stats.length, () => `
  <section class="case-stats container" aria-label="${c.outcomes}">
    <ul class="case-stats__list case-stats__list--${d.stats.length}">
${join(d.stats, (s) => `      <li class="case-stat" data-reveal="up"><span class="case-stat__num">${s.num}</span><span class="case-stat__label">${s.label}</span></li>\n`)}    </ul>
  </section>`);

const meta = (d, c) =>
  when(d.meta.length, () => `
  <section class="case-meta container" aria-label="${c.details}">
    <dl class="case-meta__list" data-reveal="up">
${join(d.meta, (m) => `      <div class="case-meta__item"><dt>${esc(m.label)}</dt><dd>${m.value}</dd></div>\n`)}    </dl>
  </section>`);

const context = (d, c) =>
  when(d.context && d.context.media, () => `
  <section class="case-section case-context" aria-label="${c.context}">
      <div class="case-row case-row--text"><div class="case-row__text"><p class="eyebrow">${d.context.eyebrow}</p></div></div>
      <div class="case-row case-row--media case-row--media-1">
        <div class="case-row__cell" data-reveal="fade">${normalizeBody(d.context.media)}${when(d.context.caption, `<p class="caption">${d.context.caption}</p>`)}</div>
      </div>
  </section>`);

const sectionHead = (s, id) => `
          <header class="case-row__head">
            ${when(s.num, `<span class="case-row__num" aria-hidden="true">${s.num}</span>`)}
            ${when(s.eyebrow, `<p class="eyebrow">${s.eyebrow}</p>`)}
            <h2 class="h-lg case-row__title" id="${id}" data-reveal="words">${s.title}</h2>
          </header>`;

// Figma case template: rows of image/text splits (alternating sides),
// full-width media rows (1, 2 or 3 up) and text rows.
let splitCount = 0;
const renderRow = (r, head) => {
  if (r.type === 'split') {
    const flip = splitCount++ % 2 ? ' case-row--flip' : '';
    return `
      <div class="case-row case-row--split${flip}">
        <div class="case-row__media" data-reveal="fade"><div class="case-row__figure">${normalizeBody(r.media)}</div></div>
        <div class="case-row__text">${head || ''}
          <div class="prose">${normalizeBody(r.text.join('\n'))}</div>
        </div>
      </div>`;
  }
  if (r.type === 'media') {
    const n = Math.min(r.items.length, 3);
    return `${head ? `
      <div class="case-row case-row--text"><div class="case-row__text">${head}</div></div>` : ''}
      <div class="case-row case-row--media case-row--media-${r.wide ? 'wide' : n}">
${r.items.map((m) => `        <div class="case-row__cell" data-reveal="fade">${normalizeBody(m)}</div>`).join('\n')}
      </div>`;
  }
  return `
      <div class="case-row case-row--text">
        <div class="case-row__text">${head || ''}
          <div class="prose">${normalizeBody(r.text.join('\n'))}</div>
        </div>
      </div>`;
};

const caseSection = (s) => {
  const id = `${s.id || 'gallery'}-title`;
  const rows = toRows(s.html);
  return `
    <section class="case-section" id="${s.id || 'gallery'}" aria-labelledby="${id}">${rows.map((r, i) => renderRow(r, i === 0 ? sectionHead(s, id) : '')).join('')}
    </section>`;
};

const nextProject = (cur, lang, c) => {
  const i = CASES.findIndex((x) => x.slug === cur.slug);
  const n = CASES[(i + 1) % CASES.length];
  return `
  <nav class="next-project" aria-label="${c.next}">
    <a class="next-project__link" href="${ROUTES[lang].case(n.slug)}" data-cursor="view">
      <span class="next-project__text">
        <span class="next-project__title">${n.title}</span>
        <span class="next-project__label">${c.next}</span>
      </span>
      <span class="next-project__media media-parallax" data-parallax>${img({ src: n.img.src, srcset: n.img.srcset, sizes: '(min-width: 48em) 75vw, 100vw', w: n.img.w, h: n.img.h, alt: '' })}</span>
    </a>
  </nav>`;
};

export const casePage = (slug, lang) => {
  const t = T[lang];
  const c = COPY[lang];
  const cs = CASES.find((x) => x.slug === slug);
  const d = caseContent(slug, lang);
  const heroImg = HERO[slug] || { src: d.heroImg.src, w: d.heroImg.w, h: d.heroImg.h };
  const heroAlt = d.heroImg ? d.heroImg.alt : cs.alt[lang];
  splitCount = 0;
  const sections = d.sections.map(caseSection).join('\n');
  const headline = d.headline ? d.headline.replace(/<[^>]+>/g, '') : '';
  const body = `
<article class="case" data-case="${slug}">
  <header class="case-hero">
    <div class="case-hero__media${(HERO[slug] ? HERO[slug].contain : d.heroImg && d.heroImg.contain) ? ' case-hero__media--contain' : ''}" data-hero-parallax>
      ${img({ src: heroImg.src, srcset: heroImg.srcset, sizes: '(min-width: 64em) 60vw, 100vw', w: heroImg.w, h: heroImg.h, alt: heroAlt, lazy: false, priority: true })}
    </div>
    <div class="case-hero__copy">
      <h1 class="case-hero__title">
        <span class="h-xl h-xl--case case-hero__name" data-reveal="words">${cs.title}</span>
        ${when(headline, `<span class="h-md case-hero__headline" data-reveal="up">${esc(headline)}</span>`)}
      </h1>
      <p class="case-hero__dek" data-reveal="up">${d.dek}</p>
      ${tags(d.tags)}
    </div>
  </header>
${stats(d, c)}
${meta(d, c)}
${context(d, c)}
  <div class="case-body">
${sections}
  </div>
</article>
${contactCta({ lang, page: slug })}
${nextProject(cs, lang, c)}
`;

  return page({
    lang,
    current: 'work',
    alt: ROUTES[lang === 'en' ? 'pt' : 'en'].case(slug),
    bodyClass: 'page-case',
    headOpts: {
      title: d.seoTitle,
      description: d.description,
      path: ROUTES[lang].case(slug),
      image: cs.img.src,
      imageAlt: heroAlt,
      type: 'article',
      jsonld: [
        {
          '@context': 'https://schema.org',
          '@type': 'CreativeWork',
          name: `${cs.title}${headline ? ': ' + headline : ''}`,
          description: d.description,
          url: SITE.url + ROUTES[lang].case(slug),
          image: SITE.url + cs.img.src,
          inLanguage: t.htmlLang,
          author: { '@type': 'Person', name: 'Dhiego Cristofolini', url: SITE.url + '/' },
        },
      ],
    },
    body,
  });
};
