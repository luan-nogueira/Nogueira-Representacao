import { lazy, Suspense, useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowDown, ArrowRight } from 'lucide-react'
import { scrollToId } from '../lib/smoothScroll'
import { WA_HELLO } from '../lib/contact'
import { isLowPower } from '../lib/useDevice'
import { WhatsAppIcon } from './Icons'
import { Magnetic } from './ui'

const HeroScene = lazy(() => import('../three/HeroScene'))

const ease = [0.22, 1, 0.36, 1] as const

export function hasWebGL() {
  try {
    const c = document.createElement('canvas')
    return !!(c.getContext('webgl2') || c.getContext('webgl'))
  } catch {
    return false
  }
}

function StaticFallback() {
  return (
    <div className="absolute inset-0 flex items-center justify-center md:justify-end md:pr-[6vw]" aria-hidden="true">
      <img
        src="/assets/jars.webp"
        alt=""
        className="w-[78vw] max-w-[620px] opacity-90 [mask-image:radial-gradient(closest-side,black_70%,transparent)]"
      />
    </div>
  )
}

export default function Hero() {
  const [mount3D, setMount3D] = useState(false)
  const webgl = useMemo(() => hasWebGL(), [])
  const lite = useMemo(() => isLowPower() || window.innerWidth < 768, [])

  // Let the text paint first, then bring the 3D scene in.
  useEffect(() => {
    const id = window.setTimeout(() => setMount3D(true), 250)
    return () => window.clearTimeout(id)
  }, [])

  const line = (d: number) => ({
    initial: { y: '110%' },
    animate: { y: '0%' },
    transition: { duration: 1.3, delay: 1.5 + d, ease },
  })

  return (
    <section id="topo" className="grain relative isolate h-[100svh] min-h-[640px] w-full overflow-hidden" aria-label="Apresentação">
      {/* atmosphere */}
      <div className="absolute inset-0 -z-10 bg-ink" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(55%_60%_at_68%_48%,rgba(16,43,89,0.95)_0%,rgba(9,9,9,0)_70%)] max-md:bg-[radial-gradient(90%_40%_at_50%_28%,rgba(16,43,89,0.95)_0%,rgba(9,9,9,0)_75%)]" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-48 bg-gradient-to-t from-ink to-transparent" />
      <div
        className="pointer-events-none absolute -z-10 select-none whitespace-nowrap font-semibold leading-none tracking-[-0.06em] text-outline opacity-40 max-md:hidden"
        style={{ fontSize: '19vw', bottom: '-3.2vw', left: '-1vw' }}
        aria-hidden="true"
      >
        NOGUEIRA
      </div>

      {/* 3D */}
      <motion.div className="absolute inset-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2, delay: 1.2 }}>
        {webgl && mount3D ? (
          <Suspense fallback={null}>
            <HeroScene lite={lite} />
          </Suspense>
        ) : !webgl ? (
          <StaticFallback />
        ) : null}
      </motion.div>

      {/* copy */}
      <div className="container-x relative flex h-full flex-col justify-end pb-28 md:justify-center md:pb-0">
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[52%] bg-gradient-to-t from-ink via-ink/80 to-transparent md:hidden" />
        <div className="relative max-w-[700px]">
          <motion.p
            className="eyebrow mb-5 whitespace-nowrap max-sm:text-[9.5px] max-sm:tracking-[0.22em] md:mb-8"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 1.4, ease }}
          >
            Representação comercial Piracanjuba
          </motion.p>

          <h1>
            <span className="mb-3 block overflow-hidden text-[12px] font-semibold uppercase tracking-mega text-white md:mb-6 md:text-[15px]">
              <motion.span className="block" {...line(0)}>
                Nogueira Representações
              </motion.span>
            </span>
            <span className="display block text-[clamp(42px,5.5vw,92px)]">
              {['Grandes marcas', 'merecem grandes', 'representações.'].map((t, i) => (
                <span key={t} className="block overflow-hidden pb-[0.1em] -mb-[0.1em]">
                  <motion.span className="block" {...line(0.08 + i * 0.09)}>
                    {i === 2 ? <span className="serif-accent text-gradient-milk pr-2">{t}</span> : t}
                  </motion.span>
                </span>
              ))}
            </span>
          </h1>

          <motion.p
            className="mt-6 max-w-[460px] text-[15px] leading-relaxed text-white/65 md:mt-8 md:text-[17px]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 2.0, ease }}
          >
            Conectando marcas de excelência aos negócios que movimentam o mercado regional.
          </motion.p>

          <motion.div
            className="mt-8 flex flex-col gap-3 sm:flex-row md:mt-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 2.15, ease }}
          >
            <Magnetic
              href="#piracanjuba"
              onClick={(e) => {
                e.preventDefault()
                scrollToId('piracanjuba')
              }}
              className="btn btn-primary group pointer-events-auto"
            >
              Conheça nossa representação
              <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
            </Magnetic>
            <Magnetic href={WA_HELLO} target="_blank" rel="noopener noreferrer" className="btn btn-ghost pointer-events-auto">
              <WhatsAppIcon className="h-4 w-4" /> Fale com Angelo Nogueira
            </Magnetic>
          </motion.div>
        </div>
      </div>

      {/* bottom rail */}
      <motion.div
        className="absolute inset-x-0 bottom-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 2.4 }}
      >
        <div className="container-x flex items-center justify-between border-t border-white/[0.07] py-5 text-[11px] uppercase tracking-[0.24em] text-mist">
          <span className="hidden md:block">Grandes marcas. Grandes conexões.</span>
          <span className="flex items-center gap-4">
            <span className="hidden sm:inline">Marca representada</span>
            <img src="/assets/pira-white.webp" alt="Piracanjuba Pro Force" className="h-9 w-auto opacity-90" width={400} height={498} />
          </span>
          <button
            onClick={() => scrollToId('piracanjuba')}
            className="flex items-center gap-3 transition-colors hover:text-white"
            aria-label="Rolar para a próxima seção"
          >
            <span className="hidden md:inline">Role para descobrir</span>
            <span className="grid h-9 w-9 place-items-center rounded-full border border-white/15">
              <ArrowDown className="h-3.5 w-3.5 animate-bounce" />
            </span>
          </button>
        </div>
      </motion.div>
    </section>
  )
}
