import React from 'react'
import { useWeaponSkill, useWeaponSkillActions } from '~/app/hooks/weaponSkill'
import { weaponSkills } from '~/app/util/generatedUtil'
import Select from '../common/Select'

require('./WeaponSkills.css')

interface Props {
}

const WeaponSkills: React.FC<Props> = () => {
  const value = useWeaponSkill()
  const { set } = useWeaponSkillActions()

  const onChange = (e: React.FormEvent<HTMLSelectElement>) =>
    set(e.currentTarget.value)

  return (
    <div className="WeaponSkills">
      <div>覚醒スキル</div>
      <Select value={value} onChange={onChange}>
        <option value="yws_auto">自動</option>
        {weaponSkills.map(skill =>
          <option key={skill} value={`yws_${skill}`}>{skill}</option>
        )}
      </Select>
    </div>
  )
}

export default WeaponSkills
