
import ShowFetch from 'packs/show_fetch.js'

export default class ShowCase {
  constructor(onSuccess) {
    this.onSuccess = onSuccess
  }

  get(station, date) {
    date = date || 'now'

    station = station || 'all'

    if (! this[station])
      this[station] = {}

    let dateKey = this.dateToKey(date)

    if (this[station][dateKey])
      onSuccess(this[station][dateKey])
    else
      new ShowFetch(this.onSuccessCached(station, dateKey)).get({station, date})
      //new ShowFetch(this.onSuccessWithCaching.bind(this)).get({station, date})
  }

  dateToKey(date) {
    return '_' + date.replace('-', '_')
  }

  onSuccessCached(station, dateKey) {
    return json => {
      this.onSuccess(json)

      this[station][dateKey] = json
    }
  }

  xonSuccessWithCaching(json) {
    this.onSuccess(json)

    this[station][dateKey] = json
  }
}

