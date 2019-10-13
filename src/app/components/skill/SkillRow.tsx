import React from 'react'
import SkillLevelIcon from './SkillLevelIcon'
import SkillSelect from './SkillSelect'

require('./SkillRow.css')

interface Props {
  id: string
  name: string
  value: number
  addableValue: number | null
  items: number[]
}

const SkillRow: React.FC<Props> = ({ id, name, value, addableValue, items }) =>
  <div className="SkillRow">
    <div className="SkillRow-name">
      {name}
      <SkillLevelIcon id={id} value={value} addableValue={addableValue} items={items} />
    </div>
    <SkillSelect id={id} value={value} items={items} />
  </div>

export default SkillRow
