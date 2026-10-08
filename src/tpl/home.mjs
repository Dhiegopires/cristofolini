// Home on the Droow template. Template components used as-is (markup +
// behaviour), restyled to the Figma in assets/css/site.css:
//   our-work/work-under-header (slick) · intro-about · brand-client
//   (logo-box with + info) · our-news (slick) · client-see (slick fade).
// Hero, stats, services accordion and contact form are Figma-only.
import { SITE, ROUTES, CASES, POSTS, COMPANIES, TESTIMONIALS, postUrl } from '../data.mjs';
import { T } from '../i18n.mjs';
import { esc, join, icon } from '../lib.mjs';
import { postMeta } from '../content.mjs';
import { tplPage } from './layout.mjs';

// Only sites confirmed in the case studies. Others show name + role.
const SITES = {
  'selo-h': 'https://seloh.org',
  meaple: 'https://meaple.com.br',
};

const oneTitle = (id, title, nav) => `
    <div class="one-title">
      <h2 class="title-main" id="${id}" data-dsn-animate="up">${title}</h2>
${nav ? `      <div class="carousel-nav" data-slick-nav>
        <button class="icon-btn" type="button" data-slick-prev aria-label="${nav.prev}">${icon.chevronLeft}</button>
        <button class="icon-btn icon-btn--next" type="button" data-slick-next aria-label="${nav.next}">${icon.chevronRight}</button>
      </div>\n` : ''}    </div>`;

const hero = (lang, t) => `
<section class="hero" data-dsn-header="project" aria-labelledby="hero-title">
  <h1 class="sr-only" id="hero-title">${t.hero.h1}</h1>
  <div class="hero__stage">
    <p class="hero__title" aria-hidden="true" id="dsn-hero-parallax-title">
      <span class="hero__title-sm">${t.hero.sm}</span>
      <span class="hero__title-lg">${t.hero.lg[0]}</span>
      <span class="hero__title-lg">${t.hero.lg[1]}</span>
    </p>
    <img class="hero__x" src="/assets/img/site/hero-x.svg" width="772" height="520" alt="">
    <div class="hero__photo-wrap" id="dsn-hero-parallax-img">
      <img class="hero__photo" src="/assets/img/site/hero-portrait.webp" srcset="/assets/img/site/hero-portrait-800.webp 800w, /assets/img/site/hero-portrait.webp 1212w" sizes="(min-width: 48em) 60vw, 120vw" width="1212" height="1048" alt="" fetchpriority="high">
    </div>
    <p class="hero__name" aria-hidden="true">
      <img src="/assets/img/site/name-dhiego.svg" width="455" height="205" alt="">
      <img src="/assets/img/site/name-cristofolini.svg" width="882" height="205" alt="">
    </p>
  </div>
  <div class="marquee" aria-hidden="true">
    <div class="marquee__track">
${join([0, 1], () => `      <ul class="marquee__group">
${join(t.hero.marquee, (m) => `        <li>${esc(m)}</li><li class="marquee__sep">#</li>\n`)}      </ul>\n`)}    </div>
  </div>
</section>`;

const work = (lang, t) => {
  const list = [...CASES].sort((a, b) => a.home - b.home);
  return `
<section class="our-work work-under-header section-margin" data-dsn-col="3" aria-labelledby="home-work-title">
  <div class="container">
${oneTitle('home-work-title', t.homeWork.title, { prev: t.prev, next: t.next })}
  </div>
  <div class="work-container">
    <div class="slick-slider" data-slick="work">
${join(list, (c) => `      <div class="work-item slick-slide">
        <img class="has-top-bottom" src="${c.img.src}" srcset="${c.img.srcset}" sizes="(min-width: 64em) 36vw, 84vw" width="${c.img.w}" height="${c.img.h}" alt="" loading="lazy">
        <div class="item-border"></div>
        <img class="item-icon" src="/assets/img/site/card-arrow.svg" width="106" height="106" alt="" aria-hidden="true">
        <div class="item-info">
          <a href="${ROUTES[lang].case(c.slug)}">
            <h5 class="cat">${c.cat[lang]}</h5>
            <h4>${c.title}</h4>
            <span><span>${t.viewProject}</span></span>
          </a>
        </div>
      </div>\n`)}    </div>
  </div>
  <div class="container section-foot">
    <a class="btn" href="${ROUTES[lang].work}">${t.homeWork.cta}</a>
  </div>
</section>`;
};

const stats = (t) => `
<section class="stats" aria-label="${t.htmlLang === 'en' ? 'Results' : 'Resultados'}">
  <div class="container">
    <ul class="stats__list">
${join(t.stats, (s) => `      <li class="stats__item" data-dsn-animate="up"><span class="stats__num">${esc(s.num)}</span><span class="stats__label">${esc(s.label)}</span></li>\n`)}    </ul>
  </div>
</section>`;

