
import React from 'react'
import ReactDOM from 'react-dom'

import ShowTime from 'packs/utils/show_time.js'

import Show from 'packs/components/show.jsx'
import ShowLinksByDate from 'packs/components/show_links_by_date.jsx'

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

  render() {
    return (
      <div className="shows">
        <div>
          <ShowLinksByDate onClick={this.props.onClick}
                           station={this.props.station}
                           date={this.props.date}
                           station_info={this.props.station_info} />
        </div>

        {this.shows()}
      </div>
    );
  }
}

