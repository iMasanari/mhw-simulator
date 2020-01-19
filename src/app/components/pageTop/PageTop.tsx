import React, { useEffect, useState } from 'react'

require('./PageTop.css')

interface Props {
}

const PageTop: React.FC<Props> = () => {
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
      TOP
    </div>
  )
}

export default PageTop
