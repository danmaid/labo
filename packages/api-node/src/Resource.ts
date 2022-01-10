import { EventEmitter } from 'events'
import { v4 as uuid } from 'uuid'
import { readFile, writeFile } from 'fs/promises'
import { resolve } from 'path'
import { Router } from 'express'

class ResourceEvent<T> {
  #emitter = new EventEmitter()

  emit(eventName: 'added', id: string, item: T): boolean
  emit(eventName: 'updated', id: string, item: T): boolean
  emit(eventName: 'removed', id: string): boolean
  emit(eventName: string, ...args: any[]): boolean {
    return this.#emitter.emit(eventName, ...args)
  }

  on(eventName: 'added', listener: (id: string, item: T) => void): this
  on(eventName: 'updated', listener: (id: string, item: T) => void): this
  on(eventName: 'removed', listener: (id: string) => void): this
  on(eventName: string | symbol, listener: (...args: any[]) => void): this {
    this.#emitter.on(eventName, listener)
    return this
  }

  once(eventName: 'added', listener: (id: string, item: T) => void): this
  once(eventName: 'updated', listener: (id: string, item: T) => void): this
  once(eventName: 'removed', listener: (id: string) => void): this
  once(eventName: string | symbol, listener: (...args: any[]) => void): this {
    this.#emitter.once(eventName, listener)
    return this
  }

  off(eventName: 'added', listener: (id: string, item: T) => void): this
  off(eventName: 'updated', listener: (id: string, item: T) => void): this
  off(eventName: 'removed', listener: (id: string) => void): this
  off(eventName: string | symbol, listener: (...args: any[]) => void): this {
    this.#emitter.off(eventName, listener)
    return this
  }
}

export class Resource<T extends Record<string, unknown>> extends ResourceEvent<T> {
  #items = new Map<string, T>()
  #nextTick: Promise<void>
  datafile: string

  constructor(public name: string = 'items') {
    super()
    this.datafile = process.env.DATA_PATH ? resolve(process.env.DATA_PATH, name) : resolve(name)
    this.#nextTick = this.load()
  }

  add(item: T): string {
    const id = uuid()
    this.#items.set(id, item)
    this.emit('added', id, item)
    this.#nextTick.then(this.save)
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

  async load() {
    // const data = await readFile(this.datafile, { encoding: 'utf-8' })
    // const parsed = JSON.parse(data)
  }

  async save() {
    const d = JSON.stringify(this.#items)
    console.log(d)
  }
}

export function createResourceRoute(): Router {
  return Router()
}