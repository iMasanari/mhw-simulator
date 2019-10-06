import { useCallback } from 'react'
import { Condition } from '~/worker/service/execute'
import useSkill, { Skill } from '../hooks/useSkill'
import createWorker from '../util/createWorker'
import { Decos } from './useDecos'
import { Armors } from './useIgnoreArmors'

export default () => {
  const [addableSkill, updateAddableSkill, clearAddableSkill] = useSkill()

  const onUpdateAddableSkill = useCallback((skill: Skill, armors: Armors, decos: Decos, skillList: string[]) => {
    clearAddableSkill()

    const worker = createWorker()

    const condition: Condition = { skill, armors, decos }

    worker.postMessage({ action: 'search', data: { condition, skillList } })

    worker.addEventListener('message', (e) => {
      const { action, result } = e.data as { action: string, result: { id: string, name: string, value: number } }

      if (action !== 'search') return

      updateAddableSkill(result.id, result.value)
    })
  }, [updateAddableSkill, clearAddableSkill])

  return [addableSkill, onUpdateAddableSkill, clearAddableSkill] as const
}
