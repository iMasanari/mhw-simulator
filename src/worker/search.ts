import { Condition } from './service/execute'
import searchSkill from './service/searchSkill'

export default (condition: Condition, skillList: string[]) => {
  for (const result of searchSkill(condition, skillList)) {
    postMessage({ action: 'search', result })
  }
}
