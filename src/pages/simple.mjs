import { SITE, ROUTES, CASES } from '../data.mjs';
import { T } from '../i18n.mjs';
import { esc, icon, img } from '../lib.mjs';
import { page, contactCta } from '../partials.mjs';
import { pageContent } from '../content.mjs';
import { normalizeBody, } from './case.mjs';
import { workCard } from './home.mjs';

const ROUTE_KEY = { about: 'about', resume: 'resume', privacy: 'privacy', terms: 'terms' };

const docHero = ({ title, sub, eyebrow }) => `
<header class="page-hero doc-hero">
  <div class="container doc-hero__inner">
    ${eyebrow ? `<p class="eyebrow">${eyebrow}</p>` : ''}
    <h1 class="h-xl h-xl--case" data-reveal="words">${esc(title)}</h1>
    ${sub ? `<p class="doc-hero__sub" data-reveal="up">${esc(sub)}</p>` : ''}
  </div>
</header>`;

const other = (lang) => (lang === 'en' ? 'pt' : 'en');

export const aboutPage = (lang) => {
  const d = pageContent('about', lang);
  const t = T[lang];
  const featured = CASES.slice(0, 2);
  const body = `
<article class="article doc">
${docHero({ title: d.title.replace(/\.$/, ''), sub: d.sub })}
  <div class="container section section--flush-top">
    <div class="about">
      <figure class="about__media media-parallax" data-parallax>
        ${img({ src: '/assets/img/site/hello.webp', w: 640, h: 640, alt: t.hello.alt })}
      </figure>
      <div class="about__body prose">
${d.html.replace(/class="about-grid"/, '')}
      </div>
    </div>
  </div>
</article>
<section class="section" aria-labelledby="about-work-title">
  <div class="container stack">
    <div class="section-head">
      <h2 class="h-xl" id="about-work-title" data-reveal="words">${t.homeWork.title}</h2>
    </div>
    <ul class="work-grid work-grid--pair">
${featured.map((c) => `      <li class="work-grid__item" data-reveal="up">${workCard({ c, lang, t, sizes: '(min-width: 40em) 45vw, 92vw' })}</li>`).join('\n')}
    </ul>
    <div class="section-foot"><a class="btn" href="${ROUTES[lang].work}" data-cta="${lang}_about_work">${t.homeWork.cta}</a></div>
  </div>
</section>
${contactCta({ lang, page: 'about' })}`;
  return page({
    lang,
    current: 'about',
    alt: ROUTES[other(lang)].about,
    headOpts: { title: d.seoTitle, description: d.description, path: ROUTES[lang].about },
    body,
  });
};

export const resumePage = (lang) => {
  const d = pageContent('resume', lang);
  const pt = lang === 'pt';
  const pdf = `/assets/files/Dhiego%20Cristofolini%20-%20${pt ? 'PT' : 'EN'}%20-%20PRODUCT%20DESIGNER.pdf`;
  const btn = `<a class="btn btn--split resume-print-btn" href="${pdf}" download data-cta="${lang}_resume_download" data-event-category="content">${pt ? 'Baixar currículo (PDF)' : 'Download CV (PDF)'}<svg class="btn__icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></a>`;
  const html = d.html
    .replace(/<button[^>]*resume-print-btn[\s\S]*?<\/button>/, btn)
    .replace(/<h1 class="resume-header__name">/, '<h1 class="resume-header__name h-xl">')
    .replace(/<span class="resume-header__hint">[\s\S]*?<\/span>/, `<button class="text-link resume-print" type="button" data-print>${pt ? 'Ou imprimir esta página' : 'Or print this page'}</button>`);
  const body = `
<article class="resume doc">
${normalizeBody(html)}
</article>
${contactCta({ lang, page: 'resume' })}`;
  return page({
    lang,
    current: 'resume',
    alt: ROUTES[other(lang)].resume,
    bodyClass: 'page-resume',
    headOpts: {
      title: d.seoTitle,
      description: d.description,
      path: ROUTES[lang].resume,
      jsonld: [{ '@context': 'https://schema.org', '@type': 'ProfilePage', mainEntity: { '@type': 'Person', name: 'Dhiego Cristofolini', jobTitle: 'Senior Product Designer', url: SITE.url + '/' } }],
    },
    body,
  });
};

export const legalPage = (key, lang) => {
  const d = pageContent(key, lang);
  const body = `
<article class="article doc">
${docHero({ title: d.title.replace(/\.$/, ''), sub: d.sub })}
  <div class="container container--read section section--flush-top">
    <div class="prose legal">
${d.html}
    </div>
  </div>
</article>`;
  return page({
    lang,
    current: key,
    alt: ROUTES[other(lang)][key],
    headOpts: { title: d.seoTitle, description: d.description, path: ROUTES[lang][key] },
    body,
  });
};

export const meapleDocPage = () => {
  const d = pageContent('meaple-doc', 'en');
  const body = `
<article class="article doc">
${docHero({ title: d.title, sub: d.description, eyebrow: d.meta })}
  <div class="container container--read section section--flush-top">
    <div class="article-body doc-body prose">
${normalizeBody(d.html)}
    </div>
  </div>
</article>
<nav class="next-post" aria-label="Back to the case study">
  <a class="next-post__link" href="${ROUTES.en.case('meaple')}">
    <span class="container next-post__inner">
      <span class="next-post__title">Meaple: five apps for one Friday night</span>
      <span class="next-post__label">Read the case</span>
    </span>
  </a>
</nav>`;
  return page({
    lang: 'en',
    current: 'work',
    alt: null,
    headOpts: { title: d.seoTitle, description: d.description, path: '/work/meaple/documentation/', type: 'article' },
    body,
  });
};

export const notFoundPage = () => {
  const body = `
<section class="not-found">
  <div class="container not-found__inner">
    <p class="not-found__code" aria-hidden="true">404</p>
    <h1 class="h-xl">This page doesn’t exist, or moved.</h1>
    <p class="doc-hero__sub" lang="pt-BR">Essa página não existe, ou mudou de lugar.</p>
    <div class="not-found__actions">
      <a class="btn" href="/">Back to home</a>
      <a class="text-link" href="/work/">See the work${icon.arrowRight}</a>
      <a class="text-link" href="/pt-br/" lang="pt-BR">Ir para a versão em português${icon.arrowRight}</a>
    </div>
  </div>
</section>`;
  const html = page({
    lang: 'en',
    current: '',
    alt: null,
    headOpts: { title: 'Page not found | Dhiego Cristofolini', description: 'This page does not exist or has moved.', path: '/404.html' },
    body,
  });
  return html.replace('<meta name="robots" content="index,follow">', '<meta name="robots" content="noindex">');
};
