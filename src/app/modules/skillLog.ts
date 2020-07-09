import ActionReducer from 'action-reducer'
import { ActiveSkill } from '../modules/activeSkill'

export type SkillLog = Record<string, number>

const initState = {} as ActiveSkill

const { reducer, createAction } = ActionReducer(initState, 'skillLog/')

export const update = createAction('update', (state, skill: ActiveSkill) => {
  const time = Date.now()

  const log = Object.keys(skill).reduce(
    (acc, key) => (acc[key] = time + skill[key], acc),
    {} as SkillLog
  )

  return { ...state, ...log }
})

export default reducer
