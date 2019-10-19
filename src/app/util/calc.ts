import PromiseWorker from 'promise-worker'
import { Message } from '~/worker'
import { Equipment } from '~/worker/service/calc'
import { Condition } from '~/worker/service/execute'

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

export default async (objective: string, condition: Condition) => {
  if (isRunning) {
    init()
  }

  isRunning = true

  const current = _current = Symbol()
  const result = await (promise = promiseWorker.postMessage<Equipment, Message>({ objective, condition }))

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
