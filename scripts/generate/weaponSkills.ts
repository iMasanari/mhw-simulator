import { promises as fs } from 'fs'

export const getWeaponSkills = async () => {
  const txt = await fs.readFile('./lib/weaponSkills.txt', 'utf-8')

  const result = txt.split('\n')

  return result
}
