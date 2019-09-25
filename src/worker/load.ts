import { Skill } from '~/app/hooks/useSkill'
import calc from './service/calc'

export default (skill: Skill) => {
  const result = calc(skill)

  postMessage({ action: 'done', result })
}
