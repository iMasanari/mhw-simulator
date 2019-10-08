import React from 'react'
import { UpdateSkill } from '~/app/hooks/useSkill'
import SkillLevelIcon from './SkillLevelIcon'
import SkillSelect from './SkillSelect'

require('./SkillRow.css')

interface Props {
  id: string
  name: string
  value: number
  addableValue: number | null
  items: number[]
  onUpdate: UpdateSkill
}

const SkillRow: React.FC<Props> = ({ id, name, value, addableValue, items, onUpdate }) =>
  <div className="SkillRow">
    <div className="SkillRow-name">
      {name}
      <SkillLevelIcon id={id} value={value} addableValue={addableValue} items={items} onUpdate={onUpdate} />
    </div>
    <SkillSelect id={id} value={value} items={items} onUpdate={onUpdate} />
  </div>

export default SkillRow
