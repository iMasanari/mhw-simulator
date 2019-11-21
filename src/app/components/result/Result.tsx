import React from 'react'
import { useResult } from '~/app/hooks/result'
import { Equipment as IEquipment } from '~/app/util/calc'
import Equipment from './Equipment'

interface Props {
  def?: IEquipment
  slot1?: IEquipment
  slot2?: IEquipment
  slot3?: IEquipment
  slot4?: IEquipment
  list?: IEquipment[]
}

const Result: React.FC<Props> = () => {
  const { list } = useResult()

  return (
    <>
      {!!list &&
        list.filter(Boolean).map((result, i) =>
          <Equipment
            key={i}
            title={`10件検索: 装備${i + 1} `}
            result={result}
            initState={i === 0}
          />
        )
      }
    </>
  )
}

export default Result
