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
    // La palette du site. Ces couleurs sont aussi exposées en variables CSS (--paper, --orange…) dans src/styles/base.css.
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: '#FFFFFF',
      paper: { DEFAULT: '#F4F5F1', 2: '#EAECE6' },
      ink: { DEFAULT: '#14181A', 2: '#4B5351', 3: '#7D8582' },
      rule: '#D5D9D2',
      // couleurs vives
      blue: '#2350D6',
      orange: '#F2592A',
      sun: '#FFC83D',
      violet: '#6E4BF2',
      green: '#0C7348',
      // pastels
      sky: '#DCE5FF',
      peach: '#FFDCCC',
      butter: '#FFE89A',
      mint: '#C4EED5',
      lilac: '#E6DEFF',
      // couleurs claires utilisées sur fond sombre (section Méthode)
      'sky-light': '#8FA8FF',
      'mint-light': '#7FE0A8',
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
