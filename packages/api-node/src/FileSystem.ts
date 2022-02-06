import { Core, SimpleIO } from './Core'
import { isFileSystemRequest, RequestResponse } from 'types'
import { resolve } from 'path'
import fs from 'fs/promises'

/**
 * File System adapter
 */
export class FileSystem extends Core implements SimpleIO {
  path = resolve('data')

  async emit(event: any) {
    if (!isFileSystemRequest(event)) return
    try {
      if (event.action === 'read') {
        const data = await fs.readFile(resolve(this.path, event.path), { encoding: 'utf-8' })
        super.emit<RequestResponse>({ request: event.request, response: data })
      }
    } catch (err) {
      console.error(err)
    }
  }
}
