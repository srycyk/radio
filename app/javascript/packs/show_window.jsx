
import React from 'react'
import ReactDOM from 'react-dom'

import ShowFetch from 'packs/show_fetch.js'
import ShowCase from 'packs/show_case.js'

import ShowLinks from 'packs/components/show_links.jsx'
import Shows from 'packs/components/shows.jsx'

export default class ShowWindow extends React.Component {
  constructor() {
    super();

    this.showCase = new ShowCase(this.setStateAttribute('shows'))

    this.state = { station: 'radio4', date: 'now', shows: [], available: [] }

    this.getAvailable()

    this.getShows()
  }

  getAvailable() {
    new ShowFetch(this.setStateAttribute('available'), 'info').get()
  }

  getShows() {
    this.showCase.get(this.state.station, this.state.date)
  }

  setStateAttribute(name) {
    return data => this.setState({[name]: data})
  }

  setStationAndDate(station, date) {
    station = station || this.state.station

    this.setState({ station: station, date: date }, () => this.getShows())
  }

  render() {
    return (
      <div className="show-window">
        <ShowLinks onClick={this.setStationAndDate.bind(this)}
                   available={this.state.available} />

        <Shows station={this.state.station}
               date={this.state.date}
               shows={this.state.shows}
               onClick={this.setStationAndDate.bind(this)} />
      </div>
    );
  }
}

