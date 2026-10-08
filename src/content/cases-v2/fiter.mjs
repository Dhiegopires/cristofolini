// Fiter case. Source: the existing case content (Dhiego's) and the résumé
// (SEO 22 → 100 in two weeks, 9 critical issues). Screens captured from the
// live site fiter.com.br; scenes generated in Magnific with the real screens.
export default {
  slug: 'fiter',
  hero: { src: '/assets/img/case/fiter/hero.webp' },
  en: {
    seoTitle: 'Fiter | HR and EdTech site rebuilt for search | Dhiego Cristofolini',
    description:
      'Product design case: Fiter’s site rebuilt from a one-page template into 16 structured pages, two buyer paths and an SEO score from 22 to 100 in two weeks.',
    cat: 'Website · SEO · Information architecture',
    title: 'Fiter',
    sub: 'Infrastructure first. Design second.',
    cover: 'Fiter',
    introTitle: 'Press in Forbes and Folha. Invisible in search.',
    intro:
      'Fiter is a Brazilian HR and EdTech SaaS that uses AI to predict turnover, measure climate and reduce student dropout. It had coverage in Folha de SP, Estadão, Forbes Brasil and CBN, and none of it showed up in search. Nine critical issues were logged before any design decision.',
    meta: [
      ['Client', 'Fiter · via Vellumwire'],
      ['Timeline', '2025 · 2 weeks'],
      ['Role', 'Strategy, IA, copy, design system'],
      ['Team', 'Afonso, front-end and hosting'],
    ],
    blocks: [
      {
        type: 'section', layout: 'split', num: '01', sub: 'The situation', title: 'A visual presence with nothing behind it.',
        text: 'One Joomla page for two products. The title tag read “fiter”, the meta description read “parallax one page”, the theme’s name. GTM was installed but never configured, and the blog lived on a subdomain.',
        stats: [
          ['22/100', 'SEO score'],
          ['1', 'page for two products'],
          ['0', 'conversion events tracked'],
          ['4', 'press outlets, unused'],
        ],
      },
      {
        type: 'section', num: '02', sub: 'Decision', title: 'Two buyers, two paths.',
        text: 'An HR director and a university dean search for different things. One page can’t rank for both, so each ecosystem got its own pages, intent and CTA inside the same domain.',
        artifact: { img: 'art-journeys', alt: 'HR and Education buyer journeys from search to conversion' },
        wide: { img: 'ctx-library', alt: 'Fiter’s engagement dashboard on a laptop in a university library', caption: 'The Education path: built for a different buyer, on the same domain authority.' },
      },
      {
        type: 'section', num: '03', sub: 'Architecture', title: 'Sixteen pages, three clusters.',
        text: 'Two separate domains were rejected: they would have split the press backlinks in half. The blog came back from the subdomain to fiter.com.br/blog.',
        artifact: { img: 'art-ia', alt: 'Site architecture with editorial, product and conversion clusters' },
      },
      {
        type: 'section', num: '04', sub: 'SEO', title: 'Intent matched to page type.',
        text: 'Titles, metas, one H1 per page and schema on all 16 pages, mapped to five keyword clusters across the funnel.',
        artifact: { img: 'art-keywords', alt: 'Five keyword clusters from top of funnel to bottom' },
      },
      {
        type: 'section', num: '05', sub: 'Outcome', title: 'From 22 to 100, in every category.',
        text: 'Every category rebuilt from near zero, inside the same two weeks, with GA4 and Search Console live from launch day.',
        artifact: { img: 'art-seo', alt: 'SEO audit per category before and after, 22 to 100' },
      },
    ],
    results: {
      sub: 'Results',
      title: 'A site that counts what it earns.',
      stats: [
        ['22 → 100', 'SEO score, all 7 categories'],
        ['1 → 16', 'pages fully structured'],
        ['0 → 16', 'pages with schema markup'],
        ['3', 'leads attributed in the first weeks, from zero'],
      ],
      links: [['https://fiter.com.br', 'fiter.com.br']],
    },
  },
  pt: {
    seoTitle: 'Fiter | Site de RH e EdTech refeito para busca | Dhiego Cristofolini',
    description:
      'Case de product design: o site da Fiter saiu de um template de uma página para 16 páginas estruturadas, dois caminhos de compra e SEO de 22 para 100 em duas semanas.',
    cat: 'Site · SEO · Arquitetura de informação',
    title: 'Fiter',
    sub: 'Infraestrutura primeiro. Design depois.',
    cover: 'Fiter',
    introTitle: 'Na Forbes e na Folha. Invisível na busca.',
    intro:
      'A Fiter é um SaaS brasileiro de RH e EdTech que usa IA para prever turnover, medir clima e reduzir evasão de alunos. Tinha matérias na Folha de SP, Estadão, Forbes Brasil e CBN, e nada disso aparecia na busca. Nove problemas críticos foram levantados antes de qualquer decisão de design.',
    meta: [
      ['Cliente', 'Fiter · pela Vellumwire'],
      ['Prazo', '2025 · 2 semanas'],
      ['Papel', 'Estratégia, IA, copy, design system'],
      ['Time', 'Afonso, front-end e hospedagem'],
    ],
    blocks: [
      {
        type: 'section', layout: 'split', num: '01', sub: 'O contexto', title: 'Uma presença visual sem nada por trás.',
        text: 'Uma página em Joomla para dois produtos. A tag de título dizia “fiter”, a meta description dizia “parallax one page”, o nome do tema. O GTM estava instalado e nunca foi configurado, e o blog ficava num subdomínio.',
        stats: [
          ['22/100', 'nota de SEO'],
          ['1', 'página para dois produtos'],
          ['0', 'eventos de conversão medidos'],
          ['4', 'veículos de imprensa, sem uso'],
        ],
      },
      {
        type: 'section', num: '02', sub: 'Decisão', title: 'Dois compradores, dois caminhos.',
        text: 'Um diretor de RH e um gestor acadêmico buscam coisas diferentes. Uma página não ranqueia para os dois, então cada ecossistema ganhou suas páginas, intenção e CTA, dentro do mesmo domínio.',
        artifact: { img: 'art-journeys', alt: 'Jornadas de compra de RH e Educação, da busca à conversão' },
        wide: { img: 'ctx-library', alt: 'O painel de engajamento da Fiter num notebook numa biblioteca universitária', caption: 'O caminho de Educação: feito para outro comprador, com a mesma autoridade de domínio.' },
      },
      {
        type: 'section', num: '03', sub: 'Arquitetura', title: 'Dezesseis páginas, três grupos.',
        text: 'Dois domínios separados foram descartados: dividiriam pela metade os backlinks da imprensa. O blog voltou do subdomínio para fiter.com.br/blog.',
        artifact: { img: 'art-ia', alt: 'Arquitetura do site com grupos editorial, de produto e de conversão' },
      },
      {
        type: 'section', num: '04', sub: 'SEO', title: 'Intenção casada com tipo de página.',
        text: 'Títulos, metas, um H1 por página e schema nas 16 páginas, mapeados para cinco grupos de palavras-chave ao longo do funil.',
        artifact: { img: 'art-keywords', alt: 'Cinco grupos de palavras-chave do topo ao fundo do funil' },
      },
      {
        type: 'section', num: '05', sub: 'Resultado', title: 'De 22 para 100, em todas as categorias.',
        text: 'Cada categoria refeita quase do zero, nas mesmas duas semanas, com GA4 e Search Console ativos desde o dia do lançamento.',
        artifact: { img: 'art-seo', alt: 'Auditoria de SEO por categoria antes e depois, de 22 para 100' },
      },
    ],
    results: {
      sub: 'Resultados',
      title: 'Um site que mede o que conquista.',
      stats: [
        ['22 → 100', 'nota de SEO, nas 7 categorias'],
        ['1 → 16', 'páginas estruturadas'],
        ['0 → 16', 'páginas com schema'],
        ['3', 'leads atribuídos nas primeiras semanas, partindo de zero'],
      ],
      links: [['https://fiter.com.br', 'fiter.com.br']],
    },
  },
};
