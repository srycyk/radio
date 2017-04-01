
import React from 'react'
import ReactDOM from 'react-dom'

const Show = ({show, index}) => {
  function ulStyle() {
    return { listStyle: 'none', padding: '0px', margin: '3px' }
  }

  function liStyle() {
    return { padding: '0px 3px', margin: '0px', display: 'inline' }
  }

  function title(show) {
    return show.on_on + ' ' + show.station
  }

  return (
    <ul className="show" key={index} style={ulStyle()}>
      <li style={liStyle()}>
        <em>
          {`${show.starts}-${show.finishes}`}
        </em>
      </li>

      <li style={liStyle()}>
        <a href={show.info_url} target='_blank' title={title(show)}>
          {show.title}
        </a>
      </li>

      <li style={liStyle()}>
        <small>
          {show.desc}
        </small>
      </li>
    </ul>
  )
}

export default Show
