import React, { useState } from 'react'

export function WithTooltip({ WrappedComponent, Tooltip, tooltipProps = {} }) {
  const [showTooltip, setShowTooltip] = useState(false)
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: -10 })

  const handleMouseEnter = () => {
    setShowTooltip(true)
  }

  const handleMouseLeave = () => {
    setShowTooltip(false)
  }

  const handleMouseMove = (event) => {
    setTooltipPosition({ x: event.clientX, y: event.clientY })
  }

  return (
    <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onMouseMove={handleMouseMove}>
      <WrappedComponent {...tooltipProps} />
      <div
        className={`fade-in-out ${showTooltip ? 'show-up' : 'hide-down'}`}
        style={{
          position: 'fixed',
          zIndex: 100,
          top: tooltipPosition.y,
          left: tooltipPosition.x,
        }}
      >
        <Tooltip />
      </div>
    </div>
  )
}
