import * as data from '~/app/util/generatedUtil'
import execute, { Condition } from './execute'

const skillSet = new Set(data.allSkill)

export interface Equipment {
  z: number
  head: string | undefined
  body: string | undefined
  arm: string | undefined
  wst: string | undefined
  leg: string | undefined
  charm: string | undefined
  decos: { name: string, value: number }[]
  skills: { name: string, value: number }[]
  def: number
  slot1: number
  slot2: number
  slot3: number
  slot4: number
  weaponSkill: string | undefined
}

const findArmor = (list: string[], data: Record<string, any>) =>
  list.find(name => data[name])

const findWeaponSkill = (list: string[]) => {
  const weaponSkill = list.find(name => name.startsWith('yws_'))?.slice(4)
  return weaponSkill === 'auto' ? 'なし' : weaponSkill
}

const getSlots = (result: Record<string, number>) => {
  const slot3Over = Math.min(result.y_1, result.y_2, result.y_3)
  const slot2Over = Math.min(result.y_1, result.y_2)

  const slot4 = Math.min(result.y_1, result.y_2, result.y_3, result.y_4)
  const slot3 = slot3Over - slot4
  const slot2 = slot2Over - slot3Over
  const slot1 = result.y_1 - slot2Over

  return [slot1, slot2, slot3, slot4]
}

export default async (objective: string, condition: Condition): Promise<Equipment | null> => {
  const result = await execute(objective, condition)

  if (!result) return null

  const list = Object.keys(result.vars).filter(key => result.vars[key])

  const head = findArmor(list, data.head)
  const body = findArmor(list, data.body)
  const arm = findArmor(list, data.arm)
  const wst = findArmor(list, data.wst)
  const leg = findArmor(list, data.leg)
  const charm = findArmor(list, data.charm)

  const decos = list
    .filter(name => data.deco[name])
    .map(name => ({ name, value: result.vars[name], level: name[name.length - 2] }))
    .sort((a, b) => a.level === b.level ? 0 : a.level < b.level ? -1 : 1)

  const skills = list
    .filter(name => skillSet.has(name))
    .map(name => ({ name, value: result.vars[name] }))
    .sort((a, b) => b.value - a.value)

  const { ydl: def } = result.vars
  const [slot1, slot2, slot3, slot4] = getSlots(result.vars)

  const weaponSkill = findWeaponSkill(list)

  return {
    z: Math.round(result.z), // 一部、整数条件を外しており、小数誤差が発生するため
    head,
    body,
    arm,
    wst,
    leg,
    charm,
    decos,
    skills,
    def,
    slot1,
    slot2,
    slot3,
    slot4,
    weaponSkill,
  }
}
