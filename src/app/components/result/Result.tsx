import React from 'react'
import { Result } from '~/app/service/search'

interface Props {
  result: Result
}

const Result: React.FC<Props> = ({ result }) =>
  <table>
    <tbody>
      <tr>
        <th>頭</th>
        <td>{result.head}</td>
      </tr>
      <tr>
        <th>胴</th>
        <td>{result.body}</td>
      </tr>
      <tr>
        <th>腕</th>
        <td>{result.arm}</td>
      </tr>
      <tr>
        <th>腰</th>
        <td>{result.wst}</td>
      </tr>
      <tr>
        <th>足</th>
        <td>{result.leg}</td>
      </tr>
      <tr>
        <th>お守り</th>
        <td>{result.charm}</td>
      </tr>
      <tr>
        <th>装飾品</th>
        <td>
          <ul>
            {result.deco.map(({ name, count }) =>
              <li>{name}x{count}</li>
            )}
          </ul>
        </td>
      </tr>
    </tbody>
  </table>


export default Result
