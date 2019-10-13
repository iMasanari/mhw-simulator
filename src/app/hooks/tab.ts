import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../modules'
import * as actions from '../modules/tab'

const selector = (state: RootState) =>
  state.tab

export const useTab = () => {
  const slots = useSelector(selector)

  return slots
}

export const useTabActions = () => {
  const dispatch = useDispatch()

  const set = useCallback((tab: actions.Tab) => (
    dispatch(actions.set(tab))
  ), [])

  return { set }
}
