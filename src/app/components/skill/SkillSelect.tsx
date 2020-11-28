import { useCallback } from 'react'
import Select from '../common/Select'
import { useActiveSkillActions } from '~/app/hooks/activeSkill'

interface Props {
  name: string
  value: number
  items: number[]
}

const SkillSelect: React.FC<Props> = ({ name, value, items }) => {
  const { update } = useActiveSkillActions()

  const onChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    update(name, +e.currentTarget.value)
  }, [name, update])

  return (
    <Select value={value || ''} onChange={onChange}>
      <option key="" value=""></option>
      {items.map((level) =>
        <option key={level} value={level}>Lv {level}</option>
      )}
    </Select>
  )
}

export default SkillSelect
