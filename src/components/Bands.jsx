import { Fragment, useEffect, useRef } from 'react'
import { bands } from '../data/site'
import { reduceMotion } from '../lib/motion'

const Star = () => (
  <svg className="star" viewBox="0 0 40 40" aria-hidden="true">
    <path d="M20 3v34M3 20h34M8 8l24 24M32 8 8 32" />
  </svg>
)

// Le contenu est répété (nombre pair de copies) pour que le défilement tourne en boucle sans trou.
const Row = ({ items, copies }) =>
  Array.from({ length: copies }, (_, c) =>
    items.map((t, i) => (
      <Fragment key={`${c}-${i}`}>
        <span className={i % 2 ? 'hollow' : undefined}>{t}</span>
        <Star />
      </Fragment>
    )),
  )

/**
 * Deux bandeaux croisés qui défilent sans fin.
 * Ils accélèrent et se penchent avec la vitesse du défilement, et changent de sens quand on remonte.
 */
export default function Bands() {
  const front = useRef(null)
  const back = useRef(null)

  useEffect(() => {
    if (reduceMotion) return
    const rows = [
      { el: front.current, k: -1, x: 0 },
      { el: back.current, k: 1, x: 0 },
    ]
    let vel = 0
    let lastY = window.scrollY
    let dir = 1
    let raf
    const loop = () => {
      const dy = window.scrollY - lastY
      lastY = window.scrollY
      vel += (dy - vel) * 0.1
      if (Math.abs(dy) > 1) dir = dy > 0 ? 1 : -1
      const speed = 1 + Math.min(Math.abs(vel), 50) * 0.35
      const skew = Math.max(-10, Math.min(10, vel * -0.25))
      rows.forEach((r) => {
        const half = r.el.scrollWidth / 2
        r.x += r.k * dir * speed * (r.k > 0 ? 0.8 : 1)
        if (r.x <= -half) r.x += half
        if (r.x > 0) r.x -= half
        r.el.style.transform = `translate3d(${r.x}px,0,0) skewX(${-skew * r.k}deg)`
      })
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <div className="bands" aria-hidden="true">
      <div className="band back">
        <div className="band-row" ref={back}>
          <Row items={bands.back} copies={6} />
        </div>
      </div>
      <div className="band front">
        <div className="band-row" ref={front}>
          <Row items={bands.front} copies={4} />
        </div>
      </div>
    </div>
  )
}
