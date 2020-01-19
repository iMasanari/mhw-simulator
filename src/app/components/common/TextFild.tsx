import React, { useMemo } from 'react'

require('./TextFild.css')

interface Props extends React.HTMLProps<HTMLInputElement> {
  datalist?: string[]
}

const createId = () =>
  'datalistId-' + Math.random().toString(36).slice(-6)

const TextFild: React.FC<Props> = ({ datalist, className, children, ...rest }) => {
  const listId = useMemo(createId, [])

  return (
    <>
      <input
        className={`TextFild ${className || ''}`}
        list={datalist ? listId : undefined}
        {...rest}
      />
      {datalist &&
        <datalist id={listId}>
          {datalist.map((item) =>
            <option key={item} value={item} />
          )}
        </datalist>
      }
    </>
  )
}
export default TextFild
