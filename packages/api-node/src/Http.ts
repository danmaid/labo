import { Server, IncomingMessage, ServerResponse } from 'http'
import { WebSocket, WebSocketServer } from 'ws'
import { v4 as uuid } from 'uuid'
import { Core, SimpleIO } from './Core'
import { HttpRequest, RequestBody, ResponseBody } from 'types'

/**
 * HTTP Protocol adapter
 *
 * Client -> request -> output
 * Client(WebSocket) -> JSON.parse -> output
 * input -> JSON.stringify -> Client(WebSocket)
 *
 * HTTP Server listen on :6900
 */
export class Http extends Core implements SimpleIO {
  server: Server
  wss: WebSocketServer
  #io: Core

  constructor() {
    super()
    const server = new Server()
    const wss = new WebSocketServer({ server })
    const io = new Core()
    wss.on('connection', (ws) => this.onconnection(ws))
    io.on((event) => this.onmessage(event))
    server.on('request', (req, res) => this.onrequest(req, res))
    server.listen(6900, () => {
      console.info('HTTP Server started.', server.address())
    })
    this.#io = io
    this.wss = wss
    this.server = server
  }

  emit(message: any) {
    this.#io.emit(message)
  }

  onconnection(ws: WebSocket) {
    console.debug('>>onconnection')
    ws.on('message', (data) => {
      try {
        super.emit(JSON.parse(data.toString()))
      } catch (e) {
        console.error(e)
        console.error('invalid message received.', data)
      }
    })
  }

  onmessage(message: any) {
    console.debug('>>onmessage')
    const serialized = JSON.stringify(message)
    this.wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) client.send(serialized)
    })
  }

  onrequest(req: IncomingMessage, res: ServerResponse) {
    console.debug('>>onrequest')
    // CORS
    const allowOrigins = ['http://localhost:3000']
    if (req.headers.origin && allowOrigins.includes(req.headers.origin)) {
      res.setHeader('Access-Control-Allow-Origin', req.headers.origin)
      res.setHeader('Access-Control-Allow-Headers', '*')
      if (req.method === 'OPTIONS') return res.writeHead(204).end()
    }
    //
    const id = uuid()
    const { httpVersion, method, url, headers } = req
    // Response
    const accept = req.headers.accept
    if (accept && ['application/json', 'application/*', '*/*'].some((v) => accept.startsWith(v))) {
      const listener = this.#io.on((event) => {
        if (!(typeof event === 'object' && event.request === id && 'result' in event)) return
        this.#io.off(listener)
        clearTimeout(timeout)
        res.writeHead(200).end(JSON.stringify(event))
      })
      const timeout = setTimeout(() => {
        this.#io.off(listener)
        res.writeHead(202).end()
      }, 5000)
    }
    //
    super.emit<HttpRequest>({ request: id, http: httpVersion, method, url, headers })

    // Body
    if (req.headers['content-type']) {
      let data = ''
      req.on('data', (chunk) => (data += chunk))
      if (req.headers['content-type'] === 'application/json') {
        req.on('end', () => {
          try {
            const body = JSON.parse(data)
            super.emit<RequestBody>({ request: id, body })
          } catch (e) {
            res.writeHead(400).end()
          }
        })
      } else {
        req.on('end', () => super.emit<RequestBody>({ request: id, body: data }))
      }
    }
  }
}
