import { combineReducers } from 'redux'
import addableSkill, { AddableSkill } from './addableSkill'
import result, { Result } from './result'
import weaponSlots, { WeaponSlots } from './weaponSlots'

export interface RootState {
  addableSkill: AddableSkill
  result: Result
  weaponSlots: WeaponSlots
}

export default combineReducers<RootState>({
  addableSkill,
  result,
  weaponSlots,
})
