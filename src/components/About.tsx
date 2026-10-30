import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { ArrowUpRight, Award, Handshake, MapPin, UserRound } from 'lucide-react'
import { WA_PARTNERSHIP } from '../lib/contact'
import { WhatsAppIcon } from './Icons'
import { Eyebrow, Magnetic, Reveal, SplitHeading } from './ui'

const VALUES = [
  { icon: Handshake, t: 'Relacionamento comercial', d: 'Uma relação próxima e contínua com cada estabelecimento parceiro.' },
  { icon: UserRound, t: 'Atendimento personalizado', d: 'Cada negócio tem sua realidade, e o atendimento acompanha isso.' },
  { icon: Award, t: 'Marcas reconhecidas', d: 'Marcas que o consumidor já conhece e procura.' },
  { icon: MapPin, t: 'Proximidade regional', d: 'Presença em Campos dos Goytacazes e região, perto de quem compra.' },
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
      className="relative mx-auto aspect-square w-full max-w-[300px] [perspective:1200px]"
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
    <section id="empresa" className="relative overflow-hidden bg-ink py-16 md:py-20" aria-labelledby="about-title">
      <div className="absolute -left-40 top-1/3 h-[520px] w-[520px] rounded-full bg-navy/40 blur-[120px]" aria-hidden="true" />
      <div className="container-x relative grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="hidden lg:col-span-5 lg:block">
          <TiltEmblem />
        </div>

        <div className="lg:col-span-7 lg:pl-8">
          <Eyebrow>Nogueira Representações</Eyebrow>
          <SplitHeading
            id="about-title"
            lines={[
              'Mais do que',
              'representar marcas.',
              <span className="serif-accent text-gradient-milk">Construir grandes parcerias.</span>,
            ]}
            className="display mt-5 text-[clamp(30px,3.2vw,50px)]"
          />
          <Reveal delay={0.15}>
            <p className="mt-6 max-w-[560px] text-[16px] leading-relaxed text-white/70">
              A Nogueira Representações atua conectando grandes marcas ao mercado regional, desenvolvendo
              relacionamentos comerciais sólidos e aproximando produtos de qualidade dos estabelecimentos e
              consumidores. Para empresários e estabelecimentos que querem trabalhar com marcas fortes, com o apoio
              de quem conhece o mercado regional.
            </p>
          </Reveal>

          <Reveal delay={0.25}>
            <figure className="mt-8 flex items-center gap-6 border-l border-gold/60 pl-6">
              <div className="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-gradient-to-br from-gold to-[#8c7344] text-lg font-semibold text-ink">
                AN
              </div>
              <figcaption>
                <p className="text-xl font-semibold tracking-tight">Angelo Nogueira</p>
                <p className="mt-1 text-[14px] text-mist">Responsável pela Nogueira Representações · Representante comercial</p>
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </div>

      <div className="container-x relative mt-12 grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 grid-cols-2 lg:mt-14 lg:grid-cols-4">
        {VALUES.map((v, i) => (
          <Reveal key={v.t} delay={i * 0.08} y={30} className="group bg-ink p-4 transition-colors duration-700 hover:bg-[#0d1626] sm:p-6 md:p-7">
            <v.icon className="h-5 w-5 text-gold transition-transform duration-700 group-hover:-translate-y-1" strokeWidth={1.5} />
            <h3 className="mt-4 text-[15px] font-semibold leading-tight tracking-tight sm:text-lg">{v.t}</h3>
            <p className="mt-2 text-[13px] leading-relaxed text-white/55 sm:text-[14px]">{v.d}</p>
          </Reveal>
        ))}
      </div>

      <div className="container-x relative">
        <Reveal className="mt-6 flex flex-col items-start justify-between gap-6 rounded-[28px] border border-gold/30 bg-gradient-to-r from-navy/60 to-transparent p-6 md:flex-row md:items-center md:p-8">
          <p className="display max-w-[620px] text-[clamp(22px,1.97vw,29px)]">
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
