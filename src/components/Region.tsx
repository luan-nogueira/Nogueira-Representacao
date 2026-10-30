import { motion } from 'framer-motion'
import { MapPin } from 'lucide-react'
import { Eyebrow, Reveal, SplitHeading } from './ui'

const C = { x: 440, y: 290 }
// Abstract connection points — illustrative only, not specific cities.
const NODES = [
  [180, 150], [250, 360], [320, 470], [560, 140], [620, 230], [360, 110], [140, 280], [520, 440], [230, 220], [600, 360],
]
const LAND =
  'M40 60 C160 30 300 70 420 40 C520 20 600 60 660 90 C700 150 690 210 650 250 C620 300 640 360 600 410 C560 470 520 520 430 530 C320 545 200 520 120 470 C60 420 30 330 40 240 Z'

export default function Region() {
  const dots: [number, number][] = []
  for (let y = 20; y < 560; y += 16) for (let x = 20; x < 800; x += 16) dots.push([x + ((y / 16) % 2) * 8, y])

  return (
    <section id="regiao" className="relative overflow-hidden bg-ink py-28 md:py-40" aria-labelledby="regiao-title">
      <div className="container-x relative grid items-center gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Eyebrow>Região de atuação</Eyebrow>
          <SplitHeading
            id="regiao-title"
            lines={['Presença regional.', <span className="serif-accent text-gradient-milk">Conexões que geram oportunidades.</span>]}
            className="display mt-8 text-[clamp(38px,4.6vw,72px)]"
          />
          <Reveal delay={0.15}>
            <p className="mt-8 max-w-[440px] text-[16px] leading-relaxed text-white/60">
              Com base em Campos dos Goytacazes, a Nogueira Representações atende Campos e região, no Norte do
              estado do Rio de Janeiro, aproximando grandes marcas dos negócios locais.
            </p>
          </Reveal>
          <Reveal delay={0.25}>
            <div className="mt-10 inline-flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-5">
              <span className="grid h-11 w-11 place-items-center rounded-full bg-gold/15">
                <MapPin className="h-5 w-5 text-gold" />
              </span>
              <div>
                <p className="font-semibold">Campos dos Goytacazes e região</p>
                <p className="text-[13px] text-mist">Rio de Janeiro · Brasil</p>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal className="lg:col-span-7" y={50}>
          <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-b from-[#0d1730] to-ink">
            <svg viewBox="0 0 800 560" className="block h-auto w-full" role="img" aria-label="Mapa estilizado de Campos dos Goytacazes e região, RJ">
              <defs>
                <clipPath id="land">
                  <path d={LAND} />
                </clipPath>
                <radialGradient id="glow" cx="0.55" cy="0.52" r="0.5">
                  <stop offset="0" stopColor="#2A4F8F" stopOpacity="0.75" />
                  <stop offset="1" stopColor="#2A4F8F" stopOpacity="0" />
                </radialGradient>
                <linearGradient id="line" x1="0" x2="1">
                  <stop offset="0" stopColor="#C7A56A" stopOpacity="0.1" />
                  <stop offset="1" stopColor="#C7A56A" stopOpacity="0.9" />
                </linearGradient>
              </defs>

              {/* ocean lines */}
              {Array.from({ length: 16 }).map((_, i) => (
                <path
                  key={i}
                  d={`M${560 + i * 14} 0 C ${640 + i * 12} 200, ${600 + i * 14} 380, ${520 + i * 18} 560`}
                  stroke="#ffffff"
                  strokeOpacity={0.04 + (i % 3) * 0.015}
                  fill="none"
                />
              ))}

              <rect width="800" height="560" fill="url(#glow)" />
              <g clipPath="url(#land)">
                {dots.map(([x, y], i) => (
                  <circle key={i} cx={x} cy={y} r={1.6} fill="#ffffff" opacity={0.16} />
                ))}
              </g>
              <path d={LAND} fill="none" stroke="#ffffff" strokeOpacity="0.14" />

              {/* routes */}
              {NODES.map(([x, y], i) => {
                const mx = (C.x + x) / 2 + (y - C.y) * 0.25
                const my = (C.y + y) / 2 - (x - C.x) * 0.25
                const d = `M${C.x} ${C.y} Q${mx} ${my} ${x} ${y}`
                return (
                  <g key={i}>
                    <motion.path
                      d={d}
                      stroke="url(#line)"
                      strokeWidth="1.2"
                      fill="none"
                      initial={{ pathLength: 0 }}
                      whileInView={{ pathLength: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.6, delay: 0.3 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                    />
                    <path d={d} stroke="#ffffff" strokeWidth="2" fill="none" strokeDasharray="4 220" strokeLinecap="round">
                      <animate attributeName="stroke-dashoffset" from="224" to="0" dur={`${2.6 + (i % 4) * 0.5}s`} repeatCount="indefinite" />
                    </path>
                    <circle cx={x} cy={y} r="4" fill="#C7A56A" />
                    <circle cx={x} cy={y} r="10" fill="none" stroke="#C7A56A" strokeOpacity="0.35" />
                  </g>
                )
              })}

              {/* hub */}
              {[0, 1, 2].map((i) => (
                <circle key={i} cx={C.x} cy={C.y} r="26" fill="none" stroke="#ffffff" strokeOpacity="0.6"
                  style={{ transformOrigin: `${C.x}px ${C.y}px`, animation: `pulse-ring 3s ${i}s ease-out infinite` }} />
              ))}
              <circle cx={C.x} cy={C.y} r="9" fill="#ffffff" />
              <circle cx={C.x} cy={C.y} r="4" fill="#102B59" />

              <g fontFamily="Inter Tight Variable, sans-serif">
                <text x={C.x + 22} y={C.y - 18} fill="#ffffff" fontSize="17" fontWeight="600">Campos dos Goytacazes</text>
                <text x={C.x + 22} y={C.y + 2} fill="#A6A6A6" fontSize="11" letterSpacing="3">RJ · 21°45′S 41°19′O</text>
                <text x="690" y="500" fill="#ffffff" fillOpacity="0.3" fontSize="11" letterSpacing="4" textAnchor="middle">OCEANO ATLÂNTICO</text>
              </g>
            </svg>
            <div className="flex items-center justify-between border-t border-white/10 px-6 py-4 text-[11px] uppercase tracking-[0.22em] text-mist">
              <span>Mapa estilizado</span>
              <span>Campos dos Goytacazes e região</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
