import { ComponentType, FC, useRef, useState } from 'react'

type WithPopoverProps = {
  WrappedComponent: ComponentType<any>
  PopoverComponent: ComponentType<any>
  popoverProps?: any
  trigger?: 'hover' | 'click'
}
export const WithPopover: FC<WithPopoverProps> = (
  WrappedComponent: ComponentType<any>,
  PopoverComponent: ComponentType<any>,
  popoverProps: any,
  trigger: 'hover' | 'click' = 'hover',
) => {
  const [showPopover, setShowPopover] = useState(false)
  const [popoverPosition, setPopoverPosition] = useState({ position: 'absolute', top: 0, left: 0 })
  const wrappedComponentRef = useRef<HTMLDivElement>(null)
  return function (props: any) {
    const handleMouseEnter = (e: MouseEvent) => {
      if (trigger === 'hover') {
        e.stopPropagation()
        updatePopoverPosition()
        setShowPopover(true)
      }
    }

    const handleMouseLeave = (e: MouseEvent) => {
      if (trigger === 'hover') {
        e.stopPropagation()
        setShowPopover(false)
      }
    }

    const handleClick = (e: MouseEvent) => {
      if (trigger === 'click') {
        e.stopPropagation()
        updatePopoverPosition()
        setShowPopover((prevShowPopover) => !prevShowPopover)
      }
    }

    const updatePopoverPosition = () => {
      if (wrappedComponentRef.current) {
        const rect = wrappedComponentRef.current.getBoundingClientRect()
        setPopoverPosition({ position: 'absolute', top: rect.height + 10, right: 0 })
      }
    }

    return (
      <div
        ref={wrappedComponentRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        style={{ position: 'relative' }}
      >
        <WrappedComponent {...props} />
        {showPopover && <PopoverComponent {...popoverProps} style={popoverPosition} />}
      </div>
    )
  }
}
