import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { scrollToId } from '../lib/smoothScroll'
import { WA_HELLO } from '../lib/contact'
import { WhatsAppIcon } from './Icons'

const LINKS = [
  { id: 'piracanjuba', label: 'Piracanjuba' },
  { id: 'produtos', label: 'Produtos' },
  { id: 'whey', label: 'Whey Protein' },
  { id: 'empresa', label: 'A Nogueira' },
  { id: 'regiao', label: 'Região' },
  { id: 'contato', label: 'Contato' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
  }, [open])

  const go = (id: string) => {
    setOpen(false)
    scrollToId(id)
  }

  return (
    <>
      <motion.header
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-700 ${
          scrolled ? 'bg-ink/70 backdrop-blur-xl border-b border-white/[0.06]' : 'bg-transparent'
        }`}
      >
        <nav className="container-x flex h-[72px] items-center justify-between lg:h-[84px]" aria-label="Principal">
          <a
            href="#topo"
            onClick={(e) => {
              e.preventDefault()
              go('topo')
            }}
            className="flex items-center gap-3"
            aria-label="Nogueira Representações — início"
          >
            <img src="/assets/nr-white.webp" alt="Nogueira Representações" width={400} height={484} className="h-11 w-auto lg:h-12" />
          </a>

          <ul className="hidden items-center gap-9 lg:flex">
            {LINKS.map((l) => (
              <li key={l.id}>
                <a
                  href={`#${l.id}`}
                  onClick={(e) => {
                    e.preventDefault()
                    go(l.id)
                  }}
                  className="group relative text-[13px] tracking-wide text-white/70 transition-colors hover:text-white"
                >
                  {l.label}
                  <span className="absolute -bottom-1.5 left-0 h-px w-full origin-left scale-x-0 bg-gold transition-transform duration-500 group-hover:scale-x-100" />
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <a
              href={WA_HELLO}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-[13px] transition-colors hover:border-gold hover:text-gold sm:inline-flex"
            >
              <WhatsAppIcon className="h-4 w-4" /> Falar com Angelo
            </a>
            <button
              onClick={() => setOpen(true)}
              className="grid h-11 w-11 place-items-center rounded-full border border-white/15 lg:hidden"
              aria-label="Abrir menu"
              aria-expanded={open}
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[60] flex flex-col bg-ink/95 backdrop-blur-2xl lg:hidden"
            initial={{ clipPath: 'circle(0% at 100% 0%)' }}
            animate={{ clipPath: 'circle(150% at 100% 0%)' }}
            exit={{ clipPath: 'circle(0% at 100% 0%)' }}
            transition={{ duration: 0.7, ease: [0.65, 0, 0.35, 1] }}
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
          >
            <div className="container-x flex h-[72px] items-center justify-between">
              <img src="/assets/nr-white.webp" alt="" className="h-11 w-auto" />
              <button onClick={() => setOpen(false)} className="grid h-11 w-11 place-items-center rounded-full border border-white/15" aria-label="Fechar menu">
                <X className="h-5 w-5" />
              </button>
            </div>
            <ul className="container-x mt-10 flex flex-1 flex-col gap-2">
              {LINKS.map((l, i) => (
                <motion.li key={l.id} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.06 }}>
                  <a
                    href={`#${l.id}`}
                    onClick={(e) => {
                      e.preventDefault()
                      go(l.id)
                    }}
                    className="flex items-baseline justify-between border-b border-white/10 py-4 text-3xl font-semibold tracking-tight"
                  >
                    {l.label}
                    <span className="text-xs text-mist">0{i + 1}</span>
                  </a>
                </motion.li>
              ))}
            </ul>
            <div className="container-x pb-10">
              <a href={WA_HELLO} target="_blank" rel="noopener noreferrer" className="btn btn-primary w-full">
                <WhatsAppIcon /> Fale com Angelo Nogueira
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
