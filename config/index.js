const configConfiguration = require('./config'),
  eventConfiguration = require('./events')

module.exports = {
  ...configConfiguration,
  ...eventConfiguration
}