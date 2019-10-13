import ActionReducer from 'action-reducer'

export type WeaponSlots = [number, number, number]

const initState: WeaponSlots = [0, 0, 0]

const { reducer, createAction } = ActionReducer(initState, 'weaponSlots/')

interface Payload {
  key: number
  value: number
}

export const set = createAction('set', (state, { key, value }: Payload) =>
  state.map((v, i) => i === key ? value : v) as WeaponSlots
)

export default reducer
