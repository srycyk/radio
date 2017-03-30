
import React from 'react'
import ReactDOM from 'react-dom'

import Show from 'packs/components/show.jsx'

import ShowTime from 'packs/show_time.js'

export default class Shows extends React.Component {
  shows() {
    return this.showList().map( (show, index) =>
             <Show show={show} key={index} />
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
    return (<a href='#' onClick={this.bubbleless(this.props.station, date)}
               title={`All programmes on ${ShowTime.formatDate(date)}`}>
             {text}
            </a>)
  }

  bubbleless(station, date) {
    return e => { e.preventDefault() ; this.props.onClick(station, date) }
  }

  fire(func, context) {
    return ( () => func.bind(context)() )()
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
          {this.linkTo(this.fire(ShowTime.today, ShowTime), 'Today')}
          {' '}
          {this.linkTo(this.fire(ShowTime.tomorrow, ShowTime), 'Tomorrow')}
        </h4>

        {this.shows()}
      </div>
    );
  }
}

