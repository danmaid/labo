import { Server } from 'http'
import { WebSocket, WebSocketServer } from 'ws'
import core from './core'
import { v4 as uuid } from 'uuid'

export const server = new Server()
server.on('listening', () => {
  console.info('listening', server.address())
})
server.on('connection', (socket) => {
  console.debug('connection')
  server.getConnections((err, count) => {
    console.debug('count', count)
  })
  socket.on('close', () => {
    console.debug('close')
  })
})
server.on('close', () => {
  console.debug('close')
})
server.on('request', (req, res) => {
  console.debug('request')
  const id = uuid()
  const { httpVersion, method, url, headers } = req
  core.emit({ request: id, http: httpVersion, method, url, headers })

  let body: any
  req.on('data', (chunk) => {
    body += chunk
  })
  req.on('end', () => {
    if (body) core.emit({ request: id, body })
    res.writeHead(200).end()
  })
})

const wss = new WebSocketServer({ server })
core.on(async (event) => {
  const message = JSON.stringify(event)
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) client.send(message)
  })
})
