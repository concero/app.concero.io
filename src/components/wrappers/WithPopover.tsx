import { ComponentType, FC, useState } from 'react'

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
  const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null)
  return function (props: any) {
    const handleMouseEnter = () => {
      if (trigger === 'hover') {
        if (hoverTimeout) {
          clearTimeout(hoverTimeout)
        }
        setShowPopover(true)
      }
    }

    const handleMouseLeave = () => {
      if (trigger === 'hover') {
        setHoverTimeout(
          setTimeout(() => {
            setShowPopover(false)
          }, 300),
        )
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
