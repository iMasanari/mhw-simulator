import { useCallback } from 'react'
import useSkill, { Skill } from '../hooks/useSkill'
import createWorker from '../util/createWorker'

export default () => {
  const [addableSkill, updateAddableSkill, clearAddableSkill] = useSkill()

  const onUpdateAddableSkill = useCallback((skill: Skill, skillList: string[]) => {
    clearAddableSkill()

    const worker = createWorker()

    worker.postMessage({ action: 'search', data: { skill, skillList } })

    worker.addEventListener('message', (e) => {
      const { action, result } = e.data as { action: string, result: { id: string, name: string, value: number } }

      if (action !== 'search') return

      updateAddableSkill(result.id, result.value)
    })
  }, [updateAddableSkill, clearAddableSkill])

  return [addableSkill, onUpdateAddableSkill, clearAddableSkill] as const
}
