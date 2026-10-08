import { SITE, ROUTES, POSTS, FILTERS, postUrl } from '../data.mjs';
import { T } from '../i18n.mjs';
import { esc, img, tags } from '../lib.mjs';
import { page, newsletterCta } from '../partials.mjs';
import { postMeta } from '../content.mjs';
import { normalizeBody } from './case.mjs';

const COPY = {
  en: { next: 'Next post', progress: 'Reading progress', by: 'By Dhiego Cristofolini' },
  pt: { next: 'Próximo post', progress: 'Progresso de leitura', by: 'Por Dhiego Cristofolini' },
};

export const postPage = (slug, lang) => {
  const t = T[lang];
  const c = COPY[lang];
  const i = POSTS.findIndex((p) => p.slug === slug);
  const p = POSTS[i];
  const d = postMeta(slug, lang);
  const next = POSTS[(i + 1) % POSTS.length];
  const nm = postMeta(next.slug, lang);
  const cat = FILTERS.blog.find((f) => f.id === p.cat);
  const otherLang = lang === 'en' ? 'pt' : 'en';
  const heroSrc = `/assets/img/blog/${p.hero}`;

  const body = `
<div class="read-progress" aria-hidden="true"><span data-progress></span></div>
<article class="article" data-progress-target>
  <header class="article-hero">
    <div class="article-hero__media" data-hero-parallax>
      ${img({ src: heroSrc, w: d.hero.w, h: d.hero.h, alt: d.hero.alt, lazy: false, priority: true, sizes: '100vw' })}
    </div>
    <div class="container article-hero__copy">
      <p class="meta"><a class="article-hero__crumb" href="${ROUTES[lang].blog}">${t.insights}</a> · <time datetime="${p.date}">${t.monthFmt(p.date)}</time> · ${t.minRead(p.read)}</p>
      <h1 class="h-xl h-xl--case article-hero__title" data-reveal="words">${esc(d.title)}</h1>
      <p class="article-hero__dek" data-reveal="up">${esc(d.description)}</p>
      ${tags([cat[lang]])}
    </div>
  </header>
  <div class="container container--read">
    <div class="article-body prose">
${normalizeBody(d.body)}
    </div>
  </div>
</article>
${newsletterCta({ lang, page: slug })}
<nav class="next-post" aria-label="${c.next}">
  <a class="next-post__link" href="${postUrl(next, lang)}">
    <span class="container next-post__inner">
      <span class="next-post__title">${esc(nm.title)}</span>
      <span class="next-post__label">${c.next}</span>
    </span>
  </a>
</nav>`;

  return page({
    lang,
    current: 'blog',
    alt: postUrl(p, otherLang),
    bodyClass: 'page-post',
    headOpts: {
      title: `${d.seoTitle}`,
      description: d.description,
      path: postUrl(p, lang),
      image: heroSrc,
      imageAlt: d.hero.alt,
      type: 'article',
      jsonld: [
        {
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: d.title,
          description: d.description,
          datePublished: p.date,
          dateModified: p.date,
          image: SITE.url + heroSrc,
          url: SITE.url + postUrl(p, lang),
          inLanguage: t.htmlLang,
          author: { '@type': 'Person', name: 'Dhiego Cristofolini', url: SITE.url + '/' },
        },
      ],
    },
    body,
  });
};
