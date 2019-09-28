import React from 'react'
import skillList from '~/app/data/skill.json'
import { Skill, UpdateSkill } from '~/app/hooks/useSkill'
import SkillRow from './SkillRow'

require('./Skill.css')

interface Props {
  skillList: typeof skillList
  activeSkill: Skill
  addableSkill: Skill
  updateActiveSkill: UpdateSkill
}

const Skill: React.FC<Props> = ({ skillList, activeSkill, addableSkill, updateActiveSkill }) =>
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

export default Skill
