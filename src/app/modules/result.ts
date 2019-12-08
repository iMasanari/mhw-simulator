import ActionReducer from 'action-reducer'
import { Equipment } from '../util/calc'

export type Result = Equipment[]

const { reducer, createAction } = ActionReducer([] as Result, 'result/')

const empty: Equipment[] = []

export const clear = createAction('clear', () =>
  empty
)

export const updateList = createAction('updateList', (state, payload: Equipment) =>
  [...state, payload]
)

export default reducer
