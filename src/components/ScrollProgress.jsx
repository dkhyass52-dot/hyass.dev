import { useEffect, useRef } from 'react'

/** Fine barre de couleur en haut de l'écran qui avance avec la lecture. */
export default function ScrollProgress() {
  const bar = useRef(null)
  useEffect(() => {
    const update = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight
      if (bar.current) bar.current.style.transform = `scaleX(${h > 0 ? window.scrollY / h : 0})`
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])
  return <div ref={bar} className="progress" aria-hidden="true" />
}
