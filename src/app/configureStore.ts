import { createStore } from 'redux'
import { PersistConfig, persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import modules, { RootState } from './modules'

const whitelist: (keyof RootState)[] = ['decos', 'ignoreArmors', 'skillLog']

const persistConfig: PersistConfig<RootState> = {
  key: 'mhw-simulator',
  storage,
  whitelist,
}

const persistedReducer = persistReducer(persistConfig, modules)

export default () => {
  const store = createStore(persistedReducer)
  const persistor = persistStore(store)

  return { store, persistor }
}
