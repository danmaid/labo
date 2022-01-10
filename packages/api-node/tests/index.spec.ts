import axios from 'axios'
import { WebSocket } from 'ws'

const host = 'localhost:6900'

it(`GET http://${host} => 404`, async () => {
  const res = await axios.get(`http://${host}`).catch((err) => err.response)
  expect(res.status).toBe(404)
})

it(`GET http://${host}/memos => 200, 配列`, async () => {
  const res = await axios.get(`http://${host}/memos`).catch((err) => err.response)
  expect(res.status).toBe(200)
  expect(res.data).toBeInstanceOf(Array)
})

it(`WebSocket ws://${host} => connected`, (done) => {
  const ws = new WebSocket(`ws://${host}`)
  ws.on('open', () => {
    ws.close()
    done()
  })
})

it(`WebSocket ws://${host}/memos => connected`, (done) => {
  const ws = new WebSocket(`ws://${host}/memos`)
  ws.on('open', () => {
    ws.close()
    done()
  })
})
