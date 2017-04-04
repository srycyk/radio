
import React from 'react'
import ReactDOM from 'react-dom'

import ShowTime from 'packs/utils/show_time.js'

const ShowLinksByStation = ({onClick, station_info}) => {
  const bubbleless = station => e => { e.preventDefault() ; onClick(station) }

  function li(contents, key) {
    return (<li key={key} style={{ padding: '10px', display: 'inline' }}>
              {contents}
            </li>)
  }

  function linkTo(station, title) {
    let link_title = `Programmes for rest of day on ${title}`

    return (<a href='#' onClick={bubbleless(station)} title={link_title}>
              {title}
            </a>)
  }

  function link(station, title, index) {
    return li(linkTo(station, title), index)
  }

  return (
    <div className="show-links-station">
      <ul style={{ listStyle: 'none', padding: '0px 7px' }}>
        <li key={-1} style={{ padding: '0px', display: 'inline' }}>
          <em>
            <small>
              {ShowTime.currentDateTime()}
            </small>
          </em>
        </li>

        {station_info.map( ([name, title], index) => link(name, title, index) )}
      </ul>
    </div>
  )
}

export default ShowLinksByStation
