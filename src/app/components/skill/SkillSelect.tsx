import React, { useCallback } from 'react'
import { useActiveSkillActions } from '~/app/hooks/activeSkill'

require('./SkillSelect.css')

interface Props {
  id: string
  value: number
  items: number[]
}

const SkillSelect: React.FC<Props> = ({ id, value, items }) => {
  const { update } = useActiveSkillActions()

  const onChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    update(id, +e.currentTarget.value)
  }, [id, update])

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
