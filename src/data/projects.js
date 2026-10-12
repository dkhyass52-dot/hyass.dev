import apaiCover from '../assets/projects/apai-cover.webp'
import apaiDesktop from '../assets/projects/apai-desktop.webp'
import apaiMobile from '../assets/projects/apai-mobile.webp'
import tchaibouCover from '../assets/projects/tchaibou-cover.webp'
import tchaibouDesktop from '../assets/projects/tchaibou-desktop.webp'
import tchaibouMobile from '../assets/projects/tchaibou-mobile.webp'
import seguroCover from '../assets/projects/seguro-cover.webp'
import seguroDesktop from '../assets/projects/seguro-desktop.webp'
import seguroMobile from '../assets/projects/seguro-mobile.webp'
import cermaCover from '../assets/projects/cerma-cover.webp'
import cermaDesktop from '../assets/projects/cerma-desktop.webp'
import cermaMobile from '../assets/projects/cerma-mobile.webp'
import portfolioCover from '../assets/projects/portfolio-cover.webp'
import portfolioDesktop from '../assets/projects/portfolio-desktop.webp'
import portfolioMobile from '../assets/projects/portfolio-mobile.webp'

/*
 * Les projets affichés dans la section « Projets », dans l'ordre (le premier est ouvert au départ).
 *
 * - color  : la couleur du projet (fond au survol, pastille, contour de l'aperçu).
 * - image  : l'image du projet (maquette ordinateur + téléphone, format 16:11). Utilisée pour l'aperçu au survol.
 * - pages  : { desktop, mobile } — captures de la page entière. Dans la fiche ouverte, elles défilent
 *            dans un cadre de navigateur et de téléphone (au survol sur ordinateur, toutes seules sur mobile).
 *            Sans `pages`, la fiche affiche `image` (ou, à défaut, une carte à la couleur du projet).
 * - demo   : lien du site. `live: true` affiche « Voir le site » au lieu de « Voir la démo ».
 *            null = pas de lien (projet en local) : aucun bouton n'est affiché.
 * - github : lien du code. '' = pas encore renseigné (masqué en ligne), null = sans objet (ex. site WordPress).
 *
 * Pour ajouter un projet : mets ses images dans src/assets/projects/, importe-les en haut de ce fichier,
 * puis copie un bloc ci-dessous.
 */

export const projects = [
  {
    slug: 'apai-benin',
    color: '#2C5AA0',
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
    slug: 'tchaibou-textiles',
    color: '#B8913F',
    name: 'Tchaïbou Textiles',
    kind: 'E-commerce',
    stack: ['WordPress', 'WooCommerce'],
    description:
      "La boutique en ligne de Tchaïbou Textiles, une marque de tissus haut de gamme installée à Calavi. Catalogue par matière (Bazin, Lin, Velours, Brocart), nouveautés, vente au détail et en gros, paiement par Mobile Money ou carte bancaire et livraison au Bénin comme à l'international.",
    image: tchaibouCover,
    pages: { desktop: tchaibouDesktop, mobile: tchaibouMobile },
    demo: 'https://hyacinthe.sacomdigitalagency.com',
    live: true,
    github: null,
  },
  {
    slug: 'cerma-microfinance',
    color: '#1B7A7A',
    name: 'CERMA Microfinance',
    kind: 'Site vitrine',
    stack: ['WordPress'],
    description:
      "Le site de CERMA Microfinance, une institution de microfinance au Bénin. Il présente ses solutions de crédit et d'épargne, ses chiffres clés et son accompagnement, avec des témoignages de clients et un accès direct à la demande de crédit.",
    image: cermaCover,
    pages: { desktop: cermaDesktop, mobile: cermaMobile },
    demo: 'https://cermamicrofinance.sacomdigitalagency.com',
    live: true,
    github: null,
  },
  {
    slug: 'hotel-seguro',
    color: '#1F7A62',
    name: 'Hotel Seguro',
    kind: 'Application web',
    stack: ['PHP', 'Tailwind CSS'],
    description:
      "Le site d'un hôtel haut de gamme avec réservation en ligne : recherche de disponibilités par dates et par chambre, présentation des chambres et suites, services et avis clients. Un espace d'administration permet de tout gérer : chambres, réservations et contenu du site.",
    image: seguroCover,
    pages: { desktop: seguroDesktop, mobile: seguroMobile },
    demo: null, // projet en local, pas encore en ligne
    github: '',
  },
  {
    slug: 'portfolio',
    color: '#6E4BF2',
    name: 'Portfolio',
    kind: 'Site personnel',
    stack: ['React', 'Vite', 'Tailwind CSS', 'GSAP'],
    description:
      "Le site que vous êtes en train de visiter. Un portfolio éditorial et coloré construit avec React, Vite et Tailwind CSS : animations au défilement avec GSAP, mode clair et mode sombre, projets présentés dans des maquettes qui défilent et formulaire de contact.",
    image: portfolioCover,
    pages: { desktop: portfolioDesktop, mobile: portfolioMobile },
    demo: 'https://hyass-dev.vercel.app',
    live: true,
    github: 'https://github.com/dkhyass52-dot/hyass.dev',
  },
]
