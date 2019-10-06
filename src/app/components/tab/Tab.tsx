import React from 'react'

require('./Tab.css')

interface Props {
  value: string
  list: string[]
  onSelect: (name: string) => void
}

const Tab: React.FC<Props> = ({ value, list, onSelect }) =>
  <ul className="Tab">
    {list.map((name) =>
      <li key={name}
        className={`Tab-li ${name === value ? 'on' : ''}`}
        onClick={() => onSelect(name)}
      >
        {name}
      </li>
    )}
  </ul>

export default Tab
