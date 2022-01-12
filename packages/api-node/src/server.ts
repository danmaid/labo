import { WebSocket, WebSocketServer } from 'ws'
import express from 'express'
import helmet from 'helmet'
import { createServer } from 'http'
import { Stream } from './Stream'
import cors from 'cors'
import { Resource } from './R'
import { extendConnection, getConnectionHeader, getConnectionInfo } from './connection'
import { getRequestHeader } from './request'
import { v4 as uuid } from 'uuid'

const app = express()
export const server = createServer(app)
const wss = new WebSocketServer({ noServer: true })
const stream = new Stream()

stream.on('data', (data) => console.log(data))
stream.on('data', (data) => {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) client.send(JSON.stringify(data))
  })
})

server.on('connection', (socket) => {
  extendConnection(socket)
  stream.push({ event: 'connection', ...getConnectionHeader(socket), ...getConnectionInfo(socket) })

  socket.on('close', (hadError) => {
    stream.push({ event: 'close', error: hadError, connection: getConnectionHeader(socket) })
  })
})
server.on('request', (req) => stream.push({ event: 'request', ...getRequestHeader(req) }))
server.on('upgrade', (req) => stream.push({ event: 'upgrade', ...getRequestHeader(req) }))

server.on('upgrade', (req, socket, head) => {
  if (req.url === `/`) {
    wss.handleUpgrade(req, socket, head, (ws) => wss.emit('connection', ws, req))
  }
})

app.use(helmet())
app.use(cors())
app.use(express.json())

app.post('*', (req, res) => {
  const id = uuid()
  stream.push({ ...getRequestHeader(req), body: req.body, id })
  res.status(202).json(id)
})

app.all('*', (req, res) => {
  stream.push({ ...getRequestHeader(req), body: req.body })
  res.send()
})
// app.all('/', (req, res) => {
//   console.log('hi', req.method, req.url, req.body)
//   if ('resource' in req.body) {
//     const resource = req.body.resource
//     const url = req.body.id ? `/${resource}/${req.body.id}` : `/${resource}`
//     console.log('to redirect', url)
//     return res.redirect(308, url)
//   }
//   res.status(404).send()
// })

// app.all('/:resource/:id', (req, res, next) => {
//   console.log('/:resource/:id', req.params.resource, req.params.id)
//   next()
// })

// new Resource('memos', app, server, stream)
