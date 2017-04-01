
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
    return this.yyyymmdd(this.timeShift(1))
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
  },

  currentDateTime() {
    return this.currentDate() + ' ' + this.currentTime()
  },

  currentDate() {
    return this.now().toDateString()
  },

  currentTime() {
    return this.now().toLocaleTimeString().substr(0, 5)
  },

  dateRange(ceiling=8, floor=-1) {
    let dates = []

    for (let i = floor; i < ceiling; i++)
      dates.push(this.yyyymmdd(this.timeShift(i)))

    return dates
  },

  timeShift(numDays) {
    return new Date(this.now().getTime() + this.milliDay(numDays))
  },

  milliDay(numDays) {
    return numDays * 24 * 60 * 60 * 1000
  },

  linkDate(date) {
    return date === this.today() ? 'Today' :
           date === this.tomorrow() ? 'Tomorrow' : date
  }
}

export default ShowTime
