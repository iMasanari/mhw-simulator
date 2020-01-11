import { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { bindActionCreators } from 'redux'
import { RootState } from '../modules'
import { clearFromList, ignoreFromList, toggle } from '../modules/ignoreArmors'

const selector = (state: RootState) =>
  state.ignoreArmors

export const useIgnoreArmors = () => {
  const ignoreArmors = useSelector(selector)

  return ignoreArmors
}

export const useIgnoreArmorsActions = () => {
  const dispatch = useDispatch()

  const actions = useMemo(
    () => bindActionCreators({ toggle, ignoreFromList, clearFromList }, dispatch),
    [dispatch],
  )

  return actions
}
