import { Result } from '~/worker/service/calc'
import { Skill } from '../hooks/useSkill'
import createWorker from '../util/createWorker'

export default async (skill: Skill) =>
  new Promise<Result>((resolve, reject) => {
    const worker = createWorker()

    const terminate = worker.terminate.bind(worker)

    worker.terminate = () => {
      reject()
      terminate()
    }

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
