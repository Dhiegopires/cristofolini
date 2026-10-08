// Splits a migrated HTML fragment into its top-level elements and groups
// them into the Figma case-study rows: image/text splits, media rows and
// text rows. Plain string parsing: the content is our own, well-formed HTML.

const VOID = new Set(['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'source', 'track', 'wbr']);

export const topLevel = (html) => {
  const out = [];
  const re = /<!--[\s\S]*?-->|<\/?([a-zA-Z][\w-]*)\b[^>]*?(\/?)>/g;
  let depth = 0;
  let start = -1;
  let m;
  let textStart = 0;
  while ((m = re.exec(html))) {
    const tag = m[0];
    if (tag.startsWith('<!--')) continue;
    const name = m[1].toLowerCase();
    const closing = tag.startsWith('</');
    const selfClose = m[2] === '/' || VOID.has(name);
    if (depth === 0 && !closing) {
      const stray = html.slice(textStart, m.index).trim();
      if (stray) out.push(stray);
      start = m.index;
    }
    if (closing) depth--;
    else if (!selfClose) depth++;
    if (depth === 0 && start !== -1 && (closing || selfClose)) {
      out.push(html.slice(start, re.lastIndex));
      start = -1;
      textStart = re.lastIndex;
    }
  }
  const tail = html.slice(textStart).trim();
  if (tail) out.push(tail);
  return out;
};

// "Visual" blocks fill the image slot of the Figma split rows: screenshots,
// diagrams, and the self-contained boxes (comparisons, cards, charts).
const MEDIA_CLASS = /class="[^"]*\b(cs-diagram|cs-diagram-grid|cs-screens|gallery-grid|cs-compare|cs-benchmark-grid|cs-fear-cards|targets-grid|momentum|roadmap|ctx-grid|ladder|brand-logos|cs-edge-cases|scatter)\b/;
// Too wide for half the screen: always a full-width media row.
const WIDE_CLASS = /class="[^"]*\b(gallery-grid|cs-screens--4|cs-screens--5|cs-diagram-grid--3)\b/;
const isMedia = (b) => /^<(figure|img|table)\b/.test(b) || (/^<div\b/.test(b) && MEDIA_CLASS.test(b.slice(0, 200)));
const isWide = (b) => WIDE_CLASS.test(b.slice(0, 200));
const isCaption = (b) => /^<(p|figcaption)\b[^>]*class="[^"]*\bcs-caption\b/.test(b);

// Returns rows: { type: 'split', text: [...], media } | { type: 'media', items: [...] } | { type: 'text', text: [...] }
export const toRows = (html) => {
  const blocks = topLevel(html);
  const items = [];
  blocks.forEach((b) => {
    const prev = items[items.length - 1];
    if (isCaption(b) && prev && prev.kind === 'media') prev.html += b;
    else items.push({ kind: isMedia(b) ? 'media' : 'text', html: b });
  });
  const rows = [];
  let text = [];
  let i = 0;
  while (i < items.length) {
    if (items[i].kind === 'text') {
      text.push(items[i].html);
      i++;
      continue;
    }
    if (isWide(items[i].html)) {
      if (text.length) rows.push({ type: 'text', text });
      text = [];
      rows.push({ type: 'media', items: [items[i++].html], wide: true });
      continue;
    }
    const group = [];
    while (i < items.length && items[i].kind === 'media' && !isWide(items[i].html)) group.push(items[i++].html);
    if (text.length) {
      rows.push({ type: 'split', text, media: group.shift() });
      text = [];
    }
    if (group.length) rows.push({ type: 'media', items: group });
  }
  if (text.length) rows.push({ type: 'text', text });
  return rows;
};
