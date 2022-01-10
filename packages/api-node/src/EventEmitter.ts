import { EventEmitter as EE } from 'events'

export class EventEmitter extends EE {
  emit(eventName: string | symbol, ...args: any[]): boolean {
    return super.emit(eventName, ...args)
  }
}
