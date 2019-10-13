import 'normalize.css'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { persistReducer, persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import storage from 'redux-persist/lib/storage'
import App from './components/App'
import modules, { RootState } from './modules'

const whitelist: (keyof RootState)[] = ['decos', 'ignoreArmors', 'skillLog']

const persistConfig = { key: 'mhw-simulator', storage, whitelist }

const store = createStore(persistReducer(persistConfig, modules))
const persistor = persistStore(store)

render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById('root')
)
