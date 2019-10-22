import ActionReducer from 'action-reducer'

export type WeaponSlots = [number, number, number]

const initState: WeaponSlots = [0, 0, 0]

const { reducer, createAction } = ActionReducer(initState, 'weaponSlots/')

interface Payload {
  key: number
  value: number
}

export const set = createAction('set', (state, value: WeaponSlots) => value)

export default reducer
