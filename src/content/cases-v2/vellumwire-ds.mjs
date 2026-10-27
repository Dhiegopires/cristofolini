// Vellumwire design system case. Source: the existing case content (Dhiego's).
// Artifacts rendered from that content (brands in the swap demo are fictional,
// as in the original case); scenes generated in Magnific.
export default {
  slug: 'vellumwire-ds',
  hero: { src: '/assets/img/case/vellumwire-ds/hero.webp' },
  en: {
    seoTitle: 'Vellumwire DS | Four token layers | Dhiego Cristofolini',
    description:
      'Design system case: a four-layer token architecture where re-theming a client touches one layer, tested in production on Instivo.',
    cat: 'Design system · Tokens',
    title: 'Vellumwire DS',
    sub: 'A token system where each client changes one layer',
    cover: 'System',
    introTitle: 'Every new client started by rebuilding what already existed.',
    intro:
      'Each project began with a component library rebuilt from a blank file, even when the logic hadn\'t changed. The real cost showed up at handoff: new names to interpret, new spacing to check, undocumented edge cases. What was missing was a layer between component and brand.',
    meta: [
      ['Role', 'Product Designer'],
      ['Type', 'Internal design system'],
      ['Origin', 'Instivo, 2023; now the base of every Vellumwire build'],
      ['Team', 'Afonso, implementation and hosting'],
    ],
    blocks: [
      {
        type: 'section', num: '01', sub: 'Architecture', title: 'Core, Palette, Brand and Semantic',
        text: 'Structure stays fixed. Client decisions live in Brand, and components only read Semantic.',
        artifact: { img: 'art-arch', alt: 'Core, Palette, Brand and Semantic layers, each referencing the one below' },
      },
      {
        type: 'section', num: '02', sub: 'Palette', title: 'Color ramps built ahead of any client',
        text: 'Every ramp follows the same 25 to 950 structure, so branding a client means mapping its colors onto ramps that already exist. Seven of the eight ramps, one per role:',
        artifact: { img: 'art-ramps', alt: 'Seven color ramps from 25 to 950, each mapped to a brand role' },
      },
      {
        type: 'section', num: '03', sub: 'Brand', title: 'The same components under three brands',
        text: 'A card, a button, an input and badges under three client brands. Ramp, typeface and radius change, and the component code stays the same.',
        artifact: { img: 'art-swap', alt: 'The same components rendered under three fictional brands' },
        wide: { img: 'ctx-phones', alt: 'Three phones showing the same app in three different brands', caption: 'Northwind, Clearwater and Saffron: three products, zero component changes.' },
      },
      {
        type: 'section', num: '04', sub: 'Components', title: 'Component states',
        text: 'Buttons, form controls and feedback, each with its variants and states, rendered from the same code under three brand layers.',
        artifacts: [
          { img: 'art-buttons', alt: 'Seven button states in three brands' },
          { img: 'art-forms', alt: 'Input states, checkbox and toggle in three brands' },
          { img: 'art-feedback', alt: 'Status badges, alert, tabs and avatars in three brands' },
        ],
      },
      {
        type: 'section', num: '05', sub: 'Semantic', title: 'Components use role names like border.error',
        text: 'border.error means the same thing whatever ramp a client picks. A partial view of the dark mode set:',
        artifact: { img: 'art-semantic', alt: 'Semantic color tokens in dark mode and the brand tokens they resolve to' },
      },
      {
        type: 'section', num: '06', sub: 'Responsive', title: 'Breakpoints were in the tokens from the start',
        text: 'Size and type tokens resolve per breakpoint from the start. When Instivo needed a mobile stock view mid-project, it consumed the same tokens.',
        artifact: { img: 'art-responsive', alt: 'The same layout resolved for desktop, tablet and mobile' },
      },
    ],
    results: {
      sub: 'In production',
      title: 'In production since 2023',
      text: 'The architecture started on Instivo in 2023, where it absorbed a mobile view that was never in scope. It is now the base of every Vellumwire build, which Afonso implements and hosts.',
      stats: [
        ['4', 'layers: Core, Palette, Brand, Semantic'],
        ['8', 'color ramps built before any client'],
        ['1', 'layer touched to re-theme a project'],
      ],
      links: [['/work/instivo/', 'Read the Instivo case']],
    },
  },
  pt: {
    seoTitle: 'Vellumwire DS | Tokens em 4 camadas | Dhiego Cristofolini',
    description:
      'Case de design system: uma arquitetura de tokens em quatro camadas em que mudar de cliente mexe numa camada só, testada em produção na Instivo.',
    cat: 'Design system · Tokens',
    title: 'Vellumwire DS',
    sub: 'Um sistema de tokens em que cada cliente muda uma camada',
    cover: 'System',
    introTitle: 'Todo cliente novo começava refazendo o que já existia.',
    intro:
      'Cada projeto começava com uma biblioteca de componentes refeita do zero, mesmo quando a lógica não tinha mudado. O custo real aparecia no handoff: nomes novos para interpretar, espaçamentos para conferir, casos de borda sem documentação. Faltava uma camada entre componente e marca.',
    meta: [
      ['Papel', 'Product Designer'],
      ['Tipo', 'Design system interno'],
      ['Origem', 'Instivo, 2023; hoje a base de todo build da Vellumwire'],
      ['Time', 'Afonso, implementação e hospedagem'],
    ],
    blocks: [
      {
        type: 'section', num: '01', sub: 'Arquitetura', title: 'Core, Palette, Brand e Semantic',
        text: 'A estrutura fica fixa. As decisões do cliente moram na Brand, e os componentes só leem a Semantic.',
        artifact: { img: 'art-arch', alt: 'Camadas Core, Palette, Brand e Semantic, cada uma referenciando a de baixo' },
      },
      {
        type: 'section', num: '02', sub: 'Paleta', title: 'Rampas de cor prontas antes de qualquer cliente',
        text: 'Toda rampa segue a mesma estrutura de 25 a 950, então dar a marca de um cliente é mapear as cores dele em rampas que já existem. Sete das oito rampas, uma por papel:',
        artifact: { img: 'art-ramps', alt: 'Sete rampas de cor de 25 a 950, cada uma mapeada para um papel da marca' },
      },
      {
        type: 'section', num: '03', sub: 'Brand', title: 'Os mesmos componentes em três marcas',
        text: 'Um card, um botão, um campo e badges sob três marcas de cliente. Mudam rampa, tipografia e raio, e o código do componente continua o mesmo.',
        artifact: { img: 'art-swap', alt: 'Os mesmos componentes em três marcas fictícias' },
        wide: { img: 'ctx-phones', alt: 'Três celulares mostrando o mesmo app em três marcas diferentes', caption: 'Northwind, Clearwater e Saffron: três produtos, nenhuma mudança nos componentes.' },
      },
      {
        type: 'section', num: '04', sub: 'Componentes', title: 'Estados dos componentes',
        text: 'Botões, controles de formulário e feedback, cada um com suas variações e estados, gerados pelo mesmo código sob três camadas de marca.',
        artifacts: [
          { img: 'art-buttons', alt: 'Sete estados de botão em três marcas' },
          { img: 'art-forms', alt: 'Estados de campo, checkbox e toggle em três marcas' },
          { img: 'art-feedback', alt: 'Badges de status, alerta, abas e avatares em três marcas' },
        ],
      },
      {
        type: 'section', num: '05', sub: 'Semantic', title: 'Componentes usam nomes de papel, como border.error',
        text: 'border.error significa a mesma coisa qualquer que seja a rampa do cliente. Uma visão parcial do conjunto no modo escuro:',
        artifact: { img: 'art-semantic', alt: 'Tokens semânticos de cor no modo escuro e os tokens de marca para onde resolvem' },
      },
      {
        type: 'section', num: '06', sub: 'Responsivo', title: 'Os breakpoints estavam nos tokens desde o início',
        text: 'Tokens de tamanho e tipo resolvem por breakpoint desde o início. Quando a Instivo precisou de uma tela mobile de estoque no meio do projeto, ela usou os mesmos tokens.',
        artifact: { img: 'art-responsive', alt: 'O mesmo layout resolvido para desktop, tablet e mobile' },
      },
    ],
    results: {
      sub: 'Em produção',
      title: 'Em produção desde 2023',
      text: 'A arquitetura começou na Instivo em 2023, onde absorveu uma tela mobile que nunca esteve no escopo. Hoje é a base de todo build da Vellumwire, que o Afonso implementa e hospeda.',
      stats: [
        ['4', 'camadas: Core, Palette, Brand, Semantic'],
        ['8', 'rampas de cor prontas antes de qualquer cliente'],
        ['1', 'camada alterada para mudar a marca de um projeto'],
      ],
      links: [['/pt-br/work/instivo/', 'Ler o case da Instivo']],
    },
  },
};
