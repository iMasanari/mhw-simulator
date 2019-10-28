import React, { useCallback, useMemo } from 'react'
import skillList from '~/generated/skillList.json'

require('./SkillFilter.css')

interface Props {
  value: string
  setValue: React.Dispatch<React.SetStateAction<string>>
}

const categories = Array.from(new Set(skillList.map(v => v.category)))
const createId = () => 'datalistId-' + Math.random().toString(36).slice(-6)

const SkillFilter: React.FC<Props> = ({ value, setValue }) => {
  const listId = useMemo(createId, [])

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value)
  }, [setValue])

  return (
    <div className="SkillFilter">
      <input
        className="SkillFilter-input"
        value={value}
        onChange={onChange}
        placeholder="フィルタ: スキル名 or カテゴリ"
        list={value ? undefined : listId}
      />
      <datalist id={listId}>
        {categories.map((item) =>
          <option key={item} value={item} />
        )}
      </datalist>
    </div>
  )
}

export default SkillFilter
