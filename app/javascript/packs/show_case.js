
import ShowFetch from 'packs/show_fetch.js'

import ShowTime from 'packs/show_time.js'

export default class ShowCase {
  constructor(onSuccess) {
    this.onSuccess = onSuccess
  }

  get(station, date) {
    //date = date || 'now'

    //station = station || 'all'

    if (! this[station])
      this[station] = {}

    let dateKey = this.dateToKey(date)

    if (this[station][dateKey])
      this.onSuccess(this[station][dateKey])
    else
      new ShowFetch(this.onSuccessCached(station, dateKey)).get({station, date})
  }

  dateToKey(date) {
    if (ShowTime.isForToday(date))
      date = ShowTime.today()

    return '_' + date.replace('-', '_')
  }

  onSuccessCached(station, dateKey) {
    return json => {
      this.onSuccess(json)

      this[station][dateKey] = json
    }
  }
}

