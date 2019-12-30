import ActionReducer from 'action-reducer'

export type WeaponSlots = [number, number, number, 0 | 1]

const initState: WeaponSlots = [0, 0, 0, 0]

const { reducer, createAction } = ActionReducer(initState, 'weaponSlots/')

export const set = createAction('set', (state, value: WeaponSlots) => value)

export default reducer
