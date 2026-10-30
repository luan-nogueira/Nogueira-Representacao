import { lazy, Suspense, useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { gsap } from '../lib/smoothScroll'
import { isLowPower } from '../lib/useDevice'
import { hasWebGL } from './Hero'
import { Eyebrow, SplitHeading } from './ui'

const WheyScene = lazy(() => import('../three/WheyScene'))

type Flavor = 'all' | 'choc' | 'milk'

const FLAVORS: { id: Flavor; label: string; img: string; alt: string }[] = [
  { id: 'all', label: 'Linha completa', img: '/assets/jars.webp', alt: 'Whey Protein Piracanjuba, sabores Chocolate e Milk, 450g' },
  { id: 'choc', label: 'Chocolate', img: '/assets/jar-choc.webp', alt: 'Whey Protein Piracanjuba sabor Chocolate, 450g' },
  { id: 'milk', label: 'Milk', img: '/assets/jar-milk.webp', alt: 'Whey Protein Piracanjuba sabor Milk, 450g' },
]

const STATS = [
  { v: 21, unit: 'g', label: 'de proteína por porção' },
  { v: 4.7, unit: 'g', label: "de BCAA's" },
  { v: 450, unit: 'g', label: 'por embalagem' },
  { v: 2, unit: '', label: 'sabores: Chocolate e Milk' },
]

function Counter({ to, decimals = 0 }: { to: number; decimals?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  useEffect(() => {
    const el = ref.current!
    const o = { v: 0 }
    const t = gsap.to(o, {
      v: to,
      duration: 2,
      ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 90%' },
      onUpdate: () => {
        el.textContent = o.v.toFixed(decimals).replace('.', ',')
      },
    })
    return () => {
      t.scrollTrigger?.kill()
      t.kill()
    }
  }, [to, decimals])
  return <span ref={ref}>{(0).toFixed(decimals).replace('.', ',')}</span>
}

const BG: Record<Flavor, string> = {
  all: 'radial-gradient(60% 55% at 50% 50%, rgba(16,43,89,0.85) 0%, rgba(9,9,9,0) 70%)',
  choc: 'radial-gradient(60% 55% at 50% 50%, rgba(110,62,36,0.85) 0%, rgba(9,9,9,0) 70%)',
  milk: 'radial-gradient(60% 55% at 50% 50%, rgba(230,220,196,0.35) 0%, rgba(9,9,9,0) 70%)',
}

export default function Whey() {
  const root = useRef<HTMLElement>(null)
  const stage = useRef<HTMLDivElement>(null)
  const [flavor, setFlavor] = useState<Flavor>('all')
  const [near, setNear] = useState(false)
  const webgl = useMemo(() => hasWebGL(), [])
  const lite = useMemo(() => isLowPower() || window.innerWidth < 768, [])
  const current = FLAVORS.find((f) => f.id === flavor)!

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setNear(true), { rootMargin: '100% 0px' })
    io.observe(root.current!)
    const ctx = gsap.context(() => {
      gsap.fromTo(
        stage.current,
        { scale: 0.72, y: 120, opacity: 0.2 },
        {
          scale: 1,
          y: 0,
          opacity: 1,
          ease: 'none',
          scrollTrigger: { trigger: root.current, start: 'top 85%', end: 'top 10%', scrub: 1 },
        }
      )
      gsap.fromTo(
        '[data-whey-word]',
        { xPercent: 12 },
        { xPercent: -12, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: true } }
      )
    }, root)
    return () => {
      io.disconnect()
      ctx.revert()
    }
  }, [])

  return (
    <section ref={root} id="whey" className="grain relative overflow-hidden bg-ink py-24 md:py-32" aria-labelledby="whey-title">
      <motion.div className="absolute inset-0" animate={{ background: BG[flavor] }} transition={{ duration: 1.2 }} />
      <div
        data-whey-word
        className="pointer-events-none absolute left-1/2 top-[44%] -translate-x-1/2 -translate-y-1/2 select-none whitespace-nowrap font-semibold leading-none tracking-[-0.06em] text-outline"
        style={{ fontSize: 'clamp(120px, 24vw, 380px)' }}
        aria-hidden="true"
      >
        WHEY PROTEIN
      </div>

      <div className="container-x relative">
        <div className="flex flex-col items-center text-center">
          <Eyebrow>Produto em destaque</Eyebrow>
          <SplitHeading
            id="whey-title"
            lines={[
              <>
                Whey Protein <span className="serif-accent text-gradient-milk">Piracanjuba.</span>
              </>,
            ]}
            className="display mt-6 text-[clamp(40px,6vw,96px)]"
          />
          <p className="mt-6 max-w-[560px] text-[16px] leading-relaxed text-white/60">
            A linha Piracanjuba ganhou um novo integrante: Whey Protein, suplemento alimentar em pó na embalagem de
            450g, em dois sabores, Chocolate e Milk.
          </p>

          <div className="mt-10 inline-flex rounded-full border border-white/10 bg-white/[0.03] p-1 backdrop-blur-md" role="tablist" aria-label="Sabores">
            {FLAVORS.map((f) => (
              <button
                key={f.id}
                role="tab"
                aria-selected={flavor === f.id}
                onClick={() => setFlavor(f.id)}
                className={`relative rounded-full px-4 py-2.5 text-[13px] transition-colors sm:px-6 ${
                  flavor === f.id ? 'text-ink' : 'text-white/70 hover:text-white'
                }`}
              >
                {flavor === f.id && (
                  <motion.span layoutId="flavor-pill" className="absolute inset-0 rounded-full bg-white" transition={{ type: 'spring', stiffness: 300, damping: 30 }} />
                )}
                <span className="relative">{f.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div ref={stage} className="relative mx-auto mt-10 flex h-[min(62vh,560px)] max-w-[760px] items-center justify-center md:mt-14">
          <div className="absolute bottom-[4%] left-1/2 h-10 w-[60%] -translate-x-1/2 rounded-[50%] bg-black/70 blur-2xl" aria-hidden="true" />
          <AnimatePresence mode="wait">
            <motion.img
              key={current.id}
              src={current.img}
              alt={current.alt}
              loading="lazy"
              decoding="async"
              className="relative max-h-full w-auto max-w-full object-contain [mask-image:radial-gradient(closest-side,black_80%,transparent)]"
              initial={{ opacity: 0, scale: 0.94, y: 20, filter: 'blur(10px)' }}
              animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 1.04, y: -10, filter: 'blur(10px)' }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            />
          </AnimatePresence>
          {webgl && near && (
            <div className="pointer-events-none absolute -inset-y-[18%] left-1/2 w-[100vw] max-w-[1600px] -translate-x-1/2">
              <Suspense fallback={null}>
                <WheyScene flavor={flavor} lite={lite} />
              </Suspense>
            </div>
          )}
        </div>

        <dl className="relative mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 md:mt-16 lg:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} className="bg-ink/90 p-6 backdrop-blur md:p-9">
              <dt className="sr-only">{s.label}</dt>
              <dd>
                <span className="display block text-[clamp(44px,5vw,76px)]">
                  <Counter to={s.v} decimals={s.v % 1 ? 1 : 0} />
                  <span className="serif-accent text-gold">{s.unit}</span>
                </span>
                <span className="mt-2 block text-[13px] uppercase tracking-[0.18em] text-mist">{s.label}</span>
              </dd>
            </div>
          ))}
        </dl>
        <p className="relative mt-6 text-center text-[12px] text-white/40">
          Informações conforme material oficial da linha Whey Protein Piracanjuba.
        </p>
      </div>

    </section>
  )
}
