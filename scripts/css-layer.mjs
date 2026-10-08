// Builds assets/css/site.css for template-based pages:
//   tokens + components from style.css, minus the blocks the Droow template
//   owns (header, testimonials quote, cursor), followed by template-layer.css
//   which restyles the template components to the Figma.
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const OWNED_BY_TEMPLATE = /^\.(site-header|quote|cursor|menu-toggle|menu(?=[\s.:_,[{]|$)|menu__|lang-menu|lang-link|loader|cta(?=[\s.:,{]|$)|label(?=[\s.:,{]|$))/;

const strip = (css) => {
  let out = '';
  let i = 0;
  while (i < css.length) {
    const open = css.indexOf('{', i);
    if (open === -1) {
      out += css.slice(i);
      break;
    }
    const selector = css.slice(i, open);
    if (/^\s*@(media|supports)/.test(selector)) {
      let depth = 0;
      let k = open;
      for (; k < css.length; k++) {
        if (css[k] === '{') depth++;
        else if (css[k] === '}' && --depth === 0) break;
      }
      const inner = strip(css.slice(open + 1, k));
      if (inner.includes('{')) out += selector + '{' + inner + '}';
      i = k + 1;
      continue;
    }
    if (/^\s*@(font-face|keyframes)/.test(selector)) {
      let depth = 0;
      let k = open;
      for (; k < css.length; k++) {
        if (css[k] === '{') depth++;
        else if (css[k] === '}' && --depth === 0) break;
      }
      out += css.slice(i, k + 1);
      i = k + 1;
      continue;
    }
    const close = css.indexOf('}', open);
    const parts = selector.split(',').map((s) => s.trim());
    const keep = parts.filter((s) => !OWNED_BY_TEMPLATE.test(s.replace(/^\/\*[\s\S]*?\*\/\s*/, '')));
    if (keep.length === parts.length) out += css.slice(i, close + 1);
    else if (keep.length) out += '\n' + keep.join(',\n') + ' ' + css.slice(open, close + 1);
    i = close + 1;
  }
  return out;
};

export const buildSiteCss = (root) => {
  const base = strip(readFileSync(join(root, 'assets/css/style.css'), 'utf8'));
  const layer = readFileSync(join(root, 'assets/css/template-layer.css'), 'utf8');
  const css = base.replace(/\n{3,}/g, '\n\n') + '\n\n' + layer;
  writeFileSync(join(root, 'assets/css/site.css'), css);
  return css;
};
