import React from 'react'

require('./Button.css')

interface Props extends React.HTMLProps<HTMLButtonElement> {
  label: string
  primary?: boolean
}

const Button: React.FC<Props> = ({ label, className, primary, children, type, ...rest }) =>
  <button
    className={`Button ${className || ''} ${primary ? 'primary' : ''}`}
    type={(type || 'button') as 'button' | 'submit' | 'reset'}
    {...rest}
  >
    {label || children}
  </button>

export default Button
