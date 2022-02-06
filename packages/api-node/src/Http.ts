import { Server, IncomingMessage, ServerResponse } from 'http'
import { WebSocket, WebSocketServer } from 'ws'
import { v4 as uuid } from 'uuid'
import { Core, SimpleIO } from './Core'

export type HttpRequest = {
  /** Request ID (Generated) */
  request: string
  /** HTTP Version */
  http: IncomingMessage['httpVersion']
} & Pick<IncomingMessage, 'method' | 'url' | 'headers'>

export type HttpRequestBody = {
  request: HttpRequest['request']
  body: any
}

export interface ResponseBody {
  request: HttpRequest['request']
  result: any
}

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
  #io: SimpleIO

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
    const id = uuid()
    const { httpVersion, method, url, headers } = req
    super.emit<HttpRequest>({ request: id, http: httpVersion, method, url, headers })
    this.#io.on((event) => {
      
    })

    let body = ''
    req.on('data', (chunk) => {
      body += chunk
    })
    req.on('end', () => {
      if (body) super.emit<HttpRequestBody>({ request: id, body })
      res.writeHead(200).end()
    })

  }
}
