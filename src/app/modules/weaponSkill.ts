import ActionReducer from 'action-reducer'

export type WeaponSkill = string

const initState: WeaponSkill = 'yws_none'

const { reducer, createAction } = ActionReducer(initState, 'weaponSkill/')

export const set = createAction('set', (state, value: WeaponSkill) => value)

export default reducer
