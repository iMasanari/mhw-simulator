require('./Table.css')

interface Props extends React.HTMLProps<HTMLTableElement> {
  hoverable?: boolean
}

const Table: React.FC<Props> = ({ children, className, hoverable, ...rest }) =>
  <table className={`Table ${className || ''} ${hoverable ? 'Table-hoverable' : ''}`} {...rest}>
    {children}
  </table>

export default Table
