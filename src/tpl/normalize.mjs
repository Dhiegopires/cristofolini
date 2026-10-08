// Long-form HTML from src/content (articles, résumé, docs): font names in
// inline SVG, async images, escaped code samples, scrollable tables.
export const normalizeBody = (html) =>
  html
    .replace(/font-family="'DM Sans',sans-serif"/g, 'font-family="Geist, sans-serif"')
    .replace(/font-family="'?IBM Plex Mono'?,monospace"/g, `font-family="'Geist Mono', monospace"`)
    .replace(/<img(?![^>]*\bdecoding=)/g, '<img decoding="async"')
    .replace(/<code([^>]*)>([\s\S]*?)<\/code>/g, (m, a, b) => `<code${a}>${b.replace(/"/g, '&quot;')}</code>`)
    // Markdown-style inline code (one article uses it): escape and wrap, so
    // samples like <main> show as text instead of becoming real elements.
    .replace(/`([^`\n]{1,80})`/g, (m, c) => `<code>${c.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')}</code>`)
    .replace(/<br>(?=[^\s<])/g, '<br> ')
    .replace(/<table([\s\S]*?)<\/table>/g, '<div class="table-scroll" tabindex="0" role="region" aria-label="Table"><table$1</table></div>');
