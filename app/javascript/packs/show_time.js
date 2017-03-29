
const ShowTime = {
  now() {
    return new Date()
  },

  hhmm() {
    return this.now().toTimeString().substr(0, 5)
  },

  isForToday(date) {
    return (! date || date === 'now' || date === 'today')
  },

  isUpcoming(finishes, hhmm) {
    return (finishes >= hhmm)
  },

  isDayEnd(starts, finishes) {
    return (! finishes || finishes <= starts)
  },

  today() {
    return this.yyyymmdd(this.now())
  },

  tomorrow() {
    return this.yyyymmdd(new Date(this.now().getTime() + 24 * 60 * 60 * 1000))
  },

  yyyymmdd(date) {
    return date.toISOString().substr(0, 10)
  },

  convertToDate(date) {
    if (typeof date === 'string')
      return new Date(Date.parse(date))
    else
      return date
  },

  formatDate(date) {
    return this.convertToDate(date).toDateString()
  },

  displayDate(date) {
    return this.isForToday(date) ? 'upcoming' : this.formatDate(date)
  }
}

export default ShowTime
