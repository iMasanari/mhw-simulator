import { fromEntries } from '../../array'
import { deco } from '../../generatedUtil'
import { LpModule } from '../createLp'
import { SLOT_1_OVER, SLOT_2_OVER, SLOT_3_OVER, SLOT_4_OVER } from './slots'

export const decoModule = (): LpModule => {
  const data = Object.entries(deco).map(([name, equip]) => {
    const slotList = [equip.slot1, equip.slot2, equip.slot3]
    const skills = fromEntries(equip.skill.map(skill => [skill.name, skill.value]))

    return {
      name,
      value: {
        [SLOT_1_OVER]: -slotList.filter(s => s >= 1).length,
        [SLOT_2_OVER]: -slotList.filter(s => s >= 2).length,
        [SLOT_3_OVER]: -slotList.filter(s => s >= 3).length,
        [SLOT_4_OVER]: -slotList.filter(s => s >= 4).length,
        ...skills,
      },
      generals: true,
    }
  })

  return { data }
}
