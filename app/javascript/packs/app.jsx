
import React from 'react'
import ReactDOM from 'react-dom'

import Programmes from 'packs/programmes.jsx'

function App() {
  return <Programmes />
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <App />,
      document.body.appendChild(document.createElement('div')),
  )
})

