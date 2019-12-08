import ActionReducer from 'action-reducer'

export type Tab = 'about' | 'result' | 'armors' | 'charms' | 'decos'

const { reducer, createAction } = ActionReducer<Tab>('about', 'tab/')

export const set = createAction('set', (state, payload: Tab) => payload)

export default reducer
