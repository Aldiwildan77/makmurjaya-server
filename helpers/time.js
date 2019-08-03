const time = require('moment')

const logGenerator = name => {
  if (name == null) return 'file.log'

  const year = time().year()
  const month = time().month()
  const date = time().date()

  let logFile = year + "-" + month  + "-" + date + "-" + name + ".log"
  return  logFile
}

const timeStampToDate = stamp => time.unix(stamp).format("YYYY/DD")

module.exports = {
  logGenerator,
  timeStampToDate
}