import { Result } from '~/worker/service/calc'
import { Skill } from '../hooks/useSkill'

let _worker: Worker | undefined

const createWorker = () => {
  // 2重実行しないよう、前回のワーカーを終了させる
  // TODO: 実行が完了している場合、前回のものを使い回すようにする
  if (_worker) _worker.terminate()

  return _worker = new Worker('~/worker/index.ts')
}

export default async (skill: Skill) =>
  new Promise<Result>(resolve => {
    const worker = createWorker()

    worker.postMessage({
      action: 'load',
      data: skill,
    })

    worker.addEventListener('message', (e) => {
      const { action, result } = e.data as { action: string, result: Result }

      if (action !== 'done') return

      resolve(result)
    })
  })
