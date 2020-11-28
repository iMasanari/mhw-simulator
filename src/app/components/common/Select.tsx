require('./Select.css')

interface Props extends React.HTMLProps<HTMLSelectElement> {
}

const Select: React.FC<Props> = ({ children, className, ...rest }) =>
  <div className="Select">
    <select className={`Select-select ${className || ''}`} {...rest}>
      {children}
    </select>
  </div>

export default Select
