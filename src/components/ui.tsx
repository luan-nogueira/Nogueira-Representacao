import { motion, useMotionValue, useSpring, type HTMLMotionProps } from 'framer-motion'
import { useRef, type ReactNode } from 'react'

const ease = [0.22, 1, 0.36, 1] as const

export function Reveal({
  children,
  delay = 0,
  y = 40,
  className,
  as = 'div',
}: {
  children: ReactNode
  delay?: number
  y?: number
  className?: string
  as?: 'div' | 'p' | 'span' | 'li' | 'h2' | 'h3'
}) {
  const M = motion[as] as typeof motion.div
  return (
    <M
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 1.1, delay, ease }}
    >
      {children}
    </M>
  )
}

/** Splits a heading into masked lines that slide up when in view. */
export function SplitHeading({
  lines,
  className,
  as = 'h2',
  delay = 0,
  id,
}: {
  lines: ReactNode[]
  id?: string
  className?: string
  as?: 'h1' | 'h2' | 'h3'
  delay?: number
}) {
  // The observer sits on the heading itself: the masked inner spans start
  // fully clipped, so they would never report as intersecting.
  const Tag = motion[as] as typeof motion.h2
  return (
    <Tag id={id} className={className} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-8% 0px' }}>
      {lines.map((l, i) => (
        <span key={i} className="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
          <motion.span
            className="block"
            variants={{
              hidden: { y: '110%' },
              show: { y: '0%', transition: { duration: 1.2, delay: delay + i * 0.09, ease } },
            }}
          >
            {l}
          </motion.span>
        </span>
      ))}
    </Tag>
  )
}

/** Button/link that leans toward the cursor. */
export function Magnetic({
  children,
  className,
  strength = 0.25,
  ...rest
}: HTMLMotionProps<'a'> & { strength?: number }) {
  const ref = useRef<HTMLAnchorElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 220, damping: 18 })
  const sy = useSpring(y, { stiffness: 220, damping: 18 })
  return (
    <motion.a
      ref={ref}
      className={className}
      style={{ x: sx, y: sy }}
      onPointerMove={(e) => {
        if (e.pointerType !== 'mouse') return
        const r = ref.current!.getBoundingClientRect()
        x.set((e.clientX - r.left - r.width / 2) * strength)
        y.set((e.clientY - r.top - r.height / 2) * strength)
      }}
      onPointerLeave={() => {
        x.set(0)
        y.set(0)
      }}
      {...rest}
    >
      {children}
    </motion.a>
  )
}

export function Eyebrow({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <span className={`eyebrow ${className}`}>{children}</span>
}

export { ease }
