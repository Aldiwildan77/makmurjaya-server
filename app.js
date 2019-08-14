const express = require('express')
const logger = require('morgan')
const rfs = require('rotating-file-stream')
const fs = require('fs')
const path = require('path')
const graphQLHTTP = require('express-graphql')

const app = express()
const db = require('./models')

const { AUTH_TOKEN,
  NODE_ENV,
  events,
  DB_CONNECTED,
  SMTP_CONNECTED,
  GRAPHQL,
  DB_FORCED
} = require('./config')
const { logGenerator } = require('./helpers/time')
const { auth, notFound, errorHandler } = require('./middlewares')

// graphql
const graphQLSchema = require('./graphql/schema')
const graphQLResolvers = require('./graphql/resolvers')

// middlewares
app.use(express.json())
app.use(express.urlencoded({
  extended: true
}))

// logging
const logDirectory = path.join(__dirname, 'logs')
const logName = NODE_ENV.substring(0, 3).toString()
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)

const logStream = rfs(logGenerator(logName), {
  interval: '1d',
  size: '10M',
  compress: true,
  path: logDirectory
})

app.use(logger(NODE_ENV === 'production' ? 'combined' : 'dev', {
  stream: logStream
}))

// events emit
events.on(DB_CONNECTED, msg => {
  console.log('Database ' + msg)
})

events.on(SMTP_CONNECTED, msg => {
  console.log('Mail ' + msg)
})

events.on(GRAPHQL, msg => {
  console.log('GraphQL' + msg)
})

events.on(DB_FORCED, msg => {
  console.log('Database ' + msg)
})

// routing here
app.get('/', (req, res, next) => {
  res.status(200)
  res.json({
    message: "Server is running 🌈"
  })
})

// graphql routing
app.use('/api', auth, express.json(), graphQLHTTP(req => ({
  schema: graphQLSchema,
  rootValue: graphQLResolvers,
  graphiql: false,
  pretty: true,
  context: {
    SECRET_KEY: AUTH_TOKEN,
    ...req.state
  }
})))

// error handling
app.use(notFound)
app.use(errorHandler)

module.exports = app