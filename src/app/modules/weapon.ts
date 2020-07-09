import ActionReducer from 'action-reducer'

type Slots = [number, number, number]

export type Weapon = {
  slots: Slots
  skill: string
}

const initState: Weapon = {
  slots: [0, 0, 0],
  skill: 'yws_none',
}

const { reducer, createAction } = ActionReducer(initState, 'weapon/')

export const setSlots = createAction('setSlots', (state, slots: [number, number, number]) =>
  ({ ...state, slots })
)

export const setSkill = createAction('setSkill', (state, skill: string) =>
  ({ ...state, skill })
)

export default reducer
