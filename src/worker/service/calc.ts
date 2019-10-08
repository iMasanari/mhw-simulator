import execute, { Condition } from './execute'

export interface Result {
  head: string | undefined
  body: string | undefined
  arm: string | undefined
  wst: string | undefined
  leg: string | undefined
  charm: string | undefined
  decos: { id: string, count: number }[]
  skills: { id: string, count: number }[]
  def: number
  slot1: number
  slot2: number
  slot3: number
  slot4: number
}

const findArmor = (list: string[], prefix: string) =>
  list.find(id => id.startsWith(prefix))

const getSlots = (result: Record<string, number>) => {
  const slot3Over = Math.min(result.y_1, result.y_2, result.y_3)
  const slot2Over = Math.min(result.y_1, result.y_2)

  const slot4 = Math.min(result.y_1, result.y_2, result.y_3, result.y_4)
  const slot3 = slot3Over - slot4
  const slot2 = slot2Over - slot3Over
  const slot1 = result.y_1 - slot2Over

  return [slot1, slot2, slot3, slot4]
}

export default (condition: Condition, objective: string): Result => {
  const result = execute(condition, objective)

  const list = Object.keys(result).filter(key => result[key])

  const head = findArmor(list, 'xh')
  const body = findArmor(list, 'xb')
  const arm = findArmor(list, 'xa')
  const wst = findArmor(list, 'xw')
  const leg = findArmor(list, 'xl')
  const charm = findArmor(list, 'xc')

  const decos = list
    .filter(id => id.startsWith('xd'))
    .map(id => ({ id, count: result[id] }))

  const skills = list
    .filter(id => id.startsWith('ys'))
    .map(id => ({ id, count: result[id] }))
    .sort((a, b) => b.count - a.count)

  const { ydl: def } = result
  const [slot1, slot2, slot3, slot4] = getSlots(result)

  return {
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
  }
}
