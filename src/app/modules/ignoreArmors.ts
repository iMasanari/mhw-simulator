import ActionReducer from 'action-reducer'

export type Armors = Record<string, 0 | 1>

// 旧保存データの移行
const STORAGE_KEY = 'mhw-simulator/ignoreArmors/v1.1'
const oldState: Armors = JSON.parse(localStorage.getItem(STORAGE_KEY)!) || {}

// 先行防具の除外設定
const testState: Armors = {
  'EX龍紋ヲ刻マレシ封冠α': 0,
  'EX龍紋ヲ刻マレシ封冠β': 0,
  'EX龍紋ヲ刻マレシ封鎧α': 0,
  'EX龍紋ヲ刻マレシ封鎧β': 0,
  'EX龍紋ヲ刻マレシ封甲α': 0,
  'EX龍紋ヲ刻マレシ封甲β': 0,
  'EX龍紋ヲ刻マレシ封帯α': 0,
  'EX龍紋ヲ刻マレシ封帯β': 0,
  'EX龍紋ヲ刻マレシ封靴α': 0,
  'EX龍紋ヲ刻マレシ封靴β': 0
}

const initState = { ...oldState, ...testState }

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
