import React, { useMemo, useState } from 'react'
import { deco as decoData } from '~/app/data'
import { useDecos, useDecosActions } from '~/app/hooks/decos'

require('./Decos.css')

interface Props {
}

const createList = (filter: string) =>
  (Object.keys(decoData) as (keyof typeof decoData)[])
    .filter(id => ~decoData[id].indexOf(filter))
    .map(id => [id, decoData[id]])

const toNumber = (str: string) => {
  const num = +str

  if (str === '' || Number.isNaN(num)) {
    return null
  }

  return num
}

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
          {decoList.map(([id, name]) =>
            <li key={id}>
              {name}
              <input
                className="Decos-numberInput"
                type="number"
                min="0"
                max="9"
                value={decos[id] != null ? decos[id] : ''}
                onChange={e => set(id, toNumber(e.currentTarget.value))}
              />
            </li>
          )}
        </ul>
      </div>
    </div>
  )
}

export default Decos
