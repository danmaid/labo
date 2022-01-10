import { Router } from 'express'
import { Resource } from './Resource'
import { Store } from './Store'
import { v4 as uuid } from 'uuid'

export default function (): Router {
  const memos = new Resource()
  const store = new Store()
  const router = Router()
  router.get('/', (req, res) => {
    res.json(store.items)
  })

  router.post('/', (req, res) => {
    const id = uuid()
    store.set(id, req.body)
    this.emit('added', id, item)
    res.json(store.add(req.body))
  })

  router.get('/:id', (req, res) => {
    res.json(store.get(req.params.id))
  })

  router.put('/:id', (req, res) => {
    store.update(req.params.id, req.body)
    res.send()
  })

  router.delete('/:id', (req, res) => {
    const result = store.remove(req.params.id)
    res.status(result ? 200 : 404).send()
  })

  return router
}
