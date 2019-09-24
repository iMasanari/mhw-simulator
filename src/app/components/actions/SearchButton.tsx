import React from 'react'

require('./SearchButton.css')

interface Props {
  onClick: () => void
}

const SearchButton: React.FC<Props> = ({ onClick }) => {

  return (
    <button className="SearchButton" onClick={onClick}>検索</button>
  )
}
export default SearchButton
