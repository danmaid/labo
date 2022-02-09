import core from './Core'
import { v4 as uuid } from 'uuid'

export class TimeoutError extends Error { name = 'TimeoutError' }

/**
 * Async Executor
 * Core I/O
 *   Input: { ...event, exec_id }
 *   Output: { result, exec_id }
 * 
 * @param event 
 * @param timeout 
 * @returns result
 */
export function exec(event?: Record<string, any>, timeout = 5000): Promise<any> {
  return new Promise((resolve, reject) => {
    const id = uuid()
    const timer = setTimeout(() => {
      core.off(listener)
      reject(new TimeoutError('exec timed out.'))
    }, timeout)
    const listener = core.on((event) => {
      if (!('result' in event && event.exec_id === id)) return
      core.off(listener)
      clearTimeout(timer)
      resolve(event.result)
    })
    core.emit({ ...event, exec_id: id })
  })
}
