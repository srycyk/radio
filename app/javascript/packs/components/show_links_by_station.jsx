
import React from 'react'
import ReactDOM from 'react-dom'

import ShowTime from 'packs/utils/show_time.js'

const ShowLinksByStation = ({onClick, station_info}) => {
  const bubbleless = station => e => { e.preventDefault() ; onClick(station) }

  function linkTo(station, title, key) {
    let long_title = `Programmes for rest of day on ${title}`

    return (<li key={key} style={{ padding: '10px', display: 'inline' }}>
              <a href='#' onClick={bubbleless(station)} title={long_title}>
                {title}
              </a>
            </li>)
  }

  return (
    <div className="show-links-station">
      <ul style={{ listStyle: 'none', padding: '0px 7px' }}>
        <li key={-1} style={{ padding: '0px', display: 'inline' }}>
          <em>
            <small>
              {( () => ShowTime.currentDateTime() )()}
            </small>
          </em>
        </li>

        {station_info.map( ([name, title], index) => linkTo(name, title, index) )}
      </ul>
    </div>
  )
}

export default ShowLinksByStation
