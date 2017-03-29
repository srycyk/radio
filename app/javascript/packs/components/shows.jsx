
import React from 'react'
import ReactDOM from 'react-dom'

import Programme from 'packs/programme.jsx'

import ShowTime from 'packs/show_time.js'

export default class Shows extends React.Component {
  shows() {
    return this.showList().map( (show, index) =>
             <Programme key={index} programme={show} />
           )
  }

  showList() {
    if (ShowTime.isForToday(this.props.date))
      return this.props.shows.filter(this.restOfDayFilter())
    else
      return this.props.shows
  }

  restOfDayFilter() {
    let hhmm = ShowTime.hhmm()

    return show => {
      let { starts, finishes } = show

      return (ShowTime.isUpcoming(finishes, hhmm) ||
              ShowTime.isDayEnd(starts, finishes))
    }
  }

  linkTo(date, text) {
    return (<a href='#' onClick={this.bubbleless(this.props.station, date)}>
             {text}
            </a>)
  }

  bubbleless(station, date) {
    return e => { e.preventDefault() ; this.props.onClick(station, date) }
  }

  render() {
    return (
      <div className="shows">
        <h4>
          {this.props.station}
          {' '}
          <em>
            {ShowTime.displayDate(this.props.date)}
          </em>
          {' '}
          {this.linkTo(ShowTime.today(), 'Today')}
          {' '}
          {this.linkTo(ShowTime.tomorrow(), 'Tomorrow')}
        </h4>
        {this.shows()}
      </div>
    );
  }
}

