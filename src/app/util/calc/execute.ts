import { GLP_FX, GLP_LO, GLP_MAX, GLP_UP } from '~/app/constants/glpk'
import { ActiveSkill } from '~/app/modules/activeSkill'
import { Decos } from '~/app/modules/decos'
import { Armors } from '~/app/modules/ignoreArmors'
import { WeaponSkill } from '~/app/modules/weaponSkill'
import { WeaponSlots } from '~/app/modules/weaponSlots'
import baseLp from '~/app/util/baseLp'
import seriesSkill from '~/generated/seriesSkill.json'
import normalizeSkill from './normalizeSkill'
import worker from './worker'

export interface Condition {
  skill: ActiveSkill
  armors: Armors
  decos: Decos
  weaponSlots: WeaponSlots
  weaponSkill: WeaponSkill
  prev: string[][]
}

const createSubject = (data: Record<string, number>, type: number) =>
  Object.entries(data).map(([name, value]) =>
    ({ vars: [{ name, coef: 1 }], bnds: { type, ub: value, lb: value } })
  )

export default (objectiveName: string, condition: Condition) => {
  const skill = normalizeSkill(condition.skill)

  const [s1, s2, s3, weaponSkillFlag] = condition.weaponSlots
  const weaponSlots = [s1, s2, s3]
  const weaponSkill = weaponSkillFlag ? condition.weaponSkill : 'yws_none'

  const slots = [1, 2, 3, 4]
    .map(slot => [`cs${slot}`, weaponSlots.filter(v => v >= slot).length] as const)
    .reduce((acc, [key, value]) => (acc[key] = value, acc), {} as Record<string, number>)

  const prevs = condition.prev.map((equips) => ({
    vars: equips.map(name => ({ name, coef: 1 })),
    bnds: { type: GLP_UP, ub: equips.length - 1, lb: equips.length - 1 },
  }))

  const subjectTo = [
    ...baseLp.subjectTo,
    ...createSubject(skill, GLP_LO),
    ...createSubject(condition.armors, GLP_FX),
    ...createSubject(condition.decos, GLP_UP),
    ...createSubject(slots, GLP_FX),
    ...createSubject({ [weaponSkill]: 1 }, GLP_FX),
    ...prevs,
  ]

  const objective = {
    direction: GLP_MAX,
    vars: [{
      name: objectiveName in seriesSkill ? `_${objectiveName}` : objectiveName,
      coef: 1,
    }],
  }

  const lp = {
    ...baseLp,
    objective,
    subjectTo,
  }

  return worker(lp)
}
