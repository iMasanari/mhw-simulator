import ActionReducer from 'action-reducer'

export type Decos = Record<string, number>

// 旧保存データの移行
const STORAGE_KEY = 'mhw-simulator/decos/v1.1'
const initState: Decos = JSON.parse(localStorage.getItem(STORAGE_KEY)!) || {}

const { reducer, createAction } = ActionReducer(initState, 'decos/')

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
