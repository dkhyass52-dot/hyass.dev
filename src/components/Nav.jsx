import { useEffect, useState } from 'react'
import { nav, site } from '../data/site'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const close = () => setOpen(false)

  return (
    <header className={`nav ${scrolled ? 'scrolled' : ''}`}>
      <div className="wrap">
        <div className="nav-in">
          <a href="#top" className="brand" onClick={close}>
            <i>{site.initials}</i>
            {site.name}
          </a>
          <nav className="nav-links" aria-label="Navigation principale">
            {nav.map((l) => (
              <a key={l.href} href={l.href}>
                {l.label}
              </a>
            ))}
          </nav>
          <div className="nav-cta">
            <span className="status">
              <i className="dot" />
              Disponible
            </span>
            <a href="#contact" className="btn btn-ink btn-sm">
              Me contacter
            </a>
            <button
              type="button"
              className="burger"
              aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
              aria-expanded={open}
              aria-controls="drawer"
              onClick={() => setOpen((o) => !o)}
            >
              <span />
            </button>
          </div>
        </div>
        <nav id="drawer" className={`drawer ${open ? 'open' : ''}`} aria-label="Menu mobile">
          {nav.map((l) => (
            <a key={l.href} href={l.href} onClick={close} tabIndex={open ? 0 : -1}>
              {l.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  )
}
