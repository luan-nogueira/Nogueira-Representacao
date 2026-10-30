import { useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react'
import { PIRA_GROUPS } from '../data/piracanjuba'
import { waLink } from '../lib/contact'
import { Eyebrow, Reveal, SplitHeading } from './ui'

const MAX_ITEMS = 4

export default function PiracanjubaCatalog() {
  const [groupId, setGroupId] = useState(PIRA_GROUPS[0].id)
  const group = PIRA_GROUPS.find((g) => g.id === groupId)!
  const rail = useRef<HTMLDivElement>(null)

  const scrollRail = (dir: 1 | -1) => {
    const el = rail.current
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: 'smooth' })
  }

  const pick = (id: string) => {
    setGroupId(id)
    rail.current?.scrollTo({ left: 0 })
  }

  return (
    <section id="produtos" className="relative overflow-hidden bg-ink py-14 md:py-16" aria-labelledby="prod-title">
      <div className="absolute inset-0 bg-[radial-gradient(60%_50%_at_20%_20%,rgba(16,43,89,0.45),transparent_70%)]" />

      <div className="container-x relative">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <Eyebrow>Portfólio Piracanjuba</Eyebrow>
            <SplitHeading
              id="prod-title"
              lines={['Do café da manhã', <span className="serif-accent text-gradient-milk">à cozinha profissional.</span>]}
              className="display mt-5 text-[clamp(30px,3.2vw,50px)]"
            />
          </div>
          <Reveal delay={0.1}>
            <p className="max-w-[420px] text-[15px] leading-relaxed text-white/60">
              Linhas do catálogo oficial Piracanjuba. Consulte com Angelo Nogueira a disponibilidade para o seu
              estabelecimento.
            </p>
          </Reveal>
        </div>

        <div className="mt-8 flex items-center justify-between gap-4">
          <div className="inline-flex rounded-full border border-white/10 bg-white/[0.03] p-1" role="tablist" aria-label="Linhas Piracanjuba">
            {PIRA_GROUPS.map((g) => (
              <button
                key={g.id}
                role="tab"
                aria-selected={g.id === groupId}
                onClick={() => pick(g.id)}
                className={`relative rounded-full px-4 py-2.5 text-[13px] transition-colors sm:px-6 ${
                  g.id === groupId ? 'text-ink' : 'text-white/70 hover:text-white'
                }`}
              >
                {g.id === groupId && (
                  <motion.span layoutId="pira-group" className="absolute inset-0 rounded-full bg-white" transition={{ type: 'spring', stiffness: 300, damping: 30 }} />
                )}
                <span className="relative">
                  {g.label} <span className="tabular-nums opacity-50">{g.lines.length}</span>
                </span>
              </button>
            ))}
          </div>
          <div className="hidden shrink-0 gap-2 md:flex">
            <button onClick={() => scrollRail(-1)} aria-label="Anterior" className="grid h-11 w-11 place-items-center rounded-full border border-white/15 transition-colors hover:border-gold hover:text-gold">
              <ArrowLeft className="h-4 w-4" />
            </button>
            <button onClick={() => scrollRail(1)} aria-label="Próximo" className="grid h-11 w-11 place-items-center rounded-full border border-white/15 transition-colors hover:border-gold hover:text-gold">
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={group.id}
          ref={rail}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="relative mt-6 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-5 px-5 pb-2 [scrollbar-width:none] sm:scroll-px-8 sm:px-8 lg:gap-5 lg:scroll-px-[max(2.5rem,calc((100vw_-_1120px)/2))] lg:px-[max(2.5rem,calc((100vw_-_1120px)/2))] [&::-webkit-scrollbar]:hidden"
        >
          {group.lines.map((l) => (
            <article
              key={l.id}
              className="group flex w-[82vw] shrink-0 snap-start flex-col overflow-hidden rounded-[24px] border border-white/10 bg-[#111318] sm:w-[340px] lg:w-[360px]"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={l.img}
                  alt={`Linha ${l.title} Piracanjuba`}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.05]"
                />
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h3 className="text-lg font-semibold tracking-tight">{l.title}</h3>
                <ul className="mt-3 space-y-1.5 text-[13px] leading-snug text-white/60">
                  {l.items.slice(0, MAX_ITEMS).map((it) => (
                    <li key={it} className="flex gap-2">
                      <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-gold" />
                      {it}
                    </li>
                  ))}
                </ul>
                {l.items.length > MAX_ITEMS && (
                  <p className="mt-2 text-[12px] text-white/40">+ {l.items.length - MAX_ITEMS} itens no catálogo</p>
                )}
              </div>
            </article>
          ))}
          <div className="w-2 shrink-0 lg:w-6" aria-hidden="true" />
        </motion.div>
      </AnimatePresence>

      <div className="container-x relative mt-8 flex flex-col items-start justify-between gap-5 md:flex-row md:items-center">
        <p className="max-w-[640px] text-[11px] leading-relaxed text-white/40">
          Imagens e informações dos catálogos oficiais Piracanjuba (Linha Seca e Refrigerados). O Ministério da Saúde
          informa: o aleitamento materno evita infecções e alergias e é recomendado até os 2 (dois) anos de idade ou mais.
        </p>
        <a
          href={waLink('Olá, Angelo! Quero conhecer o portfólio Piracanjuba para a minha loja.')}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary shrink-0"
        >
          Quero Piracanjuba na minha loja <ArrowUpRight className="h-4 w-4" />
        </a>
      </div>
    </section>
  )
}
