import { combineReducers } from 'redux'
import activeSkill, { ActiveSkill } from './activeSkill'
import addableSkill, { AddableSkill } from './addableSkill'
import decos, { Decos } from './decos'
import ignoreArmors, { Armors } from './ignoreArmors'
import result, { Result } from './result'
import skillLog, { SkillLog } from './skillLog'
import weapon, { Weapon } from './weapon'

export interface RootState {
  activeSkill: ActiveSkill
  addableSkill: AddableSkill
  decos: Decos
  ignoreArmors: Armors
  result: Result
  skillLog: SkillLog
  weapon: Weapon
}

export default combineReducers<RootState>({
  activeSkill,
  addableSkill,
  decos,
  ignoreArmors,
  result,
  skillLog,
  weapon,
})
