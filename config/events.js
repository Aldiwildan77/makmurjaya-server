const EventEmitter = require('events')
const events = new EventEmitter()

// List for events
const DB_CONNECTED = 'dbConn'
const SMTP_CONNECTED = 'smtpConn'

module.exports = {
  events,
  DB_CONNECTED,
  SMTP_CONNECTED
}