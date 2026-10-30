import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { BadgeCheck, HeartHandshake, ShieldCheck, Target } from 'lucide-react'
import { Eyebrow, Reveal, SplitHeading } from './ui'

const VALUES = [
  { icon: BadgeCheck, t: 'Profissionalismo', d: 'Postura comercial séria e transparente em cada negociação.' },
  { icon: HeartHandshake, t: 'Proximidade', d: 'Atendimento de perto, com quem conhece o mercado local.' },
  { icon: ShieldCheck, t: 'Confiança', d: 'Relacionamentos construídos para durar.' },
  { icon: Target, t: 'Compromisso', d: 'Dedicação real aos resultados de cada parceiro.' },
]

function TiltEmblem() {
  const ref = useRef<HTMLDivElement>(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [10, -10]), { stiffness: 120, damping: 14 })
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-12, 12]), { stiffness: 120, damping: 14 })
  const gx = useTransform(mx, [-0.5, 0.5], ['20%', '80%'])
  const gy = useTransform(my, [-0.5, 0.5], ['20%', '80%'])
  return (
    <div
      ref={ref}
      className="relative mx-auto aspect-square w-full max-w-[520px] [perspective:1200px]"
      onPointerMove={(e) => {
        const r = ref.current!.getBoundingClientRect()
        mx.set((e.clientX - r.left) / r.width - 0.5)
        my.set((e.clientY - r.top) / r.height - 0.5)
      }}
      onPointerLeave={() => {
        mx.set(0)
        my.set(0)
      }}
    >
      <motion.div
        style={{ rotateX: rx, rotateY: ry, transformStyle: 'preserve-3d' }}
        className="relative h-full w-full rounded-[40px] border border-white/10 bg-gradient-to-br from-[#16366d] via-navy to-[#071226] shadow-[0_80px_140px_-50px_rgba(0,0,0,0.9)]"
      >
        <motion.div
          className="absolute inset-0 rounded-[40px] opacity-60"
          style={{ background: useTransform([gx, gy], ([x, y]) => `radial-gradient(circle at ${x} ${y}, rgba(255,255,255,0.18), transparent 55%)`) }}
        />
        <div className="absolute inset-6 rounded-[30px] border border-gold/25" style={{ transform: 'translateZ(30px)' }} />
        <img
          src="/assets/nr-white.webp"
          alt="Logotipo Nogueira Representações"
          loading="lazy"
          width={400}
          height={484}
          className="absolute left-1/2 top-1/2 w-[46%] -translate-x-1/2 -translate-y-1/2 drop-shadow-[0_30px_30px_rgba(0,0,0,0.5)]"
          style={{ transform: 'translate(-50%,-50%) translateZ(80px)' }}
        />
        <span
          className="absolute bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] uppercase tracking-mega text-gold"
          style={{ transform: 'translateX(-50%) translateZ(50px)' }}
        >
          Campos dos Goytacazes — RJ
        </span>
      </motion.div>
    </div>
  )
}

export default function About() {
  return (
    <section id="empresa" className="relative overflow-hidden bg-ink py-28 md:py-40" aria-labelledby="about-title">
      <div className="absolute -left-40 top-1/3 h-[520px] w-[520px] rounded-full bg-navy/40 blur-[120px]" aria-hidden="true" />
      <div className="container-x relative grid items-center gap-16 lg:grid-cols-12 lg:gap-12">
        <div className="order-2 lg:order-1 lg:col-span-5">
          <TiltEmblem />
        </div>

        <div className="order-1 lg:order-2 lg:col-span-7 lg:pl-8">
          <Eyebrow>Nogueira Representações</Eyebrow>
          <SplitHeading
            id="about-title"
            lines={[
              'Mais do que',
              'representar marcas.',
              <span className="serif-accent text-gradient-milk">Construir grandes parcerias.</span>,
            ]}
            className="display mt-8 text-[clamp(40px,5.2vw,84px)]"
          />
          <Reveal delay={0.15}>
            <p className="mt-10 max-w-[560px] text-[18px] leading-relaxed text-white/70">
              A Nogueira Representações atua conectando grandes marcas ao mercado regional, desenvolvendo
              relacionamentos comerciais sólidos e aproximando produtos de qualidade dos estabelecimentos e
              consumidores.
            </p>
          </Reveal>

          <Reveal delay={0.25}>
            <figure className="mt-12 flex items-center gap-6 border-l border-gold/60 pl-6">
              <div className="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-gradient-to-br from-gold to-[#8c7344] text-lg font-semibold text-ink">
                AN
              </div>
              <figcaption>
                <p className="text-xl font-semibold tracking-tight">Angelo Nogueira</p>
                <p className="mt-1 text-[14px] text-mist">Responsável pela Nogueira Representações · Representante comercial Piracanjuba</p>
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </div>

      <div className="container-x relative mt-24 grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:mt-32 lg:grid-cols-4">
        {VALUES.map((v, i) => (
          <Reveal key={v.t} delay={i * 0.08} y={30} className="group bg-ink p-8 transition-colors duration-700 hover:bg-[#0d1626] md:p-10">
            <v.icon className="h-6 w-6 text-gold transition-transform duration-700 group-hover:-translate-y-1" strokeWidth={1.4} />
            <h3 className="mt-10 text-2xl font-semibold tracking-tight">{v.t}</h3>
            <p className="mt-3 text-[15px] leading-relaxed text-white/55">{v.d}</p>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
