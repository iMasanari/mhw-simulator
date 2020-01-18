import React, { useCallback } from 'react'
import skillList from '~/generated/skillList.json'
import TextFild from '../common/TextFild'

require('./SkillFilter.css')

interface Props {
  value: string
  setValue: React.Dispatch<React.SetStateAction<string>>
}

const categories = Array.from(new Set(skillList.map(v => v.category)))

const SkillFilter: React.FC<Props> = ({ value, setValue }) => {
  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value)
  }, [setValue])

  return (
    <div className="SkillFilter">
      <TextFild
        className="SkillFilter-input"
        value={value}
        onChange={onChange}
        placeholder="フィルタ: スキル名 or カテゴリ"
        datalist={value ? undefined : categories}
      />
    </div>
  )
}

export default SkillFilter
