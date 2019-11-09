import React, { useMemo, useState } from 'react'
import { useIgnoreArmors, useIgnoreArmorsActions } from '~/app/hooks/ignoreArmors'
import charmGroup from '~/generated/charmGroup.json'
import CharmTable from './CharmTable'

interface Props {
}

const Charms: React.FC<Props> = () => {
  const ignoreArmors = useIgnoreArmors()
  const { toggle } = useIgnoreArmorsActions()

  const [filter, setFilter] = useState('')

  const charmList = useMemo(() => Object.entries(charmGroup).filter(([name]) => ~name.indexOf(filter)), [filter])

  return (
    <div>
      <p>
        検索で護石を除外する場合、下記のチェックを外してください。
        <br />
        内容は自動的に保存されますが、開発の都合でリセットされることがあります。
        </p>
      <input type="text"
        value={filter}
        onChange={e => { setFilter(e.currentTarget.value) }}
        placeholder="フィルタ: 護石名"
      />
      <CharmTable charmGroups={charmList} ignoreArmors={ignoreArmors} toggleIgnoreArmors={toggle} />
    </div>
  )
}

export default Charms
