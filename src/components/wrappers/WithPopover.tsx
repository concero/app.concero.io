import { type ComponentType, type FC, useEffect, useRef, useState } from 'react'

interface WithPopoverProps {
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
	const popoverRef = useRef(null)
	const [popoverTopPosition, setPopoverTopPosition] = useState(0)

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
				setShowPopover(prevShowPopover => !prevShowPopover)
			}
		}

		useEffect(() => {
			setPopoverTopPosition(-popoverRef.current?.clientHeight - 4)
		}, [popoverRef.current?.clientHeight])

		return (
			<div
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				onClick={handleClick}
				style={{
					position: 'relative',
					transform: 'translateZ(0px)',
					zIndex: 1,
				}}
			>
				<WrappedComponent {...props} />
				{showPopover && (
					<div
						ref={popoverRef}
						style={{
							position: 'absolute',
							bottom: popoverTopPosition || 0,
							left: 0,
							transform: 'translateZ(0px)',
						}}
					>
						<PopoverComponent {...popoverProps} />
					</div>
				)}
			</div>
		)
	}
}
