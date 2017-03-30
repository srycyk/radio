
import React from 'react'
import ReactDOM from 'react-dom'

const Show = ({show, index}) => {
  function ulStyle() {
    return { listStyle: 'none', padding: '0px', margin: '3px' }
  }

  function liStyle() {
    return { padding: '0px 3px', margin: '0px', display: 'inline' }
  }

  return (
    <ul className="show" key={index} style={ulStyle()}>
      <li style={liStyle()}>
        <strong>
          {`${show.starts}-${show.finishes}`}
        </strong>
      </li>

      <li style={liStyle()}>
        <em>
          {show.title}
        </em>
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
