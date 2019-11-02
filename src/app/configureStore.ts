import { createStore } from 'redux'
import { createMigrate, MigrationManifest, PersistConfig, PersistedState, persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import modules, { RootState } from './modules'
import { flat, fromEntries } from './util/array'
import { arm, body, charm, deco, head, leg, skillList, wst } from './util/generatedUtil'

const migrateState0 = (state: RootState & PersistedState): RootState & PersistedState => {
  const skillMap = new Map(skillList.map((v, i) => [`ys${i}`, v.name]))

  const armorMap = new Map(flat(
    Object.entries({ head, body, arm, wst, leg, charm }).map(([type, v]) =>
      Object.keys(v).map((name, i) => [`x${type[0]}${i}`, name])
    )
  ))

  const decoMap = new Map(
    Object.keys(deco).map((name, i) => [`xd${i}`, name])
  )

  const skillLog = fromEntries(
    Object.entries(state.skillLog)
      .filter(([id]) => skillMap.has(id))
      .map(([id, value]) => [skillMap.get(id)!, value])
  )

  const ignoreArmors = fromEntries(
    Object.entries(state.ignoreArmors)
      .filter(([id]) => armorMap.has(id))
      .map(([id, value]) => [armorMap.get(id)!, value])
  )

  const decos = fromEntries(
    Object.entries(state.decos)
      .filter(([id]) => decoMap.has(id))
      .map(([id, value]) => [decoMap.get(id)!, value])
  )

  return {
    ...state,
    skillLog,
    ignoreArmors,
    decos,
  }
}

const migrations: MigrationManifest = {
  0: (state) => migrateState0(state as RootState & PersistedState),
}

const whitelist: (keyof RootState)[] = ['decos', 'ignoreArmors', 'skillLog']

const persistConfig: PersistConfig<RootState> = {
  key: 'mhw-simulator',
  storage,
  whitelist,
  version: 0,
  migrate: createMigrate(migrations),
}

const persistedReducer = persistReducer(persistConfig, modules)

export default () => {
  const store = createStore(persistedReducer)
  const persistor = persistStore(store)

  return { store, persistor }
}
