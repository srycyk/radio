
import React from 'react'
import ReactDOM from 'react-dom'

import Programmes from 'packs/programmes.jsx'

function Application() {
  return <Programmes />
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Application />,
      document.body.appendChild(document.createElement('div')),
  )
})

