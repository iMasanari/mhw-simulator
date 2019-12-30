import React, { useMemo, useState } from 'react'
import { useIgnoreArmors, useIgnoreArmorsActions } from '~/app/hooks/ignoreArmors'
import armorGroup from '~/generated/armorGroup.json'
import ArmorTable from './ArmorTable'

require('./Armors.css')

interface Props {
}

const armorGroupEntries = Object.entries(armorGroup)

const Armors: React.FC<Props> = () => {
  const ignoreArmors = useIgnoreArmors()
  const { toggle } = useIgnoreArmorsActions()
  const [filter, setFilter] = useState('')

  const list = useMemo(() => (
    armorGroupEntries
      .map(([group, equips]) => [group, equips.map(name => name?.includes(filter) ? name : null)] as const)
      .filter(([group, equips]) => equips.some(Boolean))
  ), [filter])

  return (
    <div>
      <p>
        検索で防具を除外する場合、下記のチェックを外してください。
        <br />
        内容は自動的に保存されますが、開発の都合でリセットされることがあります。
      </p>
      <input type="text"
        value={filter}
        onChange={e => { setFilter(e.currentTarget.value) }}
        placeholder="フィルタ: 防具名"
      />
      <ArmorTable armorGroups={list} ignoreArmors={ignoreArmors} toggleIgnoreArmors={toggle} />
    </div>
  )
}

export default Armors
