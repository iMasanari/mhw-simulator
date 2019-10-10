import React from 'react'
import { UpdateSkill } from '~/app/hooks/useSkill'

require('./SkillLevelIcon.css')

interface Props {
  id: string
  value: number
  addableValue: number | null
  items: number[]
  onUpdate: UpdateSkill
}

const SkillLevelIcon: React.FC<Props> = ({ id, value, addableValue, items, onUpdate }) =>
  <ul className="SkillLevelIcon">
    {items.map((level) =>
      <li
        key={level}
        className={
          `SkillLevelIcon-li ${
          value === level ? 'on' : ''} ${
          addableValue == null ? '' : level <= addableValue ? 'addable' : 'unaddable'}`
        }
        onClick={() => onUpdate(id, level)}
      />
    )}
  </ul>

export default SkillLevelIcon
