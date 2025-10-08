import React from 'react'

const Tooltip = ({ children, text, position = 'top' }) => {
  return (
    <div className="tooltip-wrapper">
      {children}
      <span className={`tooltip tooltip-${position}`}>{text}</span>
    </div>
  )
}

export default Tooltip

