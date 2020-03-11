import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../modules'
import * as actions from '../modules/defs'

const selector = (state: RootState) =>
  state.defs

export const useDefs = () => {
  const defs = useSelector(selector)

  return defs
}

export const useDefsActions = () => {
  const dispatch = useDispatch()

  const set = useCallback((defs: string, value: number | null) => {
    dispatch(actions.set({ defs, value }))
  }, [])

  return { set }
}
