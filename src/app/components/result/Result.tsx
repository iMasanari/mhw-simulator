import React from 'react'
import { Result } from '~/worker/service/calc'

require('./Result.css')

interface Props {
  title: string
  result: Result
}

const Result: React.FC<Props> = ({ title, result }) =>
  <div className="Result">
    <span className="Result-title">
      {title}
    </span>
    <div className="Result-content">
      <table className="Result-table">
        <tbody>
          <tr>
            <th className="Result-th">頭</th>
            <td>{result.head}</td>
          </tr>
          <tr>
            <th className="Result-th">胴</th>
            <td>{result.body}</td>
          </tr>
          <tr>
            <th className="Result-th">腕</th>
            <td>{result.arm}</td>
          </tr>
          <tr>
            <th className="Result-th">腰</th>
            <td>{result.wst}</td>
          </tr>
          <tr>
            <th className="Result-th">足</th>
            <td>{result.leg}</td>
          </tr>
          <tr>
            <th className="Result-th">お守り</th>
            <td>{result.charm}</td>
          </tr>
          <tr>
            <th className="Result-th">装飾品</th>
            <td>
              <ul className="Result-ul">
                {result.decos.map(({ name, count }) =>
                  <li key={name}>{name}x{count}</li>
                )}
              </ul>
            </td>
          </tr>
        </tbody>
      </table>
      <table className="Result-table">
        <tbody>
          <tr>
            <th className="Result-th">防御力</th>
            <td>{result.def}</td>
          </tr>
          <tr>
            <th className="Result-th">空きスロ1</th>
            <td>{result.slot1}</td>
          </tr>
          <tr>
            <th className="Result-th">空きスロ2</th>
            <td>{result.slot2}</td>
          </tr>
          <tr>
            <th className="Result-th">空きスロ3</th>
            <td>{result.slot3}</td>
          </tr>
          <tr>
            <th className="Result-th">空きスロ4</th>
            <td>{result.slot4}</td>
          </tr>
          <tr>
            <th className="Result-th">発動スキル</th>
            <td>
              <ul className="Result-ul">
                {result.skills.map(({ name, count }) =>
                  <li key={name}>{name} Lv{count}</li>
                )}
              </ul>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

export default Result
