import { Decos } from '~/app/hooks/useDecos'
import { Armors } from '~/app/hooks/useIgnoreArmors'
import { Skill } from '~/app/hooks/useSkill'
import createLpText from '../util/createLpText'
import executeGlpk from '../util/executeGlpk'
import normalizeSkill from '../util/normalizeSkill'

export interface Condition {
  skill: Skill
  armors: Armors
  decos: Decos
}

export default (condition: Condition, objective: string) => {
  const skill = normalizeSkill(condition.skill)

  const data = [
    ...Object.keys(skill).map(key => `${key} >= ${skill[key]}`),
    ...Object.keys(condition.armors).map(key => `${key} = ${condition.armors[key]}`),
    ...Object.keys(condition.decos).map(key => `${key} <= ${condition.decos[key]}`),
  ]

  const lpText = createLpText(data.join('\n'), objective)
  const result = executeGlpk(lpText, true)

  return result
}
