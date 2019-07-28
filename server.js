const http = require('http')
const app = require('./app')
const server = http.createServer(app)

const PORT = 5015
const HOSTNAME = 'localhost'

server.listen(PORT, HOSTNAME, () => console.log('Server is running at PORT ' + PORT))