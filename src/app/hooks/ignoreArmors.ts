import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../modules'
import * as actions from '../modules/ignoreArmors'

const selector = (state: RootState) =>
  state.ignoreArmors

export const useIgnoreArmors = () => {
  const ignoreArmors = useSelector(selector)

  return ignoreArmors
}

export const useIgnoreArmorsActions = () => {
  const dispatch = useDispatch()

  const toggle = useCallback((armor: string) => {
    dispatch(actions.toggle({ armor }))
  }, [])

  return { toggle }
}
