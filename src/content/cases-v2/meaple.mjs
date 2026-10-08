// Meaple case. Sources: the existing case content and Ensight documentation
// (personas, 13-product competitive map, targets, accounts, Momentum,
// context states), plus Dhiego's corrections (Oct 2026): the comanda was not
// in the initial scope and came in later; during the pandemic the app
// pivoted to a website to start earning before becoming an app again.
// Scenes generated in Magnific (Seedream 5 Pro) with the real Figma screens
// composited in.
export default {
  slug: 'meaple',
  hero: { src: '/assets/img/case/meaple/hero.webp' },
  en: {
    seoTitle: 'Meaple | Events, social and payments in one app | Dhiego Cristofolini',
    description:
      'Product design case: Meaple unified event discovery, social coordination, tickets and in-event payment for nights out in Brazil, then pivoted to web during the pandemic.',
    cat: 'Social · Events · Product design',
    title: 'Meaple',
    sub: 'Five apps for one Friday night',
    cover: 'Meaple',
    introTitle: 'One product for the whole night out.',
    intro:
      'Ensight set out to own the full journey of a night out in Brazil, before, during and after, in one product: discovery, social coordination, ticket sales and payment inside the event. I joined with a blank slate, no brief, no wireframes, no research, and defined what the product should be before anyone touched a screen.',
    meta: [
      ['Role', 'Design Lead'],
      ['Team', 'Solo design, 2 engineers, 2 co-founders'],
      ['Client', 'Ensight · 2020'],
      ['Platform', 'iOS 10+ · Android 4.4+, then web'],
    ],
    blocks: [
      { type: 'wide', img: 'ctx-rooftop', alt: 'Friends on a rooftop at night checking an event page on Meaple', caption: 'Friday night, one app: where to go, who is going, and the ticket.' },
      {
        type: 'section', num: '01', sub: 'The problem', title: 'Five apps for one Friday night.',
        text: 'Sympla sold tickets. WhatsApp moved logistics. Facebook had the social graph but had abandoned events. Instagram had discovery with no way to act. PicPay moved money with no idea what it was for.',
        artifact: { img: 'art-competitors', alt: 'Competitive map of 13 products across event discovery, social coordination, payment and location' },
      },
      {
        type: 'section', num: '02', sub: 'Research', title: 'Different people, the same fragmentation.',
        text: 'I interviewed users between 19 and 30, event creators and venue owners. Nobody asked for one app, because nobody imagined it possible. That third column became the product thesis.',
        artifact: { img: 'art-research', alt: 'Three personas with their days, and what users said, needed and did not know they needed' },
      },
      {
        type: 'section', layout: 'split', num: '03', sub: 'Business', title: 'Revenue from day one, or no product.',
        text: 'Before the pandemic, events moved around R$250 billion a year in Brazil, about 4.3% of GDP (Abrafesta; Abeoc/Sebrae). Ensight set the targets before design started, and they ruled out a slow-burn social network.',
        stats: [
          ['150k', 'monthly active users'],
          ['1.5M', 'downloads'],
          ['R$2.00', 'CAC ceiling per user'],
          ['R$2.70', 'revenue per user per month'],
        ],
      },
      {
        type: 'section', layout: 'split', num: '04', sub: 'Decision', title: 'Producers first.',
        text: 'My first instinct was consumers first. That is wrong for a marketplace: one producer brings their whole audience, one consumer brings only themselves. Producers got ticket sales, analytics and a page before the audience existed.',
        portrait: { img: 'ctx-producer', alt: 'A producer in an empty venue before doors open, checking ticket sales on the Meaple dashboard', caption: 'The producer dashboard: sales, revenue and tonight’s numbers before doors open.' },
      },
      {
        type: 'section', num: '05', sub: 'Decision', title: 'Three accounts, hard boundaries.',
        text: 'Friends, individual professionals and companies need different permissions. A two-tier model confused them, so it went.',
        artifact: { img: 'art-accounts', alt: 'Personal, Professional and Company account tiers and how they relate' },
      },
      {
        type: 'section', num: '06', sub: 'Decision', title: 'Momentum: discovery that ranks trust.',
        text: 'Momentum ranked the Explore feed on five inputs. Producer credibility weighed most: a new account ranked below a producer with ten well-rated events.',
        artifact: { img: 'art-momentum', alt: 'The five Momentum inputs feeding the Explore ranking' },
        wide: { img: 'board-journey', alt: 'Five Meaple screens in order: Explore, event page, checkout, ticket and bar tab', caption: 'One journey: discover, decide, pay, get in, order at the bar.' },
      },
      {
        type: 'section', layout: 'split', reverse: true, num: '07', sub: 'Decision', title: 'The comanda came later.',
        text: 'Ordering and paying at the bar inside the app was not in the initial scope. It came in later in the MVP: consumption that producers could capture instead of losing it to cash and card machines.',
        pair: [
          { img: 'ctx-bar', alt: 'The Meaple bar tab open at a bar counter next to a caipirinha', caption: 'The tab: running total, tip and split with the crew.' },
          { img: 'ctx-crowd', alt: 'A Meaple QR ticket held up in a concert crowd', caption: 'The ticket: a QR code ready at the door.' },
        ],
      },
      {
        type: 'section', num: '08', sub: 'Design', title: 'Designed for the worst moment.',
        text: 'A loud venue, one hand, a drink, interruptions. Every rule of the interface came from that user.',
        artifact: { img: 'art-context', alt: 'Five context states and the interface rules that came from them' },
      },
      {
        type: 'boards', num: '09', sub: 'Design system', title: '25 screens, one system.',
        text: 'Discovery, the social graph, transactions, the comanda and the producer side, designed end to end with the brand.',
        items: [
          { label: 'Discover', img: 'board-discover', caption: 'Map, Momentum, event pages and who is going', alt: 'Five Meaple discovery screens: map, Momentum feed, event page, live event and who is going' },
          { label: 'Social', img: 'board-social', caption: 'Stories, feed, group chat, people and profiles', alt: 'Five Meaple social screens: story, feed, chat, people and profile' },
          { label: 'Order & pay', img: 'board-pay', caption: 'Menu, item, tab, payment and calendar', alt: 'Five Meaple transaction screens: menu, item, tab, payment success and calendar' },
          { label: 'Producer', img: 'board-producer', caption: 'Onboarding fork, event creation, dashboard, requests', alt: 'Five Meaple producer screens: onboarding, create event, dashboard, requests and profile' },
        ],
      },
    ],
    results: {
      sub: 'Outcome',
      title: 'The pandemic closed the market. Meaple pivoted to web.',
      text: 'Meaple launched as an app. When COVID-19 made gatherings illegal, it pivoted to a website to start earning, with the plan to return as an app. It is live at meaple.com.br.',
      stats: [
        ['350k', 'events canceled in Brazil in 2020'],
        ['98%', 'of the events sector hit'],
        ['R$230B', 'lost across 2020 and 2021'],
      ],
      source: 'Sources: Sebrae; Abrape; Abrafesta via G1; Abeoc/Sebrae.',
      links: [
        ['https://meaple.com.br', 'meaple.com.br'],
        ['/work/meaple/documentation/', 'Product documentation'],
      ],
    },
  },
  pt: {
    seoTitle: 'Meaple | Eventos, social e pagamento num só app | Dhiego Cristofolini',
    description:
      'Case de product design: o Meaple unificou descoberta de eventos, coordenação social, ingressos e pagamento dentro do evento no Brasil, e pivotou para web na pandemia.',
    cat: 'Social · Eventos · Product design',
    title: 'Meaple',
    sub: 'Cinco apps para uma sexta à noite',
    cover: 'Meaple',
    introTitle: 'Um produto para a noite inteira.',
    intro:
      'A Ensight queria dominar a jornada completa de uma noite no Brasil, antes, durante e depois, num único produto: descoberta, coordenação social, venda de ingressos e pagamento dentro do evento. Entrei do zero, sem briefing, sem wireframe, sem pesquisa, e defini o que o produto deveria ser antes de qualquer tela.',
    meta: [
      ['Papel', 'Design Lead'],
      ['Time', 'Design solo, 2 devs, 2 co-fundadores'],
      ['Cliente', 'Ensight · 2020'],
      ['Plataforma', 'iOS 10+ · Android 4.4+, depois web'],
    ],
    blocks: [
      { type: 'wide', img: 'ctx-rooftop', alt: 'Amigos num rooftop à noite vendo uma página de evento no Meaple', caption: 'Sexta à noite, um app: aonde ir, quem vai e o ingresso.' },
      {
        type: 'section', num: '01', sub: 'O problema', title: 'Cinco apps para uma sexta à noite.',
        text: 'O Sympla vendia ingresso. O WhatsApp cuidava da logística. O Facebook tinha o grafo social, mas tinha abandonado os eventos. O Instagram tinha descoberta sem como agir. O PicPay movia dinheiro sem saber para quê.',
        artifact: { img: 'art-competitors', alt: 'Mapa competitivo de 13 produtos em descoberta, coordenação social, pagamento e localização' },
      },
      {
        type: 'section', num: '02', sub: 'Pesquisa', title: 'Pessoas diferentes, a mesma fragmentação.',
        text: 'Entrevistei usuários de 19 a 30 anos, criadores de eventos e donos de casas. Ninguém pedia um app só, porque ninguém imaginava que fosse possível. Essa terceira coluna virou a tese do produto.',
        artifact: { img: 'art-research', alt: 'Três personas com seus dias, e o que os usuários diziam, precisavam e não sabiam que precisavam' },
      },
      {
        type: 'section', layout: 'split', num: '03', sub: 'Negócio', title: 'Receita desde o primeiro dia, ou nada.',
        text: 'Antes da pandemia, eventos movimentavam cerca de R$250 bilhões por ano no Brasil, perto de 4,3% do PIB (Abrafesta; Abeoc/Sebrae). A Ensight definiu as metas antes do design começar, e elas descartavam uma rede social de queima lenta.',
        stats: [
          ['150 mil', 'usuários ativos por mês'],
          ['1,5 mi', 'downloads'],
          ['R$2,00', 'teto de CAC por usuário'],
          ['R$2,70', 'de receita por usuário por mês'],
        ],
      },
      {
        type: 'section', layout: 'split', num: '04', sub: 'Decisão', title: 'Produtores primeiro.',
        text: 'Meu primeiro instinto foi começar pelo consumidor. Isso está errado num marketplace: um produtor traz toda a audiência dele, um consumidor traz só a si mesmo. Os produtores ganharam venda de ingresso, analytics e página antes de a audiência existir.',
        portrait: { img: 'ctx-producer', alt: 'Um produtor numa casa vazia antes de abrir as portas, vendo as vendas no painel do Meaple', caption: 'O painel do produtor: vendas, receita e os números da noite antes de abrir as portas.' },
      },
      {
        type: 'section', num: '05', sub: 'Decisão', title: 'Três contas, fronteiras rígidas.',
        text: 'Amigos, profissionais individuais e empresas precisam de permissões diferentes. Um modelo de dois níveis confundia tudo, então saiu.',
        artifact: { img: 'art-accounts', alt: 'Os níveis de conta Pessoal, Profissional e Empresa e como se relacionam' },
      },
      {
        type: 'section', num: '06', sub: 'Decisão', title: 'Momentum: descoberta que ranqueia confiança.',
        text: 'O Momentum ranqueava o Explorar com cinco variáveis. A credibilidade do produtor pesava mais: uma conta nova ficava abaixo de um produtor com dez eventos bem avaliados.',
        artifact: { img: 'art-momentum', alt: 'As cinco variáveis do Momentum alimentando o ranking do Explorar' },
        wide: { img: 'board-journey', alt: 'Cinco telas do Meaple em ordem: Explorar, página do evento, checkout, ingresso e comanda', caption: 'Uma jornada: descobrir, decidir, pagar, entrar, pedir no bar.' },
      },
      {
        type: 'section', layout: 'split', reverse: true, num: '07', sub: 'Decisão', title: 'A comanda veio depois.',
        text: 'Pedir e pagar no bar pelo app não estava no escopo inicial. Entrou depois, ainda no MVP: consumo que o produtor podia capturar em vez de perder para dinheiro e maquininha.',
        pair: [
          { img: 'ctx-bar', alt: 'A comanda do Meaple aberta no balcão do bar ao lado de uma caipirinha', caption: 'A comanda: total corrente, gorjeta e divisão com a galera.' },
          { img: 'ctx-crowd', alt: 'Um ingresso QR do Meaple erguido no meio do público de um show', caption: 'O ingresso: QR pronto na porta.' },
        ],
      },
      {
        type: 'section', num: '08', sub: 'Design', title: 'Desenhado para o pior momento.',
        text: 'Lugar barulhento, uma mão, um drink, interrupções. Toda regra da interface veio desse usuário.',
        artifact: { img: 'art-context', alt: 'Cinco estados de contexto e as regras de interface que vieram deles' },
      },
      {
        type: 'boards', num: '09', sub: 'Design system', title: '25 telas, um sistema.',
        text: 'Descoberta, grafo social, transações, comanda e o lado do produtor, desenhados de ponta a ponta junto com a marca.',
        items: [
          { label: 'Descobrir', img: 'board-discover', caption: 'Mapa, Momentum, páginas de evento e quem vai', alt: 'Cinco telas de descoberta do Meaple: mapa, Momentum, página de evento, evento ao vivo e quem vai' },
          { label: 'Social', img: 'board-social', caption: 'Stories, feed, chat do grupo, pessoas e perfis', alt: 'Cinco telas sociais do Meaple: story, feed, chat, pessoas e perfil' },
          { label: 'Pedir e pagar', img: 'board-pay', caption: 'Cardápio, item, comanda, pagamento e calendário', alt: 'Cinco telas de transação do Meaple: cardápio, item, comanda, pagamento aprovado e calendário' },
          { label: 'Produtor', img: 'board-producer', caption: 'Bifurcação do onboarding, criação de evento, painel, solicitações', alt: 'Cinco telas do produtor no Meaple: onboarding, criar evento, painel, solicitações e perfil' },
        ],
      },
    ],
    results: {
      sub: 'Desfecho',
      title: 'A pandemia fechou o mercado. O Meaple pivotou para web.',
      text: 'O Meaple nasceu como app. Quando a COVID-19 tornou aglomerações ilegais, pivotou para um site para começar a gerar receita, com o plano de voltar a ser app. Está no ar em meaple.com.br.',
      stats: [
        ['350 mil', 'eventos cancelados no Brasil em 2020'],
        ['98%', 'do setor de eventos atingido'],
        ['R$230 bi', 'perdidos entre 2020 e 2021'],
      ],
      source: 'Fontes: Sebrae; Abrape; Abrafesta via G1; Abeoc/Sebrae.',
      links: [
        ['https://meaple.com.br', 'meaple.com.br'],
        ['/work/meaple/documentation/', 'Documentação do produto'],
      ],
    },
  },
};
