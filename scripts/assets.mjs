// Production CSS/JS for the template pages.
//   site.min.css    = plugins.css (its @imports inlined) + style.css + brand.css
//   content.min.css = content.css (long-form pages only)
//   *.min.js        = custom.js, addons.js, hero-gl.js (the vendor files ship
//                     minified already)
// One stylesheet request instead of eleven chained @imports. Relative url()s
// are rewritten to root paths, since the bundle lives in a different folder.
import { readFileSync, writeFileSync } from 'node:fs';
import { join, dirname, resolve, relative } from 'node:path';
import { minify as minCss } from 'csso';
import { minify as minJs } from 'terser';

const fromFile = (root, file) => {
  const dir = dirname(file);
  let css = readFileSync(file, 'utf8');
  css = css.replace(/@import\s+url\(\s*["']?([^"')]+)["']?\s*\)\s*;/g, (m, p) => fromFile(root, resolve(dir, p)));
  return css.replace(/url\(\s*(["']?)(?!data:|https?:|\/|#)([^"')]+)\1\s*\)/g, (m, q, p) => {
    const abs = '/' + relative(root, resolve(dir, p.split(/[?#]/)[0])).split('\\').join('/');
    const tail = p.slice(p.split(/[?#]/)[0].length);
    return `url(${q}${abs}${tail}${q})`;
  });
};

export const buildAssets = async (root) => {
  const css = join(root, 'assets/tpl/css');
  const bundle = ['plugins.css', 'style.css', 'brand.css'].map((f) => fromFile(root, join(css, f))).join('\n');
  writeFileSync(join(css, 'site.min.css'), minCss(bundle).css);
  writeFileSync(join(css, 'content.min.css'), minCss(readFileSync(join(css, 'content.css'), 'utf8')).css);
  for (const f of ['custom', 'addons', 'hero-gl']) {
    const src = readFileSync(join(root, `assets/tpl/js/${f}.js`), 'utf8');
    writeFileSync(join(root, `assets/tpl/js/${f}.min.js`), (await minJs(src, { format: { comments: false } })).code);
  }
};
