import { createStore } from 'redux'
import { createMigrate, MigrationManifest, PersistConfig, PersistedState, persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import modules, { RootState } from './modules'

type Migrations = Record<string, (state: RootState & PersistedState) => unknown>

const migrations: Migrations = {
  0: (state) => import('~/migrations/v0').then(v => v.default(state)),
  1: (state) => import('~/migrations/v1').then(v => v.default(state)),
}

const whitelist: (keyof RootState)[] = ['decos', 'ignoreArmors', 'skillLog']

const persistConfig: PersistConfig<RootState> = {
  key: 'mhw-simulator',
  storage,
  whitelist,
  version: 1,
  migrate: createMigrate(migrations as MigrationManifest),
}

const persistedReducer = persistReducer(persistConfig, modules)

export default () => {
  const store = createStore(persistedReducer)
  const persistor = persistStore(store)

  return { store, persistor }
}
