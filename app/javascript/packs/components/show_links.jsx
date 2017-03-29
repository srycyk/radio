
import React from 'react'
import ReactDOM from 'react-dom'

//import Programme from 'packs/programme.jsx'

const ShowLinks = ({onClick, available}) => {
  const bubbleless = station => e => { e.preventDefault() ; onClick(station) }

  function link_to(station, key) {
    return (<li key={key} style={{ padding: '5px', display: 'inline' }}>
              <a href='#' onClick={bubbleless(station)}>{station}</a>
            </li>)
  }

  return (
    <div className="show-links">
      <ul style={{ listStyle: 'none', padding: '5px' }}>
        {available.map( ([station, dates], index) => link_to(station, index) )}
      </ul>
    </div>
  )
}

export default ShowLinks
