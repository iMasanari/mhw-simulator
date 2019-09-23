import React from 'react'
import { skill } from '~/app/data'
import { Skill, UpdateSkill } from '~/app/hooks/useSkill'
import SkillInput from './SkillInput'

require('./Skill.css')

interface Props {
  activeSkill: Skill
  updateActiveSkill: UpdateSkill
}

const skillList = Object.keys(skill).map(key => [key, skill[key]] as const)

const Skill: React.FC<Props> = ({ activeSkill, updateActiveSkill }) =>
  <ul className="Skill">
    {skillList.map(([key, value]) =>
      <li key={key} className="Skill-li">
        <span>{value}</span>
        <SkillInput id={key} value={activeSkill[key]} onUpdate={updateActiveSkill} />
      </li>
    )}
  </ul>

export default Skill
