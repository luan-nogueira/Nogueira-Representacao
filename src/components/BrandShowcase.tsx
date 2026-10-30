import { useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react'
import type { Brand } from '../data/brands'
import { waLink } from '../lib/contact'
import { Eyebrow, Reveal, SplitHeading } from './ui'

type Theme = {
  section: string
  glow: string
  text: string
  muted: string
  line: string
  card: string
  chip: string
  chipActive: string
  accent: string
  button: string
}

export const THEMES: Record<string, Theme> = {
  // Airy, clinical blue-white for cleaning products.
  tangara: {
    section: 'bg-[#eef3f8] text-ink',
    glow: 'bg-[radial-gradient(60%_60%_at_85%_10%,rgba(56,140,214,0.18),transparent_70%)]',
    text: 'text-ink',
    muted: 'text-ink/60',
    line: 'border-ink/10',
    card: 'bg-white shadow-[0_30px_60px_-40px_rgba(16,43,89,0.45)]',
    chip: 'border-ink/15 text-ink/70 hover:text-ink',
    chipActive: 'bg-ink text-white border-ink',
    accent: 'text-[#d9251d]',
    button: 'bg-ink text-white hover:bg-[#d9251d]',
  },
  // Warm night with the brand's yellow and red as light.
  petyan: {
    section: 'bg-[#120c06] text-white',
    glow: 'bg-[radial-gradient(55%_55%_at_15%_10%,rgba(246,194,26,0.22),transparent_70%),radial-gradient(50%_50%_at_95%_90%,rgba(214,37,29,0.25),transparent_70%)]',
    text: 'text-white',
    muted: 'text-white/60',
    line: 'border-white/10',
    card: 'bg-gradient-to-b from-[#2a1a0b] to-[#1a1008] border border-white/[0.06]',
    chip: 'border-white/15 text-white/70 hover:text-white',
    chipActive: 'bg-[#f6c21a] text-ink border-[#f6c21a]',
    accent: 'text-[#f6c21a]',
    button: 'bg-[#f6c21a] text-ink hover:bg-white',
  },
}

export default function BrandShowcase({ brand }: { brand: Brand }) {
  const th = THEMES[brand.id]
  const [lineId, setLineId] = useState(brand.lines[0].id)
  const line = brand.lines.find((l) => l.id === lineId)!
  const rail = useRef<HTMLDivElement>(null)

  const scrollRail = (dir: 1 | -1) => {
    const el = rail.current
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: 'smooth' })
  }

  return (
    <section id={brand.id} className={`relative overflow-hidden py-16 md:py-20 ${th.section}`} aria-labelledby={`${brand.id}-title`}>
      <div className={`pointer-events-none absolute inset-0 ${th.glow}`} aria-hidden="true" />
      <div className="container-x relative">
        <div className="grid items-end gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Eyebrow className={brand.id === 'tangara' ? '!text-ink/60' : ''}>{brand.eyebrow}</Eyebrow>
            <SplitHeading
              id={`${brand.id}-title`}
              lines={[brand.title[0], <span className={`serif-accent ${th.accent}`}>{brand.title[1]}</span>]}
              className="display mt-6 text-[clamp(32px,4vw,60px)]"
            />
            <Reveal delay={0.1}>
              <p className={`mt-6 max-w-[540px] text-[15px] leading-relaxed ${th.muted}`}>{brand.about}</p>
            </Reveal>
          </div>
          <Reveal className="lg:col-span-5" delay={0.15}>
            <div className="flex items-center gap-4 lg:justify-end">
              <div className="grid h-28 w-52 shrink-0 place-items-center rounded-[22px] bg-white p-5 shadow-[0_24px_50px_-30px_rgba(0,0,0,0.6)]">
                <img src={brand.logo} alt={brand.logoAlt} loading="lazy" className="max-h-full w-auto object-contain" />
              </div>
              {brand.family && (
                <div className="flex flex-col gap-3">
                  {brand.family.map((f) => (
                    <div key={f.alt} className="grid h-[50px] w-32 place-items-center rounded-2xl bg-white px-3 py-2">
                      <img src={f.logo} alt={f.alt} loading="lazy" className="max-h-full w-auto object-contain" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </Reveal>
        </div>

        <Reveal>
          <dl className={`mt-10 grid grid-cols-3 border-y ${th.line}`}>
            {brand.facts.map((f, i) => (
              <div key={f.label} className={`py-5 ${i ? `border-l pl-4 md:pl-8 ${th.line}` : ''}`}>
                <dt className="sr-only">{f.label}</dt>
                <dd>
                  <span className="block text-[clamp(20px,2.2vw,30px)] font-semibold tracking-tight">{f.value}</span>
                  <span className={`mt-1 block text-[11px] uppercase tracking-[0.16em] ${th.muted}`}>{f.label}</span>
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>

        {/* lines */}
        <div className="mt-10 flex items-center justify-between gap-4">
          <div
            className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-0 [&::-webkit-scrollbar]:hidden"
            role="tablist"
            aria-label={`Linhas ${brand.name}`}
          >
            {brand.lines.map((l) => (
              <button
                key={l.id}
                role="tab"
                aria-selected={l.id === lineId}
                onClick={() => {
                  setLineId(l.id)
                  rail.current?.scrollTo({ left: 0 })
                }}
                className={`shrink-0 whitespace-nowrap rounded-full border px-4 py-2 text-[13px] transition-colors duration-300 ${
                  l.id === lineId ? th.chipActive : th.chip
                }`}
              >
                {l.title}
              </button>
            ))}
          </div>
          <div className="hidden shrink-0 gap-2 md:flex">
            {([-1, 1] as const).map((d) => (
              <button
                key={d}
                onClick={() => scrollRail(d)}
                className={`grid h-10 w-10 place-items-center rounded-full border transition-colors ${th.chip}`}
                aria-label={d < 0 ? 'Produtos anteriores' : 'Próximos produtos'}
              >
                {d < 0 ? <ArrowLeft className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}
              </button>
            ))}
          </div>
        </div>
        {line.detail && <p className={`mt-4 text-[13px] ${th.muted}`}>{line.detail}</p>}

        <AnimatePresence mode="wait">
          <motion.div
            key={line.id}
            ref={rail}
            role="tabpanel"
            className="-mx-5 mt-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 [scrollbar-width:none] sm:mx-0 sm:px-0 [&::-webkit-scrollbar]:hidden"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            {line.products.map((pr, i) => (
              <motion.figure
                key={pr.img}
                className={`group flex w-[46vw] max-w-[220px] shrink-0 snap-start flex-col rounded-[22px] p-4 sm:w-[200px] ${th.card}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: Math.min(i, 8) * 0.04 }}
              >
                <div className="relative flex h-[170px] items-center justify-center md:h-[190px]">
                  <img
                    src={pr.img}
                    alt={`${brand.id === 'tangara' ? 'Flop´s' : ''} ${pr.name}`.trim()}
                    loading="lazy"
                    decoding="async"
                    className="max-h-full max-w-full object-contain drop-shadow-[0_18px_18px_rgba(0,0,0,0.28)] transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:-translate-y-1.5 group-hover:scale-[1.04]"
                  />
                </div>
                <figcaption className="mt-4">
                  <p className="text-[14px] font-semibold leading-snug tracking-tight">{pr.name}</p>
                  {pr.detail && <p className={`mt-1 text-[12px] ${th.muted}`}>{pr.detail}</p>}
                </figcaption>
              </motion.figure>
            ))}
          </motion.div>
        </AnimatePresence>

        <div className="mt-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <p className={`text-[12px] ${th.muted}`}>Imagens e informações do catálogo oficial {brand.name}.</p>
          <a
            href={waLink(`Olá, Angelo! Vi os produtos ${brand.name} no site e quero saber mais para o meu estabelecimento.`)}
            target="_blank"
            rel="noopener noreferrer"
            className={`btn ${th.button}`}
          >
            Quero {brand.name} na minha loja <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  )
}
