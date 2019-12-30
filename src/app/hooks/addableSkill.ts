import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../modules'
import { ActiveSkill } from '../modules/activeSkill'
import * as actions from '../modules/addableSkill'
import { Decos } from '../modules/decos'
import { Armors } from '../modules/ignoreArmors'
import { Weapon } from '../modules/weapon'
import calc from '../util/calc'

const selector = (state: RootState) => state.addableSkill

export const useAddableSkill = () => {
  const addableSkill = useSelector(selector)

  return addableSkill
}

const prev = [] as any[]

export const useAddableSkillActions = () => {
  const dispatch = useDispatch()

  const clear = useCallback(() => {
    dispatch(actions.clear())
  }, [])

  const search = useCallback(async (skill: ActiveSkill, weapon: Weapon, armors: Armors, decos: Decos, skillList: string[]) => {
    clear()

    for (const key of skillList) {
      const { [key]: _removed, ...searchSkill } = skill
      const result = await calc(key, { skill: searchSkill, weapon, armors, decos, prev })

      if (!result) break

      dispatch(actions.update({ key, value: result.z }))
    }
  }, [])

  return { search, clear }
}
