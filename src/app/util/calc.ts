import PromiseWorker from 'promise-worker'
import { Message } from '~/worker'
import { Result } from '~/worker/service/calc'
import { Condition } from '~/worker/service/execute'

const worker = new Worker('~/worker/index.ts')
const pw = new PromiseWorker(worker)

let _current: Symbol

export default async (objective: string, condition: Condition) => {
  const current = _current = Symbol()

  return pw.postMessage<Result, Message>({ objective, condition }).then(result =>
    current === _current ? result : null
  )
}
