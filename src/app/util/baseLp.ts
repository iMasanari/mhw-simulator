import onesetList from '../../generated/oneset.json'
import { GLP_FX, GLP_LO } from '../constants/glpk'
import { flat } from './array'
import { arm, body, charm, deco, getArmInfo, getBodyInfo, getCharmInfo, getDecoInfo, getHeadInfo, getLegInfo, getWstInfo, head, leg, skillList, wst } from './generatedUtil'

const fx0 = {
  type: GLP_FX,
  ub: 0,
  lb: 0,
}

const lo0 = {
  type: GLP_LO,
  ub: 0,
  lb: 0,
}

const createArmorFlag = (type: string, armors: string[]) => ({
  vars: [{ name: type, coef: -1 }, ...armors.map(name => ({ name, coef: 1 }))],
  bnds: fx0,
})

const createBaseLp = () => {
  const headList = Object.keys(head).map(name => [name, getHeadInfo(name)] as const)
  const bodyList = Object.keys(body).map(name => [name, getBodyInfo(name)] as const)
  const armList = Object.keys(arm).map(name => [name, getArmInfo(name)] as const)
  const wstList = Object.keys(wst).map(name => [name, getWstInfo(name)] as const)
  const legList = Object.keys(leg).map(name => [name, getLegInfo(name)] as const)
  const charmList = Object.keys(charm).map(name => [name, getCharmInfo(name)] as const)
  const decoList = Object.keys(deco).map(name => [name, getDecoInfo(name)] as const)

  const armorCounts = {
    'y_h': headList,
    'y_b': bodyList,
    'y_a': armList,
    'y_w': wstList,
    'y_l': legList,
    'y_c': charmList,
  }

  const armorCountsSubject = Object.entries(armorCounts).map(([type, list]) =>
    createArmorFlag(type, list.map(([name]) => name))
  )

  const defSubject = { vars: [{ name: 'ydl', coef: -1 }], bnds: fx0 }
  const slotLv1Subject = { vars: [{ name: 'y_1', coef: -1 }, { name: 'cs1', coef: 1 }], bnds: fx0 }
  const slotLv2Subject = { vars: [{ name: 'y_2', coef: -1 }, { name: 'cs2', coef: 1 }], bnds: fx0 }
  const slotLv3Subject = { vars: [{ name: 'y_3', coef: -1 }, { name: 'cs3', coef: 1 }], bnds: fx0 }
  const slotLv4Subject = { vars: [{ name: 'y_4', coef: -1 }, { name: 'cs4', coef: 1 }], bnds: fx0 }

  const skillSubjectMap = new Map(skillList.map(({ name }) =>
    [name, { vars: [{ name, coef: -1 }], bnds: fx0 }]
  ))

  const equips = [
    ...headList,
    ...bodyList,
    ...armList,
    ...wstList,
    ...legList,
    ...charmList,
  ]

  for (const [name, equip] of equips) {
    const slotList = [equip.slot1, equip.slot2, equip.slot3]

    const slotLv1 = slotList.filter(s => s >= 1).length
    const slotLv2 = slotList.filter(s => s >= 2).length
    const slotLv3 = slotList.filter(s => s >= 3).length
    const slotLv4 = slotList.filter(s => s >= 4).length

    // 防御力
    equip.customDef && defSubject.vars.push({ name, coef: equip.customDef })

    // スロット
    slotLv1 && slotLv1Subject.vars.push({ name, coef: slotLv1 })
    slotLv2 && slotLv2Subject.vars.push({ name, coef: slotLv2 })
    slotLv3 && slotLv3Subject.vars.push({ name, coef: slotLv3 })
    slotLv4 && slotLv4Subject.vars.push({ name, coef: slotLv4 })

    // スキル
    for (const [skillName, value] of equip.skill) {
      const ref = skillSubjectMap.get(skillName)

      if (!ref) {
        throw new Error(`warn: ${skillName} is not find @${name}`)
      }

      ref.vars.push({ name, coef: value })
    }
  }

  for (const [name, deco] of decoList) {
    const slotList = [deco.slot1, deco.slot2, deco.slot3]

    const slotLv1 = slotList.filter(s => s >= 1).length
    const slotLv2 = slotList.filter(s => s >= 2).length
    const slotLv3 = slotList.filter(s => s >= 3).length
    const slotLv4 = slotList.filter(s => s >= 4).length

    // スロット
    slotLv1 && slotLv1Subject.vars.push({ name, coef: -slotLv1 })
    slotLv2 && slotLv2Subject.vars.push({ name, coef: -slotLv2 })
    slotLv3 && slotLv3Subject.vars.push({ name, coef: -slotLv3 })
    slotLv4 && slotLv4Subject.vars.push({ name, coef: -slotLv4 })

    // スキル
    for (const [skillName, value] of deco.skill) {
      const ref = skillSubjectMap.get(skillName)

      if (!ref) {
        throw new Error(`error: ${skillName} is not find @${name}`)
      }

      ref.vars.push({ name, coef: value })
    }
  }

  // 空きスロット数
  const emptySlots = [
    { vars: [{ name: 'y_1', coef: 1 }, { name: 'z_2', coef: -1 }], bnds: lo0 },
    { vars: [{ name: 'y_2', coef: 1 }, { name: 'z_2', coef: -1 }], bnds: lo0 },
    { vars: [{ name: 'y_1', coef: 1 }, { name: 'z_3', coef: -1 }], bnds: lo0 },
    { vars: [{ name: 'y_2', coef: 1 }, { name: 'z_3', coef: -1 }], bnds: lo0 },
    { vars: [{ name: 'y_3', coef: 1 }, { name: 'z_3', coef: -1 }], bnds: lo0 },
    { vars: [{ name: 'y_1', coef: 1 }, { name: 'z_4', coef: -1 }], bnds: lo0 },
    { vars: [{ name: 'y_2', coef: 1 }, { name: 'z_4', coef: -1 }], bnds: lo0 },
    { vars: [{ name: 'y_3', coef: 1 }, { name: 'z_4', coef: -1 }], bnds: lo0 },
    { vars: [{ name: 'y_4', coef: 1 }, { name: 'z_4', coef: -1 }], bnds: lo0 },
  ]

  const oneset = flat(onesetList.map(([headName, ...otherEquips]) =>
    otherEquips.map(otherName => ({
      vars: [{ name: headName, coef: 1 }, { name: otherName, coef: -1 }],
      bnds: fx0,
    }))
  ))

  const subjectTo = [
    ...armorCountsSubject,
    slotLv1Subject,
    slotLv2Subject,
    slotLv3Subject,
    slotLv4Subject,
    defSubject,
    ...[...skillSubjectMap.values()].filter(v => v.vars.length > 1),
    ...emptySlots,
    ...oneset,
  ]

  const bounds = [
    { name: 'y_h', type: 4, ub: 1, lb: 0 },
    { name: 'y_b', type: 4, ub: 1, lb: 0 },
    { name: 'y_a', type: 4, ub: 1, lb: 0 },
    { name: 'y_w', type: 4, ub: 1, lb: 0 },
    { name: 'y_l', type: 4, ub: 1, lb: 0 },
    { name: 'y_c', type: 4, ub: 1, lb: 0 },
  ]

  const generals = [
    // y軸
    ...Object.keys(armorCounts),
    'y_1',
    'y_2',
    'y_3',
    'y_4',
    'ydl',
    ...skillList.map(v => v.name),
    // x軸
    ...equips.map(([name]) => name),
    ...decoList.map(([name]) => name),
  ]

  return { subjectTo, bounds, generals }

}

export default createBaseLp()
