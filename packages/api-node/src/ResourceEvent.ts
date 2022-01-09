import { EventEmitter } from 'events'

export class ResourceEvent<T> {
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
  
  