import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = dirname(fileURLToPath(import.meta.url));
const cache = new Map();

const load = (rel) => {
  if (!cache.has(rel)) {
    const p = join(root, 'content', rel);
    cache.set(rel, existsSync(p) ? JSON.parse(readFileSync(p, 'utf8')) : null);
  }
  return cache.get(rel);
};

export const postMeta = (slug, lang) => {
  const d = load(`posts/${slug}.${lang}.json`);
  if (!d) throw new Error(`Missing post content: ${slug}.${lang}`);
  return d;
};

export const pageContent = (name, lang) => load(`pages/${name}.${lang}.json`);
