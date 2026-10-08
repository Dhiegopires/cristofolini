// Contact = SITE/template/dark/contact.html with Dhiego's content.
// The template's map is dropped (no studio to visit) and its short footer is
// swapped for the index footer so every page shares one footer. The form
// keeps the template markup but is submitted by addons.js to /contact.php
// (the template's own handler posts to a relative URL and expects a
// different JSON shape).
import { ROUTES, SITE } from '../data.mjs';
import { loadTemplate, fillChrome, html, esc } from './from-template.mjs';

const COPY = {
  en: {
    title: 'Contact | Dhiego Cristofolini | Senior Product Designer',
    description: "Available for full-time senior product design roles in SaaS, B2B, and B2B2C. Remote-ready. Based in Curitiba, Brazil. Let's talk.",
    eyebrow: 'Contact',
    h1: "Let's talk.",
    lead: 'Open to full-time senior product design roles in SaaS, B2B, and B2B2C. Remote-ready, based in Curitiba, Brazil.',
    infoTitle: 'Hiring or building something?',
    infoSub: 'Reach me directly',
    infoText: 'Tell me about the role, the team, and what you are building. I usually reply within 24 hours.',
    email: 'Email',
    based: 'Based in',
    basedVal: 'Curitiba, Brazil · GMT−3 · Remote',
    elsewhere: 'Elsewhere',
    formTitle: 'Send a message',
    name: 'Name',
    namePh: 'Your name',
    mail: 'Email',
    mailPh: 'you@company.com',
    msg: 'Message',
    msgPh: "Tell me about the role, the team, and what you're building.",
    send: 'Send message',
    upHiring: 'Portfolio',
    upCareer: 'See selected work',
  },
  pt: {
    title: 'Contato | Dhiego Cristofolini | Senior Product Designer',
    description: 'Aberto a posições sênior de product design em tempo integral em SaaS, B2B e B2B2C. Remoto, baseado em Curitiba, Brasil. Vamos conversar.',
    eyebrow: 'Contato',
    h1: 'Vamos conversar.',
    lead: 'Aberto a posições sênior de product design em tempo integral em SaaS, B2B e B2B2C. Pronto para trabalho remoto, baseado em Curitiba, Brasil.',
    infoTitle: 'Contratando ou construindo algo?',
    infoSub: 'Fale direto comigo',
    infoText: 'Conte sobre a posição, o time e o que vocês estão construindo. Costumo responder em até 24 horas.',
    email: 'Email',
    based: 'Onde',
    basedVal: 'Curitiba, Brasil · GMT−3 · Remoto',
    elsewhere: 'Também em',
    formTitle: 'Envie uma mensagem',
    name: 'Nome',
    namePh: 'Seu nome',
    mail: 'Email',
    mailPh: 'voce@empresa.com',
    msg: 'Mensagem',
    msgPh: 'Conte sobre a posição, o time e o que vocês estão construindo.',
    send: 'Enviar mensagem',
    upHiring: 'Portfólio',
    upCareer: 'Ver trabalhos',
  },
};

export const contactPage = (lang) => {
  const $ = loadTemplate('contact.html');
  const c = COPY[lang];
  const r = ROUTES[lang];
  const pt = lang === 'pt';

  // Shared footer: take index.html's, which fillChrome knows how to fill.
  const idx = loadTemplate('index.html');
  $('main footer').replaceWith(idx.html(idx('footer.footer').first()));

  fillChrome($, {
    lang,
    title: c.title,
    description: c.description,
    path: r.contact,
    alt: ROUTES[pt ? 'en' : 'pt'].contact,
  });

  const hero = $('.header-hero .contenet-hero');
  hero.find('h5').text(c.eyebrow);
  hero.find('h1').text(c.h1);
  hero.append(`<p>${esc(c.lead)}</p>`);

  $('.root-contact > .container-fluid').remove(); // map

  const info = $('.box-info-contact');
  info.find('h3').text(c.infoTitle);
  info.find('h5').text(c.infoSub);
  info.find('p').text(c.infoText);
  info.find('ul').html(`
    <li><span>${c.email}</span><a href="mailto:${SITE.email}">${SITE.email}</a></li>
    <li><span>${c.based}</span><p class="contact-plain">${c.basedVal}</p></li>
    <li><span>${c.elsewhere}</span><a href="https://www.linkedin.com/in/dhiego-cristofolini-77b964150/" target="_blank" rel="noopener">LinkedIn</a></li>`);

  const box = $('.form-box');
  box.find('h3').text(c.formTitle);
  box.find('form').replaceWith(`
    <form id="site-contact" class="form" method="post" action="/contact.php" novalidate data-sending="${pt ? 'Enviando…' : 'Sending…'}"
      data-ok="${esc(pt ? 'Mensagem recebida. Respondo em até 24 horas.' : "Message received. I'll get back to you within 24 hours.")}"
      data-fail="${esc(pt ? `Não foi possível enviar agora. Escreva direto para ${SITE.email}.` : `Couldn't send right now. Email me directly at ${SITE.email}.`)}"
      data-err-name="${esc(pt ? 'Informe seu nome.' : 'Please enter your name.')}"
      data-err-email="${esc(pt ? 'Informe um email válido.' : 'Please enter a valid email.')}"
      data-err-message="${esc(pt ? 'Escreva uma mensagem.' : 'Please write a message.')}">
      <div class="messages" role="status" aria-live="polite"></div>
      <input type="hidden" name="type" value="contact">
      <input type="hidden" name="lang" value="${lang}">
      <div class="hp-field" aria-hidden="true">
        <label for="form_company">Company</label>
        <input id="form_company" type="text" name="company" tabindex="-1" autocomplete="off">
      </div>
      <div class="input__wrap controls">
        <div class="form-group">
          <div class="entry">
            <label for="form_name">${c.name}</label>
            <input id="form_name" type="text" name="name" placeholder="${esc(c.namePh)}" autocomplete="name" required aria-describedby="form_name_err">
          </div>
          <div class="help-block with-errors" id="form_name_err"></div>
        </div>
        <div class="form-group">
          <div class="entry">
            <label for="form_email">${c.mail}</label>
            <input id="form_email" type="email" name="email" placeholder="${esc(c.mailPh)}" autocomplete="email" required aria-describedby="form_email_err">
          </div>
          <div class="help-block with-errors" id="form_email_err"></div>
        </div>
        <div class="form-group">
          <div class="entry">
            <label for="form_message">${c.msg}</label>
            <textarea id="form_message" class="form-control" name="message" placeholder="${esc(c.msgPh)}" required aria-describedby="form_message_err"></textarea>
          </div>
          <div class="help-block with-errors" id="form_message_err"></div>
        </div>
        <div class="image-zoom" data-dsn="parallax">
          <button type="submit">${c.send}</button>
        </div>
      </div>
    </form>`);

  const up = $('.contact-up');
  up.find('a').attr('href', r.work).removeClass('effect-ajax');
  up.find('.hiring').text(c.upHiring);
  up.find('.career').text(c.upCareer);

  return html($);
};
