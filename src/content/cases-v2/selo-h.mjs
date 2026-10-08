// Selo H case. Source: the existing case content (Dhiego's) and the résumé
// (+50% conversion). Screens captured from the live site seloh.org; scenes
// generated in Magnific (Seedream 5 Pro) with the real screens composited in.
export default {
  slug: 'selo-h',
  hero: { src: '/assets/img/case/selo-h/hero.webp' },
  en: {
    seoTitle: 'Selo H | Workplace mental health certification site | Dhiego Cristofolini',
    description:
      'Product design case: Selo H’s site rebuilt in one week so a compliance buyer sees legal grounding, proof and one clear action, in that order.',
    cat: 'Website · Conversion',
    title: 'Selo H',
    sub: 'The product had credibility. The site didn’t.',
    cover: 'Selo H',
    introTitle: 'A certification as serious as its website.',
    intro:
      'Selo H is Brazil’s first workplace mental health certification built to international standards: NR-01, Lei 14.831/24, WHO guidelines and ICD-11. Alelo, Amil, Arcor, Claro and Cogna were already certified. When the old domain lapsed, the site had to be rebuilt from scratch in one week.',
    meta: [
      ['Client', 'Selo H · via Vellumwire'],
      ['Timeline', '2025 · 1 week'],
      ['Role', 'Strategy, UX/IA, copy, visual design'],
      ['Team', 'Afonso, front-end and hosting'],
    ],
    blocks: [
      {
        type: 'section', num: '01', sub: 'The situation', title: 'No site, no leads, no certifications.',
        text: 'The certification process itself runs through the website. Without it there was no channel for leads and no way to document new certified companies. The brief: make the site as serious as the certification.',
        wide: { img: 'ctx-desk', alt: 'The rebuilt Selo H site on a monitor and laptop in an office at night', caption: 'The 4-step process on the monitor, the request form on the laptop.' },
      },
      {
        type: 'section', num: '02', sub: 'Diagnosis', title: 'Six problems feeding each other.',
        text: 'Before any copy or layout, I audited what was there. One question set every decision that followed.',
        artifact: { img: 'art-diagnosis', alt: 'Six problems of the old site and the question that guided the redesign' },
      },
      {
        type: 'section', num: '03', sub: 'Decision', title: 'Outcome first, proof where it decides.',
        text: 'The hero leads with what the buyer wants, legal anchors sit right under it, each step explains why it exists, and certified companies close the page right before the form.',
        artifact: { img: 'art-sequence', alt: 'Section order before and after the redesign' },
      },
      {
        type: 'section', layout: 'split', num: '04', sub: 'Decision', title: 'One action, from hero to footer.',
        text: 'Newsletter, downloads and alternate contacts gave undecided visitors a way out. Now “Solicitar certificação” is the only ask on the page, repeated at every scroll position.',
        portrait: { img: 'ctx-boardroom', alt: 'An HR director in a meeting room holding a phone with the Selo H site', caption: 'Mobile first: the same single action on the phone.' },
      },
      {
        type: 'section', num: '05', sub: 'Build', title: 'A certification that loads like one.',
        text: 'A slow site contradicts a product sold on rigor. The rebuild dropped the template for clean HTML and CSS.',
        artifact: { img: 'art-perf', alt: 'LCP of 4.8 seconds on the template site against 1.4 seconds after the rebuild' },
      },
    ],
    results: {
      sub: 'Results',
      title: 'Measured in the first 30 days. No ads, no outreach.',
      stats: [
        ['5×', 'more leads than the pre-launch baseline'],
        ['+50%', 'conversion rate'],
        ['−40%', 'bounce rate'],
        ['2.3×', 'time on page'],
        ['1.4 s', 'LCP, down from 4.8 s'],
        ['100', 'Lighthouse score'],
      ],
      links: [['https://seloh.org', 'seloh.org']],
    },
  },
  pt: {
    seoTitle: 'Selo H | Site de certificação em saúde mental | Dhiego Cristofolini',
    description:
      'Case de product design: o site do Selo H refeito em uma semana para quem compra por conformidade ver base legal, prova e uma ação clara, nessa ordem.',
    cat: 'Site · Conversão',
    title: 'Selo H',
    sub: 'O produto tinha credibilidade. O site não.',
    cover: 'Selo H',
    introTitle: 'Uma certificação tão séria quanto o seu site.',
    intro:
      'O Selo H é a primeira certificação brasileira de saúde mental no trabalho com padrão internacional: NR-01, Lei 14.831/24, diretrizes da OMS e CID-11. Alelo, Amil, Arcor, Claro e Cogna já eram certificadas. Quando o domínio antigo expirou, o site precisou ser refeito do zero em uma semana.',
    meta: [
      ['Cliente', 'Selo H · pela Vellumwire'],
      ['Prazo', '2025 · 1 semana'],
      ['Papel', 'Estratégia, UX/IA, copy, design visual'],
      ['Time', 'Afonso, front-end e hospedagem'],
    ],
    blocks: [
      {
        type: 'section', num: '01', sub: 'O contexto', title: 'Sem site, sem leads, sem certificações.',
        text: 'O próprio processo de certificação passa pelo site. Sem ele não havia canal de leads nem como registrar novas empresas certificadas. O briefing: deixar o site tão sério quanto a certificação.',
        wide: { img: 'ctx-desk', alt: 'O novo site do Selo H num monitor e num notebook, num escritório à noite', caption: 'Os 4 passos no monitor, o formulário de pedido no notebook.' },
      },
      {
        type: 'section', num: '02', sub: 'Diagnóstico', title: 'Seis problemas que se alimentavam.',
        text: 'Antes de qualquer texto ou layout, auditei o que existia. Uma pergunta definiu todas as decisões seguintes.',
        artifact: { img: 'art-diagnosis', alt: 'Seis problemas do site antigo e a pergunta que guiou o redesign' },
      },
      {
        type: 'section', num: '03', sub: 'Decisão', title: 'Primeiro o resultado, prova onde se decide.',
        text: 'O hero abre com o que o comprador quer, as âncoras legais ficam logo abaixo, cada passo explica por que existe, e as empresas certificadas fecham a página logo antes do formulário.',
        artifact: { img: 'art-sequence', alt: 'Ordem das seções antes e depois do redesign' },
      },
      {
        type: 'section', layout: 'split', num: '04', sub: 'Decisão', title: 'Uma ação, do hero ao rodapé.',
        text: 'Newsletter, downloads e outros contatos davam ao visitante indeciso uma saída. Agora “Solicitar certificação” é o único pedido da página, repetido em cada ponto da rolagem.',
        portrait: { img: 'ctx-boardroom', alt: 'Uma diretora de RH numa sala de reunião segurando um celular com o site do Selo H', caption: 'Mobile primeiro: a mesma ação única no celular.' },
      },
      {
        type: 'section', num: '05', sub: 'Construção', title: 'Uma certificação que carrega como uma.',
        text: 'Um site lento contradiz um produto vendido pelo rigor. A reconstrução trocou o template por HTML e CSS limpos.',
        artifact: { img: 'art-perf', alt: 'LCP de 4,8 segundos no site em template contra 1,4 segundo depois da reconstrução' },
      },
    ],
    results: {
      sub: 'Resultados',
      title: 'Medidos nos primeiros 30 dias. Sem anúncio, sem prospecção.',
      stats: [
        ['5×', 'mais leads que a linha de base anterior'],
        ['+50%', 'de taxa de conversão'],
        ['−40%', 'de taxa de rejeição'],
        ['2,3×', 'de tempo na página'],
        ['1,4 s', 'de LCP, antes 4,8 s'],
        ['100', 'no Lighthouse'],
      ],
      links: [['https://seloh.org', 'seloh.org']],
    },
  },
};
