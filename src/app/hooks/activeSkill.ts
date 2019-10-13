import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../modules'
import * as actions from '../modules/activeSkill'

const selector = (state: RootState) => state.activeSkill

export const useActiveSkill = () => {
  const activeSkill = useSelector(selector)

  return activeSkill
}

export const useActiveSkillActions = () => {
  const dispatch = useDispatch()

  const update = useCallback((key: string, value: number) => {
    dispatch(actions.update({ key, value }))
  }, [])

  const clear = useCallback(() => {
    dispatch(actions.clear())
  }, [])

  return { update, clear }
}
