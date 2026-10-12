import { useEffect, useRef } from 'react'
import { about, site } from '../data/site'
import { gsap, ScrollTrigger, on, reduceMotion, timers } from '../lib/motion'
import { Note, PenCheck } from './ui'
import portrait from '../assets/images/portrait.jpg'

/** Une phrase découpée en mots ; le passage surligné reste un seul bloc. */
function Statement({ parts }) {
  return (
    <p className="about-text fade">
      {parts.map((part, i) =>
        typeof part === 'string' ? (
          part
            .split(/(\s+)/)
            .filter(Boolean)
            .map((w, k) => (/^\s+$/.test(w) ? w : <span key={`${i}-${k}`} className="w">{w}</span>))
        ) : (
          <span key={i} className={`mark ${part.color || ''} w`}>
            {part.mark}
          </span>
        ),
      )}
    </p>
  )
}

export default function About() {
  const root = useRef(null)

  useEffect(() => {
    if (reduceMotion) return
    const el = root.current
    const t = timers()
    const ctx = gsap.context(() => {
      // Les mots s'allument au fil de la lecture.
      const words = [...el.querySelectorAll('.about-text .w')]
      ScrollTrigger.create({
        trigger: el.querySelector('.about-body'),
        start: 'top 75%',
        end: 'center 45%',
        scrub: true,
        onUpdate: (s) => {
          const n = Math.round(s.progress * words.length)
          words.forEach((w, i) => w.classList.toggle('lit', i < n))
        },
      })

      // Les cartes montent l'une après l'autre ; les coches se dessinent, les chiffres comptent.
      ScrollTrigger.batch(el.querySelectorAll('.tile'), {
        start: 'top 90%',
        once: true,
        onEnter: (tiles) =>
          tiles.forEach((tile, i) =>
            t.later(() => {
              on(tile)
              tile.querySelectorAll('.pen').forEach((p) => t.later(() => on(p), 300))
              tile.querySelectorAll('.count').forEach((c) =>
                gsap.from(c, { textContent: 0, duration: 1.4, ease: 'power2.out', snap: { textContent: 1 }, delay: 0.3 }),
              )
            }, i * 110),
          ),
      })
    }, el)
    return () => {
      t.clear()
      ctx.revert()
    }
  }, [])

  return (
    <section className="sec wrap" id="apropos" ref={root}>
      <div className="about-body grid grid-cols-1 gap-8 sm:grid-cols-[minmax(0,3fr)_minmax(0,9fr)]">
        <div className="about-side">
          <p className="label">À propos</p>
          <Note>{about.note}</Note>
        </div>
        <div>
          {about.statements.map((parts, i) => (
            <Statement key={i} parts={parts} />
          ))}
        </div>
      </div>

      <div className="bento">
        <figure className="tile t-portrait">
          <img src={portrait} alt={about.photoAlt} loading="lazy" />
          <span className="t-status">
            <i className="dot" />
            {about.status}
          </span>
          <figcaption className="t-id">
            <div>
              <b>{site.name}</b>
              <span>{site.role}</span>
            </div>
            <a href="#contact" className="t-go" aria-label="Me contacter">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M7 17 17 7M8 7h9v9" />
              </svg>
            </a>
          </figcaption>
        </figure>

        <div className="tile t-intro">
          <p className="label">Mon rôle</p>
          <p className="lead">{about.role}</p>
          <div className="stats">
            {about.stats.map((s) => (
              <div key={s.label}>
                <b>
                  {s.value > 1 ? <span className="count">{s.value}</span> : s.value}
                  {s.suffix}
                </b>
                <span>{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="tile t-stack">
          <p className="label">Ma stack</p>
          <div className="pills">
            {about.stack.map((tech, i) => (
              <span key={tech.name} style={{ '--k': tech.color, '--i': i }}>
                {tech.name}
              </span>
            ))}
          </div>
          <p className="sub">{about.stackNote}</p>
        </div>

        <div className="tile t-place">
          <span className="rings" aria-hidden="true" />
          <span className="pin" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21z" />
              <circle cx="12" cy="9.5" r="2.5" />
            </svg>
          </span>
          <div>
            <p className="label">Basé à</p>
            <b>{site.city}</b>
            <span className="country">{site.location.split(', ')[1]}</span>
          </div>
        </div>

        {about.values.map((v) => (
          <div key={v.title} className={`tile t-value ${v.tone}`}>
            <span className="tick">
              <PenCheck />
            </span>
            <div>
              <b>{v.title}</b>
              <p>{v.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
