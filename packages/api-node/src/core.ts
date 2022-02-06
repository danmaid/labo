type EventListener = (event?: any) => void

export interface SimpleIO {
  emit(event?: any): void
  on(listener: EventListener): EventListener
}

export class Core implements SimpleIO {
  listeners: ((event: any) => void)[] = []

  emit<T>(event?: T): void
  emit(event?: any): void {
    for (const listener of this.listeners) {
      listener(event)
    }
  }

  on(listener: (event: any) => void): (event: any) => void {
    this.listeners.push(listener)
    return listener
  }

  off(listener: (event: any) => void): void {
    const index = this.listeners.indexOf(listener)
    if (index >= 0) this.listeners.splice(index, 1)
  }
}
