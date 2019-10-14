import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../modules'
import { ActiveSkill } from '../modules/activeSkill'
import * as actions from '../modules/skillLog'

const selector = (state: RootState) =>
  state.skillLog

export const useSkillLog = () => {
  const skillLog = useSelector(selector)

  return skillLog
}

export const useSkillLogActions = () => {
  const dispatch = useDispatch()

  const update = useCallback((skill: ActiveSkill) => {
    dispatch(actions.update(skill))
  }, [])

  return { update }
}
