import React from 'react'
import skillList from '~/app/data/skill.json'
import { useActiveSkill } from '~/app/hooks/activeSkill'
import { useAddableSkill } from '~/app/hooks/addableSkill'
import SkillRow from './SkillRow'

require('./Skill.css')

interface Props {
  skillList: typeof skillList
}

const Skill: React.FC<Props> = ({ skillList }) => {
  const activeSkill = useActiveSkill()
  const addableSkill = useAddableSkill()

  return (
    <ul className="Skill">
      {skillList.map(({ name, items }) =>
        <li key={name} className="Skill-li">
          <SkillRow
            name={name}
            value={activeSkill[name]}
            addableValue={addableSkill[name]}
            items={items}
          />
        </li>
      )}
    </ul>
  )
}

export default Skill
