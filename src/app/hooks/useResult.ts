import { useCallback, useState } from 'react'
import { Equipment } from '~/worker/service/calc'
import { Condition } from '~/worker/service/execute'
import { Skill } from '../hooks/useSkill'
import { WeaponSlots } from '../modules/weaponSlots'
import calc from '../util/calc'
import { Decos } from './useDecos'
import { Armors } from './useIgnoreArmors'

interface State {
  def?: Equipment
  slot1?: Equipment
  slot2?: Equipment
  slot3?: Equipment
  slot4?: Equipment
  list?: Equipment[]
}

const list = Object.entries({
  def: 'ydl',
  slot1: 'y_1',
  slot2: 'z_2',
  slot3: 'z_3',
  slot4: 'z_4',
})

const isntEmpty = (s: string | undefined): s is string =>
  s as any

export default () => {
  const [result, setResult] = useState({} as State)

  const clear = useCallback(() => {
    setResult({})
  }, [])

  const search = useCallback(async (skill: Skill, slots: WeaponSlots, armors: Armors, decos: Decos) => {
    clear()

    const condition: Condition = { skill, weaponSlots: slots, armors, decos, prev: [] }

    for (const [key, objective] of list) {
      const value = await calc(objective, condition)

      if (!value) return

      setResult(result => ({ ...result, [key]: value }))
    }
  }, [])

  const searchList = useCallback(async (skill: Skill, slots: WeaponSlots, armors: Armors, decos: Decos) => {
    clear()

    const condition: Condition = { skill, weaponSlots: slots, armors, decos, prev: [] }

    for (let i = 0; i < 10; ++i) {
      const value = await calc('ydl', condition)

      if (!value) return

      setResult(result => ({ ...result, list: [...(result.list || []), value] }))

      if (!value.def) return

      const equips = [value.head, value.body, value.arm, value.wst, value.leg, value.charm]

      condition.prev.push(equips.filter(isntEmpty))
    }
  }, [])

  return [result, search, searchList, clear] as const
}
