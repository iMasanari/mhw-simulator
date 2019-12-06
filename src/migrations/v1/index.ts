import { PersistedState } from 'redux-persist'
import { RootState } from '~/app/modules'

// EX龍紋を除外状態で追加する

export default (state: RootState & PersistedState): RootState & PersistedState => {
  const ignoreArmors: Record<string, 0 | 1> = {
    ...state.ignoreArmors,
    "EX龍紋ヲ刻マレシ封冠α": 0,
    "EX龍紋ヲ刻マレシ封冠β": 0,
    "EX龍紋ヲ刻マレシ封鎧α": 0,
    "EX龍紋ヲ刻マレシ封鎧β": 0,
    "EX龍紋ヲ刻マレシ封甲α": 0,
    "EX龍紋ヲ刻マレシ封甲β": 0,
    "EX龍紋ヲ刻マレシ封帯α": 0,
    "EX龍紋ヲ刻マレシ封帯β": 0,
    "EX龍紋ヲ刻マレシ封靴α": 0,
    "EX龍紋ヲ刻マレシ封靴β": 0
  }

  return {
    ...state,
    ignoreArmors,
  }
}
