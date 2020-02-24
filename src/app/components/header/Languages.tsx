import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

require('./Languages.css')

const Langages: React.FC = () => {
  const { i18n } = useTranslation()
  const [language, setLanguage] = useState(i18n.language)

  useEffect(() => {
    i18n.on('languageChanged', setLanguage)

    return () => i18n.off('languageChanged', setLanguage)
  })

  return (
    <div>
      <span
        className={language !== 'ja' ? 'Languages-link' : undefined}
        onClick={() => i18n.changeLanguage('ja')}
      >
        日本語
      </span>
      {' / '}
      <span
        className={language !== 'en' ? 'Languages-link' : undefined}
        onClick={() => i18n.changeLanguage('en')}
      >
        English
      </span>
    </div>
  )
}

export default Langages
