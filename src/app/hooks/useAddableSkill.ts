import { useCallback } from 'react'
import useSkill, { Skill } from '../hooks/useSkill'
import { WeaponSlots } from '../modules/weaponSlots'
import calc from '../util/calc'
import { Decos } from './useDecos'
import { Armors } from './useIgnoreArmors'

const prev = [] as any[]

export default () => {
  const [addableSkill, updateAddableSkill, clearAddableSkill] = useSkill()

  const onUpdateAddableSkill = useCallback(async (skill: Skill, slots: WeaponSlots, armors: Armors, decos: Decos, skillList: string[]) => {
    clearAddableSkill()

    for (const id of skillList) {
      const result = await calc(id, { skill, weaponSlots: slots, armors, decos, prev })

      if (!result) break

      const ref = result.skills.find(skill => skill.id === id)

      updateAddableSkill(id, ref ? ref.count : 0)
    }
  }, [updateAddableSkill, clearAddableSkill])

  return [addableSkill, onUpdateAddableSkill, clearAddableSkill] as const
}
