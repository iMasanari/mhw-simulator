import { useCallback, useState } from 'react'

export type Skill = Record<string, number>
export type UpdateSkill = (id: string, value: number | null) => void

export default () => {
  const [skill, setSkill] = useState({} as Skill)

  const updateSkill = useCallback<UpdateSkill>((id, value) => {
    setSkill(skill => {
      // if (skill[id] === value) {
      if (value == null) {
        const { [id]: _removed, ...rest } = skill
        return rest
      }

      return { ...skill, [id]: value }
    })
  }, [])

  const clearSkill = useCallback(() => {
    setSkill({})
  }, [])

  return [skill, updateSkill, clearSkill] as const
}
