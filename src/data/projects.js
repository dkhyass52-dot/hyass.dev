import apaiCover from '../assets/projects/apai-cover.webp'
import apaiDesktop from '../assets/projects/apai-desktop.webp'
import apaiMobile from '../assets/projects/apai-mobile.webp'
import tchaibouCover from '../assets/projects/tchaibou-cover.webp'
import tchaibouDesktop from '../assets/projects/tchaibou-desktop.webp'
import tchaibouMobile from '../assets/projects/tchaibou-mobile.webp'
import seguroCover from '../assets/projects/seguro-cover.webp'
import seguroDesktop from '../assets/projects/seguro-desktop.webp'
import seguroMobile from '../assets/projects/seguro-mobile.webp'

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
 *            null = pas de lien (projet en local) : aucun bouton n'est affiché.
 * - github : lien du code. '' = pas encore renseigné (masqué en ligne), null = sans objet (ex. site WordPress).
 *
 * Pour ajouter un projet : mets ses images dans src/assets/projects/, importe-les en haut de ce fichier
 * comme pour APAI-Bénin, puis copie un bloc ci-dessous.
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
