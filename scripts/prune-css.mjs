// Lists (or, with --write, removes) rules in our stylesheets whose selectors
// match nothing in the built pages. Removal cuts the rule out of the source
// text, so formatting and comments stay. Classes that only exist at runtime
// (state classes, JS-built markup) are kept through KEEP and the JS scan.
// Run after a build: node scripts/prune-css.mjs [--write]
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import * as csstree from 'css-tree';
import * as cheerio from 'cheerio';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const SKIP = new Set(['node_modules', 'src', 'scripts', '.git', '.claude', 'methodology', 'design-system', 'styleguide', 'assets']);
const pages = [];
const walk = (d) => {
  for (const e of readdirSync(d, { withFileTypes: true })) {
    if (SKIP.has(e.name)) continue;
    const p = join(d, e.name);
    if (e.isDirectory()) walk(p);
    else if (e.name.endsWith('.html')) pages.push(cheerio.load(readFileSync(p, 'utf8')));
  }
};
walk(root);

const KEEP = /\.(is-|has-|active|open|slick|dsn-|nav-active|show|hidden|cursor|scroll|loaded|animated|visible|fixed|sticky|hover)|\[disabled\]|:disabled/;
const js = ['assets/tpl/js/addons.js', 'assets/tpl/js/hero-gl.js', 'assets/tpl/js/custom.js']
  .map((f) => { try { return readFileSync(join(root, f), 'utf8'); } catch { return ''; } })
  .join('\n');

const used = (sel) => {
  if (KEEP.test(sel)) return true;
  const plain = sel.replace(/::?[a-z-]+(\([^)]*\))?/gi, '').trim();
  if (!plain) return true;
  const classes = [...plain.matchAll(/\.([a-zA-Z0-9_-]+)/g)].map((m) => m[1]);
  if (classes.length && classes.every((c) => js.includes(c))) return true;
  try {
    return pages.some(($) => $(plain).length > 0);
  } catch {
    return true;
  }
};

const write = process.argv.includes('--write');
for (const file of ['assets/tpl/css/brand.css', 'assets/tpl/css/content.css']) {
  const path = join(root, file);
  const src = readFileSync(path, 'utf8');
  const ast = csstree.parse(src, { positions: true, parseValue: false, parseCustomProperty: false });
  const cuts = [];
  csstree.walk(ast, {
    visit: 'Rule',
    enter(node) {
      if (node.prelude.type !== 'SelectorList') return;
      const sels = node.prelude.children.toArray().map((s) => csstree.generate(s));
      if (sels.some(used)) return;
      cuts.push({ start: node.loc.start.offset, end: node.loc.end.offset, sel: sels.join(', ') });
    },
  });
  console.log(`\n${file}: ${cuts.length} dead`);
  console.log(cuts.map((c) => '  ' + c.sel.slice(0, 120)).join('\n'));
  if (!write) continue;
  let out = src;
  for (const c of cuts.sort((a, b) => b.start - a.start)) {
    // Take the rule's own line break with it so no blank gaps pile up.
    const end = out[c.end] === '\n' ? c.end + 1 : c.end;
    out = out.slice(0, c.start) + out.slice(end);
  }
  // Media queries left empty by the cuts.
  out = out.replace(/@media[^{]+\{\s*\}\n?/g, '');
  writeFileSync(path, out);
}
