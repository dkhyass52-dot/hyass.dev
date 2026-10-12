import { useEffect, useState } from 'react'
import { nav, site } from '../data/site'
import { useTheme } from '../lib/theme'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { theme, toggle } = useTheme()
  const dark = theme === 'dark'

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
            <button
              type="button"
              className="theme-toggle"
              onClick={toggle}
              aria-label={dark ? 'Passer en mode clair' : 'Passer en mode sombre'}
              title={dark ? 'Mode clair' : 'Mode sombre'}
            >
              <svg className="i-moon" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M20.5 14.5A8.5 8.5 0 0 1 9.5 3.5a8.5 8.5 0 1 0 11 11z" />
              </svg>
              <svg className="i-sun" viewBox="0 0 24 24" aria-hidden="true">
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2.5v2M12 19.5v2M4.6 4.6l1.4 1.4M18 18l1.4 1.4M2.5 12h2M19.5 12h2M4.6 19.4 6 18M18 6l1.4-1.4" />
              </svg>
            </button>
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
