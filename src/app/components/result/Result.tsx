import React, { useCallback, useState } from 'react'
import { Result } from '~/worker/service/calc'

require('./Result.css')

interface Props {
  title: string
  result: Result
  initState?: boolean
}

const Result: React.FC<Props> = ({ title, result, initState }) => {
  const [isOpen, setOpen] = useState(initState)

  const toggleOpen = useCallback(() => setOpen(v => !v), [])

  return (
    <div className="Result">
      <div
        className={`Result-thumb ${isOpen ? 'on' : ''}`}
        onClick={toggleOpen}
      >
        <div className="Result-title">{title}</div>
      </div>
      {isOpen &&
        <div className="Result-content">
          <table className="Result-table">
            <tbody>
              <tr>
                <th className="Result-th">防御力</th>
                <td>{result.def}</td>
              </tr>
              <tr>
                <th className="Result-th">頭</th>
                <td>{result.head || '装備なし'}</td>
              </tr>
              <tr>
                <th className="Result-th">胴</th>
                <td>{result.body || '装備なし'}</td>
              </tr>
              <tr>
                <th className="Result-th">腕</th>
                <td>{result.arm || '装備なし'}</td>
              </tr>
              <tr>
                <th className="Result-th">腰</th>
                <td>{result.wst || '装備なし'}</td>
              </tr>
              <tr>
                <th className="Result-th">足</th>
                <td>{result.leg || '装備なし'}</td>
              </tr>
              <tr>
                <th className="Result-th">お守り</th>
                <td>{result.charm || '装備なし'}</td>
              </tr>
              <tr>
                <th className="Result-th">装飾品</th>
                <td>
                  <ul className="Result-ul">
                    {result.decos.map(({ name, count }) =>
                      <li key={name}>{name}x{count}</li>
                    )}
                    {!!result.slot1 &&
                      <li>空きスロット【１】x{result.slot1}</li>
                    }
                    {!!result.slot2 &&
                      <li>空きスロット【２】x{result.slot2}</li>
                    }
                    {!!result.slot3 &&
                      <li>空きスロット【３】x{result.slot3}</li>
                    }
                    {!!result.slot4 &&
                      <li>空きスロット【４】x{result.slot4}</li>
                    }
                  </ul>
                </td>
              </tr>
            </tbody>
          </table>
          <table className="Result-table">
            <tbody>
              <tr>
                <th>スキル名</th>
                <th className="Result-number">ポイント</th>
              </tr>
              {result.skills.map(({ name, count }) =>
                <tr key={name}>
                  <td>{name}</td>
                  <td className="Result-number">{count}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      }
    </div>
  )
}
export default Result
