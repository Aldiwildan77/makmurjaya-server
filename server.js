const http = require('http')
const app = require('./app')

const PORT = normalizePort(process.env.PORT || '5015')

// Set PORT for app
app.set('port', PORT)

// HTTP Server  
const server = http.createServer(app)
server.listen(PORT, () => console.log('Server is running at PORT ' + PORT))

// Normalize port into a number, string, or false
function normalizePort(value) {
  let port = parseInt(value, 10)

  if (isNaN(port)) return value
  if (port >= 0) return port

  return false
}