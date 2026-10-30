import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

/** Short cinematic curtain; never blocks longer than ~1.6s. */
export default function Preloader() {
  const [done, setDone] = useState(false)
  const [n, setN] = useState(0)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const total = reduced ? 200 : 1400
    const t0 = performance.now()
    let raf = 0
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / total)
      setN(Math.round((1 - Math.pow(1 - p, 3)) * 100))
      if (p < 1) raf = requestAnimationFrame(tick)
      else setTimeout(() => setDone(true), 120)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink"
          exit={{ clipPath: 'inset(0 0 100% 0)' }}
          transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
          aria-hidden="true"
        >
          <div className="flex flex-col items-center gap-8">
            <motion.img
              src="/assets/nr-white.webp"
              alt=""
              className="h-20 w-auto"
              initial={{ opacity: 0, scale: 0.92, filter: 'blur(8px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            />
            <div className="relative h-px w-48 overflow-hidden bg-white/10">
              <div className="absolute inset-y-0 left-0 bg-gold" style={{ width: `${n}%` }} />
            </div>
            <span className="text-[10px] tracking-mega text-mist tabular-nums">{String(n).padStart(3, '0')}</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
