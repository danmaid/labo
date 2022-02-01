import { Server } from 'http'

export const server = new Server()
server.on('listening', () => {
  console.info('listening', server.address())
})
server.on('connection', (socket) => {
  console.debug('connection')
  server.getConnections((err, count) => {
    console.debug('count', count)
  })
  socket.on('close', () => {
    console.debug('close')
  })
})
server.on('close', () => {
  console.debug('close')
})
server.on('request', (req, res) => {
  console.debug('request')
})