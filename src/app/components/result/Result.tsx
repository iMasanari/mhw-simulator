import React from 'react'
import { useResult } from '~/app/hooks/result'
import { Equipment as IEquipment } from '~/worker/service/calc'
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
  const { def, slot1, slot2, slot3, slot4, list } = useResult()

  return (
    <>
      {list
        ? list.filter(Boolean).map((result, i) =>
          <Equipment
            key={i}
            title={`10件検索: 装備${i + 1} `}
            result={result}
            initState={i === 0}
          />
        )
        : <>
          {!!def &&
            <Equipment
              title={`防御力最大: ${def.def}`}
              result={def}
              initState={true}
            />
          }
          {!!slot1 &&
            <Equipment
              title={`空きスロット最大: ${slot1.slot1 + slot1.slot2 + slot1.slot3 + slot1.slot4}`}
              result={slot1}
            />
          }
          {!!slot2 &&
            <Equipment
              title={`空きスロット(Lv2以上)最大: ${slot2.slot2 + slot2.slot3 + slot2.slot4}`}
              result={slot2}
            />
          }
          {!!slot3 &&
            <Equipment
              title={`空きスロット(Lv3以上)最大: ${slot3.slot3 + slot3.slot4}`}
              result={slot3}
            />
          }
          {!!slot4 &&
            <Equipment
              title={`空きスロット(Lv4)最大: ${slot4.slot4}`}
              result={slot4}
            />
          }
        </>
      }
    </>
  )
}

export default Result
