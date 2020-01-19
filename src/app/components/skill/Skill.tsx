import React from 'react'
import skillList from '~/generated/skillList.json'
import HeadingTitle from '../common/HeadingTitle'
import SkillFilter from './SkillFilter'
import Skill from './SkillList'

interface Props {
  skillFilter: string
  skillList: typeof skillList
  setSkillFilter: React.Dispatch<React.SetStateAction<string>>
}

const Skills: React.FC<Props> = ({ skillFilter, setSkillFilter, skillList }) =>
  <div className="App-skill">
    <HeadingTitle title="スキル" />
    <SkillFilter value={skillFilter} setValue={setSkillFilter} />
    <Skill skillList={skillList} />
  </div>

export default Skills
