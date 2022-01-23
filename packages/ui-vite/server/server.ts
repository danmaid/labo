import { createServer } from 'http'
import express from 'express'
import { WebSocket, WebSocketServer } from 'ws'
// import { Store } from './Store'
import { createServer as createViteServer } from 'vite'
import morgan from 'morgan'
import { v4 as uuid } from 'uuid'
import { writeFile } from 'fs/promises'
import { readFileSync, mkdirSync } from 'fs'
import { resolve, dirname } from 'path'

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

// const stores = new Map<string, Store>()

// function getStore(id: string): Store {
//   const store = stores.get(id)
//   if (!store) {
//     const store = new Store(id)
//     stores.set(id, store)
//     return store
//   }
//   return store
// }

// app
//   .route('/:resource/:id')
//   .put(async ({ params: { resource, id }, body }, res) => {
//     const store = getStore(resource)
//     store.set(id, body)
//     broadcast({ ...body, id })
//     res.sendStatus(200)
//   })
//   .get(async ({ params: { resource, id } }, res) => {
//     const store = getStore(resource)
//     const item = store.get(id)
//     item ? res.json(item) : res.sendStatus(404)
//   })
//   .delete(async ({ params: { resource, id } }, res) => {
//     const store = getStore(resource)
//     store.delete(id) ? res.sendStatus(200) : res.sendStatus(404)
//   })

// app.route('/:resource').get(({ params: { resource } }, res) => {
//   const store = getStore(resource)
//   const items = [...store].map(([id, item]) => ({ ...item, id }))
//   res.json(items)
// })

class Store<T = any> {
  #nextTick = Promise.resolve()
  #file = resolve('data', 'store.json')
  #items: T[] = []

  constructor() {
    try {
      const data = readFileSync(this.#file, { encoding: 'utf-8' })
      const arr = JSON.parse(data)
      if (!Array.isArray(arr)) throw Error('invalid file contents.')
      this.#items.push(...arr)
      console.info(`datafile: ${this.#file} loaded.`)
    } catch (e) {
      console.info(`datafile: ${this.#file} not found. skip load.`, e)
    }
    mkdirSync(dirname(this.#file), { recursive: true })
  }

  splice(start: number, deleteCount?: number): T[]
  splice(start: number, deleteCount: number, ...items: T[]): T[]
  splice(start: any, deleteCount?: any, ...rest: any[]): T[] {
    const result = this.#items.splice(start, deleteCount, ...rest)
    this.#nextTick.then(() => this.save())
    return result
  }

  push(...items: T[]): number {
    const result = this.#items.push(...items)
    this.#nextTick.then(() => this.save())
    return result
  }

  async save() {
    const data = JSON.stringify(this.#items)
    await writeFile(this.#file, data, { encoding: 'utf-8' })
      .then(() => {
        console.info('saved.')
      })
      .catch((err) => {
        console.error(`save error.`, err)
        console.debug(err)
      })
  }

  find(...args: Parameters<Array<T>['find']>) {
    return this.#items.find(...args)
  }
  findIndex(...args: Parameters<Array<T>['findIndex']>) {
    return this.#items.findIndex(...args)
  }
  filter(...args: Parameters<Array<T>['filter']>) {
    return this.#items.filter(...args)
  }
  toJSON() {
    return this.#items
  }
  map(...args: Parameters<Array<T>['map']>) {
    return this.#items.map(...args)
  }
  forEach(...args: Parameters<Array<T>['forEach']>) {
    return this.#items.forEach(...args)
  }
}

const store = new Store<{ resource?: string; id?: string }>()

app
  .route('/:resource/:id')
  .get(({ params: { resource, id } }, res) => {
    const item = store.find((v) => v.resource === resource && v.id === id)
    item ? res.json(item) : res.sendStatus(404)
  })
  .put(({ params: { resource, id }, body }, res) => {
    const item = { ...body, resource, id }
    const i = store.findIndex((v) => v.resource === resource && v.id === id)
    i >= 0 ? store.splice(i, 1, item) : store.push(item)
    broadcast({ ...item, method: 'updated' })
    res.sendStatus(200)
  })
  .delete(({ params: { resource, id } }, res) => {
    const i = store.findIndex((v) =>
      resource === 'undefined' ? v.resource === undefined : v.resource === resource && v.id === id
    )
    if (i < 0) return res.sendStatus(404)
    store.splice(i, 1)
    broadcast({ resource, id, method: 'deleted' })
    res.sendStatus(200)
  })

app.get('/index.json', (req, res) => {
  console.log('/index.json')
  const map = new Map<string | undefined, number>()
  store.forEach((v) => {
    const size = map.get(v.resource) || 0
    map.set(v.resource, size + 1)
  })
  const summary: { resource?: string; size: number }[] = Array.from(map).map(([resource, size]) => ({ resource, size }))
  res.json(summary)
})

app
  .route('/:resource')
  .get(({ params: { resource } }, res) => {
    res.json(store.filter((v) => v.resource === resource))
  })
  .post(({ params: { resource }, body }, res) => {
    const id = uuid()
    const item = { ...body, resource, id }
    store.push(item)
    broadcast({ ...item, method: 'created' })
    res.status(201).json(id)
  })

app
  .route('/')
  .get((req, res) => {
    res.json(store)
  })
  .post(({ body }, res) => {
    const id = uuid()
    const item = { ...body, id }
    store.push(item)
    broadcast({ ...item, method: 'created' })
    res.status(201).json(id)
  })
