import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'
import { external, showMissingLinks } from '../lib/links'

/* Petites briques réutilisées dans toutes les sections. */

export const Arrow = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
)

export const Plus = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M12 5v14M5 12h14" />
  </svg>
)

/** Trait de stylo bleu qui se dessine tout seul quand il apparaît (classe `.on`). */
export const Pen = ({ className = '', viewBox, preserveAspectRatio, children }) => (
  <svg className={`pen ${className}`} viewBox={viewBox} preserveAspectRatio={preserveAspectRatio} aria-hidden="true">
    {children}
  </svg>
)

/** Coche au stylo (liste des principes). */
export const PenCheck = () => (
  <Pen viewBox="0 0 24 24">
    <path pathLength="1" d="M3 13l6 6L21 4" />
  </Pen>
)

/** Annotation manuscrite. `rotate` en degrés. */
export const Note = ({ children, className = '', rotate, style, ...rest }) => (
  <span className={`note hand ${className}`} style={rotate == null ? style : { '--r': `${rotate}deg`, ...style }} {...rest}>
    {children}
  </span>
)

/* ---------- notifications ---------- */
const ToastCtx = createContext(() => {})
export const useToast = () => useContext(ToastCtx)

export function ToastProvider({ children }) {
  const [msg, setMsg] = useState('')
  const [show, setShow] = useState(false)
  const timer = useRef()
  const say = useCallback((m) => {
    setMsg(m)
    setShow(true)
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setShow(false), 2600)
  }, [])
  useEffect(() => () => clearTimeout(timer.current), [])
  return (
    <ToastCtx.Provider value={say}>
      {children}
      <div className={`toast ${show ? 'show' : ''}`} role="status" aria-live="polite">
        {msg}
      </div>
    </ToastCtx.Provider>
  )
}

/**
 * Bouton-lien. Si `href` est vide :
 *  - en développement, le bouton reste visible et rappelle où ajouter le lien ;
 *  - sur le site en ligne, il n'est pas affiché.
 */
export function LinkButton({ href, missing, className = '', newTab = false, children }) {
  const say = useToast()
  if (!href) {
    if (!showMissingLinks) return null
    return (
      <a
        href="#"
        className={className}
        onClick={(e) => {
          e.preventDefault()
          say(missing)
        }}
      >
        {children}
      </a>
    )
  }
  const attrs = newTab ? { target: '_blank', rel: 'noopener noreferrer' } : external(href)
  return (
    <a href={href} className={className} {...attrs}>
      {children}
    </a>
  )
}

/** Bouton « Copier » ; si le presse-papiers est refusé, sélectionne le texte. */
export function CopyButton({ text, targetRef }) {
  const say = useToast()
  const [done, setDone] = useState(false)
  const timer = useRef()
  useEffect(() => () => clearTimeout(timer.current), [])

  const selectText = () => {
    const el = targetRef?.current
    if (el) {
      const range = document.createRange()
      range.selectNodeContents(el)
      const sel = window.getSelection()
      sel.removeAllRanges()
      sel.addRange(range)
    }
    say('Texte sélectionné : copiez-le avec Ctrl/Cmd + C')
  }

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setDone(true)
      say(`${text} copié`)
      clearTimeout(timer.current)
      timer.current = setTimeout(() => setDone(false), 1800)
    } catch {
      selectText()
    }
  }

  return (
    <button type="button" onClick={copy}>
      {done ? 'Copié' : 'Copier'}
    </button>
  )
}

/** En-tête de section : petit libellé à gauche, grand titre à droite (empilés sur mobile). */
export function SectionHead({ label, children }) {
  return (
    <div className="mb-[clamp(2.5rem,5vw,4rem)] grid grid-cols-1 items-start gap-x-8 gap-y-6 sm:grid-cols-[minmax(0,3fr)_minmax(0,9fr)]">
      <p className="label sm:pt-[.9rem]">{label}</p>
      <h2 className="rv text-[clamp(2.2rem,4.8vw,4.2rem)]">{children}</h2>
    </div>
  )
}
