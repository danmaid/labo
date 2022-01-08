import { WebSocket, WebSocketServer } from 'ws'
import express from 'express'
import helmet from 'helmet'
import { createServer } from 'http'
import { Stream } from './Stream'
import cors from 'cors'

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

server.listen(6900)
