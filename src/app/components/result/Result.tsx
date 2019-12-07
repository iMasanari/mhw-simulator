import React from 'react'
import { useResult } from '~/app/hooks/result'
import Equipment from './Equipment'

interface Props {
}

const Result: React.FC<Props> = () => {
  const list = useResult()

  return (
    <>
      {list.filter(Boolean).map((result, i) =>
        <Equipment
          key={i}
          title={`10件検索: 装備${i + 1} `}
          result={result}
          initState={i === 0}
        />
      )}
    </>
  )
}

export default Result
