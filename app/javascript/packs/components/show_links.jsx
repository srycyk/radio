
import React from 'react'
import ReactDOM from 'react-dom'

import ShowTime from 'packs/show_time.js'

const ShowLinks = ({onClick, available}) => {
  const bubbleless = station => e => { e.preventDefault() ; onClick(station) }

  function link_to(station, key) {
    return (<li key={key} style={{ padding: '10px', display: 'inline' }}>
              <a href='#' onClick={bubbleless(station)}
                          title={`Programmes for rest of day on ${station}`}>
                {station}
              </a>
            </li>)
  }

  return (
    <div className="show-links">
      <ul style={{ listStyle: 'none', padding: '0px 7px' }}>
        <li key={-1} style={{ padding: '0px', display: 'inline' }}>
          <em>
            <small>
              {( () => ShowTime.currentDateTime() )()}
            </small>
          </em>
        </li>

        {available.map( ([station, dates], index) => link_to(station, index) )}
      </ul>
    </div>
  )
}

export default ShowLinks
