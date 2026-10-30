import { useRef } from 'react'
import { ArrowUpRight, Award, Handshake, MapPin, Network, UserRound } from 'lucide-react'
import { WA_PARTNERSHIP } from '../lib/contact'
import { WhatsAppIcon } from './Icons'
import { Eyebrow, Magnetic, Reveal, SplitHeading } from './ui'

const ITEMS = [
  { icon: Handshake, t: 'Relacionamento comercial', d: 'Uma relação próxima e contínua com cada estabelecimento parceiro.', span: 'lg:col-span-7' },
  { icon: UserRound, t: 'Atendimento personalizado', d: 'Cada negócio tem sua realidade, e o atendimento acompanha isso.', span: 'lg:col-span-5' },
  { icon: Award, t: 'Marcas reconhecidas', d: 'Representação de marcas que o consumidor já conhece e procura.', span: 'lg:col-span-4' },
  { icon: MapPin, t: 'Proximidade regional', d: 'Presença em Campos dos Goytacazes e região, perto de quem compra.', span: 'lg:col-span-4' },
  { icon: Network, t: 'Parcerias comerciais', d: 'Desenvolvimento de parcerias que geram oportunidades para os dois lados.', span: 'lg:col-span-4' },
]

function SpotCard({ item, i }: { item: (typeof ITEMS)[number]; i: number }) {
  const ref = useRef<HTMLDivElement>(null)
  return (
    <Reveal delay={i * 0.06} y={30} className={item.span}>
      <div
        ref={ref}
        onPointerMove={(e) => {
          const r = ref.current!.getBoundingClientRect()
          ref.current!.style.setProperty('--x', `${e.clientX - r.left}px`)
          ref.current!.style.setProperty('--y', `${e.clientY - r.top}px`)
        }}
        className="group relative h-full min-h-[200px] overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.02] p-7 transition-colors duration-500 hover:border-gold/40 md:p-8"
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{ background: 'radial-gradient(420px circle at var(--x) var(--y), rgba(199,165,106,0.14), transparent 60%)' }}
        />
        <div className="relative flex h-full flex-col justify-between gap-10">
          <div className="flex items-center justify-between">
            <span className="grid h-12 w-12 place-items-center rounded-full border border-white/15">
              <item.icon className="h-5 w-5 text-gold" strokeWidth={1.5} />
            </span>
            <span className="text-xs tabular-nums text-white/30">0{i + 1}</span>
          </div>
          <div>
            <h3 className="text-[clamp(20px,1.72vw,25px)] font-semibold leading-tight tracking-tight">{item.t}</h3>
            <p className="mt-3 max-w-[420px] text-[15px] leading-relaxed text-white/55">{item.d}</p>
          </div>
        </div>
      </div>
    </Reveal>
  )
}

export default function Partnership() {
  return (
    <section id="representacao" className="relative overflow-hidden bg-[#0b0d12] py-20 md:py-28" aria-labelledby="rep-title">
      <div className="absolute right-0 top-0 h-[600px] w-[600px] translate-x-1/3 -translate-y-1/3 rounded-full bg-navy/50 blur-[140px]" aria-hidden="true" />
      <div className="container-x relative">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <Eyebrow>Representação comercial</Eyebrow>
            <SplitHeading
            id="rep-title"
              lines={['Sua empresa pode', 'estar mais perto das', <span className="serif-accent text-gradient-milk">grandes marcas.</span>]}
              className="display mt-8 text-[clamp(32px,3.9vw,62px)]"
            />
          </div>
          <Reveal className="lg:col-span-4" delay={0.1}>
            <p className="text-[16px] leading-relaxed text-white/60">
              Para empresários e estabelecimentos comerciais que querem trabalhar com marcas fortes, com o apoio
              de quem conhece o mercado regional.
            </p>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-12 lg:gap-5">
          {ITEMS.map((it, i) => (
            <SpotCard key={it.t} item={it} i={i} />
          ))}
        </div>

        <Reveal className="mt-12 flex flex-col items-start justify-between gap-8 rounded-[32px] border border-gold/30 bg-gradient-to-r from-navy/60 to-transparent p-7 md:flex-row md:items-center md:p-10">
          <p className="display max-w-[620px] text-[clamp(24px,2.34vw,34px)]">
            Vamos conversar sobre o <span className="serif-accent">seu negócio?</span>
          </p>
          <Magnetic href={WA_PARTNERSHIP} target="_blank" rel="noopener noreferrer" className="btn btn-primary group shrink-0">
            <WhatsAppIcon className="h-4 w-4" />
            Quero conversar sobre uma parceria
            <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Magnetic>
        </Reveal>
      </div>
    </section>
  )
}
