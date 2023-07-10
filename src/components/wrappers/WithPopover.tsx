import { ComponentType, FC, useEffect, useState } from 'react'

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
  const [isHovering, setIsHovering] = useState(false)

  return function (props: any) {
    let timeOut: NodeJS.Timeout

    if (trigger === 'hover') {
      useEffect(() => {
        if (isHovering) {
          clearTimeout(timeOut)
          setShowPopover(true)
        } else {
          setShowPopover(false)
        }
      }, [isHovering])
    }

    const handleMouseEnter = () => {
      if (trigger === 'hover') {
        setIsHovering(true)
        setShowPopover(true)
      }
    }

    const handleMouseLeave = () => {
      if (trigger === 'hover') {
        timeOut = setTimeout(() => {
          setIsHovering(false)
        }, 300)
      }
    }

    const handleClick = () => {
      if (trigger === 'click') {
        setShowPopover((prevShowPopover) => !prevShowPopover)
      }
    }

    return (
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        style={{
          position: 'relative',
        }}
      >
        <WrappedComponent {...props} />
        {showPopover && (
          <div
            style={{
              position: 'absolute',
              bottom: -105,
              left: 0,
            }}
          >
            <PopoverComponent {...popoverProps} />
          </div>
        )}
      </div>
    )
  }
}
