import React from 'react'
import { useActiveSkillActions } from '~/app/hooks/activeSkill'

require('./SkillLevelIcon.css')

interface Props {
  name: string
  value: number
  addableValue: number | null
  items: number[]
}

const SkillLevelIcon: React.FC<Props> = ({ name, value, addableValue, items }) => {
  const { update } = useActiveSkillActions()

  return (
    <ul className="SkillLevelIcon">
      {items.map((level) =>
        <li
          key={level}
          className={
            `SkillLevelIcon-li ${
            value === level ? 'on' : ''} ${
            addableValue == null ? '' : level <= addableValue ? 'addable' : 'unaddable'}`
          }
          onClick={() => update(name, level)}
        />
      )}
    </ul>
  )
}

export default SkillLevelIcon
