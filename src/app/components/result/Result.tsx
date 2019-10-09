import React from 'react'
import { Result } from '~/worker/service/calc'
import Equipment from './Equipment'

interface Props {
  def?: Result
  slot1?: Result
  slot2?: Result
  slot3?: Result
  slot4?: Result
}

const Result: React.FC<Props> = ({ def, slot1, slot2, slot3, slot4 }) =>
  <>
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

export default Result
