import { weaponSkills } from '../../generatedUtil'
import { LpModule } from '../createLp'
import { SLOT_1_OVER, SLOT_2_OVER, SLOT_3_OVER, SLOT_4_OVER } from './slots'

const WEAPON_SKILL_COUNTER = 'yws'

export const WEAPON_SLOT_1_OVER = 'cs1'
export const WEAPON_SLOT_2_OVER = 'cs2'
export const WEAPON_SLOT_3_OVER = 'cs3'
export const WEAPON_SLOT_4_OVER = 'cs4'

export const weaponSlotModule = (): LpModule => {
  const data = [
    { name: WEAPON_SLOT_1_OVER, value: { [SLOT_1_OVER]: 1 } as Record<string, number> },
    { name: WEAPON_SLOT_2_OVER, value: { [SLOT_2_OVER]: 1 } as Record<string, number> },
    { name: WEAPON_SLOT_3_OVER, value: { [SLOT_3_OVER]: 1 } as Record<string, number> },
    { name: WEAPON_SLOT_4_OVER, value: { [SLOT_4_OVER]: 1 } as Record<string, number> },
  ]

  return { data }
}

export const weaponSkillModule = (): LpModule => {
  const vars = [{
    name: WEAPON_SKILL_COUNTER,
    // bounds: { type: GLP_DB, ub: 1, lb: 0 },
    binaries: true,
    useData: true,
  }]

  const data = [
    { name: 'yws_none', value: { [WEAPON_SKILL_COUNTER]: 1 }, binaries: true },
    ...weaponSkills.map(name =>
      ({ name: `yws_${name}`, value: { [WEAPON_SKILL_COUNTER]: 1, [name]: 1 }, binaries: true })
    ),
  ]

  return { vars, data }
}
