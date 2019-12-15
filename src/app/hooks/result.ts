import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../modules'
import { ActiveSkill } from '../modules/activeSkill'
import { Decos } from '../modules/decos'
import { Armors } from '../modules/ignoreArmors'
import * as actions from '../modules/result'
import { WeaponSkill } from '../modules/weaponSkill'
import { WeaponSlots } from '../modules/weaponSlots'
import calc from '../util/calc'
import { Condition } from '../util/calc/execute'

const selector = (state: RootState) =>
  state.result

export const useResult = () => {
  const result = useSelector(selector)

  return result
}

const isntEmpty = (s: string | undefined): s is string =>
  s as any

export const useResultActions = () => {
  const dispatch = useDispatch()

  const clear = useCallback(() => {
    dispatch(actions.clear())
  }, [])

  const searchList = useCallback(async (skill: ActiveSkill, weaponSlots: WeaponSlots, weaponSkill: WeaponSkill, armors: Armors, decos: Decos) => {
    clear()

    const condition: Condition = { skill, weaponSlots, weaponSkill, armors, decos, prev: [] }

    for (let i = 0; i < 10; ++i) {
      const value = await calc('ydl', condition)

      if (!value) return

      dispatch(actions.updateList(value))

      if (!value.def) return

      const equips = [value.head, value.body, value.arm, value.wst, value.leg, value.charm]

      condition.prev.push(equips.filter(isntEmpty))
    }
  }, [])

  return { searchList }
}
