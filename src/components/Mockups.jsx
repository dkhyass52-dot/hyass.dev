/**
 * Visuel d'un projet : son image (maquette ordinateur + téléphone, voir src/data/projects.js)
 * ou, s'il n'en a pas encore, une carte à la couleur du projet avec son nom.
 * Utilisé pour l'aperçu qui suit la souris, et dans la fiche des projets qui n'ont pas de `pages`.
 */
export default function ProjectVisual({ project, className = '', style }) {
  return (
    <div className={`shot ${project.image ? '' : 'shot-empty'} ${className}`} style={{ '--pc': project.color, ...style }}>
      {project.image ? <img src={project.image} alt={`Aperçu du projet ${project.name}`} loading="lazy" decoding="async" /> : <span>{project.name}</span>}
    </div>
  )
}
