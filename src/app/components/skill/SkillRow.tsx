import React from 'react'
import SkillLevelIcon from './SkillLevelIcon'
import SkillSelect from './SkillSelect'

require('./SkillRow.css')

interface Props {
  name: string
  value: number
  addableValue: number | null
  items: number[]
}

const SkillRow: React.FC<Props> = ({ name, value, addableValue, items }) =>
  <div className="SkillRow">
    <div className="SkillRow-name">
      {name}
      <SkillLevelIcon name={name} value={value} addableValue={addableValue} items={items} />
    </div>
    <SkillSelect name={name} value={value} items={items} />
  </div>

export default SkillRow
