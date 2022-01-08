import { WebSocket, WebSocketServer } from 'ws'
import express from 'express'
import helmet from 'helmet'
import { createServer } from 'http'
import { Stream } from './Stream'
import cors from 'cors'
import { Resource } from './Resource'

const app = express()
const server = createServer(app)
const wss = new WebSocketServer({ server, path: '/' })

const stream = new Stream()

stream.on('data', (data) => {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(data))
    }
  })
})

// dummy data
setInterval(() => {
  stream.push({ timestamp: new Date() })
}, 1000)

app.use(express.json())
app.use(helmet())
app.use(cors())

app.post('/', (req, res) => {
  stream.push(req.body)
  res.send()
})

const memos = new Resource()
app.get('/memos', (req, res) => {
  res.json(memos.items)
})
app.post('/memos', (req, res) => {
  res.json(memos.add(req.body))
})
app.get('/memos/:id', (req, res) => {
  res.json(memos.get(req.params.id))
})
app.put('/memos/:id', (req, res) => {
  memos.update(req.params.id, req.body)
  res.send()
})
app.delete('/memos/:id', (req, res) => {
  const result = memos.remove(req.params.id)
  res.status(result ? 200 : 404).send()
})

memos.on('added', (id, item) => stream.push({ id, ...item }))
memos.on('updated', (id, item) => stream.push({ id, ...item }))
memos.on('removed', (id) => stream.push({ id }))

server.listen(6900)
