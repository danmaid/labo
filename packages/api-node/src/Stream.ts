import { EventEmitter } from 'events'

export class Stream<T = unknown> extends EventEmitter {
  on(event: 'data', listener: (data: T) => void): this {
    return super.on(event, listener)
  }
  off(event: 'data', listener: (data: T) => void): this {
    return super.on(event, listener)
  }
  push(data: T): void {
    this.emit('data', data)
  }
}
