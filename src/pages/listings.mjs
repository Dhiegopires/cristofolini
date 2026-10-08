import { ROUTES, CASES, POSTS, FILTERS, postUrl } from '../data.mjs';
import { T } from '../i18n.mjs';
import { esc, join, icon, img, tags } from '../lib.mjs';
import { page, contactCta, newsletterCta } from '../partials.mjs';
import { postMeta } from '../content.mjs';

const COPY = {
  en: {
    work: {
      ghost: 'Work',
      title: ['If I were you, I wouldn’t show', 'this ', 'work', ' to other companies'],
      seoTitle: 'Work | Dhiego Cristofolini, Senior Product Designer',
      description: 'Case studies in product design, design systems and conversion-driven UX: MedMe, Instivo, Meaple, Selo H, Vellumwire, Fiter and NorthPay.',
      search: 'Looking for something specific?',
      searchLabel: 'Search projects',
      empty: 'No projects match this filter. Try another category or clear the search.',
      live: '{n} projects shown',
      listLabel: 'Projects',
    },
    blog: {
      ghost: 'Insights',
      title: ['Just some ', 'insights', ' and', 'stories I want to share'],
      seoTitle: 'Insights | Dhiego Cristofolini, Senior Product Designer',
      description: 'Articles on accessibility, design systems and design tokens, written from real product work.',
      search: 'Looking for something specific?',
      searchLabel: 'Search articles',
      empty: 'No articles match this filter or search. Try another topic or clear the search.',
      live: '{n} articles shown',
      listLabel: 'Articles',
      pages: 'Article pages',
      pageLabel: 'Page {n}',
    },
  },
  pt: {
    work: {
      ghost: 'Trabalhos',
      title: ['Se eu fosse você, eu não mostraria', 'esse ', 'trabalho', ' para outras empresas'],
      seoTitle: 'Trabalhos | Dhiego Cristofolini, Senior Product Designer',
      description: 'Estudos de caso em design de produto, design systems e UX orientado a conversão: MedMe, Instivo, Meaple, Selo H, Vellumwire, Fiter e NorthPay.',
      search: 'Procurando algo específico?',
      searchLabel: 'Buscar projetos',
      empty: 'Nenhum projeto corresponde a este filtro. Tente outra categoria ou limpe a busca.',
      live: '{n} projetos exibidos',
      listLabel: 'Projetos',
    },
    blog: {
      ghost: 'Insights',
      title: ['Alguns ', 'insights', ' e', 'histórias que quero compartilhar'],
      seoTitle: 'Insights | Dhiego Cristofolini, Senior Product Designer',
      description: 'Artigos sobre acessibilidade, design systems e design tokens, escritos a partir de trabalho real de produto.',
      search: 'Procurando algo específico?',
      searchLabel: 'Buscar artigos',
      empty: 'Nenhum artigo corresponde a este filtro ou busca. Tente outro tema ou limpe a busca.',
      live: '{n} artigos exibidos',
      listLabel: 'Artigos',
      pages: 'Páginas de artigos',
      pageLabel: 'Página {n}',
    },
  },
};

const filterBar = ({ id, filters, lang, t, c }) => `
    <div class="filter-bar">
      <div class="chips" role="group" aria-label="${t.filterBy}">
        <button class="chip" type="button" aria-pressed="true" data-filter="all">${t.all}</button>
${join(filters, (f) => `        <button class="chip" type="button" aria-pressed="false" data-filter="${f.id}">${f[lang]}</button>\n`)}      </div>
      <form class="search" role="search">
        <label class="sr-only" for="${id}-search">${c.searchLabel}</label>
        <input class="search__input" id="${id}-search" type="search" placeholder="${esc(c.search)}" autocomplete="off" data-search>
        ${icon.search}
      </form>
    </div>`;

const pageHero = ({ id, ghost, titleHtml }) => `
  <div class="ghost-title">
    <span class="ghost-title__word" aria-hidden="true" data-reveal="fade">${ghost}</span>
    <h1 class="h-xl ghost-title__text" id="${id}-title" data-reveal="words">${titleHtml}</h1>
  </div>`;

const usedFilters = (all, items, key) => all.filter((f) => items.some((i) => i[key].includes(f.id)));

