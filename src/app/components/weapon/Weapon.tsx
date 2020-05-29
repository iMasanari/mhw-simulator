import React from 'react'
import { useTranslation } from 'react-i18next'
import HeadingTitle from '../common/HeadingTitle'
import WeaponSkills from './WeaponSkills'
import WeaponSlots from './WeaponSlots'

interface Props {
}

const Weapon: React.FC<Props> = () => {
  const { t } = useTranslation()

  return (
    <div>
      <HeadingTitle title={t('武器')} />
      <WeaponSlots />
      <WeaponSkills />
    </div>
  )
}

export default Weapon
