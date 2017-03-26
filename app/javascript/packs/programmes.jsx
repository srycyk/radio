
import React from 'react'
import ReactDOM from 'react-dom'

import Programme from 'packs/programme.jsx'

import ShowCase from 'packs/show_case.js'

export default class Programmes extends React.Component {
  constructor() {
    super();

    this.state = {
      shows: []
    }

    new ShowCase(this.setShows().bind(this)).get()
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

