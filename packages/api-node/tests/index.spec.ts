import axios from 'axios'
import { WebSocket } from 'ws'
import { v4 as uuid } from 'uuid'

const host = 'localhost:6900'

it(`GET http://${host} => 200`, async () => {
  const res = await axios.get(`http://${host}`).catch((err) => err.response)
  expect(res.status).toBe(200)
  expect(res.data).toBeInstanceOf(Array)
})

it(`PUT http://${host}/:id => 200`, async () => {
  const id = uuid()
  const item = { test: 'test' }
  const res = await axios.put(`http://${host}/${id}`, item).catch((err) => err.response)
  expect(res.status).toBe(200)
  expect(res.data).toBe('OK')
})

it(`PUT->GET http://${host}/:id => 200`, async () => {
  const id = uuid()
  const item = { test: 'test', data: uuid() }
  await axios.put(`http://${host}/${id}`, item)
  const res = await axios.get(`http://${host}/${id}`)
  expect(res.status).toBe(200)
  expect(res.data).toStrictEqual(item)
})

it(`WebSocket ws://${host} => connected`, async () => {
  const ws = new WebSocket(`ws://${host}`)
  expect(ws.readyState).not.toBe(ws.OPEN)
  await new Promise((resolve) => ws.on('open', resolve))
  expect(ws.readyState).toBe(ws.OPEN)
  ws.close()
})
