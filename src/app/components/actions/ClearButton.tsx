import React from 'react'

require('./ClearButton.css')

interface Props {
  onClick: () => void
}

const ClearButton: React.FC<Props> = ({ onClick }) =>
  <button className="ClearButton" onClick={onClick}>クリア</button>


export default ClearButton
