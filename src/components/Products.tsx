import { useEffect, useRef } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { gsap, ScrollTrigger, scrollToId } from '../lib/smoothScroll'
import { WA_HELLO } from '../lib/contact'
import { Eyebrow, Reveal, SplitHeading } from './ui'

type Card = {
  n: string
  title: string
  text: string
  img: string
  bg: string
  official?: boolean
  href?: string
}

const CARDS: Card[] = [
  {
    n: '01',
    title: 'Leites',
    text: 'A base do portfólio: o leite que abastece a rotina de lares e estabelecimentos.',
    img: '/assets/art-leites.webp',
    bg: 'radial-gradient(120% 80% at 50% 20%, #1d3f78 0%, #102B59 45%, #0a1830 100%)',
  },
  {
    n: '02',
    title: 'Bebidas lácteas',
    text: 'Praticidade e sabor para quem consome em qualquer momento do dia.',
    img: '/assets/art-bebidas.webp',
    bg: 'radial-gradient(120% 80% at 50% 20%, #6b4a33 0%, #3a2418 50%, #160d08 100%)',
  },
  {
    n: '03',
    title: 'Whey Protein',
    text: 'O novo integrante da linha: Whey Protein Piracanjuba, nos sabores Chocolate e Milk.',
    img: '/assets/jars.webp',
    bg: 'radial-gradient(120% 80% at 50% 25%, #2a2a2a 0%, #141414 50%, #090909 100%)',
    official: true,
    href: 'whey',
  },
  {
    n: '04',
    title: 'Produtos proteicos',
    text: 'Uma categoria em crescimento, alinhada a consumidores que buscam mais proteína.',
    img: '/assets/art-proteicos.webp',
    bg: 'radial-gradient(120% 80% at 50% 20%, #2e2e33 0%, #17171a 55%, #0b0b0c 100%)',
  },
  {
    n: '05',
    title: 'Derivados do leite',
    text: 'Produtos derivados que completam o mix e ampliam as possibilidades do ponto de venda.',
    img: '/assets/art-derivados.webp',
    bg: 'radial-gradient(120% 80% at 50% 20%, #e9e2d4 0%, #b9ae9a 55%, #6d6658 100%)',
  },
]

function ProductCard({ c }: { c: Card }) {
  const light = c.n === '05'
  return (
    <article
      data-card
      className={`group relative flex h-[min(78vh,680px)] w-[82vw] shrink-0 snap-center flex-col overflow-hidden rounded-[28px] border border-white/10 sm:w-[440px] lg:w-[min(36vw,520px)] ${
        light ? 'text-ink' : 'text-white'
      }`}
      style={{ background: c.bg }}
    >
      <div className="grain absolute inset-0" />
      <div className="relative flex items-start justify-between p-7 md:p-9">
        <span className={`text-xs tabular-nums ${light ? 'text-ink/50' : 'text-white/50'}`}>{c.n} / 05</span>
        <span
          className={`rounded-full border px-3 py-1 text-[10px] uppercase tracking-[0.2em] ${
            light ? 'border-ink/20 text-ink/60' : 'border-white/20 text-white/60'
          }`}
        >
          {c.official ? 'Imagem oficial' : 'Ilustração 3D'}
        </span>
      </div>

      <div className="relative flex min-h-0 flex-1 items-center justify-center px-6">
        <div
          className={`absolute h-[60%] w-[70%] rounded-full blur-3xl ${light ? 'bg-white/60' : 'bg-white/[0.07]'}`}
          aria-hidden="true"
        />
        <img
          data-art
          src={c.img}
          alt={c.official ? 'Whey Protein Piracanjuba 450g, sabores Chocolate e Milk' : ''}
          loading="lazy"
          decoding="async"
          className={`relative h-full max-h-full w-auto max-w-[92%] object-contain transition-transform duration-[1.4s] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.06] ${
            c.official ? 'rounded-2xl [mask-image:radial-gradient(closest-side,black_78%,transparent)]' : 'drop-shadow-[0_40px_40px_rgba(0,0,0,0.45)]'
          }`}
        />
      </div>

      <div className="relative shrink-0 p-7 pt-2 md:p-9 md:pt-2">
        <h3 className="display text-[clamp(34px,3.4vw,52px)]">{c.title}</h3>
        <p className={`mt-3 max-w-[340px] text-[15px] leading-relaxed ${light ? 'text-ink/70' : 'text-white/65'}`}>{c.text}</p>
        {c.href && (
          <button
            onClick={() => scrollToId(c.href!)}
            className="mt-6 inline-flex items-center gap-2 text-sm text-gold transition-colors hover:text-white"
          >
            Ver produto em destaque <ArrowUpRight className="h-4 w-4" />
          </button>
        )}
      </div>
    </article>
  )
}

