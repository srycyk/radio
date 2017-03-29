
import Fetch from 'react-fetch'

export default class ShowFetch {
  constructor(onSuccess, action='index') {
    this.onSuccess = onSuccess

    this.action = action
  }

  
  get(params={}) {
    let path = `/shows/${this.action}`

    params = { method: 'POST',
               headers: { 'Accept': 'application/json',
                          'Content-Type': 'application/json' },
               body: JSON.stringify(params) }
//console.log(params)

    fetch(path, params)
      .then(resp => resp.json())
      .then(this.onSuccess)
  }
}

