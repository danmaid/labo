import { Core, SimpleIO } from './Core'
import { FileSystemRequest, isFileSystemRequest } from 'types'

export class Translator extends Core implements SimpleIO {
  async emit(event: any) {
    if (typeof event !== 'object') return
    // HttpRequest to FileSystemRequest
    if (typeof event.request === 'string' && typeof event.url === 'string' && typeof event.method === 'string') {
      const fsreq: Partial<FileSystemRequest> = { request: event.request }
      fsreq.path = new URL(event.url, 'http://dummy.danmaid.com').pathname
      fsreq.action =
        event.method === 'GET'
          ? 'read'
          : event.method === 'PUT'
          ? 'write'
          : event.method === 'DELETE'
          ? 'delete'
          : undefined
      if (isFileSystemRequest(fsreq)) super.emit<FileSystemRequest>(fsreq)
    }
  }
}
