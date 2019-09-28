import React from 'react'

require('./ClearButton.css')

interface Props {
  label: string
  onClick: () => void
}

const ClearButton: React.FC<Props> = ({ label, onClick }) =>
  <button className="ClearButton" onClick={onClick}>{label}</button>

export default ClearButton
