import 'normalize.css'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import App from './components/App'
import modules from './modules'

const store = createStore(modules)

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
