import { IncomingMessage } from 'http'

export type Request = { request: string /** Request ID */ }
export type RequestResponse = Request & { response: any }

export type HttpRequest = Request & {
  /** HTTP Version */
  http: IncomingMessage['httpVersion']
  method: IncomingMessage['method']
  url: IncomingMessage['url']
  headers: IncomingMessage['headers']
}

export type RequestBody = Request & { body: any }

export type FileSystemRequest = Request & {
  path: string
} & ({ action: 'read' | 'delete' } | { action: 'write'; data: any })

export function isFileSystemRequest(event: any): event is FileSystemRequest {
  if (typeof event !== 'object') return false
  if (typeof event.request !== 'string') return false
  if (typeof event.path !== 'string') return false
  if (typeof event.action !== 'string') return false
  if (!['read', 'delete', 'write'].includes(event.action)) return false
  return true
}
