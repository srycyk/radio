
//import React from 'react'
//import ReactDOM from 'react-dom'

import Fetch from 'react-fetch'

//import Programme from 'packs/programme.jsx'

export default class ShowFetch {
  constructor(onSuccess, action='index') {
    this.onSuccess = onSuccess

    this.action = action
  }

  get(params={}) {
    let path = `/shows/${this.action}`

    fetch(path, params)
      .then(resp => resp.json())
      .then(this.onSuccess)
  }
}

