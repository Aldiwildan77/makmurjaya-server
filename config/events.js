const EventEmitter = require('events')
const events = new EventEmitter()

// List for events
const DB_CONNECTED = 'dbConn'
const SMTP_CONNECTED = 'smtpConn'
const GRAPHQL = 'graphqlSetup'

module.exports = {
  events,
  DB_CONNECTED,
  SMTP_CONNECTED,
  GRAPHQL
}