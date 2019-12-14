import { PersistedState } from 'redux-persist'
import { RootState } from '~/app/modules'
import { fromEntries } from '~/app/util/array'

// EX龍紋の除外を解除

const targets = new Set([
  'EX龍紋ヲ刻マレシ封冠α',
  'EX龍紋ヲ刻マレシ封冠β',
  'EX龍紋ヲ刻マレシ封鎧α',
  'EX龍紋ヲ刻マレシ封鎧β',
  'EX龍紋ヲ刻マレシ封甲α',
  'EX龍紋ヲ刻マレシ封甲β',
  'EX龍紋ヲ刻マレシ封帯α',
  'EX龍紋ヲ刻マレシ封帯β',
  'EX龍紋ヲ刻マレシ封靴α',
  'EX龍紋ヲ刻マレシ封靴β',
])

export default (state: RootState & PersistedState): RootState & PersistedState => {
  const ignoreArmors = fromEntries(
    Object.entries(state.ignoreArmors).filter(([name]) => !targets.has(name))
  )

  return {
    ...state,
    ignoreArmors,
  }
}
