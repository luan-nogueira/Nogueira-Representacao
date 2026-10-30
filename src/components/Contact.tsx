import { ArrowUpRight, Mail, MapPin, Phone } from 'lucide-react'
import { CONTACT, WA_HELLO } from '../lib/contact'
import { InstagramIcon, WhatsAppIcon } from './Icons'
import { Eyebrow, Reveal, SplitHeading } from './ui'

const CHANNELS = [
  { label: 'WhatsApp', value: CONTACT.phoneDisplay, href: WA_HELLO, icon: WhatsAppIcon, ext: true, primary: true },
  { label: 'Telefone', value: CONTACT.phoneDisplay, href: CONTACT.phoneHref, icon: Phone },
  { label: 'E-mail', value: CONTACT.email, href: CONTACT.emailHref, icon: Mail },
  { label: 'Instagram', value: CONTACT.instagramHandle, href: CONTACT.instagram, icon: InstagramIcon, ext: true },
]

export default function Contact() {
  return (
    <section id="contato" className="grain relative overflow-hidden bg-navy py-20 md:py-28" aria-labelledby="contato-title">
      <div className="absolute inset-0 bg-[radial-gradient(70%_60%_at_80%_20%,rgba(42,79,143,0.8),transparent_70%),radial-gradient(60%_60%_at_0%_100%,rgba(9,9,9,0.9),transparent_70%)]" />
      <img
        src="/assets/art-bebidas.webp"
        alt=""
        aria-hidden="true"
        loading="lazy"
        className="pointer-events-none absolute -right-24 top-10 hidden w-[520px] rotate-12 opacity-30 mix-blend-screen lg:block"
      />
      <div className="container-x relative">
        <Eyebrow className="!text-white/70">Contato</Eyebrow>
        <SplitHeading
            id="contato-title"
          lines={['Grandes negócios', <>começam com uma <span className="serif-accent">conversa.</span></>]}
          className="display mt-8 max-w-[1000px] text-[clamp(37px,5.46vw,94px)]"
        />
        <Reveal delay={0.15}>
          <p className="mt-8 max-w-[520px] text-[16px] leading-relaxed text-white/75">
            Entre em contato com Angelo Nogueira e conheça as oportunidades de representação comercial.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1.45fr_1fr]">
          {CHANNELS.map((c, i) => (
            <Reveal key={c.label} delay={i * 0.07} y={30}>
              <a
                href={c.href}
                {...(c.ext ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className={`group relative flex h-full min-h-[130px] sm:min-h-[170px] flex-col justify-between overflow-hidden rounded-[28px] border p-7 transition-colors duration-500 ${
                  c.primary ? 'border-white bg-white text-ink' : 'border-white/20 bg-white/[0.04] text-white backdrop-blur-md'
                }`}
                aria-label={`${c.label}: ${c.value}`}
              >
                <span
                  className={`absolute inset-0 origin-bottom scale-y-0 transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-y-100 ${
                    c.primary ? 'bg-gold' : 'bg-white'
                  }`}
                />
                <div className="relative flex items-center justify-between">
                  <c.icon className={`h-6 w-6 transition-colors duration-500 ${c.primary ? '' : 'group-hover:text-ink'}`} />
                  <ArrowUpRight className={`h-5 w-5 transition-all duration-500 group-hover:rotate-45 ${c.primary ? '' : 'group-hover:text-ink'}`} />
                </div>
                <div className={`relative transition-colors duration-500 ${c.primary ? '' : 'group-hover:text-ink'}`}>
                  <p className="text-[11px] uppercase tracking-mega opacity-60">{c.label}</p>
                  <p className="mt-2 text-[17px] font-semibold tracking-tight [overflow-wrap:anywhere]">{c.value}</p>
                </div>
              </a>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <dl className="mt-12 grid gap-6 border-t border-white/15 pt-10 text-[15px] sm:grid-cols-3">
            <div>
              <dt className="text-[11px] uppercase tracking-mega text-white/50">Responsável</dt>
              <dd className="mt-2 font-semibold">{CONTACT.name}</dd>
            </div>
            <div>
              <dt className="text-[11px] uppercase tracking-mega text-white/50">Empresa</dt>
              <dd className="mt-2 font-semibold">{CONTACT.company}</dd>
            </div>
            <div>
              <dt className="text-[11px] uppercase tracking-mega text-white/50">Localização</dt>
              <dd className="mt-2 flex items-center gap-2 font-semibold">
                <MapPin className="h-4 w-4 text-gold" /> {CONTACT.location}
              </dd>
            </div>
          </dl>
        </Reveal>
      </div>
    </section>
  )
}
