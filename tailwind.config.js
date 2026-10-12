/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    // Points de rupture du design (largeur minimale).
    screens: {
      xs: '521px',
      sm: '761px',
      md: '901px',
      lg: '921px',
    },
    // Les couleurs pointent vers des variables CSS : leurs valeurs (mode clair ET mode sombre)
    // sont définies dans src/styles/base.css. Changer une couleur = la changer là-bas.
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: '#FFFFFF',
      paper: { DEFAULT: 'var(--paper)', 2: 'var(--paper-2)' },
      card: 'var(--card)',
      ink: { DEFAULT: 'var(--ink)', 2: 'var(--ink-2)', 3: 'var(--ink-3)' },
      rule: 'var(--rule)',
      // couleurs vives
      blue: 'var(--blue)',
      orange: 'var(--orange)',
      sun: 'var(--sun)',
      violet: 'var(--violet)',
      green: 'var(--green)',
      // pastels
      sky: 'var(--sky)',
      peach: 'var(--peach)',
      butter: 'var(--butter)',
      mint: 'var(--mint)',
      lilac: 'var(--lilac)',
    },
    extend: {
      fontFamily: {
        sans: ['"Schibsted Grotesk Variable"', 'system-ui', '-apple-system', '"Segoe UI"', 'sans-serif'],
        hand: ['"Caveat Variable"', '"Segoe Print"', '"Bradley Hand"', 'cursive'],
      },
      spacing: {
        gut: 'var(--gut)',
      },
      transitionTimingFunction: {
        soft: 'cubic-bezier(.22,.7,.12,1)',
      },
    },
  },
  plugins: [],
}
