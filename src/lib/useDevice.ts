import { useEffect, useState } from 'react'

const query = (q: string) => typeof window !== 'undefined' && window.matchMedia(q).matches

export function useMediaQuery(q: string) {
  const [match, setMatch] = useState(() => query(q))
  useEffect(() => {
    const mq = window.matchMedia(q)
    const on = () => setMatch(mq.matches)
    on()
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [q])
  return match
}

export const useIsMobile = () => useMediaQuery('(max-width: 767px)')
export const useReducedMotion = () => useMediaQuery('(prefers-reduced-motion: reduce)')

/** Rough GPU tier: mobile / low-core devices get the lighter 3D path. */
export function isLowPower() {
  if (typeof navigator === 'undefined') return false
  const coarse = query('(pointer: coarse)')
  const cores = navigator.hardwareConcurrency || 4
  return coarse || cores <= 4
}
