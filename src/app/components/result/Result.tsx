import React, { useLayoutEffect, useRef } from 'react'
import { Result } from '~/app/service/search'

interface Props {
  result: Result
}

const Result: React.FC<Props> = ({ result }) => {
  const elRef = useRef(null as HTMLTableElement | null)

  // 結果更新時、スクロールする（スマホ用）
  useLayoutEffect(() => {
    const target = elRef.current
    if (!target) return

    window.scrollTo(0, window.pageYOffset + target.getBoundingClientRect().top)
  }, [result])

  return (
    <table ref={elRef}>
      <tbody>
        <tr>
          <th>防御力</th>
          <td>{result.def}</td>
        </tr>
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
              {result.decos.map(({ name, count }) =>
                <li key={name}>{name}x{count}</li>
              )}
            </ul>
          </td>
        </tr>
        <tr>
          <th>発動スキル</th>
          <td>
            <ul>
              {result.skills.map(({ name, count }) =>
                <li key={name}>{name} Lv{count}</li>
              )}
            </ul>
          </td>
        </tr>
      </tbody>
    </table>
  )
}

export default Result
