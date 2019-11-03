import PromiseWorker from 'promise-worker'
import { Result } from '~/worker/util/executeGlpk'

let worker: Worker | undefined
let promiseWorker: PromiseWorker
let promise: Promise<any> | undefined
let isRunning = false

const init = () => {
  if (worker && promise) {
    const currentWorker = worker

    promise.then(() => currentWorker.terminate())
  }

  worker = new Worker('~/worker/index.ts')
  promiseWorker = new PromiseWorker(worker)
  isRunning = false
}

init()

let _current: Symbol | null

export default async (lp: any) => {
  if (isRunning) {
    init()
  }

  isRunning = true

  const current = _current = Symbol()
  const result = await (promise = promiseWorker.postMessage<Result, any>(lp))

  if (current !== _current) {
    return null
  }

  isRunning = false

  return result
}

export const terminate = () => {
  _current = null
  init()
}
