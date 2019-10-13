import { combineReducers } from 'redux'
import activeSkill, { ActiveSkill } from './activeSkill'
import addableSkill, { AddableSkill } from './addableSkill'
import decos, { Decos } from './decos'
import ignoreArmors, { Armors } from './ignoreArmors'
import result, { Result } from './result'
import weaponSlots, { WeaponSlots } from './weaponSlots'

export interface RootState {
  activeSkill: ActiveSkill
  addableSkill: AddableSkill
  decos: Decos
  ignoreArmors: Armors
  result: Result
  weaponSlots: WeaponSlots
}

export default combineReducers<RootState>({
  activeSkill,
  addableSkill,
  decos,
  ignoreArmors,
  result,
  weaponSlots,
})
