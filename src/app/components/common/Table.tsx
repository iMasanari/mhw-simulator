import React from 'react'

require('./Table.css')

interface Props extends React.HTMLProps<HTMLTableElement> {
}

const Table: React.FC<Props> = ({ children, className, ...rest }) =>
  <table className={`Table ${className || ''}`} {...rest}>
    {children}
  </table>

export default Table
