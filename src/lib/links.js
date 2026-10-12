/*
 * Les liens pas encore renseignés dans src/data :
 *  - pendant le développement (npm run dev) ils restent visibles et affichent un rappel ;
 *  - sur le site en ligne (npm run build) ils sont masqués, pour ne jamais montrer de lien mort.
 */
export const showMissingLinks = import.meta.env.DEV

export const isExternal = (href) => /^https?:\/\//.test(href)

/** Attributs à poser sur un lien externe. */
export const external = (href) => (isExternal(href) ? { target: '_blank', rel: 'noopener noreferrer' } : {})
