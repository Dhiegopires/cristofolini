import { ROUTES, CASES, POSTS, postUrl } from '../data.mjs';
import { workPage, blogPage } from './listings.mjs';
import { casePage } from './case.mjs';
import { postPage } from './post.mjs';
import { aboutPage, resumePage, legalPage, meapleDocPage, notFoundPage } from './simple.mjs';

export default () => {
  const out = [];
  for (const lang of ['en', 'pt']) {
    const r = ROUTES[lang];
    out.push({ path: r.work, html: workPage(lang) });
    out.push({ path: r.blog, html: blogPage(lang) });
    out.push({ path: r.about, html: aboutPage(lang) });
    out.push({ path: r.resume, html: resumePage(lang) });
    out.push({ path: r.privacy, html: legalPage('privacy', lang) });
    out.push({ path: r.terms, html: legalPage('terms', lang) });
    for (const p of POSTS) out.push({ path: postUrl(p, lang), html: postPage(p.slug, lang) });
    for (const c of CASES) out.push({ path: r.case(c.slug), html: casePage(c.slug, lang) });
  }
  out.push({ path: '/work/meaple/documentation/', html: meapleDocPage() });
  out.push({ path: '/404.html', html: notFoundPage() });
  return out;
};
