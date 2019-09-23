import React, { ChangeEvent, useCallback } from 'react'
import { UpdateSkill } from '~/app/hooks/useSkill'

require('./SkillInput.css')

interface Props {
  id: string
  value: number
  onUpdate: UpdateSkill
}

const useOnChange = (onUpdate: UpdateSkill, id: string) =>
  useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value
    onUpdate(id, value === '' ? null : +value)
  }, [onUpdate, id])

const SkillInput: React.FC<Props> = ({ id, value, onUpdate }) => {
  const onChange = useOnChange(onUpdate, id)

  return (
    <input
      className="SkillInput"
      type="number"
      value={value + ''}
      min={0}
      onChange={onChange}
    />
  )
}

export default SkillInput
