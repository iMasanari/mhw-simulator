import React from 'react'
import skillList from '~/app/data/skill.json'
import { Skill, UpdateSkill } from '~/app/hooks/useSkill'
import SkillInput from './SkillInput'

require('./Skill.css')

interface Props {
  activeSkill: Skill
  updateActiveSkill: UpdateSkill
}

const Skill: React.FC<Props> = ({ activeSkill, updateActiveSkill }) =>
  <ul className="Skill">
    {skillList.map(({ id, name }) =>
      <li key={id} className="Skill-li">
        <span>{name}</span>
        <SkillInput id={id} value={activeSkill[id]} onUpdate={updateActiveSkill} />
      </li>
    )}
  </ul>

export default Skill
