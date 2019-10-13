import { combineReducers } from 'redux'
import result, { Result } from './result'
import weaponSlots, { WeaponSlots } from './weaponSlots'

export interface RootState {
  result: Result
  weaponSlots: WeaponSlots
}

export default combineReducers<RootState>({
  result,
  weaponSlots,
})
