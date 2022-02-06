import { createServer } from 'http'
import express, { Request, Response } from 'express'
import helmet from 'helmet'
import cors from 'cors'
import { WebSocket, WebSocketServer } from 'ws'
import { Store } from './Store'
import core from './Core'
import { v4 as uuid } from 'uuid'

core.on((ev) => console.debug(ev))

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

/**
 * HTTP Request
 * Core I/O
 *   Input: { request_id, method, url, headers, body }
 *   Output: { request_id, response, body }
 * Timeout: 5000ms
 */
function handleHTTPRequest({ method, url, headers, body }: Request, res: Response) {
  const request_id = uuid()
  const timeout = setTimeout(() => {
    core.off(listener)
    res.status(504).end()
  }, 5000)
  const listener = core.on((ev: any) => {
    if (!('response' in ev && ev.request_id === request_id)) return
    core.off(listener)
    clearTimeout(timeout)
    const body = ev.body
    res.json(body)
  })
  core.emit({ request_id, method, url, headers, body })
}

app.all('*', handleHTTPRequest)

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
