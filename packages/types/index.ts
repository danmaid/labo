import { IncomingMessage } from 'http'

export type HttpRequest = {
  /** Request ID (Generated) */
  request: string
  /** HTTP Version */
  http: IncomingMessage['httpVersion']
} & Pick<IncomingMessage, 'method' | 'url' | 'headers'>

export type RequestBody = {
  request: HttpRequest['request']
  body: any
}

export interface ResponseBody {
  request: HttpRequest['request']
  result: any
}