export default function Products() {
  const root = useRef<HTMLElement>(null)
  const track = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mm = gsap.matchMedia()
    mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
      const el = track.current!
      const distance = () => el.scrollWidth - window.innerWidth + 48
      const tween = gsap.to(el, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      })
      gsap.utils.toArray<HTMLElement>('[data-art]', el).forEach((art) => {
        gsap.fromTo(
          art,
          { xPercent: 18, rotate: 4 },
          {
            xPercent: -18,
            rotate: -4,
            ease: 'none',
            scrollTrigger: {
              trigger: art.closest('[data-card]'),
              containerAnimation: tween,
              start: 'left right',
              end: 'right left',
              scrub: true,
            },
          }
        )
      })
      return () => ScrollTrigger.refresh()
    })
    return () => mm.revert()
  }, [])

  return (
    <section ref={root} id="produtos" className="relative overflow-hidden bg-ink lg:h-screen" aria-labelledby="prod-title">
      <div className="absolute inset-0 bg-[radial-gradient(60%_50%_at_20%_30%,rgba(16,43,89,0.45),transparent_70%)]" />
      <div className="relative flex h-full flex-col justify-center py-24 lg:py-0">
        <div
          ref={track}
          className="flex snap-x snap-mandatory items-center gap-5 overflow-x-auto px-5 pb-6 [scrollbar-width:none] sm:px-8 lg:snap-none lg:gap-8 lg:overflow-visible lg:px-12 lg:pb-0 [&::-webkit-scrollbar]:hidden"
        >
          <div className="w-[86vw] shrink-0 snap-start pr-4 sm:w-[480px] lg:w-[min(40vw,560px)] lg:pr-10">
            <Eyebrow>Universo de produtos</Eyebrow>
            <SplitHeading
            id="prod-title"
              lines={['Um portfólio', 'que move', <span className="serif-accent text-gradient-milk">prateleiras.</span>]}
              className="display mt-8 text-[clamp(44px,5.6vw,88px)]"
            />
            <Reveal delay={0.15}>
              <p className="mt-8 max-w-[420px] text-[16px] leading-relaxed text-white/60">
                Categorias do portfólio Piracanjuba apresentadas pela Nogueira Representações. Consulte com Angelo
                Nogueira os produtos disponíveis para o seu estabelecimento.
              </p>
            </Reveal>
            <p className="mt-10 hidden text-[11px] uppercase tracking-mega text-mist lg:block">Role para explorar →</p>
            <p className="mt-8 text-[11px] uppercase tracking-mega text-mist lg:hidden">Deslize para explorar →</p>
          </div>

          {CARDS.map((c) => (
            <ProductCard key={c.n} c={c} />
          ))}

          <div className="flex h-[min(78vh,680px)] w-[82vw] shrink-0 snap-center flex-col justify-between rounded-[28px] border border-gold/30 p-9 sm:w-[400px] lg:w-[min(30vw,440px)]">
            <span className="text-xs uppercase tracking-mega text-gold">Portfólio completo</span>
            <div>
              <p className="display text-[clamp(32px,3vw,46px)]">
                Quer conhecer <span className="serif-accent">todo</span> o portfólio?
              </p>
              <p className="mt-4 text-[15px] leading-relaxed text-white/60">
                Fale diretamente com Angelo Nogueira e descubra as opções para o seu negócio.
              </p>
            </div>
            <a href={WA_HELLO} target="_blank" rel="noopener noreferrer" className="btn btn-primary self-start">
              Falar no WhatsApp <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
          <div className="w-2 shrink-0 lg:w-6" aria-hidden="true" />
        </div>
      </div>
    </section>
  )
}
