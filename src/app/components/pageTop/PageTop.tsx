import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

require('./PageTop.css')

interface Props {
}

const PageTop: React.FC<Props> = () => {
  const { t } = useTranslation()
  const [isTop, setTop] = useState(true)

  useEffect(() => {
    const listener = () => {
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop

      setTop(scrollTop < 10)
    }

    window.addEventListener('scroll', listener)

    return () => window.removeEventListener('scroll', listener)
  }, [])

  return (
    <div
      className="PageTop"
      style={{ display: isTop ? 'none' : undefined }}
      onClick={() => scrollTo(0, 0)}
    >
      {t('TOP')}
    </div>
  )
}

export default PageTop
