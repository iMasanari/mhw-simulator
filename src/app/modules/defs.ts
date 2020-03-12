import ActionReducer from 'action-reducer'

export type Defs = Record<string, number>

const initState = {} as Defs

const { reducer, createAction } = ActionReducer(initState, 'defs/')

export const clear = createAction('clear', () => ({}))

interface Payload {
  defs: string
  value: number | null
}

export const set = createAction('set', (state, { defs, value }: Payload) => {
  if (value == null) {
    const { [defs]: _removed, ...rest } = state
    return rest
  }

  return { ...state, [defs]: value }
})

export default reducer
