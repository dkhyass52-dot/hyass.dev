import { Fragment, useEffect, useRef, useState } from 'react'
import { headings, projectTypes, site } from '../data/site'
import { gsap, reduceMotion } from '../lib/motion'
import { Arrow, CopyButton, LinkButton, Note } from './ui'
import avatar from '../assets/images/avatar.jpg'

// Identifiant Formspree (fichier .env). Sans identifiant, « Envoyer » ouvre l'application e-mail du visiteur.
const FORMSPREE_ID = import.meta.env.VITE_FORMSPREE_ID

export default function Contact() {
  const title = useRef(null)
  const mail = useRef(null)
  const tel = useRef(null)

  // Le grand titre grossit légèrement en arrivant.
  useEffect(() => {
    if (reduceMotion) return
    const ctx = gsap.context(() => {
      gsap.from(title.current, { scale: 0.92, transformOrigin: 'left bottom', ease: 'none', scrollTrigger: { trigger: title.current, start: 'top bottom', end: 'top 50%', scrub: true } })
    })
    return () => ctx.revert()
  }, [])

  return (
    <section className="sec wrap contact pt-0" id="contact">
      <p className="label mb-[1.4rem]">Contact</p>
      <h2 ref={title}>
        <span className="rv block">{headings.contact[0]}</span>
        <span className="rv block">
          <span className="mark sun">{headings.contact[1]}</span>
        </span>
      </h2>

      <div className="mt-[clamp(2.5rem,5vw,4rem)] grid grid-cols-1 gap-[clamp(2rem,5vw,5rem)] md:grid-cols-2">
        <div>
          <div className="ct-person fade">
            <img src={avatar} alt="" width="56" height="56" />
            <p>
              <b>{site.name}</b>
              {site.responseTime}
            </p>
          </div>
          <div className="ct-row ct-email">
            <small>E-mail</small>
            <strong ref={mail}>{site.email}</strong>
            <CopyButton text={site.email} targetRef={mail} />
            <Note>{headings.contactNote}</Note>
          </div>
          <div className="ct-row">
            <small>Téléphone et WhatsApp</small>
            <strong ref={tel}>{site.phone}</strong>
            <CopyButton text={site.phone} targetRef={tel} />
          </div>
          <div className="ct-row">
            <small>Localisation</small>
            <strong>{site.location}</strong>
          </div>
          <div className="mt-[1.6rem] flex flex-wrap gap-[.6rem]">
            <LinkButton href={site.links.github} className="btn btn-line btn-sm" missing="Lien GitHub à ajouter dans src/data/site.js">
              GitHub
            </LinkButton>
            <LinkButton href={site.links.linkedin} className="btn btn-line btn-sm" missing="Lien LinkedIn à ajouter dans src/data/site.js">
              LinkedIn
            </LinkButton>
            <LinkButton href={site.links.whatsapp} className="btn btn-line btn-sm" missing="Lien WhatsApp à ajouter dans src/data/site.js">
              WhatsApp
            </LinkButton>
          </div>
        </div>

        <div className="form-wrap fade">
          <MessageForm />
        </div>
      </div>
    </section>
  )
}

function MessageForm() {
  const [note, setNote] = useState({ type: '', text: 'Réponse sous 24 heures.' })
  const [sending, setSending] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    const form = e.currentTarget
    const f = new FormData(form)
    const name = String(f.get('name') || '').trim()
    const email = String(f.get('email') || '').trim()
    const message = String(f.get('message') || '').trim()
    const type = String(f.get('type') || '')
    if (!name || !/^\S+@\S+\.\S+$/.test(email) || !message) {
      setNote({ type: 'err', text: 'Indiquez votre nom, un e-mail valide et votre message.' })
      return
    }

    // Sans Formspree : l'application e-mail du visiteur s'ouvre avec le message déjà rempli.
    if (!FORMSPREE_ID) {
      const subject = encodeURIComponent(`Projet : ${type} · ${name}`)
      const body = encodeURIComponent(`${message}\n\n${name}\n${email}`)
      window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`
      setNote({ type: 'ok', text: 'Votre application e-mail s’ouvre avec le message prêt à envoyer.' })
      return
    }

    setSending(true)
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, type, message, _subject: `Nouveau projet : ${type}` }),
      })
      if (!res.ok) throw new Error('Formspree')
      form.reset()
      setNote({ type: 'ok', text: `Merci ${name.split(' ')[0]}, votre message est bien parti. Je vous réponds sous 24 heures.` })
    } catch {
      setNote({ type: 'err', text: `L’envoi a échoué. Écrivez-moi directement à ${site.email}.` })
    } finally {
      setSending(false)
    }
  }

  return (
    <form className="form-card" onSubmit={submit} noValidate>
      <div className="fld">
        <span>Votre projet</span>
        <div className="choices">
          {projectTypes.map((t, i) => (
            <Fragment key={t.value}>
              <input type="radio" name="type" id={`type-${i}`} value={t.value} defaultChecked={i === 0} />
              <label htmlFor={`type-${i}`}>{t.label}</label>
            </Fragment>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="fld">
          <label htmlFor="f-name">Nom complet</label>
          <input id="f-name" name="name" type="text" placeholder="Votre nom" autoComplete="name" />
        </div>
        <div className="fld">
          <label htmlFor="f-email">E-mail</label>
          <input id="f-email" name="email" type="email" placeholder="vous@exemple.com" autoComplete="email" />
        </div>
      </div>
      <div className="fld">
        <label htmlFor="f-msg">Votre message</label>
        <textarea id="f-msg" name="message" placeholder="Décrivez votre projet ou votre besoin…" />
      </div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <p className={`form-note ${note.type}`} role="status">
          {note.text}
        </p>
        <button className="btn btn-ink" type="submit" disabled={sending}>
          {sending ? 'Envoi…' : 'Envoyer le message'} <Arrow />
        </button>
      </div>
    </form>
  )
}
