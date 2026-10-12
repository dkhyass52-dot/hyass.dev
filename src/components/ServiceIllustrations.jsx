/*
 * Petits dessins animés des services. Les couleurs viennent de la carte (variable --c), les animations de styles/services.css.
 */

const Front = () => (
  <svg viewBox="0 0 240 140" className="ill" aria-hidden="true">
    <rect x="30" y="14" width="180" height="112" rx="8" className="ln0" />
    <path d="M30 32h180" className="ln0" />
    <circle cx="42" cy="23" r="2.5" className="dt" />
    <circle cx="51" cy="23" r="2.5" className="dt" />
    <circle cx="60" cy="23" r="2.5" className="dt" />
    <rect pathLength="1" x="44" y="44" width="78" height="8" rx="4" className="b b1" />
    <rect pathLength="1" x="44" y="58" width="56" height="6" rx="3" className="b b2" />
    <rect pathLength="1" x="44" y="72" width="38" height="13" rx="6.5" className="b b3 acc" />
    <rect pathLength="1" x="136" y="44" width="60" height="42" rx="5" className="b b4" />
    <path pathLength="1" d="M140 82l16-18 12 12 8-8 16 14" className="b b4" />
    <rect pathLength="1" x="44" y="96" width="46" height="20" rx="4" className="b b5" />
    <rect pathLength="1" x="97" y="96" width="46" height="20" rx="4" className="b b6" />
    <rect pathLength="1" x="150" y="96" width="46" height="20" rx="4" className="b b7" />
    <path d="M150 74l7 16 3-7 7-3z" className="cur" />
  </svg>
)

const Back = () => (
  <svg viewBox="0 0 240 140" className="ill" aria-hidden="true">
    <rect x="16" y="46" width="58" height="38" rx="4" className="ln0" />
    <path d="M8 90h74" className="ln0" />
    <path d="M166 40c0-6 30-6 30 0v60c0 6-30 6-30 0z" className="ln0" />
    <path d="M166 40c0 6 30 6 30 0M166 60c0 6 30 6 30 0M166 80c0 6 30 6 30 0" className="ln0" />
    <path d="M78 58C110 30 140 30 162 50" className="ln1" />
    <path d="M162 82C140 104 110 104 78 76" className="ln1" />
    <text x="104" y="30" className="tx">requête</text>
    <text x="104" y="118" className="tx">réponse</text>
    <circle r="4" className="pk">
      <animateMotion dur="2.2s" repeatCount="indefinite" path="M78 58C110 30 140 30 162 50" />
    </circle>
    <circle r="4" className="pk g">
      <animateMotion dur="2.2s" begin="1.1s" repeatCount="indefinite" path="M162 82C140 104 110 104 78 76" />
    </circle>
    <rect x="24" y="54" width="26" height="4" rx="2" className="fl" />
    <rect x="24" y="63" width="40" height="4" rx="2" className="fl o" />
    <rect x="24" y="72" width="18" height="4" rx="2" className="fl" />
  </svg>
)

const Ship = () => (
  <svg viewBox="0 0 240 140" className="ill" aria-hidden="true">
    <path d="M78 78a20 20 0 0 1 6-39 28 28 0 0 1 52-6 22 22 0 0 1 26 22 18 18 0 0 1-4 35H86" className="ln0" />
    <g className="up">
      <path d="M120 92V52M106 66l14-14 14 14" className="ln1" />
    </g>
    <rect x="62" y="106" width="116" height="8" rx="4" className="trk" />
    <rect x="62" y="106" width="116" height="8" rx="4" className="bar" />
    <circle cx="194" cy="110" r="9" className="ok" />
    <path d="M189 110l4 4 7-8" className="okm" />
  </svg>
)

const illustrations = { front: Front, back: Back, ship: Ship }

export default function ServiceIllustration({ name }) {
  const Ill = illustrations[name] || Front
  return <Ill />
}
