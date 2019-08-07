const time = require('moment')

const logGenerator = name => name == null ? 'file.log' : time().format('YYYYMMDD') + '-' + name + '.log'
const timeStampToDate = stamp => time.unix(stamp).format("YYYY/DD")

module.exports = {
  logGenerator,
  timeStampToDate
}