import { PersistedState } from 'redux-persist'
import { RootState } from '~/app/modules'
import { fromEntries } from '~/app/util/array'

const armorHash = require('./data/armor.json') as Record<string, string>
const decoHash = require('./data/deco.json') as Record<string, string>
const skillHash = require('./data/skill.json') as Record<string, string>

export default (state: RootState & PersistedState): RootState & PersistedState => {
  const skillLog = fromEntries(
    Object.entries(state.skillLog)
      .filter(([id]) => skillHash[id])
      .map(([id, value]) => [skillHash[id], value])
  )

  const ignoreArmors = fromEntries(
    Object.entries(state.ignoreArmors)
      .filter(([id]) => armorHash[id])
      .map(([id, value]) => [armorHash[id], value])
  )

  const decos = fromEntries(
    Object.entries(state.decos)
      .filter(([id]) => decoHash[id])
      .map(([id, value]) => [decoHash[id], value])
  )

  return {
    ...state,
    skillLog,
    ignoreArmors,
    decos,
  }
}
