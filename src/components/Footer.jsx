import { useEffect, useRef, useState } from 'react'
import { site } from '../data/site'
import { gsap, reduceMotion, timers } from '../lib/motion'

const formatTime = () => {
  try {
    return new Intl.DateTimeFormat('fr-FR', { timeZone: site.timeZone, hour: '2-digit', minute: '2-digit' }).format(new Date())
  } catch {
    return '--:--'
  }
}

export default function Footer() {
  const giant = useRef(null)
  const [time, setTime] = useState(formatTime)

  // Heure locale d'Abomey-Calavi, mise à jour toutes les 15 secondes.
  useEffect(() => {
    const id = setInterval(() => setTime(formatTime()), 15000)
    return () => clearInterval(id)
  }, [])

  // Le grand prénom monte lettre par lettre, puis une vague de couleurs le traverse.
  useEffect(() => {
    if (reduceMotion) return
    const t = timers()
    const ctx = gsap.context(() => {
      const letters = giant.current.querySelectorAll('.g')
      gsap.from(letters, {
        yPercent: 100,
        stagger: 0.05,
        duration: 1.1,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: giant.current,
          start: 'top 95%',
          once: true,
          onEnter: () =>
            letters.forEach((g, i) => {
              t.later(() => g.classList.add('lit'), 500 + i * 90)
              t.later(() => g.classList.remove('lit'), 1100 + i * 90)
            }),
        },
      })
    }, giant)
    return () => {
      t.clear()
      ctx.revert()
    }
  }, [])

  return (
    <footer className="wrap">
      <div className="giant" ref={giant} aria-hidden="true">
        {[...site.firstName].map((c, i) => (
          <span key={i} className="g">
            {c}
          </span>
        ))}
      </div>
      <div className="foot">
        <span>
          © {new Date().getFullYear()} {site.name}
        </span>
        <span className="foot-clock">
          <i className="dot" />
          Il est <b>{time}</b> à {site.city}
        </span>
        <nav aria-label="Pied de page">
          <a href="#apropos">À propos</a>
          <a href="#projets">Projets</a>
          <a href="#contact">Contact</a>
          <a href="#top">Haut de page ↑</a>
        </nav>
      </div>
    </footer>
  )
}
