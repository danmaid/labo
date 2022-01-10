import { WebSocket, WebSocketServer } from 'ws'
import express from 'express'
import helmet from 'helmet'
import { createServer } from 'http'
import { Stream } from './Stream'
import cors from 'cors'
import { Resource } from './R'

const app = express()
export const server = createServer(app)
const wss = new WebSocketServer({ noServer: true })
server.on('upgrade', (req, socket, head) => {
  if (req.url === `/`) {
    wss.handleUpgrade(req, socket, head, (ws) => wss.emit('connection', ws, req))
  }
})

const stream = new Stream()

stream.on('data', (data) => {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(data))
    }
  })
})

app.use(express.json())
app.use(helmet())
app.use(cors())

// app.post('/', (req, res) => {
//   stream.push(req.body)
//   res.send()
// })

app.all('/', (req, res, next) => {
  stream.push(req.body)
  next()
})
app.all('/', (req, res) => {
  console.log('hi', req.method, req.url, req.body)
  if ('resource' in req.body) {
    const resource = req.body.resource
    const url = req.body.id ? `/${resource}/${req.body.id}` : `/${resource}`
    console.log('to redirect', url)
    return res.redirect(308, url)
  }
  res.status(404).send()
})

app.all('/:resource/:id', (req, res, next) => {
  console.log('/:resource/:id', req.params.resource, req.params.id)
  next()
})

new Resource('memos', app, server, stream)
