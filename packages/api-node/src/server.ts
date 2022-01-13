import { createServer } from 'http'
import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import { WebSocket, WebSocketServer } from 'ws'
import { Store } from './Store'

const app = express()
export const server = createServer(app)
const wss = new WebSocketServer({ server })
const store = new Store()

async function broadcast(data: any) {
  const message = JSON.stringify(data)
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) client.send(message)
  })
}

app.use(helmet())
app.use(cors())
app.use(express.json())

app
  .route('/:id')
  .put(async ({ params: { id }, body }, res) => {
    store.set(id, body)
    broadcast({ ...body, id })
    res.sendStatus(200)
  })
  .get(async ({ params: { id } }, res) => {
    const item = store.get(id)
    item ? res.json(item) : res.sendStatus(404)
  })
  .delete(async ({ params: { id } }, res) => {
    store.delete(id) ? res.sendStatus(200) : res.sendStatus(404)
  })

app.route('/').get((req, res) => {
  const items = [...store].map(([id, item]) => ({ ...item, id }))
  res.json(items)
})
