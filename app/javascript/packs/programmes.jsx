
import React from 'react'
import ReactDOM from 'react-dom'

import Fetch from 'react-fetch'

import Programme from 'packs/programme.jsx'

export default class Programmes extends React.Component {
  constructor() {
    super();

    this.state = {
      shows: []
    }

    this.fetchShows()
  }

  fetchShows(params={}) {
    let path = '/shows/index'

    fetch(path, params)
      .then(resp => resp.json())
      .then(json => this.setShowState(json))
  }

  setShowState(shows) {
    this.setState({shows: shows})
  }

  setShows() {
    return json => this.setState({shows: json})
  }

  shows() {
    return this.state.shows.map( (programme, index) =>
             <Programme key={index} programme={programme} />
           )
  }

  render() {
    return (
      <div className="programmes">
        {this.shows()}
      </div>
    );
  }
}

