// Fiter case. Source: the existing case content (Dhiego's) and the résumé
// (SEO 22 → 100 in two weeks, 9 critical issues). Screens captured from the
// live site fiter.com.br; scenes generated in Magnific with the real screens.
export default {
  slug: 'fiter',
  hero: { src: '/assets/img/case/fiter/hero.webp' },
  en: {
    seoTitle: 'Fiter | HR site rebuilt for search | Dhiego Cristofolini',
    description:
      'Product design case: Fiter\'s site rebuilt from a one-page template into 16 structured pages, two buyer paths and an SEO score from 22 to 100 in two weeks.',
    cat: 'Website · SEO · Information architecture',
    title: 'Fiter',
    sub: 'Fixing search before the redesign',
    cover: 'Fiter',
    introTitle: 'Covered by Forbes and Folha, and invisible in search',
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
        type: 'section', layout: 'split', num: '01', sub: 'The situation', title: 'One Joomla page for two products',
        text: 'Everything sat on a single Joomla page. The title tag read "fiter" and the meta description read "parallax one page", the name of the theme. GTM was installed but never configured, and the blog lived on a subdomain.',
        stats: [
          ['22/100', 'SEO score'],
          ['1', 'page for two products'],
          ['0', 'conversion events tracked'],
          ['4', 'press outlets, unused'],
        ],
      },
      {
        type: 'section', num: '02', sub: 'Decision', title: 'HR and Education got separate paths',
        text: 'An HR director and a university dean search for different things. One page can\'t rank for both, so each ecosystem got its own pages, intent and CTA inside the same domain.',
        artifact: { img: 'art-journeys', alt: 'HR and Education buyer journeys from search to conversion' },
        pairEven: true,
        pair: [
          { img: 'ctx-hr', alt: 'An HR director at night with the Fiter HR page open on her laptop', caption: 'The HR path: climate and turnover, for a people manager.' },
          { img: 'ctx-library', alt: 'Fiter\'s engagement dashboard on a laptop in a university library', caption: 'The Education path: a different buyer, the same domain authority.' },
        ],
      },
      {
        type: 'section', num: '03', sub: 'Architecture', title: 'Why the site stayed on one domain',
        text: 'Two separate domains were rejected: they would have split the press backlinks in half. The blog came back from the subdomain to fiter.com.br/blog.',
        artifact: { img: 'art-ia', alt: 'Site architecture with editorial, product and conversion clusters' },
      },
      {
        type: 'section', num: '04', sub: 'SEO', title: 'On-page SEO across all 16 pages',
        text: 'Titles, metas, one H1 per page and schema on all 16 pages, mapped to five keyword clusters across the funnel.',
        artifact: { img: 'art-keywords', alt: 'Five keyword clusters from top of funnel to bottom' },
      },
      {
        type: 'section', num: '05', sub: 'Outcome', title: 'The audit at launch',
        text: 'Every category rebuilt from near zero, inside the same two weeks, with GA4 and Search Console live from launch day. Scores measured at launch.',
        artifact: { img: 'art-seo', alt: 'SEO audit per category before and after, 22 to 100' },
      },
    ],
    results: {
      sub: 'Results',
      title: 'At launch and three months later',
      text: 'Three months after launch, organic traffic had grown nearly 100%, and the site had its first conversion baseline: 2%.',
      stats: [
        ['22 → 100', 'SEO score at launch, all 7 categories'],
        ['1 → 16', 'pages fully structured'],
        ['0 → 16', 'pages with schema markup'],
        ['3', 'leads attributed in the first weeks; the old site tracked none'],
      ],
      links: [['https://fiter.com.br', 'fiter.com.br']],
    },
  },
  pt: {
    seoTitle: 'Fiter | Site de RH feito para busca | Dhiego Cristofolini',
    description:
      'Case de product design: o site da Fiter saiu de um template de uma página para 16 páginas, dois caminhos de compra e SEO de 22 para 100 em duas semanas.',
    cat: 'Site · SEO · Arquitetura de informação',
    title: 'Fiter',
    sub: 'Arrumar a busca antes do redesign',
    cover: 'Fiter',
    introTitle: 'Na Forbes e na Folha, e invisível na busca',
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
        type: 'section', layout: 'split', num: '01', sub: 'O contexto', title: 'Uma página em Joomla para dois produtos',
        text: 'Tudo ficava numa única página em Joomla. A tag de título dizia "fiter" e a meta description dizia "parallax one page", o nome do tema. O GTM estava instalado e nunca foi configurado, e o blog ficava num subdomínio.',
        stats: [
          ['22/100', 'nota de SEO'],
          ['1', 'página para dois produtos'],
          ['0', 'eventos de conversão medidos'],
          ['4', 'veículos de imprensa, sem uso'],
        ],
      },
      {
        type: 'section', num: '02', sub: 'Decisão', title: 'RH e Educação ganharam caminhos separados',
        text: 'Um diretor de RH e um gestor acadêmico buscam coisas diferentes. Uma página não ranqueia para os dois, então cada ecossistema ganhou suas páginas, intenção e CTA, dentro do mesmo domínio.',
        artifact: { img: 'art-journeys', alt: 'Jornadas de compra de RH e Educação, da busca à conversão' },
        pairEven: true,
        pair: [
          { img: 'ctx-hr', alt: 'Uma diretora de RH à noite com a página de RH da Fiter aberta no notebook', caption: 'O caminho de RH: clima e turnover, para quem gere pessoas.' },
          { img: 'ctx-library', alt: 'O painel de engajamento da Fiter num notebook numa biblioteca universitária', caption: 'O caminho de Educação: outro comprador, a mesma autoridade de domínio.' },
        ],
      },
      {
        type: 'section', num: '03', sub: 'Arquitetura', title: 'Por que o site ficou num domínio só',
        text: 'Dois domínios separados foram descartados: dividiriam pela metade os backlinks da imprensa. O blog voltou do subdomínio para fiter.com.br/blog.',
        artifact: { img: 'art-ia', alt: 'Arquitetura do site com grupos editorial, de produto e de conversão' },
      },
      {
        type: 'section', num: '04', sub: 'SEO', title: 'SEO on-page nas 16 páginas',
        text: 'Títulos, metas, um H1 por página e schema nas 16 páginas, mapeados para cinco grupos de palavras-chave ao longo do funil.',
        artifact: { img: 'art-keywords', alt: 'Cinco grupos de palavras-chave do topo ao fundo do funil' },
      },
      {
        type: 'section', num: '05', sub: 'Resultado', title: 'A auditoria no lançamento',
        text: 'Cada categoria refeita quase do zero, nas mesmas duas semanas, com GA4 e Search Console ativos desde o dia do lançamento. Notas medidas no lançamento.',
        artifact: { img: 'art-seo', alt: 'Auditoria de SEO por categoria antes e depois, de 22 para 100' },
      },
    ],
    results: {
      sub: 'Resultados',
      title: 'No lançamento e três meses depois',
      text: 'Três meses depois do lançamento, o tráfego orgânico tinha crescido quase 100%, e o site tinha a primeira base de conversão: 2%.',
      stats: [
        ['22 → 100', 'nota de SEO no lançamento, nas 7 categorias'],
        ['1 → 16', 'páginas estruturadas'],
        ['0 → 16', 'páginas com schema'],
        ['3', 'leads atribuídos nas primeiras semanas; o site antigo não media nenhum'],
      ],
      links: [['https://fiter.com.br', 'fiter.com.br']],
    },
  },
};
