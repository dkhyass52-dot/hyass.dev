import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { hero, site } from '../data/site'
import { gsap, finePointer, on, reduceMotion, timers } from '../lib/motion'
import { Arrow, LinkButton, Pen } from './ui'
import setup from '../assets/images/hero-setup.jpg'
import setupSmall from '../assets/images/hero-setup-1000.jpg'

export default function Hero() {
  const root = useRef(null)

  useEffect(() => {
    const el = root.current
    on(el) // léger zoom arrière de la photo
    if (reduceMotion) return

    // Entrée : les lignes du titre montent une à une, puis le texte, puis le trait de stylo.
    const t = timers()
    el.querySelectorAll('.rv').forEach((line, i) => t.later(() => on(line), 120 + i * 110))
    t.later(() => el.querySelectorAll('.fade').forEach(on), 700)
    t.later(() => on(el.querySelector('.circled .pen')), 1050)

    const ctx = gsap.context(() => {
      // Sur grand écran, la photo défile un peu moins vite que la page.
      if (window.matchMedia('(min-width: 921px)').matches) {
        gsap.to('.hero-bg', { yPercent: 9, ease: 'none', scrollTrigger: { trigger: el, start: 'top top', end: 'bottom top', scrub: true } })
      }
    }, el)

    // La photo se décale légèrement avec la souris.
    let move, leave
    if (finePointer) {
      const shift = gsap.quickTo(el.querySelector('.hero-bg'), 'x', { duration: 1.4, ease: 'power3' })
      move = (e) => shift((e.clientX / window.innerWidth - 0.5) * -16)
      leave = () => shift(0)
      el.addEventListener('pointermove', move)
      el.addEventListener('pointerleave', leave)
    }

    return () => {
      t.clear()
      ctx.revert()
      if (move) {
        el.removeEventListener('pointermove', move)
        el.removeEventListener('pointerleave', leave)
      }
    }
  }, [])

  return (
    <section className="hero" id="hero" ref={root}>
      <div className="hero-bg" aria-hidden="true">
        <img src={setup} srcSet={`${setupSmall} 1000w, ${setup} 2000w`} sizes="100vw" alt="" fetchpriority="high" />
      </div>
      <div className="hero-shade" aria-hidden="true" />

      <div className="hero-in wrap">
        <div className="hero-copy">
          <h1>
            <span className="ln rv">{hero.greeting[0]}</span>
            <span className="ln rv">{hero.greeting[1]}</span>
            <span className="ln rv soft">{hero.lead}</span>
            <span className="ln rv">
              <SwapWord words={hero.words} />
            </span>
            <span className="ln rv">
              <span className="circled">
                {hero.circled}
                <Pen viewBox="0 0 200 64" preserveAspectRatio="none">
                  <path pathLength="1" d="M14 34C8 18 52 6 104 6c52 0 92 10 90 28-2 20-58 26-104 25C40 58 4 50 8 32 10 22 28 14 46 11" />
                </Pen>
              </span>
            </span>
          </h1>
          <p className="hero-sub fade">{hero.intro}</p>
          <div className="hero-ctas fade">
            <a href="#projets" className="btn btn-light">
              Voir mes projets <Arrow />
            </a>
            <LinkButton
              href={site.links.cv}
              newTab
              className="btn btn-glass"
              missing="CV à ajouter : place le PDF dans public/ puis renseigne links.cv dans src/data/site.js"
            >
              Voir mon CV
            </LinkButton>
          </div>
        </div>
      </div>
    </section>
  )
}

/** Le mot du titre qui change toutes les 2,8 s : les lettres sortent par le haut, les nouvelles arrivent par le bas. */
function SwapWord({ words }) {
  const el = useRef(null)
  const [index, setIndex] = useState(0)
  const fromWidth = useRef(null)
  const outTween = useRef(null)

  // Sortie des lettres, puis on passe au mot suivant.
  useEffect(() => {
    if (reduceMotion || words.length < 2) return
    const id = setInterval(() => {
      const node = el.current
      if (document.hidden || !node) return
      fromWidth.current = node.getBoundingClientRect().width
      outTween.current = gsap.to(node.querySelectorAll('.c'), {
        yPercent: -115,
        opacity: 0,
        stagger: 0.018,
        duration: 0.32,
        ease: 'power2.in',
        onComplete: () => setIndex((n) => (n + 1) % words.length),
      })
    }, 2800)
    return () => {
      clearInterval(id)
      outTween.current?.kill()
    }
  }, [words.length])

  // Entrée du nouveau mot : la largeur s'adapte en douceur et les lettres rebondissent.
  useLayoutEffect(() => {
    const node = el.current
    if (fromWidth.current == null || !node) return
    node.style.width = 'auto'
    const to = node.getBoundingClientRect().width
    node.style.width = `${fromWidth.current}px`
    fromWidth.current = null
    const grow = gsap.to(node, { width: to, duration: 0.55, ease: 'power3.inOut', onComplete: () => (node.style.width = 'auto') })
    const letters = gsap.from(node.querySelectorAll('.c'), { yPercent: 115, opacity: 0, stagger: 0.024, duration: 0.6, ease: 'back.out(1.6)' })
    return () => {
      grow.kill()
      letters.kill()
    }
  }, [index])

  const word = words[index]
  return (
    <>
      <span className="sr-only">{words.map((w) => w.text).join(', ')}</span>
      <span ref={el} className="swap" aria-hidden="true" style={{ color: word.color }}>
        {[...word.text].map((c, k) => (
          <span key={`${index}-${k}`} className="c">
            {c === ' ' ? ' ' : c}
          </span>
        ))}
      </span>
    </>
  )
}
