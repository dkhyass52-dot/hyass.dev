/*
 * Tout le texte du site est ici.
 * Astuce : « \u00a0 » est une espace insécable (avant « : ? ! » en français, pour éviter un retour à la ligne).
 */

export const site = {
  name: 'Hyacinthe Dossakpedji',
  firstName: 'Hyacinthe',
  initials: 'HD',
  role: 'Développeur web full stack',
  city: 'Abomey-Calavi',
  location: 'Abomey-Calavi, Bénin',
  timeZone: 'Africa/Porto-Novo', // pour l'heure affichée dans le pied de page
  email: 'dkhyass52@gmail.com',
  phone: '+229 01 52 85 25 93',
  responseTime: 'Je lis chaque message et je réponds sous 24\u00a0h.',

  // Un lien vide ('') est masqué sur le site en ligne.
  // Pendant le développement (npm run dev), il reste visible et affiche un rappel.
  links: {
    whatsapp: 'https://wa.me/2290152852593',
    github: '',
    linkedin: '',
    cv: '', // ex. '/cv-hyacinthe-dossakpedji.pdf' (fichier placé dans public/)
  },
}

// Titres des sections. Pour « Méthode » et « Contact », la 2e partie est mise en valeur (couleur ou surligneur).
export const headings = {
  services: 'Ce que je peux faire pour vous',
  projects: 'Quelques projets réalisés',
  projectsNote: "cliquez sur un projet pour l'ouvrir",
  process: ['Comment on travaille', 'ensemble'],
  skills: 'Mes outils de travail',
  contact: ['Un projet en tête\u00a0?', 'Parlons-en.'],
  contactNote: 'le plus rapide',
}

export const nav = [
  { href: '#apropos', label: 'À propos' },
  { href: '#services', label: 'Services' },
  { href: '#projets', label: 'Projets' },
  { href: '#methode', label: 'Méthode' },
  { href: '#contact', label: 'Contact' },
]

export const hero = {
  greeting: ['Bonjour, je suis', 'Hyacinthe.'],
  lead: 'Je crée des',
  // Les mots qui défilent dans le titre, chacun avec sa couleur.
  words: [
    { text: 'sites vitrines', color: '#FFC83D' },
    { text: 'applications web', color: '#8FA8FF' },
    { text: 'e-commerces', color: '#FF7A4D' },
    { text: 'tableaux de bord', color: '#7FE0A8' },
  ],
  circled: 'de A à Z.',
  intro:
    "Je conçois l'interface, je développe le back-end et je mets votre projet en ligne. Mon objectif : des expériences numériques qui allient design, performance et simplicité d'utilisation.",
}

// Bandeaux croisés sous l'accueil : le bleu (devant) et le jaune (derrière).
export const bands = {
  front: ['Sites vitrines', 'Applications web', 'E-commerce', 'Tableaux de bord', 'API & bases de données'],
  back: ['Disponible pour vos projets', 'Freelance', 'React', 'Laravel', 'Abomey-Calavi', 'Bénin'],
}

