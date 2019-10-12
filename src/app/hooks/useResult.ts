import { useCallback, useState } from 'react'
import { Result } from '~/worker/service/calc'
import { Skill } from '../hooks/useSkill'
import calc from '../util/calc'
import { Decos } from './useDecos'
import { Armors } from './useIgnoreArmors'
import { WeaponSlots } from './useWeaponSlots'

const list = Object.entries({
  def: 'ydl',
  slot1: 'y_1',
  slot2: 'z_2',
  slot3: 'z_3',
  slot4: 'z_4',
})

export default () => {
  const [result, setResult] = useState({} as Record<string, Result>)

  const clear = useCallback(() => {
    setResult({})
  }, [])

  const search = useCallback(async (skill: Skill, slots: WeaponSlots, armors: Armors, decos: Decos) => {
    clear()

    const condition = { skill, weaponSlots: slots, armors, decos }

    for (const [key, objective] of list) {
      const value = await calc(objective, condition)

      if (!value) return

      setResult(result => ({ ...result, [key]: value }))
    }
  }, [])

  return [result, search, clear] as const
}
