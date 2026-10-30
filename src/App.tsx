import { useEffect } from 'react'
import { MotionConfig } from 'framer-motion'
import { initSmoothScroll, ScrollTrigger } from './lib/smoothScroll'
import Preloader from './components/Preloader'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import Piracanjuba from './components/Piracanjuba'
import PiracanjubaCatalog from './components/PiracanjubaCatalog'
import Whey from './components/Whey'
import About from './components/About'
import Region from './components/Region'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Brands from './components/Brands'
import Launches from './components/Launches'
import BrandShowcase from './components/BrandShowcase'
import { PETYAN, TANGARA } from './data/brands'
import FloatingWhatsApp from './components/FloatingWhatsApp'

export default function App() {
  useEffect(() => {
    const lenis = initSmoothScroll()
    const refresh = () => ScrollTrigger.refresh()
    window.addEventListener('load', refresh)
    document.fonts?.ready.then(refresh)
    return () => {
      window.removeEventListener('load', refresh)
      lenis?.destroy()
    }
  }, [])

  return (
    <MotionConfig reducedMotion="user">
      <a href="#conteudo" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-white focus:px-5 focus:py-3 focus:text-ink">
        Pular para o conteúdo
      </a>
      <Preloader />
      <Nav />
      <main id="conteudo">
        <Hero />
        <Marquee />
        <Brands />
        <Launches />
        <Piracanjuba />
        <PiracanjubaCatalog />
        <Whey />
        <BrandShowcase brand={TANGARA} />
        <BrandShowcase brand={PETYAN} />
        <About />
        <Region />
        <Contact />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </MotionConfig>
  )
}
