import { WebSocket, WebSocketServer } from 'ws'

const wss = new WebSocketServer({ port: 6900 })

setInterval(() => {
  const payload = JSON.stringify({ timestamp: new Date() })
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(payload)
    }
  })
}, 1000)
