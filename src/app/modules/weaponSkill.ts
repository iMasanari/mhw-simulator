import ActionReducer from 'action-reducer'

export type WeaponSkill = string

const initState: WeaponSkill = 'yws_auto'

const { reducer, createAction } = ActionReducer(initState, 'weaponSkill/')

export const set = createAction('set', (state, value: WeaponSkill) => value)

export default reducer
