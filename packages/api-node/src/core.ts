export class Core {
  listeners: ((event: any) => void)[] = []

  emit(event?: any): void {
    for (const listener of this.listeners) {
      listener(event)
    }
  }

  on(listener: (event: any) => void): void {
    this.listeners.push(listener)
  }

  off(listener: (event: any) => void): void {
    const index = this.listeners.indexOf(listener)
    if (index >= 0) this.listeners.splice(index, 1)
  }

  once(listener: (event: any) => void): void {
    const onceListener = (event: any) => {
      listener(event)
      this.off(onceListener)
    }
    this.listeners.push(onceListener)
  }
}
