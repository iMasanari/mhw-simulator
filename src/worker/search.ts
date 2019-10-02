import { Skill } from '~/app/hooks/useSkill'
import searchSkill from './service/searchSkill'

export default (skill: Skill, skillList: string[]) => {
  for (const result of searchSkill(skill, skillList)) {
    postMessage({ action: 'search', result })
  }
}
