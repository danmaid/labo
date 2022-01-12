import { v4 as uuid } from 'uuid'
import { Socket } from 'net'

export function extendConnection(socket: Socket): void {
  const id = uuid()
  Object.defineProperty(socket, 'id', { value: id })
}

export function getConnectionHeader(socket: Socket | any) {
  return { id: socket.id }
}

export function getConnectionInfo(socket: Socket) {
  return {
    family: socket.remoteFamily,
    address: socket.remoteAddress,
    port: socket.remotePort,
  }
}
