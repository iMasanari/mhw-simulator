import React from 'react'
import { useResult } from '../../hooks/result'

require('./EmptySlots.css')

interface Props {
}

const EmptySlots: React.FC<Props> = () => {
  const result = useResult()

  const slot1Count = result.slot1 ? result.slot1.z : '-'
  const slot2Count = result.slot2 ? result.slot2.z : '-'
  const slot3Count = result.slot3 ? result.slot3.z : '-'
  const slot4Count = result.slot4 ? result.slot4.z : '-'

  return (
    <div className="EmptySlots">
      <table className="EmptySlots-table">
        <tbody>
          <tr>
            <th className="EmptySlots-text">
              空きスロット数Lv1以上
            </th>
            <td className="EmptySlots-slot">{slot1Count}</td>
          </tr>
          <tr>
            <th className="EmptySlots-text">
              空きスロット数Lv2以上
            </th>
            <td className="EmptySlots-slot">{slot2Count}</td>
          </tr>
          <tr>
            <th className="EmptySlots-text">
              空きスロット数Lv3以上
            </th>
            <td className="EmptySlots-slot">{slot3Count}</td>
          </tr>
          <tr>
            <th className="EmptySlots-text">
              空きスロット数Lv4以上
            </th>
            <td className="EmptySlots-slot">{slot4Count}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default EmptySlots
