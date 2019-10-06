import React, { useMemo, useState } from 'react'
import { deco as decoData } from '~/app/data'
import { Decos } from '~/app/hooks/useDecos'

require('./Decos.css')

interface Props {
  decos: Decos
  setDeco: (deco: string, value: number | null) => void
}

const createList = (filter: string) =>
  Object.keys(decoData)
    .filter(id => ~decoData[id].indexOf(filter))
    .map(id => [id, decoData[id]])

const toNumber = (str: string) => {
  const num = +str

  if (str === '' || Number.isNaN(num)) {
    return null
  }

  return num
}

const Decos: React.FC<Props> = ({ decos, setDeco }) => {
  const [filter, setFilter] = useState('')

  const decoList = useMemo(() => createList(filter), [filter])

  return (
    <div>
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
                onChange={e => setDeco(id, toNumber(e.currentTarget.value))}
              />
            </li>
          )}
        </ul>
      </div>
    </div>
  )
}

export default Decos
