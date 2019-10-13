import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../modules'
import * as actions from '../modules/decos'

const selector = (state: RootState) =>
  state.decos

export const useDecos = () => {
  const decos = useSelector(selector)

  return decos
}

export const useDecosActions = () => {
  const dispatch = useDispatch()

  const set = useCallback((deco: string, value: number | null) => {
    dispatch(actions.set({ deco, value }))
  }, [])

  return { set }
}
