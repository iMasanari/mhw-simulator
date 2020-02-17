import React from 'react'
import { useTranslation } from 'react-i18next'
import skillList from '~/generated/skillList.json'
import HeadingTitle from '../common/HeadingTitle'
import SkillFilter from './SkillFilter'
import Skill from './SkillList'

interface Props {
  skillFilter: string
  skillList: typeof skillList
  setSkillFilter: React.Dispatch<React.SetStateAction<string>>
}

const Skills: React.FC<Props> = ({ skillFilter, setSkillFilter, skillList }) => {
  const { t } = useTranslation()

  return (
    <div className="App-skill">
      <HeadingTitle title={t('スキル')} />
      <SkillFilter value={skillFilter} setValue={setSkillFilter} />
      <Skill skillList={skillList} />
    </div>
  )
}

export default Skills
