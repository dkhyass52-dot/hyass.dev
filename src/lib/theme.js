import { useCallback, useEffect, useState } from 'react'
import { reduceMotion } from './motion'

/*
 * Mode clair / sombre.
 * - Au chargement, index.html pose déjà le bon mode (choix enregistré, sinon réglage de l'appareil) : pas de flash.
 * - Tant que le visiteur n'a rien choisi, le site suit le réglage de son appareil.
 * - Un clic sur le bouton enregistre son choix pour ses prochaines visites.
 */

const KEY = 'theme'
// Couleur de la barre du navigateur sur mobile, pour chaque mode.
const BAR_COLOR = { light: '#F4F5F1', dark: '#0E1113' }

const root = () => document.documentElement
export const currentTheme = () => (root().dataset.theme === 'dark' ? 'dark' : 'light')

function readSaved() {
  try {
    const t = localStorage.getItem(KEY)
    return t === 'light' || t === 'dark' ? t : null
  } catch {
    return null
  }
}

function save(theme) {
  try {
    localStorage.setItem(KEY, theme)
  } catch {
    /* navigation privée : le choix vaut pour cette visite seulement */
  }
}

function apply(theme) {
  root().dataset.theme = theme
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', BAR_COLOR[theme])
}

export function useTheme() {
  const [theme, setTheme] = useState(currentTheme)

  // Suit le réglage de l'appareil tant que le visiteur n'a pas choisi lui-même.
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const onChange = (e) => {
      if (readSaved()) return
      const t = e.matches ? 'dark' : 'light'
      apply(t)
      setTheme(t)
    }
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  /** Bascule le mode. `event` (le clic) sert de point de départ au cercle qui dévoile le nouveau mode. */
  const toggle = useCallback((event) => {
    const next = currentTheme() === 'dark' ? 'light' : 'dark'
    save(next)
    const change = () => {
      apply(next)
      setTheme(next)
    }

    if (reduceMotion) return change()

    // Navigateurs récents : cercle qui s'agrandit depuis le bouton.
    if (document.startViewTransition) {
      const x = event?.clientX ?? window.innerWidth - 40
      const y = event?.clientY ?? 36
      const r = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y))
      const transition = document.startViewTransition(change)
      transition.ready
        .then(() =>
          root().animate(
            { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${r}px at ${x}px ${y}px)`] },
            { duration: 650, easing: 'cubic-bezier(.22,.7,.12,1)', pseudoElement: '::view-transition-new(root)' },
          ),
        )
        .catch(() => {})
      return
    }

    // Autres navigateurs : fondu des couleurs.
    root().classList.add('theme-fade')
    change()
    setTimeout(() => root().classList.remove('theme-fade'), 400)
  }, [])

  return { theme, toggle }
}
