import React from 'react'
import skillList from '~/app/data/skill.json'
import { Skill, UpdateSkill } from '~/app/hooks/useSkill'
import SkillListRow from './SkillRow'

require('./Skill.css')

interface Props {
  activeSkill: Skill
  updateActiveSkill: UpdateSkill
}

const Skill: React.FC<Props> = ({ activeSkill, updateActiveSkill }) =>
  <ul className="Skill">
    {skillList.map(({ id, name, items }) =>
      <li key={id} className="Skill-li">
        <SkillListRow
          id={id}
          name={name}
          value={activeSkill[id]}
          items={items}
          onUpdate={updateActiveSkill}
        />
      </li>
    )}
  </ul>

export default Skill
