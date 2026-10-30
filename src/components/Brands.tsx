import { ArrowUpRight } from 'lucide-react'
import { scrollToId } from '../lib/smoothScroll'
import { Eyebrow, Reveal, SplitHeading } from './ui'

const BRANDS = [
  { id: 'piracanjuba', name: 'Piracanjuba', logo: '/assets/pira-color.webp', area: 'Lácteos e Whey Protein', tall: true },
  { id: 'tangara', name: 'Tangará Química', logo: '/assets/brands/tangara.webp', area: 'Álcool e limpeza · Flop´s' },
  { id: 'petyan', name: 'Petyan', logo: '/assets/brands/petyan.webp', area: 'Biscoitos e massas · Supradely · Spaguetto' },
]

export default function Brands() {
  return (
    <section id="marcas" className="relative bg-ink py-16 md:py-20" aria-labelledby="marcas-title">
      <div className="container-x">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Eyebrow>Marcas representadas</Eyebrow>
            <SplitHeading
              id="marcas-title"
              lines={['Marcas fortes,', <span className="serif-accent text-gradient-milk">em cada categoria.</span>]}
              className="display mt-6 text-[clamp(32px,4vw,60px)]"
            />
          </div>
          <Reveal className="lg:col-span-5" delay={0.1}>
            <p className="text-[15px] leading-relaxed text-white/60">
              Da geladeira à despensa e à limpeza: a Nogueira Representações leva ao mercado regional marcas que o
              consumidor conhece e procura.
            </p>
          </Reveal>
        </div>

        <div className="mt-8 grid gap-3 md:mt-10 md:grid-cols-3 md:gap-4">
          {BRANDS.map((b, i) => (
            <Reveal key={b.id} delay={i * 0.07} y={30}>
              <button
                onClick={() => scrollToId(b.id)}
                className="group relative flex h-full w-full flex-col overflow-hidden rounded-[26px] border border-white/10 bg-white/[0.03] p-3 text-left transition-colors duration-500 hover:border-gold/50"
              >
                <div className="grid h-28 place-items-center rounded-[20px] bg-white p-5 md:h-44 md:p-6">
                  <img
                    src={b.logo}
                    alt={`Logotipo ${b.name}`}
                    loading="lazy"
                    className={`w-auto object-contain transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.05] ${
                      b.tall ? 'max-h-[84px] md:max-h-[120px]' : 'max-h-[64px] md:max-h-[88px]'
                    }`}
                  />
                </div>
                <div className="flex items-center justify-between gap-3 px-3 pb-1 pt-4 md:pb-2 md:pt-5">
                  <div>
                    <p className="text-lg font-semibold tracking-tight">{b.name}</p>
                    <p className="mt-1 text-[13px] text-white/55">{b.area}</p>
                  </div>
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/15 transition-all duration-500 group-hover:rotate-45 group-hover:border-gold group-hover:text-gold">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
