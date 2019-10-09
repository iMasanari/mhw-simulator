import { useCallback, useEffect, useState } from 'react'
import { Skill } from '~/app/hooks/useSkill'

const STORAGE_KEY = 'mhw-simulator/skillLog/v1.1'

const initSkillLogState: Skill = JSON.parse(localStorage.getItem(STORAGE_KEY)!) || {}

export default () => {
  const [skillLog, setSkillLog] = useState(initSkillLogState)

  const updateSkillLog = useCallback((skill: Skill) => {
    const time = Date.now()

    const log = Object.keys(skill).reduce(
      (acc, key) => (acc[key] = time + skill[key], acc),
      {} as Skill
    )

    setSkillLog(state => ({ ...state, ...log }))
  }, [])

  // skillLog変更時
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(skillLog))
  }, [skillLog])

  return [skillLog, updateSkillLog] as const
}
