import SkillRow from './SkillRow'
import { useActiveSkill } from '~/app/hooks/activeSkill'
import { useAddableSkill } from '~/app/hooks/addableSkill'
import skillList from '~/generated/skillList.json'

require('./SkillList.css')

interface Props {
  skillList: typeof skillList
}

const SkillList: React.FC<Props> = ({ skillList }) => {
  const activeSkill = useActiveSkill()
  const addableSkill = useAddableSkill()

  return (
    <ul className="SkillList">
      {skillList.map(({ name, items }) =>
        <li key={name}>
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

export default SkillList
