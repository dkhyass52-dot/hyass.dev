import { useEffect, useRef } from 'react'
import { headings, steps } from '../data/site'
import { gsap, ScrollTrigger, isMobile, reduceMotion } from '../lib/motion'
import { SectionHead } from './ui'

export default function Process() {
  const section = useRef(null)
  const list = useRef(null)
  const fill = useRef(null)
  const runner = useRef(null)

  useEffect(() => {
    if (reduceMotion) return
    const ctx = gsap.context(() => {
      // Le panneau sombre s'élargit jusqu'aux bords de l'écran en arrivant.
      gsap.fromTo(
        section.current,
        { clipPath: 'inset(0% 5% 0% 5% round 32px)' },
        { clipPath: 'inset(0% 0% 0% 0% round 0px)', ease: 'none', scrollTrigger: { trigger: section.current, start: 'top bottom', end: 'top 25%', scrub: true } },
      )

      // La ligne se remplit avec le défilement, un point lumineux la parcourt et les étapes s'allument.
      const items = [...list.current.querySelectorAll('.step')]
      const track = list.current.querySelector('.track-line')
      ScrollTrigger.create({
        trigger: list.current,
        start: 'top 75%',
        end: 'bottom 55%',
        scrub: true,
        onUpdate: ({ progress: p }) => {
          const mobile = isMobile()
          fill.current.style.transform = mobile ? `scaleY(${p})` : `scaleX(${p})`
          items.forEach((st, i) => st.classList.toggle('on', p >= i / (items.length - 1) - 0.02 || (p > 0.98 && i === items.length - 1)))
          const r = runner.current.style
          if (mobile) {
            r.top = `${p * track.offsetHeight}px`
            r.left = ''
          } else {
            r.left = `${p * track.offsetWidth}px`
            r.top = ''
          }
        },
      })
    }, section)
    return () => ctx.revert()
  }, [])

  return (
    <section className="sec process" id="methode" ref={section}>
      <div className="wrap">
        <SectionHead label="Méthode">
          {headings.process[0]} <span className="hl">{headings.process[1]}</span>
        </SectionHead>
        <div className="steps" ref={list}>
          {!reduceMotion && <span className="runner" ref={runner} aria-hidden="true" />}
          <div className="track-line" aria-hidden="true">
            <i ref={fill} />
          </div>
          {steps.map((s, i) => (
            <div key={s.title} className={`step s${i + 1}`}>
              <span className="num">{i + 1}</span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
