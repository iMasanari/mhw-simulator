import React, { useCallback, useState } from 'react'
import { arm, body, charm, deco, head, leg, wst } from '~/app/data'
import skill from '~/app/data/skill.json'
import { Result } from '~/worker/service/calc'

require('./Result.css')

interface Props {
  title: string
  result: Result
  initState?: boolean
}

const skillMap = new Map(skill.map(({ id, name }) => [id, name]))

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
                <td>{head[result.head as keyof typeof head] || '装備なし'}</td>
              </tr>
              <tr>
                <th className="Result-th">胴</th>
                <td>{body[result.body as keyof typeof body] || '装備なし'}</td>
              </tr>
              <tr>
                <th className="Result-th">腕</th>
                <td>{arm[result.arm as keyof typeof arm] || '装備なし'}</td>
              </tr>
              <tr>
                <th className="Result-th">腰</th>
                <td>{wst[result.wst as keyof typeof wst] || '装備なし'}</td>
              </tr>
              <tr>
                <th className="Result-th">足</th>
                <td>{leg[result.leg as keyof typeof leg] || '装備なし'}</td>
              </tr>
              <tr>
                <th className="Result-th">お守り</th>
                <td>{charm[result.charm as keyof typeof charm] || '装備なし'}</td>
              </tr>
              <tr>
                <th className="Result-th">装飾品</th>
                <td>
                  <ul className="Result-ul">
                    {result.decos.map(({ id, count }) =>
                      <li key={id}>{deco[id as keyof typeof deco]}x{count}</li>
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
              {result.skills.map(({ id, count }) =>
                <tr key={id}>
                  <td>{skillMap.get(id)}</td>
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
