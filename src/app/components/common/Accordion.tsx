import React, { useState } from 'react'

require('./Accordion.css')

interface Props {
  title: string
  initState?: boolean
  className?: string
}

const Accordion: React.FC<Props> = ({ title, initState, className, children }) => {
  const [isOpen, setOpen] = useState(initState)

  return (
    <div className={`Accordion ${className}`}>
      <div
        className={`Accordion-thumb ${isOpen ? 'on' : ''}`}
        onClick={() => setOpen(state => !state)}
      >
        <span className="Accordion-title">{title}</span>
      </div>
      {isOpen && children}
    </div>
  )
}

export default Accordion
