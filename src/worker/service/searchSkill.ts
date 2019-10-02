import { Skill } from '~/app/hooks/useSkill'
import createLpText from '../util/createLpText'
import executeGlpk from '../util/executeGlpk'
import normalizeSkill from '../util/normalizeSkill'

export default function* (skill: Skill, skillList: string[]) {
  skill = normalizeSkill(skill)

  const data = Object.keys(skill).map(key => `${key} >= ${skill[key]}`).join('\n')

  for (const id of skillList) {
    const lpText = createLpText(data, id)
    const result = executeGlpk(lpText, true)
    const value = result[id]

    yield { id, value }
  }
}
