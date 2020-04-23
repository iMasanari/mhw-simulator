import React from 'react'
import { useTranslation } from 'react-i18next'
import { useWeapon } from '~/app/hooks/weapon'
import HeadingTitle from '../common/HeadingTitle'
import WeaponSkills from './WeaponSkills'
import WeaponSlots from './WeaponSlots'

interface Props {
}

const Weapon: React.FC<Props> = () => {
  const { t } = useTranslation()
  const { skill } = useWeapon()

  return (
    <div>
      <HeadingTitle title={t('武器')} />
      <WeaponSlots />
      {skill !== 'yws_none' && skill !== 'yws_爛輝龍の真髄' && (
        <WeaponSkills />
      )}
    </div>
  )
}

export default Weapon
