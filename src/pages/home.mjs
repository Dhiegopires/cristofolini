import { SITE, ROUTES, CASES, POSTS, COMPANIES, TESTIMONIALS, postUrl } from '../data.mjs';
import { T } from '../i18n.mjs';
import { esc, join, icon, img, tags, words, when } from '../lib.mjs';
import { page, contactCta } from '../partials.mjs';
import { postMeta } from '../content.mjs';

const carouselHead = ({ id, title, t }) => `
    <div class="section-head">
      <h2 class="h-xl" id="${id}-title" data-reveal="words">${title}</h2>
      <div class="carousel-nav">
        <button class="icon-btn" type="button" data-carousel-prev aria-controls="${id}-track" aria-label="${t.prev}">${icon.chevronLeft}</button>
        <button class="icon-btn" type="button" data-carousel-next aria-controls="${id}-track" aria-label="${t.next}">${icon.chevronRight}</button>
      </div>
    </div>`;

const indicator = (n, t) => `
      <div class="indicator" data-carousel-dots>
${join(Array.from({ length: n }), (_, i) => `        <button class="indicator__dot" type="button" aria-label="${t.slide(i + 1, n)}"${i === 0 ? ' aria-current="true"' : ''}></button>\n`)}      </div>`;

export const workCard = ({ c, lang, t, sizes = '(min-width: 64em) 45vw, 84vw', variant = '' }) => `
<a class="work-card${variant}" href="${ROUTES[lang].case(c.slug)}">
  <span class="work-card__icon" aria-hidden="true"><img src="/assets/img/site/card-arrow.svg" width="106" height="106" alt=""></span>
  <span class="work-card__media">${img({ src: c.img.src, srcset: c.img.srcset, sizes, w: c.img.w, h: c.img.h, alt: '' })}</span>
  <span class="work-card__body">
    <span class="work-card__cat">${c.cat[lang]}</span>
    <span class="work-card__title">${c.title}</span>
    <span class="work-card__more" aria-hidden="true">${t.viewProject}</span>
  </span>
</a>`;

const hero = (lang, t) => `
<section class="hero" aria-labelledby="hero-title">
  <h1 class="sr-only" id="hero-title">${t.hero.h1}</h1>
  <div class="hero__stage">
    <p class="hero__title" aria-hidden="true">
      <span class="hero__title-sm" data-hero-line>${t.hero.sm}</span>
      <span class="hero__title-lg" data-hero-line>${t.hero.lg[0]}</span>
      <span class="hero__title-lg" data-hero-line>${t.hero.lg[1]}</span>
    </p>
    <img class="hero__x" src="/assets/img/site/hero-x.svg" width="772" height="520" alt="" data-hero-x>
    <img class="hero__photo" src="/assets/img/site/hero-portrait.webp" srcset="/assets/img/site/hero-portrait-800.webp 800w, /assets/img/site/hero-portrait.webp 1212w" sizes="(min-width: 48em) 60vw, 120vw" width="1212" height="1048" alt="" fetchpriority="high" data-hero-photo>
    <p class="hero__name" aria-hidden="true">
      <span class="hero__name-line hero__name-line--1"><img src="/assets/img/site/name-dhiego.svg" width="455" height="205" alt="" data-hero-name></span>
      <span class="hero__name-line hero__name-line--2"><img src="/assets/img/site/name-cristofolini.svg" width="882" height="205" alt="" data-hero-name></span>
    </p>
  </div>
  <div class="marquee" aria-hidden="true">
    <div class="marquee__track">
${join([0, 1], (k) => `      <ul class="marquee__group">
${join(t.hero.marquee, (m) => `        <li>${esc(m)}</li><li class="marquee__sep">#</li>\n`)}      </ul>\n`)}    </div>
  </div>
</section>`;

const work = (lang, t) => {
  const list = [...CASES].sort((a, b) => a.home - b.home);
  return `
<section class="section section--carousel" aria-labelledby="home-work-title" data-carousel>
  <div class="container stack">
${carouselHead({ id: 'home-work', title: t.homeWork.title, t })}
  </div>
  <div class="carousel carousel--work">
    <div class="carousel__viewport">
    <ul class="carousel__track" id="home-work-track" aria-label="${t.homeWork.carousel}" data-carousel-track>
${join(list, (c) => `      <li class="carousel__slide">${workCard({ c, lang, t })}</li>\n`)}    </ul>
    </div>
${indicator(list.length, t)}
  </div>
  <div class="container section-foot">
    <a class="btn" href="${ROUTES[lang].work}" data-cta="${lang}_home-work_all">${t.homeWork.cta}</a>
  </div>
</section>`;
};

