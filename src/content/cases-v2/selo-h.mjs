// Selo H case. Source: the existing case content (Dhiego's) and the résumé
// (+65% conversion). Screens captured from the live site seloh.org; scenes
// generated in Magnific (Seedream 5 Pro) with the real screens composited in.
export default {
  slug: 'selo-h',
  hero: { src: '/assets/img/case/selo-h/hero.webp' },
  en: {
    seoTitle: 'Selo H | Mental health certification | Dhiego Cristofolini',
    description:
      'Product design case: Selo H\'s site rebuilt in one week so a compliance buyer sees legal grounding, proof and one clear action, in that order.',
    cat: 'Website · Conversion',
    title: 'Selo H',
    sub: 'Website for a workplace mental health certification',
    cover: 'Selo H',
    introTitle: 'A one-week rebuild after the domain lapsed',
    intro:
      'Selo H is Brazil\'s first workplace mental health certification built to international standards: NR-01, Lei 14.831/24, WHO guidelines and ICD-11. Alelo, Amil, Arcor, Claro and Cogna were already certified. When the old domain lapsed, the site had to be rebuilt from scratch in one week.',
    meta: [
      ['Client', 'Selo H · via Vellumwire'],
      ['Timeline', '2025 · 1 week'],
      ['Role', 'Strategy, UX/IA, copy, visual design'],
      ['Team', 'Afonso, front-end and hosting'],
    ],
    blocks: [
      {
        type: 'section', num: '01', sub: 'The situation', title: 'The site was also the sales channel',
        text: 'The certification process itself runs through the website. Without it there was no channel for leads and no way to document new certified companies. The brief: make the site as serious as the certification.',
        wide: { img: 'ctx-desk', alt: 'The rebuilt Selo H site on a monitor and laptop in an office at night', caption: 'The 4-step process on the monitor, the request form on the laptop.' },
      },
      {
        type: 'section', num: '02', sub: 'Diagnosis', title: 'Auditing the old site first',
        text: 'Before any copy or layout, I audited the old site. It had six problems that made each other worse, and the audit ended with the question that guided the redesign.',
        artifact: { img: 'art-diagnosis', alt: 'Six problems of the old site and the question that guided the redesign' },
      },
      {
        type: 'section', num: '03', sub: 'Decision', title: 'Legal grounding right under the hero',
        text: 'The hero leads with what the buyer wants, legal anchors sit right under it, each step explains why it exists, and certified companies close the page right before the form.',
        artifact: { img: 'art-sequence', alt: 'Section order before and after the redesign' },
        wide: { img: 'ctx-phones', alt: 'Three phones on a conference table showing the Selo H hero, its legal anchors and the request form', caption: 'Hero, legal anchors, request form: the same order on the phone.' },
      },
      {
        type: 'section', layout: 'split', num: '04', sub: 'Decision', title: 'Cutting the page down to one action',
        text: 'Newsletter, downloads and alternate contacts gave undecided visitors a way out. Now "Solicitar certificação" is the only ask on the page, repeated at every scroll position.',
        portrait: { img: 'ctx-boardroom', alt: 'An HR director in a meeting room holding a phone with the Selo H site', caption: 'Mobile first: the same single action on the phone.' },
      },
      {
        type: 'section', num: '05', sub: 'Build', title: 'Plain HTML and CSS instead of the template',
        text: 'The old template was slow, which looks bad for a product sold on rigor. Afonso and I dropped it and built the pages in plain HTML and CSS.',
        artifact: { img: 'art-perf', alt: 'LCP of 4.8 seconds on the template site against 1.4 seconds after the rebuild' },
      },
    ],
    results: {
      sub: 'Results',
      title: 'The first 30 days, with no ads or outreach',
      text: 'Compared against the old site\'s own analytics, before the domain lapsed.',
      stats: [
        ['5×', 'more leads than the old site'],
        ['+65%', 'conversion rate'],
        ['−40%', 'bounce rate'],
        ['2.3×', 'time on page'],
        ['1.4 s', 'LCP, down from 4.8 s'],
        ['100', 'Lighthouse performance score'],
      ],
      links: [['https://seloh.org', 'seloh.org']],
    },
  },
  pt: {
    seoTitle: 'Selo H | Certificação em saúde mental | Dhiego Cristofolini',
    description:
      'Case de product design: o site do Selo H refeito em uma semana para quem compra por conformidade ver base legal, prova e uma ação clara, nessa ordem.',
    cat: 'Site · Conversão',
    title: 'Selo H',
    sub: 'Site de uma certificação de saúde mental no trabalho',
    cover: 'Selo H',
    introTitle: 'Um site refeito em uma semana depois que o domínio expirou',
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
        type: 'section', num: '01', sub: 'O contexto', title: 'O site também era o canal de vendas',
        text: 'O próprio processo de certificação passa pelo site. Sem ele não havia canal de leads nem como registrar novas empresas certificadas. O briefing: deixar o site tão sério quanto a certificação.',
        wide: { img: 'ctx-desk', alt: 'O novo site do Selo H num monitor e num notebook, num escritório à noite', caption: 'Os 4 passos no monitor, o formulário de pedido no notebook.' },
      },
      {
        type: 'section', num: '02', sub: 'Diagnóstico', title: 'Primeiro, a auditoria do site antigo',
        text: 'Antes de qualquer texto ou layout, auditei o site antigo. Ele tinha seis problemas que pioravam um ao outro, e a auditoria terminou com a pergunta que guiou o redesign.',
        artifact: { img: 'art-diagnosis', alt: 'Seis problemas do site antigo e a pergunta que guiou o redesign' },
      },
      {
        type: 'section', num: '03', sub: 'Decisão', title: 'Base legal logo abaixo do hero',
        text: 'O hero abre com o que o comprador quer, as âncoras legais ficam logo abaixo, cada passo explica por que existe, e as empresas certificadas fecham a página logo antes do formulário.',
        artifact: { img: 'art-sequence', alt: 'Ordem das seções antes e depois do redesign' },
        wide: { img: 'ctx-phones', alt: 'Três celulares numa mesa de reunião mostrando o hero do Selo H, as âncoras legais e o formulário de pedido', caption: 'Hero, âncoras legais, formulário: a mesma ordem no celular.' },
      },
      {
        type: 'section', layout: 'split', num: '04', sub: 'Decisão', title: 'Uma ação só na página inteira',
        text: 'Newsletter, downloads e outros contatos davam ao visitante indeciso uma saída. Agora "Solicitar certificação" é o único pedido da página, repetido em cada ponto da rolagem.',
        portrait: { img: 'ctx-boardroom', alt: 'Uma diretora de RH numa sala de reunião segurando um celular com o site do Selo H', caption: 'Mobile primeiro: a mesma ação única no celular.' },
      },
      {
        type: 'section', num: '05', sub: 'Construção', title: 'HTML e CSS no lugar do template',
        text: 'O template antigo era lento, o que pega mal para um produto vendido pelo rigor. O Afonso e eu largamos o template e montamos as páginas em HTML e CSS.',
        artifact: { img: 'art-perf', alt: 'LCP de 4,8 segundos no site em template contra 1,4 segundo depois da reconstrução' },
      },
    ],
    results: {
      sub: 'Resultados',
      title: 'Os primeiros 30 dias, sem anúncio nem prospecção',
      text: 'Comparados com o analytics do próprio site antigo, antes de o domínio expirar.',
      stats: [
        ['5×', 'mais leads que o site antigo'],
        ['+65%', 'de taxa de conversão'],
        ['−40%', 'de taxa de rejeição'],
        ['2,3×', 'de tempo na página'],
        ['1,4 s', 'de LCP, antes 4,8 s'],
        ['100', 'de performance no Lighthouse'],
      ],
      links: [['https://seloh.org', 'seloh.org']],
    },
  },
};
