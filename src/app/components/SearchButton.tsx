import React, { useCallback } from 'react'
import { Skill } from '~/app/hooks/useSkill'
import search, { Result } from '../service/search'

require('./SearchButton.css')

interface Props {
  skill: Skill
  setResult: (result: Result | null) => void
}

const SearchButton: React.FC<Props> = ({ skill, setResult }) => {
  const onClick = useCallback(async () => {
    const result = await search(skill)
    setResult(result)
  }, [skill, setResult])

  return (
    <button className="SearchButton" onClick={onClick}>検索</button>
  )
}
export default SearchButton
