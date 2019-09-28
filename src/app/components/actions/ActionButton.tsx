import React from 'react'

require('./ActionButton.css')

interface Props {
  label: string
  onClick: () => void
  primary?: boolean
}

const ActionButton: React.FC<Props> = ({ label, onClick, primary }) =>
  <button className={`ActionButton ${primary ? 'primary' : ''}`} onClick={onClick}>
    {label}
  </button>

export default ActionButton
