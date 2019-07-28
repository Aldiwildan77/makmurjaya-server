const express = require('express')
const logger = require('morgan')
const rfs = require('rotating-file-stream')
const fs = require('fs')
const path = require('path')

const app = express()
const db = require('./models')

const {
  NODE_ENV
} = require('./config/config')

const {
  events,
  DB_CONNECTED,
  SMTP_CONNECTED
} = require('./config/events')

const {
  notFound,
  errorHandler
} = require('./middlewares')

// middlewares
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({
  extended: true
}))

// logging
const logDirectory = path.join(__dirname, 'logs')
const {
  logGenerator
} = require('./helpers/time')
const logName = NODE_ENV.substring(0, 4).toString()

fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)

const logStream = rfs(logGenerator(logName), {
  interval: '1d',
  size: '10M',
  compress: true,
  path: logDirectory
})

// events emit
events.on(DB_CONNECTED, (msg) => {
  console.log('Database ' + msg)
})

events.on(SMTP_CONNECTED, (msg) => {
  console.log('Mail ' + msg)
})

// routing here
app.get('/', (req, res, next) => {
  res.status(200)
  res.json({
    message: "Server is running 🌈"
  })
})

// error handling
app.use(notFound)
app.use(errorHandler)

module.exports = app