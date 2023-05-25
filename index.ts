import path from 'path'
import http from 'http'
import express from 'express'
import { Server } from 'socket.io'

import { getConnectedOn } from './shared/getConnectedOn'

const app = express()
const server = http.createServer(app)

/**
 * @link https://stackoverflow.com/questions/59749021/socket-io-error-access-to-xmlhttprequest-has-been-blocked-by-cors-policy
 */
const io: Server = new Server(server, {
  cors: {
    origin: '*',
  },
})

/**  @description Set public directory */
app.use(express.static(path.join(__dirname, 'public')))

/**  @description this block will run when the client connects */
getConnectedOn(io)

const PORT = process.env.PORT || 3003

server.listen(PORT, () => {
  console.log(`\n\n\n---------------------------------------------`)
  console.log(`Server running on port ${PORT}`)
  console.log(`---------------------------------------------\n\n\n`)
})
