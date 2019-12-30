import React from 'react'
import { useWeapon, useWeaponActions } from '~/app/hooks/weapon'
import { weaponSkills } from '~/app/util/generatedUtil'
import Select from '../common/Select'

require('./WeaponSkills.css')

interface Props {
}

const WeaponSkills: React.FC<Props> = () => {
  const { skill } = useWeapon()
  const { setSkill } = useWeaponActions()

  const onChange = (e: React.FormEvent<HTMLSelectElement>) =>
    setSkill(e.currentTarget.value)

  return (
    <div className="WeaponSkills">
      <div>覚醒スキル</div>
      <Select value={skill} onChange={onChange}>
        <option value="yws_auto">自動</option>
        {weaponSkills.map(skill =>
          <option key={skill} value={`yws_${skill}`}>{skill}</option>
        )}
      </Select>
    </div>
  )
}

export default WeaponSkills
