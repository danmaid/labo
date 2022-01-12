import { getConnectionHeader } from './connection'

export function getRequestHeader(request: any) {
  const { method, url, httpVersion: version, headers, socket } = request
  const connection = getConnectionHeader(socket)
  return { method, url, version, headers, connection }
}
