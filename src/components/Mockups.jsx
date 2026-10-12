import portrait from '../assets/images/portrait.jpg'

/*
 * Maquettes animées des projets, en attendant de vraies captures d'écran.
 * Chaque maquette est dessinée en HTML/CSS (styles dans src/styles/mockups.css).
 */

const Browser = ({ children }) => (
  <div className="mk">
    <div className="mk-browser">
      <div className="bar">
        <i />
        <i />
        <i />
        <u />
      </div>
      <div className="scr">{children}</div>
    </div>
  </div>
)

// Calendrier de l'hôtel : 1 = réservé, 2 = en attente.
const CALENDAR = '0120001000102001000022011110'

const mockups = {
  hotel: {
    cls: 'm-hotel',
    body: (
      <>
        <div>
          <div className="ttl">
            HOTEL
            <br />
            SEGURO
            <small>RÉSERVEZ VOTRE SÉJOUR</small>
          </div>
          <div className="room" />
        </div>
        <div className="cal">
          <b>OCTOBRE · CHAMBRES</b>
          {[...CALENDAR].map((c, i) => (
            <i key={i} className={c === '1' ? 'b' : c === '2' ? 'h' : undefined} />
          ))}
        </div>
      </>
    ),
  },
  portfolio: {
    cls: 'm-port',
    body: (
      <>
        <div>
          <div className="h">
            Hyacinthe Dossakpedji<span>Développeur Full Stack</span>
          </div>
          <div className="b">
            <i />
            <i />
          </div>
        </div>
        <div className="ph" style={{ backgroundImage: `url(${portrait})` }} />
      </>
    ),
  },
  expenses: {
    cls: 'm-exp',
    body: (
      <>
        <div className="kpi">
          Solde<b>184 500 F</b>
        </div>
        <div className="kpi">
          Dépenses<b>62 300 F</b>
        </div>
        <div className="kpi">
          Transactions<b>48</b>
        </div>
        <div className="chart">
          {[40, 72, 55, 90, 36, 64, 80].map((h, i) => (
            <i key={i} style={{ '--h': `${h}%` }} />
          ))}
        </div>
        <div className="donut">
          <div />
        </div>
      </>
    ),
  },
  freshjoy: {
    cls: 'm-fresh',
    body: (
      <>
        <div className="h">
          <small>FreshJoy</small>
          Le bissap qui pétille, le yaourt qui apaise.
          <br />
          <span className="cta">Commander</span>
        </div>
        <div className="bottles">
          <div className="bt r" />
          <div className="bt w" />
        </div>
      </>
    ),
  },
  stream: {
    cls: 'm-stream',
    body: (
      <>
        <div className="h">
          Vos abonnements <span>premium</span>
          <br />
          au meilleur prix
        </div>
        <div className="plans">
          {[
            ['#E50914', 'Ciné', '1 mois'],
            ['#8B7BFF', 'Musique', '3 mois'],
            ['#1DB954', 'Sport', '1 mois'],
            ['#F5A524', 'Pack', '6 mois'],
          ].map(([c, name, length]) => (
            <div key={name} className="pl" style={{ '--c': c }}>
              <i />
              {name}
              <b>{length}</b>
            </div>
          ))}
        </div>
      </>
    ),
  },
}

/** Visuel d'un projet : sa vraie capture si elle existe, sinon sa maquette animée. */
export default function ProjectVisual({ project, className = '', style }) {
  if (project.image) {
    return (
      <div className={`shot ${className}`} style={style}>
        <img src={project.image} alt={`Aperçu du projet ${project.name}`} loading="lazy" />
      </div>
    )
  }
  const m = mockups[project.mockup] || mockups.portfolio
  return (
    <div className={`shot ${m.cls} ${className}`} style={style}>
      <Browser>{m.body}</Browser>
    </div>
  )
}