export const about = {
  note: 'en deux mots\u00a0↓',
  // Chaque phrase : du texte simple, et { mark: '…', color: 'sun' | 'peach' | 'sky' | 'lilac' } pour le passage surligné.
  statements: [
    ['Passionné par le développement web, je conçois des applications ', { mark: 'modernes, performantes et intuitives.', color: 'sun' }],
    ["Je travaille avec des entreprises et des particuliers, de la première idée jusqu'au ", { mark: 'déploiement.', color: 'peach' }],
  ],
  photoAlt: 'Hyacinthe Dossakpedji, chemise blanche, appuyé sur un comptoir',
  status: 'Disponible pour vos projets',
  role:
    "Je m'occupe aussi bien de ce que vos visiteurs voient, l'interface, que de ce qui tourne derrière\u00a0: la logique, la base de données et la mise en ligne.",
  // Les chiffres qui comptent depuis zéro quand la carte apparaît.
  stats: [
    { value: 5, label: 'projets réalisés' },
    { value: 1, label: 'seul interlocuteur' },
    { value: 24, suffix: '\u00a0h', label: 'pour vous répondre' },
  ],
  // `color` : la couleur de la pastille.
  stack: [
    { name: 'React', color: '#61DAFB' },
    { name: 'Laravel', color: '#FF6A4D' },
    { name: 'Tailwind CSS', color: '#38BDF8' },
    { name: 'JavaScript', color: '#FFC83D' },
    { name: 'PHP', color: '#A78BFA' },
    { name: 'MySQL', color: '#7FE0A8' },
    { name: 'Git', color: '#F2592A' },
  ],
  stackNote: 'Front-end · Back-end · Déploiement',
  // `tone` : 'blue', 'orange' ou 'green'.
  values: [
    { title: 'Interfaces responsives', text: 'Des écrans propres sur téléphone, tablette et ordinateur.', tone: 'blue' },
    { title: 'Applications performantes', text: 'Des pages rapides et des données bien organisées.', tone: 'orange' },
    { title: 'Code propre et maintenable', text: 'Un projet facile à reprendre et à faire évoluer.', tone: 'green' },
  ],
}

// `illustration` : 'front', 'back' ou 'ship' (dessins animés dans src/components/ServiceIllustrations.jsx).
// `tone` : la couleur de la carte ('blue', 'orange' ou 'green').
export const services = [
  {
    illustration: 'front',
    tone: 'blue',
    label: 'Front-end',
    title: 'Des interfaces claires et agréables',
    text: "Création d'interfaces modernes, responsives et intuitives, qui offrent une bonne expérience à vos visiteurs.",
    tags: ['React', 'Tailwind CSS', 'Bootstrap', 'JavaScript'],
  },
  {
    illustration: 'back',
    tone: 'orange',
    label: 'Back-end',
    title: "Une base solide derrière l'écran",
    text: "Développement d'applications web avec une architecture fiable, sécurisée et évolutive\u00a0: comptes, commandes, réservations, tableaux de bord.",
    tags: ['PHP', 'Laravel', 'MySQL'],
  },
  {
    illustration: 'ship',
    tone: 'green',
    label: 'Déploiement',
    title: 'Un site en ligne, rapide et visible',
    text: 'Optimisation des performances, référencement (SEO) et mise en ligne de votre application.',
    tags: ['Git', 'GitHub', 'Vercel'],
  },
]

export const steps = [
  { title: 'On échange', text: 'Vous me présentez votre projet. Je pose des questions pour bien comprendre votre besoin et vos utilisateurs.' },
  { title: 'Je propose', text: "Je vous montre la structure du site et une maquette avant d'écrire la moindre ligne de code." },
  { title: 'Je développe', text: "Interface, back-end et base de données. Vous suivez l'avancement et donnez votre avis à chaque étape." },
  { title: 'Je mets en ligne', text: 'Déploiement, optimisation et référencement. Votre site est prêt à recevoir ses premiers visiteurs.' },
]

export const skills = [
  { title: 'Front-end', items: ['HTML5', 'CSS3', 'JavaScript', 'React', 'Tailwind CSS'] },
  { title: 'Back-end', items: ['PHP', 'Laravel', 'MySQL'] },
  { title: 'Bases de données', items: ['MySQL', 'SQL', 'Conception de BDD'] },
  { title: 'Outils', items: ['Git & GitHub', 'VS Code', 'Figma', 'ChatGPT, Claude'] },
]

// Choix proposés dans le formulaire de contact.
export const projectTypes = [
  { value: 'Site vitrine', label: 'Site vitrine' },
  { value: 'Application web', label: 'Application web' },
  { value: 'E-commerce', label: 'E-commerce' },
  { value: 'Autre', label: 'Autre chose' },
]
