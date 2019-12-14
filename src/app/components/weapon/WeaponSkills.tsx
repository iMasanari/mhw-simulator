import React, { useState } from 'react'
import { weaponSkills } from '~/app/util/generatedUtil'
import Select from '../common/Select'

require('./WeaponSkills.css')

interface Props {
}

const WeaponSkills: React.FC<Props> = () => {
  const [value, setValue] = useState(0)

  const onChange = (e: React.FormEvent<HTMLSelectElement>) =>
    setValue(+e.currentTarget.value)

  return (
    <div className="WeaponSkills">
      <div>武器スキル</div>
      <Select value={value} onChange={onChange}>
        <option value="0">なし</option>
        <option>自動</option>
        {weaponSkills.map(skill =>
          <option>{skill}</option>
        )}
      </Select>
    </div>
  )
}

export default WeaponSkills
