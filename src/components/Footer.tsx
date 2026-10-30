import { Mail, MapPin } from 'lucide-react'
import { CONTACT, WA_HELLO } from '../lib/contact'
import { scrollToId } from '../lib/smoothScroll'
import { InstagramIcon, WhatsAppIcon } from './Icons'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="relative overflow-hidden bg-ink pt-20">
      <div className="container-x">
        <div className="grid gap-14 border-b border-white/10 pb-16 md:grid-cols-12">
          <div className="md:col-span-5">
            <img src="/assets/nr-white.webp" alt="Nogueira Representações" width={400} height={484} loading="lazy" className="h-20 w-auto" />
            <p className="mt-6 text-[clamp(20px,1.71vw,25px)] font-semibold leading-tight tracking-tight">
              Marcas que fazem <span className="serif-accent font-normal text-gold">a diferença.</span>
            </p>
          </div>
          <div className="md:col-span-3">
            <p className="text-[11px] uppercase tracking-mega text-mist">Navegação</p>
            <ul className="mt-6 space-y-3 text-[15px] text-white/70">
              {[
                ['marcas', 'Marcas'],
                ['piracanjuba', 'Piracanjuba'],
                ['whey', 'Whey Protein'],
                ['tangara', 'Tangará Química'],
                ['petyan', 'Petyan'],
                ['empresa', 'A Nogueira'],
                ['contato', 'Contato'],
              ].map(([id, l]) => (
                <li key={id}>
                  <a href={`#${id}`} onClick={(e) => { e.preventDefault(); scrollToId(id) }} className="transition-colors hover:text-white">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-4">
            <p className="text-[11px] uppercase tracking-mega text-mist">Contato</p>
            <ul className="mt-6 space-y-4 text-[15px] text-white/80">
              <li>
                <a href={CONTACT.instagram} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-gold">
                  <InstagramIcon className="h-4 w-4" /> {CONTACT.instagramHandle}
                </a>
              </li>
              <li>
                <a href={WA_HELLO} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-gold">
                  <WhatsAppIcon className="h-4 w-4" /> {CONTACT.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={CONTACT.emailHref} className="flex items-center gap-3 break-all hover:text-gold">
                  <Mail className="h-4 w-4 shrink-0" /> {CONTACT.email}
                </a>
              </li>
              <li className="flex items-center gap-3 text-white/60">
                <MapPin className="h-4 w-4" /> {CONTACT.location}
              </li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col gap-3 py-8 text-[12px] text-white/40 md:flex-row md:items-center md:justify-between">
          <p>© {year} Nogueira Representações. Todos os direitos reservados.</p>
          <p>Piracanjuba, Tangará Química, Flop´s, Petyan, Supradely e Spaguetto pertencem aos respectivos titulares.</p>
        </div>
      </div>
      <div
        className="pointer-events-none select-none whitespace-nowrap text-center font-semibold leading-[0.8] tracking-[-0.06em] text-white/[0.04]"
        style={{ fontSize: '17vw' }}
        aria-hidden="true"
      >
        NOGUEIRA
      </div>
    </footer>
  )
}
