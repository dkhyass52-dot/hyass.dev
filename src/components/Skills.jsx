import { useEffect, useRef } from 'react'
import { headings, skills } from '../data/site'
import { gsap, reduceMotion } from '../lib/motion'
import { SectionHead } from './ui'

export default function Skills() {
  const grid = useRef(null)

  // Les outils tombent en place, un par un.
  useEffect(() => {
    if (reduceMotion) return
    const ctx = gsap.context(() => {
      gsap.from('.sk li', { y: 30, opacity: 0, rotate: -3, stagger: 0.04, duration: 0.7, ease: 'back.out(1.7)', scrollTrigger: { trigger: grid.current, start: 'top 85%' } })
    }, grid)
    return () => ctx.revert()
  }, [])

  return (
    <section className="sec wrap" id="competences">
      <SectionHead label="Compétences">{headings.skills}</SectionHead>
      <div className="skills-grid" ref={grid}>
        {skills.map((group) => (
          <div key={group.title} className="sk fade">
            <h3>{group.title}</h3>
            <ul>
              {group.items.map((item) => (
                <li key={item}>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
