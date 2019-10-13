import ActionReducer from 'action-reducer'

export type ActiveSkill = Record<string, number>

const { reducer, createAction } = ActionReducer({} as ActiveSkill, 'activeSkill/')

interface Payload {
  key: string
  value: number
}

export const update = createAction('update', (state, { key, value }: Payload) => {
  if (state[key] === value) {
    const { [key]: _removed, ...rest } = state
    return rest
  }

  return { ...state, [key]: value }
})

const empty = {}

export const clear = createAction('clear', () => empty)

export default reducer
