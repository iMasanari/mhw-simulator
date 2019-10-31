import React, { useMemo, useState } from 'react'
import { useDecos, useDecosActions } from '~/app/hooks/decos'
import toNumber from '~/app/util/toNumber'
import decoData from '~/generated/deco.json'

require('./Decos.css')

interface Props {
}

const createList = (filter: string) =>
  Object.keys(decoData).filter(name => ~name.indexOf(filter))

const Decos: React.FC<Props> = () => {
  const decos = useDecos()
  const { set } = useDecosActions()
  const [filter, setFilter] = useState('')

  const decoList = useMemo(() => createList(filter), [filter])

  return (
    <div>
      <p>
        検索で装飾品の所持数を制限する場合、下記にその個数を指定してください。
        <br />
        内容は自動的に保存されますが、開発の都合でリセットされることがあります。
      </p>
      <input type="text"
        value={filter}
        onChange={e => { setFilter(e.currentTarget.value) }}
        placeholder="フィルタ: 装飾品名"
      />
      <div className="Decos-contents">
        <ul>
          {decoList.map(name =>
            <li key={name}>
              {name}
              <input
                className="Decos-numberInput"
                type="number"
                min="0"
                max="9"
                value={decos[name] != null ? decos[name] : ''}
                onChange={e => set(name, toNumber(e.currentTarget.value))}
              />
            </li>
          )}
        </ul>
      </div>
    </div>
  )
}

export default Decos
