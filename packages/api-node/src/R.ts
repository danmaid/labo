import { Server } from 'http'
import { WebSocket, WebSocketServer } from 'ws'
import { Express, RequestHandler } from 'express'
import { Stream } from './Stream'
import { EventEmitter } from 'events'
import { v4 as uuid } from 'uuid'
import { Store } from './Store'

export class Resource<T extends Record<string, unknown>> {
  #items: Map<string, T>
  #events = new EventEmitter()
  #stream: Stream
  wss: WebSocketServer

  constructor(public name: string, express: Express, server: Server, stream: Stream) {
    this.#items = new Store(name)
    this.#stream = stream
    express.route(`/${name}`).get(this.getList).post(this.add)
    express.route(`/${name}/:id`).get(this.get).put(this.update).delete(this.remove)
    this.wss = new WebSocketServer({ noServer: true })
    server.on('upgrade', (req, socket, head) => {
      if (req.url === `/${name}`) {
        this.wss.handleUpgrade(req, socket, head, (ws) => this.wss.emit('connection', ws, req))
      }
    })
    this.on('added', (id, item) => this.dispatch({ event: 'added', id, ...item }))
    this.on('updated', (id, item) => this.dispatch({ event: 'updated', id, ...item }))
    this.on('removed', (id) => this.dispatch({ event: 'removed', id }))
  }

  /** POST / */
  add: RequestHandler = (req, res) => {
    const id = uuid()
    const item = req.body
    this.#items.set(id, item)
    this.#events.emit('added', id, item)
    res.json(id)
  }

  /** GET /:id */
  get: RequestHandler = (req, res) => {
    res.json(this.#items.get(req.params.id))
  }

  /** PUT /:id */
  update: RequestHandler = (req, res) => {
    const id = req.params.id
    const item = req.body
    this.#items.set(id, item)
    this.#events.emit('updated', id, item)
    res.send()
  }

  /** DELETE /:id */
  remove: RequestHandler = (req, res) => {
    const id = req.params.id
    const result = this.#items.delete(id)
    if (result) this.#events.emit('removed', id)
    res.status(result ? 200 : 404).send()
  }

  /** GET / */
  getList: RequestHandler = (req, res) => {
    res.json([...this.#items].map(([id, item]) => ({ id, ...item })))
  }

  on(eventName: 'added', listener: (id: string, item: T) => void): this
  on(eventName: 'updated', listener: (id: string, item: T) => void): this
  on(eventName: 'removed', listener: (id: string) => void): this
  on(eventName: string, listener: (...args: any[]) => void): this {
    this.#events.on(eventName, listener)
    return this
  }

  async dispatch(event: { event: 'added' | 'updated' | 'removed'; id: string }): Promise<void> {
    this.wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(event))
      }
    })
    this.#stream.push({ resource: this.name, ...event })
  }
}
