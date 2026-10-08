export const esc = (s = '') =>
  String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

export const join = (items, fn) => items.map(fn).join('');

export const when = (cond, html) => (cond ? (typeof html === 'function' ? html() : html) : '');

// Wraps every word in spans so the reveal animation can slide words up
// without breaking the accessible name (the original text stays in aria-label).
export const words = (text) =>
  String(text)
    .split(/(\s+)/)
    .map((w) => (/^\s+$/.test(w) || !w ? w : `<span class="word"><span class="word__inner">${w}</span></span>`))
    .join('');

export const icon = {
  arrowNE: `<svg class="btn__icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M21 3v18h-4V7H4V3h17Z" fill="currentColor"/><path d="M20.414 6.414 6.414 20.414H3.586v-2.828l14-14 2.828 2.828Z" fill="currentColor"/></svg>`,
  chevronLeft: `<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M15 18 9 12l6-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  chevronRight: `<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="m9 18 6-6-6-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  arrowUp: `<svg class="to-top__arrow" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M12 19V5M5 12l7-7 7 7" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  arrowRight: `<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  search: `<svg class="search__icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="m21 21-4.34-4.34" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><circle cx="11" cy="11" r="8" fill="none" stroke="currentColor" stroke-width="2"/></svg>`,
  plus: `<svg viewBox="0 0 16 16" aria-hidden="true" focusable="false"><path d="M0 8h16M8 0v16" stroke="currentColor" stroke-width="2"/></svg>`,
  globe: `<svg viewBox="0 0 32 32" aria-hidden="true" focusable="false"><g fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><circle cx="16" cy="16" r="13.33"/><path d="M10.67 16A21.33 21.33 0 0 1 16 2.67 21.33 21.33 0 0 1 21.33 16 21.33 21.33 0 0 1 16 29.33 21.33 21.33 0 0 1 10.67 16ZM2.67 16h26.66"/></g></svg>`,
  menu: `<svg class="menu-toggle__icon menu-toggle__icon--open" viewBox="0 0 32 32" aria-hidden="true" focusable="false"><path d="M5.33 6.67h21.34M5.33 16h21.34M5.33 25.33h21.34" stroke="currentColor" stroke-width="3"/></svg>`,
  minus: `<svg class="menu-toggle__icon menu-toggle__icon--minus" viewBox="0 0 32 32" aria-hidden="true" focusable="false"><path d="M5.33 16h21.34" stroke="currentColor" stroke-width="3"/></svg>`,
  close: `<svg class="menu-toggle__icon menu-toggle__icon--close" viewBox="0 0 32 32" aria-hidden="true" focusable="false"><path d="M5 28 27.63 5.37M5 5l22.63 22.63" stroke="currentColor" stroke-width="3" stroke-linejoin="round"/></svg>`,
  instagram: `<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><rect x="2.5" y="2.5" width="19" height="19" rx="5.5" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="4.25" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="17.6" cy="6.4" r="1.25" fill="currentColor"/></svg>`,
  github: `<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="currentColor" d="M12 1.5a10.5 10.5 0 0 0-3.32 20.46c.53.1.72-.23.72-.5v-1.85c-2.92.63-3.54-1.24-3.54-1.24-.48-1.22-1.17-1.54-1.17-1.54-.95-.65.08-.64.08-.64 1.05.08 1.6 1.08 1.6 1.08.94 1.6 2.46 1.14 3.06.87.1-.68.37-1.14.66-1.4-2.33-.27-4.78-1.17-4.78-5.18 0-1.15.41-2.08 1.08-2.82-.1-.27-.47-1.34.1-2.79 0 0 .89-.28 2.9 1.08a10 10 0 0 1 5.27 0c2.01-1.36 2.9-1.08 2.9-1.08.57 1.45.21 2.52.1 2.79.68.74 1.08 1.67 1.08 2.82 0 4.02-2.45 4.9-4.79 5.17.38.32.71.96.71 1.94v2.87c0 .28.19.61.73.5A10.5 10.5 0 0 0 12 1.5Z"/></svg>`,
  linkedin: `<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><rect x="2" y="2" width="20" height="20" rx="2" fill="none" stroke="currentColor" stroke-width="2"/><path fill="currentColor" d="M6.2 9.6h2.4V18H6.2zM7.4 5.6a1.4 1.4 0 1 1 0 2.8 1.4 1.4 0 0 1 0-2.8ZM10.4 9.6h2.3v1.15h.03c.32-.6 1.1-1.25 2.27-1.25 2.43 0 2.88 1.6 2.88 3.68V18h-2.4v-4.27c0-1.02-.02-2.33-1.42-2.33-1.42 0-1.64 1.11-1.64 2.26V18h-2.4z"/></svg>`,
  behance: `<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="currentColor" d="M8.2 11.4c.9-.4 1.5-1.2 1.5-2.3C9.7 7 8.2 6 6.2 6H1v12h5.4c2.1 0 3.9-1 3.9-3.3 0-1.4-.7-2.6-2.1-3.3ZM3.5 8.1h2.3c.9 0 1.6.3 1.6 1.2 0 .9-.6 1.3-1.5 1.3H3.5Zm2.5 7.8H3.5v-3h2.6c1 0 1.8.4 1.8 1.5S7 15.9 6 15.9ZM15.2 4.8h5.3v1.4h-5.3zM23 13.6c0-2.6-1.5-4.7-4.3-4.7-2.7 0-4.5 2-4.5 4.6 0 2.7 1.7 4.6 4.5 4.6 2.1 0 3.5-.9 4.1-2.9h-2.2c-.2.7-1.1 1.1-1.8 1.1-1.4 0-2.1-.8-2.1-2.2H23v-.5Zm-6.3-1c.1-1.1.8-1.8 2-1.8 1.1 0 1.7.7 1.8 1.8Z"/></svg>`,
};

export const tag = (t) => `<span class="tag">${esc(t)}</span>`;
export const tags = (list = []) => (list.length ? `<div class="tags">${join(list, tag)}</div>` : '');

export const img = ({ src, alt = '', w, h, cls = '', lazy = true, sizes, srcset, priority = false }) =>
  `<img${cls ? ` class="${cls}"` : ''} src="${src}"${srcset ? ` srcset="${srcset}"` : ''}${sizes ? ` sizes="${sizes}"` : ''} width="${w}" height="${h}" alt="${esc(alt)}"${lazy ? ' loading="lazy"' : ''} decoding="async"${priority ? ' fetchpriority="high"' : ''}>`;
