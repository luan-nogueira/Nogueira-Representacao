import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { WA_HELLO } from '../lib/contact'
import { WhatsAppIcon } from './Icons'

export default function FloatingWhatsApp() {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const on = () => setShow(window.scrollY > window.innerHeight * 0.8)
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])
  return (
    <AnimatePresence>
      {show && (
        <motion.a
          href={WA_HELLO}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Conversar com Angelo Nogueira no WhatsApp"
          className="fixed bottom-5 right-5 z-40 grid h-14 w-14 place-items-center rounded-full bg-white text-ink shadow-[0_20px_40px_-10px_rgba(0,0,0,0.6)] transition-colors hover:bg-gold md:bottom-8 md:right-8"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        >
          <WhatsAppIcon className="h-6 w-6" />
        </motion.a>
      )}
    </AnimatePresence>
  )
}
