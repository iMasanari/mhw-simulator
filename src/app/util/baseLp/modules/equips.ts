import { GLP_FX } from '~/app/constants/glpk'
import onesetList from '~/generated/oneset.json'
import { flat, fromEntries } from '../../array'
import { arm, body, charm, head, leg, wst } from '../../generatedUtil'
import { LpModule } from '../createLp'
import { DEF, DRAGON, FIRE, ICE, THUNDER, WATER } from './def'
import { SLOT_1_OVER, SLOT_2_OVER, SLOT_3_OVER, SLOT_4_OVER } from './slots'


const equipModule = (equipCounter: string, equips: typeof head): LpModule => {
  const vars = [{
    name: equipCounter,
    // bounds: { type: GLP_DB, ub: 1, lb: 0 },
    binaries: true,
    useData: true,
  }]

  const data = Object.entries(equips).map(([name, equip]) => {
    const slotList = [equip.slot1, equip.slot2, equip.slot3]
    const skills = fromEntries(equip.skill.map(skill => [skill.name, skill.value]))

    return {
      name,
      value: {
        [equipCounter]: 1,
        [DEF]: equip.customDef,
        [FIRE]: equip.fire,
        [WATER]: equip.water,
        [THUNDER]: equip.thunder,
        [ICE]: equip.ice,
        [DRAGON]: equip.dragon,
        [SLOT_1_OVER]: slotList.filter(s => s >= 1).length,
        [SLOT_2_OVER]: slotList.filter(s => s >= 2).length,
        [SLOT_3_OVER]: slotList.filter(s => s >= 3).length,
        [SLOT_4_OVER]: slotList.filter(s => s >= 4).length,
        ...skills,
      },
      binaries: true,
    }
  })

  return { vars, data }
}

export const headModule = () => equipModule('y_h', head)
export const bodyModule = () => equipModule('y_b', body)
export const armModule = () => equipModule('y_a', arm)
export const wstModule = () => equipModule('y_w', wst)
export const legModule = () => equipModule('y_l', leg)
export const charmModule = () => equipModule('y_c', charm)

export const onesetModule = (): LpModule => {
  const subjectTo = flat(onesetList.map(([headName, ...otherEquips]) =>
    otherEquips.map(otherName => ({
      vars: [{ name: headName, coef: 1 }, { name: otherName, coef: -1 }],
      bnds: { type: GLP_FX, ub: 0, lb: 0 },
    }))
  ))

  return { subjectTo }
}
