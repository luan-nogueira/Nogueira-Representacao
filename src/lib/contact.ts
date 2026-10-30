export const CONTACT = {
  name: 'Angelo Nogueira',
  company: 'Nogueira Representações',
  phoneDisplay: '(22) 99914-1909',
  phoneHref: 'tel:+5522999141909',
  whatsapp: 'https://wa.me/5522999141909',
  email: 'nogueira.representacao@gmail.com',
  emailHref: 'mailto:nogueira.representacao@gmail.com',
  instagram: 'https://www.instagram.com/nogueira.rep/',
  instagramHandle: '@nogueira.rep',
  location: 'Campos dos Goytacazes — RJ',
}

export const waLink = (text?: string) =>
  text ? `${CONTACT.whatsapp}?text=${encodeURIComponent(text)}` : CONTACT.whatsapp

export const WA_PARTNERSHIP = waLink(
  'Olá! Conheci a Nogueira Representações pelo site e quero conversar sobre uma parceria.'
)
export const WA_HELLO = waLink('Olá! Vim pelo site da Nogueira Representações.')
