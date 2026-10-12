/*
 * Les projets affichés dans la section « Projets ».
 *
 * - color  : la couleur du projet (fond au survol, pastille, contour de l'aperçu).
 * - mockup : la maquette animée utilisée tant qu'il n'y a pas de vraie capture
 *            ('hotel', 'portfolio', 'expenses', 'freshjoy' ou 'stream').
 * - image  : une vraie capture d'écran (format 16:11 idéalement). Si elle est renseignée, elle remplace la maquette.
 *            Exemple : import hotelSeguro from '../assets/images/hotel-seguro.webp'  puis  image: hotelSeguro
 * - demo / github : liens. Un lien vide ('') est masqué sur le site en ligne.
 */

export const projects = [
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
