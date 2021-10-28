exports.getDaysInCurrentMonth = function () {
  // instantiate a date object
  const dt = new Date()

  // dt.getMonth() will return a month between 0 - 11
  // we add one to get to the last day of the month 
  // so that when getDate() is called it will return the last day of the month
  const month = dt.getMonth() + 1
  const year = dt.getFullYear()
 
  // this line does the magic (in collab with the lines above)
  return new Date(year, month, 0).getDate()
}

exports.getDaysInYear = function () {
  const isLeap = year => new Date(year, 1, 29).getDate() === 29
  return isLeap(new Date().getFullYear()) ? 366 : 365
}