const hello = (lang, t) => `
<section class="intro-about section-margin" id="about" aria-labelledby="hello-title">
  <div class="container">
    <h2 class="intro-about__title" id="hello-title" data-dsn-grid="move-section" data-dsn-move="-30" data-dsn-duration="100%" data-dsn-opacity="1" data-dsn-responsive="tablet">${t.hello.title[0]}<br> ${t.hello.title[1]}</h2>
    <div class="intro-about__box">
      <div class="intro-content-text">
${join(t.hello.p, (p) => `        <p data-dsn-animate="text">${p}</p>\n`)}      </div>
      <div class="img-box">
        <div class="img-cent" data-dsn-grid="move-up">
          <div class="img-container"><img data-dsn-y="20%" src="/assets/img/site/hello.webp" width="640" height="640" alt="${esc(t.hello.alt)}" loading="lazy"></div>
        </div>
      </div>
    </div>
    <p class="intro-about__flows" data-dsn-animate="up"><span>${t.rotator[0][0]}</span><span>${t.rotator[0][1]}</span></p>
  </div>
</section>`;

const companies = (lang, t) => `
<section class="brand-client section-margin" aria-labelledby="companies-title">
  <div class="container">
${oneTitle('companies-title', t.companies.title)}
  </div>
  <div class="logos">
    <div class="logos__track">
${join([0, 1], (k) => `      <div class="wapper-client"${k ? ' aria-hidden="true" inert' : ''}>
${join(COMPANIES, (c) => `        <div class="logo-box" tabindex="${k ? '-1' : '0'}">
          <img src="/assets/img/logos/${c.logo}.svg" width="320" height="320" alt="${k ? '' : esc(c.name)}" loading="lazy">
          <div class="info">
            <div class="content">
              <div class="icon" aria-hidden="true">${icon.plus}</div>
              <div class="entry">
                <div>
                  <h5>${esc(c.name)}</h5>
                  ${c.role ? `<p>${esc(c.role[lang])}</p>` : ''}
                  ${SITES[c.id] ? `<a href="${SITES[c.id]}" target="_blank" rel="noopener">${SITES[c.id].replace(/^https?:\/\/(www\.)?/, '')}</a>` : ''}
                </div>
              </div>
            </div>
          </div>
        </div>\n`)}      </div>\n`)}    </div>
  </div>
</section>`;

const services = (lang, t) => `
<section class="services section-margin" aria-labelledby="services-title">
  <div class="container">
${oneTitle('services-title', `${t.services.title[0]}<br> ${t.services.title[1]}<span class="accent">${t.services.accent}</span>`)}
    <ul class="services__list">
${join(t.services.items, ([name, desc], i) => `      <li class="service" data-service>
        <h3 class="service__head">
          <button class="service__trigger" type="button" aria-expanded="false" aria-controls="service-${i}" id="service-${i}-btn" data-accordion>
            <span class="service__num">0${i + 1}.</span>
            <span class="service__name">${esc(name)}</span>
          </button>
        </h3>
        <div class="service__panel" id="service-${i}" role="region" aria-labelledby="service-${i}-btn">
          <div class="service__panel-inner"><p class="service__desc">${esc(desc)}</p></div>
        </div>
        <div class="service__media" aria-hidden="true"><img src="/assets/img/site/service-${(i % 6) + 1}.webp" width="1066" height="438" alt="" loading="lazy"></div>
      </li>\n`)}    </ul>
  </div>
</section>`;

const insights = (lang, t) => `
<section class="our-news section-margin" aria-labelledby="home-insights-title">
  <div class="container">
${oneTitle('home-insights-title', t.homeInsights.title, { prev: t.prev, next: t.next })}
  </div>
  <div class="custom-container">
    <div class="slick-slider" data-slick="news">
${join(POSTS, (p) => {
  const m = postMeta(p.slug, lang);
  return `      <div class="item-new slick-slide">
        <a class="item-new__link" href="${postUrl(p, lang)}">
          <div class="image"><img src="/assets/img/blog/${p.hero}" width="1024" height="538" alt="" loading="lazy"><span class="tag">${esc(m.tag)}</span></div>
          <div class="content">
            <div class="background"></div>
            <h5>${t.dateFmt(p.date)}</h5>
            <div class="cta"><span>${esc(m.title)}</span></div>
          </div>
        </a>
      </div>\n`;
})}    </div>
  </div>
  <div class="container section-foot">
    <a class="btn" href="${ROUTES[lang].blog}">${t.homeInsights.cta}</a>
  </div>
</section>`;

