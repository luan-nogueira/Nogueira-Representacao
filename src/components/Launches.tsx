import { ArrowUpRight, Play } from 'lucide-react'
import { useRef, useState } from 'react'
import { waLink } from '../lib/contact'
import { Eyebrow, Reveal, SplitHeading } from './ui'

const PRO_FORCE = [
  'Creatina monohidratada 300 g',
  'Pré-treino sabor limão 301 g',
  'Gel intra-treino 40 g: açaí com guaraná, caramelo salgado e água de coco',
  'Whey Protein Concentrado 900 g: cookies, chocolate e baunilha',
]

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full bg-gold px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-ink">
      {children}
    </span>
  )
}

function ExcellenceVideo() {
  const ref = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)
  return (
    <div className="relative aspect-video overflow-hidden bg-[#3c8fd6]">
      <video
        ref={ref}
        src="/assets/novidades/excellence.mp4"
        poster="/assets/novidades/excellence-poster.webp"
        preload="none"
        playsInline
        controls={playing}
        className="h-full w-full object-cover"
        onEnded={() => setPlaying(false)}
      />
      {!playing && (
        <button
          onClick={() => {
            setPlaying(true)
            ref.current?.play()
          }}
          aria-label="Assistir ao vídeo da linha Excellence"
          className="group absolute inset-0 grid place-items-center"
        >
          <span className="grid h-16 w-16 place-items-center rounded-full bg-white/90 text-ink shadow-xl transition-transform duration-500 group-hover:scale-110">
            <Play className="ml-1 h-6 w-6 fill-current" />
          </span>
        </button>
      )}
    </div>
  )
}

export default function Launches() {
  return (
    <section id="novidades" className="relative overflow-hidden bg-[#0b0d12] py-14 md:py-16" aria-labelledby="novidades-title">
      <div className="container-x relative">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <Eyebrow>Lançamentos</Eyebrow>
            <SplitHeading
              id="novidades-title"
              lines={[<>Novidades <span className="serif-accent text-gradient-milk">na prateleira.</span></>]}
              className="display mt-5 text-[clamp(30px,3.2vw,50px)]"
            />
          </div>
          <p className="max-w-[420px] text-[15px] leading-relaxed text-white/60">
            Os produtos que acabaram de chegar ao portfólio. Fale com Angelo Nogueira para levar à sua loja.
          </p>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:gap-5">
          <Reveal y={30} className="overflow-hidden rounded-[24px] border border-white/10 bg-[#111318]">
            <img
              src="/assets/novidades/proforce-lancamentos.webp"
              alt="Lançamentos Piracanjuba Pro Force: creatina, pré-treino, gel intra-treino e Whey Protein Concentrado"
              loading="lazy"
              decoding="async"
              className="aspect-video w-full object-cover"
            />
            <div className="p-5 md:p-6">
              <div className="flex items-center gap-3">
                <Tag>Novo</Tag>
                <span className="text-[12px] uppercase tracking-[0.18em] text-mist">Piracanjuba Pro Force</span>
              </div>
              <h3 className="mt-3 text-lg font-semibold tracking-tight">Nova linha de suplementos</h3>
              <ul className="mt-3 space-y-1.5 text-[13px] leading-snug text-white/60">
                {PRO_FORCE.map((it) => (
                  <li key={it} className="flex gap-2">
                    <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-gold" />
                    {it}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal y={30} delay={0.08} className="overflow-hidden rounded-[24px] border border-white/10 bg-[#111318]">
            <ExcellenceVideo />
            <div className="p-5 md:p-6">
              <div className="flex items-center gap-3">
                <Tag>Novo</Tag>
                <span className="text-[12px] uppercase tracking-[0.18em] text-mist">Piracanjuba Health &amp; Nutrition</span>
              </div>
              <h3 className="mt-3 text-lg font-semibold tracking-tight">Linha Excellence</h3>
              <p className="mt-3 text-[13px] leading-relaxed text-white/60">
                Excellence Vital Care, Excellence Total Care e Excellence Glico Care. Assista ao filme oficial da
                linha.
              </p>
            </div>
          </Reveal>

          <Reveal y={30} className="flex overflow-hidden rounded-[24px] border border-white/10 bg-[#111318]">
            <div className="w-[40%] shrink-0 bg-[#fefef6] p-3">
              <img
                src="/assets/novidades/petyan-mini-cookies.webp"
                alt="Petyan Mini Cookies com gotas sabor chocolate, Tradicional, 60 g"
                loading="lazy"
                decoding="async"
                className="mx-auto h-full max-h-[240px] w-auto object-contain"
              />
            </div>
            <div className="flex flex-col justify-center p-5 md:p-6">
              <div className="flex flex-wrap items-center gap-3">
                <Tag>Novo</Tag>
                <span className="text-[12px] uppercase tracking-[0.18em] text-mist">Petyan</span>
              </div>
              <h3 className="mt-3 text-lg font-semibold tracking-tight">Mini Cookies</h3>
              <p className="mt-2 text-[13px] leading-relaxed text-white/60">
                Com gotas sabor chocolate, sabor Tradicional. Pacote de 60 g, zero lactose.
              </p>
            </div>
          </Reveal>

          <Reveal y={30} delay={0.08} className="flex overflow-hidden rounded-[24px] border border-white/10 bg-[#111318]">
            <div className="w-[40%] shrink-0 overflow-hidden">
              <img
                src="/assets/novidades/emana-protein-bar.webp"
                alt="Emana Protein Bar sabor Banoffee, 40 g, 12 g de proteínas por porção"
                loading="lazy"
                decoding="async"
                className="h-full max-h-[264px] w-full object-cover object-[70%_center]"
              />
            </div>
            <div className="flex flex-col justify-center p-5 md:p-6">
              <div className="flex flex-wrap items-center gap-3">
                <Tag>Novo</Tag>
                <span className="text-[12px] uppercase tracking-[0.18em] text-mist">Emana</span>
              </div>
              <h3 className="mt-3 text-lg font-semibold tracking-tight">Protein Bar Banoffee</h3>
              <p className="mt-2 text-[13px] leading-relaxed text-white/60">
                12 g de proteínas por porção. Barra de 40 g, caixa com 12 unidades (480 g).
              </p>
            </div>
          </Reveal>
        </div>

        <div className="mt-6 flex justify-start">
          <a
            href={waLink('Olá, Angelo! Quero saber mais sobre os lançamentos.')}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            Quero os lançamentos na minha loja <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  )
}
