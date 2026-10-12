import { useEffect } from 'react'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Bands from './components/Bands'
import About from './components/About'
import Services from './components/Services'
import Projects from './components/Projects'
import Process from './components/Process'
import Skills from './components/Skills'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ScrollProgress from './components/ScrollProgress'
import { ToastProvider } from './components/ui'
import { gsap, ScrollTrigger, finePointer, on, reduceMotion, scrollToHash, timers } from './lib/motion'

export default function App() {
  // Liens d'ancre (#projets…) : défilement doux qui tient compte du menu.
  useEffect(() => {
    const onClick = (e) => {
      const a = e.target.closest('a[href^="#"]')
      if (!a) return
      const hash = a.getAttribute('href')
      if (hash.length < 2) return
      if (scrollToHash(hash)) e.preventDefault()
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])

  // Apparitions au défilement, communes à toutes les sections (hors accueil et cartes « À propos »).
  useEffect(() => {
    if (reduceMotion) return
    const t = timers()
    const triggers = [...document.querySelectorAll('.rv, .fade, .mark, .note, .pen')]
      .filter((el) => !el.closest('.hero') && !el.closest('.tile'))
      .map((el) => {
        const delay = el.classList.contains('pen') ? 250 : el.classList.contains('mark') ? 350 : 0
        return ScrollTrigger.create({ trigger: el, start: 'top 88%', once: true, onEnter: () => t.later(() => on(el), delay) })
      })
    const batch = ScrollTrigger.batch('.sk, .pj', {
      start: 'top 92%',
      once: true,
      onEnter: (els) => els.forEach((el, i) => t.later(() => on(el), i * 90)),
    })

    // Les hauteurs changent quand les polices et les images arrivent : on recalcule les positions.
    const refresh = () => ScrollTrigger.refresh()
    window.addEventListener('load', refresh)
    document.fonts?.ready.then(refresh)
    return () => {
      t.clear()
      triggers.forEach((tr) => tr.kill())
      batch.forEach((tr) => tr.kill())
      window.removeEventListener('load', refresh)
    }
  }, [])

  // Boutons pleins « magnétiques » : ils suivent un peu la souris.
  useEffect(() => {
    if (!finePointer || reduceMotion) return
    const SEL = '.btn-ink, .btn-light'
    const move = (e) => {
      const m = e.target.closest?.(SEL)
      if (!m) return
      const r = m.getBoundingClientRect()
      gsap.to(m, { x: (e.clientX - r.left - r.width / 2) * 0.3, y: (e.clientY - r.top - r.height / 2) * 0.4, duration: 0.4 })
    }
    const leave = (e) => {
      const m = e.target.closest?.(SEL)
      if (m && !m.contains(e.relatedTarget)) gsap.to(m, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1,.4)' })
    }
    document.addEventListener('pointermove', move, { passive: true })
    document.addEventListener('pointerout', leave)
    return () => {
      document.removeEventListener('pointermove', move)
      document.removeEventListener('pointerout', leave)
    }
  }, [])

  return (
    <ToastProvider>
      <Nav />
      <main id="top">
        <Hero />
        <Bands />
        <About />
        <Services />
        <Projects />
        <Process />
        <Skills />
        <Contact />
      </main>
      <Footer />
      <ScrollProgress />
    </ToastProvider>
  )
}
