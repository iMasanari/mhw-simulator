import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../modules'
import * as actions from '../modules/weapon'

const selector = (state: RootState) =>
  state.weapon

export const useWeapon = () => {
  const weapon = useSelector(selector)

  return weapon
}

export const useWeaponActions = () => {
  const dispatch = useDispatch()

  const setSlots = useCallback((slots: [number, number, number, 0 | 1]) => (
    dispatch(actions.setSlots(slots))
  ), [])

  const setSkill = useCallback((skill: string) => (
    dispatch(actions.setSkill(skill))
  ), [])

  return { setSlots, setSkill }
}
