import React from 'react'
import skillList from '~/app/data/skill.json'
import { useAddableSkill } from '~/app/hooks/addableSkill'
import { Skill, UpdateSkill } from '~/app/hooks/useSkill'
import SkillRow from './SkillRow'

require('./Skill.css')

interface Props {
  skillList: typeof skillList
  activeSkill: Skill
  updateActiveSkill: UpdateSkill
}

const Skill: React.FC<Props> = ({ skillList, activeSkill, updateActiveSkill }) => {
  const addableSkill = useAddableSkill()

  return (
    <ul className="Skill">
      {skillList.map(({ id, name, items }) =>
        <li key={id} className="Skill-li">
          <SkillRow
            id={id}
            name={name}
            value={activeSkill[id]}
            addableValue={addableSkill[id]}
            items={items}
            onUpdate={updateActiveSkill}
          />
        </li>
      )}
    </ul>
  )
}

export default Skill
