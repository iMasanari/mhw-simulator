import { useCallback, useState } from 'react'
import { Result } from '~/worker/service/calc'
import { Condition } from '~/worker/service/execute'
import { Skill } from '../hooks/useSkill'
import createWorker from '../util/createWorker'
import { Decos } from './useDecos'
import { Armors } from './useIgnoreArmors'

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

  const search = useCallback((skill: Skill, armors: Armors, decos: Decos) => {
    clear()

    const worker = createWorker()

    const condition: Condition = { skill, armors, decos }

    worker.postMessage({
      action: 'load',
      data: condition,
    })

    worker.addEventListener('message', (e) => {
      const { action, payload } = e.data as MessageData

      if (action !== 'done') return

      setResult(result => ({ ...result, [payload.type]: payload.result }))
    })
  }, [])

  return [result, search, clear] as const
}
