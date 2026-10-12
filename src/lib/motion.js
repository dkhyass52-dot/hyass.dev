import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export { gsap, ScrollTrigger }

// Préférences de l'appareil, lues une seule fois au chargement.
const mq = (q) => typeof window !== 'undefined' && window.matchMedia(q).matches

/** Le visiteur a demandé « Réduire les animations » : on affiche tout, sans mouvement. */
export const reduceMotion = mq('(prefers-reduced-motion: reduce)')
/** Souris ou pavé tactile (effets au survol, inclinaison, boutons magnétiques). */
export const finePointer = mq('(hover: hover) and (pointer: fine)')
/** Grand écran avec souris : aperçu flottant des projets. */
export const canPreview = mq('(hover: hover) and (min-width: 901px)')

export const isMobile = () => window.innerWidth <= 900

/** Fait apparaître un élément (les styles `.on` sont dans index.css). */
export const on = (el) => el?.classList.add('on')

/** Petit gestionnaire de minuteries, pour tout annuler proprement au démontage. */
export function timers() {
  const ids = []
  return {
    later: (fn, ms) => ids.push(setTimeout(fn, ms)),
    clear: () => ids.forEach(clearTimeout),
  }
}

/** Défilement doux vers une ancre (#projets…), en tenant compte du menu fixe. */
export function scrollToHash(hash) {
  const target = hash === '#top' ? null : document.querySelector(hash)
  if (hash !== '#top' && !target) return false
  // Sur mobile, le menu ouvert se referme en même temps : on retire sa hauteur pour arriver au bon endroit.
  const drawer = document.getElementById('drawer')?.offsetHeight || 0
  const top = target ? target.getBoundingClientRect().top + window.scrollY - 80 - drawer : 0
  window.scrollTo({ top, behavior: reduceMotion ? 'auto' : 'smooth' })
  return true
}
