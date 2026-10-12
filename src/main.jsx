import React from 'react'
import ReactDOM from 'react-dom/client'
import '@fontsource-variable/schibsted-grotesk'
import '@fontsource-variable/caveat'
import './index.css'
import App from './App'
import { reduceMotion } from './lib/motion'

// Posé avant le premier affichage : les éléments à faire apparaître restent cachés jusqu'à leur tour.
document.documentElement.classList.add(reduceMotion ? 'no-motion' : 'js-motion')

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
