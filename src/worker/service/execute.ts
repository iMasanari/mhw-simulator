import { Decos } from '~/app/hooks/useDecos'
import { Armors } from '~/app/hooks/useIgnoreArmors'
import { Skill } from '~/app/hooks/useSkill'
import { WeaponSlots } from '~/app/modules/weaponSlots'
import baseLp from '../data/lp.json'
import executeGlpk, { GLP_FX, GLP_LO, GLP_UP } from '../util/executeGlpk'
import normalizeSkill from '../util/normalizeSkill'

export interface Condition {
  skill: Skill
  armors: Armors
  decos: Decos
  weaponSlots: WeaponSlots
  prev: string[][]
}

const createSubject = (data: Record<string, number>, type: number) =>
  Object.entries(data).map(([name, value]) =>
    ({ vars: [{ name, coef: 1 }], bnds: { type, ub: value, lb: value } })
  )

export default (objectiveName: string, condition: Condition) => {
  const skill = normalizeSkill(condition.skill)

  const slots = [1, 2, 3, 4]
    .map(slot => [`cs${slot}`, condition.weaponSlots.filter(v => v >= slot).length] as const)
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
    ...prevs,
  ]

  const objective = {
    direction: 2,
    name: objectiveName,
    vars: [
      { name: objectiveName, coef: 1 },
    ],
  }

  const lp = {
    ...baseLp,
    objective,
    subjectTo,
  }

  return executeGlpk(lp)
}
