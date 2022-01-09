import { ResourceEvent } from './ResourceEvent'
import { v4 as uuid } from 'uuid'
import { readFile, writeFile } from 'fs/promises'
import { resolve } from 'path'

export class Resource<T extends Record<string, unknown>> extends ResourceEvent<T> {
  #items = new Map<string, T>()
  #nextTick: Promise<void>
  datafile: string

  constructor(public name: string) {
    super()
    this.datafile = process.env.DATA_PATH
      ? resolve(process.env.DATA_PATH, name)
      : resolve(name)
    this.#nextTick = Promise.resolve()
  }

  add(item: T): string {
    const id = uuid()
    this.#items.set(id, item)
    this.emit('added', id, item)
    return id
  }

  get(id: string): T | undefined {
    return this.#items.get(id)
  }

  update(id: string, item: T): void {
    this.#items.set(id, item)
    this.emit('updated', id, item)
  }

  remove(id: string): boolean {
    const result = this.#items.delete(id)
    if (result) this.emit('removed', id)
    return result
  }

  get items(): ({ id: string } & T)[] {
    return [...this.#items].map(([id, item]) => ({ id, ...item }))
  }
}
