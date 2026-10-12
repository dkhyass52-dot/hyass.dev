import { useEffect, useRef, useState } from 'react'
import { projects } from '../data/projects'
import { headings } from '../data/site'
import { ScrollTrigger, canPreview, finePointer, reduceMotion } from '../lib/motion'
import { Arrow, LinkButton, Note, Plus, SectionHead } from './ui'
import ProjectVisual from './Mockups'
import Showcase from './Showcase'

export default function Projects() {
  const [open, setOpen] = useState(0) // le premier projet est ouvert au départ
  const [hovered, setHovered] = useState(-1)
  const showPreview = canPreview && !reduceMotion

  // La hauteur de la liste change quand un projet s'ouvre : on recalcule les animations au défilement.
  useEffect(() => {
    const id = setTimeout(() => ScrollTrigger.refresh(), 750)
    return () => clearTimeout(id)
  }, [open])

  const toggle = (i) => {
    setOpen((cur) => (cur === i ? -1 : i))
    setHovered(-1)
  }

  return (
    <section className="sec wrap pt-0" id="projets">
      <SectionHead label="Projets">{headings.projects}</SectionHead>
      <div className="relative">
        <Note className="pj-note">{headings.projectsNote}</Note>
        <div className="pj-list border-t border-ink">
          {projects.map((p, i) => (
            <ProjectRow
              key={p.slug}
              project={p}
              index={i}
              open={open === i}
              onToggle={() => toggle(i)}
              onHover={(on) => showPreview && setHovered(on && open !== i ? i : -1)}
            />
          ))}
        </div>
      </div>
      {showPreview && <Preview index={hovered} />}
    </section>
  )
}

function ProjectRow({ project: p, index, open, onToggle, onHover }) {
  const detailId = `projet-${p.slug}`
  // La vitrine (pages entières, plus lourdes) n'est chargée qu'à la première ouverture du projet.
  const [seen, setSeen] = useState(open)
  useEffect(() => {
    if (open) setSeen(true)
  }, [open])

  // Sur ordinateur, la maquette ouverte bouge légèrement avec la souris.
  const tilt = finePointer
    ? {
        onPointerMove: (e) => {
          const mk = e.currentTarget.querySelector('.mk')
          if (!mk) return
          const r = e.currentTarget.getBoundingClientRect()
          mk.style.transform = `translate(${((e.clientX - r.left) / r.width - 0.5) * -14}px,${((e.clientY - r.top) / r.height - 0.5) * -10}px) scale(1.04)`
        },
        onPointerLeave: (e) => {
          const mk = e.currentTarget.querySelector('.mk')
          if (mk) mk.style.transform = ''
        },
      }
    : {}

  return (
    <article className="pj fade" data-open={open} style={{ '--pc': p.color }}>
      <button
        type="button"
        className="pj-row"
        aria-expanded={open}
        aria-controls={detailId}
        onClick={onToggle}
        onPointerEnter={() => onHover(true)}
        onPointerLeave={() => onHover(false)}
      >
        <span className="n">{String(index + 1).padStart(2, '0')}</span>
        <h3>{p.name}</h3>
        <span className="k">{p.kind}</span>
        <span className="s">{p.stack.join(' · ') || ' '}</span>
        <span className="plus" aria-hidden="true">
          <Plus />
        </span>
      </button>
      <div className="pj-detail" id={detailId}>
        <div>
          <div className="pj-inner">
            {p.pages ? (
              <div>{seen && <Showcase project={p} />}</div>
            ) : (
              <div {...tilt}>
                <ProjectVisual project={p} />
              </div>
            )}
            <div>
              <p className="desc">{p.description}</p>
              <dl>
                <dt>Type</dt>
                <dd>{p.kind}</dd>
                {p.stack.length > 0 && (
                  <>
                    <dt>Technologies</dt>
                    <dd>{p.stack.join(', ')}</dd>
                  </>
                )}
              </dl>
              <div className="pj-links">
                <LinkButton href={p.demo} newTab className="btn btn-ink btn-sm" missing={`Lien de démo à ajouter dans src/data/projects.js (${p.name})`}>
                  {p.live ? 'Voir le site' : 'Voir la démo'} <Arrow />
                </LinkButton>
                {p.github !== null && (
                  <LinkButton href={p.github} className="btn btn-line btn-sm" missing={`Lien GitHub à ajouter dans src/data/projects.js (${p.name})`}>
                    Code sur GitHub
                  </LinkButton>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}

/** Aperçu flottant qui suit la souris en se penchant légèrement (grand écran uniquement). */
function Preview({ index }) {
  const box = useRef(null)
  const active = useRef(false)
  const last = useRef(0) // garde le dernier projet affiché pendant le fondu de sortie
  active.current = index >= 0
  if (index >= 0) last.current = index

  useEffect(() => {
    let tx = 0
    let ty = 0
    let x = 0
    let y = 0
    let raf
    const onMove = (e) => {
      tx = e.clientX + 200
      ty = e.clientY
    }
    const loop = () => {
      const nx = x + (tx - x) * 0.12
      const vx = nx - x
      x = nx
      y += (ty - y) * 0.12
      if (box.current) {
        const tilt = Math.max(-8, Math.min(8, vx * 0.35))
        box.current.style.transform = `translate(${x - 180}px,${y - 124}px) rotate(${tilt}deg) scale(${active.current ? 1 : 0.85})`
      }
      raf = requestAnimationFrame(loop)
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    raf = requestAnimationFrame(loop)
    return () => {
      window.removeEventListener('pointermove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div ref={box} className={`preview ${index >= 0 ? 'show' : ''}`} style={{ '--pc': projects[last.current].color }} aria-hidden="true">
      {projects.map((p, i) => (
        <ProjectVisual key={p.slug} project={p} className={`pv ${i === last.current ? 'current' : ''}`} />
      ))}
    </div>
  )
}
