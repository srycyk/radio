
import React from 'react'
import ReactDOM from 'react-dom'

import ShowFetch from 'packs/utils/show_fetch.js'
import ShowCase from 'packs/utils/show_case.js'

import ShowLinksByStation from 'packs/components/show_links_by_station.jsx'
import Shows from 'packs/components/shows.jsx'

export default class ShowWindow extends React.Component {
  constructor() {
    super();

    this.showCase = new ShowCase(this.setStateAttribute('shows'))

    this.state = { station: 'radio4', date: 'today',
                   shows: [], station_info: [] }

    this.getStations()

    this.getShows()
  }

  getStations() {
    new ShowFetch(this.setStateAttribute('station_info'), 'station_info').get()
  }

  getShows() {
    this.showCase.get(this.state.station, this.state.date)
  }

  setStateAttribute(name) {
    return data => this.setState({[name]: data})
  }

  setStationAndDate(station, date) {
    this.setState({ station: station, date: date }, () => this.getShows())
  }

  render() {
    return (
      <div className="show-window">
        <ShowLinksByStation onClick={this.setStationAndDate.bind(this)}
                            station_info={this.state.station_info} />

        <Shows station={this.state.station}
               date={this.state.date}
               shows={this.state.shows}
               station_info={this.state.station_info}
               onClick={this.setStationAndDate.bind(this)} />
      </div>
    );
  }
}

