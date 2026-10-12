import { useEffect, useRef, useState } from 'react'
import { finePointer, reduceMotion } from '../lib/motion'
import { external } from '../lib/links'

/*
 * Vitrine d'un projet : la page entière dans un cadre de navigateur, et la version mobile dans un téléphone.
 * - Sur ordinateur : au survol, les deux pages défilent jusqu'en bas ; elles remontent quand la souris sort.
 * - Sur mobile : elles défilent toutes seules, lentement, en aller-retour.
 * - Si le visiteur a demandé « Réduire les animations » : on peut faire défiler chaque cadre à la main.
 */
export default function Showcase({ project }) {
  const root = useRef(null)
  const [ready, setReady] = useState(false)
  // Barre d'adresse : le domaine du site, ou le nom du projet s'il n'est pas en ligne.
  const domain = project.demo ? project.demo.replace(/^https?:\/\//, '').replace(/\/$/, '') : project.name

  // Distance à parcourir dans chaque cadre (hauteur de l'image moins hauteur visible) et durée commune.
  useEffect(() => {
    const el = root.current
    if (!el) return
    const measure = () => {
      let longest = 0
      el.querySelectorAll('.sc-view').forEach((view) => {
        const img = view.querySelector('img')
        const dist = Math.max(0, img.offsetHeight - view.clientHeight)
        view.style.setProperty('--dist', `${-dist}px`)
        longest = Math.max(longest, dist)
      })
      // environ 450 px par seconde, entre 4 et 12 secondes
      el.style.setProperty('--dur', `${Math.min(12, Math.max(4, longest / 450)).toFixed(1)}s`)
      setReady(true)
    }
    const imgs = [...el.querySelectorAll('img')]
    imgs.forEach((img) => img.complete || img.addEventListener('load', measure, { once: true }))
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const mode = reduceMotion ? 'manual' : finePointer ? 'hover' : 'auto'
  const Frame = project.demo ? 'a' : 'div'
  const frameProps = project.demo ? { href: project.demo, ...external(project.demo), 'aria-label': `Ouvrir le site ${project.name}` } : {}

  return (
    <div ref={root} className={`showcase sc-${mode} ${ready ? 'is-ready' : ''}`}>
      <Frame className="sc-browser" {...frameProps}>
        <div className="sc-bar" aria-hidden="true">
          <i />
          <i />
          <i />
          <span className="sc-url">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <rect x="5" y="11" width="14" height="10" rx="2" />
              <path d="M8 11V7a4 4 0 0 1 8 0v4" />
            </svg>
            {domain}
          </span>
        </div>
        <div className="sc-view">
          <img src={project.pages.desktop} alt={`Page d'accueil du site ${project.name}, version ordinateur`} loading="lazy" decoding="async" />
        </div>
      </Frame>
      {project.pages.mobile && (
        <div className="sc-phone">
          <span className="sc-island" aria-hidden="true" />
          <div className="sc-view">
            <img src={project.pages.mobile} alt={`Page d'accueil du site ${project.name}, version mobile`} loading="lazy" decoding="async" />
          </div>
        </div>
      )}
      {mode === 'hover' && <span className="sc-hint">survolez pour parcourir le site ↓</span>}
    </div>
  )
}
