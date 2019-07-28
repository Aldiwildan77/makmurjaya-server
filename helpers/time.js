const time = require('moment')

const logGenerator = (name) => {
  if (!name) return 'file.log'

  const date = new Date()

  const day = date.getDate()
  const month = date.getMonth() + 1
  const year = date.getFullYear()
  const hour = date.getHours()
  const minute = date.getMinutes()

  return year + "\-" + month + day + "\-" + hour + minute + "\-" + name + ".log"
}

module.exports = {
  logGenerator
}