import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../modules'
import * as actions from '../modules/weaponSkill'

const selector = (state: RootState) =>
  state.weaponSkill

export const useWeaponSkill = () => {
  const weaponSkill = useSelector(selector)

  return weaponSkill
}

export const useWeaponSkillActions = () => {
  const dispatch = useDispatch()

  const set = useCallback((value: actions.WeaponSkill) => (
    dispatch(actions.set(value))
  ), [])

  return { set }
}
