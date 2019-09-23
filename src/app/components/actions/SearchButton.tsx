import React, { useCallback } from 'react'
import { Skill } from '~/app/hooks/useSkill'
import search, { Result } from '~/app/service/search'

require('./SearchButton.css')

interface Props {
  skill: Skill
  setResult: (result: Result | null) => void
  setSkillLog: React.Dispatch<React.SetStateAction<Skill>>
}

const SearchButton: React.FC<Props> = ({ skill, setResult, setSkillLog }) => {
  const onClick = useCallback(async () => {
    const time = Date.now()
    const log = Object.keys(skill).reduce(
      (acc, key) => (acc[key] = time + skill[key], acc),
      {} as Skill
    )

    setSkillLog(state => ({ ...state, ...log }))

    const result = await search(skill)
    setResult(result)
  }, [skill, setResult])

  return (
    <button className="SearchButton" onClick={onClick}>検索</button>
  )
}
export default SearchButton
