const EventEmitter = require('events')
const events = new EventEmitter()

// List for events
const DB_CONNECTED = 'dbConn',
  SMTP_CONNECTED = 'smtpConn',
  GRAPHQL = 'graphqlSetup',
  DB_FORCED = 'dbForced'

module.exports = {
  events,
  DB_CONNECTED,
  SMTP_CONNECTED,
  GRAPHQL,
  DB_FORCED
}