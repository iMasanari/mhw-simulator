import ActionReducer from 'action-reducer'

export type Armors = Record<string, 0 | 1>

// 旧保存データの移行
const STORAGE_KEY = 'mhw-simulator/ignoreArmors/v1.1'
const initState: Armors = JSON.parse(localStorage.getItem(STORAGE_KEY)!) || {}

const { reducer, createAction } = ActionReducer(initState, 'ignoreArmors/')

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
