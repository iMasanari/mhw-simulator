import { promises as fs } from 'fs'
import fromEntries from '../util/fromEntries'

const findArmor = (list: string[], prefix: string, safix: string) =>
  list.find(name =>
    name.startsWith(prefix) && (safix ? name.endsWith(safix) : !/[αβγ]$/.test(name))
  )

export const getArmorGroup = async (armors: string[][]) => {
  const txt = await fs.readFile('./lib/armorGroup.txt', 'utf-8')

  const result = fromEntries(
    txt.split('\n').map(group => {
      const [_, prefix, safix] = group.match(/^(.+?)([αβγ]?)$/)!
      const equips = armors.map(list => findArmor(list, prefix, safix))

      return [group, equips]
    })
  )

  return result
}