export const workPage = (lang) => {
  const t = T[lang];
  const c = COPY[lang].work;
  const r = ROUTES[lang];
  const filters = usedFilters(FILTERS.work, CASES, 'filters');
  const body = `
<section class="page-hero" aria-labelledby="work-title" data-filter-root>
  <div class="container page-hero__inner">
${pageHero({ id: 'work', ghost: c.ghost, titleHtml: `${c.title[0]}<br> ${c.title[1]}<span class="accent">${c.title[2]}</span>${c.title[3]}` })}
${filterBar({ id: 'work', filters, lang, t, c })}
  </div>
  <div class="container section">
    <p class="sr-only" aria-live="polite" data-filter-live data-template="${c.live}"></p>
    <ul class="work-grid" aria-label="${c.listLabel}" data-filter-list>
${join(CASES, (cs) => `      <li class="work-grid__item" data-filter-item data-cats="${cs.filters.join(' ')}" data-reveal="up">
        <a class="work-card work-card--listing" href="${r.case(cs.slug)}">
          <span class="work-card__icon" aria-hidden="true"><img src="/assets/img/site/card-arrow.svg" width="106" height="106" alt=""></span>
  <span class="work-card__media">${img({ src: cs.img.src, srcset: cs.img.srcset, sizes: '(min-width: 64em) 55vw, 92vw', w: cs.img.w, h: cs.img.h, alt: '' })}</span>
          <span class="work-card__body">
            <span class="work-card__cat">${cs.cat[lang]}</span>
            <span class="work-card__title">${cs.title}</span>
            <span class="work-card__more" aria-hidden="true">${t.viewProject}</span>
          </span>
        </a>
      </li>\n`)}    </ul>
    <p class="empty-state" data-filter-empty hidden>${c.empty}</p>
  </div>
</section>
${contactCta({ lang, page: 'work' })}`;
  return page({
    lang,
    current: 'work',
    alt: ROUTES[lang === 'en' ? 'pt' : 'en'].work,
    headOpts: { title: c.seoTitle, description: c.description, path: r.work },
    body,
  });
};

export const postCard = ({ p, lang, t, featured = false }) => {
  const m = postMeta(p.slug, lang);
  const cat = FILTERS.blog.find((f) => f.id === p.cat);
  return `<a class="post-card" href="${postUrl(p, lang)}" data-cursor="view">
          <span class="post-card__media">${img({ src: `/assets/img/blog/${p.hero}`, w: 1024, h: 538, alt: '', sizes: featured ? '(min-width: 64em) 45vw, 92vw' : '(min-width: 64em) 30vw, 92vw' })}${tags([cat[lang]])}</span>
          <span class="post-card__info">
            <span class="meta"><time datetime="${p.date}">${t.dateFmt(p.date)}</time> · ${t.minRead(p.read)}</span>
            <span class="post-card__title">${esc(m.title)}</span>
            <span class="post-card__excerpt">${esc(m.description)}</span>
          </span>
        </a>`;
};

export const blogPage = (lang) => {
  const t = T[lang];
  const c = COPY[lang].blog;
  const r = ROUTES[lang];
  const filters = usedFilters(FILTERS.blog, POSTS.map((p) => ({ cats: [p.cat] })), 'cats');
  const body = `
<section class="page-hero" aria-labelledby="blog-title" data-filter-root>
  <div class="container page-hero__inner">
${pageHero({ id: 'blog', ghost: c.ghost, titleHtml: `${c.title[0]}<span class="accent">${c.title[1]}</span>${c.title[2]}<br> ${c.title[3]}` })}
${filterBar({ id: 'blog', filters, lang, t, c })}
  </div>
  <div class="container section">
    <p class="sr-only" aria-live="polite" data-filter-live data-template="${c.live}"></p>
    <ul class="post-index" aria-label="${c.listLabel}" data-filter-list data-page-size="4" data-page-label="${c.pageLabel}">
${join(POSTS, (p, i) => `      <li class="post-index__item" data-filter-item data-cats="${p.cat}" data-reveal="up">
        ${postCard({ p, lang, t, featured: i === 0 })}
      </li>\n`)}    </ul>
    <p class="empty-state" data-filter-empty hidden>${c.empty}</p>
    <nav class="pagination" aria-label="${c.pages}" data-pagination hidden>
      <button class="icon-btn" type="button" data-page-prev aria-label="${t.prev}">${icon.chevronLeft}</button>
      <ol class="pagination__pages" data-page-list></ol>
      <button class="icon-btn" type="button" data-page-next aria-label="${t.next}">${icon.chevronRight}</button>
    </nav>
  </div>
</section>
${newsletterCta({ lang, page: 'blog' })}`;
  return page({
    lang,
    current: 'blog',
    alt: ROUTES[lang === 'en' ? 'pt' : 'en'].blog,
    headOpts: { title: c.seoTitle, description: c.description, path: r.blog },
    body,
  });
};
