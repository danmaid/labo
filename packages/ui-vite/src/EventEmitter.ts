export class EventEmitter extends EventTarget {
  emit(eventName: string, ...args: any[]): boolean {
    const event = args ? new CustomEvent(eventName, { detail: args }) : new Event(eventName)
    return this.dispatchEvent(event)
  }
  on(eventName: string, listener: (...args: any[]) => void): this {
    this.addEventListener(eventName, (e: Event | CustomEvent) => {
      return 'detail' in e ? listener(...e.detail) : listener()
    })
    return this
  }
  off(eventName: string, listener: (...args: any[]) => void): this {
    this.removeEventListener(eventName, listener)
    return this
  }
}
