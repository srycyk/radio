
import React from 'react'
import ReactDOM from 'react-dom'

import ShowTime from 'packs/utils/show_time.js'

const ShowLinksByDate = ({onClick, station, date, station_info}) => {
  function bubbleless(date) {
    return e => { e.preventDefault() ; onClick(station, date) }
  }

  function stationTitle() {
    for (let i =0; i < station_info.length; i++) {
      let [name, title] = station_info[i]

      if (name === station)
        return title
    }
    return name
  }

  function fire(func, context) {
    return ( () => func.bind(context)() )()
  }

  function linkTo(date) {
    let title = `${stationTitle()} programmes on ${ShowTime.formatDate(date)}`

    return (<a href='#' onClick={bubbleless(date)} title={title}>
             {ShowTime.linkDate(date)}
            </a>)
  }

  function li(contents, key) {
    return (
      <li key={key} style={{ padding: '3px', display: 'inline' }}>
        <small>
          {contents}
        </small>
      </li>
    )
  }

  return (
    <span className="show-links-date">
      <ul style={{ listStyle: 'none', padding: '0px 7px' }}>
        <li key={-1} style={{ padding: '0px', display: 'inline' }}>
          <strong> {stationTitle()} </strong>
          {' '}
          <em><small> {ShowTime.displayDate(date)} </small></em>
        </li>

        {ShowTime.dateRange().map( ( date, index) => li(linkTo(date), index) )}
      </ul>
    </span>
  )
}

export default ShowLinksByDate
