import React, { useMemo, useState } from 'react'
import { arm, body, charm, head, leg, wst } from '~/app/data'
import { Armors } from '~/app/hooks/useIgnoreArmors'
import ArmorList from './ArmorList'

require('./Armors.css')

interface Props {
  ignoreArmors: Armors
  toggleIgnoreArmors: (armor: string) => void
}

const createList = (armorData: Record<string, string>, filter: string) =>
  Object.keys(armorData)
    .filter(id => ~armorData[id].indexOf(filter))
    .map(id => [id, armorData[id]])

const Armors: React.FC<Props> = ({ ignoreArmors, toggleIgnoreArmors }) => {
  const [filter, setFilter] = useState('')

  const headList = useMemo(() => createList(head, filter), [filter])
  const bodyList = useMemo(() => createList(body, filter), [filter])
  const armList = useMemo(() => createList(arm, filter), [filter])
  const wstList = useMemo(() => createList(wst, filter), [filter])
  const legList = useMemo(() => createList(leg, filter), [filter])
  const charmList = useMemo(() => createList(charm, filter), [filter])

  return (
    <div>
      <input type="text"
        value={filter}
        onChange={e => { setFilter(e.currentTarget.value) }}
        placeholder="フィルタ: 防具名"
      />
      <div className="Armors-contents">
        <ArmorList armors={headList} ignoreArmors={ignoreArmors} toggleIgnoreArmors={toggleIgnoreArmors} />
        <ArmorList armors={bodyList} ignoreArmors={ignoreArmors} toggleIgnoreArmors={toggleIgnoreArmors} />
        <ArmorList armors={armList} ignoreArmors={ignoreArmors} toggleIgnoreArmors={toggleIgnoreArmors} />
        <ArmorList armors={wstList} ignoreArmors={ignoreArmors} toggleIgnoreArmors={toggleIgnoreArmors} />
        <ArmorList armors={legList} ignoreArmors={ignoreArmors} toggleIgnoreArmors={toggleIgnoreArmors} />
        <ArmorList armors={charmList} ignoreArmors={ignoreArmors} toggleIgnoreArmors={toggleIgnoreArmors} />
      </div>
    </div>
  )
}

export default Armors