const stats = (t) => `
<section class="stats" aria-label="${t.htmlLang === 'en' ? 'Results' : 'Resultados'}">
  <div class="container">
    <ul class="stats__list">
${join(t.stats, (s) => `      <li class="stats__item" data-reveal="up"><span class="stats__num" data-count="${esc(s.num)}">${esc(s.num)}</span><span class="stats__label">${esc(s.label)}</span></li>\n`)}    </ul>
  </div>
</section>`;

const hello = (lang, t) => `
<section class="section hello" aria-labelledby="hello-title" id="about">
  <div class="container stack">
    <div class="overlap">
      <h2 class="h-sub overlap__title" id="hello-title" data-reveal="words">${t.hello.title[0]}<br> ${t.hello.title[1]}</h2>
      <div class="overlap__box">
        <div class="hello__grid">
          <div class="stack">
            <div class="hello__text body-lg">
${join(t.hello.p, (p) => `              <p data-reveal="up">${p}</p>\n`)}            </div>
          </div>
          <figure class="hello__media media-parallax" data-parallax>
            ${img({ src: '/assets/img/site/hello.webp', w: 640, h: 640, alt: t.hello.alt })}
          </figure>
        </div>
      </div>
    </div>
    <p class="h-sub rotator" data-rotator>
      <span class="sr-only">${join(t.rotator, (r) => `${r[0]} ${r[1]}. `)}</span>
${join(t.rotator, (r, i) => `      <span class="rotator__pair${i === 0 ? ' is-active' : ''}" aria-hidden="true"><span class="rotator__part"><span class="rotator__inner">${r[0]}</span></span><span class="rotator__part"><span class="rotator__inner">${r[1]}</span></span></span>\n`)}    </p>
  </div>
</section>`;

const companies = (lang, t) => `
<section class="section section--flush-top" aria-labelledby="companies-title">
  <div class="container logos__head">
    <h2 class="h-sub" id="companies-title" data-reveal="words">${t.companies.title}</h2>
  </div>
  <div class="logos" data-logos>
    <div class="logos__track">
${join([0, 1], (k) => `      <ul class="logos__group"${k ? ' aria-hidden="true" inert' : ''}>
${join(COMPANIES, (c) => {
  const id = `co-${c.id}${k ? '-b' : ''}`;
  const hasInfo = !!c.role;
  return `        <li class="company" data-company>
          <img class="company__logo" src="/assets/img/logos/${c.logo}.svg" width="320" height="320" alt="${k ? '' : esc(c.name)}" loading="lazy">
${when(hasInfo, () => `          <button class="company__toggle" type="button" aria-expanded="false" aria-controls="${id}" aria-label="${esc(t.companies.more(c.name))}" data-label-open="${esc(t.companies.more(c.name))}" data-label-close="${esc(t.companies.less(c.name))}">${icon.plus}</button>
          <div class="company__info" id="${id}" hidden>
            <p class="company__name">${esc(c.name)}</p>
            <p class="company__role">${esc(c.role[lang])}</p>
${c.period ? `            <p class="company__period">${esc(c.period)}</p>` : ''}
          </div>
`)}        </li>\n`;
})}      </ul>\n`)}    </div>
  </div>
</section>`;

const services = (lang, t) => `
<section class="section" aria-labelledby="services-title">
  <div class="container stack">
    <h2 class="h-sub" id="services-title" data-reveal="words">${t.services.title[0]}<br> ${t.services.title[1]}<span class="accent">${t.services.accent}</span></h2>
    <ul class="services__list">
${join(t.services.items, ([name, desc], i) => `      <li class="service" data-service>
        <h3 class="service__head">
          <button class="service__trigger" type="button" aria-expanded="false" aria-controls="service-${i}" id="service-${i}-btn" data-accordion>
            <span class="service__num">0${i + 1}.</span>
            <span class="service__name">${esc(name)}</span>
          </button>
        </h3>
        <div class="service__panel" id="service-${i}" role="region" aria-labelledby="service-${i}-btn" data-open="false">
          <div class="service__panel-inner"><p class="service__desc">${esc(desc)}</p></div>
        </div>
        <div class="service__media" aria-hidden="true">
          <img src="/assets/img/site/service-${(i % 6) + 1}.webp" width="1066" height="438" alt="" loading="lazy" decoding="async">
        </div>
      </li>
`)}    </ul>
  </div>
</section>`;

