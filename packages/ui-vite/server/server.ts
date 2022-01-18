import { createServer } from 'http'
import express from 'express'
import { WebSocket, WebSocketServer } from 'ws'
import { Store } from './Store'
import { createServer as createViteServer } from 'vite'
import morgan from 'morgan'

const app = express()
const html = express()
export const server = createServer((req, res) => {
  req.headers.accept?.includes('application/json') ? app(req, res) : html(req, res)
})
const wss = new WebSocketServer({ server })
createViteServer({ server: { middlewareMode: 'html' } }).then((vite) => {
  html.use(vite.middlewares)
})

async function broadcast(data: any) {
  const message = JSON.stringify(data)
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) client.send(message)
  })
}

html.use(morgan('combined'))
app.use(morgan('combined'))
app.use(express.json())

const stores = new Map<string, Store>()

function getStore(id: string): Store {
  const store = stores.get(id)
  if (!store) {
    const store = new Store(id)
    stores.set(id, store)
    return store
  }
  return store
}

app
  .route('/:resource/:id')
  .put(async ({ params: { resource, id }, body }, res) => {
    const store = getStore(resource)
    store.set(id, body)
    broadcast({ ...body, id })
    res.sendStatus(200)
  })
  .get(async ({ params: { resource, id } }, res) => {
    const store = getStore(resource)
    const item = store.get(id)
    item ? res.json(item) : res.sendStatus(404)
  })
  .delete(async ({ params: { resource, id } }, res) => {
    const store = getStore(resource)
    store.delete(id) ? res.sendStatus(200) : res.sendStatus(404)
  })

app.route('/:resource').get(({ params: { resource } }, res) => {
  const store = getStore(resource)
  const items = [...store].map(([id, item]) => ({ ...item, id }))
  res.json(items)
})
