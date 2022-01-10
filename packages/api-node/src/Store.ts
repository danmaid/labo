import { writeFile } from 'fs/promises'
import { readFileSync } from 'fs'
import { resolve } from 'path'

export class Store<T extends Record<string, unknown>> extends Map<string, T> {
  #nextTick = Promise.resolve()
  #file: string

  constructor(name = 'items') {
    super()
    const filename = name + '.json'
    this.#file = process.env.DATA_DIR ? resolve(process.env.DATA_DIR, filename) : resolve(filename)
    try {
      const data = readFileSync(this.#file, { encoding: 'utf-8' })
      const arr: [string, T][] = JSON.parse(data)
      arr.forEach(([id, item]) => this.set(id, item))
      console.info(`datafile: ${this.#file} loaded.`)
    } catch (e) {
      console.info(`datafile: ${this.#file} not found. skip load.`)
    }
  }

  set(id: string, item: T): this {
    const result = super.set(id, item)
    this.#nextTick.then(() => this.save())
    return result
  }
  delete(id: string): boolean {
    const result = super.delete(id)
    this.#nextTick.then(() => this.save())
    return result
  }

  async save() {
    const data = JSON.stringify([...this.entries()])
    await writeFile(this.#file, data, { encoding: 'utf-8' }).catch((err) => {
      console.error(`save error.`, err)
      console.debug(err)
    })
  }
}
