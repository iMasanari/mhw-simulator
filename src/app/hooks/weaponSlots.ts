import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../modules'
import * as actions from '../modules/weaponSlots'

const selector = (state: RootState) =>
  state.weaponSlots

export const useWeaponSlots = () => {
  const slots = useSelector(selector)

  return slots
}

export const useWeaponSlotsActions = () => {
  const dispatch = useDispatch()

  const set = useCallback((value: actions.WeaponSlots) => (
    dispatch(actions.set(value))
  ), [])

  return { set }
}
