import ActionReducer from 'action-reducer'

export type Armors = Record<string, 0 | 1>

const { reducer, createAction } = ActionReducer({} as Armors, 'ignoreArmors/')

interface Payload {
  armor: string
}

export const toggle = createAction('toggle', (state, { armor }: Payload) => {
  if (state[armor] == 0) {
    const { [armor]: _removed, ...rest } = state
    return rest
  }

  return { ...state, [armor]: 0 }
})

export default reducer
