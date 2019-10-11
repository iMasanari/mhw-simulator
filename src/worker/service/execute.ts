import { Decos } from '~/app/hooks/useDecos'
import { Armors } from '~/app/hooks/useIgnoreArmors'
import { Skill } from '~/app/hooks/useSkill'
import { WeaponSlots } from '~/app/hooks/useWeaponSlots'
import createLpText from '../util/createLpText'
import executeGlpk from '../util/executeGlpk'
import normalizeSkill from '../util/normalizeSkill'

export interface Condition {
  skill: Skill
  armors: Armors
  decos: Decos
  weaponSlots: WeaponSlots
}

export default (objective: string, condition: Condition) => {
  const skill = normalizeSkill(condition.skill)

  const data = [
    ...Object.keys(skill).map(key => `${key} >= ${skill[key]}`),
    ...Object.keys(condition.armors).map(key => `${key} = ${condition.armors[key]}`),
    ...Object.keys(condition.decos).map(key => `${key} <= ${condition.decos[key]}`),
  ]

  const slots = [1, 2, 3, 4]
    .map(slot => [slot, condition.weaponSlots.filter(v => v >= slot).length])
    .reduce((acc, [key, value]) => (acc[key] = value, acc), {} as Record<number, number>)

  const lpText = createLpText(data.join('\n'), slots, objective)
  const result = executeGlpk(lpText, true)

  return result
}
