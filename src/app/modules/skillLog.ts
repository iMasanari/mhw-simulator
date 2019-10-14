import ActionReducer from 'action-reducer'
import { ActiveSkill } from '../modules/activeSkill'

export type SkillLog = Record<string, number>

// 旧保存データの移行
const STORAGE_KEY = 'mhw-simulator/skillLog/v1.1'
const initState: ActiveSkill = JSON.parse(localStorage.getItem(STORAGE_KEY)!) || {}

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
