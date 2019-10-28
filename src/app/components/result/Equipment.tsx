import React, { useCallback, useState } from 'react'
import { Equipment } from '~/worker/service/calc'
import EquipmentTable from './EquipmentTable'
import SkillTable from './SkillTable'

require('./Equipment.css')

interface Props {
  title: string
  result: Equipment
  initState?: boolean
}

const Equipment: React.FC<Props> = ({ title, result, initState }) => {
  const [isOpen, setOpen] = useState(initState)

  const toggleOpen = useCallback(() => setOpen(v => !v), [])

  return (
    <div className="Equipment">
      <div
        className={`Equipment-thumb ${isOpen ? 'on' : ''}`}
        onClick={toggleOpen}
      >
        <div className="Equipment-title">{title}</div>
      </div>
      {isOpen &&
        <div className="Equipment-content">
          <div className="Equipment-column">
            <EquipmentTable equipment={result} />
          </div>
          <div className="Equipment-column">
            <SkillTable skillList={result.skills} />
          </div>
        </div>
      }
    </div>
  )
}

export default Equipment
