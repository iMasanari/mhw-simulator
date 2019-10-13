import { combineReducers } from 'redux'
import weaponSlots, { WeaponSlots } from './weaponSlots'

export interface RootState {
  weaponSlots: WeaponSlots
}

export default combineReducers<RootState>({
  weaponSlots,
})
