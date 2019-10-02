import { useCallback, useState } from 'react'
import { Result } from '~/worker/service/calc'
import { Skill } from '../hooks/useSkill'
import createWorker from '../util/createWorker'

interface MessageData {
  action: 'done'
  payload: {
    type: string
    result: Result
  }
}

export default () => {
  const [result, setResult] = useState({} as Record<string, Result>)

  const clear = useCallback(() => {
    setResult({})
  }, [])

  const search = useCallback((skill: Skill) => {
    clear()

    const worker = createWorker()

    worker.postMessage({
      action: 'load',
      data: skill,
    })

    worker.addEventListener('message', (e) => {
      const { action, payload } = e.data as MessageData

      if (action !== 'done') return

      setResult(result => ({ ...result, [payload.type]: payload.result }))
    })
  }, [])

  return [result, search, clear] as const
}
