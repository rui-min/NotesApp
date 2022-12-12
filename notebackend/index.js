// import http from "http"; // Node not perfectly supports ES6 modules

const app = require('./app')  // the actual Express application
const http = require('http')
const config = require('./utils/config')
const logger = require('./utils/logger')

const server = http.createServer(app)

server.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`);
})
