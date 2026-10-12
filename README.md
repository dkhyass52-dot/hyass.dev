# Portfolio · Hyacinthe Dossakpedji

Site portfolio de Hyacinthe Dossakpedji, développeur web full stack à Abomey-Calavi (Bénin).

Le site a un style éditorial clair et coloré, avec des annotations au stylo. On y trouve :

- un accueil sur la photo du setup, avec un titre dont un mot change ;
- deux bandeaux croisés qui défilent ;
- une section « À propos » en grille de cartes (bento) ;
- des services illustrés et animés ;
- les projets en accordéon, avec un aperçu qui suit la souris ;
- une méthode en 4 étapes, les compétences, un formulaire de contact et un grand prénom en pied de page ;
- un mode clair et un mode sombre (bouton lune / soleil dans le menu).

**Technologies :** React 18 · Vite 5 · Tailwind CSS 3 · GSAP (ScrollTrigger)

---

## 1. Lancer le projet

Il faut [Node.js](https://nodejs.org) 18 ou plus récent.

```bash
npm install      # installe les dépendances (une seule fois)
npm run dev      # lance le site en local sur http://localhost:5173
```

Autres commandes :

```bash
npm run build    # crée la version finale optimisée dans le dossier dist/
npm run preview  # affiche la version finale en local pour vérifier
```

## 2. Modifier le contenu

Tout le texte est dans `src/data/`. Tu n'as presque jamais besoin de toucher aux composants.

| Fichier | Ce qu'il contient |
|---|---|
| `src/data/site.js` | Nom, rôle, e-mail, téléphone, liens (WhatsApp, GitHub, LinkedIn, CV), titres des sections, accueil (mots qui défilent et leurs couleurs), bandeaux, À propos (phrases, chiffres, stack, points forts), services, étapes de la méthode, compétences, choix du formulaire |
| `src/data/projects.js` | La liste des projets : nom, couleur, type, technologies, description, liens démo / GitHub |

### Les liens pas encore renseignés

Un lien vide (`''`) dans `site.js` ou `projects.js` :

- **pendant le développement** (`npm run dev`), reste visible. Un clic affiche un rappel qui dit où l'ajouter ;
- **sur le site en ligne** (`npm run build`), est masqué. Les visiteurs ne voient jamais de lien mort.

Pour le **CV**, mets ton PDF dans `public/` (ex. `public/cv-hyacinthe-dossakpedji.pdf`). Indique ensuite `cv: '/cv-hyacinthe-dossakpedji.pdf'` dans `site.js`.

### Ajouter un projet

Pour chaque projet, il faut trois images dans `src/assets/projects/` :

| Fichier | Contenu |
|---|---|
| `nom-cover.webp` | maquette ordinateur + téléphone (format 16:11), pour l'aperçu au survol |
| `nom-desktop.webp` | capture de la page entière sur ordinateur (1200 px de large environ) |
| `nom-mobile.webp` | capture de la page entière sur mobile |

Importe-les en haut de `src/data/projects.js`, puis copie un bloc projet existant et adapte-le (nom, couleur, description, liens).
Dans la fiche ouverte, les deux captures défilent dans un cadre de navigateur et un téléphone.

### Changer les photos

Remplace les fichiers dans `src/assets/images/` en gardant les mêmes noms :

| Fichier | Où | Format conseillé |
|---|---|---|
| `hero-setup.jpg` | fond de l'accueil | portrait 3:4, 2000 px de large |
| `hero-setup-1000.jpg` | même photo, version légère pour mobile | 1000 px de large |
| `portrait.jpg` | grande carte « À propos » | portrait 4:5 |
| `avatar.jpg` | petite photo ronde du contact | carré, visage centré |

> La photo du setup doit t'appartenir, ou être libre de droits (par exemple sur Unsplash), avant la mise en ligne.

### Changer les couleurs

Toute la palette est dans `src/styles/base.css`, en deux jeux :

- `:root { … }` pour le **mode clair** ;
- `[data-theme='dark'] { … }` pour le **mode sombre**.

Les classes Tailwind (`border-ink`, `bg-sun`…) utilisent ces mêmes variables. Elles changent donc toutes seules avec le mode.

### Mode clair / sombre

- Au premier passage, le site suit le réglage de l'appareil du visiteur (clair ou sombre).
- Le bouton lune / soleil du menu change de mode. Le choix est mémorisé pour les visites suivantes.
- Le mode est posé dans `index.html` avant l'affichage, pour éviter tout flash blanc.
- La logique se trouve dans `src/lib/theme.js`.

## 3. Formulaire de contact

Le formulaire fonctionne de deux façons.

- **Sans configuration :** le bouton « Envoyer » ouvre l'application e-mail du visiteur avec le message déjà rempli.
- **Avec Formspree (recommandé, gratuit) :** les messages arrivent directement dans ta boîte mail.
  1. Crée un compte sur [formspree.io](https://formspree.io) et un nouveau formulaire.
  2. Copie l'identifiant (la partie après `/f/`, ex. `xyzabcde`).
  3. Copie le fichier `.env.example` en `.env` et colle l'identifiant :
     ```
     VITE_FORMSPREE_ID=xyzabcde
     ```
  4. Sur Vercel, ajoute la même variable dans *Settings → Environment Variables*.

## 4. Mettre en ligne sur Vercel

1. Mets le projet sur GitHub (nouveau dépôt, puis `git push`).
2. Sur [vercel.com](https://vercel.com), clique sur **Add New → Project** et choisis le dépôt.
3. Vercel détecte Vite tout seul : *Build command* `npm run build`, *Output directory* `dist`.
4. Clique sur **Deploy**. Chaque `git push` met ensuite le site à jour automatiquement.

## 5. Organisation du code

```
src/
├── data/                   ← tout le contenu (à modifier)
│   ├── site.js
│   └── projects.js
├── assets/images/          ← photos (setup, portrait, avatar)
├── components/
│   ├── Nav.jsx                 menu du haut + menu mobile
│   ├── Hero.jsx                accueil (photo du setup, mot qui change)
│   ├── Bands.jsx               bandeaux croisés qui défilent
│   ├── About.jsx               À propos : phrases + grille de cartes
│   ├── Services.jsx            services
│   ├── ServiceIllustrations.jsx  dessins animés des services
│   ├── Projects.jsx            liste des projets, fiche dépliable, aperçu au survol
│   ├── Showcase.jsx            pages entières qui défilent (navigateur + téléphone)
│   ├── Mockups.jsx             image d'un projet (aperçu au survol)
│   ├── Process.jsx             méthode en 4 étapes
│   ├── Skills.jsx              compétences
│   ├── Contact.jsx             coordonnées + formulaire
│   ├── Footer.jsx              grand prénom + heure locale
│   ├── ScrollProgress.jsx      barre de progression en haut
│   └── ui.jsx                  petites briques (boutons-liens, copier, notifications, stylo…)
├── lib/
│   ├── motion.js           GSAP, préférences de l'appareil, défilement vers les ancres
│   ├── theme.js            mode clair / sombre
│   └── links.js            règle des liens vides (dev / en ligne)
├── styles/                 ← un fichier CSS par section
└── index.css               ← point d'entrée des styles (Tailwind + sections)
```

Les mises en page simples utilisent les classes Tailwind directement dans les composants. Les éléments propres au design (stylo, surligneur, cartes, maquettes, animations) ont leurs styles dans `src/styles/`.

## Accessibilité

- Si le visiteur a activé « Réduire les animations » sur son appareil, le site s'affiche sans animations.
- Navigation au clavier, textes alternatifs sur les photos, menu mobile accessible.
