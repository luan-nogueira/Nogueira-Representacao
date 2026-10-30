const WORDS = ['Grandes marcas', 'Grandes conexões', 'Piracanjuba', 'Campos dos Goytacazes — RJ', 'Representação comercial']

export default function Marquee() {
  const row = [...WORDS, ...WORDS]
  return (
    <div className="relative overflow-hidden border-y border-white/[0.07] bg-ink py-6" aria-hidden="true">
      <div className="animate-marquee flex w-max items-center gap-12 whitespace-nowrap">
        {[...row, ...row].map((w, i) => (
          <span key={i} className="flex items-center gap-12 text-[clamp(19px,2.34vw,31px)] font-semibold tracking-tight">
            <span className={i % 2 ? 'serif-accent font-normal text-white/50' : 'text-white/90'}>{w}</span>
            <span className="h-2 w-2 rotate-45 bg-gold/80" />
          </span>
        ))}
      </div>
    </div>
  )
}
