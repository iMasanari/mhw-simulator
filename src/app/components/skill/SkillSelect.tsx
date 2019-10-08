import React, { useCallback } from 'react'
import { UpdateSkill } from '~/app/hooks/useSkill'

require('./SkillSelect.css')

interface Props {
  id: string
  value: number
  items: number[]
  onUpdate: UpdateSkill
}

const SkillSelect: React.FC<Props> = ({ id, value, items, onUpdate }) => {
  const onChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    onUpdate(id, +e.currentTarget.value)
  }, [id, onUpdate])

  return (
    <div className="SkillSelect">
      <select
        className="SkillSelect-select"
        value={value || ''}
        onChange={onChange}
      >
        <option key="" value=""></option>
        {items.map((level) =>
          <option key={level} value={level}>Lv {level}</option>
        )}
      </select>
    </div>
  )
}

export default SkillSelect
