import React from 'react'
import { useTab, useTabActions } from '~/app/hooks/tab'

require('./Tab.css')

interface Props {
}

const tabKeyList = ['about', 'result', 'armors', 'charms', 'decos'] as const

const Tab: React.FC<Props> = () => {
  const tab = useTab()
  const { set } = useTabActions()

  return (
    <ul className="Tab">
      {tabKeyList.map((name) =>
        <li key={name}
          className={`Tab-li ${name === tab ? 'on' : ''}`}
          onClick={() => set(name)}
        >
          {name}
        </li>
      )}
    </ul>
  )
}

export default Tab
