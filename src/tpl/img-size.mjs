// Reads width/height from a WebP file header (VP8, VP8L, VP8X) so pages can
// declare image dimensions: lazy images then reserve their space and the
// smooth-scrollbar limit is right before they load.
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const cache = new Map();

export const webpSize = (url) => {
  if (cache.has(url)) return cache.get(url);
  let size = null;
  try {
    const b = readFileSync(join(root, url));
    const type = b.toString('ascii', 12, 16);
    if (type === 'VP8X') size = { w: 1 + b.readUIntLE(24, 3), h: 1 + b.readUIntLE(27, 3) };
    else if (type === 'VP8 ') size = { w: b.readUInt16LE(26) & 0x3fff, h: b.readUInt16LE(28) & 0x3fff };
    else if (type === 'VP8L') {
      const bits = b.readUInt32LE(21);
      size = { w: (bits & 0x3fff) + 1, h: ((bits >> 14) & 0x3fff) + 1 };
    }
  } catch {}
  cache.set(url, size);
  return size;
};

// SVG: width/height attributes, else the viewBox.
export const svgSize = (url) => {
  if (cache.has(url)) return cache.get(url);
  let size = null;
  try {
    const tag = readFileSync(join(root, url), 'utf8').match(/<svg[^>]*>/)[0];
    const num = (a) => {
      const m = tag.match(new RegExp(`\s${a}="([\d.]+)(px)?"`));
      return m ? Math.round(+m[1]) : 0;
    };
    const vb = tag.match(/viewBox="[\d.-]+[ ,]+[\d.-]+[ ,]+([\d.]+)[ ,]+([\d.]+)"/);
    const w = num('width') || (vb && Math.round(+vb[1]));
    const h = num('height') || (vb && Math.round(+vb[2]));
    if (w && h) size = { w, h };
  } catch {}
  cache.set(url, size);
  return size;
};

export const imgSize = (url) => (/\.svg$/.test(url) ? svgSize(url) : webpSize(url));
