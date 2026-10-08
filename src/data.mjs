export const SITE = {
  url: 'https://cristofolini.site',
  name: 'Dhiego Cristofolini',
  gaId: 'G-M378PSJ10R',
  email: 'dhiegopiresc@gmail.com',
  socials: [
    { id: 'instagram', label: 'Instagram', href: 'https://www.instagram.com/dhiegopires/' },
    { id: 'github', label: 'GitHub', href: 'https://github.com/Dhiegopires' },
    { id: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/in/dhiego-cristofolini-77b964150/' },
  ],
  behance: 'https://behance.net/dhiegopires',
};

export const ROUTES = {
  en: {
    home: '/',
    work: '/work/',
    blog: '/blog/',
    about: '/about/',
    resume: '/resume/',
    privacy: '/privacy-policy/',
    terms: '/terms-of-use/',
    contact: '/contact/',
    case: (slug) => `/work/${slug}/`,
  },
  pt: {
    home: '/pt-br/',
    work: '/pt-br/work/',
    blog: '/pt-br/blog/',
    about: '/pt-br/sobre/',
    resume: '/pt-br/curriculo/',
    privacy: '/pt-br/politica-de-privacidade/',
    terms: '/pt-br/termos-de-uso/',
    contact: '/pt-br/contato/',
    case: (slug) => `/pt-br/work/${slug}/`,
  },
};

export const FILTERS = {
  work: [
    { id: 'uiux', en: 'UI/UX', pt: 'UI/UX' },
    { id: 'design-system', en: 'Design System', pt: 'Design System' },
    { id: 'branding', en: 'Branding', pt: 'Branding' },
    { id: 'web', en: 'Website', pt: 'Website' },
  ],
  blog: [
    { id: 'accessibility', en: 'Accessibility', pt: 'Acessibilidade' },
    { id: 'design-systems', en: 'Design Systems', pt: 'Design Systems' },
  ],
};

const card = (slug, w, h) => ({
  src: `/assets/img/cards/${slug}.webp`,
  srcset: `/assets/img/cards/${slug}-900.webp 900w, /assets/img/cards/${slug}.webp ${w}w`,
  w,
  h,
});

// Order = Work page order. `home` = position in the Home carousel.
export const CASES = [
  {
    slug: 'medme',
    title: 'MedMe',
    home: 1,
    filters: ['uiux', 'design-system'],
    cat: { en: 'Product Design', pt: 'Design de Produto' },
    desc: {
      en: 'Regulated checkout flow, redesigned from zero. +6% measured conversion lift.',
      pt: 'Fluxo de checkout regulado, redesenhado do zero. +6% de conversão medida.',
    },
    img: card('medme', 1600, 1200),
    alt: { en: 'MedMe app screens on two phones', pt: 'Telas do app MedMe em dois celulares' },
  },
  {
    slug: 'instivo',
    title: 'Instivo',
    home: 2,
    filters: ['uiux', 'design-system'],
    cat: { en: 'Product Design', pt: 'Design de Produto' },
    desc: {
      en: 'Business rules for 50+ retail units, turned into one config flow. 70% faster setup.',
      pt: 'Regras de negócio de 50+ unidades de varejo em um único fluxo de configuração. Setup 70% mais rápido.',
    },
    img: card('instivo', 1600, 1200),
    alt: { en: 'Instivo rules dashboard on a laptop', pt: 'Painel de regras do Instivo em um notebook' },
  },
  {
    slug: 'vellumwire',
    title: 'Vellumwire',
    home: 5,
    filters: ['uiux', 'web'],
    cat: { en: 'Web Design', pt: 'Web Design' },
    desc: {
      en: '~1,000 organic sessions a week with no paid ads. A full sales cycle compressed into a single visit.',
      pt: '~1.000 sessões orgânicas por semana sem anúncios pagos. Um ciclo de vendas inteiro em uma única visita.',
    },
    img: card('vellumwire', 1600, 1200),
    alt: { en: 'Vellumwire website on a laptop', pt: 'Site da Vellumwire em um notebook' },
  },
  {
    slug: 'meaple',
    title: 'Meaple',
    home: 3,
    filters: ['uiux', 'branding'],
    cat: { en: 'Product Design · Branding', pt: 'Design de Produto · Branding' },
    desc: {
      en: '13 competitors mapped, none owned more than two layers of the journey. Discovery, ticketing and in-event payment as one product.',
      pt: '13 concorrentes mapeados, nenhum cobria mais de duas camadas da jornada. Descoberta, ingressos e pagamento no evento como um produto só.',
    },
    img: card('meaple', 1600, 1200),
    cover: { src: '/assets/img/cards/meaple-cover.webp', w: 1376, h: 768 },
    alt: { en: 'Meaple app on a phone resting on dark fabric', pt: 'App Meaple em um celular sobre tecido escuro' },
  },
  {
    slug: 'vellumwire-ds',
    title: 'Vellumwire DS',
    home: 6,
    filters: ['design-system'],
    cat: { en: 'Design System', pt: 'Design System' },
    desc: {
      en: 'Four token layers, eight colour ramps, and a re-theming process that touches exactly one of them.',
      pt: 'Quatro camadas de token, oito escalas de cor e um processo de retematização que toca exatamente uma delas.',
    },
    img: card('vellumwire-ds', 1600, 1200),
    alt: { en: 'Vellumwire design system colour palette', pt: 'Paleta de cores do design system Vellumwire' },
  },
  {
    slug: 'fiter',
    title: 'Fiter',
    home: 7,
    filters: ['uiux', 'web'],
    cat: { en: 'Web Design · SEO', pt: 'Web Design · SEO' },
    desc: {
      en: 'SEO score 22 to 100 in two weeks. 16 structured pages across two buyer ecosystems.',
      pt: 'Score de SEO de 22 para 100 em duas semanas. 16 páginas estruturadas em dois ecossistemas de compra.',
    },
    img: card('fiter', 1600, 1200),
    alt: { en: 'Fiter website homepage', pt: 'Página inicial do site da Fiter' },
  },
  {
    slug: 'northpay',
    title: 'NorthPay',
    home: 8,
    filters: ['uiux'],
    cat: { en: 'Product Concept', pt: 'Conceito de Produto' },
    desc: {
      en: 'A fintech onboarding and verification concept focused on reducing friction.',
      pt: 'Um conceito de onboarding e verificação fintech focado em reduzir atrito.',
    },
    img: card('northpay', 1600, 1200),
    alt: { en: 'NorthPay dashboard on laptop and tablet', pt: 'Painel NorthPay em notebook e tablet' },
  },
  {
    slug: 'selo-h',
    title: 'Selo H',
    home: 4,
    filters: ['uiux', 'web'],
    cat: { en: 'Web Design · CRO', pt: 'Web Design · CRO' },
    desc: {
      en: '5x more leads in 30 days. Bounce rate -40%. LCP 1.4s, rebuilt in one week.',
      pt: '5x mais leads em 30 dias. Taxa de rejeição -40%. LCP 1,4s, reconstruído em uma semana.',
    },
    img: card('selo-h', 1600, 1200),
    alt: { en: 'Selo H website on an iMac', pt: 'Site do Selo H em um iMac' },
  },
];

// Newest first. `pt` = PT-BR slug.
export const POSTS = [
  { slug: 'design-system-where-to-stop', pt: 'design-system-onde-parar', date: '2026-09-05', read: 4, cat: 'design-systems', hero: 'token-layers-hero.webp' },
  { slug: 'design-tokens-vs-hardcoded-values', pt: 'tokens-de-design-vs-valores-hardcoded', date: '2026-08-04', read: 9, cat: 'design-systems', hero: 'tokens-bead-hero.webp' },
  { slug: 'keyboard-navigation-testing', pt: 'navegacao-por-teclado', date: '2026-07-28', read: 9, cat: 'accessibility', hero: 'keyboard-tab-key-hero.webp' },
  { slug: 'color-blindness', pt: 'daltonismo', date: '2026-07-13', read: 8, cat: 'accessibility', hero: 'colorblind-gel-hero.webp' },
  { slug: 'what-is-aria', pt: 'o-que-e-aria', date: '2026-07-10', read: 8, cat: 'accessibility', hero: 'aria-braille-hero.webp' },
  { slug: 'contrast-aa-vs-aaa', pt: 'contraste-aa-vs-aaa', date: '2026-07-04', read: 9, cat: 'accessibility', hero: 'contrast-paper-hero.webp' },
  { slug: 'accessibility-failures-are-design-decisions', pt: 'falhas-de-acessibilidade-sao-decisoes-de-design', date: '2026-07-01', read: 10, cat: 'accessibility', hero: 'accessibility-keycap-hero.webp' },
];

export const postUrl = (p, lang) => (lang === 'pt' ? `/pt-br/blog/${p.pt}/` : `/blog/${p.slug}/`);

// Companies Dhiego worked at or for. Roles/periods from the résumé or from
// Dhiego directly; entries without a role show the name only.
export const COMPANIES = [
  { id: 'medme', name: 'MedMe Saúde', logo: 'medme', role: { en: 'Senior Product Designer', pt: 'Senior Product Designer' }, period: '2025' },
  { id: 'selo-h', name: 'Selo H', logo: 'selo-h', role: { en: 'Landing page & form flow redesign', pt: 'Redesign de landing page e formulário' }, period: '2025' },
  { id: 'abgi', name: 'ABGI', logo: 'abgi', role: { en: 'WordPress site, end to end', pt: 'Site WordPress, de ponta a ponta' }, period: '2024' },
  { id: 'instivo', name: 'Instivo', logo: 'instivo', role: { en: 'Product Designer', pt: 'Product Designer' }, period: '2023' },
  { id: 'nineblocks', name: 'Nineblocks', logo: 'nineblocks', role: { en: 'Product Designer', pt: 'Product Designer' }, period: '2022–2023' },
  { id: 'vega-it', name: 'Vega I.T.', logo: 'vega-it', role: { en: 'UI/UX Designer', pt: 'UI/UX Designer' }, period: '2022' },
  { id: 'ensight', name: 'Ensight', logo: 'ensight', role: { en: 'Product Designer', pt: 'Product Designer' }, period: '2019–2021' },
  { id: 'meaple', name: 'Meaple', logo: 'meaple', role: { en: 'Product design, research to MVP', pt: 'Design de produto, da pesquisa ao MVP' }, period: '2019–2021' },
  { id: 'facto', name: 'Facto', logo: 'facto', role: { en: 'Product design, research to MVP', pt: 'Design de produto, da pesquisa ao MVP' }, period: '2019–2021' },
  { id: 'play9', name: 'Play9', logo: 'play9', role: { en: 'Web design & 2D art', pt: 'Web design e arte 2D' } },
  { id: 'cebrac', name: 'CEBRAC', logo: 'cebrac', role: { en: 'Teacher & graphic designer', pt: 'Professor e designer gráfico' } },
  { id: 'lovefit', name: 'Lovefit', logo: 'lovefit', role: { en: 'Branding & marketing', pt: 'Branding e marketing' } },
];

// Paraphrased from what each person said while working together.
export const TESTIMONIALS = [
  {
    name: 'Bruno Vencato',
    avatar: '/assets/img/site/avatar-vencato.webp',
    role: { en: 'CEO at Meaple, formerly Ensight', pt: 'CEO da Meaple, antes na Ensight' },
    quote: {
      en: 'Dhiego’s work was exceptional from research all the way to visual design. He understood the product, not just the screens, and his illustrations fit every app we built, in whatever style it needed.',
      pt: 'O trabalho do Dhiego era excepcional, da pesquisa ao design visual. Ele entendia o produto, não só as telas, e as ilustrações dele se encaixavam em cada app que construímos, no estilo que cada um pedia.',
    },
  },
  {
    name: 'Leonardo Volpato',
    avatar: '/assets/img/site/avatar-volpato.webp',
    role: { en: 'Senior Designer at Instivo', pt: 'Designer Sênior na Instivo' },
    quote: {
      en: 'Dhiego is a designer well above the curve. He delivered fast and always thought outside the box to bring the best solution to the table.',
      pt: 'O Dhiego é um designer muito acima da curva. Entregava rápido e sempre pensava fora da caixa para trazer a melhor solução.',
    },
  },
];
