import { useEffect, useRef } from 'react'
import { headings, services } from '../data/site'
import { gsap, reduceMotion } from '../lib/motion'
import { SectionHead } from './ui'
import ServiceIllustration from './ServiceIllustrations'

export default function Services() {
  const list = useRef(null)

  // Les cartes montent en cascade avec une légère inclinaison.
  useEffect(() => {
    if (reduceMotion) return
    const ctx = gsap.context(() => {
      gsap.from('.svc', { y: 80, rotate: 2, opacity: 0, stagger: 0.15, duration: 1, ease: 'power4.out', scrollTrigger: { trigger: list.current, start: 'top 85%' } })
    }, list)
    return () => ctx.revert()
  }, [])

  return (
    <section className="sec wrap pt-0" id="services">
      <SectionHead label="Services">{headings.services}</SectionHead>
      <div ref={list} className="grid grid-cols-1 border-t border-ink md:grid-cols-3">
        {services.map((s) => (
          <article key={s.label} className={`svc c-${s.tone}`}>
            <div className="svc-vis">
              <ServiceIllustration name={s.illustration} />
            </div>
            <span className="label">{s.label}</span>
            <h3>{s.title}</h3>
            <p>{s.text}</p>
            <div className="tags">
              {s.tags.map((t) => (
                <span key={t} className="tag">
                  {t}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
