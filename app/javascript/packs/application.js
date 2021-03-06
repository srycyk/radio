
import React from 'react'
import ReactDOM from 'react-dom'

import ShowWindow from 'packs/show_window.jsx'

function Application() {
  return <ShowWindow />
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Application />,
      document.body.appendChild(document.createElement('div')),
  )
})

