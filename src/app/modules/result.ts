import ActionReducer from 'action-reducer'
import { Equipment } from '../util/calc'

export interface Result {
  def?: Equipment
  slot1?: Equipment
  slot2?: Equipment
  slot3?: Equipment
  slot4?: Equipment
  list?: Equipment[]
}

const { reducer, createAction } = ActionReducer({} as Result, 'result/')

const empty = {}

export const clear = createAction('clear', () =>
  empty
)

export const updateSummary = createAction('updateSummary', (state, payload: Result) =>
  ({ ...state, ...payload })
)

export const updateList = createAction('updateList', (state, payload: Equipment) =>
  ({ ...state, list: state.list ? [...state.list, payload] : [payload] })
)

export default reducer