export const insightCard = ({ p, lang, t }) => {
  const m = postMeta(p.slug, lang);
  return `
<a class="insight-card" href="${postUrl(p, lang)}" data-cursor="view">
  <span class="insight-card__media">${img({ src: `/assets/img/blog/${p.hero}`, w: 1024, h: 538, alt: '', sizes: '(min-width: 64em) 30vw, 80vw' })}${tags([m.tag])}</span>
  <span class="insight-card__info">
    <time class="meta" datetime="${p.date}">${t.dateFmt(p.date)}</time>
    <span class="insight-card__title">${esc(m.title)}</span>
  </span>
</a>`;
};

const insights = (lang, t) => `
<section class="section section--carousel" aria-labelledby="home-insights-title" data-carousel>
  <div class="container stack">
${carouselHead({ id: 'home-insights', title: t.homeInsights.title, t })}
  </div>
  <div class="carousel carousel--insights">
    <div class="carousel__viewport">
    <ul class="carousel__track" id="home-insights-track" aria-label="${t.homeInsights.carousel}" data-carousel-track>
${join(POSTS, (p) => `      <li class="carousel__slide">${insightCard({ p, lang, t })}</li>\n`)}    </ul>
    </div>
${indicator(POSTS.length, t)}
  </div>
  <div class="container section-foot">
    <a class="btn" href="${ROUTES[lang].blog}" data-cta="${lang}_home-insights_all">${t.homeInsights.cta}</a>
  </div>
</section>`;

const testimonials = (lang, t) =>
  when(TESTIMONIALS.length, () => `
<section class="section" aria-labelledby="testimonials-title">
  <div class="container">
    <div class="overlap">
      <h2 class="h-sub overlap__title" id="testimonials-title" data-reveal="words">${t.testimonials.title[0]}<br> ${t.testimonials.title[1]}</h2>
      <div class="overlap__box testimonials__body" data-quotes>
        <div class="testimonials__inner">
          <div class="quote-slider" aria-live="polite">
${join(TESTIMONIALS, (q, i) => `            <figure class="quote${i === 0 ? ' is-active' : ''}">
              <blockquote class="quote__text"><p>“${esc(q.quote[lang])}”</p></blockquote>
              <figcaption class="quote__author"><img class="quote__avatar" src="${q.avatar}" width="86" height="86" alt="" loading="lazy">${esc(q.name)}, ${esc(q.role[lang])}</figcaption>
            </figure>\n`)}          </div>
${when(TESTIMONIALS.length > 1, () => indicator(TESTIMONIALS.length, t))}
        </div>
        <img class="testimonials__mark" src="/assets/img/site/quote.svg" width="83" height="67" alt="" loading="lazy">
      </div>
    </div>
  </div>
</section>`);

export const home = (lang) => {
  const t = T[lang];
  const alt = ROUTES[lang === 'en' ? 'pt' : 'en'].home;
  const description =
    lang === 'en'
      ? 'Senior Product Designer with 7+ years in SaaS, B2B and B2B2C. Conversion-driven UX, design systems, complex product flows. Remote-ready.'
      : 'Senior Product Designer com mais de 7 anos em SaaS, B2B e B2B2C. UX orientado a conversão, design systems e fluxos complexos de produto. Pronto para remoto.';
  return page({
    lang,
    current: 'home',
    alt,
    bodyClass: 'page-home',
    headOpts: {
      title: 'Dhiego Cristofolini | Senior Product Designer',
      description,
      path: ROUTES[lang].home,
      imageAlt: lang === 'en' ? 'Portfolio preview for Dhiego Cristofolini, Senior Product Designer' : 'Prévia do portfólio de Dhiego Cristofolini, Senior Product Designer',
      preload: ['href="/assets/img/site/hero-portrait-800.webp" as="image" type="image/webp" imagesrcset="/assets/img/site/hero-portrait-800.webp 800w, /assets/img/site/hero-portrait.webp 1212w" imagesizes="(min-width: 48em) 60vw, 120vw"'],
      jsonld: [
        {
          '@context': 'https://schema.org',
          '@type': 'Person',
          name: 'Dhiego Cristofolini',
          jobTitle: 'Senior Product Designer',
          url: SITE.url + ROUTES[lang].home,
          email: 'mailto:' + SITE.email,
          image: SITE.url + '/assets/img/site/hero-portrait.webp',
          address: { '@type': 'PostalAddress', addressLocality: 'Curitiba', addressCountry: 'BR' },
          sameAs: [...SITE.socials.map((s) => s.href), SITE.behance],
        },
      ],
    },
    body: [hero(lang, t), work(lang, t), stats(t), hello(lang, t), companies(lang, t), services(lang, t), insights(lang, t), testimonials(lang, t), contactCta({ lang, page: 'home' })].join('\n'),
  });
};
