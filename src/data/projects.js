import apaiCover from '../assets/projects/apai-cover.webp'
import apaiDesktop from '../assets/projects/apai-desktop.webp'
import apaiMobile from '../assets/projects/apai-mobile.webp'

/*
 * Les projets affichés dans la section « Projets », dans l'ordre (le premier est ouvert au départ).
 *
 * - color  : la couleur du projet (fond au survol, pastille, contour de l'aperçu).
 * - image  : l'image du projet (maquette ordinateur + téléphone, format 16:11). Utilisée pour l'aperçu au survol.
 * - pages  : { desktop, mobile } — captures de la page entière. Dans la fiche ouverte, elles défilent
 *            dans un cadre de navigateur et de téléphone (au survol sur ordinateur, toutes seules sur mobile).
 * - mockup : maquette animée dessinée en code, utilisée tant qu'il n'y a ni `image` ni `pages`
 *            ('hotel', 'portfolio', 'expenses', 'freshjoy' ou 'stream').
 * - demo   : lien du site. `live: true` affiche « Voir le site » au lieu de « Voir la démo ».
 * - github : lien du code. '' = pas encore renseigné (masqué en ligne), null = sans objet (ex. site WordPress).
 *
 * Pour ajouter un projet : mets ses images dans src/assets/projects/, importe-les en haut de ce fichier
 * comme pour APAI-Bénin, puis copie un bloc ci-dessous.
 */

export const projects = [
  {
    slug: 'apai-benin',
    color: '#C9963B',
    name: 'APAI-Bénin',
    kind: 'Site associatif',
    stack: ['WordPress', 'Elementor'],
    description:
      "Le site de l'Association Professionnelle des Agents Immobiliers du Bénin. Il présente l'association, ses valeurs et ses domaines d'intervention, invite les agents à devenir membres et publie des articles sur la profession.",
    image: apaiCover,
    pages: { desktop: apaiDesktop, mobile: apaiMobile },
    demo: 'https://apai-benin.org',
    live: true,
    github: null,
  },
  {
    slug: 'hotel-seguro',
    color: '#D99A1E', // couleur du projet (survol, pastille, aperçu)
    name: 'Hotel Seguro',
    kind: 'Projet académique',
    stack: [],
    description:
      "Une plateforme de réservation d'hôtel. Elle centralise la gestion des chambres, des clients et des réservations dans une seule interface.",
    mockup: 'hotel',
    image: null,
    demo: '',
    github: '',
  },
  {
    slug: 'portfolio',
    color: '#2350D6',
    name: 'Portfolio',
    kind: 'Site personnel',
    stack: ['React', 'Tailwind CSS', 'Framer Motion'],
    description: 'Mon portfolio personnel. Il présente mon parcours, mes services et mes projets, avec des animations fluides.',
    mockup: 'portfolio',
    image: null,
    demo: '',
    github: '',
  },
  {
    slug: 'gestion-depenses',
    color: '#12A06A',
    name: 'Gestion de dépenses',
    kind: 'Application web',
    stack: ['Laravel', 'MySQL', 'Bootstrap'],
    description:
      "Une application pour suivre ses dépenses. Chaque transaction est enregistrée et l'utilisateur voit où part son argent.",
    mockup: 'expenses',
    image: null,
    demo: '',
    github: '',
  },
  {
    slug: 'freshjoy',
    color: '#E8436A',
    name: 'FreshJoy',
    kind: 'Page de vente',
    stack: ['React', 'Tailwind CSS', 'Framer Motion'],
    description: 'Une page de présentation et de vente pour une marque de yaourt et de bissap, avec une interface moderne et animée.',
    mockup: 'freshjoy',
    image: null,
    demo: '',
    github: '',
  },
  {
    slug: 'streamhyass',
    color: '#6E4BF2',
    name: 'StreamHyass',
    kind: 'E-commerce',
    stack: ['Laravel', 'MySQL'],
    description: "Une boutique en ligne complète d'abonnements. Elle gère les produits, les commandes et les comptes utilisateurs.",
    mockup: 'stream',
    image: null,
    demo: '',
    github: '',
  },
]
