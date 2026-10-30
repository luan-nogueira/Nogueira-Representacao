import { useEffect, useRef } from 'react'
import { gsap } from '../lib/smoothScroll'
import { Eyebrow, Reveal, SplitHeading } from './ui'

const PILLARS = [
  { t: 'Qualidade', d: 'Produtos que chegam ao ponto de venda com o padrão de uma das marcas mais reconhecidas do país.' },
  { t: 'Tradição', d: 'Uma marca presente na rotina de muitas famílias brasileiras.' },
  { t: 'Confiança', d: 'Credibilidade que o consumidor reconhece na prateleira e que o lojista sente no giro.' },
  { t: 'Reconhecimento', d: 'Força de marca nacional que valoriza o mix de qualquer estabelecimento.' },
  { t: 'Excelência', d: 'Um portfólio reconhecido pela qualidade em cada categoria.' },
]

export default function Piracanjuba() {
  const root = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // milk wave rises as the section enters
      gsap.fromTo(
        '[data-wave]',
        { scaleY: 1 },
        { scaleY: 0.25, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'top 30%', scrub: true } }
      )
      gsap.fromTo(
        '[data-logo]',
        { y: 80, rotate: -4 },
        { y: -40, rotate: 0, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: true } }
      )
      gsap.utils.toArray<HTMLElement>('[data-pillar-line]').forEach((el) => {
        gsap.fromTo(el, { scaleX: 0 }, { scaleX: 1, duration: 1.4, ease: 'expo.out', scrollTrigger: { trigger: el, start: 'top 88%' } })
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={root} id="piracanjuba" className="relative bg-milk text-ink" aria-labelledby="pira-title">
      {/* liquid edge */}
      <svg
        data-wave
        className="absolute left-0 top-0 h-[90px] w-full origin-top text-ink md:h-[140px]"
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          fill="currentColor"
          d="M0 0v56c80 18 140-26 220-22s110 52 190 50 120-44 210-44 140 62 240 60 130-48 230-46 140 40 210 38 90-20 140-18V0Z"
        />
      </svg>

      <div className="container-x relative pb-24 pt-32 md:pb-36 md:pt-48">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-6">
            <Eyebrow className="!text-ink/60">A marca representada</Eyebrow>
            <SplitHeading
            id="pira-title"
              lines={['Qualidade que', 'conquista', <span className="serif-accent text-navy">o Brasil.</span>]}
              className="display mt-8 text-[clamp(48px,7.4vw,124px)]"
            />
            <Reveal delay={0.2}>
              <p className="mt-10 max-w-[480px] text-[17px] leading-relaxed text-ink/70">
                A Piracanjuba é a principal marca representada pela Nogueira Representações. Uma marca que
                carrega qualidade, tradição e confiança, e que merece uma presença à altura no mercado regional.
              </p>
            </Reveal>
          </div>

          <div className="relative lg:col-span-6">
            <div data-logo className="relative mx-auto aspect-[4/5] w-full max-w-[520px]">
              <div className="absolute inset-0 rounded-[36px] bg-white shadow-[0_60px_120px_-40px_rgba(16,43,89,0.45)]" />
              <div className="absolute inset-0 overflow-hidden rounded-[36px]">
                <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-navy/[0.06]" />
                <div className="absolute -bottom-32 -left-16 h-80 w-80 rounded-full bg-gold/[0.12] blur-2xl" />
              </div>
              <div className="relative flex h-full flex-col items-center justify-center gap-10 p-10">
                <img
                  src="/assets/pira-color.webp"
                  alt="Logotipo Piracanjuba Pro Force"
                  width={400}
                  height={498}
                  loading="lazy"
                  className="w-[62%] max-w-[300px]"
                />
                <div className="h-px w-16 bg-gold" />
                <p className="text-center text-[11px] uppercase tracking-mega text-ink/50">
                  Representação comercial
                  <br />
                  Campos dos Goytacazes e região — RJ
                </p>
              </div>
            </div>
          </div>
        </div>

        <ol className="mt-24 md:mt-32">
          {PILLARS.map((p, i) => (
            <li key={p.t} className="relative">
              <span data-pillar-line className="absolute inset-x-0 top-0 h-px origin-left bg-ink/15" />
              <Reveal className="grid items-baseline gap-3 py-8 md:grid-cols-12 md:gap-8 md:py-10" y={24}>
                <span className="text-xs tabular-nums text-ink/40 md:col-span-1">0{i + 1}</span>
                <h3 className="display text-[clamp(34px,4.6vw,72px)] md:col-span-6">{p.t}</h3>
                <p className="max-w-[420px] text-[15px] leading-relaxed text-ink/60 md:col-span-5">{p.d}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
