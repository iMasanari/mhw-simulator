import React from 'react'

require('./HeadingTitle.css')

interface Props extends React.HTMLProps<HTMLHeadingElement> {
  title?: string
}

const HeadingTitle: React.FC<Props> = ({ title, className, children, type, ...rest }) =>
  <h2
    className={`HeadingTitle ${className || ''}`}
    {...rest}
  >
    {title || children}
  </h2>

export default HeadingTitle
