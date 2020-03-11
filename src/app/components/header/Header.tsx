import React from 'react'
import { useTranslation } from 'react-i18next'
import HeaderNav from './HeaderNav'
import Langages from './Languages'

require('./Header.css')

interface Props {
}

const Header: React.FC<Props> = () => {
  const { t } = useTranslation()

  return (
    <header className="Header">
      <h1 className="Header-title">
        {t('MHW:ICEBORNE スキルシミュ')}
      </h1>
      <HeaderNav />
      <Langages />
    </header>
  )
}

export default Header
