import ActionReducer from 'action-reducer'

export type Tab = 'result' | 'armors' | 'charms' | 'decos'

const { reducer, createAction } = ActionReducer<Tab>('result', 'result/')

export const set = createAction('set', (state, payload: Tab) => payload)

export default reducer
