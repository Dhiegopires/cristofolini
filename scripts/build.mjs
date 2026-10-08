// Static site generator. Run: node scripts/build.mjs
// Writes every page to its clean-URL folder (/work/medme/index.html) so the
// output deploys as plain files, no server rewrites needed. Content lives in
// src/content, templates in src/pages, shared chrome in src/partials.mjs.
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { SITE, ROUTES } from '../src/data.mjs';
import { homePage } from '../src/tpl/page-home.mjs';
import { contactPage } from '../src/tpl/page-contact.mjs';
import { casePageV2 } from '../src/tpl/page-case.mjs';
import medme from '../src/content/cases-v2/medme.mjs';
import meaple from '../src/content/cases-v2/meaple.mjs';
import instivo from '../src/content/cases-v2/instivo.mjs';
import seloH from '../src/content/cases-v2/selo-h.mjs';
import fiter from '../src/content/cases-v2/fiter.mjs';
import vellumwire from '../src/content/cases-v2/vellumwire.mjs';
import vellumwireDs from '../src/content/cases-v2/vellumwire-ds.mjs';

import { buildSiteCss } from './css-layer.mjs';
import pagesIndex from '../src/pages/index.mjs';

// Cases rebuilt on the template; the rest still come from src/pages.
const V2 = [medme, meaple, instivo, seloH, fiter, vellumwire, vellumwireDs];
const v2Paths = new Set(V2.flatMap((c) => [ROUTES.en.case(c.slug), ROUTES.pt.case(c.slug)]));

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

// Minify CSS/JS when the dev dependencies are installed (npm install);
// otherwise pages link the readable sources, which work just the same.
{
  const css = readFileSync(join(root, 'assets/css/style.css'), 'utf8');
  const js = readFileSync(join(root, 'assets/js/main.js'), 'utf8');
  const v = createHash('sha1').update(css + js).digest('hex').slice(0, 10);
  try {
    const { minify: minCss } = await import('csso');
    const { minify: minJs } = await import('terser');
    writeFileSync(join(root, 'assets/css/style.min.css'), minCss(css).css);
    writeFileSync(join(root, 'assets/js/main.min.js'), (await minJs(js, { format: { comments: false } })).code);
    globalThis.__ASSETS = { css: '/assets/css/style.min.css', js: '/assets/js/main.min.js', v };
    const siteCss = buildSiteCss(root);
    const siteJs = readFileSync(join(root, 'assets/js/site.js'), 'utf8');
    const v2 = createHash('sha1').update(siteCss + siteJs).digest('hex').slice(0, 10);
    writeFileSync(join(root, 'assets/css/site.min.css'), minCss(siteCss).css);
    writeFileSync(join(root, 'assets/js/site.min.js'), (await minJs(siteJs, { format: { comments: false } })).code);
    globalThis.__TPL_ASSETS = { css: '/assets/css/site.min.css', v: v2 };
  } catch (e) {
    if (e.code !== 'ERR_MODULE_NOT_FOUND') throw e;
    globalThis.__ASSETS = { css: '/assets/css/style.css', js: '/assets/js/main.js', v };
    buildSiteCss(root);
    globalThis.__TPL_ASSETS = { css: '/assets/css/site.css', v };
    console.warn('csso/terser not installed: linking unminified assets (run npm install to minify).');
  }
}

const pages = [
  { path: ROUTES.en.home, html: homePage('en') },
  { path: ROUTES.pt.home, html: homePage('pt') },
  { path: ROUTES.en.contact, html: contactPage('en') },
  { path: ROUTES.pt.contact, html: contactPage('pt') },
  ...V2.flatMap((c) => [
    { path: ROUTES.en.case(c.slug), html: casePageV2(c, 'en') },
    { path: ROUTES.pt.case(c.slug), html: casePageV2(c, 'pt') },
  ]),
  ...pagesIndex().filter((p) => !v2Paths.has(p.path)),
];

for (const { path, html } of pages) {
  const file = join(root, path, path.endsWith('.html') ? '' : 'index.html');
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, html);
}

// Sitemap: every indexable page, with its hreflang pair when one exists.
const today = new Date().toISOString().slice(0, 10);
const entries = pages
  .filter((p) => !p.path.endsWith('.html'))
  .map((p) => {
    const alts = [...p.html.matchAll(/<link rel="alternate" hreflang="(en|pt-BR)" href="([^"]+)">/g)];
    const links = alts.map(([, l, h]) => `    <xhtml:link rel="alternate" hreflang="${l}" href="${h}"/>`).join('\n');
    const prio = p.path === '/' || p.path === '/pt-br/' ? '1.0' : /\/(work|blog)\/$/.test(p.path) ? '0.9' : '0.7';
    return `  <url>\n    <loc>${SITE.url}${p.path}</loc>\n    <lastmod>${today}</lastmod>\n    <priority>${prio}</priority>\n${links ? links + '\n' : ''}  </url>`;
  });
writeFileSync(
  join(root, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${entries.join('\n')}\n</urlset>\n`,
);

console.log(`Built ${pages.length} pages + sitemap (${entries.length} URLs)`);
