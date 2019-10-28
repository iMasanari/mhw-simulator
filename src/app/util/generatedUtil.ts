type EquipData = [
  Record<string, number>,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
]

interface SkillInfo {
  name: string,
  category: string,
  items: number[]
}

export const head = require('~/generated/head.json') as Record<string, EquipData>
export const body = require('~/generated/body.json') as Record<string, EquipData>
export const arm = require('~/generated/arm.json') as Record<string, EquipData>
export const wst = require('~/generated/wst.json') as Record<string, EquipData>
export const leg = require('~/generated/leg.json') as Record<string, EquipData>
export const charm = require('~/generated/charm.json') as Record<string, EquipData>
export const deco = require('~/generated/deco.json') as Record<string, EquipData>
export const skillList = require('~/generated/skillList.json') as SkillInfo[]

const skillNameMap = new Map(skillList.map((v, i) => [i, v.name]))

const getEquipInfo = ([skillData, slot1, slot2, slot3, def, maxDef, customDef, fire, water, thunder, ice, dragon]: EquipData) => {
  const skill = Object.keys(skillData).map((name) => [skillNameMap.get(+name)!, skillData[name]] as const)

  return { skill, slot1, slot2, slot3, def, maxDef, customDef, fire, water, thunder, ice, dragon }
}

export const getHeadInfo = (name: string) => getEquipInfo(head[name])
export const getBodyInfo = (name: string) => getEquipInfo(body[name])
export const getArmInfo = (name: string) => getEquipInfo(arm[name])
export const getWstInfo = (name: string) => getEquipInfo(wst[name])
export const getLegInfo = (name: string) => getEquipInfo(leg[name])
export const getCharmInfo = (name: string) => getEquipInfo(charm[name])
export const getDecoInfo = (name: string) => getEquipInfo(deco[name])
