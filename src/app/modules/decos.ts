import ActionReducer from 'action-reducer'

export type Decos = Record<string, number>

const { reducer, createAction } = ActionReducer({} as Decos, 'decos/')

interface Payload {
  deco: string
  value: number | null
}

export const set = createAction('set', (state, { deco, value }: Payload) => {
  if (value == null) {
    const { [deco]: _removed, ...rest } = state
    return rest
  }

  return { ...state, [deco]: value }
})

export default reducer