const testimonials = (lang, t) => `
<section class="client-see section-margin" aria-labelledby="testimonials-title">
  <div class="container">
    <div class="inner">
      <div class="left">
        <h2 class="title" id="testimonials-title" data-dsn-grid="move-section" data-dsn-move="-60" data-dsn-duration="100%" data-dsn-opacity="1" data-dsn-responsive="tablet"><span class="text">${t.testimonials.title[0]}<br> ${t.testimonials.title[1]}</span></h2>
      </div>
      <div class="items">
        <div class="bg"></div>
        <div class="slick-slider">
${join(TESTIMONIALS, (q) => `          <div class="item">
            <div class="quote"><p>“${esc(q.quote[lang])}”</p></div>
            <div class="bottom">
              <div class="avatar"><img src="${q.avatar}" width="86" height="86" alt="" loading="lazy"></div>
              <div class="label"><div class="cell">${esc(q.name)}, ${esc(q.role[lang])}</div></div>
            </div>
          </div>\n`)}        </div>
      </div>
    </div>
  </div>
</section>`;

const contact = (lang, t) => {
  const c = t.contact;
  const r = ROUTES[lang];
  const f = (id, name, label, type = 'text', ac = 'off') => `
      <div class="field-wrap">
        <div class="field">
          <input class="field__input" id="${id}" name="${name}" type="${type}" placeholder=" " autocomplete="${ac}" required aria-describedby="${id}-error">
          <label class="field__label" for="${id}">${label}</label>
        </div>
        <span class="field__error" id="${id}-error" hidden></span>
      </div>`;
  return `
<section class="contact-up section-margin" aria-labelledby="contact-title">
  <div class="container">
    <h2 class="title-main contact-up__title" id="contact-title" data-dsn-animate="up">${c.title}</h2>
    <form class="form form--contact" action="/contact.php" method="post" novalidate data-form="contact" data-cta-label="${lang}_home_contact"
      data-msg-ok="${esc(c.ok)}" data-msg-error="${esc(c.error)}" data-msg-sending="${esc(c.sending)}" data-msg-required="${esc(c.required)}" data-msg-email="${esc(c.invalidEmail)}">
      <input type="hidden" name="type" value="contact">
      <div class="hp-field" aria-hidden="true"><label for="hc-company">Company</label><input id="hc-company" name="company" tabindex="-1" autocomplete="off"></div>
${f('hc-name', 'name', c.name, 'text', 'name')}
${f('hc-email', 'email', c.email, 'email', 'email')}
${f('hc-message', 'message', c.message)}
      <button class="btn btn--split" type="submit">${c.submit}${icon.arrowNE}</button>
      <p class="form__consent">${c.consent} <a href="${r.privacy}">${t.privacy}</a>.</p>
      <p class="form__status" role="status" aria-live="polite" data-form-status></p>
    </form>
  </div>
</section>`;
};

export const tplHome = (lang) => {
  const t = T[lang];
  return tplPage({
    lang,
    current: 'home',
    alt: ROUTES[lang === 'en' ? 'pt' : 'en'].home,
    bodyClass: 'page-home',
    headOpts: {
      title: 'Dhiego Cristofolini | Senior Product Designer',
      description:
        lang === 'en'
          ? 'Senior Product Designer with 7+ years in SaaS, B2B and B2B2C. Conversion-driven UX, design systems, complex product flows. Remote-ready.'
          : 'Senior Product Designer com mais de 7 anos em SaaS, B2B e B2B2C. UX orientado a conversão, design systems e fluxos complexos de produto. Pronto para remoto.',
      path: ROUTES[lang].home,
      preload: ['href="/assets/img/site/hero-portrait-800.webp" as="image" type="image/webp" imagesrcset="/assets/img/site/hero-portrait-800.webp 800w, /assets/img/site/hero-portrait.webp 1212w" imagesizes="(min-width: 48em) 60vw, 120vw"'],
      jsonld: [
        {
          '@context': 'https://schema.org',
          '@type': 'Person',
          name: 'Dhiego Cristofolini',
          jobTitle: 'Senior Product Designer',
          url: SITE.url + ROUTES[lang].home,
          address: { '@type': 'PostalAddress', addressLocality: 'Curitiba', addressCountry: 'BR' },
          sameAs: [...SITE.socials.map((s) => s.href), SITE.behance],
        },
      ],
    },
    hero: hero(lang, t),
    body: [work(lang, t), stats(t), hello(lang, t), companies(lang, t), services(lang, t), insights(lang, t), testimonials(lang, t), contact(lang, t)].join('\n'),
  });
};
