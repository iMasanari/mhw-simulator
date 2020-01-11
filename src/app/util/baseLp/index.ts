import createLp from './createLp'
import { decoModule } from './modules/deco'
import { defModule } from './modules/def'
import { armModule, bodyModule, charmModule, headModule, legModule, onesetModule, wstModule } from './modules/equips'
import { seriesSkillModule, skillModule } from './modules/skills'
import { slotsModule } from './modules/slots'
import { weaponSkillModule, weaponSlotModule } from './modules/weapons'

export default createLp([
  slotsModule(),
  defModule(),
  headModule(),
  bodyModule(),
  armModule(),
  wstModule(),
  legModule(),
  charmModule(),
  decoModule(),
  onesetModule(),
  skillModule(),
  seriesSkillModule(),
  weaponSlotModule(),
  weaponSkillModule(),
])
