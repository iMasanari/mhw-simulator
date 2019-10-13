import { combineReducers } from 'redux'
import activeSkill, { ActiveSkill } from './activeSkill'
import addableSkill, { AddableSkill } from './addableSkill'
import result, { Result } from './result'
import weaponSlots, { WeaponSlots } from './weaponSlots'

export interface RootState {
  activeSkill: ActiveSkill
  addableSkill: AddableSkill
  result: Result
  weaponSlots: WeaponSlots
}

export default combineReducers<RootState>({
  activeSkill,
  addableSkill,
  result,
  weaponSlots,
})
