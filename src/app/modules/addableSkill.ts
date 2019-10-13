import ActionReducer from 'action-reducer'

export type AddableSkill = Record<string, number>

const { reducer, createAction } = ActionReducer({} as AddableSkill, 'addableSkill/')

const empty = {}

export const clear = createAction('clear', () => empty)

interface Payload {
  key: string
  value: number
}

export const update = createAction('update', (state, { key, value }: Payload) =>
  ({ ...state, [key]: value })
)

export default reducer
