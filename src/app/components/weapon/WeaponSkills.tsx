import React from 'react'
import { useTranslation } from 'react-i18next'
import { useWeapon, useWeaponActions } from '~/app/hooks/weapon'
import { weaponSkills } from '~/app/util/generatedUtil'
import Select from '../common/Select'

require('./WeaponSkills.css')

interface Props {
}

const WeaponSkills: React.FC<Props> = () => {
  const { t } = useTranslation()
  const [tSkill] = useTranslation('skills')
  const { skill } = useWeapon()
  const { setSkill } = useWeaponActions()

  const onChange = (e: React.FormEvent<HTMLSelectElement>) =>
    setSkill(e.currentTarget.value)

  return (
    <div className="WeaponSkills">
      <div>{t('武器スキル')}</div>
      <Select value={skill} onChange={onChange}>
        <optgroup label={t('武器スキル')}>
          <option value="yws_none">{t('なし')}</option>
          <option value="yws_auto">{t('自動')}</option>
        </optgroup>
        <optgroup label={tSkill('爛輝龍の真髄')}>
          <option value={'yws_爛輝龍の真髄'}>{tSkill('爛輝龍の真髄')}</option>
        </optgroup>
        <optgroup label={t('覚醒スキル')}>
          {weaponSkills.map(skill =>
            <option key={skill} value={`yws_${skill}`}>{tSkill(skill)}</option>
          )}
        </optgroup>
      </Select>
    </div>
  )
}

export default WeaponSkills
