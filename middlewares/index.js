const errorHandler = require('./errorHandler')
const authHandler = require('./authHandler')

module.exports = {
  ...authHandler,
  ...errorHandler
}